import Hero from '@/components/Hero';
import ServicesList from '@/components/ServicesList';
import PortfolioPreview from '@/components/PortfolioPreview';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesList />
      <PortfolioPreview />

      {/* Contact CTA Section */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600 rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready to start your project?</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            Let&apos;s discuss how we can bring your vision to life. Our team is ready to deliver excellence.
          </p>
          <Link href="/contact" className="inline-block px-10 py-5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all transform hover:-translate-y-1">
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
