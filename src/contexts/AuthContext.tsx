import { clientApi } from "@/api/clientApi";
import React, { useContext, useEffect, useState, type ReactNode } from "react";

import type { Payment } from "type";

type CompanyRole = "ADMIN" | "SUPERADMIN";

type PaymentStatus =
    | "PENDING"
    | "COMPLETED"
    | "FAILED"
    | "CANCELLED"
    | "REFUNDED";

type Company = {
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

type AuthType = {
    isLogged: boolean;
    loading: boolean;
    token: string | null;
    setLogged: React.Dispatch<React.SetStateAction<boolean>>;
    user: Company | null;
    setUser: React.Dispatch<React.SetStateAction<Company | null>>;
    logout: () => void;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
    expiredDate: Date | undefined;
};

export const Auth = React.createContext<AuthType | null>(null);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [isLogged, setLogged] = useState(false);
    const [user, setUser] = useState<Company | null>(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState<string | null>(null);
    const [expiredDate, setExpiredDate] = useState<Date | undefined>(undefined);

    useEffect(() => {
        const checkUserLogged = () => {
            const result = localStorage.getItem("attendance_auth");
            if (result) {
                const value = JSON.parse(result);
                setToken(value);
                setLogged(true);
            }

            setLoading(false);
        };
        checkUserLogged();
    }, []);

    useEffect(() => {
        const fetchUserLogged = async () => {
            try {
                const res = await clientApi.get("/company/me", {
                    headers: {
                        "x-auth-token": token,
                    },
                });

                setUser(res.data);
            } catch (error) {
            } finally {
                setLoading(false);
            }
        };

        if (token) fetchUserLogged();
    }, [token]);

    useEffect(() => {
        if (user) {
            if (user.Payment && user.Payment?.length > 0) {
                const paymentDate = new Date(
                    user.Payment[user.Payment?.length - 1].package.createdAt
                );

                const expiredDate = new Date(paymentDate);
                expiredDate
                    .setFullYear(expiredDate.getFullYear() + 1)
                    .toString();

                setExpiredDate(expiredDate);
            }
        }
    }, [user]);

    const logout = () => {
        setLogged(false);
        localStorage.removeItem("attendance_auth");
        setUser(null);
        setToken(null);
    };

    return (
        <Auth.Provider
            value={{
                isLogged,
                user,
                loading,
                token,
                setToken,
                setLogged,
                setUser,
                logout,
                expiredDate,
            }}
        >
            {children}
        </Auth.Provider>
    );
};

export const useAuth = () => {
    const auth = useContext(Auth);
    if (!auth) {
        throw new Error(
            "Auth context must be used inside AuthContextProvider."
        );
    }

    return auth;
};

export default AuthContextProvider;
