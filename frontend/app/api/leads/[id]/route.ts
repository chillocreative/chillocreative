import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const lead = await prisma.lead.findUnique({
            where: { id: parseInt(params.id) }
        });
        if (!lead) return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
        return NextResponse.json({ lead });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch lead' }, { status: 500 });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const lead = await prisma.lead.update({
            where: { id: parseInt(params.id) },
            data: body
        });
        return NextResponse.json({ success: true, lead });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.lead.delete({
            where: { id: parseInt(params.id) }
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 });
    }
}
