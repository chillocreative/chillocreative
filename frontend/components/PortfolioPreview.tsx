'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// Placeholder data - typically this would come from WordPress
const projects = [
    { id: 1, title: 'E-Commerce Redesign', category: 'Web Design', image: 'https://placehold.co/600x400/101827/FFF?text=Project+1' },
    { id: 2, title: 'FinTech App', category: 'Web Application', image: 'https://placehold.co/600x400/101827/FFF?text=Project+2' },
    { id: 3, title: 'Health & Wellness', category: 'Mobile App', image: 'https://placehold.co/600x400/101827/FFF?text=Project+3' }
];

const PortfolioPreview = () => {
    return (
        <section className="py-24 bg-[#0a0a16] text-white overflow-hidden relative">
            {/* Background Vector - Rotated for variety */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[url('/vector-bg.png')] bg-cover bg-center opacity-10 mix-blend-color-dodge transform rotate-180" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a16] via-transparent to-[#0a0a16]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">Featured Work</h2>
                        <p className="text-gray-400 text-lg">A selection of our finest digital masterpieces.</p>
                    </div>
                    <Link href="/portfolio" className="hidden md:inline-flex items-center text-white font-semibold hover:text-purple-400 transition-colors mt-4 md:mt-0 group uppercase tracking-widest text-sm">
                        View All Projects <span className="group-hover:translate-x-2 transition-transform">&rarr;</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className="bg-gray-900/50 border border-white/5 rounded-2xl overflow-hidden hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all duration-500 group cursor-pointer backdrop-blur-sm"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="relative h-72 overflow-hidden">
                                { /* In a real app, use next/image with real paths. Using valid placeholder for now */}
                                <div className="absolute inset-0 bg-gray-800 animate-pulse" /> {/* Fallback/Loading */}
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    unoptimized
                                    className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    {/* Mobile-visible gradient, desktop-hover-visible */}
                                </div>
                            </div>
                            <div className="p-8 relative">
                                <div className="absolute -top-6 right-6 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><line x1="7" x2="17" y1="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
                                </div>
                                <span className="text-xs font-bold text-purple-400 mb-2 block uppercase tracking-wider">{project.category}</span>
                                <h3 className="text-2xl font-bold group-hover:text-purple-300 transition-colors">{project.title}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Link href="/portfolio" className="inline-flex items-center text-purple-400 font-semibold hover:underline">
                        View All Projects &rarr;
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PortfolioPreview;
