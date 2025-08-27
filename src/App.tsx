import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./layouts/RootLayout";
import BranchUser from "./pages/BranchUser";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/branches/:id",
                element: <BranchUser />,
            },
        ],
    },
]);
