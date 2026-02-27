"use client";

import {
    useState,
    useEffect,
    createContext,
    useContext,
    ReactNode,
    useCallback,
} from "react";

export type NotificationType = "info" | "warning" | "maintenance" | "success";

export interface Notification {
    id: string;
    title: string;
    message: string;
    type: NotificationType;
    active: boolean;
    createdAt: string;
}

interface NotificationContextType {
    notifications: Notification[];
    activeNotifications: Notification[];
    addNotification: (data: Omit<Notification, "id" | "createdAt">) => void;
    removeNotification: (id: string) => void;
    toggleNotification: (id: string) => void;
}

const LS_KEY = "rsd_notifications";

const NotificationContext = createContext<NotificationContextType | null>(null);

function persist(data: Notification[]) {
    try { localStorage.setItem(LS_KEY, JSON.stringify(data)); } catch { /* */ }
}

export function NotificationProvider({ children }: { children: ReactNode }) {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        try {
            const stored = localStorage.getItem(LS_KEY);
            if (stored) setNotifications(JSON.parse(stored) as Notification[]);
        } catch { /* */ }
    }, []);

    const addNotification = useCallback(
        (data: Omit<Notification, "id" | "createdAt">) => {
            const newNotif: Notification = {
                ...data,
                id: `notif_${Date.now()}`,
                createdAt: new Date().toISOString(),
            };
            setNotifications((prev: Notification[]) => {
                const updated = [newNotif, ...prev];
                persist(updated);
                return updated;
            });
        },
        []
    );

    const removeNotification = useCallback((id: string) => {
        setNotifications((prev: Notification[]) => {
            const updated = prev.filter((n) => n.id !== id);
            persist(updated);
            return updated;
        });
    }, []);

    const toggleNotification = useCallback((id: string) => {
        setNotifications((prev: Notification[]) => {
            const updated = prev.map((n) =>
                n.id === id ? { ...n, active: !n.active } : n
            );
            persist(updated);
            return updated;
        });
    }, []);

    const activeNotifications = notifications.filter((n) => n.active);

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                activeNotifications,
                addNotification,
                removeNotification,
                toggleNotification,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotifications() {
    const ctx = useContext(NotificationContext);
    if (!ctx)
        throw new Error("useNotifications must be used within NotificationProvider");
    return ctx;
}
