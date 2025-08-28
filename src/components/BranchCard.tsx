import { format } from "date-fns";
import GradientButton from "./GradientButton";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

type User = {
    id: string;
    name: string;
    email: string;
    active: boolean;
};

type Branch = {
    id: string;
    name: string;
    createdAt: string;
    User: User[];
};

const BranchCard = ({
    branch,
    inactiveUsers,
    recentActiveUsers,
    activePercent,
    totalUsers,
    activeUsers,
}: {
    branch: Branch;
    recentActiveUsers: User[];
    inactiveUsers: number;
    activePercent: number;
    totalUsers: number;
    activeUsers: number;
}) => {
    const navigate = useNavigate();
    return (
        <div
            key={branch.id}
            className="rounded-xl shadow-md hover:shadow-lg transition-all duration-300 bg-white p-6 flex flex-col border border-gray-100 hover:border-blue-100"
        >
            <div className="flex items-start justify-between mb-3">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">
                        {branch.name}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Created{" "}
                        {format(new Date(branch.createdAt), "MMM d, yyyy")}
                    </p>
                </div>
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-[#189af0]">
                    {totalUsers} users
                </span>
            </div>

            {/* Progress Bars */}
            <div className="mb-3">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Active: {activeUsers}</span>
                    <span>Inactive: {inactiveUsers}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                        className="bg-green-500 h-2.5 rounded-full"
                        style={{
                            width: `${activePercent}%`,
                        }}
                    ></div>
                </div>
            </div>

            {/* Recent Active Users */}
            {recentActiveUsers.length > 0 && (
                <div className="mb-3">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                        Recently Active
                    </h3>
                    <div className="space-y-2">
                        {recentActiveUsers.map((user) => (
                            <div key={user.id} className="flex items-center">
                                <div className="relative">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium text-sm">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-800">
                                        {user.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* View Button */}
            <div className="mt-auto pt-4 border-t border-gray-100">
                <GradientButton
                    onClick={() => navigate(`/branches/${branch.id}`)}
                >
                    View Details
                    <ChevronRight />
                </GradientButton>
            </div>
        </div>
    );
};

export default BranchCard;
