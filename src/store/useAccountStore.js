import { create } from "zustand";

export const useAccountStore = create((set) => ({
  emails: [], // lista de correos (cuentas de servicios)

  // Crear una cuenta disponible
  addEmail: (emailData) =>
    set((state) => ({
      emails: [
        ...state.emails,
        {
          id: crypto.randomUUID(),
          email: emailData.email,
          password: emailData.password,
          service: emailData.service,
          status: "disponible",
          assignedTo: null,
        },
      ],
    })),

  // Reemplazar desde backend
  setEmails: (emails) => set({ emails }),

  // Asignar un correo a un cliente
  assignEmailToClient: (emailId, clientId) =>
    set((state) => ({
      emails: state.emails.map((e) =>
        e.id === emailId
          ? { ...e, status: "asignado", assignedTo: clientId }
          : e
      ),
    })),

  // Cambiar estados si el admin lo necesita
  markAsAvailable: (emailId) =>
    set((state) => ({
      emails: state.emails.map((e) =>
        e.id === emailId ? { ...e, status: "disponible", assignedTo: null } : e
      ),
    })),

  markAsSuspended: (emailId) =>
    set((state) => ({
      emails: state.emails.map((e) =>
        e.id === emailId ? { ...e, status: "suspendido" } : e
      ),
    })),

  markAsExpired: (emailId) =>
    set((state) => ({
      emails: state.emails.map((e) =>
        e.id === emailId ? { ...e, status: "vencido" } : e
      ),
    })),
}));
