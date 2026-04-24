import Hero from '@/components/web-design/Hero';
import Problem from '@/components/web-design/Problem';
import Solution from '@/components/web-design/Solution';
import Services from '@/components/web-design/Services';
import Process from '@/components/web-design/Process';
import Portfolio from '@/components/web-design/Portfolio';
import Testimonials from '@/components/web-design/Testimonials';
import Pricing from '@/components/web-design/Pricing';
import FAQ from '@/components/web-design/FAQ';
import FinalCTA from '@/components/web-design/FinalCTA';
import WhatsAppFloat from '@/components/web-design/WhatsAppFloat';

export default function WebDesignLandingPage() {
  return (
    <>
      <Hero />
      <Problem />
      <Solution />
      <Services />
      <Process />
      <Portfolio />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <WhatsAppFloat />
    </>
  );
}
