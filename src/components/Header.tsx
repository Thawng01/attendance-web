import { useAuth } from "@/contexts/AuthContext";
import { Calendar, UserCircle, UserCircle2Icon, UserIcon } from "lucide-react";
import ProfilePopup from "./ProfilePopup";

const Header = () => {
    const { user } = useAuth();
    return (
        <header className="w-full bg-white/30 backdrop-blur-md shadow-sm fixed top-0 left-0">
            <div className="flex flex-1 flex-row justify-between items-center px-8">
                <div className=" py-4 flex items-center">
                    <Calendar className="h-8 w-8 text-[#1891f0] mr-4" />
                    <h1 className=" font-semibold text-[#189af0]">
                        Attendance
                    </h1>
                </div>
                {user && <ProfilePopup />}
            </div>
        </header>
    );
};

export default Header;
