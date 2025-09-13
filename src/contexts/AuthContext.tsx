import React, { useContext, useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type Company = {
    id: string;
    name: string;
    description?: string;
    username: string;
    email: string;
    createdAt: string;
};

type AuthType = {
    isLogged: boolean;
    loading: boolean;
    setLogged: React.Dispatch<React.SetStateAction<boolean>>;
    user: Company | null;
    setUser: React.Dispatch<React.SetStateAction<Company | null>>;
    logout: () => void;
};

export const Auth = React.createContext<AuthType | null>(null);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [isLogged, setLogged] = useState(false);
    const [user, setUser] = useState<Company | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUserLogged = () => {
            const result = localStorage.getItem("auth");
            if (result) {
                const value = JSON.parse(result);
                setUser(value);
                setLogged(true);
            }
            setLoading(false);
        };

        checkUserLogged();
    }, []);

    const logout = () => {
        setLogged(false);
        localStorage.removeItem("auth");
        setUser(null);
    };

    return (
        <Auth.Provider
            value={{ isLogged, user, loading, setLogged, setUser, logout }}
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
