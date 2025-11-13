import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Payment, PaymentStatus } from "type";

interface PaymentModalProps {
    payments: Payment[];
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
    payments,
    open,
    onOpenChange,
}) => {
    const formatCurrency = (amount: number, currency: string) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency,
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getPaymentStatusVariant = (status: PaymentStatus) => {
        switch (status) {
            case "COMPLETED":
                return "bg-green-600";
            case "PENDING":
                return "bg-gray-400";
            case "FAILED":
                return "bg-red-600";
            case "REFUNDED":
                return "bg-yellow-400";
            default:
                return "bg-gray-700";
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Payment History</DialogTitle>
                    <DialogDescription>
                        {payments.length} payment
                        {payments.length !== 1 ? "s" : ""} found
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    {payments.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-muted-foreground">
                                No payment history available.
                            </p>
                        </div>
                    ) : (
                        payments.map((payment) => (
                            <Card
                                key={payment.id}
                                className="hover:bg-accent/50"
                            >
                                <CardHeader className="pb-3">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-lg">
                                                {payment.package.name}
                                            </CardTitle>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                {payment.package.description}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold">
                                                {formatCurrency(
                                                    payment.amount,
                                                    payment.currency
                                                )}
                                            </p>
                                            <Badge
                                                className={`mt-1 ${getPaymentStatusVariant(
                                                    payment.status
                                                )}`}
                                            >
                                                {payment.status}
                                            </Badge>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm border-t pt-3">
                                        <div>
                                            <span className="font-medium text-muted-foreground">
                                                Duration:
                                            </span>
                                            <p>
                                                {payment.package.duration} days
                                            </p>
                                        </div>
                                        <div>
                                            <span className="font-medium text-muted-foreground">
                                                Limit:
                                            </span>
                                            <p>
                                                {payment.package.userLimit}{" "}
                                                users
                                            </p>
                                        </div>
                                        <div>
                                            <span className="font-medium text-muted-foreground">
                                                Payment Date:
                                            </span>
                                            <p>
                                                {formatDate(payment.createdAt)}
                                            </p>
                                        </div>
                                    </div>

                                    {payment.paypalOrderId && (
                                        <div className="mt-3 pt-3 border-t">
                                            <span className="font-medium text-muted-foreground text-sm">
                                                PayPal Order ID:
                                            </span>
                                            <p className="text-sm font-mono">
                                                {payment.paypalOrderId}
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default PaymentModal;
