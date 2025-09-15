import useFetch from "@/hooks/useFetch";
import { useState } from "react";
import type { DateRange } from "../MultiDatePicker";
import { useAuth } from "@/contexts/AuthContext";
import { useSortedHistory } from "@/hooks/useSort";
import ExportButton from "@/utils/ExportButton";
import { formatDate } from "@/utils";
import type { Branch, History } from "@/pages/BranchUser";
import { Sorting } from "../Sorting";
import BranchFilter from "../BranchFilter";
import HistoryCard from "../HistoryCard";

const ReportComponent = ({
    dateRange,
    branches,
    isSingleDate,
}: {
    dateRange: DateRange;
    branches: Branch[];
    isSingleDate: boolean;
}) => {
    const [selectedBranch, setSelectedBranch] = useState(branches[0]?.id);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState<"date" | "startTime" | "endTime">(
        "date"
    );

    const [sort, setSort] = useState<"desc" | "asc">("desc");

    const { user } = useAuth();
    const {
        data: histories,
        isLoading,
        error,
        refetch: refetchHistories,
    } = useFetch(
        `/histories/branch/${user?.id}?branchId=${selectedBranch}&&date=${dateRange.from}&&startDate=${dateRange.from}&&endDate=${dateRange.to}&&singleDate=${isSingleDate}`
    );

    const filteredHistory = histories?.filter((historyItem: History) =>
        historyItem.user?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const sortedHistory = useSortedHistory(filteredHistory, sortBy, sort);
    return (
        <div>
            <div>
                <div className="flex flex-col justify-between lg:flex-row md:items-center gap-4">
                    <div className="relative w-full lg:w-64">
                        <input
                            type="text"
                            placeholder={`Search Reports...`}
                            className="w-full pl-10 text-gray-700 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
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

                    <div className="flex md:items-center flex-col md:flex-row gap-3">
                        <div>
                            <BranchFilter
                                branches={branches}
                                filter={selectedBranch}
                                onFilter={setSelectedBranch}
                                chart
                            />
                        </div>
                        <div className="flex sm:items-center gap-2 flex-col sm:flex-row">
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
                                sortLabel={[
                                    { label: "Asc", value: "asc" },
                                    { label: "Desc", value: "desc" },
                                ]}
                                sort={sort}
                                setSort={setSort}
                                defaultValue={sortBy}
                                setSortBy={setSortBy}
                            />

                            <ExportButton
                                disabled={isLoading}
                                data={sortedHistory}
                                filename={`Attendance Report for ${formatDate(
                                    String(dateRange.from)
                                )}-${formatDate(String(dateRange.to))}`}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <p className="text-gray-600 mt-2">
                <span className="text-[#189af0]">
                    {sortedHistory?.length} records
                </span>{" "}
                in {branches.find((b) => b.id === selectedBranch)?.name}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
                {sortedHistory?.length > 0 ? (
                    sortedHistory?.map((historyItem: History) => (
                        <HistoryCard
                            key={historyItem.id}
                            history={historyItem}
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
                            No record found
                        </h3>
                        <p className="mt-2 text-gray-500">
                            {searchTerm
                                ? "Try adjusting your search query"
                                : "No record available"}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReportComponent;
