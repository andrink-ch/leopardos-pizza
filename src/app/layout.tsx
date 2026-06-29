import type { Metadata } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk, Caveat } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Leopardo's Pizza – Catering für deine Party",
  description: "Pizzaofen, Teig und Feuer – wir bringen alles mit. Du feierst.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="de"
      className={`${bricolage.variable} ${hanken.variable} ${caveat.variable}`}
    >
      <body className="bg-cream text-charcoal font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
