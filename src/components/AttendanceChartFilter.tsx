import useFetch from "@/hooks/useFetch";
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
    const { data: weeklySessions } = useFetch(
        `/sessions/weekly/${companyId}?branchId=${selectedBranch}`
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
