/* eslint-disable @typescript-eslint/no-explicit-any */
import dbConnect from "@/lib/db";
import Post from "@/models/Post";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";

import { ArrowLeft, Calendar, Clock } from "lucide-react";
import BlogImageCarousel from "@/components/cms/BlogImageCarousel";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  await dbConnect();
  const post = await Post.findOne({ slug: params.slug, type: "blog", status: "published" }).lean() as any;

  if (!post) return { title: "Post Not Found" };

  const ogImage = post.images?.[0] || "/icon.png";
  const postDate = new Date(post.createdAt || Date.now());

  return {
    title: `${post.title} | Blog | Kiran's Fitness Club`,
    description: post.excerpt || "Read the latest fitness insights from Kiran's Fitness Club in Anjananagar, Bangalore.",
    keywords: ["fitness blog", "Kiran's Fitness Club", "gym Anjananagar", "fitness tips Bangalore", post.title],
    authors: [{ name: "Kiran's Fitness Club" }],
    openGraph: {
      title: `${post.title} | Kiran's Fitness Club Blog`,
      description: post.excerpt || "Read the latest fitness insights from Kiran's Fitness Club.",
      type: "article",
      publishedTime: postDate.toISOString(),
      url: `https://kirans-fitness-club.vercel.app/blog/${params.slug}`,
      siteName: "Kiran's Fitness Club",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Kiran's Fitness Club`,
      description: post.excerpt || "Read the latest fitness insights.",
      images: [ogImage],
    },
    alternates: {
      canonical: `https://kirans-fitness-club.vercel.app/blog/${params.slug}`,
    },
  };
}

function readingTime(content: string): number {
  const words = content.replace(/<[^>]+>/g, "").split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  try {
    await dbConnect();
    const post = await Post.findOne({ slug: params.slug, type: "blog", status: "published" }).lean() as any;

    if (!post) notFound();

    const cleanHtml = DOMPurify.sanitize(post.content || "");
    const postDate = post.createdAt instanceof Date ? post.createdAt : new Date(post.createdAt || Date.now());
    const mins = readingTime(post.content || "");

    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.title,
      "description": post.excerpt || "",
      "image": post.images?.[0] || "",
      "datePublished": postDate.toISOString(),
      "dateModified": post.updatedAt ? new Date(post.updatedAt).toISOString() : postDate.toISOString(),
      "author": {
        "@type": "Organization",
        "name": "Kiran's Fitness Club",
        "url": "https://kirans-fitness-club.vercel.app"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Kiran's Fitness Club",
        "logo": {
          "@type": "ImageObject",
          "url": "https://kirans-fitness-club.vercel.app/icon.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://kirans-fitness-club.vercel.app/blog/${params.slug}`
      }
    };

    return (
      <main className="pt-32 pb-20 bg-background min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />

        <article className="container-custom max-w-4xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-text-secondary hover:text-white transition-colors mb-8 group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back to Blog
          </Link>

          {/* Hero image(s) */}
          {post.images && post.images.length > 0 && (
            <div className="mb-8 rounded-xl overflow-hidden border border-border">
              {post.images.length === 1 ? (
                <div className="w-full h-[400px] md:h-[520px] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.images[0]}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <BlogImageCarousel images={post.images} title={post.title} />
              )}
            </div>
          )}

          <header className="mb-12 border-b border-border/50 pb-8 mt-6">
            <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary mb-6">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-accent" />
                <time dateTime={postDate.toISOString()}>
                  {postDate.toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-accent" />
                {mins} min read
              </span>
              <span className="px-2 py-0.5 rounded bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider border border-accent/20">
                Blog
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="mt-4 text-xl text-text-secondary leading-relaxed">
                {post.excerpt}
              </p>
            )}
          </header>

          <div
            className="prose prose-invert prose-lg max-w-none
              prose-headings:font-heading prose-headings:text-white
              prose-p:text-gray-300 prose-p:leading-relaxed
              prose-a:text-accent prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white
              prose-img:rounded-xl prose-img:border prose-img:border-border
              prose-blockquote:border-l-accent prose-blockquote:text-text-secondary
              prose-li:text-gray-300"
            dangerouslySetInnerHTML={{ __html: cleanHtml }}
          />

          <div className="mt-16 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-white font-bold mb-1">Published by Kiran&apos;s Fitness Club</p>
              <p className="text-text-secondary text-sm">Anjananagar, Bangalore — Your neighbourhood gym</p>
            </div>
            <Link href="/blog" className="btn-primary whitespace-nowrap">
              More Articles
            </Link>
          </div>
        </article>
      </main>
    );
  } catch (err: any) {
    console.error("Critical Blog Detail Error:", err);
    return (
      <main className="pt-32 pb-20 bg-background min-h-screen flex items-center justify-center">
        <div className="card p-8 border border-red-500/50 text-center max-w-lg">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Post Load Error</h2>
          <p className="text-text-secondary mb-6">We encountered a technical issue while loading this blog post.</p>
          <code className="block p-4 bg-black/50 rounded text-xs text-red-400 text-left overflow-auto mb-6">
            Error: {err.message || "Unknown server error"}
          </code>
          <Link href="/blog" className="btn-primary inline-block">Back to Blog</Link>
        </div>
      </main>
    );
  }
}
