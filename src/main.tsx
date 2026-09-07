import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { routes } from "./App.tsx";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import AuthContextProvider from "./contexts/AuthContextProvider.tsx";
import type { AxiosError } from "axios";
import InitialLoading from "./components/skeleton/InitialLoading.tsx";

const NON_RETRYABLE_STATUS_CODES = new Set([
    400, 401, 403, 404, 409, 422, 429,
]);

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 30_000,
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

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AuthContextProvider>
            <QueryClientProvider client={queryClient}>
                <Suspense fallback={<InitialLoading />}>
                    <RouterProvider router={routes} />
                </Suspense>
                <Toaster />
            </QueryClientProvider>
        </AuthContextProvider>
    </StrictMode>
);
