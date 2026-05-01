/* eslint-disable @typescript-eslint/no-explicit-any */
import dbConnect from "@/lib/db";
import User from "@/models/User";
import Link from "next/link";
import { AlertTriangle, Phone, Edit2, ShieldAlert, Clock, Users } from "lucide-react";

export const dynamic = "force-dynamic";

interface ExpiringMember {
  _id: string;
  name: string;
  email: string;
  plan: string;
  endDate: string;
  daysRemaining: number;
  isExpired: boolean;
}

export default async function AdminExpiringPage() {
  await dbConnect();

  const now = new Date();
  const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  const rawUsers = await User.find({
    role: "user",
    endDate: { $lte: sevenDaysFromNow },
  })
    .select("-password")
    .sort({ endDate: 1 })
    .lean();

  const members: ExpiringMember[] = rawUsers.map((u: any) => {
    const end = new Date(u.endDate);
    const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return {
      _id: u._id.toString(),
      name: u.name,
      email: u.email,
      plan: u.plan || "None",
      endDate: end.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
      daysRemaining: diff,
      isExpired: diff <= 0,
    };
  });

  const expiredCount = members.filter((m) => m.isExpired).length;
  const expiringSoonCount = members.filter((m) => !m.isExpired).length;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-white uppercase tracking-tight">
          Subscription Alerts
        </h1>
        <p className="text-text-muted text-sm mt-2">
          Members requiring attention — expired or expiring within 7 days
        </p>
      </div>

      {/* Summary cards */}
      {members.length > 0 ? (
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <div className="relative overflow-hidden rounded-2xl border border-red-500/20 bg-surface p-6">
            <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/5 rounded-full -translate-y-6 translate-x-6" />
            <div className="relative flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                <ShieldAlert className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <p className="text-3xl font-heading font-bold text-white">{expiredCount}</p>
                <p className="text-text-muted text-xs font-semibold uppercase tracking-wider">
                  Already Expired
                </p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-yellow-500/20 bg-surface p-6">
            <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/5 rounded-full -translate-y-6 translate-x-6" />
            <div className="relative flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-3xl font-heading font-bold text-white">{expiringSoonCount}</p>
                <p className="text-text-muted text-xs font-semibold uppercase tracking-wider">
                  Expiring &lt; 7 Days
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-surface p-12 text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-green-500/10 mx-auto mb-4 flex items-center justify-center">
            <Users className="w-7 h-7 text-green-400" />
          </div>
          <p className="text-green-400 font-bold text-xl mb-2">All clear! 🎉</p>
          <p className="text-text-secondary text-sm">No members have expired or expiring subscriptions.</p>
          <Link href="/admin/users" className="btn-primary inline-block mt-6">
            View All Members
          </Link>
        </div>
      )}

      {/* Members table */}
      {members.length > 0 && (
        <div className="rounded-2xl border border-border bg-surface overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-white border-collapse">
              <thead>
                <tr className="border-b border-border/50 bg-surface-alt">
                  <th className="px-5 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Member</th>
                  <th className="px-5 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Plan</th>
                  <th className="px-5 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Ends</th>
                  <th className="px-5 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                  <th className="px-5 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {members.map((member) => {
                  const waText = encodeURIComponent(
                    `Hi ${member.name.split(" ")[0]}! This is a reminder from Kiran's Fitness Club. Your ${member.plan} subscription ${member.isExpired ? "has expired" : `expires in ${member.daysRemaining} day${member.daysRemaining === 1 ? "" : "s"}`}. Please renew to continue your fitness journey! 💪`
                  );
                  const waUrl = `https://wa.me/?text=${waText}`;

                  return (
                    <tr
                      key={member._id}
                      className="hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                            member.isExpired ? "bg-red-500/10 text-red-400" : "bg-yellow-500/10 text-yellow-400"
                          }`}>
                            {member.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-white">{member.name}</p>
                            <p className="text-xs text-text-muted">{member.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-sm text-text-secondary">{member.plan}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-sm text-text-muted">{member.endDate}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            member.isExpired
                              ? "bg-red-500/15 text-red-400"
                              : member.daysRemaining <= 3
                              ? "bg-orange-500/15 text-orange-400"
                              : "bg-yellow-500/15 text-yellow-400"
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            member.isExpired ? "bg-red-400 animate-pulse" : member.daysRemaining <= 3 ? "bg-orange-400" : "bg-yellow-400"
                          }`} />
                          {member.isExpired
                            ? `Expired ${Math.abs(member.daysRemaining)}d ago`
                            : `${member.daysRemaining}d left`}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Send WhatsApp reminder"
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-green-400 hover:bg-green-500/10 transition"
                          >
                            <Phone className="w-4 h-4" />
                          </a>
                          <Link
                            href={`/admin/users/${member._id}/edit`}
                            title="Edit subscription"
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-white hover:bg-white/5 transition"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>
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

      {/* Info note */}
      <p className="text-text-muted text-xs mt-6 flex items-center gap-2">
        <AlertTriangle className="w-3.5 h-3.5" />
        This page refreshes on every visit. Bookmark it for your daily review.
      </p>
    </div>
  );
}
