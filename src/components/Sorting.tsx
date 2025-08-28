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
}: {
    defaultValue: string;
    data: any[];
    setSortBy: any;
}) {
    return (
        <div className=" text-gray-700 flex items-center">
            <Label className="mr-2">Sorting : </Label>
            <Select
                defaultValue={defaultValue}
                onValueChange={(e) => setSortBy(e)}
            >
                <SelectTrigger className="w-auto py-4 focus:outline-none border-0 bg-white shadow-sm">
                    <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent className="bg-white text-gray-600 border-0">
                    <SelectGroup>
                        {data.map((d) => (
                            <SelectItem value={d.value}>{d.label}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
