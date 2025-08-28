import React from "react";
export const StatsSkeleton: React.FC = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
            <div
                key={i}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 animate-pulse"
            >
                <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-gray-200 mr-4">
                        <div className="w-6 h-6"></div>
                    </div>
                    <div>
                        <div className="h-7 bg-gray-300 rounded w-10 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </div>
                </div>
            </div>
        ))}
    </div>
);
