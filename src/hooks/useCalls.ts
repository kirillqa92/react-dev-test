import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {fetchCalls, updateCallStatus} from "../api/calls";
import type {Call} from "../types";

export function useCalls() {
    const queryClient = useQueryClient();

    const callsQuery = useQuery({
        queryKey: ["calls"],
        queryFn: fetchCalls,
        refetchOnWindowFocus: false,  //4.1
        staleTime: 30000,
    });

    const updateStatus = useMutation({
        mutationFn: updateCallStatus,

        onMutate: async ({id}: { id: string; status: Call["status"] }) => {  // 4.2
            await queryClient.cancelQueries({queryKey: ["calls"]});   //4.3.
            const prev = queryClient.getQueryData<Call[]>(["calls"]);

            queryClient.setQueryData(["calls"], (calls: Call[]) =>
                calls.map((c) => (c.id === id ? {...c, status: "updating..."} : c)),
            );

            return {prev};
        },
        onSuccess: (updatedCall) => {  // 4.4
            queryClient.setQueryData<Call[]>(["calls"], (calls = []) =>
                calls.map((c) => (c.id === updatedCall.id ? updatedCall : c))
            );
        },
        onError: (_err, _vars, ctx) => {
            queryClient.setQueryData(["calls"], ctx?.prev);
        },
        onSettled: () => { // 4.5
            queryClient.invalidateQueries({queryKey: ["calls"]});
        }
    });

    return {callsQuery, updateStatus};
}
