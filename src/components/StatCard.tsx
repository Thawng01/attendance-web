const StatCard = ({
    totalUsers,
    totalActiveUsers,
}: // numberOfHistory,
{
    totalUsers: number;
    totalActiveUsers: number;
    // numberOfHistory: number;
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/30 backdrop-blur-md rounded-xl shadow-sm p-6 border border-gray-100 transition-all hover:shadow-md">
                <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-blue-100">
                        <svg
                            className="w-6 h-6 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                        </svg>
                    </div>
                    <div className="ml-4">
                        <h2 className="text-2xl font-bold text-gray-800">
                            {totalUsers}
                        </h2>
                        <p className="text-gray-600">Total Users</p>
                    </div>
                </div>
            </div>

            <div className="bg-white/30 backdrop-blur-md rounded-xl shadow-sm p-6 border border-gray-100 transition-all hover:shadow-md">
                <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-green-100">
                        <svg
                            className="w-6 h-6 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                            />
                        </svg>
                    </div>
                    <div className="ml-4">
                        <h2 className="text-2xl font-bold text-gray-800">
                            {totalActiveUsers}
                        </h2>
                        <p className="text-gray-600">Active Users</p>
                    </div>
                </div>
            </div>

            {/* <div className="bg-white/30 backdrop-blur-md rounded-xl shadow-sm p-6 border border-gray-100 transition-all hover:shadow-md">
                <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-amber-100">
                        <svg
                            className="w-6 h-6 text-amber-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <div className="ml-4">
                        <h2 className="text-2xl font-bold text-gray-800">
                            {numberOfHistory}
                        </h2>
                        <p className="text-gray-600">History Events</p>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default StatCard;
