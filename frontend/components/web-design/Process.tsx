'use client';

import { motion } from 'framer-motion';
import { Phone, FileText, Brush, Rocket } from 'lucide-react';

const steps = [
  {
    Icon: Phone,
    number: '01',
    title: 'Discovery Call (Percuma)',
    body: 'Kita jumpa dalam panggilan 30 minit untuk memahami bisnes anda, matlamat anda, dan apa maksud "berjaya" bagi anda.',
  },
  {
    Icon: FileText,
    number: '02',
    title: 'Strategi & Proposal',
    body: 'Kami hantar pelan yang jelas, timeline, dan sebut harga tetap. Tiada kejutan, tiada caj tersembunyi.',
  },
  {
    Icon: Brush,
    number: '03',
    title: 'Reka Bentuk & Bina',
    body: 'Kami reka, anda semak, kami perhalusi. Anda akan nampak perkembangan sebenar setiap minggu.',
  },
  {
    Icon: Rocket,
    number: '04',
    title: 'Lancar & Sokong',
    body: 'Kita lancarkan bersama — kemudian kami kekal bersama untuk pastikan semuanya berjalan lancar.',
  },
];

const Process = () => {
  return (
    <section className="relative bg-[#0b0b22] text-white py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Dari Idea Ke Pelancaran Dalam{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              4 Langkah Mudah.
            </span>
          </h2>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-purple-500/0 via-purple-500/60 to-pink-500/0" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-6">
            {steps.map(({ Icon, number, title, body }, i) => (
              <motion.div
                key={number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative flex flex-col items-center text-center lg:px-3"
              >
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(168,85,247,0.4)]">
                  <Icon className="w-9 h-9 text-white" strokeWidth={2} />
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#0b0b22] border border-white/20 flex items-center justify-center text-xs font-bold text-purple-300">
                    {number}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-3">{title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm max-w-xs">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
