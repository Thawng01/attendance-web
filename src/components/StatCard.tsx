// components/StatCard.tsx
import type { LucideIcon } from "lucide-react";
import React from "react";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    description?: string;
    className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    icon: Icon,
    trend,
    description,
    className = "",
}) => {
    return (
        <div
            className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 ${className}`}
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100">
                        <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="ml-4 text-sm font-medium text-gray-600">
                        {title}
                    </h3>
                </div>
                {trend && (
                    <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                            trend.isPositive
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                        }`}
                    >
                        {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
                    </span>
                )}
            </div>

            <div className="flex items-baseline justify-between">
                <p className="text-3xl font-bold text-gray-900">{value}</p>
                {description && (
                    <p className="text-sm text-gray-500">{description}</p>
                )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-1000"
                        style={{ width: "75%" }} // This would be dynamic in real implementation
                    />
                </div>
            </div>
        </div>
    );
};

export default StatCard;
