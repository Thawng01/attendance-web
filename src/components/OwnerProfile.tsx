import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Building2, UserCircle2Icon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

import { Link, useNavigate } from "react-router-dom";

const OwnerProfile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    return (
        <div>
            <Popover>
                <PopoverTrigger asChild>
                    <div className="flex items-center">
                        <UserCircle2Icon className="h-8 w-8 text-[#189af0]" />
                        <div className="hidden sm:flex sm:flex-col ml-3">
                            <p>{user?.name}</p>
                            <p className="text-gray-400 text-[14px]">
                                @{user?.username}
                            </p>
                        </div>
                    </div>
                </PopoverTrigger>

                <PopoverContent className="w-auto">
                    <Link to={"/admin/company/details"}>
                        <div className="flex items-center mb-3">
                            <Building2
                                className={`mr-2 h-5 w-5 text-[#189af0]
                                `}
                            />
                            <div className="ml-2">
                                <p className="">{user?.name}</p>
                                <p className="text-gray-400 text-sm">
                                    @{user?.username}
                                </p>
                            </div>
                        </div>
                    </Link>

                    <div className="mt-6 flex justify-center">
                        <button
                            onClick={() => {
                                logout();
                                navigate("/welcome");
                            }}
                            className="bg-red-400 py-1.5 px-5 rounded-md focus:outline-none text-white font-medium"
                        >
                            Logout
                        </button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default OwnerProfile;
