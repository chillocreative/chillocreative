import { prisma } from '@/lib/prisma';
import QuotationsClient from './QuotationsClient';

export default async function QuotationsPage() {
    const quotations = await prisma.quotation.findMany({
        orderBy: { createdAt: 'desc' },
        include: { project: true }
    });

    const projects = await prisma.project.findMany();

    return (
        <QuotationsClient
            initialQuotations={JSON.parse(JSON.stringify(quotations))}
            projects={JSON.parse(JSON.stringify(projects))}
        />
    );
}
