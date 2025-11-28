import { create } from "zustand";

export const useServiciosStore = create((set) => ({
  solicitudes: [], // lista de solicitudes de clientes

  addSolicitud: (solicitud) =>
    set((state) => ({ solicitudes: [...state.solicitudes, solicitud] })),

  updateSolicitud: (id, data) =>
    set((state) => ({
      solicitudes: state.solicitudes.map((s) =>
        s.id === id ? { ...s, ...data } : s
      ),
    })),

  removeSolicitud: (id) =>
    set((state) => ({
      solicitudes: state.solicitudes.filter((s) => s.id !== id),
    })),
}));