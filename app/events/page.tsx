/* eslint-disable @typescript-eslint/no-explicit-any */
import dbConnect from "@/lib/db";
import Post from "@/models/Post";
import PostCard from "@/components/cms/PostCard";
import { Metadata } from "next";

export const revalidate = 60; 

export const metadata: Metadata = {
  title: "Gym Events & Competitions | Kiran's Fitness Club",
  description: "Stay updated with upcoming powerlifting meets, CrossFit circuits, and community fitness events at Kiran's Fitness Club.",
};

export default async function EventsPage() {
  let posts: any[] = [];

  try {
    await dbConnect();
    
    const rawPosts = await Post.find({ type: "event", status: "published" })
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
    console.warn("Database unavailable during static generation, defaulting to empty events list");
  }

  return (
    <main className="pt-24 pb-20 bg-background min-h-screen">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 uppercase">
            Gym <span className="text-accent">Events</span>
          </h1>
          <p className="text-text-secondary text-lg">
            Join our community challenges, workshops, and competitive events happening right here at the club.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center text-text-secondary py-12 card border border-border">
            No upcoming events currently scheduled. Check back soon!
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} baseRoute="/events" />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
