import { db } from "./client";
import { locations, products } from "./schema";
import { eq } from "drizzle-orm";

const PIZZAS = [
  { name: "Margherita", description: "Tomate, Mozzarella, Basilikum" },
  { name: "Diavola", description: "Tomate, Mozzarella, Peperoni" },
  { name: "Pistacchio", description: "Pistaziencreme, Mozzarella, Mortadella" },
  { name: "Marinara", description: "Tomate, Knoblauch, Oregano (vegan)" },
  { name: "Funghi", description: "Tomate, Mozzarella, Champignons" },
  { name: "Salsiccia", description: "Tomate, Mozzarella, italienische Wurst" },
];

async function main() {
  let [location] = await db.select().from(locations).limit(1);
  if (!location) {
    [location] = await db
      .insert(locations)
      .values({ name: "Leopardo's Pizza", email: "ciao@leopardos.de", phone: "089 / 123 456" })
      .returning();
  }

  const existing = await db.select().from(products).where(eq(products.locationId, location.id));
  if (existing.length === 0) {
    await db.insert(products).values(
      PIZZAS.map((p, i) => ({ ...p, locationId: location.id, sortOrder: i }))
    );
  }

  console.log("Seed complete:", location.name);
  process.exit(0);
}

main();
