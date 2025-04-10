// stores/userStore.ts
import { create } from "zustand";

type User = {
  id: string;
  username: string;
  full_name: string;
  profile_pic_url_hd: string;
};

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
