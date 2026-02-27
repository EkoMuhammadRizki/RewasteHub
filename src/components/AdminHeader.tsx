"use client";

import { Bell, ShieldCheck } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useNotifications } from "@/lib/notifications";

interface AdminHeaderProps {
    title?: string;
    subtitle?: string;
}

export default function AdminHeader({
    title = "Admin Panel",
    subtitle = "Kelola sistem RewasteHub",
}: AdminHeaderProps) {
    const { user } = useAuth();
    const { activeNotifications } = useNotifications();
    const userName = user?.name || "Admin";
    const userInitial = userName.charAt(0).toUpperCase();

    return (
        <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-6 py-4">
            <div className="flex items-center justify-between">
                {/* Title */}
                <div>
                    <h1 className="text-lg font-semibold text-white">{title}</h1>
                    <p className="text-sm text-slate-400">{subtitle}</p>
                </div>

                {/* Right */}
                <div className="flex items-center gap-3">
                    {/* Notif bell — show how many active notifs */}
                    <div className="relative">
                        <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
                            <Bell className="w-4 h-4" />
                        </div>
                        {activeNotifications.length > 0 && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-indigo-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-slate-950">
                                {activeNotifications.length}
                            </span>
                        )}
                    </div>

                    {/* User chip */}
                    <div className="flex items-center gap-2.5 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                            <span className="text-white text-xs font-bold">{userInitial}</span>
                        </div>
                        <div className="hidden sm:block">
                            <p className="text-xs font-semibold text-white leading-none">{userName}</p>
                            <div className="flex items-center gap-1 mt-0.5">
                                <ShieldCheck className="w-2.5 h-2.5 text-indigo-400" />
                                <p className="text-[10px] text-indigo-400 font-medium">Administrator</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
