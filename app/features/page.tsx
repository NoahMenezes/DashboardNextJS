import { HeroHeader } from "@/components/header";
import Features from "@/components/features-4";
import Content1 from "@/components/content-1";
import Content2 from "@/components/content-2";
import Content5 from "@/components/content-5";
import Content6 from "@/components/content-6";
import Content7 from "@/components/content-7";
import Faqs1 from "@/components/faqs-1";
import Faqs2 from "@/components/faqs-2";
import Faqs4 from "@/components/faqs-4";
import Testimonials5 from "@/components/testimonials-5";
import FooterSection from "@/components/footer";
import GoogleGeminiEffectDemo from "@/components/google-gemini-effect-demo";

export default function FeaturesPage() {
  return (
    <>
      <HeroHeader />
      <main className="pt-24">
        <Features />
        <Content1 />
        <Content2 />
        <Content5 />
        <GoogleGeminiEffectDemo />
        <Content6 />
        <Content7 />
        <Faqs4 />
        <Faqs2 />
        <Faqs1 />
        <Testimonials5 />
      </main>
      <FooterSection />
    </>
  );
}
