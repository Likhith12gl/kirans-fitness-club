/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useRef } from "react";
import { Bold, Italic, List, Heading2, LinkIcon } from "lucide-react";

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function QuillEditor({ value, onChange }: QuillEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [mode, setMode] = useState<"write" | "preview">("write");

  const insertTag = (before: string, after: string) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = value.substring(start, end);
    const newValue = value.substring(0, start) + before + selected + after + value.substring(end);
    onChange(newValue);
    setTimeout(() => {
      ta.focus();
      ta.selectionStart = start + before.length;
      ta.selectionEnd = start + before.length + selected.length;
    }, 0);
  };

  const toolbar = [
    { icon: Bold, label: "Bold", action: () => insertTag("<strong>", "</strong>") },
    { icon: Italic, label: "Italic", action: () => insertTag("<em>", "</em>") },
    { icon: Heading2, label: "Heading", action: () => insertTag("<h3>", "</h3>") },
    { icon: List, label: "List Item", action: () => insertTag("<li>", "</li>") },
    { icon: LinkIcon, label: "Link", action: () => {
      const url = prompt("Enter URL:");
      if (url) insertTag(`<a href="${url}">`, "</a>");
    }},
  ];

  return (
    <div className="rounded-md overflow-hidden border border-border">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 bg-surface border-b border-border">
        <div className="flex gap-1 mr-4">
          {toolbar.map((btn) => (
            <button
              key={btn.label}
              type="button"
              onClick={btn.action}
              title={btn.label}
              className="p-2 rounded hover:bg-white/10 text-text-secondary hover:text-white transition"
            >
              <btn.icon className="w-4 h-4" />
            </button>
          ))}
        </div>
        <div className="ml-auto flex gap-2">
          <button
            type="button"
            onClick={() => setMode("write")}
            className={`px-3 py-1 rounded text-sm transition ${mode === "write" ? "bg-accent text-background font-bold" : "text-text-secondary hover:text-white"}`}
          >
            Write
          </button>
          <button
            type="button"
            onClick={() => setMode("preview")}
            className={`px-3 py-1 rounded text-sm transition ${mode === "preview" ? "bg-accent text-background font-bold" : "text-text-secondary hover:text-white"}`}
          >
            Preview
          </button>
        </div>
      </div>

      {/* Editor / Preview */}
      {mode === "write" ? (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write your blog/event content here. You can use the toolbar buttons to add formatting, or write HTML directly."
          className="w-full min-h-[300px] bg-background text-white p-4 resize-y focus:outline-none font-mono text-sm leading-relaxed"
        />
      ) : (
        <div 
          className="min-h-[300px] bg-background text-white p-4 prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: value || "<p class='text-gray-500'>Nothing to preview yet...</p>" }}
        />
      )}
    </div>
  );
}
