import dbConnect from "@/lib/db";
import User from "@/models/User";
import Post from "@/models/Post";
import Link from "next/link";
import { Users, AlertTriangle, FileText, Settings } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  await dbConnect();
  
  // Exclude Admin from standard active user count implicitly
  const activeUsers = await User.countDocuments({ role: "user" });
  
  // Calculate subscriptions ending within 7 days
  const sevenDaysFromNow = new Date();
  sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
  
  const expiringUsers = await User.countDocuments({ 
    role: "user",
    endDate: {
      $lte: sevenDaysFromNow,
      $gt: new Date()
    }
  });

  const publishedPosts = await Post.countDocuments({ status: "published" });

  return (
    <div>
      <h1 className="text-3xl font-heading font-bold text-white uppercase mb-8">Admin Dashboard</h1>
      
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="card p-6 border border-border border-l-4 border-l-accent flex items-center gap-6">
          <div className="bg-white/5 p-4 rounded-full text-accent">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <p className="text-text-secondary text-sm font-bold uppercase tracking-wider mb-1">Total Members</p>
            <p className="text-4xl font-heading font-bold text-white">{activeUsers}</p>
          </div>
        </div>
        
        <div className="card p-6 border border-border border-l-4 border-l-yellow-500 flex items-center gap-6">
          <div className="bg-yellow-500/10 p-4 rounded-full text-yellow-500">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div>
            <p className="text-text-secondary text-sm font-bold uppercase tracking-wider mb-1">Expiring &lt; 7 Days</p>
            <p className="text-4xl font-heading font-bold text-white">{expiringUsers}</p>
          </div>
        </div>

        <div className="card p-6 border border-border border-l-4 border-l-green-500 flex items-center gap-6">
          <div className="bg-green-500/10 p-4 rounded-full text-green-500">
            <FileText className="w-8 h-8" />
          </div>
          <div>
            <p className="text-text-secondary text-sm font-bold uppercase tracking-wider mb-1">Published Posts</p>
            <p className="text-4xl font-heading font-bold text-white">{publishedPosts}</p>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <Link href="/admin/users/new" className="card p-6 border border-border hover:border-accent transition group flex items-center justify-between">
          <span className="font-bold text-white group-hover:text-accent transition">Add New Member</span>
          <Users className="w-5 h-5 text-text-secondary group-hover:text-accent transition" />
        </Link>
        
        <Link href="/admin/posts/new" className="card p-6 border border-border hover:border-accent transition group flex items-center justify-between">
          <span className="font-bold text-white group-hover:text-accent transition">Publish Content</span>
          <FileText className="w-5 h-5 text-text-secondary group-hover:text-accent transition" />
        </Link>

        <div className="card p-6 border border-border hover:border-accent transition group flex items-center justify-between opacity-50 cursor-not-allowed">
          <span className="font-bold text-white group-hover:text-accent transition">System Settings</span>
          <Settings className="w-5 h-5 text-text-secondary group-hover:text-accent transition" />
        </div>
      </div>
    </div>
  );
}
