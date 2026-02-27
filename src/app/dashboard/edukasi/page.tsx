"use client";

import {
    BookOpen,
    Play,
    Award,
    Users,
    Clock,
    Star,
    ChevronRight,
    Lightbulb,
    Target,
    Recycle,
    TreePine,
    Droplets,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import FloatingActions from "@/components/FloatingActions";
import BottomNav from "@/components/BottomNav";
import NotificationBanner from "@/components/NotificationBanner";
import clsx from "clsx";

const categories = [
    { id: "all", label: "Semua" },
    { id: "dasar", label: "Dasar" },
    { id: "kompos", label: "Kompos" },
    { id: "daur-ulang", label: "Daur Ulang" },
    { id: "energi", label: "Energi" },
];

const courses = [
    {
        id: 1,
        title: "Pengenalan Pengelolaan Sampah",
        desc: "Memahami jenis-jenis sampah dan pentingnya pengelolaan yang baik untuk lingkungan.",
        category: "Dasar",
        duration: "30 menit",
        modules: 5,
        rating: 4.9,
        students: 1240,
        completed: true,
        emoji: "♻️",
        color: "from-emerald-400 to-emerald-600",
    },
    {
        id: 2,
        title: "Cara Membuat Kompos di Rumah",
        desc: "Panduan praktis membuat kompos dari sisa makanan dan limbah dapur.",
        category: "Kompos",
        duration: "45 menit",
        modules: 7,
        rating: 4.8,
        students: 892,
        completed: true,
        emoji: "🌱",
        color: "from-teal-400 to-teal-600",
    },
    {
        id: 3,
        title: "Daur Ulang Plastik Kreatif",
        desc: "Transformasikan sampah plastik menjadi produk bernilai ekonomi tinggi.",
        category: "Daur Ulang",
        duration: "60 menit",
        modules: 8,
        rating: 4.7,
        students: 654,
        completed: false,
        progress: 60,
        emoji: "🎨",
        color: "from-cyan-400 to-emerald-500",
    },
    {
        id: 4,
        title: "Biogas dari Sampah Organik",
        desc: "Pelajari cara menghasilkan energi terbarukan dari limbah organik rumah tangga.",
        category: "Energi",
        duration: "50 menit",
        modules: 6,
        rating: 4.9,
        students: 445,
        completed: false,
        progress: 0,
        emoji: "⚡",
        color: "from-emerald-500 to-cyan-600",
    },
    {
        id: 5,
        title: "Gaya Hidup Zero Waste",
        desc: "Tips dan strategi praktis mengurangi produksi sampah dalam kehidupan sehari-hari.",
        category: "Dasar",
        duration: "40 menit",
        modules: 6,
        rating: 4.8,
        students: 1089,
        completed: false,
        progress: 0,
        emoji: "🌍",
        color: "from-emerald-400 to-teal-500",
    },
    {
        id: 6,
        title: "Vermikompos dengan Cacing",
        desc: "Teknik pembuatan kompos menggunakan cacing tanah untuk hasil yang lebih cepat.",
        category: "Kompos",
        duration: "35 menit",
        modules: 5,
        rating: 4.6,
        students: 321,
        completed: false,
        progress: 0,
        emoji: "🪱",
        color: "from-teal-500 to-emerald-600",
    },
];

const achievements = [
    { icon: "🏆", title: "Pejuang Lingkungan", desc: "Selesaikan 5 kursus", earned: true },
    { icon: "🌱", title: "Kompos Master", desc: "Selesaikan semua kursus kompos", earned: true },
    { icon: "♻️", title: "Daur Ulang Pro", desc: "Selesaikan 3 kursus daur ulang", earned: false },
    { icon: "⚡", title: "Energi Hijau", desc: "Selesaikan kursus energi terbarukan", earned: false },
];

const quizItems = [
    { q: "Sampah organik harus dipisahkan dari anorganik karena...", points: 50 },
    { q: "Berapa lama rata-rata membuat kompos dari sampah dapur?", points: 75 },
    { q: "Apa fungsi EM4 dalam proses pengomposan?", points: 100 },
];

export default function EdukasiPage() {
    return (
        <div className="min-h-screen bg-mint-50">
            <Sidebar activeId="edukasi" />

            <div className="md:pl-[240px] flex flex-col min-h-screen">
                <Header title="Pusat Edukasi" subtitle="Tingkatkan pengetahuan lingkunganmu" />
                <NotificationBanner />

                <main className="flex-1 px-4 md:px-6 py-6 pb-24 md:pb-8 space-y-6">

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: "Kursus Selesai", value: "2 / 6", icon: BookOpen, gradient: "from-emerald-500 to-emerald-700" },
                            { label: "Poin Edukasi", value: "1.250", icon: Star, gradient: "from-teal-500 to-teal-700" },
                            { label: "Sertifikat", value: "2", icon: Award, gradient: "from-cyan-500 to-emerald-600" },
                            { label: "Streak Belajar", value: "7 hari", icon: Target, gradient: "from-emerald-400 to-teal-600" },
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

                    {/* Category Filters */}
                    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                        {categories.map((cat, i) => (
                            <button
                                key={cat.id}
                                className={clsx(
                                    "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all",
                                    i === 0
                                        ? "bg-emerald-500 text-white shadow-sm"
                                        : "bg-white text-slate-600 border border-slate-200 hover:border-emerald-300 hover:text-emerald-600"
                                )}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Course Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {courses.map((course) => (
                            <div
                                key={course.id}
                                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-emerald-50 card-hover group"
                            >
                                {/* Course header */}
                                <div className={clsx("bg-gradient-to-br p-6 relative overflow-hidden", course.color)}>
                                    <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-white/10" />
                                    <span className="text-4xl">{course.emoji}</span>
                                    <div className="flex items-center gap-2 mt-3">
                                        <span className="text-xs font-medium bg-white/20 text-white px-2 py-0.5 rounded-full">
                                            {course.category}
                                        </span>
                                        {course.completed && (
                                            <span className="text-xs font-medium bg-white/20 text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                                                ✓ Selesai
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Course content */}
                                <div className="p-5">
                                    <h3 className="text-sm font-bold text-slate-800 mb-2 leading-snug">{course.title}</h3>
                                    <p className="text-xs text-slate-500 leading-relaxed mb-4">{course.desc}</p>

                                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-4">
                                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span>
                                        <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{course.modules} modul</span>
                                        <span className="flex items-center gap-1"><Users className="w-3 h-3" />{course.students.toLocaleString()}</span>
                                        <span className="flex items-center gap-1 text-amber-500"><Star className="w-3 h-3 fill-amber-400" />{course.rating}</span>
                                    </div>

                                    {/* Progress bar for in-progress courses */}
                                    {!course.completed && course.progress !== undefined && course.progress > 0 && (
                                        <div className="mb-4">
                                            <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                                                <span>Progress</span>
                                                <span>{course.progress}%</span>
                                            </div>
                                            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-emerald-400 rounded-full"
                                                    style={{ width: `${course.progress}%` }}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <button className={clsx(
                                        "w-full text-sm font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all",
                                        course.completed
                                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                            : "gradient-bg text-white hover:opacity-90 hover:scale-[1.01] shadow-sm shadow-emerald-200"
                                    )}>
                                        {course.completed ? (
                                            <><Award className="w-4 h-4" /> Lihat Sertifikat</>
                                        ) : course.progress && course.progress > 0 ? (
                                            <><Play className="w-4 h-4" /> Lanjutkan</>
                                        ) : (
                                            <><Play className="w-4 h-4" /> Mulai Belajar</>
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Achievements */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-50">
                            <div className="flex items-center gap-2 mb-5">
                                <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center">
                                    <Award className="w-4 h-4 text-amber-600" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-800">Pencapaianmu</h3>
                                    <p className="text-xs text-slate-400">2 dari 4 badge diraih</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {achievements.map((a, i) => (
                                    <div key={i} className={clsx(
                                        "p-4 rounded-2xl border text-center",
                                        a.earned ? "bg-amber-50 border-amber-100" : "bg-slate-50 border-slate-100 opacity-50"
                                    )}>
                                        <span className="text-2xl">{a.icon}</span>
                                        <p className="text-xs font-semibold text-slate-800 mt-2">{a.title}</p>
                                        <p className="text-xs text-slate-400 mt-0.5">{a.desc}</p>
                                        {a.earned && <span className="text-xs text-amber-600 font-medium mt-1 block">✓ Diraih</span>}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Daily Quiz */}
                        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-6 relative overflow-hidden">
                            <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/10" />
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                                        <Lightbulb className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-white">Kuis Harian</h3>
                                        <p className="text-xs text-emerald-100/70">Raih poin ekstra!</p>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-5">
                                    {quizItems.map((q, i) => (
                                        <div key={i} className="bg-white/15 rounded-2xl p-3 flex items-start justify-between gap-2">
                                            <p className="text-xs text-white/90 leading-relaxed flex-1">{q.q}</p>
                                            <span className="text-xs text-emerald-200 font-bold whitespace-nowrap">+{q.points} pts</span>
                                        </div>
                                    ))}
                                </div>

                                <button className="w-full bg-white text-emerald-700 font-bold py-3 rounded-2xl hover:bg-emerald-50 transition-all hover:scale-[1.01] flex items-center justify-center gap-2 text-sm">
                                    Mulai Kuis Sekarang
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                </main>
            </div>

            <FloatingActions />
            <BottomNav activeId="edukasi" />
        </div>
    );
}
