import { NextResponse } from "next/server";
import { getBookings } from "@/lib/bookings";

export const dynamic = "force-dynamic";

// Public endpoint — returns only accepted booking dates, no personal data
export async function GET() {
  const bookings = getBookings();
  const dates = bookings
    .filter((b) => b.status === "accepted" && b.date)
    .map((b) => b.date);
  return NextResponse.json({ dates });
}
