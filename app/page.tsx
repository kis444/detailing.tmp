import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/home/hero-section";
import { ServicesPreview } from "@/components/home/services-preview";
import { GalleryPreview } from "@/components/home/gallery-preview";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { Testimonials } from "@/components/home/testimonials";
import { CTASection } from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ServicesPreview />
      <GalleryPreview />
      <WhyChooseUs />
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  );
}
