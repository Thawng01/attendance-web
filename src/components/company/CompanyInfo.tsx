import { useState } from "react";
import PaymentHistory from "./PaymentHistory";
import CompanyDetails from "./CompanyDetails";
import type { PaymentStatus } from "../../../type";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const CompanyInfo = ({ company }: { company: any }) => {
    const [activeTab, setActiveTab] = useState<"details" | "payments">(
        "details"
    );

    const now = new Date().getTime();
    const paymentDate = new Date(
        company.Payment[company.Payment.length - 1].package.createdAt
    );

    const joinedAt = paymentDate.getTime();
    const expiredDate = new Date(paymentDate);
    expiredDate.setFullYear(expiredDate.getFullYear() + 1).toString();
    const navigate = useNavigate();

    const getPaymentStatusColor = (status: PaymentStatus) => {
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

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white/30 backdrop-blur-md rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                {company?.name}
                            </h1>
                            <p className="text-gray-600 mt-1">
                                {company?.description || "No description"}
                            </p>
                        </div>

                        <div className="text-right">
                            {now < joinedAt ? (
                                <Button
                                    onClick={() => navigate("/packages")}
                                    style={{
                                        background:
                                            "linear-gradient(to right, #56c1f7, #2192ef, #189af0)",
                                    }}
                                >
                                    Renew
                                </Button>
                            ) : (
                                <div>
                                    <span
                                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(
                                            company?.paymentStatus
                                        )}`}
                                    >
                                        {company?.paymentStatus}
                                    </span>
                                    <p className="text-sm text-gray-500 mt-2">
                                        Expire at{" "}
                                        {expiredDate.toLocaleDateString()}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-white/30 backdrop-blur-md rounded-lg shadow-sm border border-gray-200 mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex">
                            <button
                                onClick={() => setActiveTab("details")}
                                className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                                    activeTab === "details"
                                        ? "border-blue-500 text-blue-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}
                            >
                                Company Details
                            </button>
                            <button
                                onClick={() => setActiveTab("payments")}
                                className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                                    activeTab === "payments"
                                        ? "border-blue-500 text-blue-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}
                            >
                                Payment History
                                {company?.Payment.length > 0 && (
                                    <span className="ml-2 bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                                        {company?.Payment.length}
                                    </span>
                                )}
                            </button>
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {activeTab === "details" && (
                            <CompanyDetails company={company} />
                        )}
                        {activeTab === "payments" && (
                            <PaymentHistory payments={company.Payment} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyInfo;
