// components/PackageCard.tsx
import React from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import type { Package } from "type";

interface PackageCardProps {
    pkg: Package;
    onEdit: (pkg: Package) => void;
    onDelete: (id: string) => void;
}

const PackageCard: React.FC<PackageCardProps> = ({ pkg, onEdit, onDelete }) => {
    return (
        <Card className="bg-white/30 backdrop-blur-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{pkg.name}</CardTitle>
                    <Badge className="text-lg font-semibold bg-green-100 text-green-600">
                        ${pkg.price}
                    </Badge>
                </div>
                <CardDescription className="line-clamp-2 mt-2">
                    {pkg.description}
                </CardDescription>
            </CardHeader>

            <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-2xl font-bold text-blue-400">
                            {pkg.duration}
                        </div>
                        <div className="text-sm text-gray-400">Days</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-2xl font-bold text-blue-400">
                            {pkg.userLimit}
                        </div>
                        <div className="text-sm text-gray-400">Users</div>
                    </div>
                </div>

                <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-blue-400">
                        {pkg.branchLimit}
                    </div>
                    <div className="text-sm text-gray-400">
                        Branches/departments
                    </div>
                </div>

                <div className="flex space-x-2">
                    <Button
                        onClick={() => onEdit(pkg)}
                        variant="default"
                        className="flex-1"
                        style={{
                            background:
                                "linear-gradient(to right, #56c1f7, #2192ef, #189af0)",
                        }}
                    >
                        Edit
                    </Button>
                    <Button
                        onClick={() => onDelete(pkg.id)}
                        variant="destructive"
                        className="flex-1"
                    >
                        Delete
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default PackageCard;
