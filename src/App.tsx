import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./layouts/RootLayout";
import BranchUser from "./pages/BranchUser";
import WelcomePage from "./pages/Welcome";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

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
