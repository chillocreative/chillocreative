'use client';

import { useState } from 'react';
import { Plus, Search, FileText, Download, MoreVertical, Trash2, X, DollarSign, Calendar, User, Eye, Edit, RefreshCcw, Loader2, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function InvoicesClient({ initialInvoices, projects }: { initialInvoices: any[], projects: any[] }) {
    const [invoices, setInvoices] = useState(initialInvoices);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleUpdateStatus = async (id: number, newStatus: string) => {
        try {
            const body: any = { status: newStatus };
            // Auto-fill amountPaid if marked as Paid
            if (newStatus === 'Paid') {
                const inv = invoices.find(i => i.id === id);
                if (inv) body.amountPaid = inv.amount;
            }

            const res = await fetch(`/api/invoices/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            if (res.ok) {
                const { invoice } = await res.json();
                setInvoices(invoices.map(i => i.id === id ? { ...i, ...invoice } : i));
                if (newStatus === 'Paid' || newStatus === 'Partially Paid') {
                    alert('Status updated! A project has been automatically initialized if not already present.');
                }
                router.refresh();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateAmountPaid = async (id: number, amount: string) => {
        try {
            const res = await fetch(`/api/invoices/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amountPaid: amount }),
            });
            if (res.ok) {
                const { invoice } = await res.json();
                setInvoices(invoices.map(i => i.id === id ? { ...i, ...invoice } : i));
                router.refresh();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteInvoice = async (id: number) => {
        if (!confirm('Permanently delete this invoice?')) return;
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

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Paid': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'Partially Paid': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'Overdue': return 'bg-red-500/10 text-red-500 border-red-500/20';
            default: return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
        }
    };

    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">Billing & Invoices</h1>
                    <p className="text-gray-400 mt-2 font-medium">Track revenue, manage payments, and spawn projects</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center space-x-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black rounded-2xl font-black transition-all shadow-xl shadow-emerald-500/20 uppercase text-xs tracking-[0.2em]"
                >
                    <Plus size={18} strokeWidth={3} />
                    <span>Issue Invoice</span>
                </button>
            </div>

            <div className="bg-gray-800 rounded-[2.5rem] border border-gray-700 shadow-3xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-900/50 text-gray-500 text-[10px] uppercase font-black tracking-[0.2em]">
                                <th className="px-8 py-7">Invoice Number</th>
                                <th className="px-8 py-7">Client Name</th>
                                <th className="px-8 py-7 text-right">Amount Due</th>
                                <th className="px-8 py-7">Payment Status</th>
                                <th className="px-8 py-7">Due Date</th>
                                <th className="px-8 py-7 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700/50 font-medium">
                            {invoices.map((i) => (
                                <tr key={i.id} className="hover:bg-emerald-500/[0.02] transition-all group">
                                    <td className="px-8 py-7 font-mono text-sm text-emerald-400 font-bold">{i.number}</td>
                                    <td className="px-8 py-7">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 rounded-2xl bg-gray-700 flex items-center justify-center text-sm font-black text-white border border-gray-600">
                                                {i.clientName.charAt(0)}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-white font-black uppercase text-sm tracking-tight">{i.clientName}</span>
                                                {i.projectId ? (
                                                    <span className="text-[10px] text-teal-500 font-bold uppercase flex items-center mt-1">
                                                        <CheckCircle2 size={10} className="mr-1" /> Linked to Project #{i.projectId}
                                                    </span>
                                                ) : (
                                                    <span className="text-[10px] text-gray-500 font-bold uppercase flex items-center mt-1">
                                                        <Clock size={10} className="mr-1" /> Pending Initialization
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-7 text-right">
                                        <div className="flex flex-col items-end">
                                            <div className="text-white font-black text-xl tracking-tighter">RM {(Number(i.amount) - Number(i.amountPaid || 0)).toLocaleString()}</div>
                                            {Number(i.amountPaid) > 0 && (
                                                <div className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest mt-1">
                                                    Paid: RM {Number(i.amountPaid).toLocaleString()}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-8 py-7">
                                        <div className="space-y-2">
                                            <select
                                                value={i.status}
                                                onChange={(e) => handleUpdateStatus(i.id, e.target.value)}
                                                className={`px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border outline-none bg-transparent cursor-pointer transition-all ${getStatusStyle(i.status)}`}
                                            >
                                                <option value="Pending" className="bg-gray-800 text-white">Pending</option>
                                                <option value="Partially Paid" className="bg-gray-800 text-white">Partially Paid</option>
                                                <option value="Paid" className="bg-gray-800 text-white">Fully Paid</option>
                                                <option value="Overdue" className="bg-gray-800 text-white">Overdue</option>
                                            </select>

                                            {i.status === 'Partially Paid' && (
                                                <div className="relative group/input">
                                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 font-black">RM</span>
                                                    <input
                                                        type="number"
                                                        defaultValue={Number(i.amountPaid)}
                                                        onBlur={(e) => handleUpdateAmountPaid(i.id, e.target.value)}
                                                        className="w-full bg-gray-900/50 border border-gray-700 rounded-lg py-1.5 pl-8 pr-3 text-[10px] font-bold text-teal-400 outline-none focus:border-emerald-500 transition-all"
                                                        placeholder="Paid Amt"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-8 py-7">
                                        <div className="text-xs text-gray-400 font-bold">
                                            {new Date(i.dueDate).toLocaleDateString('en-MY', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </div>
                                    </td>
                                    <td className="px-8 py-7 text-right">
                                        <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-3 bg-gray-700/50 text-gray-400 border border-gray-600/50 hover:border-white/50 hover:text-white rounded-2xl transition-all"><Eye size={16} /></button>
                                            <button
                                                onClick={() => handleDeleteInvoice(i.id)}
                                                className="p-3 bg-gray-700/50 text-gray-400 border border-gray-600/50 hover:border-red-500/50 hover:text-red-500 rounded-2xl transition-all"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {invoices.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-8 py-32 text-center">
                                        <div className="flex flex-col items-center opacity-10">
                                            <FileText size={80} />
                                            <p className="mt-4 uppercase font-black tracking-[0.4em] text-xl">NO BILLING RECORDS</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
