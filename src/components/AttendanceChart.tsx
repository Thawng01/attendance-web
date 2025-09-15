import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import type { Branch } from "@/pages/BranchUser";
import BranchFilter from "./BranchFilter";

interface AttendanceChartProps {
    data: { name: string; total: number }[];
    branches: Branch[];
    filter: string;
    branchName: string;
    setFilter: React.Dispatch<React.SetStateAction<string>>;
}

const AttendanceChart: React.FC<AttendanceChartProps> = ({
    data,
    branches,
    filter,
    branchName,
    setFilter,
}) => {
    return (
        <Card className="bg-white/30 backdrop-blur-md">
            <CardHeader>
                <div className="flex flex-col sm:flex-row items-center justify-between">
                    <div>
                        <CardTitle>Weekly Attendance</CardTitle>
                        <CardDescription>
                            Attendance trends across all branches
                        </CardDescription>
                    </div>
                    <div className="mt-3 sm:mt-0">
                        <BranchFilter
                            branches={branches}
                            filter={filter}
                            onFilter={(value) => setFilter(value)}
                            chart
                        />
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar
                                dataKey="total"
                                fill="#189af0"
                                name={branchName}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default AttendanceChart;
