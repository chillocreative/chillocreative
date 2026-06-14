import type { Metadata } from 'next';
import LandingPage from './LandingPage';

export const metadata: Metadata = {
    title: 'Vibe Coding untuk MBSP — Dari Pengguna AI ke Pembina AI-Native',
    description:
        'Program Latihan 2 Hari Jabatan IT Majlis Bandaraya Seberang Perai (MBSP). Vibe Coding: bina & siapkan sistem lebih pantas dengan AI di dalam workflow harian anda. Muat turun Buku Kerja Peserta.',
    alternates: { canonical: 'https://chillocreative.com/mbsp' },
    openGraph: {
        title: 'Vibe Coding untuk MBSP — Dari Pengguna AI ke Pembina AI-Native',
        description:
            'Program Latihan 2 Hari Jabatan IT MBSP. Bina sistem lebih pantas dengan AI di dalam workflow harian anda.',
        url: 'https://chillocreative.com/mbsp',
        type: 'website',
    },
};

export default function MbspLandingPage() {
    return <LandingPage />;
}
