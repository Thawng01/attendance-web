// components/PublicRoute.jsx
import type { ReactNode } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import InitialLoading from "./skeleton/InitialLoading";

const PublicRoute = ({ children }: { children: ReactNode }) => {
    const { token, loading } = useAuth();

    if (loading) {
        return <InitialLoading />;
    }

    return !token ? children : <Navigate to="/" replace />;
};

export default PublicRoute;
