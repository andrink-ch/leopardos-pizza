export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream py-[50px]">
      <div className="max-w-[1280px] mx-auto px-12 flex items-center justify-between flex-wrap gap-5">
        <div className="font-heading font-bold text-[22px] flex items-center gap-[7px]">
          Leopardo&apos;s
          <span className="w-[7px] h-[7px] rounded-full bg-ember inline-block translate-y-0.5" />
        </div>
        <div className="flex gap-7 text-[15px]" style={{ color: "rgba(244,238,226,.7)" }}>
          <span>ciao@leopardos.de</span>
          <span>Instagram</span>
        </div>
        <div className="text-[14px]" style={{ color: "rgba(244,238,226,.45)" }}>
          © 2026 Leopardo&apos;s
        </div>
      </div>
    </footer>
  );
}
