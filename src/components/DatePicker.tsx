"use client";

import { useState, useRef, useEffect } from "react";

const WEEKDAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const MONTHS = [
  "Januar","Februar","März","April","Mai","Juni",
  "Juli","August","September","Oktober","November","Dezember",
];

function toISO(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function buildGrid(year: number, month: number) {
  const firstDow = new Date(year, month, 1).getDay();
  const offset = firstDow === 0 ? 6 : firstDow - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMon = new Date(year, month, 0).getDate();
  const cells: { dateStr: string | null; day: number; current: boolean }[] = [];
  for (let i = offset - 1; i >= 0; i--)
    cells.push({ dateStr: null, day: daysInPrevMon - i, current: false });
  for (let d = 1; d <= daysInMonth; d++)
    cells.push({ dateStr: toISO(year, month, d), day: d, current: true });
  for (let d = 1; d <= 42 - cells.length; d++)
    cells.push({ dateStr: null, day: d, current: false });
  return cells;
}

interface Props {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  inputClass: string;
  borderStyle: React.CSSProperties;
}

export default function DatePicker({ value, onChange, placeholder = "Datum wählen", inputClass, borderStyle }: Props) {
  const today = new Date();
  const todayStr = toISO(today.getFullYear(), today.getMonth(), today.getDate());

  const [open, setOpen] = useState(false);
  const [year, setYear] = useState(value ? parseInt(value.slice(0, 4)) : today.getFullYear());
  const [month, setMonth] = useState(value ? parseInt(value.slice(5, 7)) - 1 : today.getMonth());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const displayValue = value
    ? new Date(value + "T12:00:00").toLocaleDateString("de-CH", { day: "2-digit", month: "long", year: "numeric" })
    : "";

  const prevMonth = () => { if (month === 0) { setYear(y => y - 1); setMonth(11); } else setMonth(m => m - 1); };
  const nextMonth = () => { if (month === 11) { setYear(y => y + 1); setMonth(0); } else setMonth(m => m + 1); };

  const cells = buildGrid(year, month);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`${inputClass} text-left flex items-center justify-between`}
        style={{ ...borderStyle, color: displayValue ? "#1B1714" : "#A89C8B" }}
      >
        <span>{displayValue || placeholder}</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 opacity-40">
          <rect x="2" y="3" width="12" height="11" rx="2" stroke="#1B1714" strokeWidth="1.5"/>
          <path d="M5 1.5V4M11 1.5V4" stroke="#1B1714" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M2 7H14" stroke="#1B1714" strokeWidth="1.5"/>
        </svg>
      </button>

      {open && (
        <div
          className="absolute top-[calc(100%+8px)] left-0 z-50 select-none"
          style={{
            background: "#F4EEE2",
            border: "1.5px solid rgba(27,23,20,.12)",
            borderRadius: "16px",
            boxShadow: "0 16px 48px -12px rgba(27,23,20,.25)",
            padding: "20px",
            width: "300px",
          }}
        >
          {/* Month nav */}
          <div className="flex items-center justify-between mb-4">
            <button type="button" onClick={prevMonth} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-charcoal/8 transition-colors border-none bg-transparent cursor-pointer text-taupe">
              ←
            </button>
            <span className="font-heading font-bold text-[15px] tracking-tight text-charcoal">
              {MONTHS[month]} {year}
            </span>
            <button type="button" onClick={nextMonth} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-charcoal/8 transition-colors border-none bg-transparent cursor-pointer text-taupe">
              →
            </button>
          </div>

          {/* Weekdays */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: "4px" }}>
            {WEEKDAYS.map(d => (
              <div key={d} className="text-center text-[10px] font-semibold text-stone uppercase tracking-wider py-1">{d}</div>
            ))}
          </div>

          {/* Days */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px" }}>
            {cells.map((cell, i) => {
              const isPast = cell.dateStr && cell.dateStr < todayStr;
              const isSelected = cell.dateStr === value;
              const isToday = cell.dateStr === todayStr;
              const isDisabled = !cell.current || !!isPast;

              return (
                <button
                  key={i}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => { if (cell.dateStr) { onChange(cell.dateStr); setOpen(false); } }}
                  className="relative flex items-center justify-center rounded-[8px] h-9 text-[13px] font-medium transition-colors border-none cursor-pointer"
                  style={{
                    background: isSelected ? "#D8542B" : isToday ? "rgba(27,23,20,.08)" : "transparent",
                    color: isSelected ? "#fff" : isDisabled ? "rgba(27,23,20,.25)" : "#1B1714",
                    cursor: isDisabled ? "default" : "pointer",
                  }}
                >
                  {cell.day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
