import { prisma } from '@/lib/prisma';
import InvoicesClient from './InvoicesClient';

export default async function InvoicesPage() {
    const invoices = await prisma.invoice.findMany({
        orderBy: { createdAt: 'desc' },
        include: { project: true }
    });

    const projects = await prisma.project.findMany();

    return (
        <InvoicesClient
            initialInvoices={JSON.parse(JSON.stringify(invoices))}
            projects={JSON.parse(JSON.stringify(projects))}
        />
    );
}
