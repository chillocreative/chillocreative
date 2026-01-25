'use client';

import { services } from '@/data/services';
import * as LucideIcons from 'lucide-react';
import { motion } from 'framer-motion';

const ServicesList = () => {
    // Helper to get icon safely
    const getIcon = (iconName: string) => {
        // @ts-ignore - Dynamic access to library
        const Icon = LucideIcons[iconName];
        return Icon ? <Icon size={32} /> : <LucideIcons.Box size={32} />;
    };

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Services</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">We offer a comprehensive range of digital services to help your business grow.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            className="p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all border border-gray-100 group"
                            whileHover={{ y: -10 }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="text-purple-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                                {getIcon(service.iconName)}
                            </div>
                            <h3 className="text-xl font-bold mb-3 group-hover:text-purple-600 transition-colors">{service.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{service.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesList;
