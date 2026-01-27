import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        const invoice = await prisma.invoice.update({
            where: { id: parseInt(id) },
            data: {
                ...body,
                amount: body.amount ? parseFloat(body.amount) : undefined,
                amountPaid: body.amountPaid !== undefined ? parseFloat(body.amountPaid) : undefined,
                dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
                projectId: body.projectId ? parseInt(body.projectId) : undefined,
            }
        });

        // Automatically create project if Paid/Partially Paid and no project linked
        if ((body.status === 'Paid' || body.status === 'Partially Paid') && !invoice.projectId) {
            const project = await prisma.project.create({
                data: {
                    title: invoice.description || `PROJECT: ${invoice.clientName}`,
                    clientName: invoice.clientName,
                    clientEmail: invoice.clientEmail,
                    budget: invoice.amount,
                    status: 'Planning',
                    description: `Converted from Invoice #${invoice.number}. ${invoice.description || ''}`,
                }
            });

            // Re-link the invoice to the new project
            await prisma.invoice.update({
                where: { id: invoice.id },
                data: { projectId: project.id }
            });
        }

        return NextResponse.json({ success: true, invoice });
    } catch (error) {
        console.error('Invoice Update Error:', error);
        return NextResponse.json({ error: 'Failed to update invoice' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.invoice.delete({
            where: { id: parseInt(id) }
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete invoice' }, { status: 500 });
    }
}
