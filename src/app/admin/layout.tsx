"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Redirect non-admin users away from admin panel
        // null user means not logged in → send to login
        if (user === null) {
            router.push("/auth/login");
        } else if (user.role !== "admin") {
            router.push("/dashboard");
        }
    }, [user, router]);

    // While determining role, render nothing
    if (!user || user.role !== "admin") return null;

    return (
        <div className="min-h-screen bg-slate-950">
            <AdminSidebar />
            <div className="md:pl-[240px] flex flex-col min-h-screen">
                {children}
            </div>
        </div>
    );
}
