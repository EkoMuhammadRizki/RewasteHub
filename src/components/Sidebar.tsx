"use client";

import { useState } from "react";
import Image from "next/image";
import {
    LayoutDashboard,
    Landmark,
    Leaf,
    BookOpen,
    ChevronLeft,
    ChevronRight,
    LogOut,
} from "lucide-react";
import clsx from "clsx";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";

const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { id: "bank-sampah", label: "Bank Sampah Digital", icon: Landmark, href: "/dashboard/bank-sampah" },
    { id: "organik", label: "Pengolahan Organik", icon: Leaf, href: "/dashboard/organik" },
    { id: "edukasi", label: "Edukasi", icon: BookOpen, href: "/dashboard/edukasi" },
];

interface SidebarProps {
    activeId?: string;
}

export default function Sidebar({ activeId = "dashboard" }: SidebarProps) {
    const [collapsed, setCollapsed] = useState(false);
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        if (window.confirm("Apakah Anda yakin ingin keluar dari akun?")) {
            logout();
            router.push("/");
        }
    };

    // Default fallback if loading or no user
    const userName = user?.name || "Member";
    const userInitial = userName.charAt(0).toUpperCase();

    return (
        <aside
            className={clsx(
                "glass-dark fixed left-0 top-0 h-full z-40 flex flex-col transition-all duration-300 ease-in-out",
                collapsed ? "w-[72px]" : "w-[240px]",
                "hidden md:flex"
            )}
        >
            {/* Logo */}
            <div
                className={clsx(
                    "flex items-center gap-2 px-4 py-5 border-b border-emerald-800/30",
                    collapsed && "justify-center px-0"
                )}
            >
                <div className="flex-shrink-0">
                    <Image
                        src="/logo.png"
                        alt="PPK ORMAWA PGSD"
                        width={collapsed ? 40 : 46}
                        height={collapsed ? 40 : 46}
                        className="object-contain drop-shadow-sm"
                    />
                </div>
                {!collapsed && (
                    <span className="font-bold text-white text-sm tracking-tight leading-tight">
                        RUMAH SAMPAH DIGITAL
                    </span>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeId === item.id;
                    return (
                        <a
                            key={item.id}
                            href={item.href}
                            className={clsx(
                                "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group",
                                collapsed && "justify-center",
                                isActive
                                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                    : "text-emerald-100/60 hover:bg-emerald-500/10 hover:text-emerald-200"
                            )}
                        >
                            <Icon
                                className={clsx(
                                    "w-5 h-5 flex-shrink-0 transition-colors",
                                    isActive ? "text-emerald-400" : "text-emerald-200/50 group-hover:text-emerald-300"
                                )}
                            />
                            {!collapsed && (
                                <span className="text-sm font-medium truncate">{item.label}</span>
                            )}
                            {isActive && !collapsed && (
                                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            )}
                        </a>
                    );
                })}
            </nav>

            {/* Logout & Collapse toggle */}
            <div className="px-3 py-4 border-t border-emerald-800/30 flex flex-col gap-2">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center py-2.5 rounded-xl text-red-300/80 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200"
                >
                    {collapsed ? (
                        <LogOut className="w-4 h-4 ml-1" />
                    ) : (
                        <>
                            <LogOut className="w-4 h-4 mr-2" />
                            <span className="text-xs font-medium">Keluar Akun</span>
                        </>
                    )}
                </button>
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="w-full flex items-center justify-center py-2.5 rounded-xl text-emerald-200/60 hover:bg-emerald-500/10 hover:text-emerald-300 transition-all duration-200"
                >
                    {collapsed ? (
                        <ChevronRight className="w-4 h-4" />
                    ) : (
                        <>
                            <ChevronLeft className="w-4 h-4 mr-2" />
                            <span className="text-xs font-medium">Tutup Sidebar</span>
                        </>
                    )}
                </button>
            </div>
        </aside>
    );
}
