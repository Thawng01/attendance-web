
import { useMutation } from "@tanstack/react-query";
import { clientApi } from "../api/clientApi";

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

        onError: (error) => {
            // console.log("error : ", error)
            // Toast.show({
            //     type: 'error',
            //     text1: "Sorry!",
            //     text2: "Something went wrong while processing...",
            //     text1Style: {
            //         fontSize: 16,
            //     },
            //     text2Style: {
            //         fontSize: 14,
            //     },
            // })
        }
    });
};

export default useDelete;
