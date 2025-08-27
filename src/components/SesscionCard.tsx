import type { Session } from "@/pages/BranchUser";
import { formatDateTime, formatDuration } from "@/utils";

// Session Card Component
const SessionCard: React.FC<{ session: Session }> = ({ session }) => {
    const getUserName = () => {
        return session.user?.name || "Unknown User";
    };

    const now = new Date().getTime();
    const diff = now - new Date(session.startTime).getTime();

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg">
            <div className="p-5">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-medium text-gray-800">
                            {getUserName()}
                        </h3>
                        {/* <p className="text-sm text-gray-500">
                            {getUserEmail()}
                        </p> */}
                    </div>
                    <div
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                            session.active
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                        }`}
                    >
                        {session.active ? "Active" : "Inactive"}
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-xs text-gray-500">Start Time</p>
                        <p className="text-sm font-medium text-gray-500">
                            {formatDateTime(session.startTime)}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Duration</p>
                        <p className="text-sm font-medium text-gray-500">
                            {session.duration
                                ? formatDuration(session.duration)
                                : formatDuration(diff)}
                        </p>
                    </div>
                </div>

                {session.endTime && (
                    <div className="mt-3">
                        <p className="text-xs text-gray-500">End Time</p>
                        <p className="text-sm font-medium text-gray-500">
                            {formatDateTime(session.endTime)}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SessionCard;
