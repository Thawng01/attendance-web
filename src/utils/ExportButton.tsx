// components/ExportButton.tsx
import React from "react";
import { exportHistoryToExcel } from "../utils/exportToExcel";
import type { History } from "@/pages/BranchUser";
import GradientButton from "@/components/GradientButton";

interface ExportButtonProps {
    data: History[];
    filename?: string;
    disabled?: boolean;
    className?: string;
}

const ExportButton: React.FC<ExportButtonProps> = ({
    data,
    filename = "Attendance_Report.xlsx",
    disabled = false,
}) => {
    const handleExport = () => {
        if (data.length === 0) {
            alert("No data to export");
            return;
        }

        try {
            exportHistoryToExcel(data, filename);
        } catch (error) {
            console.error("Export failed:", error);
            alert("Failed to export data");
        }
    };

    return (
        <GradientButton
            disabled={disabled || data.length === 0}
            onClick={handleExport}
        >
            Export To Excel
        </GradientButton>
    );
};

export default ExportButton;
