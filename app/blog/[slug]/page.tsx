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
  await dbConnect();
  const post = await Post.findOne({ slug: params.slug, type: "blog", status: "published" }).lean() as any;

  if (!post) notFound();

  // Explicit server-side DOM sanitization stripping explicit attack vectors
  const cleanHtml = DOMPurify.sanitize(post.content);

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
            <time dateTime={post.createdAt.toISOString()}>
              {post.createdAt.toLocaleDateString('en-US', {
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
}
