import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const quotation = await prisma.quotation.findUnique({
            where: { id: parseInt(id) }
        });

        if (!quotation) {
            return NextResponse.json({ error: 'Quotation not found' }, { status: 404 });
        }

        // Generate Invoice Number
        const lastInvoice = await prisma.invoice.findFirst({
            orderBy: { id: 'desc' }
        });
        const nextId = (lastInvoice?.id || 0) + 1;
        const invoiceNumber = `INV-${new Date().getFullYear()}-${String(nextId).padStart(4, '0')}`;

        // Create Invoice
        const invoice = await prisma.invoice.create({
            data: {
                number: invoiceNumber,
                amount: quotation.amount,
                clientName: quotation.clientName,
                clientEmail: quotation.clientEmail,
                description: quotation.subject,
                dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days default
                status: 'Pending',
                projectId: quotation.projectId
            }
        });

        // Update quotation status
        await prisma.quotation.update({
            where: { id: parseInt(id) },
            data: { status: 'Accepted' }
        });

        return NextResponse.json({ success: true, invoice });
    } catch (error) {
        console.error('Conversion Error:', error);
        return NextResponse.json({ error: 'Failed to convert to invoice' }, { status: 500 });
    }
}
