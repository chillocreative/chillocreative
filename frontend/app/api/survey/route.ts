import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const responses = await prisma.surveyResponse.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json({ responses });
    } catch (error) {
        console.error('Error fetching survey responses:', error);
        return NextResponse.json({ error: 'Gagal memuatkan data' }, { status: 500 });
    }
}

// Whitelist of fields accepted from the public form
const SCALAR_FIELDS = [
    'jawatan', 'sistemUtama', 'kerjaMelibatkanLain', 'menulisKod',
    'bahasaPengaturcaraanLain', 'pernahBina', 'aiToolsLain', 'kekerapanAi',
    'gunaAiUntukLain', 'caraGunaAiLain', 'caraPrompt', 'cabaranAi',
    'aiCodingAssistant', 'tugasAutomasi', 'projekCuba', 'peranti', 'telefon',
] as const;

const JSON_FIELDS = [
    'kerjaMelibatkan', 'bahasaPengaturcaraan', 'toolTeknikal',
    'aiTools', 'gunaAiUntuk', 'caraGunaAi',
] as const;

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const namaPenuh = (body.namaPenuh || '').toString().trim();
        const emel = (body.emel || '').toString().trim();
        const skopKerja = (body.skopKerja || '').toString().trim();
        const harapBelajar = (body.harapBelajar || '').toString().trim();

        // Server-side validation for required fields
        if (!namaPenuh || !emel || !skopKerja || !harapBelajar) {
            return NextResponse.json(
                { error: 'Sila lengkapkan semua medan yang wajib diisi.' },
                { status: 400 }
            );
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emel)) {
            return NextResponse.json(
                { error: 'Format emel tidak sah.' },
                { status: 400 }
            );
        }

        const data: Record<string, unknown> = {
            namaPenuh,
            emel,
            skopKerja,
            harapBelajar,
        };

        for (const f of SCALAR_FIELDS) {
            const v = body[f];
            data[f] = v === undefined || v === null || v === '' ? null : v.toString().trim();
        }

        for (const f of JSON_FIELDS) {
            const v = body[f];
            data[f] = Array.isArray(v) ? v : [];
        }

        // Numeric scale fields (1-5)
        const tahap = parseInt(body.tahapKeselesaan, 10);
        data.tahapKeselesaan = Number.isInteger(tahap) ? tahap : null;
        const bi = parseInt(body.keselesaanBI, 10);
        data.keselesaanBI = Number.isInteger(bi) ? bi : null;

        const response = await prisma.surveyResponse.create({ data: data as never });

        return NextResponse.json({ success: true, response });
    } catch (error) {
        console.error('Error saving survey response:', error);
        return NextResponse.json({ error: 'Gagal menyimpan borang' }, { status: 500 });
    }
}
