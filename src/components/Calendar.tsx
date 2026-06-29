"use client";

import { useState } from "react";

export interface CalendarMark {
  status: "accepted" | "pending" | "declined";
  name?: string;
  id?: string;
}

export interface CalendarProps {
  markedDates?: Record<string, CalendarMark[]>;
  onDayClick?: (date: string, marks: CalendarMark[]) => void;
  selectedDate?: string | null;
}

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
  const offset   = firstDow === 0 ? 6 : firstDow - 1;
  const daysInMonth   = new Date(year, month + 1, 0).getDate();
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

export default function Calendar({ markedDates = {}, onDayClick, selectedDate }: CalendarProps) {
  const today = new Date();
  const [year, setYear]   = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const todayStr = toISO(today.getFullYear(), today.getMonth(), today.getDate());

  const prevMonth = () => {
    if (month === 0) { setYear((y) => y - 1); setMonth(11); }
    else setMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setYear((y) => y + 1); setMonth(0); }
    else setMonth((m) => m + 1);
  };

  const cells = buildGrid(year, month);

  return (
    <div className="select-none">
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          className="w-9 h-9 rounded-full flex items-center justify-center text-taupe hover:bg-charcoal/8 transition-colors border-none bg-transparent cursor-pointer text-[18px]"
        >
          ←
        </button>
        <span className="font-heading font-bold text-[18px] tracking-tight text-charcoal">
          {MONTHS[month]} {year}
        </span>
        <button
          onClick={nextMonth}
          className="w-9 h-9 rounded-full flex items-center justify-center text-taupe hover:bg-charcoal/8 transition-colors border-none bg-transparent cursor-pointer text-[18px]"
        >
          →
        </button>
      </div>

      {/* Weekday headers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))", marginBottom: "4px" }}>
        {WEEKDAYS.map((d) => (
          <div key={d} className="text-center text-[11px] font-semibold text-stone uppercase tracking-wider py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))", rowGap: "4px" }}>
        {cells.map((cell, i) => {
          const marks      = cell.dateStr ? (markedDates[cell.dateStr] ?? []) : [];
          const booked     = marks.some((m) => m.status === "accepted");
          const isToday    = cell.dateStr === todayStr;
          const isSelected = cell.dateStr === selectedDate;
          const isClickable = cell.current && booked && !!onDayClick;

          return (
            <div
              key={i}
              onClick={() => isClickable && onDayClick!(cell.dateStr!, marks)}
              className={`
                relative flex flex-col items-center py-1.5 rounded-[10px] transition-colors
                ${!cell.current ? "opacity-25" : ""}
                ${isClickable ? "cursor-pointer hover:opacity-80" : ""}
                ${isSelected ? "ring-2 ring-charcoal/30 ring-offset-1" : ""}
              `}
              style={
                cell.current && booked
                  ? { background: "rgba(216,84,43,.12)", border: "1px solid rgba(216,84,43,.4)" }
                  : undefined
              }
            >
              <span
                className={`
                  w-7 h-7 flex items-center justify-center rounded-full text-[13px] font-medium
                  ${isToday && !booked ? "bg-charcoal text-cream" : "text-charcoal"}
                  ${isToday && booked  ? "ring-2 ring-charcoal/40" : ""}
                `}
              >
                {cell.day}
              </span>

              {cell.current && booked && (
                <span
                  className="text-[9px] font-semibold mt-0.5 px-1.5 rounded-[100px] text-white"
                  style={{ background: "#D8542B" }}
                >
                  Belegt
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex gap-5 mt-5 text-[12px] text-stone">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#D8542B" }} />
          Bereits vergeben
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-6 h-2.5 rounded-full bg-charcoal/15" />
          Verfügbar
        </div>
      </div>
    </div>
  );
}
