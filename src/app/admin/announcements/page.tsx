"use client";

import { useState } from "react";
import {
    Plus,
    Trash2,
    ToggleLeft,
    ToggleRight,
    Megaphone,
    Wrench,
    AlertTriangle,
    Info,
    CheckCircle,
    Clock,
    Send,
} from "lucide-react";
import clsx from "clsx";
import AdminHeader from "@/components/AdminHeader";
import { useNotifications } from "@/lib/notifications";
import type { NotificationType } from "@/lib/notifications";

const typeOptions: { value: NotificationType; label: string; icon: React.ElementType; color: string }[] = [
    { value: "info", label: "Informasi", icon: Info, color: "border-blue-500 bg-blue-500/10 text-blue-400" },
    { value: "warning", label: "Peringatan", icon: AlertTriangle, color: "border-amber-500 bg-amber-500/10 text-amber-400" },
    { value: "maintenance", label: "Maintenance", icon: Wrench, color: "border-red-500 bg-red-500/10 text-red-400" },
    { value: "success", label: "Sukses", icon: CheckCircle, color: "border-emerald-500 bg-emerald-500/10 text-emerald-400" },
];

const typeBadgeStyle: Record<string, string> = {
    maintenance: "bg-red-900/30 text-red-300 border border-red-700/40",
    warning: "bg-amber-900/30 text-amber-300 border border-amber-700/40",
    info: "bg-blue-900/30 text-blue-300 border border-blue-700/40",
    success: "bg-emerald-900/30 text-emerald-300 border border-emerald-700/40",
};

const typeIconMap: Record<string, React.ElementType> = {
    maintenance: Wrench,
    warning: AlertTriangle,
    info: Info,
    success: CheckCircle,
};

function formatDate(iso: string) {
    return new Date(iso).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" });
}

export default function AnnouncementsPage() {
    const { notifications, addNotification, removeNotification, toggleNotification } =
        useNotifications();

    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [type, setType] = useState<NotificationType>("info");
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !message.trim()) return;
        addNotification({ title: title.trim(), message: message.trim(), type, active: true });
        setTitle("");
        setMessage("");
        setType("info");
        setSent(true);
        setTimeout(() => setSent(false), 3000);
    };

    return (
        <>
            <AdminHeader title="Kelola Pengumuman" subtitle="Buat & atur notifikasi untuk dashboard pengguna" />
            <main className="flex-1 px-5 py-6 space-y-6">

                {/* Form */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
                    <div className="flex items-center gap-2 mb-5">
                        <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
                            <Megaphone className="w-4 h-4 text-indigo-400" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-white">Buat Pengumuman Baru</h3>
                            <p className="text-xs text-slate-400">Akan langsung tampil di dashboard semua pengguna</p>
                        </div>
                    </div>

                    {sent && (
                        <div className="mb-4 flex items-center gap-2 bg-emerald-900/30 border border-emerald-700/40 rounded-xl px-4 py-3 text-emerald-300 text-sm">
                            <CheckCircle className="w-4 h-4 flex-shrink-0" />
                            Pengumuman berhasil dikirim! Sekarang tampil di dashboard user.
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Type selector */}
                        <div>
                            <label className="text-xs font-semibold text-slate-400 block mb-2">Tipe Pengumuman</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                {typeOptions.map((opt) => {
                                    const Icon = opt.icon;
                                    return (
                                        <button
                                            key={opt.value}
                                            type="button"
                                            onClick={() => setType(opt.value)}
                                            className={clsx(
                                                "flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all",
                                                type === opt.value
                                                    ? opt.color
                                                    : "border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-600"
                                            )}
                                        >
                                            <Icon className="w-4 h-4 flex-shrink-0" />
                                            {opt.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Title */}
                        <div>
                            <label className="text-xs font-semibold text-slate-400 block mb-1.5">Judul Pengumuman</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="cth. Maintenance Server Malam Ini"
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                required
                            />
                        </div>

                        {/* Message */}
                        <div>
                            <label className="text-xs font-semibold text-slate-400 block mb-1.5">Pesan</label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Tulis pesan yang akan ditampilkan di banner dashboard user..."
                                rows={3}
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-3 rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-indigo-900/40"
                        >
                            <Send className="w-4 h-4" />
                            Kirim Pengumuman
                        </button>
                    </form>
                </div>

                {/* List */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h3 className="text-sm font-semibold text-white">Daftar Pengumuman</h3>
                            <p className="text-xs text-slate-400 mt-0.5">{notifications.length} total &mdash; {notifications.filter(n => n.active).length} aktif</p>
                        </div>
                    </div>

                    {notifications.length === 0 ? (
                        <div className="text-center py-12">
                            <Megaphone className="w-10 h-10 text-slate-700 mx-auto mb-3" />
                            <p className="text-slate-500 text-sm">Belum ada pengumuman</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {notifications.map((n) => {
                                const Icon = typeIconMap[n.type] ?? Info;
                                return (
                                    <div
                                        key={n.id}
                                        className={clsx(
                                            "rounded-2xl border p-4 transition-all",
                                            n.active
                                                ? "bg-slate-800/70 border-slate-700"
                                                : "bg-slate-800/30 border-slate-800 opacity-60"
                                        )}
                                    >
                                        <div className="flex items-start gap-3">
                                            {/* Type badge */}
                                            <div className={clsx("flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center", typeBadgeStyle[n.type])}>
                                                <Icon className="w-4 h-4" />
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <p className="text-sm font-semibold text-white">{n.title}</p>
                                                    <span className={clsx("text-[10px] font-medium px-2 py-0.5 rounded-full capitalize", typeBadgeStyle[n.type])}>
                                                        {n.type}
                                                    </span>
                                                    <span className={clsx(
                                                        "text-[10px] font-medium px-2 py-0.5 rounded-full",
                                                        n.active
                                                            ? "bg-emerald-900/40 text-emerald-400"
                                                            : "bg-slate-700 text-slate-500"
                                                    )}>
                                                        {n.active ? "● Live" : "○ Nonaktif"}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{n.message}</p>
                                                <div className="flex items-center gap-1 mt-2 text-slate-600 text-[10px]">
                                                    <Clock className="w-3 h-3" />
                                                    {formatDate(n.createdAt)}
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center gap-1.5 flex-shrink-0">
                                                <button
                                                    onClick={() => toggleNotification(n.id)}
                                                    title={n.active ? "Nonaktifkan" : "Aktifkan"}
                                                    className={clsx(
                                                        "w-9 h-9 rounded-xl flex items-center justify-center transition-all",
                                                        n.active
                                                            ? "bg-emerald-900/30 text-emerald-400 hover:bg-emerald-900/50"
                                                            : "bg-slate-700 text-slate-400 hover:bg-slate-600"
                                                    )}
                                                >
                                                    {n.active
                                                        ? <ToggleRight className="w-5 h-5" />
                                                        : <ToggleLeft className="w-5 h-5" />
                                                    }
                                                </button>
                                                <button
                                                    onClick={() => removeNotification(n.id)}
                                                    title="Hapus"
                                                    className="w-9 h-9 rounded-xl bg-red-900/20 text-red-400 hover:bg-red-900/40 flex items-center justify-center transition-all"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

            </main>
        </>
    );
}
