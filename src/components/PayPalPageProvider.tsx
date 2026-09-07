import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import type { ReactNode } from "react";

const paypalOptions = {
    clientId: import.meta.env.VITE_PAYPAL_LIVE_CLIENT_ID,
};

const PayPalPageProvider = ({ children }: { children: ReactNode }) => (
    <PayPalScriptProvider options={paypalOptions}>
        {children}
    </PayPalScriptProvider>
);

export default PayPalPageProvider;
