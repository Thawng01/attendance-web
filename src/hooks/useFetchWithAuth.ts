
import { useQuery } from "@tanstack/react-query";
import { clientApi } from "../api/clientApi";
import { useAuth } from "@/contexts/AuthContext";

const useFetchWithAuth = <T = unknown>(url: string, enabled = true) => {
    const { token } = useAuth();
    const fetchItem = async () => {
        const res = await clientApi.get<T>(url, {
            headers: {
                "x-auth-token": token,
            },
        });
        return res.data;
    };

    return useQuery<T, Error, T>({
        queryKey: [url, token],
        queryFn: fetchItem,
        enabled: enabled && Boolean(token),
    });
};

export default useFetchWithAuth;
