import { NextRequest, NextResponse } from "next/server";
import { updateProduct, deleteProduct } from "@/lib/products";
import { requireAdminOr401 } from "@/lib/auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauthorized = await requireAdminOr401();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const data = await req.json();
  const product = await updateProduct(id, data);
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(product);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauthorized = await requireAdminOr401();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const product = await deleteProduct(id);
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
