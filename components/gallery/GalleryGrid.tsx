"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  position: number;
  image: string;
  alt: string;
}

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  // Build rows in 2-1-2-1 pattern
  const rows: GalleryImage[][] = [];
  let i = 0;
  let isDouble = true;

  while (i < images.length) {
    if (isDouble && i + 1 < images.length) {
      rows.push([images[i], images[i + 1]]);
      i += 2;
    } else {
      rows.push([images[i]]);
      i += 1;
    }
    isDouble = !isDouble;
  }

  const openLightbox = (idx: number) => setLightbox(idx);
  const closeLightbox = () => setLightbox(null);

  const goPrev = () => {
    if (lightbox === null) return;
    setLightbox(lightbox === 0 ? images.length - 1 : lightbox - 1);
  };

  const goNext = () => {
    if (lightbox === null) return;
    setLightbox(lightbox === images.length - 1 ? 0 : lightbox + 1);
  };

  return (
    <>
      <div className="space-y-4 max-w-5xl mx-auto">
        {rows.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className={`grid gap-4 ${row.length === 2 ? "grid-cols-2" : "grid-cols-1"}`}
          >
            {row.map((img) => {
              const globalIdx = images.findIndex((g) => g.position === img.position);
              return (
                <button
                  key={img.position}
                  onClick={() => openLightbox(globalIdx)}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-surface focus:outline-none focus:ring-2 focus:ring-accent/50"
                  style={{ aspectRatio: row.length === 2 ? "4/3" : "16/7" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.image}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Lightbox modal */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image */}
          <div className="max-w-5xl max-h-[85vh] px-16" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[lightbox].image}
              alt={images[lightbox].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-xl"
            />
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium">
            {lightbox + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
