import type { History } from "@/pages/BranchUser";
import { useMemo } from "react";

type SortField = 'startTime' | 'endTime' | 'date';
export const useSortedHistory = (
    historyData: History[],
    sortField: SortField,
    sortDirection?: 'asc'
) => {
    const sortedData = useMemo(() => {
        if (!historyData || historyData.length === 0) return [];

        return [...historyData].sort((a, b) => {
            let valueA: string;
            let valueB: string;

            switch (sortField) {
                case 'startTime':
                    valueA = a.session.startTime;
                    valueB = b.session.startTime;
                    break;
                case 'endTime':
                    valueA = a.session.endTime;
                    valueB = b.session.endTime;
                    break;
                case 'date':
                    valueA = a.createdAt;
                    valueB = b.createdAt;
                    break;
                default:
                    return 0;
            }

            // Convert to Date objects for proper comparison
            const dateA = new Date(valueA);
            const dateB = new Date(valueB);

            if (sortDirection === 'asc') {
                return dateA.getTime() - dateB.getTime();
            } else {
                return dateB.getTime() - dateA.getTime();
            }
        });
    }, [historyData, sortField, sortDirection]);

    return sortedData;
};