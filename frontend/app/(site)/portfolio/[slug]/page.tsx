'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { fetchGraphQL } from '@/lib/api';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Calendar, User, Tag } from 'lucide-react';

interface WordPressProject {
    title: string;
    content: string;
    slug: string;
    featuredImage?: {
        node: {
            sourceUrl: string;
        };
    };
    portfolio?: {
        clientName: string;
        category: string;
    };
}

export default function SingleProjectPage() {
    const params = useParams();
    const slug = params?.slug;
    const [project, setProject] = useState<WordPressProject | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;

        const getProject = async () => {
            try {
                const data = await fetchGraphQL(`
                    query GetProjectBySlug($slug: ID!) {
                        project(id: $slug, idType: SLUG) {
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
                `, { slug });
                setProject(data.project);
            } catch (error) {
                console.error('Project Detail Fetch Error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        getProject();
    }, [slug]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#050511] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen bg-[#050511] text-white flex flex-col items-center justify-center p-4">
                <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
                <Link href="/portfolio" className="px-6 py-3 bg-white text-black rounded-xl font-bold hover:bg-purple-500 hover:text-white transition-all">
                    Back to Portfolio
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050511] text-white pt-44 relative overflow-hidden pb-20">
            {/* Background Vector */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[url('/vector-bg.png')] bg-cover bg-center opacity-10 mix-blend-screen" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#050511] via-transparent to-[#050511]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Link href="/portfolio" className="inline-flex items-center gap-2 text-blue-400 hover:text-white transition-colors mb-12 group text-sm font-bold uppercase tracking-widest">
                        <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                        Back to Portfolio
                    </Link>

                    <div className="max-w-5xl mx-auto">
                        <h1 className="text-5xl md:text-8xl font-black mb-12 leading-tight tracking-tighter uppercase italic">
                            {project.title}
                        </h1>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16 py-8 border-y border-white/10">
                            {project.portfolio?.clientName && (
                                <div className="space-y-1">
                                    <p className="text-[10px] uppercase tracking-widest text-gray-500 font-black flex items-center gap-2">
                                        <User className="w-3 h-3" /> Client
                                    </p>
                                    <p className="text-lg font-bold">{project.portfolio.clientName}</p>
                                </div>
                            )}
                            {project.portfolio?.category && (
                                <div className="space-y-1">
                                    <p className="text-[10px] uppercase tracking-widest text-gray-500 font-black flex items-center gap-2">
                                        <Tag className="w-3 h-3" /> Category
                                    </p>
                                    <p className="text-lg font-bold">{project.portfolio.category}</p>
                                </div>
                            )}
                            <div className="space-y-1">
                                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-black flex items-center gap-2">
                                    <Calendar className="w-3 h-3" /> Year
                                </p>
                                <p className="text-lg font-bold">{new Date().getFullYear()}</p>
                            </div>
                        </div>

                        {project.featuredImage && (
                            <div className="relative w-full aspect-video rounded-[3rem] overflow-hidden mb-20 shadow-2xl group border border-white/5">
                                <Image
                                    src={project.featuredImage.node.sourceUrl}
                                    alt={project.title}
                                    fill
                                    unoptimized
                                    className="object-cover transform group-hover:scale-105 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050511]/40 to-transparent" />
                            </div>
                        )}

                        <div className="max-w-3xl mx-auto">
                            <div
                                className="wp-content prose prose-invert prose-blue max-w-none text-xl"
                                dangerouslySetInnerHTML={{ __html: project.content }}
                            />

                            <div className="mt-20 pt-10 border-t border-white/10 text-center">
                                <h2 className="text-3xl font-black mb-8 italic uppercase tracking-tighter">Like what you see?</h2>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-4 px-10 py-5 bg-white text-black rounded-2xl font-black hover:bg-purple-600 hover:text-white transition-all transform hover:scale-105"
                                >
                                    Let&apos;s Build Your Project
                                    <ExternalLink className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
