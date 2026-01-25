'use client';

import { motion } from 'framer-motion';

export default function ContactPage() {
    return (
        <div className="bg-gray-50 min-h-screen py-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Let's Talk</h1>
                    <p className="text-xl text-gray-600">Have a project in mind? We'd love to hear from you.</p>
                </motion.div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
                    <div className="bg-gray-900 p-10 md:w-1/3 text-white flex flex-col justify-between">
                        <div>
                            <h3 className="text-2xl font-bold mb-6">Contact Info</h3>
                            <div className="space-y-4">
                                <p className="flex items-center gap-3">
                                    <span>📧</span> hello@chillocreative.com
                                </p>
                                <p className="flex items-center gap-3">
                                    <span>📱</span> +60 12 345 6789
                                </p>
                                <p className="flex items-center gap-3">
                                    <span>📍</span> Kuala Lumpur, Malaysia
                                </p>
                            </div>
                        </div>
                        <div className="mt-10">
                            <p className="text-sm text-gray-400">Follow us on social media for updates and more work.</p>
                        </div>
                    </div>

                    <div className="p-10 md:w-2/3">
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all" placeholder="John Doe" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                                    <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                                <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all">
                                    <option>Web Design Project</option>
                                    <option>Web Application</option>
                                    <option>Mobile App</option>
                                    <option>SEO Services</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                                <textarea rows={5} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all" placeholder="Tell us about your project..."></textarea>
                            </div>

                            <button type="submit" className="w-full py-4 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
