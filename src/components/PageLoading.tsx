"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface PageLoadingProps {
    message?: string;
}

export default function PageLoading({ message = "Memuat halaman..." }: PageLoadingProps) {
    const [dots, setDots] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
        }, 400);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-[9998] flex flex-col items-center justify-center"
            style={{ background: "rgba(236, 253, 245, 0.97)", backdropFilter: "blur(8px)" }}
        >
            {/* Spinning ring */}
            <div className="relative flex items-center justify-center mb-6">
                <div className="absolute w-24 h-24 rounded-full border-4 border-emerald-200" />
                <div
                    className="absolute w-24 h-24 rounded-full border-4 border-transparent border-t-emerald-500"
                    style={{ animation: "spin 0.8s linear infinite" }}
                />
                <Image
                    src="/logo.png"
                    alt="Logo"
                    width={52}
                    height={52}
                    className="object-contain relative z-10"
                />
            </div>

            <p className="text-emerald-700 font-semibold text-base">
                {message}<span className="inline-block w-6">{dots}</span>
            </p>
            <p className="text-emerald-400 text-xs mt-1">Mohon tunggu sebentar</p>

            <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
}
