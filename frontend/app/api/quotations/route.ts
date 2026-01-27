import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const quotations = await prisma.quotation.findMany({
            orderBy: { createdAt: 'desc' },
            include: { project: true }
        });
        return NextResponse.json({ quotations });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch quotations' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const quotation = await prisma.quotation.create({
            data: {
                number: body.number,
                amount: parseFloat(body.amount),
                validUntil: new Date(body.validUntil),
                clientName: body.clientName,
                clientEmail: body.clientEmail,
                subject: body.subject,
                details: body.details || [],
                projectId: body.projectId ? parseInt(body.projectId) : null,
            }
        });
        return NextResponse.json({ success: true, quotation });
    } catch (error) {
        console.error('Quotation POST Error:', error);
        return NextResponse.json({ error: 'Failed to create quotation' }, { status: 500 });
    }
}
