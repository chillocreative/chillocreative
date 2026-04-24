'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const benefits = [
  {
    title: 'Dibina Untuk Convert',
    body: 'Setiap elemen diletak dengan tujuan, berdasarkan prinsip conversion yang terbukti.',
  },
  {
    title: 'Laju Seperti Kilat',
    body: 'Dioptimumkan untuk Google PageSpeed. Pelawat anda tidak mahu menunggu. Jualan anda pun patut sama.',
  },
  {
    title: 'Dibina Untuk Pasaran Malaysia',
    body: 'Kami faham perangai pembeli tempatan: FPX, enquiry WhatsApp, kandungan dwibahasa. Kami bina mengikut cara orang Malaysia betul-betul melayari web.',
  },
];

const SolutionIllustration = () => (
  <svg
    viewBox="0 0 480 420"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-auto"
    role="img"
    aria-label="Ilustrasi website yang dioptimumkan untuk convert"
  >
    <defs>
      <linearGradient id="sol-screen" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#1a1a3a" />
        <stop offset="100%" stopColor="#0b0b22" />
      </linearGradient>
      <linearGradient id="sol-accent" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#ec4899" />
      </linearGradient>
      <linearGradient id="sol-glow" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#a855f7" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#ec4899" stopOpacity="0.25" />
      </linearGradient>
    </defs>

    <circle cx="240" cy="210" r="180" fill="url(#sol-glow)" />

    <rect x="80" y="60" width="320" height="300" rx="20" fill="url(#sol-screen)" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="2" />
    <rect x="80" y="60" width="320" height="32" rx="20" fill="#0a0a1f" />
    <rect x="210" y="70" width="160" height="12" rx="6" fill="#ffffff" fillOpacity="0.08" />

    <rect x="104" y="116" width="180" height="18" rx="4" fill="#ffffff" />
    <rect x="104" y="144" width="240" height="8" rx="4" fill="#ffffff" fillOpacity="0.35" />
    <rect x="104" y="160" width="200" height="8" rx="4" fill="#ffffff" fillOpacity="0.35" />
    <rect x="104" y="190" width="130" height="38" rx="19" fill="url(#sol-accent)" />

    <rect x="104" y="250" width="272" height="90" rx="14" fill="#ffffff" fillOpacity="0.05" stroke="#ffffff" strokeOpacity="0.1" />
    <circle cx="128" cy="280" r="14" fill="#22c55e" />
    <path d="M 122 280 L 127 285 L 134 277" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <rect x="150" y="270" width="180" height="8" rx="4" fill="#ffffff" fillOpacity="0.6" />
    <rect x="150" y="286" width="130" height="6" rx="3" fill="#ffffff" fillOpacity="0.3" />

    <circle cx="128" cy="316" r="14" fill="#22c55e" />
    <path d="M 122 316 L 127 321 L 134 313" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <rect x="150" y="308" width="160" height="8" rx="4" fill="#ffffff" fillOpacity="0.6" />
    <rect x="150" y="324" width="100" height="6" rx="3" fill="#ffffff" fillOpacity="0.3" />

    <g transform="translate(360 90)">
      <rect x="-36" y="-18" width="72" height="36" rx="18" fill="#22c55e" />
      <text x="0" y="5" fontSize="13" textAnchor="middle" fill="#fff" fontWeight="700" fontFamily="sans-serif">+183%</text>
    </g>
  </svg>
);

const Solution = () => {
  return (
    <section className="relative bg-[#0b0b22] text-white py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Kami Bina Website Yang{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                Menjual Untuk Anda.
              </span>
            </h2>
            <div className="space-y-5 mb-10 text-gray-300 leading-relaxed">
              <p>
                Di Chillo Creative, kami bukan sekadar mereka bentuk website, kami cipta alat
                digital yang berfungsi walaupun anda sedang tidur. Setiap halaman, setiap butang,
                dan setiap perkataan disusun dengan tujuan yang satu: memandu pelawat anda untuk
                mengambil tindakan.
              </p>
              <p>
                Sama ada anda perlukan website baharu, redesign sepenuhnya, atau landing page yang
                betul-betul convert, kami boleh bantu.
              </p>
            </div>

            <ul className="space-y-4">
              {benefits.map((b, i) => (
                <motion.li
                  key={b.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                  className="flex gap-4"
                >
                  <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{b.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{b.body}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <SolutionIllustration />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Solution;
