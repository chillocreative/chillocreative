'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import HeroIllustration from './HeroIllustration';

const trackCta = (label: string, location: string) => {
  if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', 'cta_click', { cta_label: label, location });
  }
};

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#050511] text-white pt-40 md:pt-48 pb-20 md:pb-28">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[55%] h-[55%] rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 blur-[150px] opacity-40" />
        <div className="absolute top-[30%] -right-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-r from-pink-500 to-rose-500 blur-[150px] opacity-25" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 bg-repeat bg-[length:50px_50px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs tracking-widest uppercase text-purple-300 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Reka Website Malaysia
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
              Website Yang{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
                Datangkan Pelanggan.
              </span>{' '}
              Bukan Sekadar Cantik Dipandang.
            </h1>

            <p className="text-gray-300 text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
              Kami reka dan bina website berprestasi tinggi untuk bisnes Malaysia yang serius mahu
              berkembang di alam digital. Tiada template pasaran, tiada karut-marut &mdash; hanya
              reka bentuk bersih, laju, dan memberi hasil yang nyata.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:items-center mb-8">
              <a
                href="#tempah"
                onClick={() => trackCta('Dapatkan Audit Website Percuma', 'hero')}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold text-base md:text-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all hover:scale-[1.03]"
              >
                Dapatkan Audit Website Percuma
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 px-2 py-2 text-white/90 hover:text-white font-semibold text-sm md:text-base"
              >
                Lihat Hasil Kerja Kami <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1.5">
                <div className="flex -space-x-2">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-[#050511]"
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-1">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-1.5 text-white font-semibold">4.9</span>
                <span className="text-gray-400">di Google</span>
              </div>
              <span className="text-gray-500">&bull;</span>
              <span>Dipercayai oleh 50+ PKS di seluruh Malaysia</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <HeroIllustration />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
