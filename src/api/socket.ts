import type {Call} from "../types";

type Listener = (update: Partial<Call>) => void;

const listeners: Listener[] = [];
let intervalId: number | null = null;

export function connectSocket() {
    if (intervalId) return   //2.1
    intervalId = setInterval(() => {
        const callId = String(Math.floor(Math.random() * 1000));
        const update: Partial<Call> = {
            id: callId,
            status: Math.random() > 0.5 ? "active" : "hold",
            updatedAt: Date.now(),
        };
        listeners.forEach((l) => l(update));
    }, 1000);
}

export function subscribe(listener: Listener) {
    listeners.push(listener);
    return () => {
        listeners.filter(l => l !== listener);   //2.2
    };
}

export function disconnectSocket() {   // 2.3
    if (intervalId) clearInterval(intervalId);
    intervalId = null
}
