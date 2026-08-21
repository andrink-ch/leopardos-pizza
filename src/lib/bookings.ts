import "server-only";
import { db } from "@/db/client";
import { bookings, bookingItems, locations } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export interface BookingItemInput {
  productId: string;
  qty: number;
  notes?: string;
}

export interface NewBooking {
  name: string;
  email: string;
  phone?: string;
  date: string;
  time?: string;
  location?: string;
  guests?: string;
  dietary: string[];
  allergies?: string;
  message?: string;
  items: BookingItemInput[];
}

export type BookingStatus = "pending" | "accepted" | "declined";

export async function getBookings() {
  return db.query.bookings.findMany({
    orderBy: desc(bookings.createdAt),
    with: { items: { with: { product: true } } },
  });
}

export type BookingWithItems = Awaited<ReturnType<typeof getBookings>>[number];

async function getDefaultLocationId(): Promise<string> {
  const [location] = await db.select({ id: locations.id }).from(locations).limit(1);
  if (!location) throw new Error("No location configured. Run `npm run db:seed`.");
  return location.id;
}

export async function addBooking(data: NewBooking) {
  const locationId = await getDefaultLocationId();
  return db.transaction(async (tx) => {
    const [booking] = await tx.insert(bookings).values({ ...data, locationId }).returning();
    if (data.items.length > 0) {
      await tx.insert(bookingItems).values(
        data.items.map((i) => ({
          bookingId: booking.id,
          productId: i.productId,
          qty: i.qty,
          notes: i.notes,
        }))
      );
    }
    // Re-fetch with items+product joined so callers (e.g. the email notification) have full data.
    return tx.query.bookings.findFirst({
      where: eq(bookings.id, booking.id),
      with: { items: { with: { product: true } } },
    }) as Promise<BookingWithItems>;
  });
}

export async function updateBookingStatus(id: string, status: BookingStatus) {
  const [updated] = await db.update(bookings).set({ status }).where(eq(bookings.id, id)).returning();
  return updated ?? null;
}
