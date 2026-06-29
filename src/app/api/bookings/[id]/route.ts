import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { updateBookingStatus } from "@/lib/bookings";
import type { Booking } from "@/lib/types";

async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  const secret = process.env.ADMIN_SECRET ?? "change-this-secret";
  return store.get("admin_token")?.value === secret;
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { status } = await req.json();
  const valid: Booking["status"][] = ["pending", "accepted", "declined"];
  if (!valid.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const booking = updateBookingStatus(id, status);
  if (!booking) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(booking);
}
