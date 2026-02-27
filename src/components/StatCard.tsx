"use client";

import { LucideIcon } from "lucide-react";
import clsx from "clsx";

interface StatCardProps {
    title: string;
    value: string | number;
    caption: string;
    icon: LucideIcon;
    gradient: string;
    iconBg: string;
    trend?: string;
    trendPositive?: boolean;
}

export default function StatCard({
    title,
    value,
    caption,
    icon: Icon,
    gradient,
    iconBg,
    trend,
    trendPositive = true,
}: StatCardProps) {
    return (
        <div
            className={clsx(
                "relative rounded-3xl p-5 shadow-md card-hover overflow-hidden",
                gradient
            )}
        >
            {/* Decorative blob */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-white/10" />

            <div className="relative z-10 flex flex-col h-full gap-4">
                {/* Icon */}
                <div
                    className={clsx(
                        "w-10 h-10 rounded-2xl flex items-center justify-center",
                        iconBg
                    )}
                >
                    <Icon className="w-5 h-5 text-white" />
                </div>

                {/* Value */}
                <div>
                    <p className="text-white/70 text-xs font-medium uppercase tracking-wider mb-1">
                        {title}
                    </p>
                    <p className="text-white text-2xl font-bold leading-none">{value}</p>
                    {trend && (
                        <div className="flex items-center gap-1 mt-2">
                            <span
                                className={clsx(
                                    "text-xs font-medium px-2 py-0.5 rounded-full",
                                    trendPositive
                                        ? "bg-white/20 text-white"
                                        : "bg-red-300/20 text-red-200"
                                )}
                            >
                                {trendPositive ? "↑" : "↓"} {trend}
                            </span>
                        </div>
                    )}
                </div>

                <p className="text-white/60 text-xs">{caption}</p>
            </div>
        </div>
    );
}
