"use client"
import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import ServicesOverview from "@/components/services-overview"
import WhyChooseUs from "@/components/why-choose-us"
import CTASection from "@/components/cta-section"
import FaqSection from "@/components/faq-section";
import Footer from "@/components/footer"
import TestimonialsSection from "@/components/testimonials-section" // Import the new component

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <TestimonialsSection />
      {/* <ServicesOverview /> */}
      <WhyChooseUs />
      <CTASection />
      <FaqSection />


      <Footer />
    </main>
  )
}
