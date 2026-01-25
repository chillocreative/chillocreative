'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="relative overflow-hidden min-h-[90vh] flex items-center justify-center bg-gray-900 text-white">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
                <div className="absolute -top-[50%] -left-[20%] w-[80%] h-[80%] rounded-full bg-purple-700 blur-[120px] mix-blend-screen animate-blob" />
                <div className="absolute top-[20%] -right-[20%] w-[70%] h-[70%] rounded-full bg-blue-600 blur-[120px] mix-blend-screen animate-blob animation-delay-2000" />
                <div className="absolute -bottom-[40%] left-[20%] w-[70%] h-[70%] rounded-full bg-teal-500 blur-[120px] mix-blend-screen animate-blob animation-delay-4000" />
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-sm md:text-base mb-6 backdrop-blur-md">
                        🚀 Elevate Your Digital Presence
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight tracking-tight">
                        We Craft <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400">Digital Magic</span>
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                        Chillo Creative is a full-service digital agency. We specialize in high-end web design, powerful web applications, and strategic digital growth.
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <Link href="/contact" className="px-8 py-4 bg-white text-gray-900 rounded-full font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg shadow-white/10">
                            Start a Project
                        </Link>
                        <Link href="/portfolio" className="px-8 py-4 bg-transparent border border-white/30 text-white rounded-full font-bold hover:bg-white/10 transition-all backdrop-blur-sm">
                            View Our Work
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
