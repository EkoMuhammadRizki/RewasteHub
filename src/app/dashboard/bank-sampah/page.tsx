"use client";

import Image from "next/image";
import {
    Scale,
    TrendingUp,
    Package,
    ArrowUpDown,
    Filter,
    Search,
    Plus,
    CheckCircle,
    Clock,
    Coins,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import FloatingActions from "@/components/FloatingActions";
import BottomNav from "@/components/BottomNav";
import NotificationBanner from "@/components/NotificationBanner";
import clsx from "clsx";

const wasteTypes = [
    { id: 1, name: "Plastik PET", pricePerKg: 3500, unit: "kg", icon: "🧴", category: "Anorganik", color: "bg-blue-50 text-blue-700" },
    { id: 2, name: "Kertas/Kardus", pricePerKg: 2000, unit: "kg", icon: "📦", category: "Anorganik", color: "bg-amber-50 text-amber-700" },
    { id: 3, name: "Logam/Besi", pricePerKg: 8000, unit: "kg", icon: "🔩", category: "Anorganik", color: "bg-slate-50 text-slate-700" },
    { id: 4, name: "Kaca", pricePerKg: 1500, unit: "kg", icon: "🪟", category: "Anorganik", color: "bg-cyan-50 text-cyan-700" },
    { id: 5, name: "Sampah Organik", pricePerKg: 500, unit: "kg", icon: "🌿", category: "Organik", color: "bg-emerald-50 text-emerald-700" },
    { id: 6, name: "Elektronik (e-waste)", pricePerKg: 15000, unit: "kg", icon: "📱", category: "B3", color: "bg-purple-50 text-purple-700" },
];

const transactions = [
    { id: "TRX-001", type: "Plastik PET", weight: 2.4, points: 8400, date: "26 Feb 2026", status: "success" },
    { id: "TRX-002", type: "Kertas/Kardus", weight: 5.2, points: 10400, date: "25 Feb 2026", status: "success" },
    { id: "TRX-003", type: "Logam/Besi", weight: 1.1, points: 8800, date: "23 Feb 2026", status: "pending" },
    { id: "TRX-004", type: "Sampah Organik", weight: 8.0, points: 4000, date: "20 Feb 2026", status: "success" },
    { id: "TRX-005", type: "Kaca", weight: 3.5, points: 5250, date: "18 Feb 2026", status: "success" },
];

const statusStyle: Record<string, string> = {
    success: "bg-emerald-50 text-emerald-700",
    pending: "bg-amber-50 text-amber-600",
};

const statusLabel: Record<string, string> = {
    success: "Selesai",
    pending: "Diproses",
};

export default function BankSampahPage() {
    return (
        <div className="min-h-screen bg-mint-50">
            <Sidebar activeId="bank-sampah" />

            <div className="md:pl-[240px] flex flex-col min-h-screen">
                <Header title="Bank Sampah Digital" subtitle="Setorkan sampah, dapatkan poin & rewards" />
                <NotificationBanner />

                <main className="flex-1 px-4 md:px-6 py-6 pb-24 md:pb-8 space-y-6">

                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: "Saldo Poin", value: "8.340", icon: Coins, gradient: "from-emerald-500 to-emerald-700", sub: "≈ Rp 83.400" },
                            { label: "Total Setor", value: "47 kali", icon: ArrowUpDown, gradient: "from-teal-500 to-teal-700", sub: "bulan ini" },
                            { label: "Total Berat", value: "1.248 kg", icon: Scale, gradient: "from-cyan-500 to-emerald-600", sub: "sejak bergabung" },
                            { label: "Poin Bulan Ini", value: "+2.340", icon: TrendingUp, gradient: "from-emerald-400 to-teal-600", sub: "+18% dari lalu" },
                        ].map((card, i) => {
                            const Icon = card.icon;
                            return (
                                <div key={i} className={`rounded-3xl p-5 bg-gradient-to-br ${card.gradient} shadow-md card-hover relative overflow-hidden`}>
                                    <div className="absolute -bottom-3 -right-3 w-16 h-16 rounded-full bg-white/10" />
                                    <div className="relative z-10">
                                        <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center mb-3">
                                            <Icon className="w-4 h-4 text-white" />
                                        </div>
                                        <p className="text-white/70 text-xs mb-1">{card.label}</p>
                                        <p className="text-white text-xl font-bold">{card.value}</p>
                                        <p className="text-white/60 text-xs mt-1">{card.sub}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Waste Type Price List */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-50">
                            <div className="flex items-center justify-between mb-5">
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-800">Daftar Harga Sampah</h3>
                                    <p className="text-xs text-slate-400 mt-0.5">Harga per kilogram (poin)</p>
                                </div>
                                <span className="text-xs bg-emerald-50 text-emerald-700 font-medium px-3 py-1 rounded-full">
                                    Update: Feb 2026
                                </span>
                            </div>
                            <div className="space-y-3">
                                {wasteTypes.map((w) => (
                                    <div key={w.id} className="flex items-center justify-between py-2.5 px-3 rounded-2xl hover:bg-slate-50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl">{w.icon}</span>
                                            <div>
                                                <p className="text-sm font-medium text-slate-700">{w.name}</p>
                                                <span className={clsx("text-xs font-medium px-2 py-0.5 rounded-full", w.color)}>{w.category}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-emerald-600">
                                                {w.pricePerKg.toLocaleString("id-ID")} poin
                                            </p>
                                            <p className="text-xs text-slate-400">per kg</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Submit Form */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-50">
                            <div className="flex items-center gap-2 mb-5">
                                <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center">
                                    <Plus className="w-4 h-4 text-emerald-700" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-800">Form Setoran Sampah</h3>
                                    <p className="text-xs text-slate-400">Catat setoran sampahmu</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-semibold text-slate-600 block mb-1.5">Jenis Sampah</label>
                                    <select className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent bg-white">
                                        <option value="">-- Pilih jenis sampah --</option>
                                        {wasteTypes.map((w) => (
                                            <option key={w.id} value={w.id}>{w.icon} {w.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-600 block mb-1.5">Berat (kg)</label>
                                    <input
                                        type="number"
                                        placeholder="0.0"
                                        min="0"
                                        step="0.1"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-600 block mb-1.5">Catatan (opsional)</label>
                                    <textarea
                                        rows={2}
                                        placeholder="Tambahkan catatan..."
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent resize-none"
                                    />
                                </div>
                                <button className="w-full gradient-bg text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-all hover:scale-[1.01] shadow-md shadow-emerald-200">
                                    Catat Setoran
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Transaction History */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-50">
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <h3 className="text-sm font-semibold text-slate-800">Riwayat Transaksi</h3>
                                <p className="text-xs text-slate-400 mt-0.5">Semua setoran sampahmu</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2 border border-slate-100">
                                    <Search className="w-3.5 h-3.5 text-slate-400" />
                                    <input type="text" placeholder="Cari..." className="text-xs outline-none bg-transparent w-24 text-slate-600 placeholder:text-slate-400" />
                                </div>
                                <button className="flex items-center gap-1.5 bg-slate-50 rounded-xl px-3 py-2 border border-slate-100 text-xs text-slate-600 hover:border-emerald-300 transition-colors">
                                    <Filter className="w-3.5 h-3.5" />
                                    Filter
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-xs text-slate-400 border-b border-slate-100">
                                        <th className="text-left py-3 px-2 font-medium">ID</th>
                                        <th className="text-left py-3 px-2 font-medium">Jenis</th>
                                        <th className="text-left py-3 px-2 font-medium">Berat</th>
                                        <th className="text-left py-3 px-2 font-medium">Poin</th>
                                        <th className="text-left py-3 px-2 font-medium">Tanggal</th>
                                        <th className="text-left py-3 px-2 font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((tx) => (
                                        <tr key={tx.id} className="border-b border-slate-50 hover:bg-emerald-50/40 transition-colors">
                                            <td className="py-3.5 px-2 text-xs font-mono text-slate-500">{tx.id}</td>
                                            <td className="py-3.5 px-2 text-sm font-medium text-slate-700">{tx.type}</td>
                                            <td className="py-3.5 px-2 text-sm text-slate-600">{tx.weight} kg</td>
                                            <td className="py-3.5 px-2 text-sm font-bold text-emerald-600">+{tx.points.toLocaleString()}</td>
                                            <td className="py-3.5 px-2 text-xs text-slate-400">{tx.date}</td>
                                            <td className="py-3.5 px-2">
                                                <span className={clsx("text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1 w-fit", statusStyle[tx.status])}>
                                                    {tx.status === "success" ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                                    {statusLabel[tx.status]}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </main>
            </div>

            <FloatingActions />
            <BottomNav activeId="bank-sampah" />
        </div>
    );
}
