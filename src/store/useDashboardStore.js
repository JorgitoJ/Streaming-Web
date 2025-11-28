import {create} from "zustand";

export const useDashboardStore = create((set) => ({
  pendingActivations: 0,
  agents: 0,
  mailboxes: 0,

  setStats: (stats) => set(stats),

  chartData: [],

  setChartData: (data) => set({ chartData: data }),
}));