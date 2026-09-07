import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import type { Branch, User } from "./BranchUser";
import { useAuth } from "@/contexts/AuthContext";
import useFetchWithAuth from "@/hooks/useFetchWithAuth";
import BranchFilter from "@/components/BranchFilter";
import CardAction from "@/components/CardAction";
import { formatDate } from "@/utils";
import EmployeeFilter from "@/components/employee/EmployeeFilter";
import { ErrorDisplay } from "@/components/ErrorDisplay";

const EmployeePage = () => {
    const [userBranchFilter, setUserBranchFilter] = useState<string>("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [status, setStatus] = useState("all");

    const { user } = useAuth();
    const userEndpointId =
        userBranchFilter === "all" ? user?.id : userBranchFilter;
    const {
        data: users = [],
        error: userError,
        refetch: reloadUsers,
    } = useFetchWithAuth<User[]>(
        `/users/company/${userEndpointId}?all=${userBranchFilter}`,
        Boolean(userEndpointId)
    );
    const { data: branches = [], isLoading } = useFetchWithAuth<Branch[]>(
        `/branches/company/${user?.id}`,
        Boolean(user?.id)
    );

    const filteredUsers = useMemo(() => {
        const normalizedSearchTerm = searchTerm.trim().toLowerCase();

        return users.filter((employee: User) => {
            const matchesName = employee.name
                .toLowerCase()
                .includes(normalizedSearchTerm);
            const matchesStatus =
                status === "all" ||
                (status === "active" && employee.active) ||
                (status === "inactive" && !employee.active);

            return matchesName && matchesStatus;
        });
    }, [searchTerm, status, users]);

    const branchNames = useMemo(
        () => new Map(branches.map((branch) => [branch.id, branch.name])),
        [branches]
    );

    return (
        <div className="p-6">
            <div className="mb-4">
                <h1 className="text-3xl font-bold text-gray-900">
                    Employees Across Branches
                </h1>
                <p className="text-gray-600 mt-2">
                    All employees across branches
                </p>
            </div>
            <Card className="bg-white/30 backdrop-blur-md">
                <CardHeader>
                    <div className="flex flex-col lg:flex-row justify-between lg:items-center">
                        <div>
                            <div className="relative w-full lg:w-64">
                                <input
                                    type="text"
                                    placeholder={`Search employee...`}
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
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center mt-2 lg:mt-0 gap-3">
                            <EmployeeFilter
                                status={status}
                                onStatusFilter={setStatus}
                            />
                            <BranchFilter
                                branches={branches}
                                filter={userBranchFilter}
                                onFilter={(value) => setUserBranchFilter(value)}
                            />
                        </div>
                    </div>
                </CardHeader>

                {userError && (
                    <ErrorDisplay
                        message="Something went wrong"
                        onRetry={reloadUsers}
                    />
                )}
                <CardContent>
                    <div className="border rounded-lg">
                        <div className="grid grid-cols-12 p-4 font-medium border-b">
                            <div className="col-span-6 sm:col-span-4">Name</div>

                            <div className="col-span-3 hidden sm:block">
                                Branch
                            </div>

                            <div className="col-span-3 hidden md:block">
                                Joined Date
                            </div>

                            <div className="col-span-2 sm:col-span-1">
                                Status
                            </div>
                            <div className="col-span-2 sm:col-span-1"></div>
                        </div>

                        {/* Body */}
                        {filteredUsers?.length > 0 ? (
                            filteredUsers.map((user: User) => (
                                <div
                                    key={user.id}
                                    className="grid grid-cols-12 p-2 border-b last:border-b-0 hover:bg-gray-50"
                                >
                                    <div className="col-span-6 sm:col-span-4 font-medium">
                                        {user.name}
                                    </div>

                                    <div className="col-span-3 hidden sm:block">
                                        {branchNames.get(user.branchId)}
                                    </div>

                                    <div className="col-span-3 hidden md:block">
                                        {formatDate(user.createdAt)}
                                    </div>

                                    <div className="col-span-2 sm:col-span-1">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                user.active
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"
                                            }`}
                                        >
                                            {user.active
                                                ? "Active"
                                                : "Inactive"}
                                        </span>
                                    </div>

                                    {/* Actions */}
                                    <div className="col-span-2 sm:col-span-1 text-right">
                                        <CardAction
                                            branchId={user.branchId}
                                            userId={user.id}
                                        />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-8 text-center text-muted-foreground">
                                No users found for the selected filter.
                            </div>
                        )}
                    </div>
                    <div className="mt-4 text-sm text-muted-foreground">
                        Showing {filteredUsers?.length} of {users?.length}{" "}
                        employees
                        {userBranchFilter !== "all" &&
                            ` in ${branchNames.get(userBranchFilter)}`}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default EmployeePage;
