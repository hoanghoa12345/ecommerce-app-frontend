import create from "zustand";
import { persist } from "zustand/middleware";
const store = (set) => ({
  cartItems: [],
  cartAddItem: (item) =>
    set((state) => ({
      cartItems: state.cartItems.find((x) => x.product.id === item.product.id)
        ? state.cartItems.map((cartItem) => (cartItem.product.id === item.product.id ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem))
        : [...state.cartItems, item],
    })),
  cartRemoveItem: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((x) => x.product.id !== id),
    })),
  cartIncrementQty: (item) =>
    set((state) => ({
      cartItems: state.cartItems.map((cartItem) =>
        cartItem.product.id === item.product.id ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem
      ),
    })),
  cartDecrementQty: (item) =>
    set((state) => ({
      cartItems: state.cartItems.map((cartItem) =>
        cartItem.product.id === item.product.id ? { ...cartItem, qty: cartItem.qty > 1 ? cartItem.qty - 1 : cartItem.qty } : cartItem
      ),
    })),
  cartDestroy: () =>
    set(() => ({
      cartItems: [],
    })),
});

const useStore = create(
  persist(store, {
    name: "carts",
    getStorage: () => localStorage,
  })
);
export default useStore;
