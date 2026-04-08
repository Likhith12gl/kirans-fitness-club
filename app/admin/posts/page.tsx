/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2 } from "lucide-react";

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

  if (loading) return <div className="text-white">Loading posts...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading font-bold text-white uppercase">Manage Posts</h1>
        <Link href="/admin/posts/new" className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" /> New Post
        </Link>
      </div>

      <div className="card p-6 border border-border">
        {posts.length === 0 ? (
          <p className="text-text-secondary">No posts found. Create one to get started.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-white border-collapse">
              <thead>
                <tr className="border-b border-border/50 text-text-secondary">
                  <th className="p-4 font-normal">Title</th>
                  <th className="p-4 font-normal">Type</th>
                  <th className="p-4 font-normal">Status</th>
                  <th className="p-4 font-normal">Date</th>
                  <th className="p-4 font-normal text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post._id} className="border-b border-border/50 hover:bg-white/5 transition-colors">
                    <td className="p-4 font-bold">{post.title}</td>
                    <td className="p-4 capitalize">{post.type}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs ${post.status === 'published' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-500'}`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="p-4 ">{new Date(post.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 flex gap-3 justify-end">
                      <Link href={`/admin/posts/${post._id}/edit`} className="text-text-secondary hover:text-white transition">
                        <Edit2 className="w-5 h-5" />
                      </Link>
                      <button onClick={() => handleDelete(post._id, post.title)} className="text-red-500/70 hover:text-red-500 transition">
                        <Trash2 className="w-5 h-5" />
                      </button>
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
