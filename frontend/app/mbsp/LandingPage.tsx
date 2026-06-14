'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
    ChevronDown,
    Download,
    MessageSquareCode,
    Code2,
    Bot,
    Layers,
    Plug,
    Rocket,
    Compass,
    Hammer,
    ShieldCheck,
    Calendar,
    BookOpen,
    KeyRound,
    Presentation,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Kandungan program (diringkas dari slide deck)
// ---------------------------------------------------------------------------
const OBJEKTIF = [
    {
        icon: MessageSquareCode,
        title: 'Prompting Berkesan',
        desc: 'Atasi "AI tak faham scope" — beri arahan & konteks yang tepat setiap kali.',
    },
    {
        icon: Code2,
        title: 'AI-Native dalam IDE',
        desc: 'Berhenti copy-paste browser — guna AI coding assistant terus dalam VSCode.',
    },
    {
        icon: Bot,
        title: 'Agentic Coding',
        desc: 'Biar AI baca repo, edit banyak fail & bantu siapkan tugasan besar.',
    },
    {
        icon: Layers,
        title: 'Urus Konteks',
        desc: 'Tak perlu terangkan semula — kekalkan konteks projek dengan cekap.',
    },
    {
        icon: Plug,
        title: 'Integrasi AI ke Sistem',
        desc: 'Panggil Claude API di dalam aplikasi MBSP anda, bukan di luar.',
    },
    {
        icon: Rocket,
        title: 'Ship Lebih Pantas',
        desc: 'Dari idea ke prototaip berfungsi dalam masa yang jauh lebih singkat.',
    },
];

const PERANAN = [
    {
        icon: Compass,
        title: 'Anda Mengarah',
        desc: 'Tentukan keperluan, seni bina & standard. Anda buat keputusan teknikal.',
    },
    {
        icon: Hammer,
        title: 'AI Membina',
        desc: 'Jana boilerplate, fungsi, query & ujian — pantas dan boleh diulang.',
    },
    {
        icon: ShieldCheck,
        title: 'Anda Menilai',
        desc: 'Semak diff, uji, pastikan betul & selamat sebelum terima.',
    },
];

const HARI_1 = [
    { kod: 'M1', tajuk: 'Pengenalan & Tala Matlamat', nota: 'Naik taraf cara kerja — audit penggunaan AI semasa.' },
    { kod: 'M2', tajuk: 'Seni Prompting untuk Pembangun', nota: 'Rangka C-T-K-F-C, Claude Code & spec.md.' },
    { kod: 'M3', tajuk: 'AI Coding Assistant dalam IDE', nota: 'Setup Claude, agentic workflow & urus konteks.' },
    { kod: 'M4', tajuk: 'Mula Projek Sebenar (Berpasukan)', nota: 'Scaffold sistem dengan AI, bina ciri demi ciri.' },
    { kod: 'M5', tajuk: 'Debugging dengan AI + Commit ke GitHub', nota: 'Baca error, strategi & push pertama.' },
];

const HARI_2 = [
    { kod: '·', tajuk: 'Ulang Kaji + Soal Jawab Pantas', nota: 'Sambung momentum Hari 1.' },
    { kod: 'M5', tajuk: 'Integrasi Claude API ke Dalam Sistem', nota: 'Auto-klasifikasi aduan, jana SQL & ringkas laporan.' },
    { kod: 'M4–5', tajuk: 'Sambung Projek + Tambah Integrasi AI', nota: 'Masukkan satu ciri pintar ke projek anda.' },
    { kod: 'M6–7', tajuk: 'Mobile/Flutter & Visual dengan AI', nota: 'Demo Flutter, jana poster/imej & visual deck.' },
    { kod: 'M4–7', tajuk: 'Siapkan Projek + Pembentangan', nota: 'Deploy, README, demo kumpulan & sijil.' },
];

const MODUL = [
    'Naik Taraf Cara Kerja',
    'Seni Prompting',
    'AI Coding Assistant',
    'Hands-on — Projek Sebenar MBSP',
    'Debug & Integrasi AI',
    'Mobile & Flutter',
    'Hasilkan Visual dengan AI',
];

// ---------------------------------------------------------------------------
// Animasi
// ---------------------------------------------------------------------------
const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
};

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
    return (
        <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: 'easeOut', delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export default function LandingPage() {
    const scrollToContent = () => {
        document.getElementById('kandungan')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <main className="min-h-screen bg-white text-slate-800 selection:bg-teal-200/60">
            {/* URL section — peserta lihat alamat ini dahulu (besar, separuh page) */}
            <section className="flex min-h-[55vh] w-full flex-col items-center justify-center bg-slate-900 px-6 py-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="flex flex-col items-center"
                >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-teal-400/70 sm:text-xs">
                        Layari Pautan Ini
                    </p>
                    <p className="mt-6 break-all font-mono text-2xl font-bold leading-tight tracking-tight text-teal-300 sm:text-4xl md:text-5xl lg:text-6xl">
                        https://chillocreative.com/mbsp
                    </p>
                </motion.div>
            </section>

            {/* ----------------------------------------------------------------- */}
            {/* HERO */}
            {/* ----------------------------------------------------------------- */}
            <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="flex flex-col items-center"
                >
                    <div className="relative h-16 w-16 sm:h-20 sm:w-20">
                        <Image
                            src="/mbsp-logo.png"
                            alt="Logo Majlis Bandaraya Seberang Perai"
                            fill
                            sizes="80px"
                            className="object-contain"
                            priority
                        />
                    </div>

                    <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">
                        Program Latihan 2 Hari · Jabatan IT MBSP
                    </p>

                    <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-6xl">
                        Dari Pengguna AI
                        <br />
                        ke <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">Pembina AI-Native</span>
                    </h1>

                    <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-500 sm:text-lg">
                        Vibe Coding untuk pasukan IT — bina &amp; siapkan sistem lebih pantas dengan AI di dalam
                        workflow harian anda, bukan sekadar copy-paste dari browser.
                    </p>

                    {/* Meta chips */}
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm">
                        <MetaChip label="Tenaga Pengajar" value="Abdul Rahim Abdul Rani" />
                        <MetaChip label="Peserta" value="10 Peserta · MBSP" />
                        <MetaChip label="Format" value="Hands-on · Projek Sebenar" />
                    </div>
                </motion.div>

                {/* Butang scroll ke bawah (beranimasi) */}
                <motion.button
                    onClick={scrollToContent}
                    aria-label="Skrol ke bawah untuk kandungan program"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                    className="group mt-16 flex flex-col items-center gap-2 pt-4 text-slate-400 transition-colors hover:text-teal-600 sm:mt-20"
                >
                    <span className="text-[11px] font-medium uppercase tracking-widest">Lihat butiran</span>
                    <motion.span
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition-colors group-hover:border-teal-300"
                    >
                        <ChevronDown size={20} />
                    </motion.span>
                </motion.button>
            </section>

            {/* ----------------------------------------------------------------- */}
            {/* OBJEKTIF */}
            {/* ----------------------------------------------------------------- */}
            <section id="kandungan" className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
                <Reveal>
                    <SectionHeading eyebrow="Objektif" title="Matlamat Program" />
                    <p className="mx-auto mt-4 max-w-2xl text-center text-slate-500">
                        Di akhir 2 hari, anda akan bekerja secara AI-native — lebih laju &amp; lebih yakin.
                    </p>
                </Reveal>

                <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {OBJEKTIF.map((o, i) => (
                        <Reveal key={o.title} delay={i * 0.05}>
                            <div className="group h-full rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg hover:shadow-teal-600/5">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-600 transition-colors group-hover:bg-teal-600 group-hover:text-white">
                                    <o.icon size={22} />
                                </div>
                                <h3 className="mt-5 text-lg font-bold text-slate-900">{o.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-slate-500">{o.desc}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ----------------------------------------------------------------- */}
            {/* APA ITU VIBE CODING */}
            {/* ----------------------------------------------------------------- */}
            <section className="bg-slate-50 py-20 sm:py-24">
                <div className="mx-auto max-w-5xl px-6">
                    <Reveal>
                        <SectionHeading eyebrow="Konsep" title='Apa Itu "Vibe Coding"?' />
                        <p className="mx-auto mt-4 max-w-2xl text-center text-slate-500">
                            Membina perisian dengan menyatakan hasrat anda dalam bahasa biasa, dan AI menjana kod.
                            Anda jadi arkitek &amp; penilai; AI jadi pembina pantas.
                        </p>
                    </Reveal>

                    <div className="mt-12 grid gap-5 sm:grid-cols-3">
                        {PERANAN.map((p, i) => (
                            <Reveal key={p.title} delay={i * 0.08}>
                                <div className="h-full rounded-2xl border border-slate-200 bg-white p-7 text-center">
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-teal-600 to-emerald-500 text-white">
                                        <p.icon size={22} />
                                    </div>
                                    <h3 className="mt-5 text-lg font-bold text-slate-900">{p.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-slate-500">{p.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ----------------------------------------------------------------- */}
            {/* JADUAL */}
            {/* ----------------------------------------------------------------- */}
            <section className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
                <Reveal>
                    <SectionHeading eyebrow="Jadual" title="Aliran 2 Hari" />
                    <p className="mx-auto mt-4 max-w-2xl text-center text-slate-500">
                        9:00 pagi – 5:00 petang · Rehat tengah hari 1:00–2:00.
                    </p>
                </Reveal>

                <div className="mt-12 grid gap-8 lg:grid-cols-2">
                    <DaySchedule
                        label="Hari 1"
                        subtitle="Prompting & AI-Native Workflow"
                        items={HARI_1}
                    />
                    <DaySchedule
                        label="Hari 2"
                        subtitle="Integrasi, Mobile, Visual & Pembentangan"
                        items={HARI_2}
                    />
                </div>
            </section>

            {/* ----------------------------------------------------------------- */}
            {/* 7 MODUL */}
            {/* ----------------------------------------------------------------- */}
            <section className="bg-slate-50 py-20 sm:py-24">
                <div className="mx-auto max-w-5xl px-6">
                    <Reveal>
                        <SectionHeading eyebrow="Kurikulum" title="7 Modul Latihan" />
                    </Reveal>
                    <div className="mt-12 grid gap-3 sm:grid-cols-2">
                        {MODUL.map((m, i) => (
                            <Reveal key={m} delay={i * 0.04}>
                                <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white px-5 py-4">
                                    <span className="font-mono text-sm font-bold text-teal-600">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <span className="font-semibold text-slate-700">{m}</span>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ----------------------------------------------------------------- */}
            {/* MUAT TURUN */}
            {/* ----------------------------------------------------------------- */}
            <section className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
                <Reveal>
                    <SectionHeading eyebrow="Muat Turun" title="Bahan Peserta" />
                </Reveal>
                <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    <DownloadCard
                        icon={Presentation}
                        title="Slide Deck"
                        desc="Slaid penuh program Vibe Coding — semua modul, contoh prompt & rujukan untuk diimbas semula."
                        href="/Slide_Deck_Vibe_Coding_MBSP.pdf"
                        button="Download Slide Deck"
                        meta="PDF · ~0.7 MB"
                    />
                    <DownloadCard
                        icon={BookOpen}
                        title="Buku Kerja Peserta"
                        desc="Buku kerja rasmi untuk diikuti sepanjang sesi hands-on — latihan, template prompt & nota projek."
                        href="/Buku_Kerja_Peserta_MBSP.pdf"
                        button="Download Buku Kerja Peserta"
                        meta="PDF · ~0.4 MB"
                    />
                    <DownloadCard
                        icon={KeyRound}
                        title="Manual Setup API Key Claude"
                        desc="Panduan langkah demi langkah untuk kongsi & setup API Key Claude Code bagi sesi latihan."
                        href="/Manual_Setup_Claude_Code_API_Key.pdf"
                        button="Download Manual API Key"
                        meta="PDF · ~0.15 MB"
                    />
                </div>
            </section>

            {/* ----------------------------------------------------------------- */}
            {/* FOOTER */}
            {/* ----------------------------------------------------------------- */}
            <footer className="border-t border-slate-200 px-6 py-10 text-center">
                <p className="text-sm font-semibold text-slate-700">Abdul Rahim Abdul Rani</p>
                <p className="mt-1 text-xs text-slate-400">
                    Tenaga Pengajar AI · Vibe Coding untuk MBSP
                </p>
                <p className="mt-4 text-xs text-slate-400">
                    Program Latihan · Majlis Bandaraya Seberang Perai (MBSP)
                </p>
            </footer>
        </main>
    );
}

// ---------------------------------------------------------------------------
// Komponen kecil
// ---------------------------------------------------------------------------
function MetaChip({ label, value }: { label: string; value: string }) {
    return (
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-teal-600">{label}</span>
            <span className="font-medium text-slate-700">{value}</span>
        </span>
    );
}

function DownloadCard({
    icon: Icon,
    title,
    desc,
    href,
    button,
    meta,
}: {
    icon: React.ComponentType<{ size?: number; className?: string }>;
    title: string;
    desc: string;
    href: string;
    button: string;
    meta: string;
}) {
    return (
        <Reveal className="h-full">
            <div className="flex h-full flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-teal-900 px-6 py-12 text-center shadow-xl sm:px-10">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-teal-300 ring-1 ring-white/15">
                    <Icon size={26} />
                </div>
                <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{title}</h3>
                <p className="mx-auto mt-4 max-w-sm flex-grow text-sm text-slate-300">{desc}</p>
                <a
                    href={href}
                    download
                    className="group mt-8 inline-flex items-center justify-center gap-3 rounded-full bg-white px-6 py-4 text-base font-bold text-slate-900 shadow-lg transition-all hover:scale-[1.03] hover:bg-teal-50 active:scale-[0.99]"
                >
                    <Download size={20} className="transition-transform group-hover:translate-y-0.5" />
                    {button}
                </a>
                <p className="mt-4 text-xs text-slate-400">{meta}</p>
            </div>
        </Reveal>
    );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
    return (
        <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">{eyebrow}</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
        </div>
    );
}

function DaySchedule({
    label,
    subtitle,
    items,
}: {
    label: string;
    subtitle: string;
    items: { kod: string; tajuk: string; nota: string }[];
}) {
    return (
        <Reveal>
            <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white">
                        <Calendar size={20} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">{label}</h3>
                        <p className="text-xs text-slate-500">{subtitle}</p>
                    </div>
                </div>
                <ul className="mt-5 space-y-4">
                    {items.map((it) => (
                        <li key={it.tajuk} className="flex gap-4">
                            <span className="mt-0.5 inline-flex min-w-[3rem] shrink-0 justify-center rounded-md bg-teal-50 px-2 py-1 font-mono text-xs font-bold text-teal-700">
                                {it.kod}
                            </span>
                            <div>
                                <p className="font-semibold text-slate-800">{it.tajuk}</p>
                                <p className="text-sm text-slate-500">{it.nota}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </Reveal>
    );
}
