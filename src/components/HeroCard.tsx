"use client";

import { TrendingUp } from "lucide-react";

interface HeroCardProps {
    totalWaste: number;
    progressPercent: number;
}

export default function HeroCard({ totalWaste, progressPercent }: HeroCardProps) {
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progressPercent / 100) * circumference;

    return (
        <div className="relative col-span-12 md:col-span-5 rounded-3xl overflow-hidden gradient-bg p-6 shadow-lg card-hover">
            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5" />

            <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                <div>
                    <p className="text-emerald-100/70 text-sm font-medium uppercase tracking-wider">
                        Total Sampah Dikelola
                    </p>
                    <h2 className="text-white text-4xl font-bold mt-1">
                        {totalWaste.toLocaleString("id-ID")}
                        <span className="text-2xl font-normal text-emerald-100/80 ml-2">kg</span>
                    </h2>
                    <p className="text-emerald-100/60 text-sm mt-2">
                        Target bulanan: 1.700 kg
                    </p>
                </div>

                <div className="flex items-center gap-6">
                    {/* Circular Progress */}
                    <div className="relative flex items-center justify-center">
                        <svg width="140" height="140" className="-rotate-90">
                            <defs>
                                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#a7f3d0" />
                                    <stop offset="100%" stopColor="#ffffff" />
                                </linearGradient>
                            </defs>
                            {/* Background ring */}
                            <circle
                                cx="70"
                                cy="70"
                                r={radius}
                                fill="none"
                                stroke="rgba(255,255,255,0.15)"
                                strokeWidth="10"
                            />
                            {/* Progress ring */}
                            <circle
                                cx="70"
                                cy="70"
                                r={radius}
                                fill="none"
                                stroke="url(#progressGradient)"
                                strokeWidth="10"
                                strokeLinecap="round"
                                strokeDasharray={circumference}
                                strokeDashoffset={offset}
                                style={{ transition: "stroke-dashoffset 1s ease" }}
                            />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                            <span className="text-white text-2xl font-bold">{progressPercent}%</span>
                            <span className="text-emerald-100/70 text-xs mt-0.5">Tercapai</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-emerald-200" />
                            <span className="text-emerald-100 text-sm font-medium">+18% dari bulan lalu</span>
                        </div>
                        <div className="text-xs text-emerald-100/60 leading-relaxed">
                            Anda berada di jalur yang tepat.
                            <br />Terus semangat! 🌱
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
