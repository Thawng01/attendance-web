
import { useQuery } from "@tanstack/react-query";
import { clientApi } from "../api/clientApi";
import { useAuth } from "@/contexts/AuthContext";

const useFetchWithAuth = (url: string) => {
    const { token } = useAuth()
    const fetchItem = async () => {
        const res = await clientApi.get(url, {
            headers: {
                "x-auth-token": token
            }
        });
        return res?.data;
    };

    return (
        useQuery<any, any, any>(
            {
                queryKey: [url],
                queryFn: fetchItem,
            })
    );
};

export default useFetchWithAuth;
