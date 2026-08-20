"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const path = usePathname();
  const isProducts = path === "/products";

  return (
    <nav className="max-w-[1280px] mx-auto px-6 md:px-12 py-5 md:py-7 flex items-center justify-between">
      <Link href="/" className="no-underline font-heading font-bold text-[22px] md:text-[25px] tracking-tight flex items-center gap-[7px] text-charcoal">
        Leopardo&apos;s
        <span className="w-2 h-2 rounded-full bg-ember inline-block translate-y-0.5" />
      </Link>
      <div className="flex items-center gap-5 md:gap-[34px] text-[15px] text-taupe">
        <Link
          href="/products"
          className={`hidden md:block no-underline transition-colors ${isProducts ? "text-charcoal font-semibold" : "text-taupe hover:text-charcoal"}`}
        >
          Produkte
        </Link>
        <a
          href={isProducts ? "/#verfugbarkeit" : "#verfugbarkeit"}
          className="no-underline px-4 py-2.5 md:px-[22px] md:py-[11px] rounded-[100px] bg-charcoal text-cream font-semibold text-[13px] md:text-[15px] hover:bg-taupe transition-colors"
        >
          Anfrage senden
        </a>
      </div>
    </nav>
  );
}
