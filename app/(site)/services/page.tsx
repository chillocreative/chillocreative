'use client';
import ServicesList from '@/components/ServicesList';

export default function ServicesPage() {
    return (
        <div className="pt-20">
            <div className="bg-gray-900 text-white py-20 text-center">
                <h1 className="text-5xl font-bold mb-4">Our Services</h1>
                <p className="text-xl text-gray-400">Expert solutions tailored to your business needs.</p>
            </div>
            <ServicesList />
        </div>
    );
}
