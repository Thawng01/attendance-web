// types/user.ts
export interface User {
    id: string;
    name: string;
    email?: string;
    active?: boolean;
    createdAt: Date;
    branchId: string;
    Sessions: Session[];
}

export interface Session {
    id: string;
    userId: string;
    duration?: number;
    active: boolean;
    startTime: Date;
    endTime?: Date;
    createdAt: Date;
}

export interface UserStats {
    totalUsers: number;
    activeUsers: number;
    totalSessions: number;
    activeSessions: number;
    averageSessionDuration: number;
}