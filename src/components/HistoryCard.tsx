import type { History } from "@/pages/BranchUser";
import { formatDate, formatDateTime, formatDuration } from "@/utils";

// History Card Component
const HistoryCard: React.FC<{
    history: History;
}> = ({ history }) => {
    const getUserName = () => {
        return history.user?.name || "Unknown User";
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg">
            <div className="p-5">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-medium text-gray-800">
                            {getUserName()}
                        </h3>
                        <p className="text-sm text-gray-500">
                            {history.user.email || "No provided"}
                        </p>
                    </div>
                    <div
                        className={`px-3 py-1 rounded-full text-xs font-medium ${"bg-blue-50 text-[#189af0]"}`}
                    >
                        {history.Branch.name}
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-xs text-gray-500">Start Time</p>
                        <p className="text-sm font-medium text-gray-500">
                            {formatDateTime(history.session?.startTime)}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Duration</p>
                        <p className="text-sm font-medium text-[#189af0]">
                            {formatDuration(history.session.duration)}
                        </p>
                    </div>
                </div>

                <div className="mt-3">
                    <p className="text-xs text-gray-500">End Time</p>
                    <p className="text-sm font-medium text-gray-500">
                        {formatDateTime(history.session.endTime)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HistoryCard;
