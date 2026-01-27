import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const lead = await prisma.lead.findUnique({
            where: { id: parseInt(id) }
        });
        if (!lead) return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
        return NextResponse.json({ lead });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch lead' }, { status: 500 });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const lead = await prisma.lead.update({
            where: { id: parseInt(id) },
            data: body
        });
        return NextResponse.json({ success: true, lead });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.lead.delete({
            where: { id: parseInt(id) }
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 });
    }
}
