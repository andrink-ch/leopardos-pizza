import { NextRequest, NextResponse } from "next/server";
import { listLocations, createLocation } from "@/lib/locations";
import { requireAdminOr401 } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const unauthorized = await requireAdminOr401();
  if (unauthorized) return unauthorized;
  return NextResponse.json(await listLocations());
}

export async function POST(req: NextRequest) {
  const unauthorized = await requireAdminOr401();
  if (unauthorized) return unauthorized;

  const data = await req.json();
  if (!data.name) {
    return NextResponse.json({ error: "Name ist erforderlich" }, { status: 400 });
  }
  const location = await createLocation(data);
  return NextResponse.json(location, { status: 201 });
}
