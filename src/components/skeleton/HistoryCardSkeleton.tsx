import React from "react";
export const HistoryCardSkeleton: React.FC = () => (
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
