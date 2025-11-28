import {create} from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  login: async (email, password) => {
    if (email === "admin@admin.com" && password === "admin123") {
      set({ user: { email, role: "admin", name: "Administrador" } });
      return true;
    }
    return false;
  },
  logout: () => set({ user: null }),
}));