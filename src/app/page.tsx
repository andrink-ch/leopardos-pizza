import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import Footer from "@/components/Footer";
import { db } from "@/db/client";
import { locations } from "@/db/schema";
import { getProductsByLocation } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [location] = await db.select().from(locations).limit(1);
  const products = location ? await getProductsByLocation(location.id) : [];

  return (
    <main>
      <Nav />
      <Hero />
      <Gallery products={products} />
      <AvailabilityCalendar products={products} />
      <Footer />
    </main>
  );
}
