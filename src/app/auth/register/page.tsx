"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";

export default function RegisterPage() {
    const [showPass, setShowPass] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate Google Sheets registration:
        // 1. GET Users sheet to check if email already exists
        // 2. If not exists, POST via Google Apps Script Web App:
        //    fetch(APPS_SCRIPT_URL, { method: 'POST', body: JSON.stringify({ name, email, password }) })
        // 3. Apps Script appends row to spreadsheet
        await new Promise((r) => setTimeout(r, 1200));
        setSuccess(true);
        setLoading(false);
        setTimeout(() => (window.location.href = "/dashboard"), 1500);
    };

    if (success) {
        return (
            <div className="min-h-screen bg-mint-50 flex items-center justify-center px-4">
                <div className="bg-white rounded-3xl p-10 text-center shadow-xl border border-emerald-50 max-w-sm w-full">
                    <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">✓</span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 mb-2">Akun Berhasil Dibuat!</h2>
                    <p className="text-sm text-slate-500">Mengarahkan ke dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-mint-50 flex items-center justify-center px-4">
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-20 right-1/4 w-96 h-96 rounded-full bg-emerald-100/60 blur-3xl" />
                <div className="absolute -bottom-20 left-1/4 w-80 h-80 rounded-full bg-teal-100/50 blur-3xl" />
            </div>

            <div className="w-full max-w-md">
                <div className="bg-white rounded-3xl shadow-xl border border-emerald-50 p-8">
                    <div className="flex items-center gap-2 mb-8">
                        <Image src="/logo.png" alt="PPK ORMAWA PGSD" width={44} height={44} className="object-contain" />
                        <span className="font-bold text-slate-800 text-sm leading-tight">RUMAH SAMPAH DIGITAL</span>
                    </div>

                    <h1 className="text-2xl font-bold text-slate-900 mb-1">Buat Akun Gratis</h1>
                    <p className="text-sm text-slate-400 mb-8">Bergabung dan mulai kelola sampahmu</p>

                    <form onSubmit={handleRegister} className="space-y-4">
                        {/* Name */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-600">Nama Lengkap</label>
                            <div className="relative">
                                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Nama kamu"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-600">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="kamu@email.com"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-600">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type={showPass ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Min. 8 karakter"
                                    minLength={8}
                                    className="w-full pl-10 pr-12 py-3 rounded-xl border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(!showPass)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full gradient-bg text-white font-semibold py-3.5 rounded-xl hover:opacity-90 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-emerald-200 disabled:opacity-70 mt-2"
                        >
                            {loading ? "Membuat akun..." : "Daftar Sekarang"}
                        </button>
                    </form>

                    <p className="text-center text-sm text-slate-500 mt-6">
                        Sudah punya akun?{" "}
                        <Link href="/auth/login" className="text-emerald-600 font-semibold hover:underline">
                            Masuk di sini
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
