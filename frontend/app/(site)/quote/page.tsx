'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User,
    Mail,
    Phone,
    ArrowRight,
    CheckCircle2,
    Download,
    FileText,
    Cpu,
    Layout,
    ShoppingBag,
    Smartphone,
    Circle,
    CheckCircle,
    Loader2,
    Globe,
    Zap,
    Shield,
    BarChart,
    Search,
    Palette,
    Brain
} from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const services = [
    {
        id: 'web-design',
        name: 'Landing Page / One-Page',
        basePrice: 1800,
        icon: Zap,
        desc: 'Single-page high-conversion landing pages for marketing campaigns.'
    },
    {
        id: 'business-site',
        name: 'Corporate / Business Website',
        basePrice: 4500,
        icon: Layout,
        desc: 'Multi-page professional websites for established businesses.'
    },
    {
        id: 'e-commerce',
        name: 'E-commerce Store',
        basePrice: 8500,
        icon: ShoppingBag,
        desc: 'Full online store with payment gateway and inventory system.'
    },
    {
        id: 'custom-app',
        name: 'Custom Web Application',
        basePrice: 25000,
        icon: Cpu,
        desc: 'Complex software-as-a-service (SaaS) or enterprise portals.'
    },
    {
        id: 'mobile-app',
        name: 'Mobile App (iOS/Android)',
        basePrice: 20000,
        icon: Smartphone,
        desc: 'Native or Cross-platform mobile applications for App Store/Play Store.'
    },
    {
        id: 'seo-marketing',
        name: 'SEO & Performance Marketing',
        basePrice: 2500,
        icon: Search,
        desc: 'Comprehensive search engine optimization and digital strategy.'
    },
    {
        id: 'branding',
        name: 'Brand Identity & Design',
        basePrice: 3500,
        icon: Palette,
        desc: 'Logo, brand guidelines, and complete visual identity systems.'
    },
    {
        id: 'ai-training',
        name: 'AI Training Course',
        basePrice: 2000,
        icon: Brain,
        desc: 'Specialized training sessions for your team to master AI productivity tools.'
    },
];

const featuresConfig: Record<string, { id: string, name: string, price: number }[]> = {
    'web-design': [
        { id: 'seo-basic', name: 'SEO Foundation & Analytics', price: 800 },
        { id: 'copy', name: 'High-Converting Copywriting', price: 1200 },
        { id: 'chat', name: 'WhatsApp / Live Chat Integration', price: 500 },
        { id: 'speed', name: 'Performance Optimization', price: 800 }
    ],
    'business-site': [
        { id: 'seo-adv', name: 'Advanced SEO & Google Ranking', price: 2500 },
        { id: 'booking', name: 'Online Booking/Appointment System', price: 1800 },
        { id: 'multi-lang', name: 'Multi-language Support (EN/BM/CN)', price: 1500 },
        { id: 'blog', name: 'Content Management (Blog/News)', price: 800 }
    ],
    'e-commerce': [
        { id: 'gateway', name: 'Multi-gateway Payment (Stripe/PayPal)', price: 1500 },
        { id: 'shipping', name: 'Shipping & Tax API Integration', price: 1200 },
        { id: 'pos', name: 'POS & Offline Inventory Sync', price: 3500 },
        { id: 'loyalty', name: 'Membership & Loyalty System', price: 2000 }
    ],
    'custom-app': [
        { id: 'api', name: 'Third-party API Integration', price: 3000 },
        { id: 'realtime', name: 'Real-time Dashboards & WebSockets', price: 4500 },
        { id: 'hosting', name: 'Dedicated Cloud Infrastructure', price: 5000 },
        { id: 'security', name: 'Advanced Security & Encryption', price: 3500 }
    ],
    'mobile-app': [
        { id: 'push', name: 'Smart Push Notifications', price: 2000 },
        { id: 'social-login', name: 'Social Login / Firebase Auth', price: 1500 },
        { id: 'geo', name: 'Geolocation / Maps Tracking', price: 2500 },
        { id: 'offline', name: 'Offline Data Support', price: 3000 }
    ],
    'seo-marketing': [
        { id: 'local-seo', name: 'Local GMB Optimization', price: 1200 },
        { id: 'backlinks', name: 'Premium Backlink Strategy', price: 3000 },
        { id: 'ads', name: 'Meta / Google Ads Management', price: 2500 },
        { id: 'audit', name: 'Deep Technical Website Audit', price: 1500 }
    ],
    'branding': [
        { id: 'guidelines', name: 'Detailed Brand Style Guide', price: 1500 },
        { id: 'social-kit', name: 'Social Media Branding Kit', price: 1000 },
        { id: 'static', name: 'Business Card & Stationery', price: 800 },
        { id: 'motion', name: 'Brand Motion / Logo Intro', price: 2000 }
    ],
    'ai-training': [
        { id: 'prompt-eng', name: 'Advanced Prompt Engineering', price: 1000 },
        { id: 'ai-workflow', name: 'AI Workflow Automation', price: 1500 },
        { id: 'ai-tools', name: 'Custom AI Tool Selection', price: 800 }
    ],
    'default': [
        { id: 'maintenance', name: 'Priority Support & Maintenance', price: 500 },
        { id: 'domain', name: 'Domain & Premium Hosting', price: 800 }
    ]
};

export default function QuotePage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
    const [projectDescription, setProjectDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [quoteGenerated, setQuoteGenerated] = useState(false);
    const [finalLeadId, setFinalLeadId] = useState<number | null>(null);

    // Scroll to top when step changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [step]);

    const toggleFeature = (id: string) => {
        setSelectedFeatures(prev =>
            prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
        );
    };

    const calculateTotal = () => {
        const service = services.find(s => s.id === selectedService);
        const servicePrice = service ? service.basePrice : 0;

        const activeFeatures = [
            ...(featuresConfig[selectedService || ''] || []),
            ...(featuresConfig['default'] || [])
        ];

        const featuresPrice = selectedFeatures.reduce((acc, featId) => {
            const feature = activeFeatures.find(f => f.id === featId);
            return acc + (feature ? feature.price : 0);
        }, 0);
        return servicePrice + featuresPrice;
    };

    const handleLeadSubmit = async () => {
        if (!formData.name || !formData.email || !formData.phone) return;
        setStep(2);

        // Proactively send early lead to CRM
        try {
            await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    service: 'Quote Initiated',
                    message: 'User is calculating an instant quote.'
                }),
            });
        } catch (e) {
            console.error('Failed to capture early lead', e);
        }
    };

    const generatePDF = () => {
        const doc = new jsPDF() as any;
        const total = calculateTotal();
        const service = services.find(s => s.id === selectedService);
        const quoteNo = `CQ-${String(finalLeadId || 1).padStart(4, '0')}`;

        const activeFeatures = [
            ...(featuresConfig[selectedService || ''] || []),
            ...(featuresConfig['default'] || [])
        ];

        // Brand Color Scheme
        const BRAND_PURPLE: [number, number, number] = [147, 51, 234]; // #9333ea
        const TEXT_DARK: [number, number, number] = [31, 41, 55];
        const TEXT_LIGHT: [number, number, number] = [107, 114, 128];

        // 1. Sidebar/Header Branding
        doc.setFillColor(BRAND_PURPLE[0], BRAND_PURPLE[1], BRAND_PURPLE[2]);
        doc.rect(0, 0, 210, 45, 'F');

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(26);
        doc.setFont(undefined, 'bold');
        doc.text('CHILLO CREATIVE', 15, 20);

        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.text('BY CH GLOBAL EMPIRE (003124386-V)', 15, 27);

        doc.setFontSize(9);
        doc.text('56 Lorong Shahbandar 10, Bertam Perdana 3', 130, 15);
        doc.text('13200 Kepala Batas, Penang, Malaysia', 130, 20);
        doc.text('Phone: +6.011.1001.9843', 130, 25);
        doc.text('E: hello@chillocreative.com', 130, 30);
        doc.text('W: www.chillocreative.com', 130, 35);

        // 2. Title & Meta Data
        doc.setTextColor(TEXT_DARK[0], TEXT_DARK[1], TEXT_DARK[2]);
        doc.setFontSize(22);
        doc.setFont(undefined, 'bold');
        doc.text('QUOTATION', 15, 65);

        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(TEXT_LIGHT[0], TEXT_LIGHT[1], TEXT_LIGHT[2]);
        doc.text(`Quotation No: ${quoteNo}`, 15, 72);
        doc.text(`Date Issued: ${new Date().toLocaleDateString('en-MY', { day: 'numeric', month: 'long', year: 'numeric' })}`, 15, 77);
        doc.text(`Valid For: 30 Days`, 15, 82);

        // 3. Client Details (Box Styling)
        doc.setFillColor(249, 250, 251);
        doc.rect(120, 55, 75, 35, 'F');
        doc.setDrawColor(229, 231, 235);
        doc.rect(120, 55, 75, 35, 'S');

        doc.setTextColor(TEXT_DARK[0], TEXT_DARK[1], TEXT_DARK[2]);
        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.text('PREPARED FOR:', 125, 62);
        doc.setFont(undefined, 'normal');
        doc.text(formData.name.toUpperCase(), 125, 69);
        doc.setFontSize(9);
        doc.setTextColor(TEXT_LIGHT[0], TEXT_LIGHT[1], TEXT_LIGHT[2]);
        doc.text(formData.email, 125, 75);
        doc.text(formData.phone, 125, 81);

        // 4. Quotation Table
        const tableData = [
            [
                { content: service?.name || 'Base Service Package', styles: { fontStyle: 'bold' as const } },
                '1',
                `RM ${service?.basePrice?.toLocaleString() || 0}`
            ],
            ...selectedFeatures.map(fid => {
                const feat = activeFeatures.find(f => f.id === fid);
                return [
                    feat?.name || '',
                    '1',
                    `RM ${feat?.price?.toLocaleString() || 0}`
                ];
            })
        ];

        autoTable(doc, {
            startY: 100,
            head: [['DESCRIPTION', 'QTY', 'PRICE (RM)']],
            body: tableData,
            theme: 'grid',
            headStyles: {
                fillColor: BRAND_PURPLE,
                fontSize: 10,
                cellPadding: 4
            },
            bodyStyles: {
                fontSize: 9,
                cellPadding: 4,
                textColor: TEXT_DARK
            },
            columnStyles: {
                0: { cellWidth: 120 },
                1: { halign: 'center' },
                2: { halign: 'right' }
            }
        });

        // 5. Calculations
        const finalY = (doc as any).lastAutoTable.finalY + 10;

        doc.setFontSize(10);
        doc.setTextColor(TEXT_LIGHT[0], TEXT_LIGHT[1], TEXT_LIGHT[2]);
        doc.text('Subtotal:', 165, finalY, { align: 'right' });
        doc.text(`RM ${total.toLocaleString()}`, 195, finalY, { align: 'right' });

        doc.text('Tax (0%):', 165, finalY + 7, { align: 'right' });
        doc.text('RM 0.00', 195, finalY + 7, { align: 'right' });

        // Divider Line
        doc.setDrawColor(BRAND_PURPLE[0], BRAND_PURPLE[1], BRAND_PURPLE[2]);
        doc.setLineWidth(0.5);
        doc.line(140, finalY + 12, 195, finalY + 12);

        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(BRAND_PURPLE[0], BRAND_PURPLE[1], BRAND_PURPLE[2]);
        doc.text('TOTAL:', 165, finalY + 20, { align: 'right' });
        doc.text(`RM ${total.toLocaleString()}`, 195, finalY + 20, { align: 'right' });

        // 6. Footer & Terms
        const pageHeight = doc.internal.pageSize.height;

        doc.setDrawColor(229, 231, 235);
        doc.line(15, pageHeight - 50, 195, pageHeight - 50);

        doc.setFontSize(10);
        doc.setTextColor(TEXT_DARK[0], TEXT_DARK[1], TEXT_DARK[2]);
        doc.text('Terms & Conditions:', 15, pageHeight - 40);

        doc.setFontSize(8);
        doc.setTextColor(TEXT_LIGHT[0], TEXT_LIGHT[1], TEXT_LIGHT[2]);
        doc.text('1. Payment: will be discussed further.', 15, pageHeight - 34);
        doc.text('2. This is a system-generated estimate based on your selections.', 15, pageHeight - 30);
        doc.text('3. Full ownership of assets is transferred upon final payment.', 15, pageHeight - 26);

        doc.setFontSize(12);
        doc.setFont(undefined, 'italic');
        doc.setTextColor(BRAND_PURPLE[0], BRAND_PURPLE[1], BRAND_PURPLE[2]);
        doc.text('Looking forward to creating magic with you!', 105, pageHeight - 15, { align: 'center' });

        doc.save(`CHILLO_QUOTE_${formData.name.replace(/\s/g, '_').toUpperCase()}.pdf`);
    };

    const handleFinalSubmit = async () => {
        setIsSubmitting(true);
        const total = calculateTotal();
        const service = services.find(s => s.id === selectedService);
        const activeFeatures = [
            ...(featuresConfig[selectedService || ''] || []),
            ...(featuresConfig['default'] || [])
        ];

        // Prepare structured items for backend quotation
        const items = [
            { description: service?.name || 'Selected Service', amount: service?.basePrice || 0 },
            ...selectedFeatures.map(fid => {
                const feat = activeFeatures.find(f => f.id === fid);
                return { description: feat?.name || 'Extra Feature', amount: feat?.price || 0 };
            })
        ];

        try {
            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    service: service?.name || 'Custom Quote',
                    message: `[AI ANALYZED QUOTE] Total: RM ${total}. \nClient Description: ${projectDescription}`,
                    quotationDetails: {
                        total,
                        items
                    }
                }),
            });
            const data = await response.json();
            if (data.lead?.id) {
                console.log('Quotation Generated with ID:', data.lead.id);
                setFinalLeadId(data.lead.id);
            }
            setQuoteGenerated(true);
            setStep(5);
        } catch (e) {
            alert('Error saving quote. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050511] text-white pt-44 pb-20 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 max-w-4xl relative z-10">
                <div className="text-center mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold mb-4"
                    >
                        Get Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 italic">Instant Quote</span>
                    </motion.h1>
                    <p className="text-gray-400">Our Smart Engine will help you estimate your project costs in seconds.</p>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden min-h-[500px] flex flex-col">
                    {/* Progress Bar */}
                    <div className="w-full h-1 bg-white/5 flex">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div
                                key={i}
                                className={`flex-1 transition-all duration-500 ${step >= i ? 'bg-gradient-to-r from-purple-500 to-pink-500' : ''}`}
                            />
                        ))}
                    </div>

                    <div className="flex-1 p-8 flex flex-col items-center justify-center">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="w-full max-w-md space-y-6 text-center"
                                >
                                    <div className="w-20 h-20 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <User className="w-10 h-10 text-purple-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold uppercase italic">Tell us about you</h3>
                                    <div className="space-y-4">
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                                placeholder="Your Name"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                                placeholder="Email Address"
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-purple-500 transition-all font-bold"
                                                placeholder="+60123456789"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/[^\d+]/g, '') })}
                                            />
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleLeadSubmit}
                                        disabled={!formData.name || !formData.email || !formData.phone}
                                        className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold uppercase hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        Continue <ArrowRight className="w-5 h-5" />
                                    </button>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="w-full space-y-8"
                                >
                                    <div className="text-center">
                                        <h3 className="text-2xl font-bold uppercase italic mb-2">Select Your Project Type</h3>
                                        <p className="text-gray-400">Choose the service that best describes your needs.</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {services.map((s) => {
                                            const Icon = s.icon;
                                            return (
                                                <button
                                                    key={s.id}
                                                    onClick={() => setSelectedService(s.id)}
                                                    className={`p-6 rounded-2xl border text-left transition-all ${selectedService === s.id
                                                        ? 'bg-purple-600/20 border-purple-500'
                                                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                                                        }`}
                                                >
                                                    <div className="flex items-start justify-between mb-4">
                                                        <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                                                            <Icon className="w-6 h-6 text-purple-400" />
                                                        </div>
                                                        {selectedService === s.id && <CheckCircle2 className="w-6 h-6 text-purple-500" />}
                                                    </div>
                                                    <h4 className="font-bold text-lg mb-1">{s.name}</h4>
                                                    <p className="text-sm text-gray-400 mb-4">{s.desc}</p>
                                                    <p className="text-purple-400 font-bold uppercase text-xs">Starts from RM {s.basePrice.toLocaleString()}</p>
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <div className="flex gap-4">
                                        <button onClick={() => setStep(1)} className="flex-1 py-4 border border-white/10 rounded-xl font-bold uppercase hover:bg-white/5 transition-all">Back</button>
                                        <button
                                            onClick={() => setStep(3)}
                                            disabled={!selectedService}
                                            className="flex-2 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold uppercase px-12 transition-all disabled:opacity-50"
                                        >
                                            Next Step
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="w-full space-y-8"
                                >
                                    <div className="text-center">
                                        <h3 className="text-2xl font-bold uppercase italic mb-2">Add Extra Features</h3>
                                        <p className="text-gray-400">Customize your package with these optional additions.</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {[...(featuresConfig[selectedService || ''] || []), ...(featuresConfig['default'] || [])].map((f) => (
                                            <button
                                                key={f.id}
                                                onClick={() => toggleFeature(f.id)}
                                                className={`p-4 rounded-xl border flex items-center justify-between transition-all ${selectedFeatures.includes(f.id)
                                                    ? 'bg-emerald-500/10 border-emerald-500'
                                                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    {selectedFeatures.includes(f.id) ? <CheckCircle className="w-5 h-5 text-emerald-500" /> : <Circle className="w-5 h-5 text-gray-500" />}
                                                    <span className="font-medium text-sm">{f.name}</span>
                                                </div>
                                                <span className="text-xs font-bold text-gray-400">+RM {f.price.toLocaleString()}</span>
                                            </button>
                                        ))}
                                    </div>
                                    <div className="bg-purple-600/10 p-6 rounded-2xl flex items-center justify-between border border-purple-500/20 mb-8 mt-4">
                                        <div>
                                            <p className="text-sm text-purple-400 uppercase font-bold">Estimated Total</p>
                                            <p className="text-3xl font-bold">RM {calculateTotal().toLocaleString()}</p>
                                        </div>
                                        <FileText className="w-10 h-10 text-purple-400 opacity-50" />
                                    </div>
                                    <div className="flex gap-4">
                                        <button onClick={() => setStep(2)} className="flex-1 py-4 border border-white/10 rounded-xl font-bold uppercase hover:bg-white/5 transition-all">Back</button>
                                        <button
                                            onClick={() => setStep(4)}
                                            className="flex-2 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold uppercase px-12 transition-all flex items-center justify-center gap-2"
                                        >
                                            Next Step <ArrowRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 4 && (
                                <motion.div
                                    key="step4"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="w-full space-y-8"
                                >
                                    <div className="text-center">
                                        <h3 className="text-2xl font-bold uppercase italic mb-2">Chillo AI Analysis</h3>
                                        <p className="text-gray-400">Describe your project and our AI will verify your estimate.</p>
                                    </div>

                                    {isAnalyzing ? (
                                        <div className="py-20 flex flex-col items-center justify-center space-y-6">
                                            <div className="relative">
                                                <Loader2 className="w-16 h-16 text-purple-500 animate-spin" />
                                                <Cpu className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-pink-500" />
                                            </div>
                                            <div className="text-center space-y-2">
                                                <p className="text-xl font-bold animate-pulse">Analyzing Requirements...</p>
                                                <p className="text-sm text-gray-500">Processing features, estimating timeline, and verifying cost...</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <textarea
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 outline-none focus:ring-2 focus:ring-purple-500 transition-all min-h-[150px]"
                                                placeholder="E.g. I want to build a landing page for my coffee shop with a menu gallery and a booking form..."
                                                value={projectDescription}
                                                onChange={(e) => setProjectDescription(e.target.value)}
                                            />
                                            <div className="space-y-6 max-w-lg mx-auto">
                                                <button
                                                    onClick={() => {
                                                        setIsAnalyzing(true);
                                                        setTimeout(() => {
                                                            setIsAnalyzing(false);
                                                            handleFinalSubmit();
                                                        }, 3500);
                                                    }}
                                                    disabled={!projectDescription}
                                                    className="w-full py-5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl font-bold uppercase hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all flex items-center justify-center gap-3 disabled:opacity-50 text-xl tracking-wider shadow-lg"
                                                >
                                                    Analyze & Generate Quote <Cpu className="w-6 h-6" />
                                                </button>
                                                <button onClick={() => setStep(3)} className="w-full py-2 text-gray-500 hover:text-white transition-all font-bold uppercase text-xs tracking-widest">
                                                    &larr; Go Back & Refine Features
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </motion.div>
                            )}

                            {step === 5 && (
                                <motion.div
                                    key="step5"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="w-full text-center space-y-8"
                                >
                                    <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-bold uppercase italic mb-2">Quote Ready!</h3>
                                        <p className="text-gray-400 max-w-sm mx-auto">
                                            Your customized quotation {finalLeadId ? `#CQ-${finalLeadId.toString().padStart(4, '0')}` : ''} is ready for download. Our team will also contact you to discuss further.
                                        </p>
                                    </div>

                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 max-w-md mx-auto">
                                        <p className="text-purple-400 font-bold uppercase text-xs mb-2">Total Amount</p>
                                        <p className="text-5xl font-bold mb-6">RM {calculateTotal().toLocaleString()}</p>

                                        <button
                                            onClick={generatePDF}
                                            className="w-full py-4 bg-white text-black rounded-xl font-bold uppercase hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                                        >
                                            <Download className="w-5 h-5" /> Download PDF
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => window.location.href = '/'}
                                        className="text-gray-400 hover:text-white transition-all underline decoration-purple-500 underline-offset-8 font-bold"
                                    >
                                        Return to Homepage
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div >
            </div >
        </div >
    );
}
