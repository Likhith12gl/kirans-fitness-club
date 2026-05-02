/* eslint-disable @typescript-eslint/no-explicit-any */
import dbConnect from "@/lib/db";
import GalleryImage from "@/models/GalleryImage";
import { Metadata } from "next";
import GalleryGrid from "@/components/gallery/GalleryGrid";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gym Gallery — Photos of Our Facility & Equipment",
  description:
    "Take a virtual tour of Kiran's Fitness Club in Anjananagar, Bangalore. See our premium equipment, spacious training floor, and community in action.",
  alternates: { canonical: "https://kiransfitnessclub.in/gallery" },
  openGraph: {
    title: "Gym Gallery | Kiran's Fitness Club, Anjananagar",
    description: "See our premium gym equipment, training floor, and fitness community in Anjananagar, Bangalore.",
    url: "https://kiransfitnessclub.in/gallery",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gym Gallery | Kiran's Fitness Club",
    description: "Photos of our gym facility, equipment, and community in Anjananagar, Bangalore.",
  },
};

export default async function GalleryPage() {
  let images: any[] = [];

  try {
    await dbConnect();
    const raw = await GalleryImage.find({}).sort({ position: 1 }).lean();
    images = raw.map((img: any) => ({
      position: img.position,
      image: img.image,
      alt: img.alt || "Gym photo",
    }));
  } catch {
    console.warn("Database unavailable during gallery render");
  }

  return (
    <main className="pt-24 pb-20 bg-background min-h-screen">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 uppercase tracking-tight">
            Our <span className="text-accent">Gallery</span>
          </h1>
          <p className="text-text-secondary text-lg">
            A glimpse inside Anjananagar&apos;s top-rated fitness facility — premium equipment, spacious floors, and a community that pushes you further.
          </p>
        </div>

        {images.length === 0 ? (
          <div className="rounded-2xl border border-border bg-surface p-16 text-center max-w-xl mx-auto">
            <p className="text-5xl mb-4">📸</p>
            <p className="text-white font-bold text-xl mb-2">Gallery Coming Soon</p>
            <p className="text-text-secondary">
              We&apos;re preparing a visual tour of our facility. Check back shortly!
            </p>
          </div>
        ) : (
          <GalleryGrid images={images} />
        )}
      </div>
    </main>
  );
}
