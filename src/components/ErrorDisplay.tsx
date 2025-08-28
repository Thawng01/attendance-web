import React from "react";
// Error Display Component
export const ErrorDisplay: React.FC<{
    message: string;
    onRetry?: () => void;
}> = ({ message, onRetry }) => (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center my-6">
        <svg
            className="w-12 h-12 text-red-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
        </svg>
        <p className="text-red-500 text-lg font-medium mb-4">{message}</p>
        {onRetry && (
            <button
                onClick={onRetry}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
                Try Again
            </button>
        )}
    </div>
);
