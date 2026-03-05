import AnnouncementBar from "./components/AnnouncementBar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import VSL from "./components/VSL";
import BeforeAfter from "./components/BeforeAfter";
import Testimonials from "./components/Testimonials";
import Instructor from "./components/Instructor";
import ForWho from "./components/ForWho";
import Offer from "./components/Offer";
import Guarantee from "./components/Guarantee";
import FAQ from "./components/FAQ";
import CTAFinal from "./components/CTAFinal";

export default function Home() {
  return (
    <main className="min-h-screen bg-space-indigo">
      {/* Manu section — Announcement bar */}
      <AnnouncementBar />

      {/* Sticky navbar */}
      <Navbar />

      {/* Hero */}
      <Hero />

      {/* VSL */}
      <VSL />

      {/* Before / After */}
      <BeforeAfter />

      {/* Testimonials */}
      <Testimonials />

      {/* Instructor */}
      <Instructor />

      {/* For who */}
      <ForWho />

      {/* Offer */}
      <Offer />

      {/* Guarantee */}
      <Guarantee />

      {/* FAQ */}
      <FAQ />

      {/* Final CTA */}
      <CTAFinal />
    </main>
  );
}
