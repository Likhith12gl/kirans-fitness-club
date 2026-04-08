/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import QuillEditor from "@/components/admin/QuillEditor";

export default function NewPostPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    type: "blog",
    status: "draft",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      router.push("/admin/posts");
      router.refresh(); // Refresh the list
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/posts" className="text-text-secondary hover:text-white transition">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-3xl font-heading font-bold text-white uppercase">New Post</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <div className="p-4 bg-red-500/10 border border-red-500/50 text-red-500 rounded-md">{error}</div>}
        
        <div className="card p-6 border border-border space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-text-secondary text-sm font-bold">Title</label>
              <input 
                type="text" 
                required 
                className="w-full bg-background border border-border rounded-button px-4 py-3 text-white focus:outline-none focus:border-accent"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-text-secondary text-sm font-bold">Type</label>
              <select 
                className="w-full bg-background border border-border rounded-button px-4 py-3 text-white focus:outline-none focus:border-accent"
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value})}
              >
                <option value="blog">Blog Post</option>
                <option value="event">Gym Event</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-text-secondary text-sm font-bold">Status</label>
              <select 
                className="w-full bg-background border border-border rounded-button px-4 py-3 text-white focus:outline-none focus:border-accent"
                value={formData.status}
                onChange={e => setFormData({...formData, status: e.target.value})}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-text-secondary text-sm font-bold">Excerpt (Optional)</label>
              <input 
                type="text" 
                className="w-full bg-background border border-border rounded-button px-4 py-3 text-white focus:outline-none focus:border-accent"
                value={formData.excerpt}
                onChange={e => setFormData({...formData, excerpt: e.target.value})}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-text-secondary text-sm font-bold">Content</label>
            <QuillEditor 
              value={formData.content} 
              onChange={(val) => setFormData({...formData, content: val})} 
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Link href="/admin/posts" className="px-6 py-3 text-text-secondary hover:text-white transition">
            Cancel
          </Link>
          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
