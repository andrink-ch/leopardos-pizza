"use client";

import { useState, useEffect } from "react";

interface Location {
  id: string;
  name: string;
  address: string | null;
  email: string | null;
  phone: string | null;
}

const inputClass =
  "w-full px-4 py-[10px] rounded-[10px] bg-linen font-sans text-[14px] text-charcoal outline-none transition-colors focus:bg-white focus:border-ember";
const borderStyle = { border: "1.5px solid rgba(27,23,20,.15)" };

const emptyForm = { name: "", address: "", email: "", phone: "" };

export default function AdminLocations() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const fetchLocations = async () => {
    const res = await fetch("/api/admin/locations");
    if (res.ok) setLocations(await res.json());
    setLoading(false);
  };

  useEffect(() => {
    (async () => { await fetchLocations(); })();
  }, []);

  const startEdit = (location: Location) => {
    setEditingId(location.id);
    setForm({
      name: location.name,
      address: location.address ?? "",
      email: location.email ?? "",
      phone: location.phone ?? "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await fetch(`/api/admin/locations/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await fetch("/api/admin/locations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    cancelEdit();
    fetchLocations();
  };

  const remove = async (id: string) => {
    await fetch(`/api/admin/locations/${id}`, { method: "DELETE" });
    if (editingId === id) cancelEdit();
    fetchLocations();
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="font-heading font-bold text-[24px] tracking-tight mb-5">
          {editingId ? "Standort bearbeiten" : "Neuer Standort"}
        </h2>
        <form
          onSubmit={submit}
          className="bg-white rounded-[16px] p-6 flex flex-col gap-4"
          style={{ boxShadow: "0 4px 20px -8px rgba(27,23,20,.15)" }}
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <label className="flex-1 flex flex-col gap-[6px]">
              <span className="text-[13px] font-semibold text-taupe">Name *</span>
              <input
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className={inputClass}
                style={borderStyle}
              />
            </label>
            <label className="flex-1 flex flex-col gap-[6px]">
              <span className="text-[13px] font-semibold text-taupe">Adresse</span>
              <input
                value={form.address}
                onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                className={inputClass}
                style={borderStyle}
              />
            </label>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <label className="flex-1 flex flex-col gap-[6px]">
              <span className="text-[13px] font-semibold text-taupe">E-Mail</span>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className={inputClass}
                style={borderStyle}
              />
            </label>
            <label className="flex-1 flex flex-col gap-[6px]">
              <span className="text-[13px] font-semibold text-taupe">Telefon</span>
              <input
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className={inputClass}
                style={borderStyle}
              />
            </label>
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-[100px] bg-ember text-white font-semibold text-[14px] border-none cursor-pointer hover:bg-[#C2491F] transition-colors"
            >
              {editingId ? "Speichern" : "Anlegen"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="px-6 py-2.5 rounded-[100px] font-medium text-[14px] text-taupe bg-transparent cursor-pointer hover:bg-charcoal/5 transition-colors"
                style={{ border: "1.5px solid rgba(27,23,20,.2)" }}
              >
                Abbrechen
              </button>
            )}
          </div>
        </form>
      </div>

      <div>
        <h2 className="font-heading font-bold text-[24px] tracking-tight mb-5">Alle Standorte</h2>
        {loading && <div className="text-center py-10 text-stone text-[15px]">Lade…</div>}
        {!loading && locations.length === 0 && (
          <div className="text-center py-14 bg-white rounded-[16px] text-stone text-[15px]"
            style={{ boxShadow: "0 4px 20px -8px rgba(27,23,20,.1)" }}>
            Noch keine Standorte angelegt.
          </div>
        )}
        <div className="flex flex-col gap-3">
          {locations.map((location) => (
            <div
              key={location.id}
              className="bg-white rounded-[16px] p-5 flex items-center gap-4"
              style={{ boxShadow: "0 4px 20px -8px rgba(27,23,20,.15)" }}
            >
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-[15px] text-charcoal">{location.name}</div>
                <div className="text-[13px] text-stone">
                  {[location.address, location.email, location.phone].filter(Boolean).join(" · ") || "—"}
                </div>
              </div>
              <button
                onClick={() => startEdit(location)}
                className="text-[13px] font-medium text-taupe bg-transparent border-none cursor-pointer hover:text-charcoal transition-colors"
              >
                Bearbeiten
              </button>
              <button
                onClick={() => remove(location.id)}
                className="text-[13px] font-medium text-red-500 bg-transparent border-none cursor-pointer hover:text-red-600 transition-colors"
              >
                Löschen
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
