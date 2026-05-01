"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, UserPlus, Mail, Lock, CalendarDays, CreditCard, Phone } from "lucide-react";

export default function NewUserPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    plan: "Monthly",
    days: "30",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

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
      
      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/users");
        router.refresh();
      }, 800);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/users"
          className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-text-secondary hover:text-white hover:border-white/20 transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-heading font-bold text-white uppercase tracking-tight">Add New Member</h1>
          <p className="text-text-muted text-sm">Register a new gym member with login credentials</p>
        </div>
      </div>

      {/* Success banner */}
      {success && (
        <div className="mb-6 p-4 rounded-xl border border-green-500/30 bg-green-500/10 text-green-400 flex items-center gap-3">
          <span className="text-lg">✓</span>
          <span className="font-semibold text-sm">Member created successfully! Redirecting...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-surface p-8 space-y-8">
        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {error}
          </div>
        )}
        
        {/* Personal Info */}
        <div>
          <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-5 flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-accent" /> Personal Info
          </h3>
          <div className="grid gap-5">
            <div className="space-y-2">
              <label className="text-text-muted text-xs font-semibold uppercase tracking-wider">Full Name</label>
              <input 
                type="text" 
                required 
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition placeholder:text-text-muted"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. Rahul Sharma"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-text-muted text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> Email Address
                </label>
                <input 
                  type="email" 
                  required 
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition placeholder:text-text-muted"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  placeholder="member@email.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-text-muted text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> Mobile Number
                </label>
                <input 
                  type="tel" 
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition placeholder:text-text-muted"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  placeholder="+91 81973 76067"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-text-muted text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" /> Initial Password
              </label>
              <input 
                type="password" 
                required 
                minLength={6}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition placeholder:text-text-muted"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                placeholder="Min 6 characters"
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/50" />

        {/* Subscription */}
        <div>
          <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-5 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-accent" /> Subscription
          </h3>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-text-muted text-xs font-semibold uppercase tracking-wider">Plan</label>
              <select 
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-accent/50 transition"
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
              <label className="text-text-muted text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <CalendarDays className="w-3.5 h-3.5" /> Duration (Days)
              </label>
              <input 
                type="number" 
                required 
                min={0}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition placeholder:text-text-muted"
                value={formData.days}
                onChange={e => setFormData({...formData, days: e.target.value})}
                placeholder="e.g. 30"
              />
              <p className="text-[11px] text-text-muted">End date is calculated from today.</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
          <Link
            href="/admin/users"
            className="px-6 py-3 rounded-xl text-sm text-text-secondary hover:text-white hover:bg-white/5 transition"
          >
            Cancel
          </Link>
          <button 
            type="submit" 
            disabled={loading || success}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed !py-3 !px-8 !rounded-xl"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                Creating...
              </span>
            ) : success ? "Created ✓" : "Create Member"}
          </button>
        </div>
      </form>
    </div>
  );
}
