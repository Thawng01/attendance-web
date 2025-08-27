
import { useQuery } from "@tanstack/react-query";
import { clientApi } from "../api/clientApi";

const useFetch = (url: string) => {
    const fetchItem = async () => {
        const res = await clientApi.get(url, {
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

export default useFetch;
