import AnnouncementBar from "./components/AnnouncementBar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import VSL from "./components/VSL";
import ForWho from "./components/ForWho";
import WhatYouLearn from "./components/WhatYouLearn";
import BeforeAfter from "./components/BeforeAfter";
import Testimonials from "./components/Testimonials";
import Instructor from "./components/Instructor";
import Offer from "./components/Offer";
import Guarantee from "./components/Guarantee";
import FAQ from "./components/FAQ";
import CTAFinal from "./components/CTAFinal";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      {/* Announcement bar */}
      <AnnouncementBar />

      {/* Sticky navbar */}
      <Navbar />

      {/* Hero */}
      <Hero />

      {/* VSL */}
      <VSL />

      {/* For who */}
      <ForWho />

      {/* What you'll learn */}
      <WhatYouLearn />

      {/* Before / After */}
      <BeforeAfter />

      {/* Testimonials */}
      <Testimonials />

      {/* Instructor */}
      <Instructor />

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
