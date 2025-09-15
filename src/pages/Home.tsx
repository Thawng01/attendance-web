import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Users, Building2 } from "lucide-react";
import useFetch from "@/hooks/useFetch";
import { useAuth } from "@/contexts/AuthContext";
import type { Branch } from "./BranchUser";
import AttendanceChartFilter from "@/components/AttendanceChartFilter";
import InitialLoading from "@/components/skeleton/InitialLoading";

export interface User {
    id: string;
    name: string;
    email: string;
    branchId: string;
    lastActive: Date;
    status: "active" | "inactive";
}

export interface AttendanceRecord {
    id: string;
    userId: string;
    branchId: string;
    checkIn: Date;
    checkOut?: Date;
    duration?: number;
}

const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const {
        data: branches,
        isLoading,
        error,
    } = useFetch(`/branches/company/user/${user?.id}`);

    const totalUsers = branches?.reduce(
        (total: number, branch: Branch) => total + branch.User.length,
        0
    );

    const totalBranches = branches?.length || 0;

    if (isLoading) return <InitialLoading />;

    return (
        <div className="min-h-screen p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Attendance Dashboard
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 ">
                    <Card className="bg-white/30 backdrop-blur-md">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-sm font-medium">
                                Total Users
                            </CardTitle>
                            <Users className="h-8 w-8 text-[#189af0]" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {totalUsers}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white/30 backdrop-blur-md">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-sm font-medium">
                                Branches
                            </CardTitle>
                            <Building2 className="h-8 w-8 text-[#189af0]" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {totalBranches}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {error && <span className="text-red-500">{error.message}</span>}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Branches Stats */}
                    {/* <div className="lg:col-span-1">
                        <BranchStats
                            branches={branches}
                            selectedBranch={selectedBranch}
                            onBranchSelect={setSelectedBranch}
                        />
                    </div> */}

                    <div className="lg:col-span-3">
                        {branches?.length > 0 && (
                            <AttendanceChartFilter
                                companyId={user?.id!}
                                branches={branches}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
