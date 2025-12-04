import { create } from "zustand";

export const useAccountPoolStore = create((set) => ({
  pools: [],

  addPool: (pool) =>
    set((state) => ({
      pools: [...state.pools, pool], 
    })),

  setPools: (pools) => set({ pools }),
}));
