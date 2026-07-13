import useFetchWithAuth from "@/hooks/useFetchWithAuth";
import { useState } from "react";
import type { DateRange } from "../MultiDatePicker";
import { useAuth } from "@/contexts/AuthContext";
import { useSortedHistory } from "@/hooks/useSort";
import ExportButton from "@/utils/ExportButton";
import { formatDate, formatDateTime, formatDuration } from "@/utils";
import type { Branch, History } from "@/pages/BranchUser";
import { Sorting } from "../Sorting";
import BranchFilter from "../BranchFilter";

const HISTORY_PAGE_SIZE = 20;

interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

interface PaginatedHistoryResponse {
    data: History[];
    pagination: PaginationMeta;
}

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
    const filterKey = `${selectedBranch ?? ""}:${dateRange.from.toISOString()}:${dateRange.to.toISOString()}:${isSingleDate}`;
    const [paginationState, setPaginationState] = useState({
        filterKey,
        page: 1,
    });
    const page =
        paginationState.filterKey === filterKey ? paginationState.page : 1;

    const historyUrl = `/histories/branch/${user?.id}?branchId=${encodeURIComponent(
        selectedBranch ?? ""
    )}&date=${encodeURIComponent(
        dateRange.from.toISOString()
    )}&startDate=${encodeURIComponent(
        dateRange.from.toISOString()
    )}&endDate=${encodeURIComponent(
        dateRange.to.toISOString()
    )}&singleDate=${isSingleDate}&page=${page}&limit=${HISTORY_PAGE_SIZE}`;

    const { data: historyResponse, isLoading } =
        useFetchWithAuth<PaginatedHistoryResponse>(
            historyUrl,
            Boolean(user?.id && selectedBranch)
        );

    const histories = historyResponse?.data ?? [];
    const pagination = historyResponse?.pagination;

    const changePage = (nextPage: number) =>
        setPaginationState(
            {
                filterKey,
                page: nextPage,
            }
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
                Showing{" "}
                <span className="text-[#189af0]">
                    {sortedHistory?.length} of {pagination?.total ?? 0} records
                </span>{" "}
                in {branches.find((b) => b.id === selectedBranch)?.name}
            </p>
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6"> */}
            <div className="border rounded-lg">
                <div className="grid grid-cols-12 p-4 font-medium border-b">
                    <div className="col-span-3 sm:col-span-2">Date</div>
                    <div className="col-span-3 sm:col-span-2">Name</div>

                    <div className="col-span-3 hidden sm:block">Clock In</div>

                    <div className="col-span-3 hidden md:block">Clock Out</div>

                    <div className="col-span-2 sm:col-span-1">Duration</div>
                    <div className="col-span-2 sm:col-span-1"></div>
                </div>
                {sortedHistory?.length > 0 ? (
                    sortedHistory?.map((historyItem: History) => (
                        // <HistoryCard
                        //     key={historyItem.id}
                        //     history={historyItem}
                        // />
                        <div
                            key={historyItem.id}
                            className="grid grid-cols-12 p-2 border-b last:border-b-0 hover:bg-gray-50"
                        >
                            <div className="col-span-3 sm:col-span-2">
                                {formatDate(historyItem.createdAt)}
                            </div>
                            <div className="col-span-3 sm:col-span-2 ">
                                {historyItem.user.name}
                            </div>

                            <div className="col-span-3 hidden sm:block">
                                {formatDateTime(historyItem.session.startTime)}
                            </div>

                            <div className="col-span-3 hidden md:block">
                                {formatDateTime(historyItem.session.endTime)}
                            </div>

                            <div className="col-span-2 sm:col-span-1 text-sm">
                                {formatDuration(historyItem.session.duration)}
                            </div>

                            {/* Actions */}
                            <div className="col-span-2 sm:col-span-1 text-right"></div>
                        </div>
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
            {pagination && pagination.totalPages > 1 && (
                <div className="mt-4 flex items-center justify-between gap-4">
                    <button
                        type="button"
                        className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400"
                        onClick={() => changePage(page - 1)}
                        disabled={!pagination.hasPreviousPage || isLoading}
                    >
                        Previous
                    </button>
                    <span className="text-sm font-medium text-gray-600">
                        Page {pagination.page} of {pagination.totalPages}
                    </span>
                    <button
                        type="button"
                        className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400"
                        onClick={() => changePage(page + 1)}
                        disabled={!pagination.hasNextPage || isLoading}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default ReportComponent;
