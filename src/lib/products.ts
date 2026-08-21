import "server-only";
import { db } from "@/db/client";
import { products } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

export async function getProductsByLocation(locationId: string) {
  return db.select().from(products).where(eq(products.locationId, locationId)).orderBy(asc(products.sortOrder));
}

export type Product = Awaited<ReturnType<typeof getProductsByLocation>>[number];

export async function listProducts(locationId?: string) {
  if (locationId) return getProductsByLocation(locationId);
  return db.select().from(products).orderBy(asc(products.sortOrder));
}

export interface NewProduct {
  locationId: string;
  name: string;
  description?: string;
  sortOrder?: number;
}

export async function createProduct(data: NewProduct) {
  const [product] = await db.insert(products).values(data).returning();
  return product;
}

export interface ProductUpdate {
  name?: string;
  description?: string;
  sortOrder?: number;
}

export async function updateProduct(id: string, data: ProductUpdate) {
  const [updated] = await db.update(products).set(data).where(eq(products.id, id)).returning();
  return updated ?? null;
}

export async function deleteProduct(id: string) {
  const [deleted] = await db.delete(products).where(eq(products.id, id)).returning();
  return deleted ?? null;
}
