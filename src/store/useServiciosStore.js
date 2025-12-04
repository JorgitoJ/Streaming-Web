import { create } from "zustand";

export const useServiceStore = create((set) => ({
  services: [],

  addService: (service) =>
    set((state) => ({
      services: [...state.services, service],
    })),

  setServices: (services) => set({ services }),
}));
