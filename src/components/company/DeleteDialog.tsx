import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../ui/alert-dialog";

import useDelete from "@/hooks/useDelete";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function DeleteDialog({ companyId }: { companyId: string }) {
    const queryClient = useQueryClient();
    const { mutate: deleteCompany, isPending } = useDelete(`/company`, () => {
        queryClient.invalidateQueries({ queryKey: ["/company/info"] });
        toast("You have successfully deleted.", {
            style: {
                color: "green",
            },
        });
    });

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    className="bg-red-500 text-white rounded-4xl hover:bg-red-600 hover:text-white"
                    variant="outline"
                    size="sm"
                    onClick={() => {}}
                >
                    Delete
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-red-500 text-white hover:bg-red-600 hover:text-white"
                        disabled={isPending}
                        onClick={() => deleteCompany({ id: companyId })}
                    >
                        {isPending ? "Deleting..." : "Confirm"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
