import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = { title: "Produkte – Leopardo's Pizza" };

function Bottle() {
  return (
    <div className="relative flex flex-col items-center select-none">
      {/* Cork */}
      <div style={{
        width: "32px", height: "18px",
        background: "linear-gradient(180deg, #D4A84B 0%, #9A7230 100%)",
        borderRadius: "4px 4px 2px 2px",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,.45), inset 0 -1px 0 rgba(0,0,0,.25)",
      }} />
      {/* Neck */}
      <div style={{
        width: "42px", height: "90px",
        backgroundColor: "#2A3D1C",
        clipPath: "polygon(12% 0%, 88% 0%, 100% 100%, 0% 100%)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: 0, left: "18%", width: "7%", height: "100%",
          background: "linear-gradient(180deg, rgba(255,255,255,.22) 0%, rgba(255,255,255,.04) 100%)",
        }} />
      </div>
      {/* Shoulder */}
      <div style={{
        width: "150px", height: "26px",
        backgroundColor: "#2A3D1C",
        clipPath: "polygon(14% 0%, 86% 0%, 100% 100%, 0% 100%)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: 0, left: "9%", width: "5%", height: "100%",
          background: "rgba(255,255,255,.1)",
        }} />
      </div>
      {/* Body */}
      <div style={{
        width: "150px", height: "330px",
        backgroundColor: "#2A3D1C",
        borderRadius: "3px 3px 20px 20px",
        position: "relative", overflow: "hidden",
      }}>
        {/* Glass reflections */}
        <div style={{
          position: "absolute", top: 0, left: "9%", width: "5%", height: "80%",
          background: "linear-gradient(180deg, rgba(255,255,255,.18) 0%, rgba(255,255,255,.05) 60%, transparent 100%)",
          borderRadius: "0 0 3px 3px",
        }} />
        <div style={{
          position: "absolute", top: 0, right: "14%", width: "2.5%", height: "45%",
          background: "rgba(255,255,255,.07)",
        }} />
        {/* Amber oil glow */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "38%",
          background: "radial-gradient(90% 80% at 50% 100%, rgba(200,140,20,.55) 0%, rgba(160,100,12,.2) 50%, transparent 80%)",
        }} />
        {/* Label */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -54%)",
          width: "110px",
          background: "#F4EEE2",
          borderRadius: "2px",
          padding: "16px 10px",
          textAlign: "center",
          boxShadow: "0 2px 16px rgba(0,0,0,.35)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "10px" }}>
            <div style={{ flex: 1, height: "0.5px", background: "rgba(27,23,20,.2)" }} />
            <div style={{ width: "3px", height: "3px", borderRadius: "50%", background: "#D8542B" }} />
            <div style={{ flex: 1, height: "0.5px", background: "rgba(27,23,20,.2)" }} />
          </div>
          <div className="font-script" style={{ fontSize: "24px", lineHeight: 1, color: "#1B1714" }}>
            Leopardo&apos;s
          </div>
          <div className="font-heading" style={{ fontSize: "9.5px", fontWeight: 800, letterSpacing: ".2em", color: "#1B1714", marginTop: "5px" }}>
            PIZZAÖL
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px", margin: "8px 0" }}>
            <div style={{ flex: 1, height: "0.5px", background: "rgba(27,23,20,.15)" }} />
            <div style={{ fontSize: "7px", letterSpacing: ".13em", color: "rgba(27,23,20,.4)", fontFamily: "var(--font-sans)" }}>
              ARTIGIANALE
            </div>
            <div style={{ flex: 1, height: "0.5px", background: "rgba(27,23,20,.15)" }} />
          </div>
          <div style={{ fontSize: "7px", letterSpacing: ".1em", color: "rgba(27,23,20,.5)", fontFamily: "var(--font-sans)" }}>
            CHILI · AGLIO · ORIGANO
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "10px" }}>
            <div style={{ flex: 1, height: "0.5px", background: "rgba(27,23,20,.2)" }} />
            <div style={{ width: "3px", height: "3px", borderRadius: "50%", background: "#D8542B" }} />
            <div style={{ flex: 1, height: "0.5px", background: "rgba(27,23,20,.2)" }} />
          </div>
        </div>
        {/* Volume */}
        <div style={{
          position: "absolute", bottom: "12px", left: 0, right: 0,
          textAlign: "center", fontSize: "7px", letterSpacing: ".14em",
          color: "rgba(244,238,226,.3)", fontFamily: "var(--font-sans)",
        }}>
          250 ML · SICILIA
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <main>
      <Nav />

      {/* ── Hero — matches landing page layout exactly ── */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 pt-8 pb-16 md:pt-10 md:pb-24 flex flex-col md:flex-row items-center gap-10 md:gap-[60px]">
        {/* Left copy */}
        <div className="w-full md:w-[45%] md:shrink-0">
          <h1 className="font-heading font-bold text-[52px] sm:text-[68px] md:text-[84px] leading-[.95] tracking-[-0.025em] mt-0 mb-5 md:mb-[26px]">
            Das Leopardo&apos;s{" "}
            <span
              className="inline-block"
              style={{
                background: "rgba(216,84,43,.22)",
                padding: ".02em .18em",
                borderRadius: "18px 9px 22px 7px / 9px 20px 8px 19px",
                WebkitBoxDecorationBreak: "clone",
                boxDecorationBreak: "clone",
                transform: "rotate(-1.2deg)",
              }}
            >
              Pizzaöl
            </span>
          </h1>
          <p className="text-[17px] md:text-[20px] leading-[1.55] text-taupe max-w-[400px] mt-0 mb-7 md:mb-[34px]">
            Handgemachtes Chiliöl mit geröstetem Knoblauch und sizilianischem Oregano. Nur vor Ort erhältlich — direkt bei unseren Events.
          </p>
          <div className="flex flex-wrap gap-3 md:gap-[14px] items-center">
            <Link
              href="/#verfugbarkeit"
              className="no-underline px-6 py-[14px] md:px-[30px] md:py-[16px] rounded-[100px] bg-ember text-white font-semibold text-[15px] md:text-[16px] hover:bg-[#C2491F] transition-colors"
            >
              Event buchen
            </Link>
          </div>
        </div>

        {/* Right: bottle card — same treatment as landing page video card */}
        <div className="hidden md:flex flex-1 justify-center pt-[14px]">
          <div className="relative w-full max-w-[560px]" style={{ transform: "rotate(-1.6deg)" }}>
            {/* Tape strip */}
            <div
              className="absolute z-10"
              style={{
                top: "-16px", left: "50%",
                transform: "translateX(-50%) rotate(3deg)",
                width: "120px", height: "30px",
                background: "rgba(216,84,43,.18)",
                border: "1px dashed rgba(216,84,43,.4)",
              }}
            />
            {/* Handwritten caption */}
            <div
              className="absolute z-10 font-script text-[30px] text-charcoal"
              style={{ bottom: "-26px", right: "-8px", transform: "rotate(-5deg)" }}
            >
              handgemacht!
            </div>
            {/* Card */}
            <div
              className="h-[560px] rounded-[10px] overflow-hidden relative border-[8px] border-white flex items-center justify-center"
              style={{
                background: "radial-gradient(120% 80% at 50% 115%, #2C4018 0%, #162010 45%, #0A1208 100%)",
                boxShadow: "0 24px 60px -20px rgba(27,23,20,.5)",
              }}
            >
              {/* Amber glow at bottom */}
              <div
                className="absolute left-0 right-0 bottom-0 h-[50%] animate-ember"
                style={{ background: "radial-gradient(80% 100% at 50% 100%, rgba(190,130,20,.5), rgba(216,84,43,0) 70%)" }}
              />
              {/* Badge */}
              <div
                className="absolute top-4 left-4 px-[14px] py-2 rounded-[100px] text-[13px] font-semibold text-charcoal"
                style={{ background: "rgba(244,238,226,.92)" }}
              >
                ● Nur vor Ort erhältlich
              </div>
              {/* Bottle */}
              <div className="relative z-10 mt-8">
                <Bottle />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Manifesto strip ── */}
      <section style={{ background: "#1B1714" }}>
        <div className="max-w-[860px] mx-auto px-6 md:px-12 py-16 md:py-20 text-center">
          <p
            className="font-heading font-bold leading-[1.1] tracking-[-0.02em]"
            style={{ fontSize: "clamp(26px, 4vw, 46px)", color: "#F4EEE2", margin: 0 }}
          >
            Kein Supermarktprodukt.{" "}
            <span style={{ color: "#D8542B" }}>Nur bei unseren Events.</span>
          </p>
        </div>
      </section>

      {/* ── Features ── */}
      <section style={{ background: "#EDE6D6" }}>
        <div
          className="max-w-[1280px] mx-auto px-6 md:px-12 py-16 md:py-20 grid grid-cols-1 sm:grid-cols-3"
          style={{ gap: "1px", background: "rgba(27,23,20,.1)" }}
        >
          {[
            { num: "I",   title: "Kaltgepresstes Olivenöl",  desc: "Basis aus sizilianischem Extra Vergine — fruchtig, würzig, rein." },
            { num: "II",  title: "Handverlesene Zutaten",     desc: "Chili, Knoblauch und Kräuter werden von uns selbst eingelegt und über Wochen aromatisiert." },
            { num: "III", title: "Vom Holzofen inspiriert",   desc: "Das Rezept entstand neben unserem Ofen — Abend für Abend verfeinert, bis es perfekt war." },
          ].map(({ num, title, desc }) => (
            <div key={num} style={{ background: "#EDE6D6", padding: "44px 40px" }}>
              <div className="font-heading font-bold text-ember mb-4" style={{ fontSize: "11px", letterSpacing: ".18em" }}>
                {num}
              </div>
              <h3 className="font-heading font-bold text-charcoal tracking-tight mb-3" style={{ fontSize: "19px" }}>
                {title}
              </h3>
              <p className="text-taupe leading-[1.65]" style={{ fontSize: "15px", margin: 0 }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 text-center">
        <div className="font-script text-ember mb-2" style={{ fontSize: "20px", display: "inline-block", transform: "rotate(-1deg)" }}>
          wo bekommst du es?
        </div>
        <h2 className="font-heading font-bold leading-[1.05] tracking-[-0.02em] mt-1 mb-5" style={{ fontSize: "clamp(34px, 4.5vw, 52px)" }}>
          Komm an unseren Ofen
        </h2>
        <p className="text-taupe leading-[1.7] mx-auto mb-9" style={{ fontSize: "16px", maxWidth: "460px" }}>
          Das Leopardo&apos;s Pizzaöl gibt es ausschliesslich direkt bei unseren Catering-Events — solange der Vorrat reicht.
        </p>
        <Link
          href="/#verfugbarkeit"
          className="no-underline inline-block font-semibold hover:bg-[#C2491F] transition-colors"
          style={{ padding: "15px 34px", borderRadius: "100px", background: "#D8542B", color: "#fff", fontSize: "16px" }}
        >
          Event anfragen
        </Link>
      </section>

      <Footer />
    </main>
  );
}
