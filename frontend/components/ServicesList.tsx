'use client';

import { useState, useEffect } from 'react';
import { fetchGraphQL } from '@/lib/api';
import * as LucideIcons from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

import Image from 'next/image';

interface WordPressService {
    title: string;
    content: string;
    slug: string;
    featuredImage?: {
        node: {
            sourceUrl: string;
        };
    };
}

const ServicesList = () => {
    const [wpServices, setWpServices] = useState<WordPressService[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getServices = async () => {
            try {
                const data = await fetchGraphQL(`
                    query GetServices {
                        services {
                            nodes {
                                title
                                content
                                slug
                                featuredImage {
                                    node {
                                        sourceUrl
                                    }
                                }
                            }
                        }
                    }
                `);
                setWpServices(data.services.nodes);
            } catch (error) {
                console.error('Error fetching services:', error);
            } finally {
                setIsLoading(false);
            }
        };

        getServices();
    }, []);

    const getIcon = (title: string) => {
        const lowerTitle = title.toLowerCase();
        if (lowerTitle.includes('design')) return <LucideIcons.Palette size={24} />;
        if (lowerTitle.includes('app') || lowerTitle.includes('system')) return <LucideIcons.LayoutGrid size={24} />;
        if (lowerTitle.includes('mobile')) return <LucideIcons.Smartphone size={24} />;
        if (lowerTitle.includes('seo')) return <LucideIcons.Search size={24} />;
        return <LucideIcons.Box size={24} />;
    };

    // Card colors mapping for "fun" look
    const cardColors = [
        "from-purple-500/20 to-blue-500/20 border-purple-500/30",
        "from-pink-500/20 to-rose-500/20 border-pink-500/30",
        "from-orange-500/20 to-amber-500/20 border-orange-500/30",
        "from-cyan-500/20 to-teal-500/20 border-cyan-500/30",
    ];

    if (isLoading) {
        return (
            <div className="flex justify-center py-24">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    return (
        <section className="py-24 bg-[#050511] text-white relative overflow-hidden">
            {/* Background Vector */}
            <div className="absolute inset-0 z-0 text-white">
                <div className="absolute inset-0 bg-[url('/vector-bg.png')] bg-cover bg-center opacity-20 mix-blend-screen" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#050511] via-transparent to-[#050511]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-7xl mx-auto">
                    {wpServices.length > 0 ? (
                        wpServices.map((service, index) => (
                            <motion.div
                                key={service.slug}
                                className={`flex flex-col sm:flex-row rounded-[2rem] bg-gradient-to-br ${cardColors[index % cardColors.length]} border border-white/10 backdrop-blur-md overflow-hidden transition-all duration-500 group shadow-2xl hover:shadow-purple-500/10 h-full`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: (index % 2) * 0.1 }}
                            >
                                {/* Left Section: Featured Image (Smaller fixed width on desktop) */}
                                <div className="sm:w-40 xl:w-48 h-48 sm:h-auto relative overflow-hidden shrink-0">
                                    {service.featuredImage ? (
                                        <Image
                                            src={service.featuredImage.node.sourceUrl}
                                            alt={service.title}
                                            fill
                                            unoptimized
                                            className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-white/5 flex items-center justify-center">
                                            <LucideIcons.Image className="w-8 h-8 text-white/20" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent opacity-60" />
                                </div>

                                {/* Right Section: Text & CTA */}
                                <div className="flex-grow p-8 flex flex-col justify-center min-w-0">
                                    <h3 className="text-xl md:text-2xl font-black mb-6 text-white leading-tight truncate group-hover:text-transparent bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-300 transition-all duration-300">
                                        {service.title}
                                    </h3>

                                    <div>
                                        <Link
                                            href={`/services/${service.slug}`}
                                            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white group-hover:text-purple-400 transition-colors py-2 border-b-2 border-white/10 group-hover:border-purple-500/50"
                                        >
                                            Explore Details
                                            <LucideIcons.ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 bg-white/5 border border-white/10 rounded-3xl">
                            <p className="text-xl text-gray-400">No services found. Add them in WordPress to see them here!</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ServicesList;
