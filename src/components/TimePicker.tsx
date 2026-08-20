"use client";

import { useState, useRef, useEffect } from "react";

const SLOTS: string[] = [];
for (let h = 8; h <= 22; h++) {
  SLOTS.push(`${String(h).padStart(2, "0")}:00`);
  if (h < 22) SLOTS.push(`${String(h).padStart(2, "0")}:30`);
}

interface Props {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  inputClass: string;
  borderStyle: React.CSSProperties;
}

export default function TimePicker({ value, onChange, placeholder = "Uhrzeit wählen", inputClass, borderStyle }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (open && value && listRef.current) {
      const idx = SLOTS.indexOf(value);
      if (idx !== -1) {
        const item = listRef.current.children[idx] as HTMLElement;
        item?.scrollIntoView({ block: "center" });
      }
    }
  }, [open, value]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`${inputClass} text-left flex items-center justify-between`}
        style={{ ...borderStyle, color: value ? "#1B1714" : "#A89C8B" }}
      >
        <span>{value || placeholder}</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 opacity-40">
          <circle cx="8" cy="8" r="6" stroke="#1B1714" strokeWidth="1.5"/>
          <path d="M8 5V8.5L10.5 10" stroke="#1B1714" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <div
          className="absolute top-[calc(100%+8px)] left-0 z-50"
          style={{
            background: "#F4EEE2",
            border: "1.5px solid rgba(27,23,20,.12)",
            borderRadius: "16px",
            boxShadow: "0 16px 48px -12px rgba(27,23,20,.25)",
            width: "180px",
            overflow: "hidden",
          }}
        >
          <div ref={listRef} style={{ maxHeight: "240px", overflowY: "auto" }} className="py-2">
            {SLOTS.map(slot => {
              const isSelected = slot === value;
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => { onChange(slot); setOpen(false); }}
                  className="w-full text-left px-4 py-[9px] text-[14px] font-medium transition-colors border-none cursor-pointer"
                  style={{
                    background: isSelected ? "#D8542B" : "transparent",
                    color: isSelected ? "#fff" : "#1B1714",
                  }}
                  onMouseEnter={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.background = "rgba(27,23,20,.06)"; }}
                  onMouseLeave={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  {slot} Uhr
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
