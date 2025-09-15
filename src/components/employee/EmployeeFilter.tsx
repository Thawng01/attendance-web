import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";

const EmployeeFilter = ({
    status,
    onStatusFilter,
}: {
    status: string;
    onStatusFilter: any;
}) => {
    const filter = [
        { label: "All", value: "all" },
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
    ];
    return (
        <div className=" text-gray-700 flex items-center ">
            <Label className="mr-2">Filter By Status : </Label>
            <div>
                <Select
                    defaultValue={status}
                    value={status}
                    onValueChange={(e) => onStatusFilter(e)}
                >
                    <SelectTrigger className="w-auto py-4 focus:outline-none border-0 bg-white/30 backdrop-blur-md shadow-sm">
                        <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/30 backdrop-blur-md text-gray-600 border-0">
                        <SelectGroup>
                            {filter.map((d) => (
                                <SelectItem value={d.value}>
                                    {d.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default EmployeeFilter;
