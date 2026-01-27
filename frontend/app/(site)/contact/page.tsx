'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Instagram, Loader2, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        service: 'Web Design Project',
        message: ''
    });
    const [countryCode, setCountryCode] = useState('+60');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const dataToSubmit = {
                ...formData,
                phone: `${countryCode}${phoneNumber}`
            };

            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSubmit),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Something went wrong');
            }

            setIsSuccess(true);
            setFormData({ name: '', email: '', service: 'Web Design Project', message: '' });
            setPhoneNumber('');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050511] text-white pt-44 pb-20 relative overflow-hidden">
            {/* Background Vector */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[url('/vector-bg.png')] bg-cover bg-center opacity-20 mix-blend-screen" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#050511] via-transparent to-[#050511]" />
            </div>

            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
                        Let's <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Create Magic.</span>
                    </h1>
                    <p className="text-xl text-gray-300">Have a project in mind? We'd love to hear from you.</p>
                </motion.div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
                    <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 p-10 md:w-1/3 text-white flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-20"></div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-8">Contact Info</h3>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-purple-400">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <p className="text-gray-300">hello@chillocreative.com</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-purple-400">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <p className="text-gray-300">+6.011.1001.9843</p>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-purple-400 mt-1">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <p className="text-gray-300 leading-relaxed">
                                        56 Lorong Shahbandar 10<br />
                                        Bertam Perdana 3<br />
                                        13200 Kepala Batas<br />
                                        Penang, Malaysia
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="relative z-10 mt-12">
                            <p className="text-sm text-gray-400">Follow us on social media for updates and more work.</p>
                            <div className="flex gap-4 mt-4">
                                <a
                                    href="https://www.facebook.com/chillocreative"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all hover:scale-110"
                                >
                                    <Facebook className="w-5 h-5" />
                                </a>
                                <a
                                    href="https://www.instagram.com/chillocreative"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all hover:scale-110"
                                >
                                    <Instagram className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="p-10 md:w-2/3">
                        {isSuccess ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="h-full flex flex-col items-center justify-center text-center space-y-4"
                            >
                                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-4">
                                    <CheckCircle2 className="w-10 h-10" />
                                </div>
                                <h3 className="text-3xl font-bold text-white uppercase italic">Message Sent!</h3>
                                <p className="text-gray-400 max-w-sm">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                                <button
                                    onClick={() => setIsSuccess(false)}
                                    className="mt-6 px-8 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all font-bold uppercase"
                                >
                                    Send Another Message
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase">Name</label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all placeholder-gray-500 uppercase"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase">Email</label>
                                        <input
                                            required
                                            type="email"
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all placeholder-gray-500 lowercase"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase">Phone Number</label>
                                        <div className="flex gap-2">
                                            <div className="relative">
                                                <select
                                                    value={countryCode}
                                                    onChange={(e) => setCountryCode(e.target.value)}
                                                    className="h-full px-3 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
                                                >
                                                    <option value="+60">🇲🇾 +60</option>
                                                    <option value="+65">🇸🇬 +65</option>
                                                    <option value="+62">🇮🇩 +62</option>
                                                    <option value="+66">🇹🇭 +66</option>
                                                    <option value="+673">🇧🇳 +673</option>
                                                    <option value="+1">🇺🇸 +1</option>
                                                    <option value="+44">🇬🇧 +44</option>
                                                    <option value="+61">🇦🇺 +61</option>
                                                </select>
                                            </div>
                                            <input
                                                required
                                                type="tel"
                                                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all placeholder-gray-500"
                                                placeholder="123456789"
                                                value={phoneNumber}
                                                onChange={(e) => {
                                                    const value = e.target.value.replace(/\D/g, ''); // Digits only
                                                    setPhoneNumber(value);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase">Subject</label>
                                        <select
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all [&>option]:bg-gray-900"
                                            value={formData.service}
                                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                        >
                                            <option>Web Design Project</option>
                                            <option>Web Application</option>
                                            <option>Mobile App</option>
                                            <option>SEO Services</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase">Message</label>
                                    <textarea
                                        rows={5}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all placeholder-gray-500"
                                        placeholder="Tell us about your project..."
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    ></textarea>
                                </div>

                                {error && <p className="text-red-500 text-sm font-bold uppercase">{error}</p>}

                                <button
                                    disabled={isSubmitting}
                                    type="submit"
                                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all transform hover:scale-[1.02] flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed uppercase"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <span>Send Message</span>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
