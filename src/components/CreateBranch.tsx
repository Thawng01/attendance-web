import { useState } from "react";
import GradientButton from "./GradientButton";
import usePost from "@/hooks/usePost";
import { useQueryClient } from "@tanstack/react-query";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { PlusIcon } from "lucide-react";

export default function CreateBranch() {
    const [isOpen, setOpen] = useState(false);
    const [branchName, setBranchName] = useState("");
    const { user } = useAuth();

    const queryClient = useQueryClient();
    const { mutate, isPending, error } = usePost("/branches", () => {
        queryClient.invalidateQueries({ queryKey: ["/branches"] });
        setBranchName("");
        setOpen(false);
    });

    const handleCreate = () => {
        if (!branchName.trim()) {
            alert("Please enter branch name");
            return;
        }

        mutate({ name: branchName, companyId: user?.id! });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setOpen}>
            <form>
                <DialogTrigger asChild>
                    <Button
                        style={{
                            background:
                                "linear-gradient(to right, #56c1f7, #2192ef, #189af0)",
                        }}
                    >
                        <PlusIcon />
                        Create New Branch
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    {error && (
                        <span className="text-[red]">{error.message}</span>
                    )}
                    <DialogHeader>
                        <DialogTitle>Add New Branch/Department</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1"> Name</Label>
                            <Input
                                className="focus:outline-none focus:ring-1 focus:ring-[#189af0] "
                                id="name-1"
                                name="name"
                                placeholder="Name..."
                                value={branchName}
                                onChange={(e) => setBranchName(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button
                            disabled={isPending}
                            type="submit"
                            onClick={handleCreate}
                            style={{
                                background:
                                    "linear-gradient(to right, #56c1f7, #2192ef, #189af0)",
                            }}
                        >
                            {isPending ? "Creating..." : " Create New Branch"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}
