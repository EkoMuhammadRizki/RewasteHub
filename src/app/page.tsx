"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SplashScreen from "@/components/SplashScreen";
import PageLoading from "@/components/PageLoading";
import {
    ArrowRight,
    Smartphone,
    BarChart3,
    Leaf,
    Star,
    Globe,
    Mail,
    Twitter,
    Instagram,
    Search,
    Menu,
    X,
} from "lucide-react";

/* ── Looping typing text hook ── */
function useTypingEffect(text: string, typeSpeed = 80, deleteSpeed = 45, pauseMs = 1800, startDelay = 600) {
    const [displayed, setDisplayed] = useState("");

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;
        let current = 0;
        let deleting = false;

        const tick = () => {
            if (!deleting) {
                current++;
                setDisplayed(text.slice(0, current));
                if (current >= text.length) {
                    deleting = true;
                    timeout = setTimeout(tick, pauseMs); // pause before deleting
                    return;
                }
                timeout = setTimeout(tick, typeSpeed);
            } else {
                current--;
                setDisplayed(text.slice(0, current));
                if (current <= 0) {
                    deleting = false;
                    timeout = setTimeout(tick, 500); // pause before re-typing
                    return;
                }
                timeout = setTimeout(tick, deleteSpeed);
            }
        };

        const start = setTimeout(tick, startDelay);
        return () => { clearTimeout(start); clearTimeout(timeout); };
    }, [text, typeSpeed, deleteSpeed, pauseMs, startDelay]);

    return displayed;
}

/* ── Individual stat card ── */
function StatCard({ stat }: { stat: { value: string; label: string } }) {
    return (
        <div className="text-center">
            <p className="text-xl sm:text-2xl font-extrabold text-emerald-600 tabular-nums">
                {stat.value}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">{stat.label}</p>
        </div>
    );
}

const features = [
    { icon: Smartphone, title: "Bank Sampah Digital", desc: "Setorkan sampah, dapatkan poin, tukarkan dengan hadiah menarik.", color: "from-emerald-400 to-emerald-600" },
    { icon: BarChart3, title: "Analitik Real-time", desc: "Dashboard interaktif memantau seluruh aktivitas pengelolaan sampahmu.", color: "from-teal-400 to-teal-600" },
    { icon: Leaf, title: "Pengolahan Organik", desc: "Panduan lengkap mengolah sampah organik menjadi kompos bernilai tinggi.", color: "from-cyan-400 to-emerald-500" },
];

const statsData = [
    { value: "12K+", label: "Pengguna" },
    { value: "250T", label: "Sampah Dikelola" },
    { value: "98%", label: "Kepuasan" },
];

const pageStats = [
    { value: "12K+", label: "Pengguna Aktif" },
    { value: "250T", label: "Sampah Dikelola" },
    { value: "98%", label: "Kepuasan Pengguna" },
    { value: "50+", label: "Mitra Kota" },
];

/* ── Animated Step Card ── */
function StepCard({ step }: { step: { num: string; icon: string; title: string; desc: string; delay: string } }) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
            { threshold: 0.2 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className="relative z-10 group"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0) scale(1)" : "translateY(28px) scale(0.95)",
                transition: `opacity 0.55s ease ${step.delay}, transform 0.55s ease ${step.delay}`,
            }}
        >
            {/* Card */}
            <div className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex sm:flex-col items-start sm:items-center sm:text-center gap-4 sm:gap-0 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl cursor-default">
                {/* Icon */}
                <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-2xl sm:text-3xl shadow-md group-hover:scale-110 transition-transform duration-300 sm:mb-4">
                    {step.icon}
                </div>
                {/* Text */}
                <div className="flex-1 sm:flex-none">
                    <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest block mb-1">{step.num}</span>
                    <h3 className="text-white font-extrabold text-sm sm:text-base mb-1 sm:mb-2">{step.title}</h3>
                    <p className="text-white/80 text-xs sm:text-sm leading-relaxed">{step.desc}</p>
                </div>
            </div>
        </div>
    );
}

export default function LandingPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [loadingMsg, setLoadingMsg] = useState("Memuat halaman...");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const line1 = useTypingEffect("REWASTEHUB", 90, 45, 1800, 3200);
    const line2 = useTypingEffect("CISEREUH", 90, 45, 1800, 4500);

    const handleNavigate = (href: string, msg: string) => {
        setLoadingMsg(msg);
        setLoading(true);
        setTimeout(() => router.push(href), 1500);
    };

    return (
        <div className="min-h-screen bg-white font-sans overflow-x-hidden">
            <SplashScreen />
            {loading && <PageLoading message={loadingMsg} />}

            {/* Global animation styles */}
            <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(3deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .float-anim { animation: float 3.5s ease-in-out infinite; }
        .float-slow { animation: floatSlow 5s ease-in-out infinite; }
        .fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
        .cursor-blink { animation: cursorBlink 0.8s step-end infinite; }
      `}</style>

            {/* ──────────── NAVBAR ──────────── */}
            <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-emerald-50 shadow-sm">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <Image src="/logo.png" alt="Rumah Sampah Digital" width={40} height={40} className="object-contain" />
                        <span className="font-bold text-slate-800 text-sm leading-tight hidden sm:block">RUMAH SAMPAH DIGITAL</span>
                    </div>

                    <div className="hidden md:flex items-center gap-6 lg:gap-8">
                        <button onClick={() => handleNavigate("/auth/register", "Menuju halaman daftar...")}
                            className="text-sm font-bold text-emerald-600 hover:text-emerald-700 uppercase tracking-wide transition-colors">Daftar/Masuk</button>
                        <a href="#" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 uppercase tracking-wide transition-colors">Beranda</a>
                        <a href="#tentang" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 uppercase tracking-wide transition-colors">Tentang</a>
                        <a href="#kontak" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 uppercase tracking-wide transition-colors">Kontak</a>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:border-emerald-300 transition-all">
                            <Search className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleNavigate("/auth/register", "Menuju halaman daftar...")}
                            className="hidden md:flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all hover:scale-105">
                            Mulai Sekarang
                        </button>
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500">
                            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-emerald-50 bg-white px-4 py-4 flex flex-col gap-4">
                        <button onClick={() => { handleNavigate("/auth/register", "Menuju halaman daftar..."); setMobileMenuOpen(false); }}
                            className="text-sm font-bold text-emerald-600 uppercase tracking-wide text-left">Daftar/Masuk</button>
                        <a href="#" className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Beranda</a>
                        <a href="#tentang" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Tentang</a>
                        <a href="#kontak" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Kontak</a>
                        <button onClick={() => { handleNavigate("/auth/register", "Memuat..."); setMobileMenuOpen(false); }}
                            className="w-full bg-emerald-500 text-white text-sm font-semibold py-3 rounded-xl flex items-center justify-center gap-2">
                            Mulai Sekarang <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </nav>

            {/* ──────────── HERO ──────────── */}
            <section className="relative min-h-[85vh] flex items-center px-4 sm:px-6 py-10 sm:py-16 overflow-hidden">
                {/* Soft bg blobs */}
                <div className="absolute inset-0 -z-10 pointer-events-none">
                    <div className="absolute top-[-80px] left-[-60px] w-[380px] h-[380px] rounded-full bg-emerald-100/70 blur-3xl" />
                    <div className="absolute bottom-[-60px] right-[-40px] w-[320px] h-[320px] rounded-full bg-teal-100/50 blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-emerald-50/40 blur-3xl" />
                </div>

                {/* Floating leaf decorations */}
                <span className="absolute top-16 right-12 text-3xl float-slow opacity-40 select-none hidden md:block">🌿</span>
                <span className="absolute bottom-24 left-8 text-2xl float-slow opacity-30 select-none hidden md:block" style={{ animationDelay: "1.2s" }}>♻️</span>
                <span className="absolute top-1/3 right-[15%] text-xl float-slow opacity-20 select-none hidden lg:block" style={{ animationDelay: "2s" }}>🌱</span>

                <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-8 md:gap-12 items-center">

                    {/* LEFT: Floating transparent illustration */}
                    <div className="flex items-center justify-center order-1 md:order-1">
                        <div className="relative float-anim rounded-3xl overflow-hidden bg-emerald-50/60 p-4 sm:p-6"
                            style={{ boxShadow: "0 24px 60px rgba(16,185,129,0.14), 0 4px 20px rgba(16,185,129,0.08)" }}>
                            <Image
                                src="/hero.png"
                                alt="Keluarga memilah sampah"
                                width={460}
                                height={420}
                                className="object-contain w-full max-w-[280px] sm:max-w-[360px] md:max-w-[420px]"
                                priority
                            />
                        </div>
                    </div>

                    {/* RIGHT: Content */}
                    <div className="order-2 md:order-2">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold px-4 py-2 rounded-full mb-5 fade-in-up" style={{ animationDelay: "0.2s" }}>
                            <Star className="w-3 h-3 fill-emerald-500" />
                            Platform Pengelolaan Sampah #1
                        </div>

                        {/* Typing title */}
                        <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-3">
                            <span className="text-emerald-600 block">
                                {line1}<span className="cursor-blink text-emerald-400">|</span>
                            </span>
                            <span className="text-slate-800 block">
                                {line2}<span className="cursor-blink text-slate-500">|</span>
                            </span>
                        </h1>

                        <p className="text-sm sm:text-base text-slate-500 leading-relaxed mb-6 sm:mb-8 max-w-sm fade-in-up" style={{ animationDelay: "0.4s" }}>
                            Situs Rumah Sampah Digital Kelurahan Ciseureuh — kelola sampah lebih cerdas, dapatkan poin, dan jaga lingkungan bersama.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-3 mb-8 sm:mb-10 fade-in-up" style={{ animationDelay: "0.5s" }}>
                            <button
                                onClick={() => handleNavigate("/auth/register", "Menuju halaman daftar...")}
                                className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3.5 rounded-2xl transition-all hover:scale-105 shadow-lg shadow-emerald-200 text-sm w-full sm:w-auto"
                            >
                                Mulai Sekarang <ArrowRight className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => handleNavigate("/dashboard", "Memuat demo...")}
                                className="flex items-center justify-center gap-2 border-2 border-emerald-200 text-emerald-700 font-semibold px-6 py-3.5 rounded-2xl hover:bg-emerald-50 transition-all text-sm w-full sm:w-auto"
                            >
                                Lihat Demo
                            </button>
                        </div>

                        {/* Animated stats */}
                        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100 fade-in-up" style={{ animationDelay: "0.6s" }}>
                            {statsData.map((s, i) => (
                                <StatCard key={i} stat={s} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ──────────── CARA KERJA ──────────── */}
            <section className="bg-emerald-500 py-12 sm:py-16 px-4 sm:px-6 overflow-hidden">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-10 sm:mb-12">
                        <span className="inline-block text-xs font-bold text-white/60 uppercase tracking-[0.25em] mb-2">
                            Cara Kerja
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                            3 Langkah Mudah Mulai Sekarang
                        </h2>
                        <p className="text-white/70 text-sm mt-2 max-w-md mx-auto">
                            Bergabung dan mulai kelola sampah cerdas hanya dalam hitungan menit.
                        </p>
                    </div>

                    {/* Steps grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 relative">


                        {[
                            {
                                num: "01",
                                icon: "📝",
                                title: "Daftar Akun",
                                desc: "Buat akun gratis dalam 1 menit. Cukup nama, email, dan kata sandi.",
                                delay: "0ms",
                            },
                            {
                                num: "02",
                                icon: "♻️",
                                title: "Setorkan Sampah",
                                desc: "Pilih jenis sampah, masukkan berat, dan catat setoran ke bank sampah.",
                                delay: "150ms",
                            },
                            {
                                num: "03",
                                icon: "🎁",
                                title: "Tukar Poin & Hadiah",
                                desc: "Kumpulkan poin dari setiap setoran lalu tukarkan dengan reward menarik.",
                                delay: "300ms",
                            },
                        ].map((step, i) => (
                            <StepCard key={i} step={step} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ──────────── FEATURES ──────────── */}
            <section id="tentang" className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-white to-emerald-50/30">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-10 sm:mb-14">
                        <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Fitur Unggulan</span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mt-3">
                            Semua yang kamu butuhkan,{" "}
                            <span className="gradient-text">dalam satu platform</span>
                        </h2>
                    </div>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
                        {features.map((feat, i) => {
                            const Icon = feat.icon;
                            return (
                                <div key={i} className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-sm border border-emerald-50 card-hover">
                                    <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br ${feat.color} flex items-center justify-center mb-4 sm:mb-5`}>
                                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                    </div>
                                    <h3 className="text-sm sm:text-base font-bold text-slate-800 mb-2 sm:mb-3">{feat.title}</h3>
                                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{feat.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ──────────── CTA BANNER ──────────── */}
            <section className="py-14 sm:py-20 px-4 sm:px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="rounded-2xl sm:rounded-3xl gradient-bg p-8 sm:p-12 shadow-xl shadow-emerald-200/50 relative overflow-hidden">
                        <div className="absolute -top-8 -right-8 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white/10" />
                        <div className="relative z-10 flex flex-col items-center text-center">
                            <Globe className="w-8 h-8 sm:w-10 sm:h-10 text-white/80 mb-4" />
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-3 sm:mb-4">Bergabung &amp; Mulai Berdampak</h2>
                            <p className="text-emerald-100/80 text-sm sm:text-base mb-6 sm:mb-8 max-w-md">Daftar gratis dan kelola sampahmu lebih cerdas mulai hari ini.</p>
                            <button
                                onClick={() => handleNavigate("/auth/register", "Menuju halaman daftar...")}
                                className="inline-flex items-center gap-2 bg-white text-emerald-700 font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl hover:bg-emerald-50 transition-all hover:scale-105 text-sm"
                            >
                                Daftar Gratis <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ──────────── FOOTER ──────────── */}
            <footer id="kontak" className="bg-slate-900 text-white py-10 sm:py-12 px-4 sm:px-6">
                <div className="max-w-5xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
                    <div className="sm:col-span-2 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <Image src="/logo.png" alt="Rumah Sampah Digital" width={40} height={40} className="object-contain" />
                            <span className="font-bold text-white text-sm">RUMAH SAMPAH DIGITAL</span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs">Platform pengelolaan sampah digital untuk Indonesia yang lebih hijau dan berkelanjutan.</p>
                        <div className="flex gap-3 mt-5">
                            {[Twitter, Instagram, Mail].map((Icon, i) => (
                                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-slate-700 transition-all">
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Produk</p>
                        {["Fitur", "Harga", "API", "Dokumentasi"].map((item) => (
                            <a key={item} href="#" className="block text-sm text-slate-400 hover:text-emerald-400 mb-2 transition-colors">{item}</a>
                        ))}
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Perusahaan</p>
                        {["Tentang Kami", "Blog", "Karir", "Kontak"].map((item) => (
                            <a key={item} href="#" className="block text-sm text-slate-400 hover:text-emerald-400 mb-2 transition-colors">{item}</a>
                        ))}
                    </div>
                </div>
                <div className="max-w-5xl mx-auto mt-8 sm:mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-xs">© 2026 Rumah Sampah Digital. All rights reserved.</p>
                    <div className="flex gap-4">
                        <a href="#" className="text-xs text-slate-500 hover:text-emerald-400 transition-colors">Privasi</a>
                        <a href="#" className="text-xs text-slate-500 hover:text-emerald-400 transition-colors">Ketentuan</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
