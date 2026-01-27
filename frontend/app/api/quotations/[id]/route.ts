import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const quotation = await prisma.quotation.update({
            where: { id: parseInt(id) },
            data: {
                ...body,
                amount: body.amount ? parseFloat(body.amount) : undefined,
                validUntil: body.validUntil ? new Date(body.validUntil) : undefined,
                projectId: body.projectId ? parseInt(body.projectId) : undefined,
            }
        });
        return NextResponse.json({ success: true, quotation });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update quotation' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.quotation.delete({
            where: { id: parseInt(id) }
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete quotation' }, { status: 500 });
    }
}
