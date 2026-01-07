import HeroSection from "@/components/hero-section";
import Testimonials from "@/components/testimonials";
import InfiniteMenu from "@/components/ui/InfiniteMenu";
import FooterSection from "@/components/footer";

import Features from "@/components/features-4";

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <HeroSection />
      <Features />
      <Testimonials />
      <FooterSection />
    </div>
  );
}
