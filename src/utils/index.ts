import type { History } from "@/pages/BranchUser";

// Utility function to format date
export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};
// Utility function to format date and time
export const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};


export const formatDuration = (ms: number) => {

    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0 && minutes > 0) {
        return `${hours}hour${hours > 1 ? "s" : ""} ${minutes}min${minutes > 1 ? "s" : ""}`;
    } else if (hours > 0) {
        return `${hours}hr${hours > 1 ? "s" : ""}`;
    } else if (minutes > 0) {
        return `${minutes}min${minutes > 1 ? "s" : ""}`;
    } else {
        return `${seconds}s`;
    }
};


export function sortHistory(data: History[], sortBy: 'duration' | 'date', order: 'asc' | 'desc' = 'asc'): History[] {
    return [...data].sort((a, b) => {
        let comparison = 0;

        if (sortBy === 'duration') {
            comparison = a.session.duration - b.session.duration;
        } else if (sortBy === 'date') {
            comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }

        return order === 'desc' ? -comparison : comparison;
    });
}