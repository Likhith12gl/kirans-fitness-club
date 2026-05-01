/* eslint-disable @typescript-eslint/no-explicit-any */
import dbConnect from "@/lib/db";
import User from "@/models/User";
import Post from "@/models/Post";
import Link from "next/link";
import { Users, AlertTriangle, FileText, Plus, TrendingUp, Clock } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  await dbConnect();

  const activeUsers = await User.countDocuments({ role: "user" });

  const now = new Date();
  const sevenDaysFromNow = new Date();
  sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

  const expiringUsers = await User.countDocuments({
    role: "user",
    endDate: { $lte: sevenDaysFromNow, $gt: now },
  });

  const expiredUsers = await User.countDocuments({
    role: "user",
    endDate: { $lte: now },
  });

  const publishedPosts = await Post.countDocuments({ status: "published" });
  const draftPosts = await Post.countDocuments({ status: "draft" });

  // Get the 5 most recently added members
  const recentMembers = await User.find({ role: "user" })
    .select("name email plan endDate createdAt")
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  return (
    <div>
      {/* Welcome banner */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-white uppercase tracking-tight">
          Dashboard
        </h1>
        <p className="text-text-secondary mt-2">
          Overview of your gym&apos;s membership and content at a glance.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {/* Total Members */}
        <Link
          href="/admin/users"
          className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 hover:border-accent/40 transition-all group"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full -translate-y-8 translate-x-8 group-hover:bg-accent/10 transition-colors" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-accent" />
              </div>
              <TrendingUp className="w-4 h-4 text-accent/50" />
            </div>
            <p className="text-3xl font-heading font-bold text-white mb-1">{activeUsers}</p>
            <p className="text-text-muted text-xs font-semibold uppercase tracking-wider">Total Members</p>
          </div>
        </Link>

        {/* Expiring Soon */}
        <Link
          href="/admin/expiring"
          className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 hover:border-yellow-500/40 transition-all group"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/5 rounded-full -translate-y-8 translate-x-8 group-hover:bg-yellow-500/10 transition-colors" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-400" />
              </div>
              {expiringUsers > 0 && (
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse" />
              )}
            </div>
            <p className="text-3xl font-heading font-bold text-white mb-1">{expiringUsers}</p>
            <p className="text-text-muted text-xs font-semibold uppercase tracking-wider">Expiring &lt; 7d</p>
          </div>
        </Link>

        {/* Expired */}
        <Link
          href="/admin/expiring"
          className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 hover:border-red-500/40 transition-all group"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full -translate-y-8 translate-x-8 group-hover:bg-red-500/10 transition-colors" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              {expiredUsers > 0 && (
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              )}
            </div>
            <p className="text-3xl font-heading font-bold text-white mb-1">{expiredUsers}</p>
            <p className="text-text-muted text-xs font-semibold uppercase tracking-wider">Expired</p>
          </div>
        </Link>

        {/* Published Posts */}
        <Link
          href="/admin/posts"
          className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 hover:border-green-500/40 transition-all group"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 rounded-full -translate-y-8 translate-x-8 group-hover:bg-green-500/10 transition-colors" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-green-500/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-green-400" />
              </div>
            </div>
            <p className="text-3xl font-heading font-bold text-white mb-1">
              {publishedPosts}
              {draftPosts > 0 && (
                <span className="text-sm font-normal text-text-muted ml-2">+{draftPosts} draft{draftPosts !== 1 && "s"}</span>
              )}
            </p>
            <p className="text-text-muted text-xs font-semibold uppercase tracking-wider">Published Posts</p>
          </div>
        </Link>
      </div>

      {/* Two-column section: Quick Actions + Recent Members */}
      <div className="grid lg:grid-cols-5 gap-6">

        {/* Quick actions */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Link
              href="/admin/users/new"
              className="flex items-center gap-4 p-4 rounded-xl border border-border bg-surface hover:border-accent/40 hover:bg-surface/80 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <Plus className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm font-bold text-white group-hover:text-accent transition-colors">Add New Member</p>
                <p className="text-xs text-text-muted">Register a new gym member</p>
              </div>
            </Link>

            <Link
              href="/admin/posts/new"
              className="flex items-center gap-4 p-4 rounded-xl border border-border bg-surface hover:border-accent/40 hover:bg-surface/80 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                <FileText className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-white group-hover:text-green-400 transition-colors">Publish Content</p>
                <p className="text-xs text-text-muted">Write a blog post or event</p>
              </div>
            </Link>

            <Link
              href="/admin/expiring"
              className="flex items-center gap-4 p-4 rounded-xl border border-border bg-surface hover:border-yellow-500/40 hover:bg-surface/80 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center group-hover:bg-yellow-500/20 transition-colors">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-white group-hover:text-yellow-400 transition-colors">Subscription Alerts</p>
                <p className="text-xs text-text-muted">Review expiring memberships</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent members */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
              Recent Members
            </h2>
            <Link href="/admin/users" className="text-xs text-accent hover:text-accent-hover transition">
              View all →
            </Link>
          </div>

          <div className="rounded-2xl border border-border bg-surface overflow-hidden">
            {recentMembers.length === 0 ? (
              <div className="p-8 text-center text-text-secondary text-sm">
                No members yet. Add your first member to get started.
              </div>
            ) : (
              <div className="divide-y divide-border/50">
                {recentMembers.map((member: any) => {
                  const end = new Date(member.endDate);
                  const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                  const isExpired = diff <= 0;
                  const isWarning = diff > 0 && diff <= 7;

                  return (
                    <div key={member._id.toString()} className="flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors">
                      <div className="flex items-center gap-4">
                        {/* Avatar circle */}
                        <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-sm">
                          {member.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{member.name}</p>
                          <p className="text-xs text-text-muted">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-text-muted hidden sm:inline">{member.plan || "None"}</span>
                        <span
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            isExpired
                              ? "bg-red-500/15 text-red-400"
                              : isWarning
                              ? "bg-yellow-500/15 text-yellow-400"
                              : "bg-green-500/15 text-green-400"
                          }`}
                        >
                          {isExpired ? "Expired" : `${diff}d`}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
