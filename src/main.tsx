import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { routes } from "./App.tsx";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import AuthContextProvider from "./contexts/AuthContext.tsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const queryClient = new QueryClient();

const initialOptions = {
    clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
};
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <PayPalScriptProvider options={initialOptions}>
            <AuthContextProvider>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={routes} />
                    <Toaster />
                </QueryClientProvider>
            </AuthContextProvider>
        </PayPalScriptProvider>
    </StrictMode>
);
