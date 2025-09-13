import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { routes } from "./App.tsx";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import AuthContextProvider from "./contexts/AuthContext.tsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AuthContextProvider>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={routes} />
                <Toaster />
            </QueryClientProvider>
        </AuthContextProvider>
    </StrictMode>
);
