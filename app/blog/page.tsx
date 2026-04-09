/* eslint-disable @typescript-eslint/no-explicit-any */
import dbConnect from "@/lib/db";
import Post from "@/models/Post";
import PostCard from "@/components/cms/PostCard";
import { Metadata } from "next";

export const revalidate = 60; // ISR cache validation every 60s

export const metadata: Metadata = {
  title: "Fitness Blog | Kiran's Fitness Club",
  description: "Read the latest fitness insights, workout tips, and nutritional advice from the expert trainers at Kiran's Fitness Club.",
};

export default async function BlogPage() {
  let posts: any[] = [];
  
  try {
    await dbConnect();
    
    const rawPosts = await Post.find({ type: "blog", status: "published" })
      .sort({ createdAt: -1 })
      .lean();

    posts = rawPosts.map((p: any) => ({
      _id: p._id.toString(),
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      createdAt: p.createdAt.toISOString(),
      images: p.images || [],
    }));
  } catch {
    console.warn("Database unavailable during static generation, defaulting to empty blog list");
  }

  return (
    <main className="pt-24 pb-20 bg-background min-h-screen">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 uppercase">
            Fitness <span className="text-accent">Insights</span>
          </h1>
          <p className="text-text-secondary text-lg">
            Elevate your training with actionable advice and deep dives into modern fitness methodologies.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center text-text-secondary py-12 card border border-border">
            No blog posts published yet. Check back soon!
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} baseRoute="/blog" />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
