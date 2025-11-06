import {
    LayoutDashboard,
    Building2,
    ChartBarIcon,
    Users,
    Package2,
    Box,
} from "lucide-react";
export const navItems = [
    {
        name: "Dashboard",
        icon: LayoutDashboard,
        path: "/",
    },

    {
        name: "Branches",
        icon: Building2,
        path: "/branches",
    },
    {
        name: "Employee",
        icon: Users,
        path: "/employee",
    },
    {
        name: "Reports",
        icon: ChartBarIcon,
        path: "/reports",
    },
    {
        name: "Packages",
        icon: Box,
        path: "/packages",
    },
];

export const ownerSideItems = [
    {
        name: "Companies",
        icon: Building2,
        path: "/admin",
    },
    {
        name: "Packages",
        icon: Package2,
        path: "/admin/packages",
    },
];
