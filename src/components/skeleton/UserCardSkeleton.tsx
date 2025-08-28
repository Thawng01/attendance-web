// Skeleton Loader Components
import React from "react";
export const UserCardSkeleton: React.FC = () => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 animate-pulse">
        <div className="p-6">
            <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    <div>
                        <div className="h-5 bg-gray-300 rounded w-32 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-40"></div>
                    </div>
                </div>
                <div className="h-6 bg-gray-200 rounded-full w-16"></div>
            </div>
            <div className="mt-4 flex justify-between items-center">
                <div>
                    <div className="h-3 bg-gray-200 rounded w-20 mb-1"></div>
                    <div className="h-3 bg-gray-300 rounded w-16"></div>
                </div>
                <div className="text-right">
                    <div className="h-3 bg-gray-200 rounded w-24 mb-1"></div>
                    <div className="h-3 bg-gray-300 rounded w-8 ml-auto"></div>
                </div>
            </div>
        </div>
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
            <div className="h-3 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
        </div>
    </div>
);
