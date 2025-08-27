import { useState } from "react";
import { format } from "date-fns";
import GradientButton from "@/components/GradientButton";
import useFetch from "@/hooks/useFetch";
import CreateBranch from "@/components/CreateBranch";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

type User = {
    id: string;
    name: string;
    email: string;
    active: boolean;
    lastActive?: string;
};

type Branch = {
    id: string;
    name: string;
    createdAt: string;
    User: User[];
};

const HomePage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState<"name" | "users" | "date">("name");
    const { data: branches, error, isLoading: loading } = useFetch("/branches");
    const navigate = useNavigate();

    // Filter and sort branches
    const processedBranches = branches
        ?.filter((branch: Branch) =>
            branch.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        ?.sort((a: Branch, b: Branch) => {
            if (sortBy === "name") return a.name.localeCompare(b.name);
            if (sortBy === "users") return b.User.length - a.User.length;
            return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );
        });

    // Stats for the header
    const totalBranches = branches?.length || 0;
    const totalUsers = branches?.reduce(
        (acc: number, branch: Branch) => acc + branch.User.length,
        0
    );
    const activeUsers = branches?.reduce(
        (acc: number, branch: Branch) =>
            acc + branch.User.filter((u) => u.active).length,
        0
    );

    if (loading) {
        return (
            <div className="min-h-screen p-8">
                <div className="max-w-6xl mx-auto">
                    <div className="animate-pulse">
                        <div className="h-10 bg-gray-300 rounded w-1/4 mb-10"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="rounded-xl shadow-md bg-white p-6 h-80"
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        Branches
                    </h1>
                    <p className="text-gray-600">
                        Manage all your branches and monitor user activity
                    </p>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                            <div className="flex items-center">
                                <div className="p-3 rounded-lg bg-blue-100 mr-4">
                                    <svg
                                        className="w-6 h-6 text-blue-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        {totalBranches}
                                    </h2>
                                    <p className="text-gray-600">
                                        Total Branches
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                            <div className="flex items-center">
                                <div className="p-3 rounded-lg bg-green-100 mr-4">
                                    <svg
                                        className="w-6 h-6 text-green-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        {totalUsers}
                                    </h2>
                                    <p className="text-gray-600">Total Users</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                            <div className="flex items-center">
                                <div className="p-3 rounded-lg bg-purple-100 mr-4">
                                    <svg
                                        className="w-6 h-6 text-purple-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        {activeUsers}
                                    </h2>
                                    <p className="text-gray-600">
                                        Active Users
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Controls Section */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                    <div className="relative w-full md:w-64">
                        <input
                            type="text"
                            placeholder="Search branches..."
                            className="w-full pl-10 text-gray-600 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <svg
                            className="w-5 h-5 text-gray-400 absolute left-3 top-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>

                    <div className="flex items-center space-x-4 w-full md:w-auto">
                        <div className="flex items-center">
                            <span className="text-gray-600 mr-2">Sort by:</span>
                            <select
                                className="border text-gray-700 border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={sortBy}
                                onChange={(e) =>
                                    setSortBy(
                                        e.target.value as
                                            | "name"
                                            | "users"
                                            | "date"
                                    )
                                }
                            >
                                <option value="name">Name</option>
                                <option value="users">Users</option>
                                <option value="date">Date</option>
                            </select>
                        </div>

                        <GradientButton onClick={() => setIsOpen(true)}>
                            + Add Branch
                        </GradientButton>
                        <CreateBranch
                            isOpen={isOpen}
                            onClose={() => setIsOpen(false)}
                        />
                    </div>
                </div>

                {/* Branch Cards */}
                {error ? (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                        <svg
                            className="w-12 h-12 text-red-500 mx-auto mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <p className="text-red-500 text-lg font-medium">
                            Failed to load branches.
                        </p>
                        <p className="text-red-400 mt-2">
                            Please check your connection and try again.
                        </p>
                    </div>
                ) : processedBranches?.length === 0 ? (
                    <div className="bg-white rounded-xl p-12 text-center shadow-md border border-gray-100">
                        <svg
                            className="w-16 h-16 text-gray-300 mx-auto mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            />
                        </svg>
                        <h3 className="text-xl font-medium text-gray-700 mb-2">
                            No branches found
                        </h3>
                        <p className="text-gray-500 mb-6">
                            {searchTerm
                                ? "Try adjusting your search query"
                                : "Get started by adding your first branch"}
                        </p>
                        <GradientButton onClick={() => setIsOpen(true)}>
                            + Add Your First Branch
                        </GradientButton>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {processedBranches?.map((branch: Branch) => {
                            const totalUsers = branch.User.length;
                            const activeUsers = branch.User.filter(
                                (u) => u.active
                            ).length;
                            const inactiveUsers = totalUsers - activeUsers;

                            const activePercent =
                                (activeUsers / (totalUsers || 1)) * 100;
                            // const inactivePercent =
                            //     (inactiveUsers / (totalUsers || 1)) * 100;

                            // Get recent active users (last 5)
                            const recentActiveUsers = branch.User.filter(
                                (u) => u.active
                            )
                                .sort(
                                    (a, b) =>
                                        new Date(b.lastActive || 0).getTime() -
                                        new Date(a.lastActive || 0).getTime()
                                )
                                .slice(0, 5);

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
                                                {format(
                                                    new Date(branch.createdAt),
                                                    "MMM d, yyyy"
                                                )}
                                            </p>
                                        </div>
                                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                                            {totalUsers} users
                                        </span>
                                    </div>

                                    {/* Progress Bars */}
                                    <div className="mb-3">
                                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                                            <span>Active: {activeUsers}</span>
                                            <span>
                                                Inactive: {inactiveUsers}
                                            </span>
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
                                                {recentActiveUsers.map(
                                                    (user) => (
                                                        <div
                                                            key={user.id}
                                                            className="flex items-center"
                                                        >
                                                            <div className="relative">
                                                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium text-sm">
                                                                    {user.name.charAt(
                                                                        0
                                                                    )}
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
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* View Button */}
                                    <div className="mt-auto pt-4 border-t border-gray-100">
                                        <GradientButton
                                            onClick={() =>
                                                navigate(
                                                    `/branches/${branch.id}`
                                                )
                                            }
                                        >
                                            View Details
                                            <ChevronRight />
                                        </GradientButton>
                                        {/* <button
                                            onClick={() =>
                                                navigate(
                                                    `/branches/${branch.id}`
                                                )
                                            }
                                            className="w-full px-5 py-2.5 text-sm font-medium text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center group"
                                            style={{
                                                background:
                                                    "linear-gradient(to right, #56c1f7, #2192ef, #189af0)",
                                            }}
                                        >
                                            View Details
                                            <svg
                                                className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </button> */}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
