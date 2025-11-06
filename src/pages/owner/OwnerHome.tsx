import React, { useState } from "react";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { Payment } from "type";
import PaymentModal from "@/components/company/PaymentModel";
import CompanyTable from "@/components/company/CompanyTable";
import useFetchWithAuth from "@/hooks/useFetchWithAuth";
import { TriangleAlert } from "lucide-react";

const CompaniesPage: React.FC = () => {
    // const [companies, setCompanies] = useState<Company[]>([]);
    const [selectedPayments, setSelectedPayments] = useState<Payment[] | null>(
        null
    );
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    const {
        data: companies,
        isLoading,
        error,
        refetch,
    } = useFetchWithAuth("/company/info");

    const handleViewPayments = (payments: Payment[]) => {
        setSelectedPayments(payments);
        setIsPaymentModalOpen(true);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="max-w-md w-full text-center">
                    <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-100 mb-4">
                        <TriangleAlert className="text-red-600" size={32} />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Unable to Load Content
                    </h3>
                    <p className="text-gray-600 mb-4">
                        {getErrorMessage(error)}
                    </p>
                    <button
                        onClick={() => refetch()} // Your retry function here
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    // Helper function for consistent error message extraction
    function getErrorMessage(error: any): string {
        return (
            error?.response?.data?.message ||
            error?.response?.data ||
            error?.message ||
            "Please try again later"
        );
    }

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Card className="mb-6 bg-white/30 backdrop-blur-md">
                    <CardHeader>
                        <CardTitle className="text-3xl">
                            Companies Management
                        </CardTitle>
                        <p className="text-muted-foreground mt-2">
                            Manage and view all registered companies and their
                            payment history
                        </p>
                    </CardHeader>
                </Card>

                <CompanyTable
                    companies={companies}
                    onViewPayments={handleViewPayments}
                />

                {/* Payment Modal */}
                <PaymentModal
                    payments={selectedPayments || []}
                    open={isPaymentModalOpen}
                    onOpenChange={setIsPaymentModalOpen}
                />
            </div>
        </div>
    );
};

export default CompaniesPage;
