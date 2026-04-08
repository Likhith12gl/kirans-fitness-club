"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function EditUserPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    plan: "None",
    startDate: "",
    endDate: "",
  });
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${params.id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        
        setUserName(data.name);
        setFormData({
          plan: data.plan || "None",
          // Map ISO strings explicitly into local DOM native structures formatted as YYYY-MM-DD
          startDate: new Date(data.startDate).toISOString().split('T')[0],
          endDate: new Date(data.endDate).toISOString().split('T')[0],
        });
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      // Execute strict parsing back into ISO dates
      const updates = {
        plan: formData.plan,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
      };

      const res = await fetch(`/api/users/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      router.push("/admin/users");
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-white">Loading member data...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/users" className="text-text-secondary hover:text-white transition">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-3xl font-heading font-bold text-white uppercase">Editing {userName}</h1>
      </div>

      <form onSubmit={handleSubmit} className="card p-6 border border-border space-y-6">
        {error && <div className="p-4 bg-red-500/10 border border-red-500/50 text-red-500 rounded-md">{error}</div>}
        
        <div className="grid gap-6">
          <div className="space-y-2">
            <label className="text-text-secondary text-sm font-bold">Subscription Plan</label>
            <select 
              className="w-full bg-background border border-border rounded-button px-4 py-3 text-white focus:outline-none focus:border-accent"
              value={formData.plan}
              onChange={e => setFormData({...formData, plan: e.target.value})}
            >
              <option value="None">None</option>
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Annual">Annual</option>
            </select>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-text-secondary text-sm font-bold">Start Date</label>
              <input 
                type="date" 
                required 
                className="w-full bg-background border border-border rounded-button px-4 py-3 text-white focus:outline-none focus:border-accent"
                value={formData.startDate}
                onChange={e => setFormData({...formData, startDate: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-text-secondary text-sm font-bold">End/Expiration Date</label>
              <input 
                type="date" 
                required 
                className="w-full bg-background border border-border rounded-button px-4 py-3 text-white focus:outline-none focus:border-accent"
                value={formData.endDate}
                onChange={e => setFormData({...formData, endDate: e.target.value})}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t border-border/50">
          <Link href="/admin/users" className="px-6 py-3 text-text-secondary hover:text-white transition">
            Cancel
          </Link>
          <button 
            type="submit" 
            disabled={saving}
            className="btn-primary disabled:opacity-50"
          >
            {saving ? "Saving..." : "Update Subscription"}
          </button>
        </div>
      </form>
    </div>
  );
}
