import HeroSection from "@/components/hero-section";
import Testimonials from "@/components/testimonials";
import InfiniteMenu from "@/components/ui/InfiniteMenu";
import FooterSection from "@/components/footer";
import LightPillar from "@/components/LightPillar";

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <HeroSection />
      
      {/* Light Pillar Animation */}
      <div style={{ width: '100%', height: '600px', position: 'relative' }}>
        <LightPillar
          topColor="#5227FF"
          bottomColor="#FF9FFC"
          intensity={1.0}
          rotationSpeed={0.3}
          glowAmount={0.005}
          pillarWidth={3.0}
          pillarHeight={0.4}
          noiseIntensity={0.5}
          pillarRotation={0}
          interactive={false}
          mixBlendMode="normal"
        />
      </div>
      
      <Testimonials />
      <div style={{ height: '600px', position: 'relative' }}>
          <InfiniteMenu items={[
            {
              image: 'https://picsum.photos/300/300?grayscale',
              link: 'https://google.com/',
              title: 'Item 1',
              description: 'This is pretty cool, right?'
            },
            {
              image: 'https://picsum.photos/400/400?grayscale',
              link: 'https://google.com/',
              title: 'Item 2',
              description: 'This is pretty cool, right?'
            },
            {
              image: 'https://picsum.photos/500/500?grayscale',
              link: 'https://google.com/',
              title: 'Item 3',
              description: 'This is pretty cool, right?'
            },
            {
              image: 'https://picsum.photos/600/600?grayscale',
              link: 'https://google.com/',
              title: 'Item 4',
              description: 'This is pretty cool, right?'
            }
          ]}/>
      </div>
      <FooterSection />
    </div>
  );
}
