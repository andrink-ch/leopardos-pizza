export default function Nav() {
  return (
    <nav className="max-w-[1280px] mx-auto px-12 py-7 flex items-center justify-between">
      <div className="font-heading font-bold text-[25px] tracking-tight flex items-center gap-[7px]">
        Leopardo&apos;s
        <span className="w-2 h-2 rounded-full bg-ember inline-block translate-y-0.5" />
      </div>
      <div className="flex items-center gap-[34px] text-[15px] text-taupe">
        <a href="#galerie" className="text-taupe hover:text-charcoal transition-colors no-underline">
          Karte
        </a>
        <a href="#galerie" className="text-taupe hover:text-charcoal transition-colors no-underline">
          Galerie
        </a>
        <a
          href="#anfrage"
          className="no-underline px-[22px] py-[11px] rounded-[100px] bg-charcoal text-cream font-semibold hover:bg-taupe transition-colors"
        >
          Anfrage senden
        </a>
      </div>
    </nav>
  );
}
