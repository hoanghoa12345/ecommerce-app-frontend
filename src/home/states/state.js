import create from "zustand";
import { devtools } from "zustand/middleware";
const store = (set) => ({
  cartSlideOpen: false,
  setCartSlideOpen: () => set((state) => ({ cartSlideOpen: !state.cartSlideOpen })),
});

const useStore = create(devtools(store));
export default useStore;
