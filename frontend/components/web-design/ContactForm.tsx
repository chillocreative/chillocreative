'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2, Send } from 'lucide-react';

const trackCta = (label: string, location: string) => {
  if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', 'cta_click', { cta_label: label, location });
  }
};

const ContactForm = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone.replace(/\+/g, ''),
          service: 'Web Design — Landing Page',
          message: [
            data.website ? `Website sedia ada: ${data.website}` : null,
            data.message ? `Nota: ${data.message}` : null,
          ]
            .filter(Boolean)
            .join('\n'),
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Gagal menghantar. Sila cuba lagi.');
      }

      trackCta('Form Submit', 'final-cta');
      setSuccess(true);
      setData({ name: '', email: '', phone: '', website: '', message: '' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Ralat tidak dijangka.';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-10 text-center"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-400 mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold mb-2 text-white">Terima kasih!</h3>
        <p className="text-gray-300 mb-6">
          Kami terima tempahan anda. Team kami akan hubungi dalam 24 jam.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors"
        >
          Hantar Satu Lagi
        </button>
      </motion.div>
    );
  }

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

      {error && (
        <p className="text-red-400 text-sm font-semibold">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {submitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Menghantar...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Tempah Panggilan Percuma
          </>
        )}
      </button>

      <p className="text-xs text-center text-gray-500">
        Kami balas dalam 24 jam. Tiada spam, tiada jualan paksa.
      </p>
    </form>
  );
};

export default ContactForm;
