import { NextRequest, NextResponse } from "next/server";
import { listProducts, createProduct } from "@/lib/products";
import { requireAdminOr401 } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const unauthorized = await requireAdminOr401();
  if (unauthorized) return unauthorized;

  const locationId = req.nextUrl.searchParams.get("locationId") ?? undefined;
  return NextResponse.json(await listProducts(locationId));
}

export async function POST(req: NextRequest) {
  const unauthorized = await requireAdminOr401();
  if (unauthorized) return unauthorized;

  const data = await req.json();
  if (!data.name || !data.locationId) {
    return NextResponse.json({ error: "Name und Standort sind erforderlich" }, { status: 400 });
  }
  const product = await createProduct(data);
  return NextResponse.json(product, { status: 201 });
}
