"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2 } from "lucide-react";

interface UserData {
  _id: string;
  name: string;
  email: string;
  plan: string;
  startDate: string;
  endDate: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setUsers(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete member: ${name}?`)) return;
    
    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete user");
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      alert((err as Error).message);
    }
  };

  if (loading) return <div className="text-white">Loading members...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading font-bold text-white uppercase">Manage Members</h1>
        <Link href="/admin/users/new" className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" /> New Member
        </Link>
      </div>

      <div className="card p-6 border border-border">
        {users.length === 0 ? (
          <p className="text-text-secondary">No members found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-white border-collapse">
              <thead>
                <tr className="border-b border-border/50 text-text-secondary">
                  <th className="p-4 font-normal">Name</th>
                  <th className="p-4 font-normal">Email</th>
                  <th className="p-4 font-normal">Plan</th>
                  <th className="p-4 font-normal">Start Date</th>
                  <th className="p-4 font-normal">Days Remaining</th>
                  <th className="p-4 font-normal text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  const remaining = Math.ceil((new Date(user.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                  const isExpired = remaining <= 0;
                  const isWarning = remaining > 0 && remaining <= 7;
                  
                  return (
                    <tr key={user._id} className="border-b border-border/50 hover:bg-white/5 transition-colors">
                      <td className="p-4 font-bold">{user.name}</td>
                      <td className="p-4 text-text-secondary">{user.email}</td>
                      <td className="p-4">{user.plan || "None"}</td>
                      <td className="p-4 text-text-secondary">{new Date(user.startDate).toLocaleDateString()}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          isExpired ? "bg-red-500/20 text-red-500" :
                          isWarning ? "bg-yellow-500/20 text-yellow-500" :
                          "bg-green-500/20 text-green-400"
                        }`}>
                          {isExpired ? "Expired" : `${remaining} days`}
                        </span>
                      </td>
                      <td className="p-4 flex gap-3 justify-end items-center h-full">
                        <Link href={`/admin/users/${user._id}/edit`} className="text-text-secondary hover:text-white transition">
                          <Edit2 className="w-5 h-5" />
                        </Link>
                        <button onClick={() => handleDelete(user._id, user.name)} className="text-red-500/70 hover:text-red-500 transition">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
