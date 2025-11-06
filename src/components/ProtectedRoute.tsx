// components/ProtectedRoute.jsx
import type { ReactNode } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import InitialLoading from "./skeleton/InitialLoading";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { token, loading } = useAuth();

    if (loading) {
        return <InitialLoading />;
    }

    return token ? children : <Navigate to="/welcome" replace />;
};

export default ProtectedRoute;
