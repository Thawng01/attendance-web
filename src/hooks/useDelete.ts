
import { useMutation } from "@tanstack/react-query";
import { clientApi } from "../api/clientApi";
import { toast } from "sonner";

const useDelete = (url: string, callback?: (value: any) => void) => {
    const createItem = async (data: any) => {

        await clientApi.delete(`${url}/${data.id}`);

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
