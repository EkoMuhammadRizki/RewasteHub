"use client";

import { Truck, FilePlus } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

export default function FloatingActions() {
    const [isOpen, setIsOpen] = useState(false);

    const actions = [
        { label: "Jadwal Pickup", icon: Truck, color: "bg-emerald-500 hover:bg-emerald-600" },
        { label: "Submit Sampah", icon: FilePlus, color: "bg-teal-500 hover:bg-teal-600" },
    ];

    return (
        <div className="fixed bottom-8 right-6 z-50 flex flex-col items-end gap-3 md:bottom-8 md:right-8 pb-16 md:pb-0">
            {/* Action buttons */}
            <div
                className={clsx(
                    "flex flex-col items-end gap-3 transition-all duration-300",
                    isOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-4 pointer-events-none"
                )}
            >
                {actions.map((action) => {
                    const Icon = action.icon;
                    return (
                        <button
                            key={action.label}
                            className={clsx(
                                "flex items-center gap-3 px-4 py-3 rounded-full text-white text-sm font-medium shadow-lg",
                                "transition-all duration-200 hover:scale-105 active:scale-95",
                                action.color
                            )}
                        >
                            <Icon className="w-4 h-4" />
                            {action.label}
                        </button>
                    );
                })}
            </div>

            {/* Toggle button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={clsx(
                    "w-14 h-14 rounded-full gradient-bg text-white shadow-xl flex items-center justify-center",
                    "transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-emerald-400/30 hover:shadow-2xl"
                )}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={clsx(
                        "transition-transform duration-300",
                        isOpen ? "rotate-45" : "rotate-0"
                    )}
                >
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                </svg>
            </button>
        </div>
    );
}
