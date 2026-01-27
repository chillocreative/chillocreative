'use client';

import { useState } from 'react';
import { Plus, Search, FileText, Download, MoreVertical, Trash2, X, DollarSign, Calendar, User, FileCheck, Send, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function QuotationsClient({ initialQuotations, projects }: { initialQuotations: any[], projects: any[] }) {
    const [quotations, setQuotations] = useState(initialQuotations);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleAddQuotation = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch('/api/quotations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                const { quotation } = await res.json();
                setQuotations([quotation, ...quotations]);
                setIsAddModalOpen(false);
                router.refresh();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteQuotation = async (id: number) => {
        if (!confirm('Delete this quotation?')) return;
        try {
            const res = await fetch(`/api/quotations/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setQuotations(quotations.filter(q => q.id !== id));
                router.refresh();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tighter uppercase">Proposal & Quotations</h1>
                    <p className="text-gray-400 mt-2">Manage service quotations and convert them to projects</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center space-x-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-teal-900/20 uppercase text-sm tracking-widest"
                >
                    <Plus size={20} />
                    <span>New Quotation</span>
                </button>
            </div>

            <div className="bg-gray-800 rounded-3xl border border-gray-700 shadow-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-900/80 text-gray-500 text-[10px] uppercase font-black tracking-[0.2em]">
                                <th className="px-8 py-6">Ref No.</th>
                                <th className="px-8 py-6">Client / Subject</th>
                                <th className="px-8 py-6 text-right">Estimate (MYR)</th>
                                <th className="px-8 py-6">Status</th>
                                <th className="px-8 py-6">Valid Until</th>
                                <th className="px-8 py-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700/50">
                            {quotations.map((qt) => (
                                <tr key={qt.id} className="hover:bg-teal-500/5 transition-all group">
                                    <td className="px-8 py-6 font-mono text-sm text-teal-400">#{qt.number}</td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <span className="text-white font-bold uppercase text-xs tracking-tight">{qt.clientName}</span>
                                            <span className="text-[10px] text-gray-500 mt-1 line-clamp-1 italic">{qt.subject || 'Generic Quotation'}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right font-black text-white text-lg tracking-tighter">
                                        {Number(qt.amount).toLocaleString()}
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${qt.status === 'Accepted' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                                qt.status === 'Draft' ? 'bg-gray-500/10 text-gray-400 border-gray-500/20' :
                                                    qt.status === 'Sent' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                                        'bg-red-500/10 text-red-500 border-red-500/20'
                                            }`}>
                                            {qt.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-xs text-gray-400 font-bold">
                                        {new Date(qt.validUntil).toLocaleDateString()}
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end space-x-3">
                                            <button className="p-2.5 bg-gray-700/50 text-gray-400 border border-transparent hover:border-teal-500/50 hover:text-teal-400 rounded-xl transition-all"><Download size={18} /></button>
                                            <button className="p-2.5 bg-gray-700/50 text-gray-400 border border-transparent hover:border-blue-500/50 hover:text-blue-400 rounded-xl transition-all"><Send size={18} /></button>
                                            <button
                                                onClick={() => handleDeleteQuotation(qt.id)}
                                                className="p-2.5 bg-gray-700/50 text-gray-400 border border-transparent hover:border-red-500/50 hover:text-red-500 rounded-xl transition-all"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {quotations.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-8 py-32 text-center">
                                        <div className="flex flex-col items-center opacity-10">
                                            <FileCheck size={80} />
                                            <p className="mt-4 uppercase font-black tracking-[0.4em] text-xl">NO RECORDS</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* New Quotation Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                    <div className="bg-gray-800 border-2 border-gray-700 rounded-[2.5rem] w-full max-w-2xl shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in duration-300">
                        <div className="p-10 border-b border-gray-700/50 flex justify-between items-center bg-gray-900/30">
                            <div>
                                <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Draft Quotation</h2>
                                <p className="text-teal-500/80 text-[10px] font-bold uppercase tracking-widest mt-2 flex items-center">
                                    <CheckCircle2 size={12} className="mr-2" /> System Reference Generation Active
                                </p>
                            </div>
                            <button onClick={() => setIsAddModalOpen(false)} className="w-12 h-12 rounded-2xl bg-gray-700/50 border border-gray-600 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-500/20 transition-all"><X size={24} /></button>
                        </div>
                        <form onSubmit={handleAddQuotation} className="p-10 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Ref Number</label>
                                    <input name="number" required placeholder="QT-2026-042" className="w-full bg-gray-900/50 border-2 border-gray-700 rounded-2xl py-4 px-6 text-white focus:border-teal-500 outline-none font-mono text-lg transition-all" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Total Estimate (MYR)</label>
                                    <input name="amount" type="number" step="0.01" required placeholder="0.00" className="w-full bg-gray-900/50 border-2 border-gray-700 rounded-2xl py-4 px-6 text-white focus:border-teal-500 outline-none font-black text-xl transition-all" />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Client Personality / Entity</label>
                                <input name="clientName" required placeholder="Full Name or Organization" className="w-full bg-gray-900/50 border-2 border-gray-700 rounded-2xl py-4 px-6 text-white focus:border-teal-500 outline-none font-bold uppercase" />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Subject / Project Title</label>
                                <textarea name="subject" required rows={2} placeholder="E.g. Web Development for Chillo Creative Hub" className="w-full bg-gray-900/50 border-2 border-gray-700 rounded-2xl py-4 px-6 text-white focus:border-teal-500 outline-none font-medium resize-none" />
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Validity (Expiry Date)</label>
                                    <input name="validUntil" type="date" required className="w-full bg-gray-900/50 border-2 border-gray-700 rounded-2xl py-4 px-6 text-white focus:border-teal-500 outline-none font-bold" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Linked Project (Optional)</label>
                                    <select name="projectId" className="w-full bg-gray-900/50 border-2 border-gray-700 rounded-2xl py-4 px-6 text-white focus:border-teal-500 outline-none font-bold uppercase text-xs">
                                        <option value="">Detached Quotation</option>
                                        {projects.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="pt-6">
                                <button type="submit" disabled={loading} className="w-full bg-gradient-to-br from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-black py-5 rounded-[1.5rem] transition-all shadow-[0_10px_30px_rgba(20,184,166,0.3)] uppercase tracking-[0.3em] text-sm">
                                    {loading ? 'INITIALIZING...' : 'GENERATE QUOTATION NOW'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #374151;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #4b5563;
                }
            `}</style>
        </div>
    );
}
