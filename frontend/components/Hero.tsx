'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const Hero = () => {
    const [index, setIndex] = useState(0);
    const phrases = [
        "Pops & Sizzle.",
        "Elevates Brands.",
        "Converts Users.",
        "Dominates SEO."
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % phrases.length);
        }, 3500);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative overflow-hidden min-h-screen flex items-center justify-center bg-[#050511] text-white pt-40 md:pt-48 pb-20">
            {/* Background Gradients */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 blur-[150px] opacity-40 animate-pulse" />
                <div className="absolute top-[30%] -right-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-r from-pink-500 to-rose-500 blur-[150px] opacity-30 animate-pulse animation-delay-2000" />
                <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 blur-[150px] opacity-30 animate-pulse animation-delay-4000" />
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 bg-repeat bg-[length:50px_50px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, type: "spring" }}
                >
                    <motion.div
                        className="inline-block mb-6 relative"
                        whileHover={{ scale: 1.05 }}
                    >
                        <span className="relative z-10 py-2 px-6 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-white/10 text-sm md:text-base backdrop-blur-md flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
                            🚀 Ready to Launch Your Vision
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 blur-xl opacity-20 rounded-full" />
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold mb-8 leading-tight tracking-tight">
                        Design That <br />
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.5 }}
                                className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 drop-shadow-[0_0_15px_rgba(255,0,255,0.3)]"
                            >
                                {phrases[index]}
                            </motion.span>
                        </AnimatePresence>
                    </h1>
                    <p className="text-gray-300 text-lg md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed font-light">
                        We are Chillo Creative. We don&apos;t just build websites; we create <span className="text-white font-semibold">digital playgrounds</span> that captivate, convert, and leave a lasting impression.
                    </p>

                    <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                        <Link href="/contact" className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                            <span className="relative z-10 group-hover:text-purple-600 transition-colors">Start a Project</span>
                            <div className="absolute inset-0 bg-white" />
                        </Link>
                        <Link href="/quote" className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-bold text-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all flex items-center gap-2">
                            Request for Quotation
                            <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                                &rarr;
                            </motion.span>
                        </Link>
                        <Link href="/portfolio" className="text-white hover:text-purple-400 transition-all font-bold group flex items-center gap-2">
                            View Our Work <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
                        </Link>
                    </div>

                    {/* Scroll Indicator - Now in flow */}
                    <motion.div
                        className="mt-24 inline-flex flex-col items-center gap-2 cursor-pointer"
                        animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                    >
                        <span className="text-xs tracking-widest uppercase text-white/50">Scroll</span>
                        <div className="w-0.5 h-16 bg-gradient-to-b from-purple-500 to-transparent"></div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
