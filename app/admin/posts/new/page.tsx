/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ImagePlus, X } from "lucide-react";
import QuillEditor from "@/components/admin/QuillEditor";

export default function NewPostPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    type: "blog",
    status: "draft",
    content: "",
    images: [] as string[],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = document.createElement("img");
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let { width, height } = img;
          const MAX = 800;
          if (width > height && width > MAX) {
            height *= MAX / width; width = MAX;
          } else if (height > MAX) {
            width *= MAX / height; height = MAX;
          }
          canvas.width = width; canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressed = canvas.toDataURL("image/jpeg", 0.7);
            setFormData(prev => ({ ...prev, images: [...prev.images, compressed] }));
          }
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Native large payload push - normally Base64 would hit NextJS limits but for small gyms it's optimal
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "Unknown error");
      
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
            <div className="space-y-2 md:col-span-2">
              <label className="text-text-secondary text-sm font-bold">Title</label>
              <input 
                type="text" 
                required 
                className="w-full bg-background border border-border rounded-button px-4 py-3 text-white focus:outline-none focus:border-accent"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label className="text-text-secondary text-sm font-bold">Short Description (Excerpt)</label>
              <input 
                type="text" 
                maxLength={160}
                placeholder="A brief summary measuring exactly what the article captures (Optional)"
                className="w-full bg-background border border-border rounded-button px-4 py-3 text-white focus:outline-none focus:border-accent"
                value={formData.excerpt}
                onChange={e => setFormData({...formData, excerpt: e.target.value})}
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
          </div>
          
          <div className="space-y-4 pt-4 border-t border-border/50">
            <label className="text-text-secondary text-sm font-bold">Photo Gallery (Base64 Carousels)</label>
            <div className="flex items-center gap-4">
              <label className="cursor-pointer btn-secondary flex items-center gap-2">
                <ImagePlus className="w-5 h-5"/> Add Photos
                <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
              <span className="text-sm text-text-muted">Select multiple images to create a slidable carousel automatically.</span>
            </div>
            
            {formData.images.length > 0 && (
              <div className="flex gap-4 overflow-x-auto py-2">
                {formData.images.map((src, idx) => (
                  <div key={idx} className="relative shrink-0 rounded-md overflow-hidden border border-border w-32 h-32">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="Upload preview" className="object-cover w-full h-full" />
                    <button type="button" onClick={() => removeImage(idx)} className="absolute top-1 right-1 bg-black/70 p-1 rounded-full text-white hover:text-red-500 hover:bg-black transition">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="space-y-2 pt-4 border-t border-border/50">
            <label className="text-text-secondary text-sm font-bold">Detailed Content</label>
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
