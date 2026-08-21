import { pgTable, uuid, text, integer, timestamp, date, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const bookingStatus = pgEnum("booking_status", ["pending", "accepted", "declined"]);

export const locations = pgTable("locations", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  address: text("address"),
  email: text("email"),
  phone: text("phone"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  locationId: uuid("location_id")
    .notNull()
    .references(() => locations.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const bookings = pgTable("bookings", {
  id: uuid("id").primaryKey().defaultRandom(),
  locationId: uuid("location_id")
    .notNull()
    .references(() => locations.id),
  status: bookingStatus("status").notNull().default("pending"),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  date: date("date", { mode: "string" }).notNull(),
  time: text("time"),
  // Customer-typed event address, e.g. "Garten der Familie Rossi" — unrelated to locationId (the business branch).
  location: text("location"),
  guests: text("guests"),
  dietary: text("dietary").array().notNull().default([]),
  allergies: text("allergies"),
  message: text("message"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const bookingItems = pgTable("booking_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  bookingId: uuid("booking_id")
    .notNull()
    .references(() => bookings.id, { onDelete: "cascade" }),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id),
  qty: integer("qty").notNull().default(1),
  notes: text("notes"),
});

export const locationsRelations = relations(locations, ({ many }) => ({
  products: many(products),
  bookings: many(bookings),
}));

export const productsRelations = relations(products, ({ one }) => ({
  location: one(locations, { fields: [products.locationId], references: [locations.id] }),
}));

export const bookingsRelations = relations(bookings, ({ many, one }) => ({
  items: many(bookingItems),
  location: one(locations, { fields: [bookings.locationId], references: [locations.id] }),
}));

export const bookingItemsRelations = relations(bookingItems, ({ one }) => ({
  booking: one(bookings, { fields: [bookingItems.bookingId], references: [bookings.id] }),
  product: one(products, { fields: [bookingItems.productId], references: [products.id] }),
}));
