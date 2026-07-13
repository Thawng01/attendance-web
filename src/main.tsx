import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { routes } from "./App.tsx";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import AuthContextProvider from "./contexts/AuthContext.tsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import type { AxiosError } from "axios";

const NON_RETRYABLE_STATUS_CODES = new Set([
    400, 401, 403, 404, 409, 422, 429,
]);

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: (failureCount, error) => {
                const status = (error as AxiosError).response?.status;

                if (status && NON_RETRYABLE_STATUS_CODES.has(status)) {
                    return false;
                }

                return failureCount < 1;
            },
        },
    },
});

const initialOptions = {
    clientId: import.meta.env.VITE_PAYPAL_LIVE_CLIENT_ID,
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
