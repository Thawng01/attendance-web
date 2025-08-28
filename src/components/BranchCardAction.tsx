import { EllipsisVertical, Trash2 } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import useDelete from "@/hooks/useDelete";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const BranchCardAction = ({ branchId }: { branchId: string }) => {
    const queryClient = useQueryClient();
    const { mutate: deleteBranch } = useDelete("/branches", () => {
        queryClient.invalidateQueries({
            queryKey: [`/branches`],
        });
        toast("The branch successfully deleted.", {
            style: {
                color: "green",
            },
        });
    });

    const handleDelete = () => {
        deleteBranch({ id: branchId });
    };
    return (
        <div>
            <Popover>
                <PopoverTrigger asChild>
                    <div className="ml-4 hover:bg-gray-200 p-1.5 cursor-pointer rounded-full">
                        <EllipsisVertical color="gray" />
                    </div>
                </PopoverTrigger>

                <PopoverContent className="w-auto">
                    <Trash2
                        color="red"
                        className="cursor-pointer"
                        onClick={handleDelete}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default BranchCardAction;
