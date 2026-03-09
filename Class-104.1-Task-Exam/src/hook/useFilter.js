import { create } from "zustand";

export const useFilter = create((set) => ({
  filter: "all",
  setFilter: (updatedFilter) => set({ filter: updatedFilter }),
}));

// Zustand hook
