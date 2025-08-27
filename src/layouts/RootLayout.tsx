import Header from "@/components/Header";
import { Outlet } from "react-router-dom";
const Layout = () => {
    return (
        <div
            className="min-h-screen w-full bg-fixed"
            style={{
                background:
                    "linear-gradient(to right, #f8f8f8, #d7e3f9, #f8f8f8)",
            }}
        >
            <Header />
            <main className="pt-20">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
