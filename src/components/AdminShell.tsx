"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminNav, { type AdminTab } from "./AdminNav";
import AdminDashboard from "./AdminDashboard";
import AdminLocations from "./AdminLocations";
import AdminProducts from "./AdminProducts";

export default function AdminShell() {
  const [tab, setTab] = useState<AdminTab>("anfragen");
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Sticky header */}
      <div className="bg-charcoal text-cream sticky top-0 z-10">
        <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row md:items-center gap-3 md:gap-0 md:justify-between">
          <div className="flex items-center justify-between gap-4">
            <div className="font-heading font-bold text-[20px] flex items-center gap-[7px]">
              Leopardo&apos;s
              <span className="w-2 h-2 rounded-full bg-ember inline-block translate-y-0.5" />
              <span className="text-cream/40 font-sans font-normal text-[14px] ml-2">Admin</span>
            </div>
            <button
              onClick={logout}
              className="md:hidden text-[14px] text-cream/60 hover:text-cream transition-colors border-none bg-transparent cursor-pointer font-sans"
            >
              Abmelden →
            </button>
          </div>
          <div className="flex items-center justify-between gap-4">
            <AdminNav active={tab} onChange={setTab} />
            <button
              onClick={logout}
              className="hidden md:block text-[14px] text-cream/60 hover:text-cream transition-colors border-none bg-transparent cursor-pointer font-sans"
            >
              Abmelden →
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-6 md:py-10">
        {tab === "anfragen" && <AdminDashboard />}
        {tab === "standorte" && <AdminLocations />}
        {tab === "speisekarte" && <AdminProducts />}
      </div>
    </div>
  );
}
