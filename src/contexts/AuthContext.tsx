import {
    createContext,
    useContext,
    type Dispatch,
    type SetStateAction,
} from "react";
import type { Payment } from "type";

type CompanyRole = "ADMIN" | "SUPERADMIN";

type PaymentStatus =
    | "PENDING"
    | "COMPLETED"
    | "FAILED"
    | "CANCELLED"
    | "REFUNDED";

export type Company = {
    id: string;
    name: string;
    description?: string;
    username: string;
    email: string;
    createdAt: string;
    role: CompanyRole;
    paymentStatus: PaymentStatus;
    Payment?: Payment[];
};

export type AuthType = {
    isLogged: boolean;
    loading: boolean;
    token: string | null;
    setLogged: Dispatch<SetStateAction<boolean>>;
    user: Company | null;
    setUser: Dispatch<SetStateAction<Company | null>>;
    logout: () => void;
    setToken: Dispatch<SetStateAction<string | null>>;
    expiredDate: Date | undefined;
};

export const Auth = createContext<AuthType | null>(null);

export const useAuth = () => {
    const auth = useContext(Auth);
    if (!auth) {
        throw new Error(
            "Auth context must be used inside AuthContextProvider."
        );
    }

    return auth;
};
