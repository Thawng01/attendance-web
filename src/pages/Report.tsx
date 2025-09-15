import { DateFilter, type DateRange } from "@/components/MultiDatePicker";
import ReportComponent from "@/components/reports/ReportComponent";
import { useAuth } from "@/contexts/AuthContext";
import useFetch from "@/hooks/useFetch";
import React, { useState } from "react";

const Report = () => {
    const [isSingleDate, setSingleDate] = React.useState<boolean>(true);

    const [dateRange, setDateRange] = useState<DateRange>({
        from: new Date(),
        to: new Date(),
    });
    const { user } = useAuth();

    const {
        data: branches,
        isLoading,
        error,
    } = useFetch(`/branches/company/user/${user?.id}`);

    const handleDateRangeChange = (range: DateRange, filterType: string) => {
        if (filterType === "custom") {
            setDateRange({ from: range.from, to: range.to });
        }
    };
    return (
        <div className="p-6 ">
            <div className="mb-4">
                <h1 className="text-3xl font-bold text-gray-900">
                    Employee Activity Reports
                </h1>
                <p className="text-gray-600 mt-2">
                    Monitor active sessions, and track history
                </p>
            </div>
            <p className="text-gray-800 font-medium">Filter By Date</p>
            <div className="flex  mb-6">
                <DateFilter
                    onDateRangeChange={handleDateRangeChange}
                    dateRange={dateRange}
                    setDateRange={setDateRange}
                    onSingleDate={setSingleDate}
                />
            </div>
            <div className="ml-2">
                {isLoading ? null : (
                    <ReportComponent
                        dateRange={dateRange}
                        branches={branches}
                        isSingleDate={isSingleDate}
                    />
                )}
            </div>
        </div>
    );
};

export default Report;
