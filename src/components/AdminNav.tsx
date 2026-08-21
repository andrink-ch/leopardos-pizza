"use client";

export type AdminTab = "anfragen" | "standorte" | "speisekarte";

const TABS: { id: AdminTab; label: string }[] = [
  { id: "anfragen", label: "Anfragen" },
  { id: "standorte", label: "Standorte" },
  { id: "speisekarte", label: "Speisekarte" },
];

interface Props {
  active: AdminTab;
  onChange: (tab: AdminTab) => void;
}

export default function AdminNav({ active, onChange }: Props) {
  return (
    <div className="flex gap-1">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className="px-4 py-2 rounded-[100px] text-[14px] font-semibold transition-colors border-none cursor-pointer font-sans"
          style={{
            background: active === tab.id ? "rgba(244,238,226,.15)" : "transparent",
            color: active === tab.id ? "#F4EEE2" : "rgba(244,238,226,.6)",
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
