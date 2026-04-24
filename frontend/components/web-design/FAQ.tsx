'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

const faqs = [
  {
    q: 'Berapa lama masa diperlukan untuk bina website?',
    a: 'Kebanyakan projek mengambil masa 4 hingga 6 minggu dari mula hingga pelancaran. Projek yang lebih besar mungkin mengambil 8 hingga 12 minggu.',
  },
  {
    q: 'Adakah saya memiliki website selepas ia siap?',
    a: 'Ya, 100%. Pemilikan penuh: fail, domain, hosting, semuanya.',
  },
  {
    q: 'Macam mana kalau saya belum ada copy atau gambar?',
    a: 'Tak jadi masalah. Kami boleh tuliskan copy dan sediakan visual sebagai sebahagian daripada projek.',
  },
  {
    q: 'Ada pilihan bayar ansuran?',
    a: 'Ada. Biasanya 50% deposit, 50% semasa pelancaran. Untuk projek lebih besar, kami tawarkan pelan 3-ansuran.',
  },
  {
    q: 'Boleh redesign website sedia ada saya?',
    a: 'Boleh. Redesign adalah antara jenis projek yang paling kerap kami buat.',
  },
  {
    q: 'Apa yang berlaku selepas pelancaran?',
    a: 'Kami tawarkan pelan penjagaan bulanan untuk kemaskini, backup, dan sokongan. Atau anda boleh uruskan sendiri.',
  },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-[#0b0b22] text-white py-24 md:py-32 overflow-hidden">
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
            Ada Soalan?{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Kami Ada Jawapan.
            </span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: Math.min(i * 0.05, 0.3) }}
                className={`rounded-2xl border transition-colors ${
                  isOpen
                    ? 'bg-white/[0.07] border-purple-400/30'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-semibold text-base md:text-lg">{f.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      isOpen
                        ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
                        : 'bg-white/10 text-gray-300'
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-gray-400 leading-relaxed">{f.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
