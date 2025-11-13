import { Calendar, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const WelcomePage = () => {
    return (
        <div className="min-h-screen">
            <header className="w-full bg-white/30 backdrop-blur-md shadow-sm fixed top-0 left-0">
                <div className="px-6 py-4 flex items-center">
                    <img
                        src="/logo.png"
                        className="h-12 w-12 text-[#1891f0] mr-4"
                    />
                    <h1 className=" font-semibold text-[#189af0]">
                        Attendance
                    </h1>
                </div>
            </header>
            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Welcome to Your Attendance Management System
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                        Streamline your employee attendance tracking with our
                        powerful and intuitive platform. Get started by creating
                        your company profile.
                    </p>

                    <div className="flex justify-center">
                        {/* <CreateCompany label="Create Your Company" /> */}

                        <Link to={"/auth/register"}>
                            <Button
                                className="p-4"
                                size="lg"
                                style={{
                                    background:
                                        "linear-gradient(to right, #56c1f7, #2192ef, #189af0)",
                                }}
                            >
                                <p className={"text-white text-lg"}>
                                    Create Your Company
                                </p>
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Features Section */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="text-center p-6 bg-white rounded-lg shadow-md">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                            <Clock className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Real-time Tracking
                        </h3>
                        <p className="text-gray-600">
                            Monitor attendance in real-time with our advanced
                            tracking system.
                        </p>
                    </div>

                    <div className="text-center p-6 bg-white rounded-lg shadow-md">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                            <Users className="h-6 w-6 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Employee Management
                        </h3>
                        <p className="text-gray-600">
                            Easily manage your team members and their attendance
                            records.
                        </p>
                    </div>

                    <div className="text-center p-6 bg-white rounded-lg shadow-md">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                            <Calendar className="h-6 w-6 text-purple-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Detailed Reports
                        </h3>
                        <p className="text-gray-600">
                            Export the staff attendance history into excel
                        </p>
                    </div>
                </div>

                {/* Call to Action */}
                <div
                    className="text-center rounded-2xl p-12 text-white"
                    style={{
                        background:
                            "linear-gradient(to right, #56c1f7, #2192ef, #189af0)",
                    }}
                >
                    <h2 className="text-3xl font-bold mb-4">
                        Ready to Get Started?
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        Create your company profile and start managing
                        attendance efficiently today.
                    </p>

                    <div className="flex justify-center">
                        <Link to={"/auth/register"}>
                            <Button
                                className="p-4 bg-white"
                                size="lg"
                                // style={{
                                //     background:
                                //         "linear-gradient(to right, #56c1f7, #2192ef, #189af0)",
                                // }}
                            >
                                <p className={"text-[#189af0] text-lg"}>
                                    Create Your Company
                                </p>
                            </Button>
                        </Link>
                        {/* <CreateCompany label="Register Now" now={true} /> */}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default WelcomePage;
