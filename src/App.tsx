import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

const Layout = lazy(() => import("./layouts/RootLayout"));
const PublicLayout = lazy(() => import("./layouts/PublicLayout"));
const OwnerLayout = lazy(() => import("./layouts/OwnerLayout"));
const Home = lazy(() => import("./pages/Home"));
const BranchUser = lazy(() => import("./pages/BranchUser"));
const WelcomePage = lazy(() => import("./pages/Welcome"));
const BranchPage = lazy(() => import("./pages/Branch"));
const EmployeePage = lazy(() => import("./pages/Employee"));
const Report = lazy(() => import("./pages/Report"));
const OwnerHome = lazy(() => import("./pages/owner/OwnerHome"));
const CompanyDetailPage = lazy(() => import("./pages/CompanyDetail"));
const OwnerPackagesPage = lazy(() => import("./pages/owner/OwnerPackagePage"));
const RegisterPage = lazy(() =>
    import("./pages/auth/Register").then((module) => ({
        default: module.RegisterPage,
    }))
);
const PaymentSuccessPage = lazy(() =>
    import("./pages/auth/Success").then((module) => ({
        default: module.PaymentSuccessPage,
    }))
);
const PackagePage = lazy(() =>
    import("./pages/PackagePage").then((module) => ({
        default: module.PackagePage,
    }))
);
const PaymentPage = lazy(() =>
    import("./pages/auth/PaymentPage").then((module) => ({
        default: module.PaymentPage,
    }))
);

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
