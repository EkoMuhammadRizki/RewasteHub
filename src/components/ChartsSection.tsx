"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
    defs,
    LinearGradient,
    Stop,
} from "recharts";
import { depositTrendsData, wasteCompositionData } from "@/lib/data";

const CustomTooltipLine = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white rounded-xl shadow-lg border border-emerald-100 px-3 py-2">
                <p className="text-xs font-semibold text-slate-600 mb-1">{label}</p>
                {payload.map((entry: any) => (
                    <div key={entry.name} className="flex items-center gap-2 text-xs">
                        <span
                            className="w-2 h-2 rounded-full"
                            style={{ background: entry.color }}
                        />
                        <span className="text-slate-500">{entry.name}:</span>
                        <span className="font-bold text-slate-700">{entry.value} kg</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

const CustomTooltipPie = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white rounded-xl shadow-lg border border-emerald-100 px-3 py-2">
                <p className="text-xs font-semibold text-slate-700">
                    {payload[0].name}: {payload[0].value}%
                </p>
            </div>
        );
    }
    return null;
};

export default function ChartsSection() {
    return (
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Line Chart - Deposit Trends */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-50 card-hover">
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h3 className="text-sm font-semibold text-slate-800">Tren Deposit</h3>
                        <p className="text-xs text-slate-400 mt-0.5">Organik vs Anorganik (kg)</p>
                    </div>
                    <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-3 py-1 rounded-full">
                        7 Bulan
                    </span>
                </div>

                <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={depositTrendsData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="organicGradient" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#10b981" />
                                <stop offset="100%" stopColor="#34d399" />
                            </linearGradient>
                            <linearGradient id="anorganicGradient" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#6ee7b7" />
                                <stop offset="100%" stopColor="#a7f3d0" />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0fdf4" vertical={false} />
                        <XAxis
                            dataKey="month"
                            tick={{ fontSize: 11, fill: "#94a3b8" }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fontSize: 11, fill: "#94a3b8" }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip content={<CustomTooltipLine />} />
                        <Line
                            type="monotone"
                            dataKey="organic"
                            name="Organik"
                            stroke="url(#organicGradient)"
                            strokeWidth={3}
                            dot={{ fill: "#10b981", strokeWidth: 0, r: 4 }}
                            activeDot={{ r: 6, fill: "#10b981" }}
                        />
                        <Line
                            type="monotone"
                            dataKey="anorganic"
                            name="Anorganik"
                            stroke="url(#anorganicGradient)"
                            strokeWidth={3}
                            dot={{ fill: "#6ee7b7", strokeWidth: 0, r: 4 }}
                            activeDot={{ r: 6, fill: "#6ee7b7" }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Pie Chart - Waste Composition */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-50 card-hover">
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h3 className="text-sm font-semibold text-slate-800">Komposisi Sampah</h3>
                        <p className="text-xs text-slate-400 mt-0.5">Organik vs Anorganik vs B3</p>
                    </div>
                    <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-3 py-1 rounded-full">
                        Bulan ini
                    </span>
                </div>

                <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                        <Pie
                            data={wasteCompositionData}
                            cx="50%"
                            cy="50%"
                            innerRadius={55}
                            outerRadius={85}
                            paddingAngle={4}
                            dataKey="value"
                        >
                            {wasteCompositionData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltipPie />} />
                        <Legend
                            formatter={(value) => (
                                <span className="text-xs text-slate-600">{value}</span>
                            )}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
