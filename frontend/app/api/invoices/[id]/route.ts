import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const invoice = await prisma.invoice.update({
            where: { id: parseInt(params.id) },
            data: {
                ...body,
                amount: body.amount ? parseFloat(body.amount) : undefined,
                dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
                projectId: body.projectId ? parseInt(body.projectId) : undefined,
            }
        });
        return NextResponse.json({ success: true, invoice });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update invoice' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.invoice.delete({
            where: { id: parseInt(params.id) }
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete invoice' }, { status: 500 });
    }
}
