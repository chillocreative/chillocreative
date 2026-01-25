'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Instagram } from 'lucide-react';

export default function ContactPage() {
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
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-2">Name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all placeholder-gray-500" placeholder="John Doe" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-2">Email</label>
                                    <input type="email" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all placeholder-gray-500" placeholder="john@example.com" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-300 mb-2">Subject</label>
                                <select className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all [&>option]:bg-gray-900">
                                    <option>Web Design Project</option>
                                    <option>Web Application</option>
                                    <option>Mobile App</option>
                                    <option>SEO Services</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-300 mb-2">Message</label>
                                <textarea rows={5} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all placeholder-gray-500" placeholder="Tell us about your project..."></textarea>
                            </div>

                            <button type="submit" className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all transform hover:scale-[1.02]">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
