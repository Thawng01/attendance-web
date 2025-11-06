
import { useMutation } from "@tanstack/react-query";
import { clientApi } from "../api/clientApi";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const useDelete = (url: string, callback?: (value: any) => void) => {

    const { token } = useAuth()
    const createItem = async (data: any) => {

        await clientApi.delete(`${url}/${data.id}`, {
            headers: {
                "x-auth-token": token
            }
        });

    };

    return useMutation<any, any, any>({
        mutationKey: [url],
        mutationFn: createItem,
        onSuccess: (data: any) => {
            callback && callback(data);
        },

        onError: () => {
            toast("Someting went wrong while deleting the item.", {
                style: {
                    color: 'red'
                }
            })
        }
    });
};

export default useDelete;
