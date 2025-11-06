import { useAuth } from "@/contexts/AuthContext";
import { MenuIcon } from "lucide-react";
import OwnerProfile from "./OwnerProfile";

const OwnerHeader = ({ onClick }: { onClick: () => void }) => {
    const { user } = useAuth();
    return (
        <header className="w-full bg-white/50 backdrop-blur-md shadow-sm fixed top-0 left-0 h-[65px]">
            <div className="flex flex-1 flex-row justify-between items-center px-8">
                <div className="flex items-center">
                    <MenuIcon
                        onClick={onClick}
                        className="text-[#189af0] md:hidden"
                    />
                    <div className=" flex items-center ml-3">
                        <img
                            src="/logo.png"
                            className="h-12 w-12 md:h-14 md:w-14 md:mr-2"
                        />
                        <h1 className=" font-semibold text-[#189af0]">
                            Attendance
                        </h1>
                    </div>
                </div>
                {user && <OwnerProfile />}
            </div>
        </header>
    );
};

export default OwnerHeader;
