'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    FolderKanban,
    FileText,
    Settings,
    LogOut,
    FileCheck,
    Menu,
    X,
    ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Leads', href: '/admin/dashboard/leads', icon: Users },
    { name: 'Quotations', href: '/admin/dashboard/quotations', icon: FileCheck },
    { name: 'Invoices', href: '/admin/dashboard/invoices', icon: FileText },
    { name: 'Projects', href: '/admin/dashboard/projects', icon: FolderKanban },
    { name: 'Settings', href: '/admin/dashboard/settings', icon: Settings },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <div className="flex min-h-screen bg-gray-900 text-white font-sans">
            {/* Desktop Sidebar */}
            <aside className="w-72 bg-gray-950 border-r border-gray-800 hidden lg:flex flex-col sticky top-0 h-screen">
                <div className="p-8">
                    <Link href="/admin/dashboard" className="flex items-center space-x-3 group text-white">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform font-black italic text-xl">
                            C
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-black tracking-tighter uppercase italic leading-none">Chillo</span>
                            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-gray-500">Creative CRM</span>
                        </div>
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-1.5 mt-4 overflow-y-auto custom-scrollbar">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center justify-between p-4 rounded-2xl transition-all group ${isActive
                                        ? 'bg-gradient-to-r from-purple-600/10 to-blue-600/10 text-white border border-purple-500/30 shadow-inner'
                                        : 'text-gray-500 hover:text-white hover:bg-white/5 border border-transparent'
                                    }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <item.icon size={20} className={`${isActive ? 'text-purple-400' : 'group-hover:text-purple-400 transition-colors'}`} />
                                    <span className={`text-sm font-black uppercase tracking-widest ${isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}>
                                        {item.name}
                                    </span>
                                </div>
                                {isActive && <motion.div layoutId="activeDot" className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-6 border-t border-gray-900/50">
                    <Link
                        href="/api/auth/logout"
                        prefetch={false}
                        className="flex items-center space-x-3 p-4 rounded-2xl text-red-400 hover:bg-red-500/10 hover:border-red-500/30 border border-transparent transition-all group font-black uppercase tracking-widest text-xs"
                    >
                        <LogOut size={18} />
                        <span>Sign Out</span>
                        <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Mobile Header */}
                <header className="h-20 bg-gray-950/50 backdrop-blur-xl border-b border-gray-800 flex items-center justify-between px-6 sticky top-0 z-[100] lg:px-12">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleMobileMenu}
                            className="lg:hidden p-2.5 bg-gray-900 border border-gray-800 rounded-xl text-gray-400 hover:text-white transition-all shadow-lg"
                        >
                            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                        <h1 className="text-lg font-black uppercase tracking-tighter italic text-white lg:text-xl">
                            {navItems.find(i => i.href === pathname)?.name || 'Admin Panel'}
                        </h1>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="hidden sm:flex flex-col items-end mr-2 text-right">
                            <span className="text-xs font-black uppercase tracking-widest leading-none">Rahim Admin</span>
                            <span className="text-[9px] font-bold text-emerald-400 tracking-widest uppercase mt-1">Status: Online</span>
                        </div>
                        <div className="relative group">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center p-[2px] shadow-xl group-hover:scale-105 transition-transform duration-300">
                                <div className="w-full h-full rounded-[14px] bg-gray-900 flex items-center justify-center text-xs md:text-sm font-black text-white">
                                    RA
                                </div>
                            </div>
                            {/* Fast Action Ring */}
                            <div className="absolute inset-0 rounded-2xl border-2 border-purple-500/50 animate-pulse hidden md:block" />
                        </div>
                    </div>
                </header>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={toggleMobileMenu}
                                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[110] lg:hidden"
                            />
                            <motion.nav
                                initial={{ x: '-100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '-100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="fixed top-0 left-0 bottom-0 w-[80%] max-w-sm bg-gray-950 border-r border-gray-800 z-[120] lg:hidden flex flex-col p-8 shadow-2xl"
                            >
                                <div className="flex items-center justify-between mb-12">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center font-black italic text-xl">
                                            C
                                        </div>
                                        <span className="text-xl font-black tracking-tighter uppercase italic">CRM Hub</span>
                                    </div>
                                    <button onClick={toggleMobileMenu} className="p-2.5 bg-gray-900 rounded-xl border border-gray-800 text-gray-500">
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="flex-1 space-y-2">
                                    {navItems.map((item) => {
                                        const isActive = pathname === item.href;
                                        return (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                onClick={toggleMobileMenu}
                                                className={`flex items-center space-x-4 p-4 rounded-2xl transition-all ${isActive
                                                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                                    }`}
                                            >
                                                <item.icon size={20} />
                                                <span className="text-sm font-black uppercase tracking-widest">{item.name}</span>
                                            </Link>
                                        );
                                    })}
                                </div>

                                <div className="pt-8 border-t border-gray-900">
                                    <Link
                                        href="/api/auth/logout"
                                        onClick={toggleMobileMenu}
                                        className="flex items-center space-x-4 p-5 rounded-2xl text-red-400 bg-red-500/5 hover:bg-red-500/10 transition-all font-black uppercase tracking-[0.2em] text-xs justify-center"
                                    >
                                        <LogOut size={20} />
                                        <span>Sign Out Hub</span>
                                    </Link>
                                </div>
                            </motion.nav>
                        </>
                    )}
                </AnimatePresence>

                <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 bg-gray-900 custom-scrollbar">
                    <div className="max-w-7xl mx-auto space-y-8">
                        {children}
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #1f2937;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #374151;
                }
            `}</style>
        </div>
    );
}
