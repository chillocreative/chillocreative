'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { fetchGraphQL } from '@/lib/api';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';

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

export default function SingleServicePage() {
    const params = useParams();
    const slug = params?.slug;
    const [service, setService] = useState<WordPressService | null>(null);
    const [otherServices, setOtherServices] = useState<WordPressService[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;

        const getServiceData = async () => {
            try {
                const data = await fetchGraphQL(`
                    query GetServiceAndAll($slug: ID!) {
                        service(id: $slug, idType: SLUG) {
                            title
                            content
                            slug
                            featuredImage {
                                node {
                                    sourceUrl
                                }
                            }
                        }
                        services(first: 20) {
                            nodes {
                                title
                                slug
                            }
                        }
                    }
                `, { slug });
                setService(data.service);
                setOtherServices(data.services.nodes);
            } catch (error) {
                console.error('Error fetching service data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        getServiceData();
    }, [slug]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#050511] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    if (!service) {
        return (
            <div className="min-h-screen bg-[#050511] text-white flex flex-col items-center justify-center p-4">
                <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
                <p className="text-gray-400 mb-8 text-center">Sorry, the service you are looking for doesn&apos;t exist or has been moved.</p>
                <Link href="/services" className="px-6 py-3 bg-white text-black rounded-xl font-bold hover:bg-purple-500 hover:text-white transition-all">
                    Back to Services
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050511] text-white pt-44 relative overflow-hidden">
            {/* Background Vector */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[url('/vector-bg.png')] bg-cover bg-center opacity-10 mix-blend-screen" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#050511] via-transparent to-[#050511]" />
            </div>

            <div className="container mx-auto px-4 relative z-10 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link href="/services" className="inline-flex items-center gap-2 text-purple-400 hover:text-white transition-colors mb-12 group text-sm font-bold uppercase tracking-widest">
                        <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                        Back to Services
                    </Link>

                    <h1 className="text-5xl md:text-7xl font-black mb-12 leading-tight">
                        {service.title}
                    </h1>

                    {service.featuredImage && (
                        <div className="relative w-full h-[400px] md:h-[500px] rounded-[3rem] overflow-hidden mb-16 shadow-2xl border border-white/10">
                            <Image
                                src={service.featuredImage.node.sourceUrl}
                                alt={service.title}
                                fill
                                unoptimized
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050511] via-transparent to-transparent opacity-60" />
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        <div className="lg:col-span-2">
                            <div
                                className="wp-content max-w-none text-xl text-gray-300 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: service.content }}
                            />
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] sticky top-36 space-y-8">
                                <div>
                                    <h3 className="text-2xl font-bold mb-6 italic">Ready to transform your digital presence?</h3>
                                    <p className="text-gray-400 mb-8">Let&apos;s build something extraordinary together.</p>
                                    <Link
                                        href={`/contact?subject=${encodeURIComponent(service.title)}`}
                                        className="flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all transform hover:scale-[1.02] mb-4"
                                    >
                                        Start Project
                                        <Send className="w-4 h-4" />
                                    </Link>
                                    <Link
                                        href="/quote"
                                        className="flex items-center justify-center gap-3 w-full py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold hover:bg-white/10 transition-all transform hover:scale-[1.02]"
                                    >
                                        Request for Quotation
                                    </Link>
                                </div>

                                <div className="pt-8 border-t border-white/10">
                                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-6">Our Services</h4>
                                    <div className="flex flex-col gap-4">
                                        {otherServices.filter(s => s.slug !== slug).map((s) => (
                                            <Link
                                                key={s.slug}
                                                href={`/services/${s.slug}`}
                                                className="text-gray-300 hover:text-purple-400 transition-colors font-bold text-sm"
                                            >
                                                {s.title}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
