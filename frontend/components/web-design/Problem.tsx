'use client';

import { motion } from 'framer-motion';
import { Turtle, Smartphone, TrendingDown } from 'lucide-react';

const pains = [
  {
    Icon: Turtle,
    title: 'Lambat & Ketinggalan Zaman',
    body: 'Pelawat akan tinggalkan website anda dalam masa 3 saat jika ia lambat. Website anda, kemungkinan besar, memang lambat.',
    accent: 'from-orange-500/20 to-red-500/20',
    iconColor: 'text-orange-400',
  },
  {
    Icon: Smartphone,
    title: 'Rosak Pada Telefon',
    body: 'Lebih 70% pelawat anda menggunakan telefon. Kalau website anda nampak berselerak pada mobile, anda sedang kehilangan mereka.',
    accent: 'from-pink-500/20 to-purple-500/20',
    iconColor: 'text-pink-400',
  },
  {
    Icon: TrendingDown,
    title: 'Tiada Leads, Tiada Jualan',
    body: 'Website yang cantik tidak bermakna apa-apa jika ia tidak membawa masuk enquiry. Anda perlukan website yang dibina untuk convert, bukan sekadar untuk dipandang.',
    accent: 'from-rose-500/20 to-red-600/20',
    iconColor: 'text-rose-400',
  },
];

const Problem = () => {
  return (
    <section className="relative bg-[#050511] text-white py-24 md:py-32 overflow-hidden">
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
            Adakah Website Anda Betul-Betul{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Menjana Pendapatan?
            </span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Kebanyakan usahawan yang kami temui ada website &mdash; tapi website tu tak buat kerjanya.
            Ia hanya terpacak di situ, kelihatan &ldquo;okay sahaja&rdquo;, sementara pesaing diam-diam
            merampas pelanggan yang sepatutnya jadi milik anda.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {pains.map(({ Icon, title, body, accent, iconColor }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-white/20 hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_rgba(168,85,247,0.25)] transition-all"
            >
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${accent} opacity-0 group-hover:opacity-100 transition-opacity`}
              />
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  <Icon className={`w-7 h-7 ${iconColor}`} />
                </div>
                <h3 className="text-xl font-bold mb-3">{title}</h3>
                <p className="text-gray-400 leading-relaxed">{body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problem;
