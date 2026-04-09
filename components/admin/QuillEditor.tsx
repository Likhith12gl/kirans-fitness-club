/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
// @ts-ignore - CSS module import
import "react-quill/dist/quill.snow.css";

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function QuillEditor({ value, onChange }: QuillEditorProps) {
  const [QuillComponent, setQuillComponent] = useState<any>(null);

  useEffect(() => {
    // Only import Quill on the client side, after hydration is complete
    import("react-quill")
      .then((mod) => {
        setQuillComponent(() => mod.default || mod);
      })
      .catch((err) => {
        console.error("Failed to load Quill editor:", err);
      });
  }, []);

  if (!QuillComponent) {
    return (
      <div className="bg-white text-black p-2 rounded-md overflow-hidden border border-border min-h-[300px] flex items-center justify-center">
        <span className="text-gray-400">Loading editor...</span>
      </div>
    );
  }

  return (
    <div className="bg-white text-black p-2 rounded-md overflow-hidden border border-border">
      <QuillComponent
        theme="snow"
        value={value}
        onChange={onChange}
        className="min-h-[300px]"
      />
    </div>
  );
}
