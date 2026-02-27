"use client";

import clsx from "clsx";
import { recentTransactions } from "@/lib/data";

const statusStyles: Record<string, string> = {
    success: "bg-emerald-50 text-emerald-700",
    pending: "bg-amber-50 text-amber-600",
};

const statusLabels: Record<string, string> = {
    success: "Selesai",
    pending: "Diproses",
};

export default function RecentTransactions() {
    return (
        <div className="col-span-12 md:col-span-7 bg-white rounded-3xl p-6 shadow-sm border border-emerald-50">
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h3 className="text-sm font-semibold text-slate-800">Transaksi Terbaru</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Riwayat setoran sampah</p>
                </div>
                <a
                    href="#"
                    className="text-xs text-emerald-600 font-medium hover:underline"
                >
                    Lihat Semua →
                </a>
            </div>

            <div className="space-y-3">
                {recentTransactions.map((tx) => (
                    <div
                        key={tx.id}
                        className="flex items-center justify-between py-3 px-4 rounded-2xl bg-slate-50/70 hover:bg-emerald-50/60 transition-colors duration-200 group"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center">
                                <span className="text-emerald-700 text-xs font-bold">
                                    {tx.type.charAt(0)}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-700">{tx.type}</p>
                                <p className="text-xs text-slate-400">{tx.date}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-bold text-slate-700">{tx.weight}</p>
                                <p className="text-xs text-slate-400">+{tx.points} pts</p>
                            </div>
                            <span
                                className={clsx(
                                    "text-xs font-medium px-3 py-1 rounded-full",
                                    statusStyles[tx.status]
                                )}
                            >
                                {statusLabels[tx.status]}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
