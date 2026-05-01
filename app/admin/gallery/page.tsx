"use client";

import { useEffect, useState, useRef } from "react";
import { Upload, Trash2, ImageIcon, Loader2 } from "lucide-react";

interface SlotImage {
  position: number;
  image: string;
  alt: string;
}

// The 2-1-2-1 layout pattern for 10 slots
const LAYOUT_ROWS = [
  [1, 2],
  [3],
  [4, 5],
  [6],
  [7, 8],
  [9],
  [10],
];

export default function AdminGalleryPage() {
  const [images, setImages] = useState<SlotImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<number | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [targetSlot, setTargetSlot] = useState<number>(0);

  const fetchImages = async () => {
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      if (res.ok) setImages(data);
    } catch {
      console.error("Failed to fetch gallery");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const getImageForSlot = (pos: number): SlotImage | undefined => {
    return images.find((img) => img.position === pos);
  };

  const handleUploadClick = (position: number) => {
    setTargetSlot(position);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !targetSlot) return;

    // Validate file type and size
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be under 5MB.");
      return;
    }

    setUploading(targetSlot);

    try {
      // Convert to base64
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;

        const res = await fetch("/api/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            position: targetSlot,
            image: base64,
            alt: `Gym photo ${targetSlot} at Kiran's Fitness Club`,
          }),
        });

        if (res.ok) {
          // Refresh
          await fetchImages();
        } else {
          const data = await res.json();
          alert(data.error || "Upload failed");
        }

        setUploading(null);
      };
      reader.readAsDataURL(file);
    } catch {
      alert("Upload failed. Please try again.");
      setUploading(null);
    }

    // Reset input
    e.target.value = "";
  };

  const handleDelete = async (position: number) => {
    if (!window.confirm(`Delete image at position ${position}?`)) return;

    setDeleting(position);
    try {
      const res = await fetch(`/api/gallery?position=${position}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setImages(images.filter((img) => img.position !== position));
      } else {
        alert("Failed to delete image");
      }
    } catch {
      alert("Delete failed");
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex items-center gap-3 text-text-secondary">
          <div className="w-5 h-5 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
          Loading gallery...
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-white uppercase tracking-tight">
          Gallery Manager
        </h1>
        <p className="text-text-muted text-sm mt-2">
          Upload up to 10 gym photos. Click a slot to upload, or the trash icon to remove.
          Images display in a 2–1–2–1 pattern on the public gallery page.
        </p>
      </div>

      {/* Count badge */}
      <div className="mb-6 flex items-center gap-3">
        <span className="px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-bold">
          {images.length} / 10 photos
        </span>
        <span className="text-text-muted text-xs">Max 5MB per image • JPG, PNG, WebP</span>
      </div>

      {/* Layout grid — mirrors the public gallery pattern */}
      <div className="space-y-4 max-w-4xl">
        {LAYOUT_ROWS.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className={`grid gap-4 ${row.length === 2 ? "grid-cols-2" : "grid-cols-1"}`}
          >
            {row.map((pos) => {
              const existing = getImageForSlot(pos);
              const isUploading = uploading === pos;
              const isDeleting = deleting === pos;

              return (
                <div
                  key={pos}
                  className="relative group rounded-2xl border border-border bg-surface overflow-hidden"
                  style={{ aspectRatio: row.length === 2 ? "4/3" : "16/7" }}
                >
                  {existing ? (
                    <>
                      {/* Existing image */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={existing.image}
                        alt={existing.alt}
                        className="w-full h-full object-cover"
                      />

                      {/* Overlay with actions */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-200 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                        {/* Replace */}
                        <button
                          onClick={() => handleUploadClick(pos)}
                          disabled={isUploading}
                          className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-accent/80 flex items-center justify-center text-white transition disabled:opacity-50"
                          title="Replace image"
                        >
                          {isUploading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <Upload className="w-5 h-5" />
                          )}
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(pos)}
                          disabled={isDeleting}
                          className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-red-500/80 flex items-center justify-center text-white transition disabled:opacity-50"
                          title="Delete image"
                        >
                          {isDeleting ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <Trash2 className="w-5 h-5" />
                          )}
                        </button>
                      </div>

                      {/* Position badge */}
                      <div className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-white text-xs font-bold">
                        #{pos}
                      </div>
                    </>
                  ) : (
                    /* Empty slot */
                    <button
                      onClick={() => handleUploadClick(pos)}
                      disabled={isUploading}
                      className="w-full h-full flex flex-col items-center justify-center gap-3 text-text-muted hover:text-accent hover:border-accent/30 transition-colors disabled:opacity-50"
                    >
                      {isUploading ? (
                        <Loader2 className="w-8 h-8 animate-spin text-accent" />
                      ) : (
                        <>
                          <div className="w-14 h-14 rounded-xl border-2 border-dashed border-border group-hover:border-accent/40 flex items-center justify-center transition-colors">
                            <ImageIcon className="w-6 h-6" />
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-semibold">Slot #{pos}</p>
                            <p className="text-xs text-text-muted mt-0.5">Click to upload</p>
                          </div>
                        </>
                      )}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Pattern legend */}
      <div className="mt-8 p-5 rounded-2xl border border-border bg-surface max-w-4xl">
        <h3 className="text-sm font-bold text-text-secondary mb-3">Layout Pattern Preview</h3>
        <div className="grid grid-cols-6 gap-2">
          <div className="col-span-3 h-6 rounded bg-accent/10 flex items-center justify-center text-[10px] text-accent font-bold">#1</div>
          <div className="col-span-3 h-6 rounded bg-accent/10 flex items-center justify-center text-[10px] text-accent font-bold">#2</div>
          <div className="col-span-6 h-6 rounded bg-accent/10 flex items-center justify-center text-[10px] text-accent font-bold">#3 (full width)</div>
          <div className="col-span-3 h-6 rounded bg-accent/10 flex items-center justify-center text-[10px] text-accent font-bold">#4</div>
          <div className="col-span-3 h-6 rounded bg-accent/10 flex items-center justify-center text-[10px] text-accent font-bold">#5</div>
          <div className="col-span-6 h-6 rounded bg-accent/10 flex items-center justify-center text-[10px] text-accent font-bold">#6 (full width)</div>
          <div className="col-span-3 h-6 rounded bg-accent/10 flex items-center justify-center text-[10px] text-accent font-bold">#7</div>
          <div className="col-span-3 h-6 rounded bg-accent/10 flex items-center justify-center text-[10px] text-accent font-bold">#8</div>
          <div className="col-span-6 h-6 rounded bg-accent/10 flex items-center justify-center text-[10px] text-accent font-bold">#9 (full width)</div>
          <div className="col-span-6 h-6 rounded bg-accent/10 flex items-center justify-center text-[10px] text-accent font-bold">#10 (full width)</div>
        </div>
      </div>
    </div>
  );
}
