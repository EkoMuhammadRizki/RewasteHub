import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";
import { NotificationProvider } from "@/lib/notifications";

export const metadata: Metadata = {
    title: "RewasteHub – Smart Waste Management Platform",
    description:
        "Platform manajemen sampah digital yang modern, ramah lingkungan, dan terintegrasi untuk komunitas yang lebih hijau.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="id">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="antialiased">
                <AuthProvider>
                    <NotificationProvider>
                        {children}
                    </NotificationProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
