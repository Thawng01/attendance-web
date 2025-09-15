import { useAuth } from "@/contexts/AuthContext";
import {
    Calendar,
    MenuIcon,
    UserCircle,
    UserCircle2Icon,
    UserIcon,
} from "lucide-react";
import ProfilePopup from "./ProfilePopup";

const Header = ({ onClick }: { onClick: () => void }) => {
    const { user } = useAuth();
    return (
        <header className="w-full bg-white/30 backdrop-blur-md shadow-sm fixed top-0 left-0 h-[65px]">
            <div className="flex flex-1 flex-row justify-between items-center px-8">
                <div className="flex items-center">
                    <MenuIcon onClick={onClick} className="text-[#189af0]" />
                    <div className=" py-4 flex items-center ml-3">
                        <Calendar className="h-8 w-8 text-[#1891f0] mr-4" />
                        <h1 className=" font-semibold text-[#189af0]">
                            Attendance
                        </h1>
                    </div>
                </div>
                {user && <ProfilePopup />}
            </div>
        </header>
    );
};

export default Header;
