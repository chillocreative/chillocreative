import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const leads = await prisma.lead.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json({ leads });
    } catch (error) {
        console.error('Error fetching leads:', error);
        return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, service, message } = body;

        if (!name || !email) {
            return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
        }

        // If this is a final quote submission, cleanup the temporary "Initiated" lead
        if (service !== 'Quote Initiated') {
            await prisma.lead.deleteMany({
                where: {
                    email,
                    service: 'Quote Initiated'
                }
            });
        }

        const lead = await prisma.lead.create({
            data: {
                name,
                email,
                phone,
                service,
                message,
                status: 'New'
            }
        });

        return NextResponse.json({ success: true, lead });
    } catch (error) {
        console.error('Error saving lead:', error);
        return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 });
    }
}
