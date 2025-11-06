import { NavLink } from "react-router";
import { navItems, ownerSideItems } from "@/constants";

interface SidebarProps {
    onClose?: () => void;
}

export default function OwnerSidebar({ onClose }: SidebarProps) {
    return (
        <div className="flex flex-col h-full">
            <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto pt-10">
                {ownerSideItems.map((item) => (
                    <div key={item.name}>
                        <NavLink
                            to={item.path}
                            onClick={onClose}
                            className={({ isActive }: { isActive: boolean }) =>
                                `flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                                    isActive
                                        ? "bg-blue-100 text-[#189af0]"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`
                            }
                        >
                            <item.icon className="flex-shrink-0 h-5 w-5 mr-3" />
                            {item.name}
                        </NavLink>
                    </div>
                ))}
            </nav>
        </div>
    );
}
