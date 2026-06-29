import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getBookings, addBooking } from "@/lib/bookings";

export const dynamic = "force-dynamic";

async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  const secret = process.env.ADMIN_SECRET ?? "change-this-secret";
  return store.get("admin_token")?.value === secret;
}

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(getBookings());
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const booking = addBooking(data);
  return NextResponse.json(booking, { status: 201 });
}
