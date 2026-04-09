"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

export default function ImageCarousel({ images }: { images: string[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="relative group w-full mb-8 rounded-xl overflow-hidden bg-black/50 border border-border">
      <div 
        ref={scrollRef} 
        className="flex overflow-x-auto snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Intentionally hiding scrollbar inline for CSS fallbacks */}
        <style dangerouslySetInnerHTML={{__html: `
          .flex::-webkit-scrollbar { display: none; }
        `}} />
        
        {images.map((src, i) => (
          <div key={i} className="w-full shrink-0 snap-center border-r border-border/50 last:border-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={`Slide ${i + 1}`} className="w-full h-[400px] md:h-[500px] object-cover" />
          </div>
        ))}
      </div>
      
      {images.length > 1 && (
        <>
          <button 
            onClick={() => scroll("left")}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent border border-white/20 backdrop-blur-sm"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={() => scroll("right")}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent border border-white/20 backdrop-blur-sm"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-white/50 backdrop-blur-sm" />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
