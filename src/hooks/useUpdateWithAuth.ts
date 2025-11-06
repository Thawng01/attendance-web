
import { useMutation } from "@tanstack/react-query";
import { clientApi } from "../api/clientApi";
import { useAuth } from "@/contexts/AuthContext";

const useUpdateWithAuth = (url: string, callback?: (value: any) => void) => {

    const { token } = useAuth()

    const createItem = async (data: any) => {
        const res = await clientApi.put(url, data, {
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

        }
    });
};

export default useUpdateWithAuth;
