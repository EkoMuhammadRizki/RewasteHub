"use client";

import {
    Leaf,
    Thermometer,
    Clock,
    BookOpen,
    FlaskConical,
    Sprout,
    ArrowRight,
    CheckCircle2,
    Info,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import FloatingActions from "@/components/FloatingActions";
import BottomNav from "@/components/BottomNav";
import NotificationBanner from "@/components/NotificationBanner";
import clsx from "clsx";

const compostSteps = [
    { step: 1, title: "Kumpulkan Bahan", desc: "Pisahkan sampah organik: sisa makanan, daun, sayuran. Hindari daging & minyak.", icon: "🗑️" },
    { step: 2, title: "Cacah Bahan", desc: "Potong atau cacah bahan organik menjadi potongan kecil ≤ 5 cm agar cepat terurai.", icon: "✂️" },
    { step: 3, title: "Susun Lapisan", desc: "Susun bergantian: lapisan coklat (daun kering, karton) dan lapisan hijau (sisa makanan).", icon: "📚" },
    { step: 4, title: "Tambah Aktivator", desc: "Tambahkan EM4 atau cairan bioaktivator setiap 3-4 hari sekali.", icon: "🧪" },
    { step: 5, title: "Kelola Kelembapan", desc: "Jaga kelembapan seperti 'spons basah'. Aduk setiap 3 hari dan siram jika kering.", icon: "💧" },
    { step: 6, title: "Panen Kompos", desc: "Setelah 4-8 minggu, kompos siap panen. Cirinya: gelap, gembur, dan berbau tanah.", icon: "🌿" },
];

const projects = [
    { name: "Kompos Dapur RT 05", progress: 78, days: 14, status: "Aktif", color: "bg-emerald-500" },
    { name: "Biogas Sampah Organik", progress: 45, days: 8, status: "Aktif", color: "bg-teal-500" },
    { name: "Pupuk Cair Sayuran", progress: 100, days: 35, status: "Selesai", color: "bg-emerald-600" },
];

const tips = [
    { icon: "🌡️", title: "Suhu Ideal", desc: "Pertahankan suhu 50–65°C untuk dekomposisi optimal." },
    { icon: "💧", title: "Kelembapan", desc: "Kelembapan 50–60%. Jika terlalu kering, tambahkan air." },
    { icon: "🔄", title: "Aerasi", desc: "Aduk setiap 2–3 hari untuk sirkulasi udara yang baik." },
    { icon: "⚖️", title: "C:N Ratio", desc: "Perbandingan karbon & nitrogen ideal adalah 25–30:1." },
];

export default function OrganikPage() {
    return (
        <div className="min-h-screen bg-mint-50">
            <Sidebar activeId="organik" />

            <div className="md:pl-[240px] flex flex-col min-h-screen">
                <Header title="Pengolahan Organik" subtitle="Ubah sampah organik jadi kompos & biogas bernilai" />
                <NotificationBanner />

                <main className="flex-1 px-4 md:px-6 py-6 pb-24 md:pb-8 space-y-6">

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: "Kompos Diproduksi", value: "124 kg", icon: Leaf, gradient: "from-emerald-500 to-emerald-700" },
                            { label: "Proyek Aktif", value: "3", icon: FlaskConical, gradient: "from-teal-500 to-teal-700" },
                            { label: "CO₂ Dihemat", value: "92 kg", icon: Sprout, gradient: "from-cyan-500 to-emerald-600" },
                            { label: "Hari Rata-rata", value: "28 hari", icon: Clock, gradient: "from-emerald-400 to-teal-600" },
                        ].map((card, i) => {
                            const Icon = card.icon;
                            return (
                                <div key={i} className={`rounded-3xl p-5 bg-gradient-to-br ${card.gradient} shadow-md card-hover relative overflow-hidden`}>
                                    <div className="absolute -bottom-3 -right-3 w-16 h-16 rounded-full bg-white/10" />
                                    <div className="relative z-10">
                                        <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center mb-3">
                                            <Icon className="w-4 h-4 text-white" />
                                        </div>
                                        <p className="text-white/70 text-xs mb-1">{card.label}</p>
                                        <p className="text-white text-xl font-bold">{card.value}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Composting Steps */}
                        <div className="md:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-emerald-50">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center">
                                    <BookOpen className="w-4 h-4 text-emerald-700" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-800">Panduan Membuat Kompos</h3>
                                    <p className="text-xs text-slate-400">6 langkah mudah dari rumah</p>
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                {compostSteps.map((s) => (
                                    <div
                                        key={s.step}
                                        className="flex gap-3 p-4 rounded-2xl bg-emerald-50/50 hover:bg-emerald-50 transition-colors border border-emerald-100/60 card-hover"
                                    >
                                        <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">
                                            {s.step}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-1.5 mb-1">
                                                <span>{s.icon}</span>
                                                <p className="text-sm font-semibold text-slate-800">{s.title}</p>
                                            </div>
                                            <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Active Projects + Tips */}
                        <div className="flex flex-col gap-5">
                            {/* Active Projects */}
                            <div className="bg-white rounded-3xl p-5 shadow-sm border border-emerald-50 flex-1">
                                <h3 className="text-sm font-semibold text-slate-800 mb-4">Proyek Aktif</h3>
                                <div className="space-y-4">
                                    {projects.map((p, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between items-center mb-1.5">
                                                <p className="text-xs font-medium text-slate-700">{p.name}</p>
                                                <span className={clsx(
                                                    "text-xs font-medium px-2 py-0.5 rounded-full",
                                                    p.status === "Selesai" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                                                )}>
                                                    {p.status}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                    <div
                                                        className={clsx("h-full rounded-full transition-all", p.color)}
                                                        style={{ width: `${p.progress}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs text-slate-500 w-8">{p.progress}%</span>
                                            </div>
                                            <p className="text-xs text-slate-400 mt-1">{p.days} hari berjalan</p>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full mt-4 border-2 border-dashed border-emerald-200 text-emerald-600 text-xs font-medium py-2.5 rounded-xl hover:bg-emerald-50 transition-colors flex items-center justify-center gap-1">
                                    + Tambah Proyek Baru
                                </button>
                            </div>

                            {/* Quick Tips */}
                            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-5 border border-emerald-100">
                                <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                                    <Info className="w-4 h-4 text-emerald-600" />
                                    Parameter Kompos
                                </h3>
                                <div className="space-y-2.5">
                                    {tips.map((t, i) => (
                                        <div key={i} className="flex items-start gap-2.5">
                                            <span className="text-base leading-none mt-0.5">{t.icon}</span>
                                            <div>
                                                <p className="text-xs font-semibold text-slate-700">{t.title}</p>
                                                <p className="text-xs text-slate-500">{t.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Banner */}
                    <div className="rounded-3xl gradient-bg p-6 md:p-8 relative overflow-hidden">
                        <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/10" />
                        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div>
                                <p className="text-emerald-100/80 text-xs font-medium uppercase tracking-wider mb-1">Jadwal Pickup</p>
                                <h3 className="text-white text-xl font-bold">Sampah organikmu terlalu banyak?</h3>
                                <p className="text-emerald-100/70 text-sm mt-1">Kami siap menjemput dan mengolahnya menjadi kompos berkualitas.</p>
                            </div>
                            <button className="flex items-center gap-2 bg-white text-emerald-700 font-semibold px-6 py-3 rounded-2xl hover:bg-emerald-50 transition-all hover:scale-105 whitespace-nowrap">
                                Jadwalkan Pickup
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                </main>
            </div>

            <FloatingActions />
            <BottomNav activeId="organik" />
        </div>
    );
}
