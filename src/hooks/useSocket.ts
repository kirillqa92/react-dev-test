import { useEffect } from "react";
import {subscribe, connectSocket, disconnectSocket} from "../api/socket";
import { useQueryClient } from "@tanstack/react-query";
import type { Call } from "../types";

export function useSocket() {
  const queryClient = useQueryClient();

  useEffect(() => {
    connectSocket();
    const unsubscribe = subscribe((update: Partial<Call>) => {
      queryClient.setQueryData<Call[]>(["calls"], (calls = []) =>
          calls.map((c) => (c.id === update.id ? { ...c, ...update } : c))  //3.2
      );
    });

    return () => {
        unsubscribe();
        disconnectSocket() //3.3
    }
  }, [queryClient]);  //3.4
}
