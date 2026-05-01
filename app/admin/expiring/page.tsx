/* eslint-disable @typescript-eslint/no-explicit-any */
import dbConnect from "@/lib/db";
import User from "@/models/User";
import Link from "next/link";
import { ArrowLeft, AlertTriangle, Phone, Edit2 } from "lucide-react";

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

  // Fetch both: expiring soon (within 7 days) AND already expired
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
      {/* Back navigation */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin" className="text-text-secondary hover:text-white transition">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-3xl font-heading font-bold text-white uppercase">
            Subscription Alerts
          </h1>
          <p className="text-text-secondary text-sm mt-1">
            Members with expired or expiring subscriptions (within 7 days)
          </p>
        </div>
      </div>

      {/* Summary banner */}
      {members.length > 0 ? (
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <div className="p-5 rounded-xl border border-red-500/30 bg-red-500/5 flex items-center gap-4">
            <div className="bg-red-500/15 p-3 rounded-full">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <p className="text-red-400 font-bold text-2xl">{expiredCount}</p>
              <p className="text-text-secondary text-sm">Subscription{expiredCount !== 1 ? "s" : ""} already expired</p>
            </div>
          </div>
          <div className="p-5 rounded-xl border border-yellow-500/30 bg-yellow-500/5 flex items-center gap-4">
            <div className="bg-yellow-500/15 p-3 rounded-full">
              <AlertTriangle className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-yellow-400 font-bold text-2xl">{expiringSoonCount}</p>
              <p className="text-text-secondary text-sm">Expiring within 7 days</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="card p-10 border border-border text-center mb-8">
          <p className="text-4xl mb-3">🎉</p>
          <p className="text-green-400 font-bold text-xl mb-2">All clear!</p>
          <p className="text-text-secondary">No members have expired or expiring subscriptions right now.</p>
          <Link href="/admin/users" className="btn-primary inline-block mt-6">
            View All Members
          </Link>
        </div>
      )}

      {/* Member table */}
      {members.length > 0 && (
        <div className="card p-6 border border-border">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-white border-collapse">
              <thead>
                <tr className="border-b border-border/50 text-text-secondary text-sm">
                  <th className="p-4 font-semibold">Member</th>
                  <th className="p-4 font-semibold">Plan</th>
                  <th className="p-4 font-semibold">End Date</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => {
                  const waText = encodeURIComponent(
                    `Hi ${member.name.split(" ")[0]}! This is a reminder from Kiran's Fitness Club. Your ${member.plan} subscription ${member.isExpired ? "has expired" : `expires in ${member.daysRemaining} day${member.daysRemaining === 1 ? "" : "s"}`}. Please renew to continue your fitness journey! 💪`
                  );
                  const waUrl = `https://wa.me/?text=${waText}`;

                  return (
                    <tr
                      key={member._id}
                      className={`border-b border-border/30 hover:bg-white/5 transition-colors ${member.isExpired ? "bg-red-500/5" : "bg-yellow-500/3"}`}
                    >
                      <td className="p-4">
                        <p className="font-bold text-white">{member.name}</p>
                        <p className="text-text-secondary text-sm">{member.email}</p>
                      </td>
                      <td className="p-4 text-text-secondary">{member.plan}</td>
                      <td className="p-4 text-text-secondary">{member.endDate}</td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            member.isExpired
                              ? "bg-red-500/20 text-red-400 border border-red-500/30"
                              : member.daysRemaining <= 3
                              ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                              : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                          }`}
                        >
                          {member.isExpired
                            ? `Expired ${Math.abs(member.daysRemaining)}d ago`
                            : `${member.daysRemaining} day${member.daysRemaining === 1 ? "" : "s"} left`}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-3">
                          {/* WhatsApp quick nudge */}
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Send WhatsApp reminder"
                            className="text-green-500/70 hover:text-green-400 transition"
                          >
                            <Phone className="w-5 h-5" />
                          </a>
                          {/* Edit subscription */}
                          <Link
                            href={`/admin/users/${member._id}/edit`}
                            title="Edit subscription"
                            className="text-text-secondary hover:text-white transition"
                          >
                            <Edit2 className="w-5 h-5" />
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
      <p className="text-text-muted text-xs mt-6">
        ⚡ This page refreshes on every visit (server-rendered). Bookmark it for your daily check.
        Click the phone icon to send a WhatsApp renewal reminder, or the edit icon to update a subscription.
      </p>
    </div>
  );
}
