import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import type { Booking } from "./types";

const FILE = path.join(process.cwd(), "data", "bookings.json");

function read(): Booking[] {
  try {
    if (!fs.existsSync(FILE)) return [];
    return JSON.parse(fs.readFileSync(FILE, "utf-8"));
  } catch {
    return [];
  }
}

function write(data: Booking[]): void {
  fs.mkdirSync(path.dirname(FILE), { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

export function getBookings(): Booking[] {
  return read();
}

export function addBooking(
  data: Omit<Booking, "id" | "createdAt" | "status">
): Booking {
  const bookings = read();
  const booking: Booking = {
    ...data,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    status: "pending",
  };
  bookings.unshift(booking);
  write(bookings);
  return booking;
}

export function updateBookingStatus(
  id: string,
  status: Booking["status"]
): Booking | null {
  const bookings = read();
  const idx = bookings.findIndex((b) => b.id === id);
  if (idx === -1) return null;
  bookings[idx].status = status;
  write(bookings);
  return bookings[idx];
}
