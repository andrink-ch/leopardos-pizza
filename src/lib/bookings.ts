import { randomUUID } from "crypto";
import type { Booking } from "./types";

const KV_KEY = "bookings";

// --- KV (production) ---

async function tryKV() {
  if (!process.env.KV_REST_API_URL) return null;
  try {
    const { kv } = await import("@vercel/kv");
    return kv;
  } catch {
    return null;
  }
}

// --- File fallback (local dev) ---

function fileStore() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const fs   = require("fs")  as typeof import("fs");
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const path = require("path") as typeof import("path");
  const FILE = path.join(process.cwd(), "data", "bookings.json");

  return {
    read(): Booking[] {
      try {
        if (!fs.existsSync(FILE)) return [];
        return JSON.parse(fs.readFileSync(FILE, "utf-8")) as Booking[];
      } catch { return []; }
    },
    write(data: Booking[]) {
      fs.mkdirSync(path.dirname(FILE), { recursive: true });
      fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
    },
  };
}

// --- Public API (all async) ---

export async function getBookings(): Promise<Booking[]> {
  const kv = await tryKV();
  if (kv) return (await kv.get<Booking[]>(KV_KEY)) ?? [];
  return fileStore().read();
}

export async function addBooking(
  data: Omit<Booking, "id" | "createdAt" | "status">
): Promise<Booking> {
  const bookings = await getBookings();
  const booking: Booking = {
    ...data,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    status: "pending",
  };
  const updated = [booking, ...bookings];
  const kv = await tryKV();
  if (kv) await kv.set(KV_KEY, updated);
  else fileStore().write(updated);
  return booking;
}

export async function updateBookingStatus(
  id: string,
  status: Booking["status"]
): Promise<Booking | null> {
  const bookings = await getBookings();
  const idx = bookings.findIndex((b) => b.id === id);
  if (idx === -1) return null;
  bookings[idx].status = status;
  const kv = await tryKV();
  if (kv) await kv.set(KV_KEY, bookings);
  else fileStore().write(bookings);
  return bookings[idx];
}
