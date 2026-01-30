'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Run for at least 2 seconds
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.8, ease: "easeInOut" }
                    }}
                    className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#050511]"
                >
                    <div className="relative">
                        {/* Outer Glow */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{
                                scale: [0.8, 1.1, 1],
                                opacity: [0, 0.5, 0.2],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute inset-[-40px] bg-cyan-500 rounded-full blur-[60px]"
                        />

                        {/* Logo Container */}
                        <motion.div
                            initial={{ y: 20, opacity: 0, scale: 0.9 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="relative z-10"
                        >
                            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden"
                                style={{ maskImage: 'radial-gradient(circle, black 50%, transparent 70%)', WebkitMaskImage: 'radial-gradient(circle, black 50%, transparent 70%)' }}>
                                <Image
                                    src="/logo.png"
                                    alt="Chillo Creative"
                                    fill
                                    priority
                                    className="object-contain drop-shadow-[0_0_20px_rgba(34,211,238,0.8)] mix-blend-screen contrast-[1.2]"
                                />
                            </div>
                        </motion.div>

                        {/* Loading Bar */}
                        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-48 h-1 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                className="w-full h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                            />
                        </div>

                        {/* Text */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="absolute -bottom-20 left-1/2 -translate-x-1/2 whitespace-nowrap"
                        >
                            <span className="text-xs font-black uppercase tracking-[0.4em] text-cyan-400 animate-pulse">
                                Loading Experience
                            </span>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
