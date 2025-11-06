import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Check, Zap } from "lucide-react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import useFetch from "@/hooks/useFetch";
import { clientApi } from "@/api/clientApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import type { Package } from "type";

export function PaymentPage() {
    const [selectedPackage, setSelectedPackage] = useState<
        Package | undefined
    >();
    const [paymentId, setPaymentId] = useState<string | null>(null);

    const { data: packages } = useFetch("/packages");

    const navigate = useNavigate();
    const { token, setToken } = useAuth();

    const selectedPackageData = packages?.find(
        (pkg: Package) => pkg.id === selectedPackage?.id
    );

    // FIXED: This should return a Promise that resolves to order ID
    const createOrder = async (): Promise<string> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await clientApi.post(
                    "/payments",
                    {
                        price: selectedPackage?.price,
                        packageId: selectedPackage?.id,
                    },
                    {
                        headers: {
                            "x-auth-token": token,
                        },
                    }
                );

                const orderData = await response.data;

                setPaymentId(orderData.paymentId);

                // Resolve with the PayPal order ID
                resolve(orderData.id);
            } catch (error) {
                // console.error("Error creating order:", error);
                reject(error);
            }
        });
    };

    // FIXED: Proper onApprove implementation
    const onApprove = async (data: any) => {
        // console.log("Payment approved:", data);
        try {
            const response = await clientApi.post(
                `/payments/${paymentId}/capture`,
                {
                    orderID: data.orderID,
                },
                {
                    headers: {
                        "x-auth-token": token,
                    },
                }
            );

            const captureData = await response.data;

            setToken(captureData.token);
            // console.log("captureData : ", captureData);

            navigate("/auth/payments/success", {
                state: {
                    package: selectedPackage,
                },
            });
        } catch (error) {
            // console.error("Error capturing payment:", error);
            alert("Payment failed. Please try again.");
        }
    };

    // const onError = (err: any) => {
    //     // console.error("PayPal error:", err);
    //     alert("An error occurred with PayPal. Please try again.");
    // };

    // const onCancel = (data: any) => {
    //     console.log("Payment cancelled:", data);
    //     // Handle cancellation if needed
    // };

    return (
        <div className="min-h-screen sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Choose Your Plan
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Select the perfect plan for your organization. All plans
                        include core features with different limits to match
                        your needs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {packages?.map((pkg: Package) => (
                        <Card
                            key={pkg.id}
                            className={`bg-white/30 backdrop-blur-md relative transition-all duration-300 hover:scale-105 cursor-pointer ${
                                selectedPackage?.id === pkg.id
                                    ? "ring-1 ring-blue-500 shadow-xl border-blue-500"
                                    : "border-gray-100"
                            } `}
                            onClick={() => setSelectedPackage(pkg)}
                        >
                            <CardHeader className="text-center pb-4">
                                <CardTitle className="text-2xl font-bold text-gray-900">
                                    {pkg.name}
                                </CardTitle>
                                <p className="text-gray-600 text-sm mt-2">
                                    {pkg.description}
                                </p>

                                <div className="mt-4">
                                    <span className="text-4xl font-bold text-gray-900">
                                        ${pkg.price}
                                    </span>
                                    <span className="text-gray-600 ml-2">
                                        /year
                                    </span>
                                </div>
                            </CardHeader>

                            <CardContent className="pt-2">
                                <ul className="space-y-3 mb-6">
                                    <li className="flex items-center text-sm">
                                        <Check className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                                        <span className="text-gray-400">
                                            Up to {pkg.branchLimit}{" "}
                                            branches/departments
                                        </span>
                                    </li>
                                    <li className="flex items-center text-sm">
                                        <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                                        <span className="text-gray-400">
                                            Up to {pkg.userLimit} employees
                                        </span>
                                    </li>
                                </ul>

                                <Button
                                    variant={
                                        selectedPackage?.id === pkg.id
                                            ? "default"
                                            : "outline"
                                    }
                                    className="w-full"
                                    style={
                                        selectedPackage?.id === pkg.id
                                            ? {
                                                  background:
                                                      "linear-gradient(to right, #56c1f7, #2192ef, #189af0)",
                                              }
                                            : {}
                                    }
                                >
                                    {selectedPackage?.id === pkg.id
                                        ? "Selected"
                                        : "Select Plan"}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {selectedPackage && (
                    <Card className="max-w-2xl mx-auto bg-white/30 backdrop-blur-md">
                        <CardHeader>
                            <CardTitle className="text-xl flex items-center">
                                <Zap className="w-5 h-5 text-yellow-500 mr-2" />
                                Order Summary
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {selectedPackageData && (
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center p-4 bg-white/30 backdrop-blur-md rounded-lg">
                                        <div>
                                            <h3 className="font-semibold text-gray-900">
                                                {selectedPackageData.name}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                {
                                                    selectedPackageData.description
                                                }
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-gray-900">
                                                ${selectedPackageData.price}
                                                <span className="text-sm font-normal text-gray-600">
                                                    /year
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <div className="text-center p-3 bg-blue-50 rounded-lg">
                                        <Users className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                                        <div className="font-semibold">
                                            {selectedPackageData.limit} Users
                                        </div>
                                    </div> */}

                                    <div className="pt-4 border-t">
                                        <PayPalButtons
                                            fundingSource="paypal"
                                            createOrder={createOrder} // FIXED: Use createOrder directly
                                            onApprove={onApprove}
                                            // onError={onError}
                                            // onCancel={onCancel}
                                            style={{
                                                layout: "vertical",
                                                shape: "rect",
                                                color: "blue",
                                                height: 45,
                                                label: "paypal",
                                            }}
                                        />

                                        <p className="text-xs text-gray-500 text-center mt-3">
                                            You'll be redirected to PayPal to
                                            complete your payment securely
                                        </p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
