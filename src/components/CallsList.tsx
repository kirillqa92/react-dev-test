import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useCalls } from "../hooks/useCalls";
import { CallItem } from "./Calltem";

export function CallsList() {
    const { callsQuery } = useCalls();
    const parentRef = useRef<HTMLDivElement>(null);

    const rowVirtualizer = useVirtualizer({  // 5.1
        count: callsQuery.data?.length ?? 0,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 60,
        overscan: 5,
    });

    if (callsQuery.isLoading) return <div>Loading...</div>;
    if (callsQuery.isError) return <div>Error: {callsQuery.error.message}</div>;
    if (!callsQuery.data) return null;

    return (
        <div ref={parentRef} className="h-screen overflow-auto">
            <div
                style={{
                    height: `${rowVirtualizer.getTotalSize()}px`,
                    width: "100%",
                    position: "relative",
                }}
            >
                {rowVirtualizer.getVirtualItems().map((virtualItem) => {
                    const call = callsQuery.data[virtualItem.index];
                    return (
                        <div
                            key={call.id}
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                transform: `translateY(${virtualItem.start}px)`,
                            }}
                        >
                            <CallItem call={call} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
