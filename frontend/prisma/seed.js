require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const username = 'rahim';
    const password = 'Rahim1977@';

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.user.upsert({
        where: { username },
        update: {
            password: hashedPassword,
        },
        create: {
            username,
            password: hashedPassword,
            name: 'Rahim Admin',
            role: 'admin',
        },
    });

    console.log('Admin user created/updated:', admin.username);

    // Seed some initial leads
    await prisma.lead.deleteMany();
    await prisma.project.deleteMany();

    const lead1 = await prisma.lead.create({
        data: { name: 'John Doe', email: 'john@example.com', service: 'Web Design', status: 'Converted' },
    });

    const lead2 = await prisma.lead.create({
        data: { name: 'Jane Smith', email: 'jane@company.com', service: 'SEO', status: 'In Progress' },
    });

    await prisma.lead.create({
        data: { name: 'Bob Wilson', email: 'bob@example.com', service: 'Branding', status: 'New' },
    });

    // Seed some initial projects
    await prisma.project.create({
        data: {
            title: 'Chillo Website Redesign',
            description: 'A full redesign of the main agency website.',
            status: 'Development',
            clientName: 'John Doe',
            clientEmail: 'john@example.com',
            budget: 5000,
            leadId: lead1.id
        }
    });

    await prisma.project.create({
        data: {
            title: 'E-commerce App',
            description: 'Building a custom e-commerce solution with Next.js.',
            status: 'Planning',
            clientName: 'Sarah Jenkins',
            clientEmail: 'sarah@shop.com',
            budget: 12000,
        }
    });

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
