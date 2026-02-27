"use client";

import { Coins, ArrowUpDown, TrendingUp } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import HeroCard from "@/components/HeroCard";
import StatCard from "@/components/StatCard";
import ChartsSection from "@/components/ChartsSection";
import FloatingActions from "@/components/FloatingActions";
import BottomNav from "@/components/BottomNav";
import RecentTransactions from "@/components/RecentTransactions";
import NotificationBanner from "@/components/NotificationBanner";
import { statsData } from "@/lib/data";

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-mint-50">
            <Sidebar activeId="dashboard" />

            {/* Main layout */}
            <div className="md:pl-[240px] flex flex-col min-h-screen transition-all duration-300">
                <Header
                    title="Dashboard"
                    subtitle="Kamis, 26 Februari 2026"
                />
                <NotificationBanner />

                <main className="flex-1 px-4 md:px-6 py-6 pb-24 md:pb-8">
                    {/* Bento Grid */}
                    <div className="bento-grid">

                        {/* Hero Card */}
                        <HeroCard
                            totalWaste={statsData.totalWaste}
                            progressPercent={statsData.progressPercent}
                        />

                        {/* Stat Cards — 3 cols on right */}
                        <div className="col-span-12 md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-5">
                            <StatCard
                                title="Poin Diperoleh"
                                value={statsData.pointsEarned.toLocaleString("id-ID")}
                                caption="Total poin aktif"
                                icon={Coins}
                                gradient="bg-gradient-to-br from-emerald-500 to-emerald-700"
                                iconBg="bg-white/20"
                                trend="12% bulan ini"
                                trendPositive
                            />
                            <StatCard
                                title="Total Transaksi"
                                value={statsData.totalTransactions}
                                caption="Setoran berhasil"
                                icon={ArrowUpDown}
                                gradient="bg-gradient-to-br from-teal-500 to-teal-700"
                                iconBg="bg-white/20"
                                trend="5 minggu ini"
                                trendPositive
                            />
                            <StatCard
                                title="Pertumbuhan"
                                value={`${statsData.monthlyGrowth}%`}
                                caption="Dari bulan lalu"
                                icon={TrendingUp}
                                gradient="bg-gradient-to-br from-cyan-500 to-emerald-600"
                                iconBg="bg-white/20"
                                trend="Excellent!"
                                trendPositive
                            />
                        </div>

                        {/* Charts Section */}
                        <ChartsSection />

                        {/* Recent Transactions */}
                        <RecentTransactions />

                        {/* Quick Tips Card */}
                        <div className="col-span-12 md:col-span-5 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 p-6 card-hover">
                            <h3 className="text-sm font-semibold text-slate-800 mb-4">
                                🌱 Tips Eco
                            </h3>
                            <div className="space-y-3">
                                {[
                                    { emoji: "♻️", tip: "Pisahkan sampah organik dan anorganik setiap hari" },
                                    { emoji: "🌿", tip: "Kompos dari sisa makanan bisa jadi pupuk gratis" },
                                    { emoji: "📦", tip: "Gunakan tas belanja yang bisa dipakai ulang" },
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-3 p-3 bg-white/60 rounded-2xl"
                                    >
                                        <span className="text-lg">{item.emoji}</span>
                                        <p className="text-xs text-slate-600 leading-relaxed">{item.tip}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </main>
            </div>

            <FloatingActions />
            <BottomNav activeId="dashboard" />
        </div>
    );
}
