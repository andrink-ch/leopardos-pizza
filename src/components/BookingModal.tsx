"use client";

import { useState } from "react";
import type { Booking } from "@/lib/types";

interface Props {
  onClose: () => void;
}

const PIZZAS = [
  { id: "margherita", name: "Margherita", desc: "Tomate, Mozzarella, Basilikum" },
  { id: "diavola",    name: "Diavola",    desc: "Tomate, Mozzarella, Peperoni" },
  { id: "pistacchio", name: "Pistacchio", desc: "Pistaziencreme, Mozzarella, Mortadella" },
  { id: "marinara",   name: "Marinara",   desc: "Tomate, Knoblauch, Oregano (vegan)" },
  { id: "funghi",     name: "Funghi",     desc: "Tomate, Mozzarella, Champignons" },
  { id: "salsiccia",  name: "Salsiccia",  desc: "Tomate, Mozzarella, italienische Wurst" },
];

const DIETARY = ["Vegetarisch", "Vegan", "Glutenfrei", "Laktosefrei", "Nussfrei"];

type PizzaOrder = Booking["pizzas"][string];
type FormData   = Omit<Booking, "id" | "createdAt" | "status">;

const inputClass =
  "w-full px-4 py-[13px] rounded-[10px] bg-linen font-sans text-[15px] text-charcoal outline-none transition-colors focus:bg-white focus:border-ember";
const borderStyle = { border: "1.5px solid rgba(27,23,20,.15)" };

export default function BookingModal({ onClose }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const [form, setForm] = useState<FormData>({
    name: "", email: "", phone: "", date: "", time: "",
    location: "", guests: "", dietary: [], allergies: "", message: "",
    pizzas: Object.fromEntries(
      PIZZAS.map((p) => [p.id, { selected: false, qty: "1", notes: "" }])
    ),
  });

  const set = (key: keyof Omit<FormData, "pizzas" | "dietary">) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const toggleDietary = (tag: string) =>
    setForm((f) => ({
      ...f,
      dietary: f.dietary.includes(tag)
        ? f.dietary.filter((d) => d !== tag)
        : [...f.dietary, tag],
    }));

  const updatePizza = (id: string, field: keyof PizzaOrder, value: string | boolean) =>
    setForm((f) => ({
      ...f,
      pizzas: { ...f.pizzas, [id]: { ...f.pizzas[id], [field]: value } },
    }));

  const thanksName = form.name.trim().split(" ")[0] || "ciao";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(27,23,20,.65)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="bg-cream w-full max-w-[780px] max-h-[92vh] overflow-y-auto rounded-[20px] relative"
        style={{ boxShadow: "0 32px 80px -20px rgba(27,23,20,.6)" }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-cream px-10 pt-8 pb-5 flex items-start justify-between border-b border-charcoal/10">
          <div>
            <div className="font-script text-[22px] text-ember" style={{ transform: "rotate(-1deg)" }}>
              lass uns planen
            </div>
            <h2 className="font-heading font-bold text-[36px] leading-tight tracking-[-0.02em] mt-0.5 mb-0">
              Deine Anfrage
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-charcoal/8 hover:bg-charcoal/15 transition-colors flex items-center justify-center text-[20px] text-taupe cursor-pointer border-none mt-1"
          >
            ×
          </button>
        </div>

        {!submitted ? (
          <form
            onSubmit={async (e) => {
                e.preventDefault();
                setLoading(true);
                setError("");
                try {
                  const res = await fetch("/api/bookings", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form),
                  });
                  if (!res.ok) throw new Error("Fehler beim Senden");
                  setSubmitted(true);
                } catch {
                  setError("Etwas hat nicht geklappt – bitte erneut versuchen.");
                } finally {
                  setLoading(false);
                }
              }}
            className="px-10 py-8 flex flex-col gap-8"
          >
            {/* Section 1: Event */}
            <div>
              <h3 className="font-heading font-bold text-[18px] tracking-tight mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-ember text-white text-[12px] flex items-center justify-center font-sans font-bold">1</span>
                Deine Veranstaltung
              </h3>
              <div className="flex flex-col gap-[14px]">
                <div className="flex gap-4">
                  <label className="flex-1 flex flex-col gap-[6px]">
                    <span className="text-[13px] font-semibold text-taupe">Name *</span>
                    <input required value={form.name} onChange={set("name")} placeholder="Maria Rossi" className={inputClass} style={borderStyle} />
                  </label>
                  <label className="flex-1 flex flex-col gap-[6px]">
                    <span className="text-[13px] font-semibold text-taupe">E-Mail *</span>
                    <input required type="email" value={form.email} onChange={set("email")} placeholder="maria@email.de" className={inputClass} style={borderStyle} />
                  </label>
                </div>
                <div className="flex gap-4">
                  <label className="flex-1 flex flex-col gap-[6px]">
                    <span className="text-[13px] font-semibold text-taupe">Telefon</span>
                    <input type="tel" value={form.phone} onChange={set("phone")} placeholder="+49 89 123 456" className={inputClass} style={borderStyle} />
                  </label>
                  <label className="flex-1 flex flex-col gap-[6px]">
                    <span className="text-[13px] font-semibold text-taupe">Anzahl Gäste *</span>
                    <input required type="number" min="10" value={form.guests} onChange={set("guests")} placeholder="ca. 40" className={inputClass} style={borderStyle} />
                  </label>
                </div>
                <div className="flex gap-4">
                  <label className="flex-1 flex flex-col gap-[6px]">
                    <span className="text-[13px] font-semibold text-taupe">Datum *</span>
                    <input required type="date" value={form.date} onChange={set("date")} className={inputClass} style={borderStyle} />
                  </label>
                  <label className="flex-1 flex flex-col gap-[6px]">
                    <span className="text-[13px] font-semibold text-taupe">Uhrzeit</span>
                    <input type="time" value={form.time} onChange={set("time")} className={inputClass} style={borderStyle} />
                  </label>
                </div>
                <label className="flex flex-col gap-[6px]">
                  <span className="text-[13px] font-semibold text-taupe">Veranstaltungsort</span>
                  <input value={form.location} onChange={set("location")} placeholder="Adresse oder Beschreibung" className={inputClass} style={borderStyle} />
                </label>
              </div>
            </div>

            {/* Section 2: Pizzas */}
            <div>
              <h3 className="font-heading font-bold text-[18px] tracking-tight mb-1 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-ember text-white text-[12px] flex items-center justify-center font-sans font-bold">2</span>
                Pizzaauswahl
              </h3>
              <p className="text-[13px] text-stone mb-4">Wähle deine gewünschten Sorten und die ungefähre Anzahl der Pizzen pro Sorte.</p>
              <div className="flex flex-col gap-3">
                {PIZZAS.map((pizza) => {
                  const order = form.pizzas[pizza.id];
                  return (
                    <div
                      key={pizza.id}
                      className="rounded-[12px] transition-colors"
                      style={{
                        border: order.selected
                          ? "1.5px solid rgba(216,84,43,.5)"
                          : "1.5px solid rgba(27,23,20,.12)",
                        background: order.selected ? "rgba(216,84,43,.05)" : "#FDFBF7",
                        padding: "14px 16px",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        {/* Custom checkbox */}
                        <button
                          type="button"
                          onClick={() => updatePizza(pizza.id, "selected", !order.selected)}
                          className="w-5 h-5 rounded-[5px] flex items-center justify-center shrink-0 transition-colors border-none cursor-pointer"
                          style={{
                            background: order.selected ? "#D8542B" : "transparent",
                            border: order.selected ? "none" : "1.5px solid rgba(27,23,20,.3)",
                          }}
                        >
                          {order.selected && (
                            <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                              <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </button>
                        <div className="flex-1">
                          <span className="font-semibold text-[15px] text-charcoal">{pizza.name}</span>
                          <span className="text-[13px] text-stone ml-2">{pizza.desc}</span>
                        </div>
                        {order.selected && (
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[13px] text-taupe">Anzahl:</span>
                            <input
                              type="number"
                              min="1"
                              max="50"
                              value={order.qty}
                              onChange={(e) => updatePizza(pizza.id, "qty", e.target.value)}
                              className="w-16 px-2 py-1 rounded-[8px] text-[14px] text-center text-charcoal outline-none focus:border-ember transition-colors"
                              style={{ border: "1.5px solid rgba(27,23,20,.2)", background: "#fff" }}
                            />
                          </div>
                        )}
                      </div>
                      {order.selected && (
                        <div className="mt-3 ml-8">
                          <input
                            type="text"
                            value={order.notes}
                            onChange={(e) => updatePizza(pizza.id, "notes", e.target.value)}
                            placeholder="Sonderwünsche für diese Pizza (z.B. extra scharf, ohne Zwiebeln…)"
                            className="w-full px-3 py-[10px] rounded-[8px] bg-white font-sans text-[13px] text-charcoal outline-none focus:border-ember transition-colors"
                            style={{ border: "1.5px solid rgba(27,23,20,.12)" }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Section 3: Dietary */}
            <div>
              <h3 className="font-heading font-bold text-[18px] tracking-tight mb-1 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-ember text-white text-[12px] flex items-center justify-center font-sans font-bold">3</span>
                Ernährung & Allergien
              </h3>
              <p className="text-[13px] text-stone mb-4">Wir passen uns so gut wie möglich an.</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {DIETARY.map((tag) => {
                  const active = form.dietary.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleDietary(tag)}
                      className="px-4 py-2 rounded-[100px] text-[14px] font-medium transition-colors cursor-pointer border-none"
                      style={{
                        background: active ? "#D8542B" : "rgba(27,23,20,.07)",
                        color: active ? "#fff" : "#4A433C",
                      }}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
              <label className="flex flex-col gap-[6px]">
                <span className="text-[13px] font-semibold text-taupe">Allergien oder Unverträglichkeiten</span>
                <textarea
                  value={form.allergies}
                  onChange={set("allergies")}
                  placeholder="z.B. Erdnussallergie bei 3 Personen, Zöliakie…"
                  rows={2}
                  className={`${inputClass} resize-none`}
                  style={borderStyle}
                />
              </label>
            </div>

            {/* Section 4: Message */}
            <div>
              <h3 className="font-heading font-bold text-[18px] tracking-tight mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-ember text-white text-[12px] flex items-center justify-center font-sans font-bold">4</span>
                Weitere Wünsche
              </h3>
              <textarea
                value={form.message}
                onChange={set("message")}
                placeholder="Überraschungsparty, Musikwunsch, Aufbauzeit, besondere Dekoration…"
                rows={3}
                className={`${inputClass} resize-y`}
                style={borderStyle}
              />
            </div>

            {error && (
              <div className="text-[13px] text-red-600 bg-red-50 px-4 py-3 rounded-[10px] border border-red-100">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="py-[17px] rounded-[100px] bg-ember text-white font-sans font-semibold text-[17px] cursor-pointer hover:bg-[#C2491F] transition-colors border-none mt-2 disabled:opacity-60"
            >
              {loading ? "Wird gesendet…" : "Anfrage senden"}
            </button>
          </form>
        ) : (
          <div className="px-10 py-16 text-center">
            <div className="text-[56px] mb-4">🍕</div>
            <div className="font-script text-[44px] text-ember mb-3">Danke, {thanksName}!</div>
            <p className="text-[18px] text-taupe leading-[1.6] max-w-[380px] mx-auto mb-8">
              Deine Anfrage ist bei uns. Wir melden uns binnen 24 Stunden mit einem persönlichen Angebot.
            </p>
            <button
              onClick={onClose}
              className="px-8 py-3 rounded-[100px] bg-charcoal text-cream font-semibold text-[15px] hover:bg-taupe transition-colors border-none cursor-pointer"
            >
              Schließen
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
