import create from "zustand";
import { devtools } from "zustand/middleware";
const useStore = create(
  devtools(
    (set) => ({
      subscriptions: [],
      setSubscriptions: (newState) => set(() => ({ subscriptions: newState })),
    }),
    {
      anonymousActionType: "dispatchSubscriptions",
    }
  )
);

export default useStore;
