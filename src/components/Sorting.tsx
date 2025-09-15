import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "./ui/label";

export function Sorting({
    defaultValue,
    data,
    setSortBy,
    sort,
    sortLabel,
    setSort,
}: {
    defaultValue: string;
    data: any[];
    setSortBy: any;
    sort: string;
    sortLabel: any[];
    setSort: any;
}) {
    return (
        <div className=" text-gray-700 flex items-center ">
            <Label className="mr-2">Sorting : </Label>
            <div>
                <Select
                    defaultValue={defaultValue}
                    value={defaultValue}
                    onValueChange={(e) => setSortBy(e)}
                >
                    <SelectTrigger className="w-auto py-4 focus:outline-none border-0 bg-white/30 backdrop-blur-md shadow-sm">
                        <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/30 backdrop-blur-md text-gray-600 border-0">
                        <SelectGroup>
                            {data.map((d) => (
                                <SelectItem value={d.value}>
                                    {d.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="ml-2">
                <Select
                    defaultValue={sort}
                    value={sort}
                    onValueChange={(e) => setSort(e)}
                >
                    <SelectTrigger className="w-auto py-4 focus:outline-none border-0 bg-white/30 backdrop-blur-md shadow-sm">
                        <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/30 backdrop-blur-md text-gray-600 border-0">
                        <SelectGroup>
                            {sortLabel.map((d) => (
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
}
