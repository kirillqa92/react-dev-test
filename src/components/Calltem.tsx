import { useUIStore } from "../store/uiStore";
import type { Call } from "../types";

export function CallItem({ call }: { call: Call }) {
  const setSelectedCallId = useUIStore((s) => s.setSelectedCallId);

  return (
    <div
      onClick={() => setSelectedCallId(call.id)}
      className="p-2 border-b cursor-pointer"
    >
      <div>{call.phone}</div>
      <div>{call.status}</div>
    </div>
  );
}
