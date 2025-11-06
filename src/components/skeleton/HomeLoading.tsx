export const HomeLoading = () => {
    return (
        <div className="min-h-screen p-8">
            <div className="max-w-6xl mx-auto">
                <div className="animate-pulse">
                    <div className="h-10 bg-gray-300 rounded w-1/4 mb-10"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="rounded-xl shadow-md bg-white/30 backdrop-blur-md p-6 h-80"
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeLoading;
