import { NextResponse } from 'next/server';

export async function GET() {
    // Mock data access - in reality would connect to SQLite/MySQL
    const leads = [
        { id: 1, name: 'John Doe', email: 'john@example.com', service: 'Web Design', status: 'New', date: '2023-10-25' },
        { id: 2, name: 'Jane Smith', email: 'jane@company.com', service: 'SEO', status: 'In Progress', date: '2023-10-24' },
    ];

    return NextResponse.json({ leads });
}

export async function POST(request: Request) {
    const body = await request.json();

    // Here we would save to database
    console.log('Received lead:', body);

    return NextResponse.json({ success: true, message: 'Lead saved' });
}
