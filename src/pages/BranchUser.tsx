import HistoryCard from "@/components/HistoryCard";
import SessionCard from "@/components/SesscionCard";
import UserCard from "@/components/UserCard";
import useFetch from "@/hooks/useFetch";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

// Define TypeScript interfaces based on your Prisma models
export interface User {
    id: string;
    name: string;
    email?: string;
    active?: boolean;
    createdAt: string;
    branchId: string;
    branch: Branch;
    Sessions: Session[];
    History: History[];
}

export interface Session {
    id: string;
    userId: string;
    duration: number;
    active: boolean;
    startTime: string;
    endTime?: string;
    createdAt: string;
    user?: {
        id: string;
        name: string;
    };
}

export interface History {
    id: string;
    createdAt: string;
    userId: string;
    user: {
        active: boolean;
        name: string;
    };
    sessionId?: string;
    session: {
        startTime: string;
        endTime: string;
        duration: number;
    };
    Branch: {
        name: string;
    };
}

export interface Branch {
    id: string;
    name: string;
}

// Skeleton Loader Components
const UserCardSkeleton: React.FC = () => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 animate-pulse">
        <div className="p-6">
            <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    <div>
                        <div className="h-5 bg-gray-300 rounded w-32 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-40"></div>
                    </div>
                </div>
                <div className="h-6 bg-gray-200 rounded-full w-16"></div>
            </div>
            <div className="mt-4 flex justify-between items-center">
                <div>
                    <div className="h-3 bg-gray-200 rounded w-20 mb-1"></div>
                    <div className="h-3 bg-gray-300 rounded w-16"></div>
                </div>
                <div className="text-right">
                    <div className="h-3 bg-gray-200 rounded w-24 mb-1"></div>
                    <div className="h-3 bg-gray-300 rounded w-8 ml-auto"></div>
                </div>
            </div>
        </div>
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
            <div className="h-3 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
        </div>
    </div>
);

const SessionCardSkeleton: React.FC = () => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 animate-pulse">
        <div className="p-5">
            <div className="flex justify-between items-start">
                <div>
                    <div className="h-5 bg-gray-300 rounded w-32 mb-1"></div>
                    <div className="h-4 bg-gray-200 rounded w-40"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded-full w-16"></div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                    <div className="h-3 bg-gray-200 rounded w-16 mb-1"></div>
                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                </div>
                <div>
                    <div className="h-3 bg-gray-200 rounded w-16 mb-1"></div>
                    <div className="h-4 bg-gray-300 rounded w-20"></div>
                </div>
            </div>
        </div>
    </div>
);

const HistoryCardSkeleton: React.FC = () => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 animate-pulse">
        <div className="p-5">
            <div className="flex justify-between items-start">
                <div>
                    <div className="h-5 bg-gray-300 rounded w-32 mb-1"></div>
                    <div className="h-4 bg-gray-200 rounded w-48"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded-full w-20"></div>
            </div>
            <div className="mt-4 flex justify-between items-center">
                <div>
                    <div className="h-3 bg-gray-200 rounded w-16 mb-1"></div>
                    <div className="h-4 bg-gray-300 rounded w-32"></div>
                </div>
                <div className="text-right">
                    <div className="h-3 bg-gray-200 rounded w-16 mb-1"></div>
                    <div className="h-4 bg-gray-300 rounded w-12 ml-auto"></div>
                </div>
            </div>
        </div>
    </div>
);

const StatsSkeleton: React.FC = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
            <div
                key={i}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 animate-pulse"
            >
                <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-gray-200 mr-4">
                        <div className="w-6 h-6"></div>
                    </div>
                    <div>
                        <div className="h-7 bg-gray-300 rounded w-10 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

// Error Display Component
const ErrorDisplay: React.FC<{ message: string; onRetry?: () => void }> = ({
    message,
    onRetry,
}) => (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center my-6">
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
        <p className="text-red-500 text-lg font-medium mb-4">{message}</p>
        {onRetry && (
            <button
                onClick={onRetry}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
                Try Again
            </button>
        )}
    </div>
);

// Main Dashboard Component
const UserManagementDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<
        "users" | "sessions" | "history"
    >("users");
    const [searchTerm, setSearchTerm] = useState("");
    const param = useParams();

    // Fetch data with error handling
    const {
        data: users,
        isLoading: usersLoading,
        error: usersError,
        refetch: refetchUsers,
    } = useFetch(`/users/branch/${param.id}`);

    const {
        data: sessions,
        isLoading: sessionsLoading,
        error: sessionsError,
        refetch: refetchSessions,
    } = useFetch(`/sessions/branch/${param.id}`);

    const {
        data: histories,
        isLoading: historiesLoading,
        error: historiesError,
        refetch: refetchHistories,
    } = useFetch(`/histories/branch/${param.id}`);

    // Calculate stats
    const totalUsers = users?.length || 0;
    const activeUsers = users?.filter((u: User) => u.active).length || 0;
    const activeSessionsCount =
        sessions?.filter((s: Session) => s.active).length || 0;

    // Apply search filter
    const filteredUsers = users?.filter((user: User) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredSessions = sessions?.filter((session: Session) =>
        session.user?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredHistory = histories?.filter((historyItem: History) =>
        historyItem.user?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Determine if we're in a loading state
    const isLoading =
        (usersLoading && activeTab === "users") ||
        (sessionsLoading && activeTab === "sessions") ||
        (historiesLoading && activeTab === "history");

    // Determine if we have an error
    // const hasError = usersError || sessionsError || historiesError;

    return (
        <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            User Management Dashboard
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Manage users, monitor active sessions, and track
                            history
                        </p>
                    </div>
                </div>

                {/* Stats Overview */}
                {usersLoading ? (
                    <StatsSkeleton />
                ) : usersError ? (
                    <ErrorDisplay
                        message="Failed to load statistics"
                        onRetry={refetchUsers}
                    />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-all hover:shadow-md">
                            <div className="flex items-center">
                                <div className="p-3 rounded-lg bg-blue-100">
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
                                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                        />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        {totalUsers}
                                    </h2>
                                    <p className="text-gray-600">Total Users</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-all hover:shadow-md">
                            <div className="flex items-center">
                                <div className="p-3 rounded-lg bg-green-100">
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
                                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                        />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        {activeUsers}
                                    </h2>
                                    <p className="text-gray-600">
                                        Active Users
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-all hover:shadow-md">
                            <div className="flex items-center">
                                <div className="p-3 rounded-lg bg-purple-100">
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
                                            d="M13 10V3L4 14h7v7l9-11h-7z"
                                        />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        {activeSessionsCount}
                                    </h2>
                                    <p className="text-gray-600">
                                        Active Sessions
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-all hover:shadow-md">
                            <div className="flex items-center">
                                <div className="p-3 rounded-lg bg-amber-100">
                                    <svg
                                        className="w-6 h-6 text-amber-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        {histories?.length || 0}
                                    </h2>
                                    <p className="text-gray-600">
                                        History Events
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab Navigation */}
                <div className="bg-white rounded-xl shadow-sm mb-6 border border-gray-100">
                    <div className="flex border-b border-gray-200">
                        <button
                            className={`py-4 px-6 font-medium text-sm ${
                                activeTab === "users"
                                    ? "text-blue-600 border-b-2 border-blue-600"
                                    : "text-gray-500 hover:text-gray-700"
                            }`}
                            onClick={() => setActiveTab("users")}
                        >
                            Users
                        </button>
                        <button
                            className={`py-4 px-6 font-medium text-sm ${
                                activeTab === "sessions"
                                    ? "text-blue-600 border-b-2 border-blue-600"
                                    : "text-gray-500 hover:text-gray-700"
                            }`}
                            onClick={() => setActiveTab("sessions")}
                        >
                            Active Sessions
                        </button>
                        <button
                            className={`py-4 px-6 font-medium text-sm ${
                                activeTab === "history"
                                    ? "text-blue-600 border-b-2 border-blue-600"
                                    : "text-gray-500 hover:text-gray-700"
                            }`}
                            onClick={() => setActiveTab("history")}
                        >
                            History
                        </button>
                    </div>

                    <div className="p-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                            <h2 className="text-xl font-semibold text-gray-800">
                                {activeTab === "users"
                                    ? "All Users"
                                    : activeTab === "sessions"
                                    ? "Active Sessions"
                                    : "History Log"}
                            </h2>

                            <div className="relative w-full md:w-64">
                                <input
                                    type="text"
                                    placeholder={`Search ${activeTab}...`}
                                    className="w-full pl-10 text-gray-700 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    disabled={isLoading}
                                />
                                <svg
                                    className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
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
                        </div>

                        {/* Error Display */}
                        {(usersError && activeTab === "users") ||
                        (sessionsError && activeTab === "sessions") ||
                        (historiesError && activeTab === "history") ? (
                            <ErrorDisplay
                                message={`Failed to load ${activeTab}`}
                                onRetry={
                                    activeTab === "users"
                                        ? refetchUsers
                                        : activeTab === "sessions"
                                        ? refetchSessions
                                        : refetchHistories
                                }
                            />
                        ) : isLoading ? (
                            // Loading State
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {activeTab === "users" &&
                                    Array.from({ length: 6 }).map((_, i) => (
                                        <UserCardSkeleton key={i} />
                                    ))}
                                {activeTab === "sessions" &&
                                    Array.from({ length: 6 }).map((_, i) => (
                                        <SessionCardSkeleton key={i} />
                                    ))}
                                {activeTab === "history" &&
                                    Array.from({ length: 6 }).map((_, i) => (
                                        <HistoryCardSkeleton key={i} />
                                    ))}
                            </div>
                        ) : (
                            // Content Display
                            <>
                                {activeTab === "users" ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {filteredUsers?.length > 0 ? (
                                            filteredUsers?.map((user: User) => (
                                                <UserCard
                                                    key={user.id}
                                                    user={user}
                                                    sessions={sessions?.filter(
                                                        (s: Session) =>
                                                            s.userId === user.id
                                                    )}
                                                />
                                            ))
                                        ) : (
                                            <div className="col-span-full text-center py-12">
                                                <svg
                                                    className="w-16 h-16 mx-auto text-gray-300"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                                <h3 className="mt-4 text-lg font-medium text-gray-700">
                                                    No users found
                                                </h3>
                                                <p className="mt-2 text-gray-500">
                                                    {searchTerm
                                                        ? "Try adjusting your search query"
                                                        : "No users available in this branch"}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ) : activeTab === "sessions" ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {filteredSessions?.filter(
                                            (s: Session) => s.active
                                        ).length > 0 ? (
                                            filteredSessions
                                                ?.filter(
                                                    (s: Session) => s.active
                                                )
                                                .map((session: Session) => (
                                                    <SessionCard
                                                        key={session.id}
                                                        session={session}
                                                    />
                                                ))
                                        ) : (
                                            <div className="col-span-full text-center py-12">
                                                <svg
                                                    className="w-16 h-16 mx-auto text-gray-300"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                                <h3 className="mt-4 text-lg font-medium text-gray-700">
                                                    No active sessions
                                                </h3>
                                                <p className="mt-2 text-gray-500">
                                                    {searchTerm
                                                        ? "Try adjusting your search query"
                                                        : "No users are currently active in this branch"}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {filteredHistory?.length > 0 ? (
                                            filteredHistory?.map(
                                                (historyItem: History) => (
                                                    <HistoryCard
                                                        key={historyItem.id}
                                                        history={historyItem}
                                                    />
                                                )
                                            )
                                        ) : (
                                            <div className="col-span-full text-center py-12">
                                                <svg
                                                    className="w-16 h-16 mx-auto text-gray-300"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                                <h3 className="mt-4 text-lg font-medium text-gray-700">
                                                    No history found
                                                </h3>
                                                <p className="mt-2 text-gray-500">
                                                    {searchTerm
                                                        ? "Try adjusting your search query"
                                                        : "No history available for this branch"}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserManagementDashboard;
