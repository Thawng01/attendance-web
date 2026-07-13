
import { useQuery } from "@tanstack/react-query";
import { clientApi } from "../api/clientApi";

const useFetch = <T = any>(url: string, enabled = true) => {
    const fetchItem = async () => {
        const res = await clientApi.get(url, {
        });
        return res?.data;
    };

    return (
        useQuery<T, any, T>(
            {
                queryKey: [url],
                queryFn: fetchItem,
                enabled,
            })
    );
};

export default useFetch;
