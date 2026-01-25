'use client';
import ServicesList from '@/components/ServicesList';

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-[#050511] text-white pt-44 relative overflow-hidden">
            {/* Background Vector */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[url('/vector-bg.png')] bg-cover bg-center opacity-20 mix-blend-screen" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#050511] via-transparent to-[#050511]" />
            </div>

            <div className="relative z-10 py-20 text-center container mx-auto px-4">
                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                    Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">Superpowers</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                    We don&apos;t just clear the path, we build the launchpad for your digital dominance.
                </p>
            </div>

            <div className="relative z-10">
                <ServicesList />
            </div>
        </div>
    );
}
