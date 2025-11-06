// components/PackageForm.tsx
import React from "react";

import type { Package, PackageFormData } from "type";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface PackageFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    package?: Package | null;
    onSubmit: (data: PackageFormData) => void;
    isLoading?: boolean;
}

const PackageForm: React.FC<PackageFormProps> = ({
    open,
    onOpenChange,
    package: pkg,
    onSubmit,
    isLoading = false,
}) => {
    const [formData, setFormData] = React.useState<PackageFormData>({
        name: pkg?.name || "",
        duration: pkg?.duration || 365,
        userLimit: pkg?.userLimit || 50,
        branchLimit: pkg?.branchLimit || 8,
        price: pkg?.price || 79.99,
        description: pkg?.description || "",
    });

    // Reset form when opening/closing or when package changes
    React.useEffect(() => {
        if (open) {
            setFormData({
                name: pkg?.name || "",
                duration: pkg?.duration || 365,
                userLimit: pkg?.userLimit || 50,
                branchLimit: pkg?.branchLimit || 8,
                price: pkg?.price || 79.99,
                description: pkg?.description || "",
            });
        }
    }, [open, pkg]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "duration" ||
                name === "userLimit" ||
                name === "branchLimit" ||
                name === "price"
                    ? parseFloat(value) || 0
                    : value,
        }));
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {pkg ? "Edit Package" : "Create New Package"}
                    </DialogTitle>
                    <DialogDescription>
                        {pkg
                            ? "Update the package details below."
                            : "Fill in the details to create a new package."}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Package Name</Label>
                            <Input
                                id="name"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter package name"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="duration">Duration (days)</Label>
                            <Input
                                type="number"
                                id="duration"
                                name="duration"
                                required
                                min="1"
                                value={formData.duration}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="price">Price ($)</Label>
                            <Input
                                type="number"
                                id="price"
                                name="price"
                                required
                                min="0"
                                step="0.01"
                                value={formData.price}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="branchLimit">
                                    Branch/Department
                                </Label>
                                <Input
                                    type="number"
                                    id="branchLimit"
                                    name="branchLimit"
                                    required
                                    min="1"
                                    value={formData.branchLimit}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="userLimit">User Limit</Label>
                                <Input
                                    type="number"
                                    id="userLimit"
                                    name="userLimit"
                                    required
                                    min="1"
                                    value={formData.userLimit}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                required
                                rows={3}
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter package description"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            style={{
                                background:
                                    "linear-gradient(to right, #56c1f7, #2192ef, #189af0)",
                            }}
                        >
                            {isLoading
                                ? "Saving..."
                                : pkg
                                ? "Update Package"
                                : "Create Package"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default PackageForm;
