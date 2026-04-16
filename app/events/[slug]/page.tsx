/* eslint-disable @typescript-eslint/no-explicit-any */
import dbConnect from "@/lib/db";
import Post from "@/models/Post";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import BlogImageCarousel from "@/components/cms/BlogImageCarousel";

export const revalidate = 60;

/** Safe server-side HTML sanitizer — strips dangerous patterns only.
 *  Content is admin-authored (trusted). */
function sanitizeHtml(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/\bon\w+\s*=\s*(['"])[^'"]*\1/gi, "")
    .replace(/javascript\s*:/gi, "");
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    await dbConnect();
    const post = await Post.findOne({ slug: params.slug, type: "event", status: "published" }).lean() as any;
    if (!post) return { title: "Event Not Found | Kiran's Fitness Club" };

    const ogImage = post.images?.[0]?.startsWith("data:") ? undefined : post.images?.[0];
    const postDate = new Date(post.createdAt || Date.now());

    return {
      title: `${post.title} | Events | Kiran's Fitness Club`,
      description: post.excerpt || "Stay updated with fitness events and workshops at Kiran's Fitness Club, Anjananagar, Bangalore.",
      keywords: ["gym events Bangalore", "fitness events Anjananagar", "Kiran's Fitness Club events"],
      authors: [{ name: "Kiran's Fitness Club" }],
      openGraph: {
        title: `${post.title} | Kiran's Fitness Club Events`,
        description: post.excerpt || "A special fitness event at Kiran's Fitness Club.",
        type: "article",
        publishedTime: postDate.toISOString(),
        url: `https://kiransfitnessclub.com/events/${params.slug}`,
        siteName: "Kiran's Fitness Club",
        ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }] }),
      },
      twitter: {
        card: "summary_large_image",
        title: `${post.title} | Kiran's Fitness Club`,
        description: post.excerpt || "A special fitness event in Bangalore.",
        ...(ogImage && { images: [ogImage] }),
      },
      alternates: {
        canonical: `https://kiransfitnessclub.com/events/${params.slug}`,
      },
    };
  } catch {
    return { title: "Events | Kiran's Fitness Club" };
  }
}

export default async function EventPostPage({ params }: { params: { slug: string } }) {
  try {
    await dbConnect();
    const post = await Post.findOne({ slug: params.slug, type: "event", status: "published" }).lean() as any;

    if (!post) notFound();

    const cleanHtml = sanitizeHtml(post.content || "");
    const postDate = post.createdAt instanceof Date ? post.createdAt : new Date(post.createdAt || Date.now());

    const eventSchema = {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": post.title,
      "startDate": postDate.toISOString(),
      "endDate": postDate.toISOString(),
      "description": post.excerpt || "A special fitness event at Kiran's Fitness Club.",
      "url": `https://kiransfitnessclub.com/events/${params.slug}`,
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": {
        "@type": "Place",
        "name": "Kiran's Fitness Club",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "#123, Magadi Main Road, Anjananagar",
          "addressLocality": "Bangalore",
          "postalCode": "560091",
          "addressCountry": "IN"
        }
      },
      "organizer": {
        "@type": "Organization",
        "name": "Kiran's Fitness Club",
        "url": "https://kiransfitnessclub.com"
      }
    };

    return (
      <main className="pt-32 pb-20 bg-background min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
        />

        <article className="container-custom max-w-4xl">
          <Link href="/events" className="inline-flex items-center gap-2 text-text-secondary hover:text-white transition-colors mb-8 group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back to Events
          </Link>

          {/* Image carousel or single image */}
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
                <MapPin className="w-4 h-4 text-accent" />
                Kiran&apos;s Fitness Club, Anjananagar
              </span>
              <span className="px-2 py-0.5 rounded bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider border border-accent/20">
                Event
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
              <p className="text-white font-bold mb-1">Kiran&apos;s Fitness Club</p>
              <p className="text-text-secondary text-sm">#123, Magadi Main Road, Anjananagar, Bangalore – 560091</p>
            </div>
            <Link href="/events" className="btn-primary whitespace-nowrap">
              All Events
            </Link>
          </div>
        </article>
      </main>
    );
  } catch (err: any) {
    console.error("Event Detail Error:", err);
    return (
      <main className="pt-32 pb-20 bg-background min-h-screen flex items-center justify-center">
        <div className="card p-8 border border-red-500/50 text-center max-w-lg">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Event Load Error</h2>
          <p className="text-text-secondary mb-6">We encountered a technical issue while loading this event. Please try again shortly.</p>
          <Link href="/events" className="btn-primary inline-block">Back to Events</Link>
        </div>
      </main>
    );
  }
}
