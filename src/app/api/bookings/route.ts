import { NextRequest, NextResponse } from "next/server";
import { getBookings, addBooking } from "@/lib/bookings";
import { sendBookingNotification } from "@/lib/email";
import { requireAdminOr401 } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const unauthorized = await requireAdminOr401();
  if (unauthorized) return unauthorized;
  return NextResponse.json(await getBookings());
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const booking = await addBooking(data);
  sendBookingNotification(booking).catch(console.error);
  return NextResponse.json(booking, { status: 201 });
}
