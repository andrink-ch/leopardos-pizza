import { NextRequest, NextResponse } from "next/server";
import { updateLocation, deleteLocation } from "@/lib/locations";
import { requireAdminOr401 } from "@/lib/auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauthorized = await requireAdminOr401();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const data = await req.json();
  const location = await updateLocation(id, data);
  if (!location) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(location);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauthorized = await requireAdminOr401();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const location = await deleteLocation(id);
  if (!location) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
