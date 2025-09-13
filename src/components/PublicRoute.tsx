// components/PublicRoute.jsx
import type { ReactNode } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import InitialLoading from "./skeleton/InitialLoading";

const PublicRoute = ({ children }: { children: ReactNode }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <InitialLoading />;
    }

    return !user ? children : <Navigate to="/" replace />;
};

export default PublicRoute;
