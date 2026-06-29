import { NextResponse } from "next/server";
import { getBookings } from "@/lib/bookings";

export const dynamic = "force-dynamic";

export async function GET() {
  const bookings = await getBookings();
  const dates = bookings
    .filter((b) => b.status === "accepted" && b.date)
    .map((b) => b.date);
  return NextResponse.json({ dates });
}
