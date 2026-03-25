import { create } from "zustand";

type NotificationStore = {
  count: number;
  setCount: (count: number) => void;
  increment: (amount?: number) => void;
  decrement: (amount?: number) => void;
  reset: () => void;
};

const createNotificationStore = (defaultCount: number) =>
  create<NotificationStore>((set) => ({
    count: defaultCount,
    setCount: (count) => set({ count: Math.max(0, count) }),
    increment: (amount = 1) =>
      set((state) => ({ count: state.count + Math.max(0, amount) })),
    decrement: (amount = 1) =>
      set((state) => ({
        count: Math.max(0, state.count - Math.max(0, amount)),
      })),
    reset: () => set({ count: defaultCount }),
  }));

export const useNotificationStore = createNotificationStore(2);
export const useAdminNotificationStore = createNotificationStore(0);
export const useInstructorNotificationStore = createNotificationStore(0);
