
import { useMutation } from "@tanstack/react-query";
import { clientApi } from "../api/clientApi";
import { useAuth } from "@/contexts/AuthContext";

const usePostWithAuth = (url: string, callback?: (value: any) => void) => {

    const { token } = useAuth()

    const createItem = async (data: any) => {
        const res = await clientApi.post(url, data, {
            headers: {
                'x-auth-token': token
            }
        });
        return res.data;
    };

    return useMutation<any, any, any>({
        mutationKey: [url],
        mutationFn: createItem,
        onSuccess: (data: any) => {
            callback && callback(data);
        },

        onError: () => {
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

export default usePostWithAuth;
