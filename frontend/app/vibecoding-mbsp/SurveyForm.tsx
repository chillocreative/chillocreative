'use client';

import { useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react';

// ---------------------------------------------------------------------------
// Pilihan jawapan
// ---------------------------------------------------------------------------
const OPT_KERJA = [
    'Kemasukan data',
    'Penyediaan laporan',
    'Coding/development',
    'Sokongan teknikal pengguna',
    'Pengurusan sistem/server',
    'Pengurusan pangkalan data',
    'Pentadbiran am',
    'Lain-lain',
];
const OPT_MENULIS_KOD = ['Ya kerap', 'Kadang-kadang', 'Jarang', 'Tidak pernah'];
const OPT_BAHASA = [
    'Python', 'JavaScript/TypeScript', 'PHP', 'Java', 'C#/.NET', 'SQL',
    'VBA/Excel Macro', 'HTML/CSS', 'Power Platform', 'Tiada', 'Lain-lain',
];
const OPT_TOOL = [
    'Terminal/Command line', 'Git/GitHub', 'VS Code/IDE lain',
    'Tool pangkalan data', 'Docker', 'Cloud (AWS/Azure/GCP)', 'Tiada',
];
const OPT_AI_TOOLS = [
    'ChatGPT', 'Claude', 'Gemini', 'Microsoft Copilot', 'GitHub Copilot',
    'DeepSeek', 'Perplexity', 'Tiada', 'Lain-lain',
];
const OPT_KEKERAPAN = ['Setiap hari', 'Beberapa kali seminggu', 'Sekali-sekala', 'Tidak pernah'];
const OPT_GUNA_AI = [
    'Tulis emel/surat', 'Ringkas/terjemah dokumen', 'Tulis kod', 'Debug/baiki kod',
    'Cari maklumat', 'Analisa data', 'Brainstorm idea', 'Buat laporan', 'Lain-lain',
];
const OPT_CARA_GUNA = [
    'Taip prompt dalam browser kemudian copy-paste ke sistem',
    'Guna AI terbina dalam app',
    'Guna melalui API/coding tool',
    'Lain-lain',
];
const OPT_CARA_PROMPT = ['Ringkas satu ayat', 'Agak detail dengan konteks', 'Guna template', 'Tak pasti cara terbaik'];
const OPT_AI_CODING = ['Guna aktif', 'Pernah cuba', 'Pernah dengar sahaja', 'Tak pernah dengar'];
const OPT_PERANTI = ['Laptop Windows', 'Laptop Mac', 'Lain-lain'];

const SECTIONS = [
    { id: 'A', title: 'Maklumat Diri' },
    { id: 'B', title: 'Latar Belakang Kerja' },
    { id: 'C', title: 'Tahap Teknikal' },
    { id: 'D', title: 'Penggunaan AI Semasa' },
    { id: 'E', title: 'Matlamat & Harapan' },
    { id: 'F', title: 'Logistik & Kesediaan' },
];

type FormState = {
    namaPenuh: string;
    jawatan: string;
    emel: string;
    telefon: string;
    skopKerja: string;
    sistemUtama: string;
    kerjaMelibatkan: string[];
    kerjaMelibatkanLain: string;
    menulisKod: string;
    bahasaPengaturcaraan: string[];
    bahasaPengaturcaraanLain: string;
    toolTeknikal: string[];
    tahapKeselesaan: string;
    pernahBina: string;
    aiTools: string[];
    aiToolsLain: string;
    kekerapanAi: string;
    gunaAiUntuk: string[];
    gunaAiUntukLain: string;
    caraGunaAi: string[];
    caraGunaAiLain: string;
    caraPrompt: string;
    cabaranAi: string;
    aiCodingAssistant: string;
    harapBelajar: string;
    tugasAutomasi: string;
    projekCuba: string;
    peranti: string;
    keselesaanBI: string;
};

const EMPTY: FormState = {
    namaPenuh: '', jawatan: '', emel: '', telefon: '',
    skopKerja: '', sistemUtama: '', kerjaMelibatkan: [], kerjaMelibatkanLain: '', menulisKod: '',
    bahasaPengaturcaraan: [], bahasaPengaturcaraanLain: '', toolTeknikal: [], tahapKeselesaan: '', pernahBina: '',
    aiTools: [], aiToolsLain: '', kekerapanAi: '', gunaAiUntuk: [], gunaAiUntukLain: '',
    caraGunaAi: [], caraGunaAiLain: '', caraPrompt: '', cabaranAi: '', aiCodingAssistant: '',
    harapBelajar: '', tugasAutomasi: '', projekCuba: '',
    peranti: '', keselesaanBI: '',
};

export default function SurveyForm() {
    const [form, setForm] = useState<FormState>(EMPTY);
    const [errors, setErrors] = useState<Record<string, boolean>>({});
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const formRef = useRef<HTMLFormElement>(null);

    const set = (key: keyof FormState, value: string | string[]) =>
        setForm((f) => ({ ...f, [key]: value }));

    const toggleCheckbox = (key: keyof FormState, value: string) =>
        setForm((f) => {
            const arr = f[key] as string[];
            return {
                ...f,
                [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
            };
        });

    // Progress: peratus medan wajib yang telah diisi
    const requiredKeys: (keyof FormState)[] = ['namaPenuh', 'emel', 'skopKerja', 'harapBelajar'];
    const progress = useMemo(() => {
        const filled = requiredKeys.filter((k) => (form[k] as string).trim() !== '').length;
        return Math.round((filled / requiredKeys.length) * 100);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.namaPenuh, form.emel, form.skopKerja, form.harapBelajar]);

    const validate = () => {
        const next: Record<string, boolean> = {};
        if (!form.namaPenuh.trim()) next.namaPenuh = true;
        if (!form.emel.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.emel.trim())) next.emel = true;
        if (!form.skopKerja.trim()) next.skopKerja = true;
        if (!form.harapBelajar.trim()) next.harapBelajar = true;
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError('');
        if (!validate()) {
            // skrol ke medan ralat pertama
            const firstError = formRef.current?.querySelector('[data-error="true"]');
            firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
        setSubmitting(true);
        try {
            const res = await fetch('/api/survey', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error('bad response');
            setSubmitted(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch {
            setSubmitError(
                'Maaf, borang gagal dihantar. Sila semak sambungan internet anda dan cuba lagi. Jika masalah berterusan, hubungi penganjur.'
            );
        } finally {
            setSubmitting(false);
        }
    };

    // -----------------------------------------------------------------------
    // Skrin "Terima kasih"
    // -----------------------------------------------------------------------
    if (submitted) {
        return (
            <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
                <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-10 text-center">
                    <div className="w-20 h-20 mx-auto rounded-full bg-emerald-50 flex items-center justify-center mb-6">
                        <CheckCircle2 className="text-emerald-600" size={44} />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800 mb-3">Terima kasih!</h1>
                    <p className="text-slate-600 leading-relaxed">
                        Maklum balas anda telah berjaya dihantar. Maklumat ini akan membantu kami
                        menyesuaikan program training <span className="font-semibold">Vibecoding</span> mengikut
                        keperluan anda.
                    </p>
                    <p className="text-slate-500 text-sm mt-6">
                        Anda boleh menutup halaman ini. Jumpa di sesi training nanti! 🎉
                    </p>
                </div>
            </main>
        );
    }

    // -----------------------------------------------------------------------
    // Borang
    // -----------------------------------------------------------------------
    return (
        <main className="min-h-screen bg-slate-50 text-slate-800">
            {/* Header dengan ruang logo + progress */}
            <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-200 shadow-sm">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
                    <div className="relative w-11 h-11 sm:w-12 sm:h-12 shrink-0">
                        <Image
                            src="/mbsp-logo.png"
                            alt="Logo Majlis Bandaraya Seberang Perai"
                            fill
                            sizes="48px"
                            className="object-contain"
                            priority
                        />
                    </div>
                    <div className="min-w-0">
                        <p className="text-[11px] sm:text-xs font-semibold text-teal-700 uppercase tracking-wide leading-tight">
                            Majlis Bandaraya Seberang Perai
                        </p>
                        <h1 className="text-sm sm:text-base font-bold text-slate-800 leading-tight truncate">
                            Borang Tinjauan Peserta — Training Vibecoding
                        </h1>
                    </div>
                </div>
                <div className="h-1.5 w-full bg-slate-100">
                    <div
                        className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </header>

            <form ref={formRef} onSubmit={handleSubmit} noValidate className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
                {/* Intro */}
                <div className="bg-gradient-to-br from-teal-600 to-emerald-600 text-white rounded-3xl p-6 sm:p-8 shadow-lg">
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">Selamat Datang!</h2>
                    <p className="text-teal-50 text-sm sm:text-base leading-relaxed">
                        Borang ini bertujuan memahami latar belakang dan keperluan anda sebagai peserta program
                        training AI. Maklum balas anda akan membantu kami menyediakan sesi yang lebih bermanfaat
                        dan berkesan. Anggaran masa: <span className="font-semibold">5–8 minit</span>.
                    </p>
                    <p className="text-teal-100/80 text-xs mt-3">
                        Medan bertanda <span className="text-amber-200 font-bold">*</span> adalah wajib diisi.
                    </p>
                </div>

                {/* BAHAGIAN A */}
                <Section idx={0}>
                    <Field label="Nama penuh" required error={errors.namaPenuh}>
                        <input
                            type="text"
                            value={form.namaPenuh}
                            onChange={(e) => set('namaPenuh', e.target.value.toUpperCase())}
                            placeholder="cth: AHMAD BIN ABDULLAH"
                            className={inputCls(errors.namaPenuh)}
                            autoComplete="name"
                        />
                    </Field>
                    <Field label="Jawatan">
                        <input
                            type="text"
                            value={form.jawatan}
                            onChange={(e) => set('jawatan', e.target.value.toUpperCase())}
                            placeholder="cth: PEGAWAI TEKNOLOGI MAKLUMAT"
                            className={inputCls(false)}
                        />
                    </Field>
                    <Field label="Emel rasmi" required error={errors.emel}>
                        <input
                            type="email"
                            value={form.emel}
                            onChange={(e) => set('emel', e.target.value)}
                            placeholder="cth: nama@mbsp.gov.my"
                            className={inputCls(errors.emel)}
                            autoComplete="email"
                        />
                        {errors.emel && <p className="text-red-500 text-xs mt-1">Sila masukkan alamat emel yang sah.</p>}
                    </Field>
                    <Field label="No. telefon / WhatsApp" hint="Nombor sahaja, tanpa simbol">
                        <input
                            type="tel"
                            inputMode="numeric"
                            value={form.telefon}
                            onChange={(e) => set('telefon', e.target.value.replace(/\D/g, ''))}
                            placeholder="cth: 0123456789"
                            className={inputCls(false)}
                            autoComplete="tel"
                        />
                    </Field>
                </Section>

                {/* BAHAGIAN B */}
                <Section idx={1}>
                    <Field label="Skop kerja harian" required error={errors.skopKerja}>
                        <textarea
                            value={form.skopKerja}
                            onChange={(e) => set('skopKerja', e.target.value)}
                            rows={3}
                            placeholder="Terangkan secara ringkas tugas harian anda…"
                            className={textareaCls(errors.skopKerja)}
                        />
                    </Field>
                    <Field label="Sistem / perisian utama yang diguna setiap hari">
                        <input
                            type="text"
                            value={form.sistemUtama}
                            onChange={(e) => set('sistemUtama', e.target.value)}
                            placeholder="cth: Sistem ePBT, Microsoft Excel, SPP…"
                            className={inputCls(false)}
                        />
                    </Field>
                    <Field label="Kerja anda melibatkan" hint="Boleh pilih lebih dari satu">
                        <CheckboxGrid
                            options={OPT_KERJA}
                            selected={form.kerjaMelibatkan}
                            onToggle={(v) => toggleCheckbox('kerjaMelibatkan', v)}
                        />
                        {form.kerjaMelibatkan.includes('Lain-lain') && (
                            <LainInput
                                value={form.kerjaMelibatkanLain}
                                onChange={(v) => set('kerjaMelibatkanLain', v)}
                            />
                        )}
                    </Field>
                    <Field label="Menulis kod / skrip dalam kerja">
                        <RadioList
                            name="menulisKod"
                            options={OPT_MENULIS_KOD}
                            value={form.menulisKod}
                            onChange={(v) => set('menulisKod', v)}
                        />
                    </Field>
                </Section>

                {/* BAHAGIAN C */}
                <Section idx={2}>
                    <Field label="Bahasa pengaturcaraan yang biasa diguna" hint="Boleh pilih lebih dari satu">
                        <CheckboxGrid
                            options={OPT_BAHASA}
                            selected={form.bahasaPengaturcaraan}
                            onToggle={(v) => toggleCheckbox('bahasaPengaturcaraan', v)}
                        />
                        {form.bahasaPengaturcaraan.includes('Lain-lain') && (
                            <LainInput
                                value={form.bahasaPengaturcaraanLain}
                                onChange={(v) => set('bahasaPengaturcaraanLain', v)}
                            />
                        )}
                    </Field>
                    <Field label="Tool teknikal yang biasa diguna" hint="Boleh pilih lebih dari satu">
                        <CheckboxGrid
                            options={OPT_TOOL}
                            selected={form.toolTeknikal}
                            onToggle={(v) => toggleCheckbox('toolTeknikal', v)}
                        />
                    </Field>
                    <Field label="Tahap keselesaan teknikal anda" hint="1 = Tidak selesa langsung, 5 = Sangat selesa">
                        <ScalePicker
                            value={form.tahapKeselesaan}
                            onChange={(v) => set('tahapKeselesaan', v)}
                            lowLabel="Tidak selesa"
                            highLabel="Sangat selesa"
                        />
                    </Field>
                    <Field label="Pernah bina app / website / automation sendiri? Ceritakan">
                        <textarea
                            value={form.pernahBina}
                            onChange={(e) => set('pernahBina', e.target.value)}
                            rows={3}
                            placeholder="Jika ada, ceritakan secara ringkas. Jika tiada, boleh tinggalkan kosong."
                            className={textareaCls(false)}
                        />
                    </Field>
                </Section>

                {/* BAHAGIAN D */}
                <Section idx={3}>
                    <Field label="AI tools yang anda guna sekarang" hint="Boleh pilih lebih dari satu">
                        <CheckboxGrid
                            options={OPT_AI_TOOLS}
                            selected={form.aiTools}
                            onToggle={(v) => toggleCheckbox('aiTools', v)}
                        />
                        {form.aiTools.includes('Lain-lain') && (
                            <LainInput value={form.aiToolsLain} onChange={(v) => set('aiToolsLain', v)} />
                        )}
                    </Field>
                    <Field label="Kekerapan guna AI untuk kerja">
                        <RadioList
                            name="kekerapanAi"
                            options={OPT_KEKERAPAN}
                            value={form.kekerapanAi}
                            onChange={(v) => set('kekerapanAi', v)}
                        />
                    </Field>
                    <Field label="Anda guna AI untuk apa?" hint="Boleh pilih lebih dari satu">
                        <CheckboxGrid
                            options={OPT_GUNA_AI}
                            selected={form.gunaAiUntuk}
                            onToggle={(v) => toggleCheckbox('gunaAiUntuk', v)}
                        />
                        {form.gunaAiUntuk.includes('Lain-lain') && (
                            <LainInput value={form.gunaAiUntukLain} onChange={(v) => set('gunaAiUntukLain', v)} />
                        )}
                    </Field>
                    <Field label="Cara anda guna AI sekarang" hint="Boleh pilih lebih dari satu">
                        <CheckboxGrid
                            options={OPT_CARA_GUNA}
                            selected={form.caraGunaAi}
                            onToggle={(v) => toggleCheckbox('caraGunaAi', v)}
                        />
                        {form.caraGunaAi.includes('Lain-lain') && (
                            <LainInput value={form.caraGunaAiLain} onChange={(v) => set('caraGunaAiLain', v)} />
                        )}
                    </Field>
                    <Field label="Cara anda menulis prompt">
                        <RadioList
                            name="caraPrompt"
                            options={OPT_CARA_PROMPT}
                            value={form.caraPrompt}
                            onChange={(v) => set('caraPrompt', v)}
                        />
                    </Field>
                    <Field label="Cabaran terbesar guna AI sekarang">
                        <textarea
                            value={form.cabaranAi}
                            onChange={(e) => set('cabaranAi', e.target.value)}
                            rows={3}
                            placeholder="cth: Jawapan AI kadang tidak tepat, susah nak tulis prompt yang jelas, tak pasti AI mana sesuai untuk kerja saya…"
                            className={textareaCls(false)}
                        />
                    </Field>
                    <Field label="Pernah dengar / guna AI coding assistant (Copilot / Cursor / Claude Code)?">
                        <RadioList
                            name="aiCodingAssistant"
                            options={OPT_AI_CODING}
                            value={form.aiCodingAssistant}
                            onChange={(v) => set('aiCodingAssistant', v)}
                        />
                    </Field>
                </Section>

                {/* BAHAGIAN E */}
                <Section idx={4}>
                    <Field label="Apa yang anda paling harap belajar dari training ini?" required error={errors.harapBelajar}>
                        <textarea
                            value={form.harapBelajar}
                            onChange={(e) => set('harapBelajar', e.target.value)}
                            rows={3}
                            placeholder="Kongsikan harapan dan matlamat anda…"
                            className={textareaCls(errors.harapBelajar)}
                        />
                    </Field>
                    <Field label="Tugas berulang / manual yang boleh diautomasikan — terangkan">
                        <textarea
                            value={form.tugasAutomasi}
                            onChange={(e) => set('tugasAutomasi', e.target.value)}
                            rows={3}
                            placeholder="cth: Setiap minggu saya perlu salin data dari emel ke Excel secara manual…"
                            className={textareaCls(false)}
                        />
                    </Field>
                    <Field label="Projek yang anda nak cuba bina semasa / selepas training">
                        <input
                            type="text"
                            value={form.projekCuba}
                            onChange={(e) => set('projekCuba', e.target.value)}
                            placeholder="cth: Sistem rekod aduan ringkas, automasi laporan bulanan…"
                            className={inputCls(false)}
                        />
                    </Field>
                </Section>

                {/* BAHAGIAN F */}
                <Section idx={5}>
                    <Field label="Peranti yang akan anda guna semasa training">
                        <RadioList
                            name="peranti"
                            options={OPT_PERANTI}
                            value={form.peranti}
                            onChange={(v) => set('peranti', v)}
                        />
                    </Field>
                    <Field label="Tahap keselesaan dengan Bahasa Inggeris teknikal" hint="1 = Tidak selesa langsung, 5 = Sangat selesa">
                        <ScalePicker
                            value={form.keselesaanBI}
                            onChange={(v) => set('keselesaanBI', v)}
                            lowLabel="Tidak selesa"
                            highLabel="Sangat selesa"
                        />
                    </Field>
                </Section>

                {/* Ralat hantar */}
                {submitError && (
                    <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4">
                        <AlertCircle size={20} className="shrink-0 mt-0.5" />
                        <p className="text-sm">{submitError}</p>
                    </div>
                )}

                {/* Butang hantar */}
                <div className="pt-2 pb-4">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-base py-4 rounded-2xl shadow-lg shadow-teal-600/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99]"
                    >
                        {submitting ? (
                            <>
                                <Loader2 size={20} className="animate-spin" /> Sedang menghantar…
                            </>
                        ) : (
                            <>
                                <Send size={18} /> Hantar Borang
                            </>
                        )}
                    </button>
                    <p className="text-center text-xs text-slate-400 mt-4">
                        Program Training Vibecoding · Majlis Bandaraya Seberang Perai (MBSP)
                    </p>
                </div>
            </form>
        </main>
    );
}

// ---------------------------------------------------------------------------
// Komponen kecil
// ---------------------------------------------------------------------------
function inputCls(error?: boolean) {
    return `w-full rounded-xl border bg-white px-4 py-3 text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 ${
        error ? 'border-red-400 ring-2 ring-red-100' : 'border-slate-300'
    }`;
}
function textareaCls(error?: boolean) {
    return `${inputCls(error)} resize-y leading-relaxed`;
}

function Section({ idx, children }: { idx: number; children: React.ReactNode }) {
    const s = SECTIONS[idx];
    return (
        <section className="bg-white rounded-3xl shadow-sm border border-slate-100 p-5 sm:p-7">
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 shrink-0 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-bold text-lg">
                    {s.id}
                </div>
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-teal-600">Bahagian {s.id}</p>
                    <h3 className="text-lg font-bold text-slate-800 leading-tight">{s.title}</h3>
                </div>
            </div>
            <div className="space-y-6">{children}</div>
        </section>
    );
}

function Field({
    label, required, hint, error, children,
}: {
    label: string; required?: boolean; hint?: string; error?: boolean; children: React.ReactNode;
}) {
    return (
        <div data-error={error ? 'true' : 'false'}>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {hint && <p className="text-xs text-slate-400 mb-2 -mt-0.5">{hint}</p>}
            {children}
        </div>
    );
}

function CheckboxGrid({
    options, selected, onToggle,
}: {
    options: string[]; selected: string[]; onToggle: (v: string) => void;
}) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {options.map((opt) => {
                const active = selected.includes(opt);
                return (
                    <button
                        key={opt}
                        type="button"
                        onClick={() => onToggle(opt)}
                        className={`flex items-center gap-3 text-left rounded-xl border px-4 py-3 text-sm transition-all ${
                            active
                                ? 'border-teal-500 bg-teal-50 text-teal-800 font-medium'
                                : 'border-slate-300 bg-white text-slate-600 hover:border-teal-300 hover:bg-slate-50'
                        }`}
                    >
                        <span
                            className={`w-5 h-5 shrink-0 rounded-md border flex items-center justify-center ${
                                active ? 'bg-teal-600 border-teal-600' : 'border-slate-300'
                            }`}
                        >
                            {active && <CheckCircle2 size={14} className="text-white" />}
                        </span>
                        {opt}
                    </button>
                );
            })}
        </div>
    );
}

function RadioList({
    name, options, value, onChange,
}: {
    name: string; options: string[]; value: string; onChange: (v: string) => void;
}) {
    return (
        <div className="space-y-2">
            {options.map((opt) => {
                const active = value === opt;
                return (
                    <button
                        key={opt}
                        type="button"
                        onClick={() => onChange(opt)}
                        aria-pressed={active}
                        data-name={name}
                        className={`w-full flex items-center gap-3 text-left rounded-xl border px-4 py-3 text-sm transition-all ${
                            active
                                ? 'border-teal-500 bg-teal-50 text-teal-800 font-medium'
                                : 'border-slate-300 bg-white text-slate-600 hover:border-teal-300 hover:bg-slate-50'
                        }`}
                    >
                        <span
                            className={`w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center ${
                                active ? 'border-teal-600' : 'border-slate-300'
                            }`}
                        >
                            {active && <span className="w-2.5 h-2.5 rounded-full bg-teal-600" />}
                        </span>
                        {opt}
                    </button>
                );
            })}
        </div>
    );
}

function ScalePicker({
    value, onChange, lowLabel, highLabel,
}: {
    value: string; onChange: (v: string) => void; lowLabel: string; highLabel: string;
}) {
    return (
        <div>
            <div className="grid grid-cols-5 gap-2">
                {['1', '2', '3', '4', '5'].map((n) => {
                    const active = value === n;
                    return (
                        <button
                            key={n}
                            type="button"
                            onClick={() => onChange(n)}
                            className={`py-3 rounded-xl border font-bold text-lg transition-all ${
                                active
                                    ? 'border-teal-600 bg-teal-600 text-white shadow-md shadow-teal-600/20'
                                    : 'border-slate-300 bg-white text-slate-500 hover:border-teal-300 hover:bg-slate-50'
                            }`}
                        >
                            {n}
                        </button>
                    );
                })}
            </div>
            <div className="flex justify-between mt-2 text-xs text-slate-400">
                <span>{lowLabel}</span>
                <span>{highLabel}</span>
            </div>
        </div>
    );
}

function LainInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
    return (
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Sila nyatakan…"
            className={`${inputCls(false)} mt-2`}
            autoFocus
        />
    );
}
