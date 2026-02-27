"use client";

import { useState } from "react";
import { X, Wrench, AlertTriangle, Info, CheckCircle } from "lucide-react";
import clsx from "clsx";
import { useNotifications } from "@/lib/notifications";
import type { NotificationType } from "@/lib/notifications";

const bannerStyle: Record<NotificationType, { bg: string; border: string; text: string; icon: React.ElementType }> = {
    maintenance: { bg: "bg-red-950/80", border: "border-red-800/60", text: "text-red-200", icon: Wrench },
    warning: { bg: "bg-amber-950/80", border: "border-amber-800/60", text: "text-amber-200", icon: AlertTriangle },
    info: { bg: "bg-blue-950/80", border: "border-blue-800/60", text: "text-blue-200", icon: Info },
    success: { bg: "bg-emerald-950/80", border: "border-emerald-800/60", text: "text-emerald-200", icon: CheckCircle },
};

export default function NotificationBanner() {
    const { activeNotifications } = useNotifications();
    const [dismissed, setDismissed] = useState<Set<string>>(new Set());

    const visible = activeNotifications.filter((n) => !dismissed.has(n.id));

    if (visible.length === 0) return null;

    const dismiss = (id: string) =>
        setDismissed((prev) => new Set([...Array.from(prev), id]));

    // Show the most recent active notification first
    const top = visible[0];
    const style = bannerStyle[top.type];
    const Icon = style.icon;

    return (
        <div
            className={clsx(
                "flex items-start gap-3 px-4 py-3 border-b backdrop-blur-sm",
                style.bg,
                style.border
            )}
        >
            <div className={clsx("flex-shrink-0 mt-0.5", style.text)}>
                <Icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
                <p className={clsx("text-sm font-semibold", style.text)}>{top.title}</p>
                <p className={clsx("text-xs mt-0.5 leading-relaxed opacity-80", style.text)}>
                    {top.message}
                    {visible.length > 1 && (
                        <span className="ml-2 opacity-60">+{visible.length - 1} pengumuman lainnya</span>
                    )}
                </p>
            </div>
            <button
                onClick={() => dismiss(top.id)}
                className={clsx(
                    "flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity",
                    style.text
                )}
            >
                <X className="w-3.5 h-3.5" />
            </button>
        </div>
    );
}
