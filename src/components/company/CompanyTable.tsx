import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import type { Company, PaymentStatus } from "type";
import { Badge } from "../ui/badge";

interface CompanyTableProps {
    companies: Company[];
    // onEditCompany?: (company: Company) => void;
    onViewPayments?: (payments: Company["Payment"]) => void;
}

const CompanyTable: React.FC<CompanyTableProps> = ({
    companies,
    // onEditCompany,
    onViewPayments,
}) => {
    const [sortField, setSortField] = useState<keyof Company>("name");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    const handleSort = (field: keyof Company) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    const sortedCompanies = [...companies].sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];

        if (typeof aValue === "string" && typeof bValue === "string") {
            return sortDirection === "asc"
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        }

        if (typeof aValue === "string" && typeof bValue === "string") {
            const aDate = new Date(aValue);
            const bDate = new Date(bValue);
            return sortDirection === "asc"
                ? aDate.getTime() - bDate.getTime()
                : bDate.getTime() - aDate.getTime();
        }

        return 0;
    });

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

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const SortIcon: React.FC<{ field: keyof Company }> = ({ field }) => (
        <span className="ml-1">
            {sortField === field && (sortDirection === "asc" ? "↑" : "↓")}
        </span>
    );

    return (
        <Card className="bg-white/30 backdrop-blur-md">
            <CardHeader>
                <CardTitle>Companies ({companies.length})</CardTitle>
            </CardHeader>
            <CardContent>
                {/* Desktop Table */}
                <div className="hidden lg:block">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead
                                    className="cursor-pointer hover:bg-accent"
                                    onClick={() => handleSort("name")}
                                >
                                    Company Name <SortIcon field="name" />
                                </TableHead>
                                {/* <TableHead
                                    className="cursor-pointer hover:bg-accent"
                                    onClick={() => handleSort("username")}
                                >
                                    Username <SortIcon field="username" />
                                </TableHead> */}
                                <TableHead
                                    className="cursor-pointer hover:bg-accent"
                                    onClick={() => handleSort("email")}
                                >
                                    Email <SortIcon field="email" />
                                </TableHead>
                                <TableHead>Payments</TableHead>
                                <TableHead
                                    className="cursor-pointer hover:bg-accent"
                                    onClick={() => handleSort("paymentStatus")}
                                >
                                    Status <SortIcon field="paymentStatus" />
                                </TableHead>
                                <TableHead
                                    className="cursor-pointer hover:bg-accent"
                                    onClick={() => handleSort("createdAt")}
                                >
                                    Joined <SortIcon field="createdAt" />
                                </TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sortedCompanies.map((company) => (
                                <TableRow
                                    key={company.id}
                                    className="hover:bg-accent/50"
                                >
                                    <TableCell className="font-medium">
                                        <div>
                                            <div className="font-semibold">
                                                {company.name}
                                            </div>

                                            <div className="text-sm text-muted-foreground truncate max-w-xs">
                                                @{company.username}
                                            </div>
                                        </div>
                                    </TableCell>
                                    {/* <TableCell>@{company.username}</TableCell> */}
                                    <TableCell>{company.email}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="ghost"
                                            onClick={() =>
                                                onViewPayments?.(
                                                    company.Payment
                                                )
                                            }
                                            className="h-auto p-0 font-normal"
                                        >
                                            {company.Payment.length} payment
                                            {company.Payment.length !== 1
                                                ? "s"
                                                : ""}
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            className={`text-[10px] ${getPaymentStatusVariant(
                                                company.paymentStatus
                                            )}`}
                                        >
                                            {company.paymentStatus}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {formatDate(company.createdAt)}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            {/* <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    onEditCompany?.(company)
                                                }
                                            >
                                                Edit
                                            </Button> */}
                                            <Button
                                                className="text-white rounded-full items-center justify-center"
                                                // variant="ghost"
                                                size="sm"
                                                style={{
                                                    background:
                                                        "linear-gradient(to right, #56c1f7, #2192ef, #189af0)",
                                                }}
                                                onClick={() =>
                                                    onViewPayments?.(
                                                        company.Payment
                                                    )
                                                }
                                            >
                                                <span>View Details</span>
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Mobile Cards */}
                <div className="lg:hidden space-y-4">
                    {sortedCompanies.map((company) => (
                        <Card key={company.id} className="hover:bg-accent/50">
                            <CardContent className="p-4">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-lg">
                                            {company.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            @{company.username}
                                        </p>
                                    </div>
                                    <Badge
                                        className={`${getPaymentStatusVariant(
                                            company.paymentStatus
                                        )}`}
                                    >
                                        {company.paymentStatus.toLowerCase()}
                                    </Badge>
                                </div>

                                <div className="space-y-2 text-sm mb-4">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                            Email:
                                        </span>
                                        <span>{company.email}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                            Payments:
                                        </span>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                                onViewPayments?.(
                                                    company.Payment
                                                )
                                            }
                                            className="h-auto p-0 font-normal"
                                        >
                                            {company.Payment.length} payment
                                            {company.Payment.length !== 1
                                                ? "s"
                                                : ""}
                                        </Button>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                            Joined:
                                        </span>
                                        <span>
                                            {formatDate(company.createdAt)}
                                        </span>
                                    </div>
                                    {company.description && (
                                        <div>
                                            <span className="text-muted-foreground">
                                                Description:
                                            </span>
                                            <p className="mt-1 line-clamp-2">
                                                {company.description}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="flex space-x-2 pt-3 border-t">
                                    {/* <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1"
                                        onClick={() => onEditCompany?.(company)}
                                    >
                                        Edit
                                    </Button> */}
                                    <Button
                                        size="sm"
                                        className="flex-1"
                                        style={{
                                            background:
                                                "linear-gradient(to right, #56c1f7, #2192ef, #189af0)",
                                        }}
                                        onClick={() =>
                                            onViewPayments?.(company.Payment)
                                        }
                                    >
                                        View Details
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Empty State */}
                {companies.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-muted-foreground mb-4">
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
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">
                            No companies found
                        </h3>
                        <p className="text-muted-foreground">
                            There are no companies to display at the moment.
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default CompanyTable;
