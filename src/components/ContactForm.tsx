"use client";

import { useState } from "react";
import BookingModal from "./BookingModal";

export default function ContactForm() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section id="anfrage" className="max-w-[1280px] mx-auto px-12 py-[100px]">
        <div className="flex gap-[70px] items-start">
          {/* Left intro */}
          <div className="w-[38%] shrink-0 pt-[10px]">
            <div
              className="font-script text-[28px] text-ember mb-1"
              style={{ transform: "rotate(-2deg)" }}
            >
              sag uns Bescheid
            </div>
            <h2 className="font-heading font-bold text-[54px] leading-[.98] tracking-[-0.025em] mt-0 mb-5">
              Lass uns deine Party planen.
            </h2>
            <p className="text-[18px] leading-[1.55] text-stone mt-0 mb-7 max-w-[340px]">
              Erzähl uns kurz vom Anlass – wir melden uns mit einem Angebot.
            </p>
            <div className="flex flex-col gap-[10px] text-[16px] text-taupe">
              <div>✉&nbsp;&nbsp;ciao@leopardos.de</div>
              <div>☎&nbsp;&nbsp;089 / 123 456</div>
              <div>◷&nbsp;&nbsp;Antwort meist binnen 24h</div>
            </div>
          </div>

          {/* Right CTA card */}
          <div
            className="flex-1 bg-white rounded-[20px] p-10 flex flex-col items-center text-center"
            style={{
              boxShadow: "0 20px 50px -28px rgba(27,23,20,.45)",
              transform: "rotate(.5deg)",
            }}
          >
            <div className="text-[64px] mb-4">🍕</div>
            <h3 className="font-heading font-bold text-[32px] tracking-[-0.02em] mt-0 mb-3">
              Bereit für deine Party?
            </h3>
            <p className="text-[16px] leading-[1.6] text-stone max-w-[320px] mt-0 mb-8">
              Füll unsere Anfrage aus – Pizzaauswahl, Gästezahl, Zutaten und alles weitere auf einen Streich.
            </p>

            <button
              onClick={() => setOpen(true)}
              className="w-full py-[17px] rounded-[100px] bg-ember text-white font-sans font-semibold text-[17px] cursor-pointer hover:bg-[#C2491F] transition-colors border-none mb-6"
            >
              Anfrage ausfüllen →
            </button>

            <div className="flex gap-6 text-[13px] text-stone">
              <span>✓ Kostenlos & unverbindlich</span>
              <span>✓ Antwort in 24h</span>
            </div>
          </div>
        </div>
      </section>

      {open && <BookingModal onClose={() => setOpen(false)} />}
    </>
  );
}
