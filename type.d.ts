// types/user.ts
export interface Company {
    id: string
    name: string
    username: string
    email: string
    createdAt: string
    description: string
    paymentStatus: PaymentStatus;
    Payment: Payment[];
}

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

export type PaymentStatus =
    | 'PENDING'
    | 'COMPLETED'
    | 'FAILED'
    | 'REFUNDED'


export interface Package {
    id: string;
    name: string;
    duration: number;
    userLimit: number;
    branchLimit: number
    price: number;
    description: string;
    createdAt: Date
}

export interface Payment {
    id: string;
    companyId: string;
    amount: number;
    currency: string;
    paypalCaptureId?: string;
    paypalOrderId: string;
    createdAt: string;
    status: PaymentStatus;
    packageId: string;
    package: Package;
}

export interface CompanyInfoProps {
    company: Company;
    onUpdateCompany: (company: Partial<Company>) => Promise<void>;
}

export interface PackageFormData {
    name: string;
    duration: number;
    userLimit: number;
    branchLimit: number;
    price: number;
    description: string;
}