import useFetchWithAuth from "@/hooks/useFetchWithAuth";
import { useState } from "react";
import AttendanceChart from "./AttendanceChart";
import type { Branch } from "@/pages/BranchUser";

const AttendanceChartFilter = ({
    branches,
    companyId,
}: {
    branches: Branch[];
    companyId: string;
}) => {
    const [selectedBranch, setSelectedBranch] = useState<string>(
        branches[0]?.id
    );
    const { data: weeklySessions = [] } = useFetchWithAuth<
        { name: string; total: number }[]
    >(
        `/sessions/weekly/${companyId}?branchId=${selectedBranch}`,
        Boolean(companyId && selectedBranch)
    );

    const branchName = branches.find((b) => b.id === selectedBranch)?.name;
    return (
        <AttendanceChart
            data={weeklySessions}
            branches={branches}
            filter={selectedBranch}
            setFilter={setSelectedBranch}
            branchName={branchName!}
        />
    );
};

export default AttendanceChartFilter;
