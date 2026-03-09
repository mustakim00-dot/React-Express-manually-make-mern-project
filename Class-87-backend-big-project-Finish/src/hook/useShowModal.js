import { create } from "zustand";

export const useShowModal = create((set) => ({
  //   filter: "all",
  //   setFilter: (updatedFilter) => set({ filter: updatedFilter }),
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

// Zustand hook
