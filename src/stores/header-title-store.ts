import { create } from "zustand";

type HeaderTitleStore = {
  headerTitle: string;
  setHeaderTitle: (title: string) => void;
  clearHeaderTitle: () => void;
};

export const useHeaderTitleStore = create<HeaderTitleStore>((set) => ({
  headerTitle: "",
  setHeaderTitle: (title) => set({ headerTitle: title }),
  clearHeaderTitle: () => set({ headerTitle: "" }),
}));
