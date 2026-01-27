import { prisma } from '@/lib/prisma';
import { Users, FileText, CheckCircle, Clock, TrendingUp } from 'lucide-react';

export default async function DashboardPage() {
    let leadsCount = 0;
    let newLeadsCount = 0;
    let projectCount = 0;
    let invoicesCount = 0;
    let totalRevenueSum = 0;
    let recentLeads: any[] = [];

    try {
        [leadsCount, newLeadsCount, projectCount, invoicesCount, recentLeads] = await Promise.all([
            prisma.lead.count(),
            prisma.lead.count({ where: { status: 'New' } }),
            prisma.project.count(),
            prisma.invoice.count(),
            prisma.lead.findMany({
                orderBy: { createdAt: 'desc' },
                take: 5,
            })
        ]);

        const totalRevenueResult = await prisma.invoice.aggregate({
            _sum: { amountPaid: true }
        });
        totalRevenueSum = Number(totalRevenueResult._sum.amountPaid || 0);
    } catch (error) {
        console.error('Dashboard Data Fetch Error:', error);
    }

    const stats = [
        { name: 'Total Leads', value: leadsCount.toString(), icon: Users, color: 'text-blue-400' },
        { name: 'Active Projects', value: projectCount.toString(), icon: FileText, color: 'text-purple-400' },
        { name: 'Total Invoices', value: invoicesCount.toString(), icon: Clock, color: 'text-yellow-400' },
        { name: 'Paid Revenue', value: `RM ${totalRevenueSum.toLocaleString()}`, icon: TrendingUp, color: 'text-green-400' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
                <p className="text-gray-400 mt-2">Welcome back to your Chillo CRM</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all shadow-lg group">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-lg bg-gray-700/50 ${stat.color} group-hover:scale-110 transition-transform`}>
                                <stat.icon size={24} />
                            </div>
                            <span className="text-green-400 text-xs font-medium bg-green-400/10 px-2 py-1 rounded-full">+12%</span>
                        </div>
                        <h3 className="text-gray-400 text-sm font-medium">{stat.name}</h3>
                        <p className="text-3xl font-bold mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Leads Table */}
                <div className="lg:col-span-2 bg-gray-800 rounded-xl border border-gray-700 shadow-lg overflow-hidden">
                    <div className="p-6 border-b border-gray-700 flex items-center justify-between">
                        <h2 className="text-xl font-bold">Recent Leads</h2>
                        <button className="text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-900/50 text-gray-400 text-xs uppercase tracking-wider">
                                    <th className="px-6 py-4 font-medium text-gray-300">Client</th>
                                    <th className="px-6 py-4 font-medium text-gray-300">Service</th>
                                    <th className="px-6 py-4 font-medium text-gray-300">Status</th>
                                    <th className="px-6 py-4 font-medium text-gray-300">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {recentLeads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-gray-700/30 transition-colors cursor-pointer group">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-white group-hover:text-purple-400 transition-colors uppercase">{lead.name}</span>
                                                <span className="text-xs text-gray-500 lowercase">{lead.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-medium text-gray-300">{lead.service}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${lead.status === 'New' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                                lead.status === 'In Progress' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                                                    'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                                                }`}>
                                                {lead.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-400">
                                            {new Date(lead.createdAt).toLocaleDateString('en-GB')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Activity Feed / Placeholder */}
                <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg p-6">
                    <h2 className="text-xl font-bold mb-6">Action Needed</h2>
                    <div className="space-y-6">
                        <div className="flex items-start space-x-4 p-4 rounded-lg bg-gray-700/30 border border-gray-600 hover:border-purple-500/50 transition-all">
                            <div className="p-2 rounded-lg bg-red-400/10 text-red-400 mt-1">
                                <Clock size={16} />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold">Follow up with John</h4>
                                <p className="text-xs text-gray-400 mt-1">Requested 2 days ago for Website redesign.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4 p-4 rounded-lg bg-gray-700/30 border border-gray-600 hover:border-purple-500/50 transition-all">
                            <div className="p-2 rounded-lg bg-blue-400/10 text-blue-400 mt-1">
                                <FileText size={16} />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold">Draft proposal for Chillo App</h4>
                                <p className="text-xs text-gray-400 mt-1">Internal task for the dev team.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
