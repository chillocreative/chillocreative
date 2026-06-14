'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Search, Eye, Trash2, X, Mail, Phone, Calendar, Briefcase,
    Download, ClipboardList, CheckCircle2, FileText,
} from 'lucide-react';

type Survey = {
    id: number;
    namaPenuh: string;
    jawatan: string | null;
    emel: string;
    telefon: string | null;
    skopKerja: string;
    sistemUtama: string | null;
    kerjaMelibatkan: string[] | null;
    kerjaMelibatkanLain: string | null;
    menulisKod: string | null;
    bahasaPengaturcaraan: string[] | null;
    bahasaPengaturcaraanLain: string | null;
    toolTeknikal: string[] | null;
    tahapKeselesaan: number | null;
    pernahBina: string | null;
    aiTools: string[] | null;
    aiToolsLain: string | null;
    kekerapanAi: string | null;
    gunaAiUntuk: string[] | null;
    gunaAiUntukLain: string | null;
    caraGunaAi: string[] | null;
    caraGunaAiLain: string | null;
    caraPrompt: string | null;
    cabaranAi: string | null;
    aiCodingAssistant: string | null;
    harapBelajar: string;
    tugasAutomasi: string | null;
    projekCuba: string | null;
    peranti: string | null;
    keselesaanBI: number | null;
    status: string;
    createdAt: string;
};

const STATUS_OPTIONS = ['Baru', 'Disemak', 'Dihubungi'];

export default function SurveyClient({ initialResponses }: { initialResponses: Survey[] }) {
    const [responses, setResponses] = useState<Survey[]>(initialResponses);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('Semua');
    const [current, setCurrent] = useState<Survey | null>(null);
    const [pdfLoading, setPdfLoading] = useState(false);
    const router = useRouter();

    const filtered = useMemo(
        () =>
            responses.filter((r) => {
                const q = search.toLowerCase();
                const matchSearch =
                    r.namaPenuh.toLowerCase().includes(q) ||
                    r.emel.toLowerCase().includes(q) ||
                    (r.jawatan || '').toLowerCase().includes(q) ||
                    (r.telefon || '').includes(search);
                const matchStatus = statusFilter === 'Semua' || r.status === statusFilter;
                return matchSearch && matchStatus;
            }),
        [responses, search, statusFilter]
    );

    const updateStatus = async (id: number, status: string) => {
        setResponses((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
        if (current?.id === id) setCurrent({ ...current, status });
        try {
            await fetch(`/api/survey/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            });
            router.refresh();
        } catch (e) {
            console.error(e);
        }
    };

    const remove = async (id: number) => {
        if (!confirm('Padam maklum balas ini? Tindakan ini tidak boleh dibatalkan.')) return;
        try {
            const res = await fetch(`/api/survey/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setResponses((prev) => prev.filter((r) => r.id !== id));
                if (current?.id === id) setCurrent(null);
                router.refresh();
            }
        } catch (e) {
            console.error(e);
        }
    };

    const exportCsv = () => {
        const cols: { key: keyof Survey; label: string }[] = [
            { key: 'id', label: 'ID' },
            { key: 'namaPenuh', label: 'Nama Penuh' },
            { key: 'jawatan', label: 'Jawatan' },
            { key: 'emel', label: 'Emel' },
            { key: 'telefon', label: 'Telefon' },
            { key: 'skopKerja', label: 'Skop Kerja' },
            { key: 'sistemUtama', label: 'Sistem Utama' },
            { key: 'kerjaMelibatkan', label: 'Kerja Melibatkan' },
            { key: 'kerjaMelibatkanLain', label: 'Kerja Melibatkan (Lain)' },
            { key: 'menulisKod', label: 'Menulis Kod' },
            { key: 'bahasaPengaturcaraan', label: 'Bahasa Pengaturcaraan' },
            { key: 'bahasaPengaturcaraanLain', label: 'Bahasa (Lain)' },
            { key: 'toolTeknikal', label: 'Tool Teknikal' },
            { key: 'tahapKeselesaan', label: 'Tahap Keselesaan' },
            { key: 'pernahBina', label: 'Pernah Bina' },
            { key: 'aiTools', label: 'AI Tools' },
            { key: 'aiToolsLain', label: 'AI Tools (Lain)' },
            { key: 'kekerapanAi', label: 'Kekerapan AI' },
            { key: 'gunaAiUntuk', label: 'Guna AI Untuk' },
            { key: 'gunaAiUntukLain', label: 'Guna AI (Lain)' },
            { key: 'caraGunaAi', label: 'Cara Guna AI' },
            { key: 'caraGunaAiLain', label: 'Cara Guna AI (Lain)' },
            { key: 'caraPrompt', label: 'Cara Prompt' },
            { key: 'cabaranAi', label: 'Cabaran AI' },
            { key: 'aiCodingAssistant', label: 'AI Coding Assistant' },
            { key: 'harapBelajar', label: 'Harap Belajar' },
            { key: 'tugasAutomasi', label: 'Tugas Automasi' },
            { key: 'projekCuba', label: 'Projek Cuba' },
            { key: 'peranti', label: 'Peranti' },
            { key: 'keselesaanBI', label: 'Keselesaan BI' },
            { key: 'status', label: 'Status' },
            { key: 'createdAt', label: 'Tarikh' },
        ];
        const esc = (v: unknown) => {
            const s = Array.isArray(v) ? v.join('; ') : v === null || v === undefined ? '' : String(v);
            return `"${s.replace(/"/g, '""')}"`;
        };
        const header = cols.map((c) => esc(c.label)).join(',');
        const rows = filtered.map((r) => cols.map((c) => esc(r[c.key])).join(','));
        const csv = '﻿' + [header, ...rows].join('\r\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `tinjauan-training-mbsp-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    // Hasilkan satu fail PDF yang mengumpulkan SEMUA respons (mengikut tapisan semasa),
    // setiap peserta pada muka surat tersendiri dengan susun atur penuh Bahagian A–F.
    const exportPdf = async () => {
        if (filtered.length === 0) return;
        setPdfLoading(true);
        try {
            const { jsPDF } = await import('jspdf');
            const doc = new jsPDF({ unit: 'pt', format: 'a4' });

            const pageW = doc.internal.pageSize.getWidth();
            const pageH = doc.internal.pageSize.getHeight();
            const margin = 40;
            const contentW = pageW - margin * 2;
            const labelW = 165;
            const valueX = margin + labelW + 12;
            const valueW = contentW - labelW - 12;
            const lineH = 13;

            const teal: [number, number, number] = [13, 148, 136];
            const grayTxt: [number, number, number] = [110, 116, 128];
            const darkTxt: [number, number, number] = [40, 44, 52];
            let y = margin;

            const fmt = (v: string | string[] | number | null, extra?: string | null) => {
                let base: string;
                if (v === null || v === undefined || v === '') base = '—';
                else if (Array.isArray(v)) base = v.length ? v.join(', ') : '—';
                else base = String(v);
                if (extra) base = base === '—' ? String(extra) : `${base}, ${extra}`;
                return base;
            };

            const ensure = (needed: number) => {
                if (y + needed > pageH - margin) {
                    doc.addPage();
                    y = margin;
                }
            };

            const group = (title: string) => {
                ensure(34);
                y += 8;
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(10);
                doc.setTextColor(...teal);
                doc.text(title.toUpperCase(), margin, y + 8);
                doc.setDrawColor(...teal);
                doc.setLineWidth(0.6);
                doc.line(margin, y + 13, pageW - margin, y + 13);
                y += 24;
            };

            const item = (label: string, value: string | string[] | number | null, extra?: string | null) => {
                doc.setFontSize(9);
                const labelLines = doc.splitTextToSize(label, labelW);
                const valueLines = doc.splitTextToSize(fmt(value, extra), valueW);
                const rowH = Math.max(labelLines.length, valueLines.length) * lineH + 6;
                ensure(rowH);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(...grayTxt);
                doc.text(labelLines, margin, y + lineH - 3);
                doc.setTextColor(...darkTxt);
                doc.text(valueLines, valueX, y + lineH - 3);
                y += rowH;
            };

            filtered.forEach((r, idx) => {
                if (idx > 0) doc.addPage();
                y = margin;

                // Tajuk dokumen pada setiap muka surat
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(15);
                doc.setTextColor(...darkTxt);
                doc.text('Tinjauan Training MBSP', margin, y + 6);
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(8);
                doc.setTextColor(...grayTxt);
                doc.text(`Peserta ${idx + 1} / ${filtered.length}`, pageW - margin, y + 6, { align: 'right' });
                y += 18;
                doc.setDrawColor(220, 220, 220);
                doc.setLineWidth(0.8);
                doc.line(margin, y, pageW - margin, y);
                y += 14;

                // Blok pengenalan peserta
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(13);
                doc.setTextColor(...teal);
                doc.text(doc.splitTextToSize((r.namaPenuh || '—').toUpperCase(), contentW), margin, y + 8);
                y += 20;
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(8.5);
                doc.setTextColor(...grayTxt);
                const meta = [
                    r.jawatan ? `Jawatan: ${r.jawatan}` : null,
                    `Emel: ${r.emel}`,
                    r.telefon ? `Tel: ${r.telefon}` : null,
                    `Status: ${r.status}`,
                    `Tarikh: ${new Date(r.createdAt).toLocaleString('en-GB')}`,
                ].filter(Boolean).join('   •   ');
                const metaLines = doc.splitTextToSize(meta, contentW);
                doc.text(metaLines, margin, y + 6);
                y += metaLines.length * 11 + 6;

                group('A · Maklumat Diri');
                item('Nama penuh', r.namaPenuh);
                item('Jawatan', r.jawatan);
                item('Emel rasmi', r.emel);
                item('No. telefon / WhatsApp', r.telefon);

                group('B · Latar Belakang Kerja');
                item('Skop kerja harian', r.skopKerja);
                item('Sistem / perisian utama', r.sistemUtama);
                item('Kerja melibatkan', r.kerjaMelibatkan, r.kerjaMelibatkanLain);
                item('Menulis kod / skrip', r.menulisKod);

                group('C · Tahap Teknikal');
                item('Bahasa pengaturcaraan', r.bahasaPengaturcaraan, r.bahasaPengaturcaraanLain);
                item('Tool teknikal', r.toolTeknikal);
                item('Tahap keselesaan teknikal', r.tahapKeselesaan ? `${r.tahapKeselesaan} / 5` : null);
                item('Pernah bina app/website/automation', r.pernahBina);

                group('D · Penggunaan AI Semasa');
                item('AI tools diguna', r.aiTools, r.aiToolsLain);
                item('Kekerapan guna AI', r.kekerapanAi);
                item('Guna AI untuk', r.gunaAiUntuk, r.gunaAiUntukLain);
                item('Cara guna AI', r.caraGunaAi, r.caraGunaAiLain);
                item('Cara menulis prompt', r.caraPrompt);
                item('Cabaran terbesar guna AI', r.cabaranAi);
                item('AI coding assistant', r.aiCodingAssistant);

                group('E · Matlamat & Harapan');
                item('Paling harap belajar', r.harapBelajar);
                item('Tugas berulang boleh diautomasi', r.tugasAutomasi);
                item('Projek nak cuba bina', r.projekCuba);

                group('F · Logistik & Kesediaan');
                item('Peranti yang akan diguna', r.peranti);
                item('Keselesaan Bahasa Inggeris teknikal', r.keselesaanBI ? `${r.keselesaanBI} / 5` : null);
            });

            // Nombor muka surat
            const total = doc.getNumberOfPages();
            for (let p = 1; p <= total; p++) {
                doc.setPage(p);
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(7.5);
                doc.setTextColor(...grayTxt);
                doc.text(`Muka surat ${p} / ${total}`, pageW / 2, pageH - 18, { align: 'center' });
            }

            doc.save(`tinjauan-training-mbsp-${new Date().toISOString().slice(0, 10)}.pdf`);
        } catch (e) {
            console.error('Gagal menjana PDF:', e);
            alert('Gagal menjana PDF. Sila cuba lagi.');
        } finally {
            setPdfLoading(false);
        }
    };

    const statusBadge = (status: string) =>
        status === 'Baru'
            ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
            : status === 'Disemak'
                ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                : 'bg-green-500/10 text-green-400 border-green-500/20';

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <ClipboardList className="text-teal-400" /> Tinjauan Vibecoding MBSP
                    </h1>
                    <p className="text-gray-400 mt-2">Maklum balas peserta program training — {responses.length} jumlah respons</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={exportPdf}
                        disabled={filtered.length === 0 || pdfLoading}
                        className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-bold transition-all"
                        title="Muat turun semua respons dalam satu fail PDF"
                    >
                        <FileText size={18} /> {pdfLoading ? 'Menjana…' : 'Muat Turun PDF'}
                    </button>
                    <button
                        onClick={exportCsv}
                        disabled={filtered.length === 0}
                        className="flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white rounded-lg font-bold transition-all"
                    >
                        <Download size={18} /> Eksport CSV
                    </button>
                </div>
            </div>

            {/* Filter bar */}
            <div className="flex flex-col md:flex-row gap-4 bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-md">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Cari nama, emel, jawatan…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-white focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-gray-900 border border-gray-700 rounded-lg py-2 px-4 text-white focus:ring-2 focus:ring-teal-500 outline-none"
                >
                    <option value="Semua">Semua status</option>
                    {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
            </div>

            {/* Table */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-900/50 text-gray-400 text-xs uppercase tracking-wider">
                                <th className="px-6 py-4 font-bold border-b border-gray-700">Peserta</th>
                                <th className="px-6 py-4 font-bold border-b border-gray-700">Jawatan</th>
                                <th className="px-6 py-4 font-bold border-b border-gray-700">Tarikh</th>
                                <th className="px-6 py-4 font-bold border-b border-gray-700">Status</th>
                                <th className="px-6 py-4 font-bold border-b border-gray-700 text-right">Tindakan</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {filtered.map((r) => (
                                <tr key={r.id} className="hover:bg-gray-750/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 rounded-full bg-gray-700 border border-gray-600 flex items-center justify-center text-teal-400 uppercase font-bold">
                                                {r.namaPenuh.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-white uppercase tracking-tight">{r.namaPenuh}</p>
                                                <span className="flex items-center text-xs text-gray-500 mt-1">
                                                    <Mail size={12} className="mr-1" /> {r.emel}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-300">{r.jawatan || '—'}</td>
                                    <td className="px-6 py-4 text-xs text-gray-500 font-bold">
                                        {new Date(r.createdAt).toLocaleDateString('en-GB')}
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={r.status}
                                            onChange={(e) => updateStatus(r.id, e.target.value)}
                                            onClick={(e) => e.stopPropagation()}
                                            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border bg-transparent outline-none cursor-pointer ${statusBadge(r.status)}`}
                                        >
                                            {STATUS_OPTIONS.map((s) => (
                                                <option key={s} value={s} className="bg-gray-900 text-white">{s}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button
                                                onClick={() => setCurrent(r)}
                                                className="p-2 text-gray-400 hover:text-teal-400 hover:bg-teal-500/10 rounded-lg transition-all"
                                                title="Lihat butiran"
                                            >
                                                <Eye size={18} />
                                            </button>
                                            <button
                                                onClick={() => remove(r.id)}
                                                className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                                                title="Padam"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500 italic">
                                        Tiada maklum balas dijumpai.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Detail modal */}
            {current && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                    <div className="bg-gray-800 border border-gray-700 rounded-2xl w-full max-w-2xl max-h-[90vh] shadow-2xl overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-gray-700 flex justify-between items-start bg-gray-800/50 shrink-0">
                            <div>
                                <h2 className="text-xl font-bold text-white uppercase tracking-tight">{current.namaPenuh}</h2>
                                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-400">
                                    {current.jawatan && <span className="flex items-center gap-1"><Briefcase size={12} /> {current.jawatan}</span>}
                                    <span className="flex items-center gap-1"><Mail size={12} /> {current.emel}</span>
                                    {current.telefon && <span className="flex items-center gap-1"><Phone size={12} /> {current.telefon}</span>}
                                    <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(current.createdAt).toLocaleString('en-GB')}</span>
                                </div>
                            </div>
                            <button onClick={() => setCurrent(null)} className="text-gray-400 hover:text-white shrink-0"><X size={24} /></button>
                        </div>

                        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
                            <Group title="A · Maklumat Diri">
                                <Item label="Nama penuh" value={current.namaPenuh} />
                                <Item label="Jawatan" value={current.jawatan} />
                                <Item label="Emel rasmi" value={current.emel} />
                                <Item label="No. telefon / WhatsApp" value={current.telefon} />
                            </Group>

                            <Group title="B · Latar Belakang Kerja">
                                <Item label="Skop kerja harian" value={current.skopKerja} />
                                <Item label="Sistem / perisian utama" value={current.sistemUtama} />
                                <Item label="Kerja melibatkan" value={current.kerjaMelibatkan} extra={current.kerjaMelibatkanLain} />
                                <Item label="Menulis kod / skrip" value={current.menulisKod} />
                            </Group>

                            <Group title="C · Tahap Teknikal">
                                <Item label="Bahasa pengaturcaraan" value={current.bahasaPengaturcaraan} extra={current.bahasaPengaturcaraanLain} />
                                <Item label="Tool teknikal" value={current.toolTeknikal} />
                                <Item label="Pernah bina app/website/automation" value={current.pernahBina} />
                            </Group>

                            <Group title="D · Penggunaan AI Semasa">
                                <Item label="AI tools diguna" value={current.aiTools} extra={current.aiToolsLain} />
                                <Item label="Kekerapan guna AI" value={current.kekerapanAi} />
                                <Item label="Guna AI untuk" value={current.gunaAiUntuk} extra={current.gunaAiUntukLain} />
                                <Item label="Cara guna AI" value={current.caraGunaAi} extra={current.caraGunaAiLain} />
                                <Item label="Cara menulis prompt" value={current.caraPrompt} />
                                <Item label="Cabaran terbesar guna AI" value={current.cabaranAi} />
                                <Item label="AI coding assistant" value={current.aiCodingAssistant} />
                            </Group>

                            <Group title="E · Matlamat & Harapan">
                                <Item label="Paling harap belajar" value={current.harapBelajar} />
                                <Item label="Tugas berulang boleh diautomasi" value={current.tugasAutomasi} />
                                <Item label="Projek nak cuba bina" value={current.projekCuba} />
                            </Group>

                            <Group title="F · Logistik & Kesediaan">
                                <Item label="Peranti yang akan diguna" value={current.peranti} />
                                <Item label="Keselesaan Bahasa Inggeris teknikal" value={current.keselesaanBI ? `${current.keselesaanBI} / 5` : null} />
                            </Group>
                        </div>

                        <div className="p-4 border-t border-gray-700 bg-gray-900/30 shrink-0 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500 uppercase font-bold">Status:</span>
                                <select
                                    value={current.status}
                                    onChange={(e) => updateStatus(current.id, e.target.value)}
                                    className="bg-gray-900 border border-gray-700 rounded-lg py-1.5 px-3 text-white text-xs font-bold uppercase focus:ring-2 focus:ring-teal-500 outline-none"
                                >
                                    {STATUS_OPTIONS.map((s) => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            </div>
                            <button
                                onClick={() => setCurrent(null)}
                                className="flex items-center gap-2 px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-bold text-sm transition-all"
                            >
                                <CheckCircle2 size={16} /> Selesai
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-teal-400 mb-3 pb-2 border-b border-gray-700/50">
                {title}
            </h3>
            <div className="space-y-3">{children}</div>
        </div>
    );
}

function Item({
    label, value, extra,
}: {
    label: string; value: string | string[] | number | null; extra?: string | null;
}) {
    const isEmpty =
        value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0);
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-3">
            <p className="text-xs text-gray-500 font-semibold sm:text-right">{label}</p>
            <div className="sm:col-span-2">
                {isEmpty ? (
                    <span className="text-gray-600 text-sm italic">—</span>
                ) : Array.isArray(value) ? (
                    <div className="flex flex-wrap gap-1.5">
                        {value.map((v) => (
                            <span key={v} className="px-2.5 py-1 bg-gray-700/50 border border-gray-600 rounded-lg text-xs text-gray-200">
                                {v}
                            </span>
                        ))}
                        {extra && (
                            <span className="px-2.5 py-1 bg-teal-500/10 border border-teal-500/30 rounded-lg text-xs text-teal-300">
                                {extra}
                            </span>
                        )}
                    </div>
                ) : (
                    <p className="text-sm text-gray-200 whitespace-pre-wrap leading-relaxed">{String(value)}</p>
                )}
            </div>
        </div>
    );
}
