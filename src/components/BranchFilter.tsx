import type { Branch } from "@/pages/BranchUser";
import { Filter, X } from "lucide-react";
import { useState } from "react";

const BranchFilter = ({
    branches,
    filter,
    onFilter,
    chart,
}: {
    branches: Branch[];
    filter: string;
    onFilter: (value: string) => void;
    chart?: boolean;
}) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center space-x-2 px-3 py-2 bg-white/30 backdrop-blur-md shadow-sm rounded-md text-sm hover:bg-gray-50"
            >
                <Filter className="h-4 w-4" />
                <span>Filter by Branch</span>
                {filter !== "all" && (
                    <span className="bg-blue-100 text-[#189af0] text-xs px-2 py-0.5 rounded-full">
                        {branches.find((b: Branch) => b.id === filter)?.name}
                    </span>
                )}
            </button>

            {isFilterOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white/30 backdrop-blur-md rounded-md shadow-lg border z-10">
                    <div className="p-2 border-b">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">
                                Filter by Branch
                            </span>
                            <button onClick={() => setIsFilterOpen(false)}>
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                    <div className="p-2">
                        {!chart && (
                            <div
                                className={`px-3 py-2 rounded-md text-sm cursor-pointer ${
                                    filter === "all"
                                        ? "bg-blue-100 text-blue-800"
                                        : "hover:bg-gray-100"
                                }`}
                                onClick={() => {
                                    onFilter("all");
                                    setIsFilterOpen(false);
                                }}
                            >
                                All Branches
                            </div>
                        )}
                        {branches?.map((branch: Branch) => (
                            <div
                                key={branch.id}
                                className={`px-3 py-2 rounded-md text-sm cursor-pointer ${
                                    filter === branch.id
                                        ? "bg-blue-100 text-blue-800"
                                        : "hover:bg-gray-100"
                                }`}
                                onClick={() => {
                                    onFilter(branch.id);
                                    setIsFilterOpen(false);
                                }}
                            >
                                {branch.name}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BranchFilter;
