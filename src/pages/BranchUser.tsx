import { InputDialog } from "@/components/Dialog";
import EmployeeTable from "@/components/employee/EmployeeTable";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import SessionCard from "@/components/SesscionCard";
import { SessionCardSkeleton } from "@/components/skeleton/SessionCardSkeleton";
import { StatsSkeleton } from "@/components/skeleton/StatsSkeleton";
import { UserCardSkeleton } from "@/components/skeleton/UserCardSkeleton";
import { Sorting } from "@/components/Sorting";
import StatCard from "@/components/StatCard";
import useFetch from "@/hooks/useFetch";

import React, { useState } from "react";
import { useParams } from "react-router-dom";

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
        email: string;
    };
}

export interface History {
    id: string;
    createdAt: string;
    userId: string;
    user: {
        active: boolean;
        name: string;
        email: string;
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
    companyId: string;
    User: User[];
}

// Main Dashboard Component
const UserManagementDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<"users" | "sessions" | "record">(
        "users"
    );
    const [sortBy, setSortBy] = useState<"date" | "startTime" | "endTime">(
        "date"
    );

    const [searchTerm, setSearchTerm] = useState("");

    const param = useParams();
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

    const totalUsers = users?.length || 0;
    const activeUsers = users?.filter((u: User) => u.active).length || 0;

    // Apply search filter
    const filteredUsers = users?.filter((user: User) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredSessions = sessions?.filter((session: Session) =>
        session.user?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const isLoading =
        (usersLoading && activeTab === "users") ||
        (sessionsLoading && activeTab === "sessions");

    return (
        <div className="min-h-screen px-6 pt-3 pb-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 flex flex-col md:flex-row justify-between md:items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            User Management
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Manage users, monitor active sessions, and track
                            history
                        </p>
                    </div>
                    <div className="mt-3 md:mt-0">
                        <InputDialog branchId={param.id!} />
                    </div>
                </div>

                {usersLoading ? (
                    <StatsSkeleton />
                ) : usersError ? (
                    <ErrorDisplay
                        message="Failed to load statistics"
                        onRetry={refetchUsers}
                    />
                ) : (
                    <StatCard
                        totalUsers={totalUsers}
                        totalActiveUsers={activeUsers}
                        // numberOfHistory={histories?.length || 0}
                    />
                )}

                <div className="bg-white/30 backdrop-blur-md rounded-xl shadow-sm mb-6 border border-gray-100">
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
                    </div>

                    <div className="p-6">
                        <div className="flex flex-col md:flex-row justify-between items-start lg:items-center mb-6 gap-4">
                            <h2 className="text-xl font-semibold text-gray-800">
                                {activeTab === "users"
                                    ? "All Users"
                                    : activeTab === "sessions"
                                    ? "Active Sessions"
                                    : "Record Log"}
                            </h2>
                            <div className="flex flex-col lg:flex-row md:items-center gap-4">
                                <div className="relative w-full lg:w-64">
                                    <input
                                        type="text"
                                        placeholder={`Search ${activeTab}...`}
                                        className="w-full pl-10 text-gray-700 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
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

                                {activeTab === "record" && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {/* <DatePicker
                                            date={date}
                                            setDate={setDate}
                                        /> */}

                                        <Sorting
                                            data={[
                                                {
                                                    value: "date",
                                                    label: "Date",
                                                },
                                                {
                                                    value: "startTime",
                                                    label: "Start Time",
                                                },
                                                {
                                                    value: "endTime",
                                                    label: "End Time",
                                                },
                                            ]}
                                            defaultValue={sortBy}
                                            setSortBy={setSortBy}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Error Display */}
                        {(usersError && activeTab === "users") ||
                        (sessionsError && activeTab === "sessions") ? (
                            <ErrorDisplay
                                message={`Failed to load ${activeTab}`}
                                onRetry={
                                    activeTab === "users"
                                        ? refetchUsers
                                        : refetchSessions
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
                                {/* {activeTab === "record" &&
                                    Array.from({ length: 6 }).map((_, i) => (
                                        <HistoryCardSkeleton key={i} />
                                    ))} */}
                            </div>
                        ) : (
                            // Content Display
                            <>
                                {activeTab === "users" && (
                                    <div className="border rounded-lg">
                                        <div className="grid grid-cols-12 p-4 font-medium border-b">
                                            <div className="col-span-4">
                                                Name
                                            </div>
                                            <div className="col-span-3">
                                                Branch
                                            </div>
                                            <div className="col-span-3">
                                                Joined Date
                                            </div>
                                            <div className="col-span-1">
                                                Status
                                            </div>
                                            <div className="col-span-1"></div>
                                        </div>
                                        {filteredUsers?.length > 0 ? (
                                            filteredUsers?.map((user: User) => (
                                                <EmployeeTable
                                                    key={user.id}
                                                    user={user}
                                                    // sessions={sessions?.filter(
                                                    //     (s: Session) =>
                                                    //         s.userId === user.id
                                                    // )}
                                                />
                                                // <UserCard
                                                //     key={user.id}
                                                //     user={user}
                                                //     sessions={sessions?.filter(
                                                //         (s: Session) =>
                                                //             s.userId === user.id
                                                //     )}
                                                // />
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
                                )}
                                {activeTab === "sessions" && (
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
