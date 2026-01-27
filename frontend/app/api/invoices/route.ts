import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const invoices = await prisma.invoice.findMany({
            orderBy: { createdAt: 'desc' },
            include: { project: true }
        });
        return NextResponse.json({ invoices });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch invoices' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const invoice = await prisma.invoice.create({
            data: {
                ...body,
                amount: parseFloat(body.amount),
                dueDate: new Date(body.dueDate),
                projectId: body.projectId ? parseInt(body.projectId) : undefined,
            }
        });
        return NextResponse.json({ success: true, invoice });
    } catch (error) {
        console.error('Error creating invoice:', error);
        return NextResponse.json({ error: 'Failed to create invoice' }, { status: 500 });
    }
}
