export default function Hero() {
  return (
    <section className="max-w-[1280px] mx-auto px-6 md:px-12 pt-8 pb-16 md:pt-10 md:pb-24 flex flex-col md:flex-row items-center gap-10 md:gap-[60px]">
      {/* Left copy */}
      <div className="w-full md:w-[45%] md:shrink-0">
        <h1 className="font-heading font-bold text-[52px] sm:text-[68px] md:text-[84px] leading-[.95] tracking-[-0.025em] mt-0 mb-5 md:mb-[26px]">
          Pizza, wo{" "}
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
            gefeiert
          </span>{" "}
          wird.
        </h1>
        <p className="text-[17px] md:text-[20px] leading-[1.55] text-taupe max-w-[400px] mt-0 mb-7 md:mb-[34px]">
          Pizzaofen, Teig und Feuer – wir bringen alles mit. Du feierst.
        </p>
        <div className="flex flex-wrap gap-3 md:gap-[14px] items-center">
          <a
            href="#verfugbarkeit"
            className="no-underline px-6 py-[14px] md:px-[30px] md:py-[16px] rounded-[100px] bg-ember text-white font-semibold text-[15px] md:text-[16px] hover:bg-[#C2491F] transition-colors"
          >
            Anfrage senden
          </a>
          <a
            href="#video"
            className="no-underline px-6 py-[14px] md:px-[30px] md:py-[16px] rounded-[100px] text-charcoal font-semibold text-[15px] md:text-[16px] hover:bg-charcoal/5 transition-colors"
            style={{ border: "1.5px solid rgba(27,23,20,.2)" }}
          >
            Party ansehen
          </a>
        </div>
      </div>

      {/* Right: video placeholder – hidden on mobile */}
      <div id="video" className="hidden md:flex flex-1 justify-center pt-[14px]">
        <div className="relative w-full max-w-[600px]" style={{ transform: "rotate(-1.6deg)" }}>
          {/* Tape strip */}
          <div
            className="absolute z-10"
            style={{
              top: "-16px",
              left: "50%",
              transform: "translateX(-50%) rotate(3deg)",
              width: "120px",
              height: "30px",
              background: "rgba(216,84,43,.18)",
              border: "1px dashed rgba(216,84,43,.4)",
            }}
          />
          {/* Handwritten caption */}
          <div
            className="absolute z-10 font-script text-[30px] text-charcoal"
            style={{ bottom: "-26px", right: "-8px", transform: "rotate(-5deg)" }}
          >
            frisch aus dem Feuer!
          </div>
          {/* Video card */}
          <div
            className="h-[560px] rounded-[10px] overflow-hidden relative border-[8px] border-white"
            style={{
              background: "radial-gradient(120% 80% at 50% 115%, #4A2310 0%, #241B15 45%, #14100D 100%)",
              boxShadow: "0 24px 60px -20px rgba(27,23,20,.5)",
            }}
          >
            <div
              className="absolute left-0 right-0 bottom-0 h-[55%] animate-ember"
              style={{ background: "radial-gradient(80% 100% at 50% 100%, rgba(216,84,43,.6), rgba(216,84,43,0) 70%)" }}
            />
            <div
              className="absolute top-4 left-4 px-[14px] py-2 rounded-[100px] text-[13px] font-semibold text-charcoal"
              style={{ background: "rgba(244,238,226,.92)" }}
            >
              ● Live aus dem Ofen
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-[18px]">
              <div
                className="w-[84px] h-[84px] rounded-full flex items-center justify-center"
                style={{ background: "rgba(244,238,226,.1)", border: "1px solid rgba(244,238,226,.45)", backdropFilter: "blur(4px)" }}
              >
                <div className="ml-[6px]" style={{ width: 0, height: 0, borderLeft: "22px solid #F4EEE2", borderTop: "13px solid transparent", borderBottom: "13px solid transparent" }} />
              </div>
              <div className="font-mono text-[12px] tracking-[.18em]" style={{ color: "rgba(244,238,226,.55)" }}>
                [ PIZZA IM OFEN — VIDEO ]
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
