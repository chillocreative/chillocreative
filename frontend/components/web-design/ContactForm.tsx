'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

// TODO: Replace with live WhatsApp number if different
const WA_NUMBER = '601110019843';

const trackCta = (label: string, location: string) => {
  if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', 'cta_click', { cta_label: label, location });
  }
};

const buildWhatsAppUrl = (data: {
  name: string;
  email: string;
  phone: string;
  website: string;
  message: string;
}) => {
  const lines = [
    'Halo Chillo Creative! Saya nak tempah konsultasi reka website.',
    '',
    `Nama: ${data.name}`,
    `Email: ${data.email}`,
    `No. WhatsApp: ${data.phone}`,
    data.website ? `Website Semasa: ${data.website}` : null,
    '',
    data.message ? `Keperluan:\n${data.message}` : null,
  ].filter(Boolean);

  const text = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${WA_NUMBER}?text=${text}`;
};

const ContactForm = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackCta('Form Submit', 'final-cta');
    const url = buildWhatsAppUrl(data);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 space-y-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
            Nama
          </label>
          <input
            required
            type="text"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
            placeholder="Nama penuh"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
            Email
          </label>
          <input
            required
            type="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
            placeholder="anda@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
            No. WhatsApp
          </label>
          <input
            required
            type="tel"
            value={data.phone}
            onChange={(e) => {
              const v = e.target.value.replace(/[^\d+]/g, '');
              setData({ ...data, phone: v });
            }}
            className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
            placeholder="+60123456789"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
            Website Semasa <span className="text-gray-500 normal-case">(jika ada)</span>
          </label>
          <input
            type="url"
            value={data.website}
            onChange={(e) => setData({ ...data, website: e.target.value })}
            className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
            placeholder="https://..."
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
          Apa Yang Anda Perlukan?
        </label>
        <textarea
          rows={4}
          value={data.message}
          onChange={(e) => setData({ ...data, message: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none"
          placeholder="Ceritakan sedikit tentang projek anda..."
        />
      </div>

      <button
        type="submit"
        className="w-full py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
      >
        <Send className="w-5 h-5" />
        Hantar Sekarang
      </button>

      <p className="text-xs text-center text-gray-500">
        Butang di atas akan buka WhatsApp dengan maklumat anda. Kami balas dalam 24 jam.
      </p>
    </form>
  );
};

export default ContactForm;
