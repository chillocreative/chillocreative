import { prisma } from '@/lib/prisma';
import { Users, FileText, CheckCircle, Clock, TrendingUp } from 'lucide-react';

export default async function DashboardPage() {
    let leadsCount = 0;
    let newLeadsCount = 0;
    let projectCount = 0;
    let invoicesCount = 0;
    let totalRevenueSum = 0;
    let recentLeads: any[] = [];
    let urgentActions: any[] = [];

    try {
        const [lCount, nlCount, pCount, iCount, rLeads, overdueInvoices, pendingQuotes, untouchedLeads] = await Promise.all([
            prisma.lead.count(),
            prisma.lead.count({ where: { status: 'New' } }),
            prisma.project.count(),
            prisma.invoice.count(),
            prisma.lead.findMany({
                orderBy: { createdAt: 'desc' },
                take: 5,
            }),
            prisma.invoice.findMany({
                where: { status: 'Pending', dueDate: { lt: new Date() } },
                take: 2
            }),
            prisma.quotation.findMany({
                where: { status: 'Sent' },
                orderBy: { updatedAt: 'desc' },
                take: 2
            }),
            prisma.lead.findMany({
                where: { status: 'New' },
                orderBy: { createdAt: 'desc' },
                take: 2
            })
        ]);

        leadsCount = lCount;
        newLeadsCount = nlCount;
        projectCount = pCount;
        invoicesCount = iCount;
        recentLeads = rLeads;

        const totalRevenueResult = await prisma.invoice.aggregate({
            _sum: { amountPaid: true }
        });
        totalRevenueSum = Number(totalRevenueResult._sum.amountPaid || 0);

        // Build dynamic actions
        overdueInvoices.forEach(inv => {
            urgentActions.push({
                title: `Collect Payment: ${inv.number}`,
                description: `Invoice for ${inv.clientName} is overdue.`,
                icon: Clock,
                color: 'text-red-400',
                bg: 'bg-red-400/10'
            });
        });

        pendingQuotes.forEach(q => {
            urgentActions.push({
                title: `Follow up: Quote ${q.number}`,
                description: `Sent to ${q.clientName}. Check status.`,
                icon: FileText,
                color: 'text-blue-400',
                bg: 'bg-blue-400/10'
            });
        });

        untouchedLeads.forEach(l => {
            urgentActions.push({
                title: `New Lead: ${l.name}`,
                description: `Requested ${l.service}. Needs response.`,
                icon: Users,
                color: 'text-purple-400',
                bg: 'bg-purple-400/10'
            });
        });

    } catch (error) {
        console.error('Dashboard Fetch Error:', error);
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
                <h1 className="text-3xl font-bold text-white uppercase italic tracking-tighter">Command Center</h1>
                <p className="text-gray-400 mt-2 font-medium">Real-time breakdown of your agency operations</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 hover:border-purple-500/30 transition-all shadow-xl group backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-xl bg-gray-900/50 ${stat.color} group-hover:scale-110 transition-transform`}>
                                <stat.icon size={24} />
                            </div>
                            <span className="text-green-400 text-[10px] font-black uppercase tracking-widest bg-green-400/10 px-2 py-1 rounded-md">Live</span>
                        </div>
                        <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">{stat.name}</h3>
                        <p className="text-3xl font-black mt-1 text-white tracking-tighter">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Leads Table */}
                <div className="lg:col-span-2 bg-gray-800 rounded-3xl border border-gray-700 shadow-2xl overflow-hidden">
                    <div className="p-8 border-b border-gray-700/50 flex items-center justify-between bg-gray-900/20">
                        <h2 className="text-xl font-black uppercase tracking-tighter italic">Recent Prospects</h2>
                        <button className="text-[10px] font-black uppercase tracking-widest text-purple-400 hover:text-purple-300 transition-colors">View All Leads</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-900/50 text-gray-500 text-[10px] uppercase font-black tracking-[0.2em]">
                                    <th className="px-8 py-5">Client Entity</th>
                                    <th className="px-8 py-5">Interest</th>
                                    <th className="px-8 py-5">Status</th>
                                    <th className="px-8 py-5">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700/50">
                                {recentLeads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-purple-500/5 transition-colors cursor-pointer group font-medium">
                                        <td className="px-8 py-5">
                                            <div className="flex flex-col">
                                                <span className="text-white group-hover:text-purple-400 transition-colors uppercase font-black text-xs">{lead.name}</span>
                                                <span className="text-[10px] text-gray-500 lowercase">{lead.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-sm text-gray-300 font-bold italic">{lead.service}</td>
                                        <td className="px-8 py-5">
                                            <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${lead.status === 'New' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                                    lead.status === 'In Progress' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                                                        'bg-gray-500/10 text-gray-400 border-gray-500/20'
                                                }`}>
                                                {lead.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-xs text-gray-500 font-bold">
                                            {new Date(lead.createdAt).toLocaleDateString('en-GB')}
                                        </td>
                                    </tr>
                                ))}
                                {recentLeads.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-8 py-10 text-center text-gray-500 italic text-xs font-medium uppercase tracking-[0.2em]">No recent prospects found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Action Needed Card */}
                <div className="bg-gray-800 rounded-3xl border border-gray-700 shadow-2xl p-8 bg-gradient-to-br from-gray-800 to-gray-900">
                    <h2 className="text-xl font-black uppercase tracking-tighter italic mb-8">Action Needed</h2>
                    <div className="space-y-6">
                        {urgentActions.length > 0 ? urgentActions.map((action, idx) => (
                            <div key={idx} className="flex items-start space-x-4 p-5 rounded-2xl bg-gray-900/50 border border-gray-700 hover:border-purple-500/50 transition-all group">
                                <div className={`p-3 rounded-xl ${action.bg} ${action.color} group-hover:scale-110 transition-transform`}>
                                    <action.icon size={20} />
                                </div>
                                <div>
                                    <h4 className="text-xs font-black text-white uppercase tracking-tight">{action.title}</h4>
                                    <p className="text-[10px] text-gray-500 mt-1 font-medium italic">{action.description}</p>
                                </div>
                            </div>
                        )) : (
                            <div className="py-12 text-center">
                                <CheckCircle size={40} className="mx-auto text-green-500/20 mb-4" />
                                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">System Clear</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
