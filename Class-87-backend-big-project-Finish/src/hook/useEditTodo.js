import { create } from "zustand";

export const useEditTodo = create((set) => ({
  editId: null,
  setEditTodoId: (id) => set({ editId: id }),
}));
