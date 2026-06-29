import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Gallery />
      <AvailabilityCalendar />
      <Footer />
    </main>
  );
}
