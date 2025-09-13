import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import usePost from "@/hooks/usePost";
import { useQueryClient } from "@tanstack/react-query";
import { useState, type ChangeEvent, type FormEvent } from "react";

export function InputDialog({ branchId }: { branchId: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });
    const queryClient = useQueryClient();
    const { mutate, isPending, error } = usePost("/users", () => {
        queryClient.invalidateQueries({
            queryKey: [`/users/branch/${branchId}`],
        });
        setIsOpen(false);
        setFormData({
            name: "",
            email: "",
        });
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        mutate({ name: formData.name, email: formData.email, branchId });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <form>
                <DialogTrigger asChild>
                    <Button
                        style={{
                            background:
                                "linear-gradient(to right, #56c1f7, #2192ef, #189af0)",
                        }}
                    >
                        Add New User
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    {error && (
                        <span className="text-[red]">{error.message}</span>
                    )}
                    <DialogHeader>
                        <DialogTitle>Add New User</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Name</Label>
                            <Input
                                id="name-1"
                                name="name"
                                placeholder="Name..."
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="username-1">Email (Optional)</Label>
                            <Input
                                id="email"
                                name="email"
                                placeholder="Email..."
                                value={formData.email}
                                onChange={handleChange}
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
                            onClick={handleSubmit}
                            style={{
                                background:
                                    "linear-gradient(to right, #56c1f7, #2192ef, #189af0)",
                            }}
                        >
                            {isPending ? "Creating..." : " Create New User"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}
