// components/InitialLoading.jsx
const InitialLoading = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center p-8">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-8 h-8 bg-blue-500 rounded-full animate-ping"></div>
                    </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mt-6">
                    Loading
                </h3>
                {/* <p className="text-gray-500 text-sm mt-2">
                    Preparing your dashboard
                </p> */}

                {/* Mobile optimized */}
                <div className="mt-8 md:hidden">
                    <div className="flex space-x-2 justify-center">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                        <div
                            className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                            className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InitialLoading;
