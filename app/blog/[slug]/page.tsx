/* eslint-disable @typescript-eslint/no-explicit-any */
import dbConnect from "@/lib/db";
import Post from "@/models/Post";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import ImageCarousel from "@/components/cms/ImageCarousel";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  await dbConnect();
  const post = await Post.findOne({ slug: params.slug, type: "blog", status: "published" }).lean() as any;
  
  if (!post) return { title: "Post Not Found" };
  
  return {
    title: `${post.title} | Kiran's Fitness Club`,
    description: post.excerpt || "Read the latest fitness insights and strategies from Kiran's Fitness Club.",
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  try {
    await dbConnect();
    const post = await Post.findOne({ slug: params.slug, type: "blog", status: "published" }).lean() as any;

    if (!post) notFound();

    // Explicit server-side DOM sanitization 
    const cleanHtml = DOMPurify.sanitize(post.content || "");
    const postDate = post.createdAt instanceof Date ? post.createdAt : new Date(post.createdAt || Date.now());

    return (
      <main className="pt-32 pb-20 bg-background min-h-screen">
        <article className="container-custom max-w-4xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-text-secondary hover:text-white transition-colors mb-8">
            <ArrowLeft className="w-5 h-5" /> Back to Blog
          </Link>
          
          {post.images && post.images.length > 0 && <ImageCarousel images={post.images} />}
          
          <header className="mb-12 border-b border-border/50 pb-8 mt-6">
            <div className="flex items-center gap-2 text-accent font-bold mb-4">
              <Calendar className="w-5 h-5" />
              <time dateTime={postDate.toISOString()}>
                {postDate.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight">
              {post.title}
            </h1>
          </header>

          <div 
            className="prose prose-invert prose-lg prose-accent max-w-none prose-img:rounded-xl prose-img:border prose-img:border-border"
            dangerouslySetInnerHTML={{ __html: cleanHtml }} 
          />
        </article>
      </main>
    );
  } catch (err: any) {
    console.error("Critical Blog Detail Error:", err);
    return (
      <main className="pt-32 pb-20 bg-background min-h-screen flex items-center justify-center">
        <div className="card p-8 border border-red-500/50 text-center max-w-lg">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Content Load Error</h2>
          <p className="text-text-secondary mb-6">We encountered a technical issue while rendering this post.</p>
          <code className="block p-4 bg-black/50 rounded text-xs text-red-400 text-left overflow-auto mb-6">
            Error: {err.message || "Unknown server error"}
          </code>
          <Link href="/blog" className="btn-primary inline-block">Back to Blog</Link>
        </div>
      </main>
    );
  }
}
