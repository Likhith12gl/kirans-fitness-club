"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CreditCard, CalendarDays, Save, Phone } from "lucide-react";

export default function EditUserPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    plan: "None",
    phone: "",
    startDate: "",
    endDate: "",
  });
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${params.id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        
        setUserName(data.name);
        setUserEmail(data.email || "");
        setFormData({
          plan: data.plan || "None",
          phone: data.phone || "",
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
      const updates = {
        plan: formData.plan,
        phone: formData.phone,
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
      
      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/users");
        router.refresh();
      }, 800);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex items-center gap-3 text-text-secondary">
          <div className="w-5 h-5 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
          Loading member...
        </div>
      </div>
    );
  }

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
          <h1 className="text-2xl font-heading font-bold text-white uppercase tracking-tight">Edit Member</h1>
          <p className="text-text-muted text-sm">Updating subscription for {userName}</p>
        </div>
      </div>

      {/* Member info card */}
      <div className="rounded-2xl border border-border bg-surface p-5 mb-6 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-lg">
          {userName.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-bold text-white">{userName}</p>
          <p className="text-text-muted text-sm">{userEmail}{formData.phone ? ` · ${formData.phone}` : ""}</p>
        </div>
      </div>

      {/* Success banner */}
      {success && (
        <div className="mb-6 p-4 rounded-xl border border-green-500/30 bg-green-500/10 text-green-400 flex items-center gap-3">
          <span className="text-lg">✓</span>
          <span className="font-semibold text-sm">Updated successfully! Redirecting...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-surface p-8 space-y-8">
        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Plan */}
        <div>
          <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-5 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-accent" /> Subscription Plan
          </h3>
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

        {/* Phone */}
        <div>
          <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-5 flex items-center gap-2">
            <Phone className="w-4 h-4 text-accent" /> Mobile Number
          </h3>
          <input 
            type="tel" 
            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition placeholder:text-text-muted"
            value={formData.phone}
            onChange={e => setFormData({...formData, phone: e.target.value})}
            placeholder="+91 81793 76067"
          />
        </div>

        {/* Divider */}
        <div className="border-t border-border/50" />
        
        {/* Dates */}
        <div>
          <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-5 flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-accent" /> Billing Dates
          </h3>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-text-muted text-xs font-semibold uppercase tracking-wider">Start Date</label>
              <input 
                type="date" 
                required 
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition"
                value={formData.startDate}
                onChange={e => setFormData({...formData, startDate: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-text-muted text-xs font-semibold uppercase tracking-wider">End / Expiration Date</label>
              <input 
                type="date" 
                required 
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition"
                value={formData.endDate}
                onChange={e => setFormData({...formData, endDate: e.target.value})}
              />
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
            disabled={saving || success}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed !py-3 !px-8 !rounded-xl flex items-center gap-2"
          >
            {saving ? (
              <>
                <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                Saving...
              </>
            ) : success ? "Saved ✓" : (
              <>
                <Save className="w-4 h-4" />
                Update Subscription
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
