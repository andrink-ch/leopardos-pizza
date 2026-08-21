import { NextRequest, NextResponse } from "next/server";
import { updateBookingStatus, type BookingStatus } from "@/lib/bookings";
import { requireAdminOr401 } from "@/lib/auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauthorized = await requireAdminOr401();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const { status } = await req.json();
  const valid: BookingStatus[] = ["pending", "accepted", "declined"];
  if (!valid.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const booking = await updateBookingStatus(id, status);
  if (!booking) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(booking);
}
