"use client";

import { useEffect, useState } from "react";
import Calendar, { type CalendarMark } from "./Calendar";

export default function AvailabilityCalendar() {
  const [markedDates, setMarkedDates] = useState<Record<string, CalendarMark[]>>({});

  useEffect(() => {
    fetch("/api/availability")
      .then((r) => r.json())
      .then(({ dates }: { dates: string[] }) => {
        const map: Record<string, CalendarMark[]> = {};
        dates.forEach((d) => {
          if (d) map[d] = [{ status: "accepted" }];
        });
        setMarkedDates(map);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="bg-parchment py-[90px]">
      <div className="max-w-[1280px] mx-auto px-12">
        <div className="flex gap-[70px] items-start">
          {/* Left copy */}
          <div className="w-[38%] shrink-0 pt-4">
            <div
              className="font-script text-[26px] text-ember mb-1"
              style={{ transform: "rotate(-1.5deg)" }}
            >
              check first
            </div>
            <h2 className="font-heading font-bold text-[48px] leading-[1] tracking-[-0.02em] mt-0 mb-4">
              Wann sind wir frei?
            </h2>
            <p className="text-[17px] leading-[1.6] text-stone max-w-[340px] mt-0 mb-6">
              Grüne Tage sind bereits vergeben. Freie Tage – ruf uns an oder sende direkt eine Anfrage.
            </p>
            <a
              href="#anfrage"
              className="inline-block no-underline px-[26px] py-[13px] rounded-[100px] bg-charcoal text-cream font-semibold text-[15px] hover:bg-taupe transition-colors"
            >
              Datum anfragen →
            </a>
          </div>

          {/* Right calendar card */}
          <div
            className="flex-1 bg-white rounded-[20px] p-8"
            style={{ boxShadow: "0 20px 50px -28px rgba(27,23,20,.35)" }}
          >
            <Calendar markedDates={markedDates} />
          </div>
        </div>
      </div>
    </section>
  );
}
