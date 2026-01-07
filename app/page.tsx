import HeroSection from "@/components/hero-section";
import Testimonials from "@/components/testimonials";
import FooterSection from "@/components/footer";
import Features from "@/components/features-4";
import { BlogSection } from "@/components/blog";

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <HeroSection />
      <Features />
      <BlogSection />
      <Testimonials />
      <FooterSection />
    </div>
  );
}
