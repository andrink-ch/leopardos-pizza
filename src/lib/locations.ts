import "server-only";
import { db } from "@/db/client";
import { locations } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

export async function listLocations() {
  return db.select().from(locations).orderBy(asc(locations.name));
}

export interface NewLocation {
  name: string;
  address?: string;
  email?: string;
  phone?: string;
}

export async function createLocation(data: NewLocation) {
  const [location] = await db.insert(locations).values(data).returning();
  return location;
}

export interface LocationUpdate {
  name?: string;
  address?: string;
  email?: string;
  phone?: string;
}

export async function updateLocation(id: string, data: LocationUpdate) {
  const [updated] = await db.update(locations).set(data).where(eq(locations.id, id)).returning();
  return updated ?? null;
}

export async function deleteLocation(id: string) {
  const [deleted] = await db.delete(locations).where(eq(locations.id, id)).returning();
  return deleted ?? null;
}
