"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function SplashScreen() {
    const [visible, setVisible] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // Start fade-out after 2.2 seconds
        const fadeTimer = setTimeout(() => setFadeOut(true), 2200);
        // Remove from DOM after fade completes (0.7s transition)
        const removeTimer = setTimeout(() => setVisible(false), 2900);
        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(removeTimer);
        };
    }, []);

    if (!visible) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-700 ease-in-out ${fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
            style={{ background: "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)" }}
        >
            {/* Decorative rings */}
            <div className="absolute w-[420px] h-[420px] rounded-full border border-emerald-500/20 animate-ping" style={{ animationDuration: "2s" }} />
            <div className="absolute w-[320px] h-[320px] rounded-full border border-emerald-400/20" />
            <div className="absolute w-[220px] h-[220px] rounded-full border border-emerald-300/20" />

            {/* Center content */}
            <div className="relative flex flex-col items-center gap-5 animate-slide-up">
                {/* Logo with pulse glow */}
                <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-2xl scale-150" />
                    <Image
                        src="/logo.png"
                        alt="Rumah Sampah Digital"
                        width={140}
                        height={140}
                        className="relative z-10 object-contain drop-shadow-2xl"
                        priority
                    />
                </div>

                {/* Brand name */}
                <div className="text-center">
                    <p className="text-emerald-300/80 text-xs font-semibold uppercase tracking-[0.3em] mb-1">
                        Selamat Datang di
                    </p>
                    <h1 className="text-white text-2xl font-extrabold tracking-tight">
                        RUMAH SAMPAH DIGITAL
                    </h1>
                    <p className="text-emerald-200/60 text-sm mt-1">
                        Kelurahan Ciseureuh
                    </p>
                </div>

                {/* Loading dots */}
                <div className="flex items-center gap-1.5 mt-2">
                    {[0, 1, 2].map((i) => (
                        <span
                            key={i}
                            className="w-2 h-2 rounded-full bg-emerald-400"
                            style={{
                                animation: "bounce 1.2s ease-in-out infinite",
                                animationDelay: `${i * 0.2}s`,
                            }}
                        />
                    ))}
                </div>
            </div>

            <style jsx>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-8px); opacity: 1; }
        }
      `}</style>
        </div>
    );
}
