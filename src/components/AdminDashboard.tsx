"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { Booking } from "@/lib/types";
import Calendar, { type CalendarMark } from "./Calendar";

const STATUS_LABEL: Record<Booking["status"], string> = {
  pending:  "Neu",
  accepted: "Angenommen",
  declined: "Abgelehnt",
};

const PIZZA_NAMES: Record<string, string> = {
  margherita: "Margherita",
  diavola:    "Diavola",
  pistacchio: "Pistacchio",
  marinara:   "Marinara",
  funghi:     "Funghi",
  salsiccia:  "Salsiccia",
};

function StatusBadge({ status }: { status: Booking["status"] }) {
  const styles: Record<Booking["status"], string> = {
    pending:  "bg-amber-100 text-amber-700",
    accepted: "bg-green-100 text-green-700",
    declined: "bg-red-100 text-red-600",
  };
  return (
    <span className={`px-3 py-1 rounded-[100px] text-[12px] font-semibold ${styles[status]}`}>
      {STATUS_LABEL[status]}
    </span>
  );
}

function Dot({ status }: { status: Booking["status"] }) {
  const color: Record<Booking["status"], string> = {
    pending:  "bg-amber-400",
    accepted: "bg-green-500",
    declined: "bg-red-400",
  };
  return <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${color[status]}`} />;
}

export default function AdminDashboard() {
  const [bookings, setBookings]         = useState<Booking[]>([]);
  const [loading, setLoading]           = useState(true);
  const [expanded, setExpanded]         = useState<string | null>(null);
  const [view, setView]                 = useState<"list" | "calendar">("list");
  const [calSelectedDate, setCalDate]   = useState<string | null>(null);
  const router = useRouter();

  const fetchBookings = useCallback(async () => {
    const res = await fetch("/api/bookings");
    if (res.ok) setBookings(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  const updateStatus = async (id: string, status: Booking["status"]) => {
    await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.refresh();
  };

  const counts = {
    total:    bookings.length,
    pending:  bookings.filter((b) => b.status === "pending").length,
    accepted: bookings.filter((b) => b.status === "accepted").length,
    declined: bookings.filter((b) => b.status === "declined").length,
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Sticky header */}
      <div className="bg-charcoal text-cream sticky top-0 z-10">
        <div className="max-w-[1100px] mx-auto px-8 py-4 flex items-center justify-between">
          <div className="font-heading font-bold text-[20px] flex items-center gap-[7px]">
            Leopardo&apos;s
            <span className="w-2 h-2 rounded-full bg-ember inline-block translate-y-0.5" />
            <span className="text-cream/40 font-sans font-normal text-[14px] ml-2">Admin</span>
          </div>
          <button
            onClick={logout}
            className="text-[14px] text-cream/60 hover:text-cream transition-colors border-none bg-transparent cursor-pointer font-sans"
          >
            Abmelden →
          </button>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-8 py-10">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-10">
          {[
            { label: "Gesamt",      value: counts.total,    color: "text-charcoal" },
            { label: "Offen",       value: counts.pending,  color: "text-amber-600" },
            { label: "Angenommen",  value: counts.accepted, color: "text-green-600" },
            { label: "Abgelehnt",   value: counts.declined, color: "text-red-500" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-[16px] p-6"
              style={{ boxShadow: "0 4px 20px -8px rgba(27,23,20,.15)" }}
            >
              <div className={`font-heading font-bold text-[40px] leading-none mb-1 ${s.color}`}>
                {s.value}
              </div>
              <div className="text-[14px] text-stone">{s.label}</div>
            </div>
          ))}
        </div>

        {/* View toggle */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-heading font-bold text-[24px] tracking-tight">Anfragen</h2>
          <div className="flex bg-white rounded-[100px] p-1" style={{ boxShadow: "0 2px 8px -4px rgba(27,23,20,.15)" }}>
            {(["list","calendar"] as const).map((v) => (
              <button
                key={v}
                onClick={() => { setView(v); setCalDate(null); }}
                className="px-4 py-1.5 rounded-[100px] text-[13px] font-semibold transition-colors border-none cursor-pointer"
                style={{
                  background: view === v ? "#1B1714" : "transparent",
                  color:      view === v ? "#F4EEE2" : "#6B6259",
                }}
              >
                {v === "list" ? "Liste" : "Kalender"}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="text-center py-20 text-stone text-[16px]">Lade Anfragen…</div>
        )}

        {!loading && bookings.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[20px] text-stone text-[16px]"
            style={{ boxShadow: "0 4px 20px -8px rgba(27,23,20,.1)" }}>
            Noch keine Anfragen eingegangen.
          </div>
        )}

        {/* Calendar view */}
        {view === "calendar" && !loading && (() => {
          const markedDates: Record<string, CalendarMark[]> = {};
          bookings
            .filter((b) => b.status === "accepted" && b.date)
            .forEach((b) => {
              if (!markedDates[b.date]) markedDates[b.date] = [];
              markedDates[b.date].push({ status: b.status, name: b.name, id: b.id });
            });

          const dayBookings = calSelectedDate
            ? bookings.filter((b) => b.date === calSelectedDate && b.status === "accepted")
            : [];

          return (
            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-[20px] p-8" style={{ boxShadow: "0 20px 50px -28px rgba(27,23,20,.35)" }}>
                <Calendar
                  markedDates={markedDates}
                  selectedDate={calSelectedDate}
                  onDayClick={(date) => setCalDate(calSelectedDate === date ? null : date)}
                />
              </div>

              {calSelectedDate && (
                <div>
                  <h3 className="font-heading font-bold text-[18px] tracking-tight mb-4">
                    {new Date(calSelectedDate).toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                  </h3>
                  {dayBookings.length === 0 ? (
                    <div className="bg-white rounded-[16px] p-6 text-center text-stone text-[14px]"
                      style={{ boxShadow: "0 4px 20px -8px rgba(27,23,20,.12)" }}>
                      Keine bestätigten Buchungen für diesen Tag.
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {dayBookings.map((b) => (
                        <div key={b.id} className="bg-white rounded-[16px] p-5 flex items-center gap-4"
                          style={{ boxShadow: "0 4px 20px -8px rgba(27,23,20,.15)" }}>
                          <div className="flex-1">
                            <div className="font-semibold text-[15px] text-charcoal">{b.name}</div>
                            <div className="text-[13px] text-stone">{b.email}</div>
                          </div>
                          {b.guests   && <div className="text-[13px] text-taupe">👥 {b.guests} Gäste</div>}
                          {b.time     && <div className="text-[13px] text-taupe">🕐 {b.time} Uhr</div>}
                          {b.location && <div className="text-[13px] text-taupe">📍 {b.location}</div>}
                          <StatusBadge status={b.status} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })()}

        {/* List view */}
        {view === "list" && <div className="flex flex-col gap-4">
          {bookings.map((b) => {
            const isOpen = expanded === b.id;
            const selectedPizzas = Object.entries(b.pizzas ?? {}).filter(([, p]) => p.selected);

            return (
              <div
                key={b.id}
                className="bg-white rounded-[16px] overflow-hidden"
                style={{ boxShadow: "0 4px 20px -8px rgba(27,23,20,.15)" }}
              >
                {/* Row */}
                <div
                  className="px-6 py-5 flex items-center gap-4 cursor-pointer hover:bg-charcoal/[0.02] transition-colors"
                  onClick={() => setExpanded(isOpen ? null : b.id)}
                >
                  <Dot status={b.status} />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[16px] text-charcoal leading-tight">{b.name}</div>
                    <div className="text-[13px] text-stone truncate">{b.email}</div>
                  </div>
                  <div className="hidden md:flex gap-6 text-[14px] text-taupe">
                    {b.date && (
                      <span>📅 {new Date(b.date).toLocaleDateString("de-DE")}</span>
                    )}
                    {b.guests && <span>👥 {b.guests} Gäste</span>}
                    {selectedPizzas.length > 0 && (
                      <span>🍕 {selectedPizzas.length} Sorte{selectedPizzas.length !== 1 ? "n" : ""}</span>
                    )}
                  </div>
                  <StatusBadge status={b.status} />
                  <span
                    className="text-stone text-[14px] transition-transform duration-200"
                    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  >
                    ▾
                  </span>
                </div>

                {/* Detail panel */}
                {isOpen && (
                  <div className="border-t border-charcoal/8 px-6 py-6 flex flex-col gap-6">
                    <div className="grid grid-cols-2 gap-6">
                      {/* Contact */}
                      <div>
                        <div className="text-[11px] font-semibold text-stone uppercase tracking-wider mb-3">Kontakt</div>
                        <div className="flex flex-col gap-1.5 text-[14px]">
                          <div className="font-medium text-charcoal">{b.name}</div>
                          <div className="text-taupe">{b.email}</div>
                          {b.phone && <div className="text-taupe">{b.phone}</div>}
                        </div>
                      </div>
                      {/* Event */}
                      <div>
                        <div className="text-[11px] font-semibold text-stone uppercase tracking-wider mb-3">Veranstaltung</div>
                        <div className="flex flex-col gap-1.5 text-[14px] text-charcoal">
                          {b.date && (
                            <div>
                              📅{" "}
                              {new Date(b.date).toLocaleDateString("de-DE", {
                                weekday: "long", day: "numeric", month: "long", year: "numeric",
                              })}
                              {b.time && ` – ${b.time} Uhr`}
                            </div>
                          )}
                          {b.guests   && <div>👥 {b.guests} Gäste</div>}
                          {b.location && <div>📍 {b.location}</div>}
                        </div>
                      </div>
                    </div>

                    {/* Pizzas */}
                    {selectedPizzas.length > 0 && (
                      <div>
                        <div className="text-[11px] font-semibold text-stone uppercase tracking-wider mb-3">Pizzaauswahl</div>
                        <div className="flex flex-col gap-2">
                          {selectedPizzas.map(([id, p]) => (
                            <div key={id} className="flex items-start gap-3 text-[14px]">
                              <span className="font-semibold text-charcoal w-28 shrink-0">
                                {PIZZA_NAMES[id] ?? id}
                              </span>
                              <span className="text-taupe">× {p.qty}</span>
                              {p.notes && (
                                <span className="text-stone italic">&quot;{p.notes}&quot;</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Dietary + allergies */}
                    {(b.dietary?.length > 0 || b.allergies) && (
                      <div>
                        <div className="text-[11px] font-semibold text-stone uppercase tracking-wider mb-3">Ernährung & Allergien</div>
                        {b.dietary?.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-2">
                            {b.dietary.map((d) => (
                              <span key={d} className="px-3 py-1 rounded-[100px] bg-cream text-taupe text-[13px]">{d}</span>
                            ))}
                          </div>
                        )}
                        {b.allergies && (
                          <div className="text-[14px] text-charcoal">{b.allergies}</div>
                        )}
                      </div>
                    )}

                    {/* Message */}
                    {b.message && (
                      <div>
                        <div className="text-[11px] font-semibold text-stone uppercase tracking-wider mb-2">Nachricht</div>
                        <div className="text-[14px] text-charcoal leading-relaxed bg-cream rounded-[10px] px-4 py-3">
                          {b.message}
                        </div>
                      </div>
                    )}

                    {/* Timestamp */}
                    <div className="text-[12px] text-stone">
                      Eingegangen: {new Date(b.createdAt).toLocaleString("de-DE")}
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3 pt-2 border-t border-charcoal/8">
                      {b.status === "pending" ? (
                        <>
                          <button
                            onClick={() => updateStatus(b.id, "accepted")}
                            className="flex-1 py-3 rounded-[100px] bg-green-600 text-white font-semibold text-[15px] border-none cursor-pointer hover:bg-green-700 transition-colors"
                          >
                            ✓ Annehmen
                          </button>
                          <button
                            onClick={() => updateStatus(b.id, "declined")}
                            className="flex-1 py-3 rounded-[100px] bg-red-500 text-white font-semibold text-[15px] border-none cursor-pointer hover:bg-red-600 transition-colors"
                          >
                            ✕ Ablehnen
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => updateStatus(b.id, "pending")}
                          className="py-2.5 px-6 rounded-[100px] font-medium text-[14px] text-taupe bg-transparent cursor-pointer hover:bg-charcoal/5 transition-colors"
                          style={{ border: "1.5px solid rgba(27,23,20,.2)" }}
                        >
                          Zurücksetzen
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>}
      </div>
    </div>
  );
}
