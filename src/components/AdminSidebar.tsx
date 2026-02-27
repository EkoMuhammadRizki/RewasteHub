"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Megaphone,
    Users,
    BarChart3,
    Settings,
    LogOut,
    ShieldCheck,
} from "lucide-react";
import clsx from "clsx";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";

const adminNavItems = [
    { id: "dashboard", label: "Overview", icon: LayoutDashboard, href: "/admin" },
    { id: "announcements", label: "Kelola Pengumuman", icon: Megaphone, href: "/admin/announcements" },
    { id: "users", label: "Data Pengguna", icon: Users, href: "/admin/users" },
    { id: "stats", label: "Statistik", icon: BarChart3, href: "/admin/stats" },
    { id: "settings", label: "Pengaturan", icon: Settings, href: "/admin/settings" },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const { logout } = useAuth();
    const router = useRouter();

    // Determine active item based on current path
    const activeId = (() => {
        if (pathname === "/admin") return "dashboard";
        const seg = pathname.split("/")[2];
        return seg ?? "dashboard";
    })();

    const handleLogout = () => {
        if (window.confirm("Keluar dari panel admin?")) {
            logout();
            router.push("/");
        }
    };

    return (
        <aside className="fixed left-0 top-0 h-full w-[240px] bg-slate-900 border-r border-slate-800 flex flex-col z-40 hidden md:flex">
            {/* Logo */}
            <div className="flex items-center gap-2.5 px-5 py-5 border-b border-slate-800">
                <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                    <p className="text-white font-bold text-sm leading-tight">Admin Panel</p>
                    <p className="text-slate-400 text-xs">RewasteHub</p>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
                {adminNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeId === item.id;
                    return (
                        <Link
                            key={item.id}
                            href={item.href}
                            className={clsx(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
                                isActive
                                    ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30"
                                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                            )}
                        >
                            <Icon
                                className={clsx(
                                    "w-4.5 h-4.5 flex-shrink-0",
                                    isActive ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300"
                                )}
                            />
                            <span className="text-sm font-medium">{item.label}</span>
                            {isActive && (
                                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="px-3 py-4 border-t border-slate-800 space-y-2">
                <Link
                    href="/dashboard"
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-all"
                >
                    <LayoutDashboard className="w-4 h-4" />
                    <span className="text-sm font-medium">Lihat Dashboard User</span>
                </Link>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400/80 hover:bg-red-500/10 hover:text-red-400 transition-all"
                >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">Keluar</span>
                </button>
            </div>
        </aside>
    );
}
