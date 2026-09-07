import {
    createContext,
    useContext,
    type Dispatch,
    type SetStateAction,
} from "react";
import type { Company as CompanyData, Payment } from "@/types";

export type Company = Omit<CompanyData, "Payment"> & {
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
