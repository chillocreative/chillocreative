'use client';

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const pathname = usePathname();

    // Toggle visibility based on scroll position
    useEffect(() => {
        const toggleVisibility = () => {
            // Check window scroll and nested scroll containers
            const scrolledHeight = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

            // Also check if any element with overflow is scrolled (like Admin Panel)
            const adminContainer = document.querySelector('.overflow-y-auto');
            const adminScroll = adminContainer ? adminContainer.scrollTop : 0;

            if (scrolledHeight > 300 || adminScroll > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        // Use capture phase to catch scrolls in nested elements
        window.addEventListener('scroll', toggleVisibility, true);
        return () => window.removeEventListener('scroll', toggleVisibility, true);
    }, []);

    const scrollToTop = () => {
        // Scroll the window
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });

        // Scroll the admin container if it exists
        const adminContainer = document.querySelector('.overflow-y-auto');
        if (adminContainer) {
            adminContainer.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    };

    // Don't show on the /quote page
    if (pathname === '/quote') return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToTop}
                    className="fixed bottom-10 right-6 md:bottom-32 md:right-10 z-[999] p-3 md:p-4 bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500 text-white rounded-xl md:rounded-2xl shadow-[0_10px_40px_-10px_rgba(79,70,229,0.5)] hover:shadow-[0_20px_50px_-10px_rgba(79,70,229,0.7)] transition-all border border-white/20 group backdrop-blur-md"
                >
                    <ChevronUp size={24} strokeWidth={3} className="group-hover:animate-bounce w-5 h-5 md:w-6 md:h-6" />

                    {/* Pulsing ring effect */}
                    <span className="absolute inset-0 rounded-xl md:rounded-2xl bg-purple-500 animate-ping opacity-20 group-hover:opacity-40 transition-opacity"></span>

                    {/* Tooltip for desktop */}
                    <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-900/90 text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-lg opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 whitespace-nowrap border border-white/10 pointer-events-none backdrop-blur-sm shadow-xl hidden md:block">
                        Launch to Top
                    </span>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
