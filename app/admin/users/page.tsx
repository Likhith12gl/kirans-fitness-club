"use client";
import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Plus, Edit2, Trash2, Filter, X, Search, Users } from "lucide-react";

interface UserData {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  plan: string;
  startDate: string;
  endDate: string;
}

function AdminUsersContent() {
  const searchParams = useSearchParams();
  const filterParam = searchParams.get("filter");
  const isExpiringFilter = filterParam === "expiring";

  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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

  const now = new Date();
  const sevenDaysLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  let displayUsers = isExpiringFilter
    ? users.filter((u) => {
        const end = new Date(u.endDate);
        return end > now && end <= sevenDaysLater;
      })
    : users;

  // Apply search filter
  if (searchTerm) {
    const q = searchTerm.toLowerCase();
    displayUsers = displayUsers.filter(
      (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex items-center gap-3 text-text-secondary">
          <div className="w-5 h-5 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
          Loading members...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 rounded-2xl border border-red-500/30 bg-red-500/5 text-red-400">
        <p className="font-bold mb-1">Failed to load members</p>
        <p className="text-sm text-red-400/70">{error}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white uppercase tracking-tight">
            {isExpiringFilter ? "Expiring Members" : "Members"}
          </h1>
          {isExpiringFilter && (
            <p className="text-text-secondary text-sm mt-1">
              Showing members whose subscription expires within 7 days
            </p>
          )}
          {!isExpiringFilter && (
            <p className="text-text-muted text-sm mt-1">{users.length} total members registered</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          {isExpiringFilter && (
            <Link
              href="/admin/users"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-text-secondary hover:text-white hover:border-white/20 transition text-sm"
            >
              <X className="w-4 h-4" /> Clear Filter
            </Link>
          )}
          {!isExpiringFilter && (
            <Link
              href="/admin/users?filter=expiring"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 transition text-sm"
            >
              <Filter className="w-4 h-4" /> Expiring
            </Link>
          )}
          <Link href="/admin/users/new" className="btn-primary flex items-center gap-2 !py-2.5 !px-5">
            <Plus className="w-4 h-4" /> Add Member
          </Link>
        </div>
      </div>

      {/* Search bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-surface border border-border rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition"
        />
      </div>

      {/* Empty states */}
      {isExpiringFilter && displayUsers.length === 0 && (
        <div className="rounded-2xl border border-border bg-surface p-12 text-center">
          <p className="text-4xl mb-3">🎉</p>
          <p className="text-green-400 font-bold text-lg mb-2">All clear!</p>
          <p className="text-text-secondary text-sm">No members have subscriptions expiring within the next 7 days.</p>
          <Link href="/admin/users" className="btn-primary inline-block mt-6">
            View All Members
          </Link>
        </div>
      )}

      {!isExpiringFilter && displayUsers.length === 0 && (
        <div className="rounded-2xl border border-border bg-surface p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-surface mx-auto mb-4 flex items-center justify-center border border-border">
            <Users className="w-7 h-7 text-text-muted" />
          </div>
          <p className="text-white font-bold mb-2">{searchTerm ? "No results found" : "No members yet"}</p>
          <p className="text-text-secondary text-sm">
            {searchTerm ? `No members match "${searchTerm}".` : "Add your first member to get started."}
          </p>
        </div>
      )}

      {/* Members table */}
      {displayUsers.length > 0 && (
        <div className="rounded-2xl border border-border bg-surface overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-white border-collapse">
              <thead>
                <tr className="border-b border-border/50 bg-surface-alt">
                  <th className="px-5 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Member</th>
                  <th className="px-5 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Plan</th>
                  <th className="px-5 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Joined</th>
                  <th className="px-5 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                  <th className="px-5 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {displayUsers.map((user) => {
                  const remaining = Math.ceil(
                    (new Date(user.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                  );
                  const isExpired = remaining <= 0;
                  const isWarning = remaining > 0 && remaining <= 7;

                  return (
                    <tr key={user._id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-sm shrink-0">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-white">{user.name}</p>
                            <p className="text-xs text-text-muted">{user.email}{user.phone ? ` · ${user.phone}` : ""}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-sm text-text-secondary">{user.plan || "None"}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-sm text-text-muted">
                          {new Date(user.startDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "2-digit" })}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            isExpired
                              ? "bg-red-500/15 text-red-400"
                              : isWarning
                              ? "bg-yellow-500/15 text-yellow-400"
                              : "bg-green-500/15 text-green-400"
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            isExpired ? "bg-red-400" : isWarning ? "bg-yellow-400" : "bg-green-400"
                          }`} />
                          {isExpired ? "Expired" : `${remaining}d left`}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2 justify-end">
                          <Link
                            href={`/admin/users/${user._id}/edit`}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-white hover:bg-white/5 transition"
                            title="Edit member"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(user._id, user.name)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-red-400 hover:bg-red-500/10 transition"
                            title="Delete member"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminUsersPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <div className="flex items-center gap-3 text-text-secondary">
            <div className="w-5 h-5 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
            Loading members...
          </div>
        </div>
      }
    >
      <AdminUsersContent />
    </Suspense>
  );
}
