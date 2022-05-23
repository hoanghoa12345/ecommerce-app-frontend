import create from "zustand";
import { persist } from "zustand/middleware";

const store = (set) => ({
  displayType: "grid",
  setDisplayType: (type) => set(() => ({ displayType: type })),
});

const useStore = create(
  persist(store, {
    name: "display",
    getStorage: () => localStorage,
  })
);
export default useStore;
