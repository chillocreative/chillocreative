import { prisma } from '@/lib/prisma';
import { Search, Filter, MoreHorizontal, User, Mail, Calendar, Tag } from 'lucide-react';

export default async function LeadsPage() {
    const leads = await prisma.lead.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">Leads Management</h1>
                    <p className="text-gray-400 mt-2">View and manage potential clients</p>
                </div>
                <button className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold transition-all transform hover:scale-[1.02]">
                    Add New Lead
                </button>
            </div>

            {/* Filters & Actions */}
            <div className="flex flex-col md:flex-row gap-4 bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-md">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search leads..."
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                    />
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 transition-colors">
                        <Filter size={18} />
                        <span>Filter</span>
                    </button>
                    <select className="bg-gray-700 border border-gray-600 text-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500">
                        <option>All Status</option>
                        <option>New</option>
                        <option>In Progress</option>
                        <option>Converted</option>
                        <option>Lost</option>
                    </select>
                </div>
            </div>

            {/* Leads Table */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-900/50 text-gray-400 text-xs uppercase tracking-wider">
                                <th className="px-6 py-4 font-bold border-b border-gray-700">Client Info</th>
                                <th className="px-6 py-4 font-bold border-b border-gray-700">Requested Service</th>
                                <th className="px-6 py-4 font-bold border-b border-gray-700">Status</th>
                                <th className="px-6 py-4 font-bold border-b border-gray-700">Created At</th>
                                <th className="px-6 py-4 font-bold border-b border-gray-700 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {leads.map((lead) => (
                                <tr key={lead.id} className="hover:bg-gray-750/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 rounded-full bg-gray-700 border border-gray-600 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors uppercase font-bold">
                                                {lead.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-white uppercase tracking-tight">{lead.name}</p>
                                                <div className="flex items-center text-xs text-gray-500 mt-0.5 lowercase">
                                                    <Mail size={12} className="mr-1" />
                                                    {lead.email}
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
                                                lead.status === 'In Progress' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                                                    lead.status === 'Converted' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                                        'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                                            }`}>
                                            {lead.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2 text-xs text-gray-400">
                                            <Calendar size={14} />
                                            <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all">
                                            <MoreHorizontal size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {leads.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                        No leads found matching your search.
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
