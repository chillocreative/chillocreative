'use client';

import { useState } from 'react';
import { Plus, Search, FileText, Download, MoreVertical, Trash2, X, DollarSign, Calendar, User, Eye, Edit } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function InvoicesClient({ initialInvoices, projects }: { initialInvoices: any[], projects: any[] }) {
    const [invoices, setInvoices] = useState(initialInvoices);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleAddInvoice = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch('/api/invoices', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                const { invoice } = await res.json();
                setInvoices([invoice, ...invoices]);
                setIsAddModalOpen(false);
                router.refresh();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteInvoice = async (id: number) => {
        if (!confirm('Delete this invoice?')) return;
        try {
            const res = await fetch(`/api/invoices/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setInvoices(invoices.filter(i => i.id !== id));
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
                    <h1 className="text-3xl font-bold text-white tracking-tight">Financial Invoicing</h1>
                    <p className="text-gray-400 mt-2">Generate and track professional invoices for your clients</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-green-900/20"
                >
                    <Plus size={20} />
                    <span>Create Invoice</span>
                </button>
            </div>

            <div className="bg-gray-800 rounded-2xl border border-gray-700 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-900/50 text-gray-400 text-[10px] uppercase tracking-[0.2em]">
                                <th className="px-6 py-5 font-black">Invoice #</th>
                                <th className="px-6 py-5 font-black">Client</th>
                                <th className="px-6 py-5 font-black text-right">Amount</th>
                                <th className="px-6 py-5 font-black">Status</th>
                                <th className="px-6 py-5 font-black">Due Date</th>
                                <th className="px-6 py-5 font-black text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {invoices.map((invoice) => (
                                <tr key={invoice.id} className="hover:bg-gray-750/50 transition-colors">
                                    <td className="px-6 py-5 font-mono text-sm text-blue-400">{invoice.number}</td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 rounded-lg bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-300">
                                                {invoice.clientName.charAt(0)}
                                            </div>
                                            <span className="text-white font-medium uppercase text-xs">{invoice.clientName}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-right font-bold text-white tracking-tighter">
                                        ${Number(invoice.amount).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border ${invoice.status === 'Paid' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                            invoice.status === 'Overdue' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                                'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                                            }`}>
                                            {invoice.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-xs text-gray-400">
                                        {new Date(invoice.dueDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all" title="View Invoice"><Eye size={18} /></button>
                                            <button className="p-2 text-gray-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all" title="Edit Invoice"><Edit size={18} /></button>
                                            <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all" title="Download PDF"><Download size={18} /></button>
                                            <button
                                                onClick={() => handleDeleteInvoice(invoice.id)}
                                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                                                title="Delete Invoice"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {invoices.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-20 text-center text-gray-500 uppercase font-black tracking-widest opacity-20">
                                        No Invoices Generated
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Invoice Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[100] p-4">
                    <div className="bg-gray-800 border border-gray-700 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-300">
                        <div className="p-8 border-b border-gray-700 flex justify-between items-center bg-gray-800/50">
                            <div>
                                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">New Invoice</h2>
                                <p className="text-gray-400 text-xs mt-1">Fill in the professional details below.</p>
                            </div>
                            <button onClick={() => setIsAddModalOpen(false)} className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-all"><X size={20} /></button>
                        </div>
                        <form onSubmit={handleAddInvoice} className="p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Invoice Number</label>
                                    <input name="number" required placeholder="INV-2026-001" className="w-full bg-gray-900 border border-gray-700 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-green-500 outline-none font-mono" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Amount ($)</label>
                                    <input name="amount" type="number" step="0.01" required placeholder="0.00" className="w-full bg-gray-900 border border-gray-700 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-green-500 outline-none font-bold" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Client Selection</label>
                                <input name="clientName" required placeholder="Search or Type Client Name" className="w-full bg-gray-900 border border-gray-700 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-green-500 outline-none" />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Linked Project</label>
                                    <select name="projectId" className="w-full bg-gray-900 border border-gray-700 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-green-500 outline-none uppercase text-[10px] font-bold">
                                        <option value="">No Project Linked</option>
                                        {projects.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Due Date</label>
                                    <input name="dueDate" type="date" required className="w-full bg-gray-900 border border-gray-700 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-green-500 outline-none" />
                                </div>
                            </div>

                            <div className="pt-6">
                                <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-green-900/30 uppercase tracking-[0.2em] text-xs">
                                    {loading ? 'Processing...' : 'Issue Invoice Now'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
