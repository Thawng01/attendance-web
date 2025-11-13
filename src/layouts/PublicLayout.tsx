import { Outlet } from "react-router-dom";

const PublicLayout = () => {
    return (
        <div className="min-h-screen">
            <header className="w-full bg-white/30 backdrop-blur-md shadow-sm fixed top-0 left-0">
                <div className="px-6 py-4 flex items-center">
                    <img
                        src="/logo.png"
                        className="h-12 w-12 text-[#1891f0] mr-4"
                    />
                    <h1 className=" font-semibold text-[#189af0]">
                        Attendance
                    </h1>
                </div>
            </header>

            <main
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12"
                style={{
                    background:
                        "linear-gradient(to right, #f8f8f8, #d7e3f9, #f8f8f8)",
                }}
            >
                <Outlet />
            </main>
        </div>
    );
};

export default PublicLayout;
