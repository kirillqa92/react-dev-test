import {useUIStore} from "../store/uiStore";
import {useCalls} from "../hooks/useCalls";
import {useEffect} from "react";

export function CallDetails() {
    const selectedCallId = useUIStore((s) => s.selectedCallId);
    const {updateStatus, callsQuery} = useCalls();

    useEffect(() => {
        updateStatus.reset();   // 7.1
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCallId]);

    const call = callsQuery.data?.find(el => el.id === selectedCallId)
    const isCallDisabled = updateStatus.isPending || call?.status === "hold";

    if (!call)
        return (
            <div className="flex items-center justify-center">Select a call</div>
        );


    return (
        <div className="flex items-center justify-center">
            <div>
                <h2>{call.phone}</h2>
                <p>Status: {updateStatus.isPending ? 'Updating...' : call.status}</p>

                <button
                    onClick={() => updateStatus.mutate({id: call.id, status: "hold"})}
                    disabled={isCallDisabled}
                    className={`px-4 py-1 transition-all duration-200       ${
                        isCallDisabled
                            ? "bg-gray-400 cursor-not-allowed opacity-70"
                            : "bg-green-600 hover:bg-green-700 active:scale-95 text-white"
                    }
      `}
                >
                    {updateStatus.isPending ? "Updating..." : "Hold"}
                </button>
                {updateStatus.isError && (
                    <div className="text-red-500">Error: {updateStatus.error.message}</div>
                )}
            </div>
        </div>
    );
}
