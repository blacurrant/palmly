"use client";

import { useRef, useState } from "react";
import { t, Lang } from "@/lib/translations";

interface Props {
  onImage: (file: File, preview: string) => void;
  lang: Lang;
}

export default function PalmUploader({ onImage, lang }: Props) {
  const tx = t[lang];
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function handleFile(file: File) {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      onImage(file, e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div className="w-full px-4">
      <button
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        style={{
          width: "100%",
          minHeight: 220,
          background: dragging ? "#f0eee6" : "#faf9f5",
          border: `2px dashed ${dragging ? "#c96442" : "#e8e6dc"}`,
          borderRadius: 24,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          cursor: "pointer",
          transition: "all 0.2s ease",
          padding: "32px 24px",
        }}
      >
        {/* Palm illustration */}
        <div style={{
          width: 72,
          height: 72,
          background: "#f5f4ed",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #e8e6dc",
        }}>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path d="M18 28c-4 0-8-3-8-8V10a2 2 0 0 1 4 0v6" stroke="#c96442" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M14 16V8a2 2 0 0 1 4 0v8" stroke="#c96442" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M18 16V7a2 2 0 0 1 4 0v9" stroke="#c96442" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M22 16V9a2 2 0 0 1 4 0v11c0 5-4 8-8 8" stroke="#c96442" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </div>

        <div style={{ textAlign: "center" }}>
          <p style={{
            fontFamily: "Georgia, serif",
            fontSize: 17,
            fontWeight: 500,
            color: "#141413",
            marginBottom: 6,
          }}>
            {tx.uploadPrompt}
          </p>
          <p style={{
            fontSize: 13,
            color: "#87867f",
            lineHeight: 1.5,
            maxWidth: 220,
          }}>
            {tx.uploadSub}
          </p>
        </div>

        {/* Camera / Gallery chips */}
        <div style={{ display: "flex", gap: 8 }}>
          <span style={{
            background: "#c96442",
            color: "#faf9f5",
            fontSize: 13,
            fontWeight: 500,
            padding: "6px 14px",
            borderRadius: 20,
          }}>
            📷 Camera
          </span>
          <span style={{
            background: "#e8e6dc",
            color: "#4d4c48",
            fontSize: 13,
            fontWeight: 500,
            padding: "6px 14px",
            borderRadius: 20,
          }}>
            🖼 Gallery
          </span>
        </div>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleChange}
        style={{ display: "none" }}
      />
    </div>
  );
}
