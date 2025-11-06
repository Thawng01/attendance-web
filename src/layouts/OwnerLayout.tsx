import OwnerHeader from "@/components/OnwerHeader";
import OwnerSidebar from "@/components/side/OwnerSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const OwnerLayout = () => {
    const [openMenu, setOpenMenu] = useState(false);

    const { user } = useAuth();
    if (user?.email !== "engskk@gmail.com") return <Navigate to={"/"} />;

    return (
        <div
            className="min-h-screen w-full bg-fixed"
            style={{
                background:
                    "linear-gradient(to right, #f8f8f8, #d7e3f9, #f8f8f8)",
            }}
        >
            <OwnerHeader onClick={() => setOpenMenu(!openMenu)} />

            <div className="flex">
                <div
                    className={`h-[calc(100vh-60px)] fixed top-[65px] z-40 md:z-0 ${
                        openMenu ? "left-0" : "-left-80 md:left-0"
                    } transition-all duration-500`}
                >
                    <div className="flex flex-col h-full w-64 bg-white/50 backdrop-blur-md">
                        <OwnerSidebar onClose={() => setOpenMenu(false)} />
                    </div>
                </div>
                <div className="flex flex-col flex-1 overflow-hidden md:ml-64">
                    <main className="pt-20">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default OwnerLayout;
