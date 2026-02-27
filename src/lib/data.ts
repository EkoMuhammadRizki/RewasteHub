// Dummy data for charts and dashboard

export const depositTrendsData = [
    { month: "Jul", organic: 120, anorganic: 85 },
    { month: "Aug", organic: 145, anorganic: 92 },
    { month: "Sep", organic: 132, anorganic: 110 },
    { month: "Oct", organic: 168, anorganic: 125 },
    { month: "Nov", organic: 190, anorganic: 140 },
    { month: "Dec", organic: 175, anorganic: 155 },
    { month: "Jan", organic: 210, anorganic: 170 },
];

export const wasteCompositionData = [
    { name: "Organik", value: 58, color: "#10b981" },
    { name: "Anorganik", value: 32, color: "#6ee7b7" },
    { name: "B3", value: 10, color: "#d1fae5" },
];

export const recentTransactions = [
    { id: 1, type: "Plastik", weight: "2.4 kg", points: 120, date: "Hari ini", status: "success" },
    { id: 2, type: "Kertas", weight: "1.8 kg", points: 90, date: "Kemarin", status: "success" },
    { id: 3, type: "Organik", weight: "3.2 kg", points: 64, date: "2 hari lalu", status: "pending" },
    { id: 4, type: "Logam", weight: "0.9 kg", points: 180, date: "3 hari lalu", status: "success" },
];

export const statsData = {
    totalWaste: 1248,
    progressPercent: 72,
    pointsEarned: 8340,
    totalTransactions: 47,
    monthlyGrowth: 23.5,
};

export const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard" },
    { id: "bank-sampah", label: "Bank Sampah Digital", icon: "Landmark" },
    { id: "organik", label: "Pengolahan Organik", icon: "Leaf" },
    { id: "edukasi", label: "Edukasi", icon: "BookOpen" },
];
