'use client';

import { useState, useEffect } from 'react';
import { fetchGraphQL } from '@/lib/api';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface WordPressProject {
    id: string;
    title: string;
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

export default function PortfolioPage() {
    const [wpProjects, setWpProjects] = useState<WordPressProject[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getProjects = async () => {
            try {
                // Fetch basic info first to ensure the page works even 
                // if ACF is not yet configured in GraphQL
                const data = await fetchGraphQL(`
                    query GetProjects {
                        projects(first: 100) {
                            nodes {
                                id
                                title
                                slug
                                featuredImage {
                                    node {
                                        sourceUrl
                                    }
                                }
                                portfolio {
                                    __typename
                                    # We will add clientName/category back once confirmed
                                }
                            }
                        }
                    }
                `);

                if (data?.projects?.nodes) {
                    setWpProjects(data.projects.nodes);
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setIsLoading(false);
            }
        };

        getProjects();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#050511] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050511] text-white pt-44 relative overflow-hidden">
            {/* Background Vector */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[url('/vector-bg.png')] bg-cover bg-center opacity-10 mix-blend-screen rotate-180" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#050511] via-transparent to-[#050511]" />
            </div>

            <div className="relative z-10 py-20 text-center container mx-auto px-4">
                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                    Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Masterpieces</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                    A showcase of pixels, code, and creativity coming together to build something extraordinary.
                </p>
            </div>

            <div className="container mx-auto px-4 pb-24 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {wpProjects.length > 0 ? (
                        wpProjects.map((project, index) => (
                            <Link key={project.id} href={`/portfolio/${project.slug}`}>
                                <motion.div
                                    className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_0_30px_rgba(139,92,246,0.2)] transition-all duration-500 cursor-pointer group h-full"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -10 }}
                                >
                                    <div className="h-72 overflow-hidden relative">
                                        {project.featuredImage ? (
                                            <Image
                                                src={project.featuredImage.node.sourceUrl}
                                                alt={project.title}
                                                fill
                                                unoptimized
                                                className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                                                <span className="text-gray-600">No Image</span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#050511] via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                                        {project.portfolio?.category && (
                                            <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-semibold text-white">
                                                {project.portfolio.category}
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-8 relative">
                                        <div className="flex justify-between items-end mb-2">
                                            <div>
                                                {project.portfolio?.clientName && (
                                                    <span className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2 block">{project.portfolio.clientName}</span>
                                                )}
                                                <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors uppercase tracking-tight">{project.title}</h3>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all transform group-hover:rotate-45">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" x2="17" y1="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 bg-white/5 border border-white/10 rounded-3xl">
                            <p className="text-xl text-gray-400">No projects found. Add them in WordPress to see them here!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
