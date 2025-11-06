// pages/PackagesPage.tsx
import PackageCard from "@/components/packages/PackageCard";
import PackageForm from "@/components/packages/PackageForm";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useDelete from "@/hooks/useDelete";
import useFetch from "@/hooks/useFetch";
import usePostWithAuth from "@/hooks/usePostWithAuth";
import useUpdateWithAuth from "@/hooks/useUpdateWithAuth";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import type { Package, PackageFormData } from "type";

const OwnerPackagesPage: React.FC = () => {
    const [formOpen, setFormOpen] = useState(false);
    const [editingPackage, setEditingPackage] = useState<Package | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    const queryClient = useQueryClient();

    const { data: packages, isLoading, error } = useFetch("/packages");
    const { mutate: createPackage, isPending } = usePostWithAuth(
        `/packages`,
        () => {
            queryClient.invalidateQueries({ queryKey: ["/packages"] });
            setFormOpen(false);
        }
    );
    const { mutate: updatePackage, isPending: updating } = useUpdateWithAuth(
        `/packages/${editingPackage?.id}`,
        () => {
            queryClient.invalidateQueries({ queryKey: ["/packages"] });
            setFormOpen(false);
        }
    );
    const { mutate: deletePackage } = useDelete(`/packages`, () => {
        queryClient.invalidateQueries({ queryKey: ["/packages"] });
        setFormOpen(false);
    });
    // Filter packages based on search term
    const filteredPackages = packages?.filter(
        (pkg: Package) =>
            pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pkg.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreatePackage = async (formData: PackageFormData) => {
        createPackage(formData);
    };

    const handleUpdatePackage = async (formData: PackageFormData) => {
        if (!editingPackage) return;

        updatePackage(formData);
    };

    const handleDeletePackage = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this package?")) {
            return;
        }

        deletePackage({ id });
    };

    const handleEdit = (pkg: Package) => {
        setEditingPackage(pkg);
        setFormOpen(true);
    };

    const handleFormSubmit = (formData: PackageFormData) => {
        if (editingPackage) {
            handleUpdatePackage(formData);
        } else {
            handleCreatePackage(formData);
        }
    };

    const handleFormOpenChange = (open: boolean) => {
        setFormOpen(open);
        if (!open) {
            setEditingPackage(null);
        }
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
            <div className="min-h-screen flex items-center justify-center bg-background px-4">
                <Card className="w-full max-w-md text-center">
                    <CardHeader>
                        <CardTitle className="text-destructive">
                            Unable to Load Packages
                        </CardTitle>
                        <CardDescription>{error}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={() => window.location.reload()}>
                            Try Again
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white/20 backdrop-blur-md ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">
                                Packages
                            </h1>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Manage your subscription packages and pricing
                                plans
                            </p>
                        </div>
                        <Button
                            onClick={() => setFormOpen(true)}
                            style={{
                                background:
                                    "linear-gradient(to right, #56c1f7, #2192ef, #189af0)",
                            }}
                        >
                            <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                            New Package
                        </Button>
                    </div>
                </div>

                {/* Search */}
                <div className="mb-6">
                    <Input
                        placeholder="Search packages..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-sm"
                    />
                </div>

                {/* Packages Grid */}
                {filteredPackages.length === 0 ? (
                    <Card>
                        <CardContent className="text-center py-12">
                            <div className="mx-auto w-12 h-12 text-muted-foreground mb-4">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-foreground mb-2">
                                No packages found
                            </h3>
                            <p className="text-muted-foreground mb-4">
                                {searchTerm
                                    ? "Try adjusting your search terms"
                                    : "Get started by creating a new package"}
                            </p>
                            <Button onClick={() => setFormOpen(true)}>
                                New Package
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPackages.map((pkg: Package) => (
                            <PackageCard
                                key={pkg.id}
                                pkg={pkg}
                                onEdit={handleEdit}
                                onDelete={handleDeletePackage}
                            />
                        ))}
                    </div>
                )}

                <PackageForm
                    open={formOpen}
                    onOpenChange={handleFormOpenChange}
                    package={editingPackage}
                    onSubmit={handleFormSubmit}
                    isLoading={isPending || updating}
                />
            </div>
        </div>
    );
};

export default OwnerPackagesPage;
