import {create} from "zustand";

export const useClientesStore = create((set) => ({
  clientes: [],

  addCliente: (cliente) =>
    set((state) => ({ clientes: [...state.clientes, cliente] })),

  assignCodigo: (clienteId, codigo) =>
    set((state) => ({
      clientes: state.clientes.map((c) =>
        c.id === clienteId ? { ...c, codigo } : c
      ),
    })),

  removeCliente: (clienteId) =>
    set((state) => ({
      clientes: state.clientes.filter((c) => c.id !== clienteId),
    })),
}));