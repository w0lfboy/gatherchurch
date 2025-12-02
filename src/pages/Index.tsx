import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { About } from "@/components/landing/About";
import { Resources } from "@/components/landing/Resources";
import { Pricing } from "@/components/landing/Pricing";
import { Testimonials } from "@/components/landing/Testimonials";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <About />
      <Resources />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
};

export default Index;
