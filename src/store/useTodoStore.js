import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTodoStore = create(
  persist(
    (set) => ({
      todos: [],
      filter: "all",

      addTodo: (text) =>
        set((state) => ({
          todos: [
            {
              id: crypto.randomUUID(),
              text: text.trim(),
              completed: false,
            },
            ...state.todos,
          ],
        })),

      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo,
          ),
        })),

      editTodo: (id, newText) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, text: newText.trim() } : todo,
          ),
        })),

      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),

      clearCompleted: () =>
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed),
        })),

      setFilter: (filter) => set({ filter }),
    }),
    {
      name: "todo-storage", // اسم المفتاح داخل LocalStorage
      partialize: (state) => ({
        todos: state.todos,
        filter: state.filter,
      }),
    },
  ),
);
