"use client";

import { useState, createContext, useContext, ReactNode } from "react";

interface User {
    name: string;
    email: string;
    avatar?: string;
    role?: "admin" | "member";
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    register: (name: string, email: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock Google Sheets API interaction
// In production, replace with actual API calls:
// const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID;
// const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
// GET: `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Users!A:D?key=${API_KEY}`
// POST: via Google Apps Script Web App endpoint

const MOCK_USERS = [
    { name: "Eko", email: "eko@rewastehub.id", password: "demo123", role: "member" as const },
    { name: "Admin", email: "admin@rewastehub.id", password: "admin123", role: "admin" as const },
];

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    const login = async (email: string, password: string): Promise<boolean> => {
        // Simulate API call to Google Sheets
        const found = MOCK_USERS.find(
            (u) => u.email === email && u.password === password
        );
        if (found) {
            setUser({ name: found.name, email: found.email, role: found.role });
            return true;
        }
        return false;
    };

    const logout = () => setUser(null);

    const register = async (
        name: string,
        email: string,
        _password: string
    ): Promise<boolean> => {
        // In production: POST to Google Apps Script Web App
        // which writes a new row in the spreadsheet
        setUser({ name, email });
        return true;
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
