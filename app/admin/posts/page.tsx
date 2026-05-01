/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, FileText, Eye } from "lucide-react";

interface Post {
  _id: string;
  title: string;
  slug: string;
  type: string;
  status: string;
  createdAt: string;
}

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setPosts(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    
    try {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete post");
      setPosts(posts.filter(p => p._id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex items-center gap-3 text-text-secondary">
          <div className="w-5 h-5 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
          Loading posts...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 rounded-2xl border border-red-500/30 bg-red-500/5 text-red-400">
        <p className="font-bold mb-1">Failed to load posts</p>
        <p className="text-sm text-red-400/70">{error}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white uppercase tracking-tight">Content</h1>
          <p className="text-text-muted text-sm mt-1">{posts.length} post{posts.length !== 1 && "s"} total</p>
        </div>
        <Link href="/admin/posts/new" className="btn-primary flex items-center gap-2 !py-2.5 !px-5 w-fit">
          <Plus className="w-4 h-4" /> New Post
        </Link>
      </div>

      {/* Posts table */}
      <div className="rounded-2xl border border-border bg-surface overflow-hidden">
        {posts.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-surface-alt mx-auto mb-4 flex items-center justify-center border border-border">
              <FileText className="w-7 h-7 text-text-muted" />
            </div>
            <p className="text-white font-bold mb-2">No posts yet</p>
            <p className="text-text-secondary text-sm mb-6">Create your first blog post or event to get started.</p>
            <Link href="/admin/posts/new" className="btn-primary inline-flex items-center gap-2">
              <Plus className="w-4 h-4" /> Create First Post
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-white border-collapse">
              <thead>
                <tr className="border-b border-border/50 bg-surface-alt">
                  <th className="px-5 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Title</th>
                  <th className="px-5 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
                  <th className="px-5 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                  <th className="px-5 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Date</th>
                  <th className="px-5 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {posts.map((post) => (
                  <tr key={post._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-sm text-white">{post.title}</p>
                      <p className="text-xs text-text-muted mt-0.5">/{post.type}/{post.slug}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        post.type === "blog"
                          ? "bg-blue-500/15 text-blue-400"
                          : "bg-purple-500/15 text-purple-400"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${post.type === "blog" ? "bg-blue-400" : "bg-purple-400"}`} />
                        {post.type === "blog" ? "Blog" : "Event"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        post.status === 'published'
                          ? 'bg-green-500/15 text-green-400'
                          : 'bg-yellow-500/15 text-yellow-400'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${post.status === "published" ? "bg-green-400" : "bg-yellow-400"}`} />
                        {post.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-text-muted">
                        {new Date(post.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "2-digit" })}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2 justify-end">
                        {post.status === "published" && (
                          <Link
                            href={`/${post.type}/${post.slug}`}
                            target="_blank"
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-accent hover:bg-accent/10 transition"
                            title="View live"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                        )}
                        <Link
                          href={`/admin/posts/${post._id}/edit`}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-white hover:bg-white/5 transition"
                          title="Edit post"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(post._id, post.title)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-red-400 hover:bg-red-500/10 transition"
                          title="Delete post"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
