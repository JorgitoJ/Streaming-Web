import { create } from "zustand";

export const useCodesStore = create((set) => ({
  codes: [],

  addCode: (code) =>
    set((state) => ({
      codes: [...state.codes, { id: crypto.randomUUID(), ...code }],
    })),

  removeCode: (id) =>
    set((state) => ({
      codes: state.codes.filter((c) => c.id !== id),
    })),

  updateCodeStatus: (id, newStatus) =>
    set((state) => ({
      codes: state.codes.map((c) =>
        c.id === id ? { ...c, status: newStatus } : c
      ),
    })),
}));
