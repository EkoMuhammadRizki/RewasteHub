"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Search, X, Wrench, AlertTriangle, Info, CheckCircle } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useNotifications } from "@/lib/notifications";
import type { NotificationType } from "@/lib/notifications";
import clsx from "clsx";

const typeIcon: Record<NotificationType, React.ElementType> = {
    maintenance: Wrench,
    warning: AlertTriangle,
    info: Info,
    success: CheckCircle,
};
const typeDot: Record<NotificationType, string> = {
    maintenance: "bg-red-500",
    warning: "bg-amber-500",
    info: "bg-blue-500",
    success: "bg-emerald-500",
};

interface HeaderProps {
    title?: string;
    subtitle?: string;
}

export default function Header({
    title = "Dashboard",
    subtitle = "Selamat datang kembali!",
}: HeaderProps) {
    const { user } = useAuth();
    const { activeNotifications } = useNotifications();
    const [bellOpen, setBellOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const userName = user?.name || "Member";
    const userInitial = userName.charAt(0).toUpperCase();
    const userRole = user?.role === "admin" ? "Admin" : "Member";

    // Close dropdown on outside click
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setBellOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    return (
        <header className="sticky top-0 z-30 bg-mint-50/80 backdrop-blur-md border-b border-emerald-100 px-6 py-4">
            <div className="flex items-center justify-between max-w-full">
                {/* Page Title */}
                <div>
                    <h1 className="text-lg font-semibold text-slate-800">{title}</h1>
                    <p className="text-sm text-slate-400">{subtitle}</p>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-3">
                    {/* Search */}
                    <div className="hidden sm:flex items-center gap-2 bg-white rounded-xl px-3 py-2 border border-emerald-100 shadow-sm">
                        <Search className="w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Cari..."
                            className="text-sm outline-none text-slate-600 placeholder:text-slate-400 bg-transparent w-36"
                        />
                    </div>

                    {/* Notification Bell with dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setBellOpen(!bellOpen)}
                            className="relative w-10 h-10 rounded-xl bg-white border border-emerald-100 shadow-sm flex items-center justify-center text-slate-500 hover:border-emerald-300 hover:text-emerald-600 transition-all duration-200"
                        >
                            <Bell className="w-4 h-4" />
                            {activeNotifications.length > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                                    {activeNotifications.length > 9 ? "9+" : activeNotifications.length}
                                </span>
                            )}
                        </button>

                        {/* Dropdown */}
                        {bellOpen && (
                            <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl border border-emerald-100 shadow-xl z-50 overflow-hidden">
                                {/* Header */}
                                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                                    <div className="flex items-center gap-2">
                                        <Bell className="w-3.5 h-3.5 text-slate-500" />
                                        <span className="text-sm font-semibold text-slate-700">Notifikasi</span>
                                        {activeNotifications.length > 0 && (
                                            <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                                {activeNotifications.length}
                                            </span>
                                        )}
                                    </div>
                                    <button onClick={() => setBellOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* List */}
                                <div className="max-h-72 overflow-y-auto">
                                    {activeNotifications.length === 0 ? (
                                        <div className="text-center py-8">
                                            <Bell className="w-7 h-7 text-slate-300 mx-auto mb-2" />
                                            <p className="text-xs text-slate-400">Tidak ada notifikasi</p>
                                        </div>
                                    ) : (
                                        activeNotifications.map((n) => {
                                            const Icon = typeIcon[n.type];
                                            return (
                                                <div key={n.id} className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 border-b border-slate-50 last:border-0 transition-colors">
                                                    <div className={clsx("flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center mt-0.5", typeDot[n.type].replace("bg-", "bg-") + "/10")}>
                                                        <Icon className={clsx("w-3.5 h-3.5", typeDot[n.type].replace("bg-", "text-"))} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs font-semibold text-slate-700">{n.title}</p>
                                                        <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{n.message}</p>
                                                    </div>
                                                    <div className={clsx("flex-shrink-0 w-2 h-2 rounded-full mt-2", typeDot[n.type])} />
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* User Avatar */}
                    <div className="flex items-center gap-2.5 bg-white border border-emerald-100 shadow-sm rounded-xl px-3 py-2 cursor-pointer hover:border-emerald-300 transition-all duration-200">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                            <span className="text-white text-xs font-bold">{userInitial}</span>
                        </div>
                        <div className="hidden sm:block">
                            <p className="text-xs font-semibold text-slate-700 leading-none">{userName}</p>
                            <p className="text-xs text-slate-400 mt-0.5">{userRole}</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
