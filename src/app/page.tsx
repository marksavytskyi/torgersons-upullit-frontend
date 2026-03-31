import { Hero } from '@/components/home/Hero';
import { Stats } from '@/components/home/Stats';
import { HowItWorks } from '@/components/home/HowItWorks';
import { LiveInventoryPreview } from '@/components/home/LiveInventoryPreview';
import { QRExplainer } from '@/components/home/QRExplainer';
import { WhyUs } from '@/components/home/WhyUs';
import { CTASection } from '@/components/home/CTASection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <HowItWorks />
      <LiveInventoryPreview />
      <QRExplainer />
      <WhyUs />
      <CTASection />
    </>
  );
}
