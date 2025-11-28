import {create} from "zustand";

export const useActivacionesStore = create((set) => ({
  activaciones: [], // lista de activaciones

  addActivacion: (activacion) =>
    set((state) => ({ activaciones: [...state.activaciones, activacion] })),

  updateActivacion: (id, data) =>
    set((state) => ({
      activaciones: state.activaciones.map((a) =>
        a.id === id ? { ...a, ...data } : a
      ),
    })),

  removeActivacion: (id) =>
    set((state) => ({
      activaciones: state.activaciones.filter((a) => a.id !== id),
    })),
}));