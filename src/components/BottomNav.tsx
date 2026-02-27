"use client";

import {
    LayoutDashboard,
    Landmark,
    Leaf,
    BookOpen,
} from "lucide-react";
import clsx from "clsx";

const navItems = [
    { id: "dashboard", label: "Home", icon: LayoutDashboard, href: "/dashboard" },
    { id: "bank-sampah", label: "Bank", icon: Landmark, href: "/dashboard/bank-sampah" },
    { id: "organik", label: "Organik", icon: Leaf, href: "/dashboard/organik" },
    { id: "edukasi", label: "Edukasi", icon: BookOpen, href: "/dashboard/edukasi" },
];

interface BottomNavProps {
    activeId?: string;
}

export default function BottomNav({ activeId = "dashboard" }: BottomNavProps) {
    return (
        <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/90 backdrop-blur-xl border-t border-emerald-100 shadow-xl">
            <div className="grid grid-cols-4 h-16">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeId === item.id;
                    return (
                        <a
                            key={item.id}
                            href={item.href}
                            className={clsx(
                                "flex flex-col items-center justify-center gap-1 transition-all duration-200 relative",
                                isActive ? "text-emerald-600" : "text-slate-400 hover:text-emerald-500"
                            )}
                        >
                            {isActive && (
                                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-emerald-500" />
                            )}
                            <Icon
                                className={clsx(
                                    "w-5 h-5 transition-transform duration-200",
                                    isActive ? "scale-110" : ""
                                )}
                            />
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </a>
                    );
                })}
            </div>
        </nav>
    );
}
