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
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Work</h2>
                        <p className="text-gray-600">A selection of our recent projects.</p>
                    </div>
                    <Link href="/portfolio" className="hidden md:inline-flex items-center text-purple-600 font-semibold hover:underline mt-4 md:mt-0">
                        View All Projects &rarr;
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group cursor-pointer"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="relative h-64 overflow-hidden">
                                { /* In a real app, use next/image with real paths. Using valid placeholder for now */}
                                <div className="absolute inset-0 bg-gray-200 animate-pulse" /> {/* Fallback/Loading */}
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-white font-bold border border-white px-4 py-2 rounded-full backdrop-blur-sm">View Case Study</span>
                                </div>
                            </div>
                            <div className="p-6">
                                <span className="text-sm font-medium text-purple-600 mb-2 block">{project.category}</span>
                                <h3 className="text-xl font-bold">{project.title}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link href="/portfolio" className="inline-flex items-center text-purple-600 font-semibold hover:underline">
                        View All Projects &rarr;
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PortfolioPreview;
