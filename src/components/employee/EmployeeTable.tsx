import type { User } from "@/pages/BranchUser";
import { formatDate } from "@/utils";
import CardAction from "../CardAction";

const EmployeeTable = ({ user }: { user: User }) => {
    return (
        <div
            key={user.id}
            className="grid grid-cols-12 p-4 border-b last:border-b-0 hover:bg-gray-50"
        >
            <div className="col-span-4 font-medium">{user.name}</div>
            <div className="col-span-3">{user.branch.name}</div>
            <div className="col-span-3">{formatDate(user.createdAt)}</div>
            <div className="col-span-1">
                <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.active
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                    }`}
                >
                    {user.active ? "Active" : "Inactive"}
                </span>
            </div>

            <CardAction userId={user.id} branchId={user.branchId} />
            {/* <MoreHorizontal className="h-4 w-4 text-muted-foreground" /> */}
        </div>
    );
};

export default EmployeeTable;
