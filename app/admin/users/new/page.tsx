"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewUserPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    plan: "Monthly",
    days: "30",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      router.push("/admin/users");
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/users" className="text-text-secondary hover:text-white transition">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-3xl font-heading font-bold text-white uppercase">Add New Member</h1>
      </div>

      <form onSubmit={handleSubmit} className="card p-6 border border-border space-y-6">
        {error && <div className="p-4 bg-red-500/10 border border-red-500/50 text-red-500 rounded-md">{error}</div>}
        
        <div className="grid gap-6">
          <div className="space-y-2">
            <label className="text-text-secondary text-sm font-bold">Full Name</label>
            <input 
              type="text" 
              required 
              className="w-full bg-background border border-border rounded-button px-4 py-3 text-white focus:outline-none focus:border-accent"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-text-secondary text-sm font-bold">Email Address</label>
            <input 
              type="email" 
              required 
              className="w-full bg-background border border-border rounded-button px-4 py-3 text-white focus:outline-none focus:border-accent"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-text-secondary text-sm font-bold">Initial Password</label>
            <input 
              type="password" 
              required 
              minLength={6}
              className="w-full bg-background border border-border rounded-button px-4 py-3 text-white focus:outline-none focus:border-accent"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
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
            
            <div className="space-y-2">
              <label className="text-text-secondary text-sm font-bold">Number of Days</label>
              <input 
                type="number" 
                required 
                min={0}
                className="w-full bg-background border border-border rounded-button px-4 py-3 text-white focus:outline-none focus:border-accent"
                value={formData.days}
                onChange={e => setFormData({...formData, days: e.target.value})}
                placeholder="e.g. 30"
              />
              <p className="text-xs text-text-muted mt-1">Calculates end date dynamically from today.</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t border-border/50">
          <Link href="/admin/users" className="px-6 py-3 text-text-secondary hover:text-white transition">
            Cancel
          </Link>
          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Member"}
          </button>
        </div>
      </form>
    </div>
  );
}
