import React from "react";
export const SessionCardSkeleton: React.FC = () => (
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
