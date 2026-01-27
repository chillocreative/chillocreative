'use client';

import { useState } from 'react';
import { Search, Filter, MoreHorizontal, User, Mail, Calendar, Tag, Trash2, Edit, X, Phone, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LeadsClient({ initialLeads }: { initialLeads: any[] }) {
    const [leads, setLeads] = useState(initialLeads);
    const [search, setSearch] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentLead, setCurrentLead] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const filteredLeads = leads.filter(lead =>
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.email.toLowerCase().includes(search.toLowerCase()) ||
        (lead.phone && lead.phone.includes(search))
    );

    const handleAddLead = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                const { lead } = await res.json();
                setLeads([lead, ...leads]);
                setIsAddModalOpen(false);
                router.refresh();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateLead = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch(`/api/leads/${currentLead.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                const { lead } = await res.json();
                setLeads(leads.map(l => l.id === lead.id ? lead : l));
                setIsEditModalOpen(false);
                router.refresh();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteLead = async (id: number) => {
        if (!confirm('Are you sure you want to delete this lead?')) return;

        try {
            const res = await fetch(`/api/leads/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setLeads(leads.filter(l => l.id !== id));
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
                    <h1 className="text-3xl font-bold text-white">Leads Management</h1>
                    <p className="text-gray-400 mt-2">View and manage potential clients</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold transition-all transform hover:scale-[1.02]"
                >
                    Add New Lead
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-md">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search leads..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                    />
                </div>
            </div>

            <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-900/50 text-gray-400 text-xs uppercase tracking-wider">
                                <th className="px-6 py-4 font-bold border-b border-gray-700">Client Info</th>
                                <th className="px-6 py-4 font-bold border-b border-gray-700">Requested Service</th>
                                <th className="px-6 py-4 font-bold border-b border-gray-700">Status</th>
                                <th className="px-6 py-4 font-bold border-b border-gray-700 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {filteredLeads.map((lead) => (
                                <tr key={lead.id} className="hover:bg-gray-750/50 transition-colors group relative">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 rounded-full bg-gray-700 border border-gray-600 flex items-center justify-center text-purple-400 uppercase font-bold">
                                                {lead.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-white uppercase tracking-tight">{lead.name}</p>
                                                <div className="flex flex-col text-xs text-gray-500 space-y-1 mt-1">
                                                    <span className="flex items-center"><Mail size={12} className="mr-1" /> {lead.email}</span>
                                                    {lead.phone && <span className="flex items-center"><Phone size={12} className="mr-1" /> {lead.phone}</span>}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2 text-sm text-gray-300">
                                            <Tag size={14} className="text-purple-400" />
                                            <span>{lead.service || 'Not specified'}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${lead.status === 'New' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                            lead.status === 'Converted' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                                'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                                            }`}>
                                            {lead.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button
                                                onClick={() => {
                                                    setCurrentLead(lead);
                                                    setIsEditModalOpen(true);
                                                }}
                                                className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
                                                title="View Lead"
                                            >
                                                <Eye size={18} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setCurrentLead(lead);
                                                    setIsEditModalOpen(true);
                                                }}
                                                className="p-2 text-gray-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all"
                                                title="Edit Lead"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteLead(lead.id)}
                                                className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                                                title="Delete Lead"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Lead Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                    <div className="bg-gray-800 border border-gray-700 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-gray-700 flex justify-between items-center bg-gray-800/50">
                            <h2 className="text-xl font-bold text-white uppercase tracking-tight">Add New Lead</h2>
                            <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-white"><X size={24} /></button>
                        </div>
                        <form onSubmit={handleAddLead} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Full Name</label>
                                    <input name="name" required className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-purple-500 outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Email Address</label>
                                    <input name="email" type="email" required className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-purple-500 outline-none" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Phone Number</label>
                                    <input name="phone" className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-purple-500 outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Service</label>
                                    <select name="service" className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-purple-500 outline-none">
                                        <option>Web Design</option>
                                        <option>SEO</option>
                                        <option>Branding</option>
                                        <option>Marketing</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase">Message/Notes</label>
                                <textarea name="message" rows={3} className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-purple-500 outline-none resize-none" />
                            </div>
                            <div className="pt-4">
                                <button type="submit" disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-all">
                                    {loading ? 'Adding...' : 'Save Lead'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Lead Modal */}
            {isEditModalOpen && currentLead && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                    <div className="bg-gray-800 border border-gray-700 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-gray-700 flex justify-between items-center bg-gray-800/50">
                            <h2 className="text-xl font-bold text-white uppercase tracking-tight">Edit Lead</h2>
                            <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-white"><X size={24} /></button>
                        </div>
                        <form onSubmit={handleUpdateLead} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Full Name</label>
                                    <input name="name" defaultValue={currentLead.name} required className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-purple-500 outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Email Address</label>
                                    <input name="email" defaultValue={currentLead.email} type="email" required className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-purple-500 outline-none" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Phone Number</label>
                                    <input name="phone" defaultValue={currentLead.phone} className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-purple-500 outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Status</label>
                                    <select name="status" defaultValue={currentLead.status} className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-purple-500 outline-none text-xs uppercase font-bold">
                                        <option>New</option>
                                        <option>In Progress</option>
                                        <option>Contacted</option>
                                        <option>Converted</option>
                                        <option>Lost</option>
                                    </select>
                                </div>
                            </div>
                            <div className="pt-4">
                                <button type="submit" disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-all">
                                    {loading ? 'Saving Changes...' : 'Update Lead'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
