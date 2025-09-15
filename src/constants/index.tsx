import {
    LayoutDashboard,
    Users as UsersIcon,
    ShoppingBag,
    Settings,
    Building2,
    ChartBarIcon,
    Users,
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
    // {
    //     name: "Users",
    //     icon: UsersIcon,
    //     path: "/admin/users",
    //     subItems: [
    //         { name: "All Users", path: "/admin/users" },
    //         { name: "Add User", path: "/admin/users/add" },
    //         { name: "Roles", path: "/admin/users/roles" },
    //     ],
    // },
    // {
    //     name: "Products",
    //     icon: ShoppingBag,
    //     path: "/admin/products",
    //     subItems: [
    //         { name: "All Products", path: "/admin/products" },
    //         { name: "Categories", path: "/admin/products/categories" },
    //         { name: "Inventory", path: "/admin/products/inventory" },
    //     ],
    // },

    // {
    //     name: "Settings",
    //     icon: Settings,
    //     path: "/admin/settings",
    // },
];
