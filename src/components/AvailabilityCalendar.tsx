"use client";

import { useEffect, useState } from "react";
import Calendar, { type CalendarMark } from "./Calendar";
import BookingModal from "./BookingModal";

export default function AvailabilityCalendar() {
  const [markedDates, setMarkedDates] = useState<Record<string, CalendarMark[]>>({});
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetch("/api/availability")
      .then((r) => r.json())
      .then(({ dates }: { dates: string[] }) => {
        const map: Record<string, CalendarMark[]> = {};
        dates.forEach((d) => { if (d) map[d] = [{ status: "accepted" }]; });
        setMarkedDates(map);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <section id="verfugbarkeit" className="bg-parchment py-14 md:py-[90px]">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row gap-10 md:gap-[70px] items-start">
            {/* Left copy */}
            <div className="w-full md:w-[38%] md:shrink-0 md:pt-4">
              <div
                className="font-script text-[24px] md:text-[26px] text-ember mb-1"
                style={{ transform: "rotate(-1.5deg)" }}
              >
                check first
              </div>
              <h2 className="font-heading font-bold text-[36px] md:text-[48px] leading-[1] tracking-[-0.02em] mt-0 mb-4">
                Wann sind wir frei?
              </h2>
              <p className="text-[16px] md:text-[17px] leading-[1.6] text-stone max-w-[340px] mt-0 mb-6">
                Rote Tage sind bereits vergeben. Freie Tage – sende uns direkt eine Anfrage.
              </p>
              <button
                onClick={() => setModalOpen(true)}
                className="w-full md:w-auto px-[26px] py-[13px] rounded-[100px] bg-ember text-white font-semibold text-[15px] hover:bg-[#C2491F] transition-colors border-none cursor-pointer"
              >
                Anfrage senden →
              </button>
            </div>

            {/* Right calendar card */}
            <div
              className="flex-1 w-full bg-white rounded-[20px] p-5 md:p-8"
              style={{ boxShadow: "0 20px 50px -28px rgba(27,23,20,.35)" }}
            >
              <Calendar markedDates={markedDates} />
            </div>
          </div>
        </div>
      </section>

      {modalOpen && <BookingModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
