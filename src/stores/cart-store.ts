import { create } from "zustand";

export type CartCourseItem = {
  _id: string;
  posterSrc: string;
  title: string;
  price: number;
  duration: string;
  rating: number;
};

type CartStore = {
  items: CartCourseItem[];
  addCourse: (course: CartCourseItem) => { added: boolean };
  removeCourse: (id: string) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addCourse: (course) => {
    const exists = get().items.some((item) => item._id === course._id);
    if (exists) return { added: false };

    set((state) => ({ items: [course, ...state.items] }));
    return { added: true };
  },
  removeCourse: (id) => {
    set((state) => ({ items: state.items.filter((item) => item._id !== id) }));
  },
  clearCart: () => set({ items: [] }),
  isInCart: (id) => get().items.some((item) => item._id === id),
}));

