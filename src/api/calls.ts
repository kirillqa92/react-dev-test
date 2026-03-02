import type { Call } from "../types";

let calls: Call[] = Array.from({ length: 1000 }).map((_, i) => ({
  id: String(i),
  phone: `+1-555-${1000 + i}`,
  status: "incoming",
  duration: 0,
  updatedAt: Date.now(),
}));

export function fetchCalls(): Promise<Call[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(calls);
    }, 800);
  });
}

export function updateCallStatus( {id, status }: {
  id: string,
  status: Call["status"] },     // 1
): Promise<Call> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.3) {
        reject(new Error("Network error"));
        return;
      }

      const call = calls.find((c) => c.id === id)!;
      call.status = status;
      call.updatedAt = Date.now();

      resolve(call);
    }, 600);
  });
}
