import React from "react";
// import { type PaymentStatus, type Payment } from "../../../type";

interface PaymentHistoryProps {
    payments: any[];
}

const PaymentHistory: React.FC<PaymentHistoryProps> = ({ payments }) => {
    const getStatusColor = (status: any) => {
        switch (status) {
            case "COMPLETED":
                return "bg-green-100 text-green-600";
            case "PENDING":
                return "bg-yellow-100 text-yellow-800";
            case "FAILED":
                return "bg-red-100 text-red-800";
            case "REFUNDED":
                return "bg-blue-100 text-blue-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const formatCurrency = (amount: number, currency: string) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency,
        }).format(amount);
    };

    if (payments.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                    <svg
                        className="mx-auto h-12 w-12"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No payment history
                </h3>
                <p className="text-gray-500">
                    Your payment history will appear here once you make a
                    payment.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">
                Payment History
            </h2>

            <div className="space-y-4">
                {payments.map((payment) => (
                    <div
                        key={payment.id}
                        className=" rounded-lg p-6 border border-gray-200"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {payment.package.name}
                                </h3>
                                <p className="text-gray-600 text-sm mt-1">
                                    {payment.package.description}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold text-gray-900">
                                    {formatCurrency(
                                        payment.amount,
                                        payment.currency
                                    )}
                                </p>
                                <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                        payment.status
                                    )}`}
                                >
                                    {payment.status}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm border-t border-gray-200 pt-4">
                            <div>
                                <span className="font-medium text-gray-700">
                                    Package Duration:
                                </span>
                                <p className="text-gray-600">
                                    {payment.package.duration} days
                                </p>
                            </div>
                            <div>
                                <span className="font-medium text-gray-700">
                                    Branch limit:
                                </span>
                                <p className="text-gray-600">
                                    {payment.package.branchLimit} branches
                                </p>
                            </div>
                            <div>
                                <span className="font-medium text-gray-700">
                                    User limit:
                                </span>
                                <p className="text-gray-600">
                                    {payment.package.userLimit} users
                                </p>
                            </div>
                            <div>
                                <span className="font-medium text-gray-700">
                                    Payment Date:
                                </span>
                                <p className="text-gray-600">
                                    {new Date(
                                        payment.createdAt
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        {payment.paypalOrderId && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <span className="font-medium text-gray-700 text-sm">
                                    PayPal Order ID:
                                </span>
                                <p className="text-gray-600 text-sm font-mono">
                                    {payment.paypalOrderId}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PaymentHistory;
