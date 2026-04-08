/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// Avoid Next.js SSR hydration breaking the Quill widget natively
const ReactQuill: any = dynamic(() => import("react-quill"), { ssr: false });

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function QuillEditor({ value, onChange }: QuillEditorProps) {
  return (
    <div className="bg-white text-black p-2 rounded-md overflow-hidden border border-border">
      <ReactQuill 
        theme="snow" 
        value={value} 
        onChange={onChange}
        className="min-h-[300px]"
      />
    </div>
  );
}
