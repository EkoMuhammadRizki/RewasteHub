"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [showPass, setShowPass] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { login } = useAuth();
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        await new Promise((r) => setTimeout(r, 800));
        const success = await login(email, password);
        if (success) {
            // Redirect admin to /admin, member to /dashboard
            if (email === "admin@rewastehub.id") {
                router.push("/admin");
            } else {
                router.push("/dashboard");
            }
        } else {
            setError("Email atau password salah.");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-mint-50 flex items-center justify-center px-4">
            {/* Background blobs */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-20 left-1/4 w-96 h-96 rounded-full bg-emerald-100/60 blur-3xl" />
                <div className="absolute -bottom-20 right-1/4 w-80 h-80 rounded-full bg-teal-100/50 blur-3xl" />
            </div>

            <div className="w-full max-w-md">
                {/* Card */}
                <div className="bg-white rounded-3xl shadow-xl border border-emerald-50 p-8">
                    {/* Logo */}
                    <div className="flex items-center gap-2 mb-8">
                        <Image src="/logo.png" alt="PPK ORMAWA PGSD" width={44} height={44} className="object-contain" />
                        <span className="font-bold text-slate-800 text-sm leading-tight">RUMAH SAMPAH DIGITAL</span>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-1">Selamat datang!</h1>
                    <p className="text-sm text-slate-400 mb-8">Masuk ke akun RewasteHub-mu</p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl px-4 py-3">
                                {error}
                            </div>
                        )}

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
                                    placeholder="••••••••"
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

                        <div className="flex justify-end">
                            <a href="#" className="text-xs text-emerald-600 hover:underline">Lupa password?</a>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full gradient-bg text-white font-semibold py-3.5 rounded-xl hover:opacity-90 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-emerald-200 disabled:opacity-70"
                        >
                            {loading ? "Memproses..." : "Masuk"}
                        </button>
                    </form>

                    <p className="text-center text-sm text-slate-500 mt-6">
                        Belum punya akun?{" "}
                        <Link href="/auth/register" className="text-emerald-600 font-semibold hover:underline">
                            Daftar gratis
                        </Link>
                    </p>
                </div>

                <p className="text-center text-xs text-slate-400 mt-6">
                    User: eko@rewastehub.id / demo123 &nbsp;|&nbsp; Admin: admin@rewastehub.id / admin123
                </p>
            </div>
        </div>
    );
}
