import Header from "@/components/Header";
import Sidebar from "@/components/side/Sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
const Layout = () => {
    const [openMenu, setOpenMenu] = useState(false);

    const navigate = useNavigate();
    const { user } = useAuth();
    useEffect(() => {
        if (user) {
            if (user.Payment && user.Payment.length > 0) {
                navigate("/", { replace: true });
            } else {
                navigate("/auth/payment", { replace: true });
            }
        }
    }, [user]);

    return (
        <div
            className="min-h-screen w-full bg-fixed"
            style={{
                background:
                    "linear-gradient(to right, #f8f8f8, #d7e3f9, #f8f8f8)",
            }}
        >
            <Header onClick={() => setOpenMenu(!openMenu)} />

            <div className="flex">
                <div
                    className={`h-[calc(100vh-60px)] fixed top-[65px] z-40 md:z-0 ${
                        openMenu ? "left-0" : "-left-80 md:left-0"
                    } transition-all duration-500`}
                >
                    <div className="flex flex-col h-full w-64 bg-white/50 backdrop-blur-md">
                        <Sidebar onClose={() => setOpenMenu(false)} />
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

export default Layout;
