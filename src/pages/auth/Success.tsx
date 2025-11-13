import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, CheckCircle, Users } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export function PaymentSuccessPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { package: selectedPackage, message } = location.state || {};

    const duration = selectedPackage.duration === 365 ? "year" : "month";

    if (!selectedPackage) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Card className="max-w-md w-full">
                    <CardContent className="pt-6 text-center">
                        <p className="text-gray-600">
                            No payment information found.
                        </p>
                        <Button
                            onClick={() => navigate("/payment")}
                            className="mt-4"
                        >
                            Back to Pricing
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto bg-white/20 backdrop-blur-md">
                <Card className="">
                    <CardContent className="pt-6">
                        <div className="text-center mb-8">
                            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Payment Successful!
                            </h1>
                            <p className="text-gray-600">{message}</p>
                        </div>

                        <Card className=" mb-6">
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    Order Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="bg-white/30">
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">
                                            Plan:
                                        </span>
                                        <span className="font-semibold">
                                            {selectedPackage.name}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">
                                            Amount:
                                        </span>
                                        <span className="font-semibold">
                                            ${selectedPackage.price}/{duration}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">
                                            User Limit:
                                        </span>

                                        <span className="font-semibold flex items-center">
                                            <Users className="w-4 h-4 mr-1" />
                                            {selectedPackage.userLimit} users
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">
                                            Branch Limit:
                                        </span>

                                        <span className="font-semibold flex items-center">
                                            <Building className="w-4 h-4 mr-1" />
                                            {selectedPackage.branchLimit}{" "}
                                            branches/departments
                                        </span>
                                    </div>
                                    {/* <div className="flex justify-between">
                                        <span className="text-gray-600">
                                            Page Limit:
                                        </span>
                                        <span className="font-semibold flex items-center">
                                            <FileText className="w-4 h-4 mr-1" />
                                            {selectedPackage.pageLimit} pages
                                        </span>
                                    </div> */}
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                onClick={() => navigate("/")}
                                style={{
                                    background:
                                        "linear-gradient(to right, #56c1f7, #2192ef, #189af0)",
                                }}
                            >
                                Go to Home
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
