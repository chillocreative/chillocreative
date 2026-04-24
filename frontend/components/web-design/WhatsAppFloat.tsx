'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

// TODO: Replace with live WhatsApp number if different
const WA_NUMBER = '601110019843';

const WhatsAppFloat = () => {
  return (
    <motion.a
      href={`https://wa.me/${WA_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hubungi kami melalui WhatsApp"
      initial={{ opacity: 0, scale: 0.6, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.2, type: 'spring', stiffness: 200, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-[0_10px_40px_-10px_rgba(34,197,94,0.7)]"
    >
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30" />
      <MessageCircle className="relative w-7 h-7 md:w-8 md:h-8" />
    </motion.a>
  );
};

export default WhatsAppFloat;
