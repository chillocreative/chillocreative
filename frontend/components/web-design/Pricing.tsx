'use client';

import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { trackPixel } from '@/lib/pixel';

type Tier = {
  name: string;
  price: string;
  priceSuffix?: string;
  tagline: string;
  features: string[];
  cta: string;
  href: string;
  popular?: boolean;
  value: number;
};

const tiers: Tier[] = [
  {
    name: 'Starter',
    price: 'RM 2,500',
    tagline: 'Sesuai untuk bisnes baru yang ingin mula online.',
    features: [
      'Sehingga 5 halaman',
      'Mobile-responsive',
      'Setup SEO asas',
      'Borang kontak + integrasi WhatsApp',
      '2 pusingan semakan',
    ],
    cta: 'Mula Sekarang',
    href: '#tempah',
    value: 2500,
  },
  {
    name: 'Growth',
    price: 'RM 5,500',
    tagline: 'Untuk bisnes yang bersedia untuk berkembang online.',
    features: [
      'Sehingga 10 halaman',
      'Reka bentuk tersuai (tiada template)',
      'SEO lanjutan',
      'Integrasi blog / CMS',
      'Setup lead capture & analytics',
      '4 pusingan semakan',
    ],
    cta: 'Mula Sekarang',
    href: '#tempah',
    popular: true,
    value: 5500,
  },
  {
    name: 'Custom',
    price: 'Hubungi Kami',
    tagline: 'Untuk e-commerce, web app, atau projek kompleks.',
    features: [
      'Semua dalam pakej Growth, tambah:',
      'E-commerce / payment gateway',
      'Fungsi tersuai',
      'Project manager dedikasi',
      'Sokongan keutamaan',
    ],
    cta: 'Minta Sebut Harga',
    href: '#tempah',
    value: 0,
  },
];

const trackCta = (label: string, location: string) => {
  if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', 'cta_click', { cta_label: label, location });
  }
};

const Pricing = () => {
  return (
    <section id="harga" className="relative bg-[#050511] text-white py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[150px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[40%] h-[40%] rounded-full bg-pink-600/10 blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Harga Yang{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Mudah & Telus.
            </span>
          </h2>
          <p className="text-gray-400 text-lg">
            Pilih pakej, atau mari kita bina pelan tersuai bersama-sama.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto items-stretch">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-3xl p-8 md:p-10 flex flex-col transition-all hover:-translate-y-1 ${
                t.popular
                  ? 'bg-gradient-to-br from-purple-600 via-purple-700 to-pink-700 border border-white/20 shadow-[0_30px_80px_-20px_rgba(168,85,247,0.55)] lg:scale-[1.04] lg:-translate-y-2'
                  : 'bg-white/5 border border-white/10 backdrop-blur-sm hover:border-white/20'
              }`}
            >
              {t.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-xs font-bold tracking-wide text-black uppercase shadow-lg">
                  <Sparkles className="w-3.5 h-3.5" />
                  Paling Popular
                </span>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">{t.name}</h3>
                <p className={`text-sm ${t.popular ? 'text-white/80' : 'text-gray-400'}`}>
                  {t.tagline}
                </p>
              </div>

              <div className="mb-8">
                <span className="text-4xl md:text-5xl font-bold tracking-tight">{t.price}</span>
                {t.priceSuffix && (
                  <span className={`ml-2 text-sm ${t.popular ? 'text-white/70' : 'text-gray-400'}`}>
                    {t.priceSuffix}
                  </span>
                )}
              </div>

              <ul className="space-y-3 mb-10 flex-grow">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <div
                      className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                        t.popular ? 'bg-white/20' : 'bg-purple-500/20'
                      }`}
                    >
                      <Check
                        className={`w-3 h-3 ${t.popular ? 'text-white' : 'text-purple-300'}`}
                        strokeWidth={3}
                      />
                    </div>
                    <span className={`text-sm leading-relaxed ${t.popular ? 'text-white/95' : 'text-gray-300'}`}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={t.href}
                onClick={() => {
                  trackCta(`Pricing: ${t.name}`, 'pricing');
                  trackPixel('InitiateCheckout', {
                    value: t.value,
                    currency: 'MYR',
                    content_name: t.name,
                  });
                }}
                className={`inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-bold transition-all hover:scale-[1.02] ${
                  t.popular
                    ? 'bg-white text-purple-700 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]'
                }`}
              >
                {t.cta} &rarr;
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
