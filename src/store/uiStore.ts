import { create } from "zustand";

// 6
type UIState = {
  selectedCallId: string | null;
  setSelectedCallId: (id: string | null) => void;
};

export const useUIStore = create<UIState>((set) => ({
    selectedCallId: null,
    setSelectedCallId: (id) => set({ selectedCallId: id }),
}));
