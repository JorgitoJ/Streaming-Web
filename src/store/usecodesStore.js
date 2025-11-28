import {create} from "zustand";

export const useCodesStore = create((set,get) => ({
  codes: [], // lista de códigos {email, code, status}

  addCode: (newCode) =>
    set((state) => ({ codes: [...state.codes, newCode] })),

  findCodeByEmail: (email) =>
    get().codes.find((c) => c.email === email),

  removeCode: (email) =>
    set((state) => ({
      codes: state.codes.filter((c) => c.email !== email),
    })),
}));