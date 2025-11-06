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
import { RegisterPage } from "./pages/auth/Register";
import PublicLayout from "./layouts/PublicLayout";
import { PaymentSuccessPage } from "./pages/auth/Success";
import OwnerHome from "./pages/owner/OwnerHome";
import OwnerLayout from "./layouts/OwnerLayout";
import CompanyDetailPage from "./pages/CompanyDetail";
import OwnerPackagesPage from "./pages/owner/OwnerPackagePage";
import { PackagePage } from "./pages/PackagePage";
import { PaymentPage } from "./pages/auth/PaymentPage";

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
            {
                path: "/company/details",
                element: (
                    <ProtectedRoute>
                        <CompanyDetailPage />,
                    </ProtectedRoute>
                ),
            },

            {
                path: "/packages",
                element: (
                    <ProtectedRoute>
                        <PackagePage />
                    </ProtectedRoute>
                ),
            },
        ],
    },

    {
        path: "/admin",
        element: <OwnerLayout />,
        children: [
            {
                index: true,
                element: <OwnerHome />,
            },
            {
                path: "/admin/packages",
                element: (
                    <ProtectedRoute>
                        <OwnerPackagesPage />,
                    </ProtectedRoute>
                ),
            },
            {
                path: "/admin/company/details",
                element: (
                    <ProtectedRoute>
                        <CompanyDetailPage />,
                    </ProtectedRoute>
                ),
            },
        ],
    },

    {
        path: "/",
        element: <PublicLayout />,
        children: [
            {
                path: "/welcome",
                element: (
                    <PublicRoute>
                        <WelcomePage />
                    </PublicRoute>
                ),
            },
            {
                path: "/auth/register",
                element: (
                    <PublicRoute>
                        <RegisterPage />
                    </PublicRoute>
                ),
            },
            {
                path: "/auth/payment",
                element: (
                    <ProtectedRoute>
                        <PaymentPage />
                    </ProtectedRoute>
                ),
            },

            {
                path: "/auth/payments/success",
                element: (
                    <ProtectedRoute>
                        <PaymentSuccessPage />
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);
