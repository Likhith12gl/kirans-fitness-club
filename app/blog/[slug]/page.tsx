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

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  try {
    await dbConnect();
    const post = await Post.findOne({ slug: params.slug, type: "blog", status: "published" }).lean() as any;

    if (!post) notFound();

    return (
      <main className="pt-32 pb-20 bg-background min-h-screen">
        <article className="container-custom max-w-4xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-text-secondary hover:text-white transition-colors mb-8">
            <ArrowLeft className="w-5 h-5" /> Back to Blog
          </Link>
          
          <header className="mb-12 border-b border-border/50 pb-8 mt-6">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight">
              {post.title} (STRICT DEBUG MODE)
            </h1>
          </header>

          <div 
            className="prose prose-invert prose-lg text-white"
            dangerouslySetInnerHTML={{ __html: post.content || "Empty content" }} 
          />
        </article>
      </main>
    );
  } catch (err: any) {
    return <div className="p-20 text-white">Debug Error: {err.message}</div>;
  }
}
