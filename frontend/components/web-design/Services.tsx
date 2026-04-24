'use client';

import { motion } from 'framer-motion';
import { Compass, Palette, Code2, Smartphone, Search, LifeBuoy } from 'lucide-react';

const services = [
  {
    Icon: Compass,
    title: 'Strategi & Perancangan',
    body: 'Memahami matlamat, audiens, dan pesaing anda sebelum satu pixel pun dilukis.',
  },
  {
    Icon: Palette,
    title: 'Reka Bentuk UI/UX Tersuai',
    body: 'Reka bentuk unik dan moden yang sesuai dengan jenama anda. Bukan template kitar semula.',
  },
  {
    Icon: Code2,
    title: 'Development',
    body: 'Dibina di atas WordPress, Laravel, atau kod yang bersesuaian, mana yang paling sesuai dengan keperluan anda.',
  },
  {
    Icon: Smartphone,
    title: 'Mobile-First',
    body: 'Direka dari telefon dulu, kemudian besarkan ke desktop. Sebab di situlah pelanggan anda berada.',
  },
  {
    Icon: Search,
    title: 'Asas SEO',
    body: 'Kod yang bersih dan laju serta struktur yang betul supaya Google sayang website anda dari hari pertama.',
  },
  {
    Icon: LifeBuoy,
    title: 'Sokongan Berterusan',
    body: 'Kami tidak lenyap selepas pelancaran. Penyelenggaraan, kemaskini, dan ketenangan fikiran, semua termasuk.',
  },
];

const Services = () => {
  return (
    <section className="relative bg-[#050511] text-white py-24 md:py-32 overflow-hidden">
      <div className="absolute -top-[10%] left-[50%] -translate-x-1/2 w-[70%] h-[40%] rounded-full bg-purple-600/10 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Semua Yang Anda Perlukan{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Di Satu Tempat.
            </span>
          </h2>
          <p className="text-gray-400 text-lg">
            Kami uruskan strategi, reka bentuk, development, dan pelancaran. Anda fokus pada bisnes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map(({ Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              className="group p-7 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/[0.07] hover:border-purple-400/30 hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_rgba(168,85,247,0.3)] transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/80 to-pink-600/80 flex items-center justify-center mb-5 shadow-lg shadow-purple-900/30 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-3">{title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
