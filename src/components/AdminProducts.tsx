"use client";

import { useState, useEffect } from "react";

interface Location {
  id: string;
  name: string;
}

interface Product {
  id: string;
  locationId: string;
  name: string;
  description: string | null;
  sortOrder: number;
}

const inputClass =
  "w-full px-4 py-[10px] rounded-[10px] bg-linen font-sans text-[14px] text-charcoal outline-none transition-colors focus:bg-white focus:border-ember";
const borderStyle = { border: "1.5px solid rgba(27,23,20,.15)" };

const emptyForm = { name: "", description: "", locationId: "", sortOrder: "0" };

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const fetchAll = async () => {
    const [productsRes, locationsRes] = await Promise.all([
      fetch("/api/admin/products"),
      fetch("/api/admin/locations"),
    ]);
    if (productsRes.ok) setProducts(await productsRes.json());
    if (locationsRes.ok) {
      const locs: Location[] = await locationsRes.json();
      setLocations(locs);
      setForm((f) => (f.locationId ? f : { ...f, locationId: locs[0]?.id ?? "" }));
    }
    setLoading(false);
  };

  useEffect(() => {
    (async () => { await fetchAll(); })();
  }, []);

  const locationName = (id: string) => locations.find((l) => l.id === id)?.name ?? "—";

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      description: product.description ?? "",
      locationId: product.locationId,
      sortOrder: String(product.sortOrder),
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm((f) => ({ ...emptyForm, locationId: f.locationId }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = { ...form, sortOrder: Number(form.sortOrder) || 0 };
    if (editingId) {
      await fetch(`/api/admin/products/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } else {
      await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    }
    cancelEdit();
    fetchAll();
  };

  const remove = async (id: string) => {
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    if (editingId === id) cancelEdit();
    fetchAll();
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="font-heading font-bold text-[24px] tracking-tight mb-5">
          {editingId ? "Speise bearbeiten" : "Neue Speise"}
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
              <span className="text-[13px] font-semibold text-taupe">Standort *</span>
              <select
                required
                value={form.locationId}
                onChange={(e) => setForm((f) => ({ ...f, locationId: e.target.value }))}
                className={inputClass}
                style={borderStyle}
              >
                <option value="" disabled>Standort wählen…</option>
                {locations.map((l) => (
                  <option key={l.id} value={l.id}>{l.name}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="flex flex-col gap-[6px]">
            <span className="text-[13px] font-semibold text-taupe">Beschreibung</span>
            <input
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Tomate, Mozzarella, Basilikum"
              className={inputClass}
              style={borderStyle}
            />
          </label>
          <label className="flex flex-col gap-[6px] max-w-[140px]">
            <span className="text-[13px] font-semibold text-taupe">Reihenfolge</span>
            <input
              type="number"
              value={form.sortOrder}
              onChange={(e) => setForm((f) => ({ ...f, sortOrder: e.target.value }))}
              className={inputClass}
              style={borderStyle}
            />
          </label>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={!form.locationId}
              className="px-6 py-2.5 rounded-[100px] bg-ember text-white font-semibold text-[14px] border-none cursor-pointer hover:bg-[#C2491F] transition-colors disabled:opacity-60"
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
        <h2 className="font-heading font-bold text-[24px] tracking-tight mb-5">Speisekarte</h2>
        {loading && <div className="text-center py-10 text-stone text-[15px]">Lade…</div>}
        {!loading && products.length === 0 && (
          <div className="text-center py-14 bg-white rounded-[16px] text-stone text-[15px]"
            style={{ boxShadow: "0 4px 20px -8px rgba(27,23,20,.1)" }}>
            Noch keine Speisen angelegt.
          </div>
        )}
        <div className="flex flex-col gap-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-[16px] p-5 flex items-center gap-4"
              style={{ boxShadow: "0 4px 20px -8px rgba(27,23,20,.15)" }}
            >
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-[15px] text-charcoal">{product.name}</div>
                <div className="text-[13px] text-stone">
                  {locationName(product.locationId)}
                  {product.description ? ` · ${product.description}` : ""}
                </div>
              </div>
              <button
                onClick={() => startEdit(product)}
                className="text-[13px] font-medium text-taupe bg-transparent border-none cursor-pointer hover:text-charcoal transition-colors"
              >
                Bearbeiten
              </button>
              <button
                onClick={() => remove(product.id)}
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
