import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./layouts/RootLayout";
import BranchUser from "./pages/BranchUser";
import WelcomePage from "./pages/Welcome";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import BranchPage from "./pages/Branch";
import EmployeePage from "./pages/Employee";
import Report from "./pages/Report";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: (
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/branches",
                element: (
                    <ProtectedRoute>
                        <BranchPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/employee",
                element: (
                    <ProtectedRoute>
                        <EmployeePage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/reports",
                element: (
                    <ProtectedRoute>
                        <Report />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/branches/:id",
                element: (
                    <ProtectedRoute>
                        <BranchUser />,
                    </ProtectedRoute>
                ),
            },
        ],
    },

    {
        path: "/welcome",
        element: (
            <PublicRoute>
                <WelcomePage />
            </PublicRoute>
        ),
    },
]);
