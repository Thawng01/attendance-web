import { clientApi } from "@/api/clientApi";
import {
    useCallback,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";
import { Auth, type AuthType, type Company } from "./AuthContext";

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [isLogged, setLogged] = useState(false);
    const [user, setUser] = useState<Company | null>(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const result = localStorage.getItem("attendance_auth");
        if (result) {
            const value = JSON.parse(result);
            setToken(value);
            setLogged(true);
        }

        setLoading(false);
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
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        if (token) fetchUserLogged();
    }, [token]);

    const expiredDate = useMemo(() => {
        const latestPayment = user?.Payment?.[user.Payment.length - 1];
        if (!latestPayment) return undefined;

        const date = new Date(latestPayment.package.createdAt);
        date.setFullYear(date.getFullYear() + 1);
        return date;
    }, [user]);

    const logout = useCallback(() => {
        setLogged(false);
        localStorage.removeItem("attendance_auth");
        setUser(null);
        setToken(null);
    }, []);

    const value = useMemo<AuthType>(
        () => ({
            isLogged,
            user,
            loading,
            token,
            setToken,
            setLogged,
            setUser,
            logout,
            expiredDate,
        }),
        [expiredDate, isLogged, loading, logout, token, user]
    );

    return <Auth.Provider value={value}>{children}</Auth.Provider>;
};

export default AuthContextProvider;
