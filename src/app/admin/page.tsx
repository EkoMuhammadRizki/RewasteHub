"use client";

import {
    Users,
    Megaphone,
    Weight,
    TrendingUp,
    ArrowRight,
    Bell,
    CheckCircle,
    AlertTriangle,
    Info,
    Wrench,
} from "lucide-react";
import Link from "next/link";
import AdminHeader from "@/components/AdminHeader";
import { useNotifications } from "@/lib/notifications";
import clsx from "clsx";

const overviewStats = [
    { label: "Total Pengguna", value: "12.480", icon: Users, gradient: "from-indigo-500 to-indigo-700", sub: "+124 bulan ini" },
    { label: "Total Setoran", value: "47 Ton", icon: Weight, gradient: "from-violet-500 to-violet-700", sub: "sampah dikelola" },
    { label: "Poin Beredar", value: "1.2 Jt", icon: TrendingUp, gradient: "from-purple-500 to-purple-700", sub: "di semua akun" },
    { label: "Notif Aktif", value: "–", icon: Megaphone, gradient: "from-rose-500 to-rose-700", sub: "pengumuman live" },
];

const typeIcon: Record<string, React.ElementType> = {
    maintenance: Wrench,
    warning: AlertTriangle,
    info: Info,
    success: CheckCircle,
};

const typeBadge: Record<string, string> = {
    maintenance: "bg-red-900/40 text-red-300 border-red-700/40",
    warning: "bg-amber-900/40 text-amber-300 border-amber-700/40",
    info: "bg-blue-900/40 text-blue-300 border-blue-700/40",
    success: "bg-emerald-900/40 text-emerald-300 border-emerald-700/40",
};

export default function AdminPage() {
    const { notifications, activeNotifications } = useNotifications();

    const statsWithCount = overviewStats.map((s) =>
        s.label === "Notif Aktif" ? { ...s, value: String(activeNotifications.length) } : s
    );

    return (
        <>
            <AdminHeader title="Overview" subtitle="Ringkasan sistem RewasteHub" />
            <main className="flex-1 px-5 py-6 space-y-6">

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {statsWithCount.map((card, i) => {
                        const Icon = card.icon;
                        return (
                            <div
                                key={i}
                                className={clsx(
                                    "rounded-2xl p-5 bg-gradient-to-br shadow-lg relative overflow-hidden",
                                    card.gradient
                                )}
                            >
                                <div className="absolute -bottom-3 -right-3 w-14 h-14 rounded-full bg-white/10" />
                                <div className="relative z-10">
                                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center mb-3">
                                        <Icon className="w-4 h-4 text-white" />
                                    </div>
                                    <p className="text-white/70 text-xs mb-0.5">{card.label}</p>
                                    <p className="text-white text-2xl font-bold">{card.value}</p>
                                    <p className="text-white/50 text-xs mt-1">{card.sub}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Quick links */}
                <div className="grid md:grid-cols-2 gap-5">
                    {/* Recent notifications */}
                    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Megaphone className="w-4 h-4 text-indigo-400" />
                                <h3 className="text-sm font-semibold text-white">Pengumuman Terbaru</h3>
                            </div>
                            <Link
                                href="/admin/announcements"
                                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
                            >
                                Kelola <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>

                        {notifications.length === 0 ? (
                            <div className="text-center py-8">
                                <Bell className="w-8 h-8 text-slate-700 mx-auto mb-2" />
                                <p className="text-slate-500 text-sm">Belum ada pengumuman</p>
                                <Link href="/admin/announcements" className="text-xs text-indigo-400 mt-1 inline-block hover:underline">
                                    Buat sekarang →
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {notifications.slice(0, 4).map((n) => {
                                    const Icon = typeIcon[n.type] ?? Info;
                                    return (
                                        <div
                                            key={n.id}
                                            className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/50"
                                        >
                                            <div className={clsx("flex-shrink-0 w-7 h-7 rounded-lg border flex items-center justify-center", typeBadge[n.type])}>
                                                <Icon className="w-3.5 h-3.5" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-white truncate">{n.title}</p>
                                                <p className="text-xs text-slate-400 truncate">{n.message}</p>
                                            </div>
                                            <span className={clsx(
                                                "flex-shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-full",
                                                n.active
                                                    ? "bg-emerald-900/40 text-emerald-400"
                                                    : "bg-slate-700 text-slate-500"
                                            )}>
                                                {n.active ? "Aktif" : "Off"}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Quick actions */}
                    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5">
                        <h3 className="text-sm font-semibold text-white mb-4">⚡ Aksi Cepat</h3>
                        <div className="space-y-2.5">
                            {[
                                { label: "Buat Pengumuman Baru", href: "/admin/announcements", icon: Megaphone, color: "text-indigo-400" },
                                { label: "Kirim Maintenance Alert", href: "/admin/announcements", icon: Wrench, color: "text-red-400" },
                                { label: "Lihat Dashboard User", href: "/dashboard", icon: TrendingUp, color: "text-emerald-400" },
                            ].map((a, i) => {
                                const Icon = a.icon;
                                return (
                                    <Link
                                        key={i}
                                        href={a.href}
                                        className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 hover:border-indigo-500/40 hover:bg-slate-800 transition-all group"
                                    >
                                        <Icon className={clsx("w-4 h-4", a.color)} />
                                        <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{a.label}</span>
                                        <ArrowRight className="w-3.5 h-3.5 text-slate-600 ml-auto group-hover:text-slate-400 transition-colors" />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>

            </main>
        </>
    );
}
