import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        // Only allow status updates from the admin panel
        const data: Record<string, unknown> = {};
        if (typeof body.status === 'string') data.status = body.status;

        const response = await prisma.surveyResponse.update({
            where: { id: parseInt(id) },
            data,
        });
        return NextResponse.json({ success: true, response });
    } catch (error) {
        console.error('Error updating survey response:', error);
        return NextResponse.json({ error: 'Gagal mengemas kini' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.surveyResponse.delete({ where: { id: parseInt(id) } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting survey response:', error);
        return NextResponse.json({ error: 'Gagal memadam' }, { status: 500 });
    }
}
