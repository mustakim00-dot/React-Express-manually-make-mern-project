import { create } from "zustand";

export const useTodos = create((set) => ({
  todos: [],
  setTodos: (updatedTodos) => set({ todos: updatedTodos }),
}));

// Zustand hook
