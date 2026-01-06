import { HeroHeader } from "@/components/header";
import Features from "@/components/features-4";
import FooterSection from "@/components/footer";

export default function FeaturesPage() {
  return (
    <>
      <HeroHeader />
      <main className="pt-24">
        <Features />
      </main>
      <FooterSection />
    </>
  );
}
