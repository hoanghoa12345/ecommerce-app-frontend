import create from "zustand";
import { persist } from "zustand/middleware";

const store = (set) => ({
  colorMode: "light",
  toggleMode: () => {
    if (document.body.classList.contains("dark")) document.body.classList.remove("dark");
    else document.body.classList.add("dark");

    return set((state) => ({
      colorMode: state.colorMode === "dark" ? "light" : "dark",
    }));
  },
});

export const useColorModeStore = create(
  persist(store, {
    name: "colorMode",
    getStorage: () => localStorage,
  })
);
