'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      'Chillo Creative bukan sekadar bina website, mereka bina mesin yang bawa masuk leads setiap hari. Pelaburan terbaik yang kami buat tahun ini.',
    name: 'Aina Rashid',
    role: 'Pengasas, Butik Aisyah',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&h=160&q=70',
  },
  {
    quote:
      'Timeline tepat, komunikasi power, dan hasilnya jauh lebih baik daripada yang kami bayangkan. Website kami sekarang jadi jurujual penuh masa.',
    name: 'Hafiz Zulkifli',
    role: 'CEO, Aliff Properties',
    avatar:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&h=160&q=70',
  },
  {
    quote:
      'Akhirnya ada team yang faham bisnes orang Malaysia. FPX, WhatsApp, BM-English, semua smooth. Enquiry masuk siang malam tanpa kami sentuh apa-apa.',
    name: 'Dr. Siti Khadijah',
    role: 'Pengarah, Klinik Sihat Sejahtera',
    avatar:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&h=160&q=70',
  },
];

const logos = [
  'Kopi Mak Long',
  'Klinik Sihat',
  'Butik Aisyah',
  'Akademi Hafiz',
  'Aliff Properties',
  'Pak Abu',
];

const Testimonials = () => {
  return (
    <section className="relative bg-[#0b0b22] text-white py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Jangan Percaya{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Kata-Kata Kami.
            </span>
          </h2>
          <p className="text-gray-400 text-lg">
            Dengar apa klien kami kata tentang kerja yang kami bina bersama.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-purple-400/30 hover:-translate-y-1 transition-all"
            >
              <Quote className="w-8 h-8 text-purple-400/40 mb-4" />
              <div className="flex gap-0.5 mb-4" aria-label="5 daripada 5 bintang">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <blockquote className="text-gray-200 leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.avatar}
                  alt={t.name}
                  loading="lazy"
                  className="w-12 h-12 rounded-full object-cover border border-white/10"
                />
                <div>
                  <div className="font-bold text-sm">{t.name}</div>
                  <div className="text-xs text-gray-400">{t.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center text-xs tracking-widest uppercase text-gray-300 mb-6">
            Dipercayai oleh 50+ PKS di Malaysia
          </div>
          <div
            className="relative overflow-hidden"
            style={{
              maskImage:
                'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            }}
          >
            <motion.div
              className="flex w-max gap-4"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
            >
              {[...logos, ...logos].map((logo, i) => (
                <div
                  key={`${logo}-${i}`}
                  className="flex items-center justify-center h-12 px-6 rounded-lg bg-white/[0.08] border border-white/15 text-white text-xs font-bold tracking-wide uppercase whitespace-nowrap"
                >
                  {logo}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
