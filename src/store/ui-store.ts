// /store/ui-store.ts
import { create } from "zustand";

interface UIState {
  displayAuthCard: boolean;
  setDisplayAuthCard: (value: boolean) => void;
  toggleAuthCard: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  displayAuthCard: false,
  setDisplayAuthCard: (value: boolean) => set({ displayAuthCard: value }),
  toggleAuthCard: () =>
    set((state) => ({ displayAuthCard: !state.displayAuthCard })),
}));
