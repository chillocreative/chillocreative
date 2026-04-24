'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import ContactForm from './ContactForm';

const FinalCTA = () => {
  return (
    <section
      id="tempah"
      className="relative overflow-hidden text-white py-24 md:py-32 bg-gradient-to-br from-[#1a0b3d] via-[#2a0a4a] to-[#3d0b3d]"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[30%] -left-[10%] w-[60%] h-[80%] rounded-full bg-purple-600/30 blur-[180px]" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[80%] rounded-full bg-pink-600/30 blur-[180px]" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.07] bg-repeat bg-[length:50px_50px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Bersedia Untuk Website Yang{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300">
                Betul-Betul Berfungsi?
              </span>
            </h2>
            <p className="text-gray-200 text-lg leading-relaxed mb-8">
              Tempah panggilan discovery 30 minit yang percuma. Kami akan semak website sedia ada
              anda, kenal pasti peluang cepat, dan tunjuk dengan tepat bagaimana kami boleh bantu.
              Tiada tekanan, tiada hard-sell.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center mb-8">
              <a
                href="https://wa.me/601110019843"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp: +6011 1001 9843
              </a>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-300">
              <div>
                <div className="text-2xl font-bold text-white">24 jam</div>
                <div className="text-xs text-gray-400">Kami balas dalam</div>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div>
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-xs text-gray-400">Jaminan Kepuasan</div>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div>
                <div className="text-2xl font-bold text-white">50+</div>
                <div className="text-xs text-gray-400">PKS dipercayai</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
