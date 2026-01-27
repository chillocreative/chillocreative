import { prisma } from '@/lib/prisma';
import LeadsClient from './LeadsClient';

export default async function LeadsPage() {
    const leads = await prisma.lead.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return <LeadsClient initialLeads={JSON.parse(JSON.stringify(leads))} />;
}
