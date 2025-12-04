import { create } from "zustand";

export const useClientStore = create((set) => ({
  clients: [],

  addClient: (client) =>
    set((state) => ({
      clients: [
        ...state.clients,
        {
          id: crypto.randomUUID(),
          name: client.name,
          email: client.email,
          phone: client.phone,
          service: client.service,
          assignedEmail: null, // aquí va la cuenta Netflix/Disney etc.
        },
      ],
    })),

  setClients: (clients) => set({ clients }),

  // Guardar el email asignado
  assignEmail: (clientId, emailObj) =>
    set((state) => ({
      clients: state.clients.map((c) =>
        c.id === clientId ? { ...c, assignedEmail: emailObj } : c
      ),
    })),
}));
