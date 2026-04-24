'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

type Project = {
  client: string;
  industry: string;
  challenge: string;
  result: string;
  image: string;
  alt: string;
};

const projects: Project[] = [
  {
    client: 'Kopi Mak Long',
    industry: 'F&B / Kedai Kopi',
    challenge: 'Kedai kopi viral di media sosial tetapi tiada cara untuk terima tempahan online.',
    result: '3x lebih banyak enquiry dalam 60 hari selepas pelancaran.',
    image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=800&q=70',
    alt: 'Website kedai kopi yang moden',
  },
  {
    client: 'Klinik Sihat Sejahtera',
    industry: 'Kesihatan / Klinik',
    challenge: 'Sistem tempahan appointment masih secara telefon, menyebabkan no-show yang tinggi.',
    result: 'Pengurangan 60% no-show dengan sistem booking online + reminder WhatsApp.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=70',
    alt: 'Website klinik kesihatan',
  },
  {
    client: 'Butik Aisyah',
    industry: 'Fesyen / E-commerce',
    challenge: 'Jualan Instagram mencapai had — memerlukan kedai sendiri untuk berkembang.',
    result: 'RM 45K jualan dalam bulan pertama dengan integrasi FPX & Shopee Xpress.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=70',
    alt: 'Website e-commerce butik',
  },
  {
    client: 'Akademi Hafiz',
    industry: 'Pendidikan',
    challenge: 'Ibu bapa sukar mendapatkan info kelas dan jadual tanpa hubungi admin setiap kali.',
    result: 'Enrolment online meningkat 220%, beban admin berkurang separuh.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=70',
    alt: 'Website akademi pendidikan',
  },
  {
    client: 'Setia Properties',
    industry: 'Hartanah',
    challenge: 'Ejen hartanah terpaksa whatsapp gambar satu persatu kepada pembeli berpotensi.',
    result: '5x lead qualified per bulan dengan listing gallery & kalkulator pinjaman.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=70',
    alt: 'Website agensi hartanah',
  },
  {
    client: 'Pak Abu Catering',
    industry: 'Catering / Perkhidmatan',
    challenge: 'Enquiry catering tersekat dalam inbox WhatsApp yang bercampur-campur.',
    result: 'Sistem quotation automatik menjimatkan 10 jam seminggu dan double rate closing.',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=70',
    alt: 'Website perkhidmatan catering',
  },
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="relative bg-[#050511] text-white py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Kerja Sebenar.{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Hasil Sebenar.
            </span>
          </h2>
          <p className="text-gray-400 text-lg">
            Beberapa projek terkini kami &mdash; setiap satunya dibina dengan tujuan.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {projects.map((p, i) => (
            <motion.article
              key={p.client}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="group rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-purple-400/30 hover:-translate-y-1 hover:shadow-[0_30px_60px_-20px_rgba(168,85,247,0.35)] transition-all"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#0b0b22]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt={p.alt}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050511] via-transparent to-transparent opacity-70" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur border border-white/10 text-xs font-semibold text-purple-200">
                  {p.industry}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold mb-3 flex items-center justify-between gap-3">
                  {p.client}
                  <ArrowUpRight className="w-5 h-5 text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                  <span className="text-gray-500 text-xs uppercase tracking-wider font-semibold block mb-1">
                    Cabaran
                  </span>
                  {p.challenge}
                </p>
                <p className="text-sm leading-relaxed mb-5">
                  <span className="text-gray-500 text-xs uppercase tracking-wider font-semibold block mb-1">
                    Hasil
                  </span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300 font-semibold">
                    {p.result}
                  </span>
                </p>
                <a
                  href="#tempah"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/90 hover:text-purple-300 transition-colors"
                >
                  Lihat Case Study <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="text-center mt-14">
          <a
            href="/portfolio"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-400/40 transition-all font-semibold"
          >
            Lihat Portfolio Penuh <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
