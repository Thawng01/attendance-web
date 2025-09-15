import type { Session, User } from "@/pages/BranchUser";
import { formatDate, formatDuration } from "@/utils";
import CardAction from "./CardAction";

// User Card Component
const UserCard: React.FC<{ user: User; sessions: Session[] }> = ({
    user,
    sessions,
}) => {
    const activeSessions = sessions?.filter((session) => session.active);
    const now = new Date().getTime();
    const diff =
        now -
        new Date(activeSessions && activeSessions[0]?.startTime).getTime();
    return (
        <div className="bg-white/30 backdrop-blur-md rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100">
            <div className="p-6">
                <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                        <div
                            className={`w-3 h-3 rounded-full ${
                                user.active ? "bg-green-500" : "bg-gray-300"
                            }`}
                        ></div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">
                                {user.name}
                            </h3>
                            <p className="text-gray-500 text-sm">
                                {user.email || "No provided"}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-row items-center">
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-50 text-[#189af0]">
                            {user.branch.name}
                        </span>

                        <CardAction userId={user.id} branchId={user.branchId} />
                    </div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-500">Member since</p>
                        <p className="text-sm font-medium text-gray-500">
                            {formatDate(user.createdAt)}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-500">
                            Active sessions count
                        </p>
                        <p className="text-sm font-medium text-gray-500">
                            {sessions?.length}
                        </p>
                    </div>
                </div>
            </div>

            {activeSessions?.length > 0 && (
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Current Sessions
                    </p>
                    <div className="mt-2 space-y-2">
                        {activeSessions?.map((session) => (
                            <div
                                key={session.id}
                                className="flex items-center justify-between text-sm"
                            >
                                <span className="text-gray-700">
                                    Since {formatDate(session.startTime)}
                                </span>
                                <span className="font-medium text-green-600">
                                    {session.duration
                                        ? formatDuration(session.duration)
                                        : formatDuration(diff)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserCard;
