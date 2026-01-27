'use client';

import { useState } from 'react';
import { Plus, Search, FileText, Download, MoreVertical, Trash2, X, DollarSign, Calendar, User, FileCheck, Send, CheckCircle2, Eye, Edit, RefreshCcw, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function QuotationsClient({ initialQuotations, projects }: { initialQuotations: any[], projects: any[] }) {
    const [quotations, setQuotations] = useState(initialQuotations);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedQuotation, setSelectedQuotation] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [convertingId, setConvertingId] = useState<number | null>(null);
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
                body: JSON.stringify({
                    ...data,
                    details: [{ description: 'Main Service', amount: parseFloat(data.amount as string) }]
                }),
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

    const handleUpdateQuotation = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch(`/api/quotations/${selectedQuotation.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...data,
                    amount: parseFloat(data.amount as string),
                }),
            });
            if (res.ok) {
                const { quotation } = await res.json();
                setQuotations(quotations.map(q => q.id === quotation.id ? quotation : q));
                setIsEditModalOpen(false);
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

    const convertToInvoice = async (id: number) => {
        setConvertingId(id);
        try {
            const res = await fetch(`/api/quotations/${id}/convert`, { method: 'POST' });
            if (res.ok) {
                alert('Quotation successfully converted to Invoice!');
                router.push('/admin/dashboard/invoices');
            } else {
                alert('Conversion failed. Check console for details.');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setConvertingId(null);
        }
    };

    const generatePDF = (qt: any) => {
        const doc = new jsPDF() as any;
        const BRAND_PURPLE: [number, number, number] = [147, 51, 234];
        const TEXT_DARK: [number, number, number] = [31, 41, 55];
        const TEXT_LIGHT: [number, number, number] = [107, 114, 128];

        // Header
        doc.setFillColor(BRAND_PURPLE[0], BRAND_PURPLE[1], BRAND_PURPLE[2]);
        doc.rect(0, 0, 210, 45, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(26);
        doc.setFont(undefined, 'bold');
        doc.text('CHILLO CREATIVE', 15, 20);
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.text('BY CH GLOBAL EMPIRE (003124386-V)', 15, 27);

        // Client Info
        doc.setTextColor(TEXT_DARK[0], TEXT_DARK[1], TEXT_DARK[2]);
        doc.setFontSize(20);
        doc.setFont(undefined, 'bold');
        doc.text('QUOTATION', 15, 65);
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.text(`No: ${qt.number}`, 15, 72);
        doc.text(`Date: ${new Date(qt.createdAt).toLocaleDateString()}`, 15, 77);
        doc.text(`Client: ${qt.clientName}`, 120, 65);
        doc.text(`Email: ${qt.clientEmail || 'N/A'}`, 120, 70);

        // Table
        const items = Array.isArray(qt.details) ? qt.details : [{ description: qt.subject, amount: qt.amount }];
        autoTable(doc, {
            startY: 90,
            head: [['Description', 'Qty', 'Unit Price', 'Total']],
            body: items.map((item: any) => [
                item.description || 'Service Item',
                '1',
                `RM ${Number(item.amount).toLocaleString()}`,
                `RM ${Number(item.amount).toLocaleString()}`
            ]),
            headStyles: { fillColor: BRAND_PURPLE },
        });

        const finalY = (doc as any).lastAutoTable.finalY + 10;
        doc.setFont(undefined, 'bold');
        doc.text('TOTAL:', 150, finalY);
        doc.text(`RM ${Number(qt.amount).toLocaleString()}`, 195, finalY, { align: 'right' });

        doc.save(`${qt.number}_${qt.clientName.replace(/\s/g, '_')}.pdf`);
    };

    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">Quotations Hub</h1>
                    <p className="text-gray-400 mt-2 font-medium">Draft, manage and convert proposals to invoices</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center space-x-2 px-8 py-4 bg-teal-500 hover:bg-teal-400 text-black rounded-2xl font-black transition-all shadow-xl shadow-teal-500/20 uppercase text-xs tracking-[0.2em]"
                >
                    <Plus size={18} strokeWidth={3} />
                    <span>Create Proposal</span>
                </button>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-3xl">
                    <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest mb-1">Total Active</p>
                    <p className="text-3xl font-black text-white">{quotations.length}</p>
                </div>
                <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-3xl">
                    <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest mb-1">Total Value</p>
                    <p className="text-3xl font-black text-teal-400">RM {quotations.reduce((acc, q) => acc + Number(q.amount), 0).toLocaleString()}</p>
                </div>
                <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-3xl">
                    <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest mb-1">Pending Acceptance</p>
                    <p className="text-3xl font-black text-orange-400">{quotations.filter(q => q.status !== 'Accepted').length}</p>
                </div>
            </div>

            <div className="bg-gray-800 rounded-[2.5rem] border border-gray-700 shadow-3xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-900/50 text-gray-500 text-[10px] uppercase font-black tracking-[0.2em]">
                                <th className="px-8 py-7">ID / Ref</th>
                                <th className="px-8 py-7">Client Details</th>
                                <th className="px-8 py-7 text-right">Estimate</th>
                                <th className="px-8 py-7">Status</th>
                                <th className="px-8 py-7 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700/50 font-medium">
                            {quotations.map((qt) => (
                                <tr key={qt.id} className="hover:bg-teal-500/[0.02] transition-all group border-l-4 border-l-transparent hover:border-l-teal-500">
                                    <td className="px-8 py-7">
                                        <div className="font-mono text-sm text-teal-400 font-bold">#{qt.number}</div>
                                        <div className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest">{new Date(qt.createdAt).toLocaleDateString()}</div>
                                    </td>
                                    <td className="px-8 py-7">
                                        <div className="flex flex-col">
                                            <span className="text-white font-black uppercase text-sm tracking-tight">{qt.clientName}</span>
                                            <span className="text-xs text-gray-500 mt-1 line-clamp-1 italic">{qt.subject || 'Creative Consultation'}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-7 text-right">
                                        <div className="text-white font-black text-xl tracking-tighter">RM {Number(qt.amount).toLocaleString()}</div>
                                    </td>
                                    <td className="px-8 py-7">
                                        <div className={`inline-flex items-center px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${qt.status === 'Accepted' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                            qt.status === 'Sent' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                                'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                                            }`}>
                                            <span className="w-1.5 h-1.5 rounded-full bg-current mr-2 animate-pulse" />
                                            {qt.status}
                                        </div>
                                    </td>
                                    <td className="px-8 py-7 text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button
                                                onClick={() => { setSelectedQuotation(qt); setIsEditModalOpen(true); }}
                                                className="p-3 bg-gray-700/50 text-gray-400 border border-gray-600/50 hover:border-teal-500/50 hover:text-teal-400 rounded-2xl transition-all"
                                                title="Edit Details"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => generatePDF(qt)}
                                                className="p-3 bg-gray-700/50 text-gray-400 border border-gray-600/50 hover:border-white/50 hover:text-white rounded-2xl transition-all"
                                                title="Export PDF"
                                            >
                                                <Download size={16} />
                                            </button>
                                            {qt.status !== 'Accepted' && (
                                                <button
                                                    onClick={() => convertToInvoice(qt.id)}
                                                    disabled={convertingId === qt.id}
                                                    className="p-3 bg-teal-500/10 text-teal-500 border border-teal-500/20 hover:bg-teal-500 hover:text-black rounded-2xl transition-all disabled:opacity-50"
                                                    title="Convert to Invoice"
                                                >
                                                    {convertingId === qt.id ? <Loader2 size={16} className="animate-spin" /> : <RefreshCcw size={16} />}
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDeleteQuotation(qt.id)}
                                                className="p-3 bg-gray-700/50 text-gray-400 border border-gray-600/50 hover:border-red-500/50 hover:text-red-500 rounded-2xl transition-all"
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modals... */}
            {isAddModalOpen && (
                <QuotationFormModal
                    title="Draft New Proposal"
                    onClose={() => setIsAddModalOpen(false)}
                    onSubmit={handleAddQuotation}
                    loading={loading}
                    projects={projects}
                />
            )}

            {isEditModalOpen && selectedQuotation && (
                <QuotationFormModal
                    title="Refine Quotation"
                    onClose={() => setIsEditModalOpen(false)}
                    onSubmit={handleUpdateQuotation}
                    loading={loading}
                    initialData={selectedQuotation}
                    projects={projects}
                />
            )}
        </div>
    );
}

function QuotationFormModal({ title, onClose, onSubmit, loading, initialData, projects }: any) {
    return (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-[100] p-4">
            <div className="bg-gray-800 border-2 border-gray-700 rounded-[3rem] w-full max-w-2xl shadow-huge overflow-hidden animate-in zoom-in duration-300">
                <div className="p-10 border-b border-gray-700/50 flex justify-between items-center bg-gray-900/40">
                    <div>
                        <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">{title}</h2>
                        <p className="text-teal-500 text-[10px] font-black uppercase tracking-widest mt-2">Chillo Digital Suite v2.0</p>
                    </div>
                    <button onClick={onClose} className="w-12 h-12 rounded-2xl bg-gray-700/50 border border-gray-600 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-500/20 transition-all"><X size={24} /></button>
                </div>
                <form onSubmit={onSubmit} className="p-10 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Ref Number</label>
                            <input name="number" defaultValue={initialData?.number} required placeholder="QT-2026-XXXX" className="w-full bg-gray-900/50 border-2 border-gray-700 rounded-2xl py-4 px-6 text-white focus:border-teal-500 outline-none font-mono text-lg transition-all" />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Total Amount (MYR)</label>
                            <input name="amount" type="number" step="0.01" defaultValue={Number(initialData?.amount)} required placeholder="0.00" className="w-full bg-gray-900/50 border-2 border-gray-700 rounded-2xl py-4 px-6 text-white focus:border-teal-500 outline-none font-black text-xl transition-all text-teal-400" />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Client Name / Business Entity</label>
                        <input name="clientName" defaultValue={initialData?.clientName} required placeholder="Who are we billing?" className="w-full bg-gray-900/50 border-2 border-gray-700 rounded-2xl py-4 px-6 text-white focus:border-teal-500 outline-none font-bold uppercase tracking-tight" />
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Scope / Subject</label>
                        <textarea name="subject" defaultValue={initialData?.subject} required rows={3} placeholder="Describe the project scope..." className="w-full bg-gray-900/50 border-2 border-gray-700 rounded-3xl py-4 px-6 text-white focus:border-teal-500 outline-none font-medium resize-none leading-relaxed" />
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Valid Until</label>
                            <input name="validUntil" type="date" defaultValue={initialData?.validUntil ? new Date(initialData.validUntil).toISOString().split('T')[0] : ''} required className="w-full bg-gray-900/50 border-2 border-gray-700 rounded-2xl py-4 px-6 text-white focus:border-teal-500 outline-none font-bold" />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Link to Project</label>
                            <select name="projectId" defaultValue={initialData?.projectId || ''} className="w-full bg-gray-900/50 border-2 border-gray-700 rounded-2xl py-4 px-6 text-white focus:border-teal-500 outline-none font-bold uppercase text-xs">
                                <option value="">Draft (No Project)</option>
                                {projects.map((p: any) => <option key={p.id} value={p.id}>{p.title}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="pt-6">
                        <button type="submit" disabled={loading} className="w-full bg-gradient-to-br from-teal-500 to-emerald-600 hover:scale-[1.02] active:scale-[0.98] text-black font-black py-6 rounded-3xl transition-all shadow-[0_20px_40px_rgba(20,184,166,0.2)] uppercase tracking-[0.4em] text-sm flex items-center justify-center gap-3">
                            {loading ? <RefreshCcw className="animate-spin" /> : <FileCheck size={20} strokeWidth={3} />}
                            {loading ? 'SYNCING...' : 'COMMIT CHANGES'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
