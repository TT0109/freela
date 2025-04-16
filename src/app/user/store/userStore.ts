// stores/userStore.ts
import { create } from "zustand";
import axios from "axios";

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
  getFollowers: (userId: string, count: number, maxId: string | null) => Promise<any>;
  getFollowings: (userId: string, count: number, maxId: string | null) => Promise<any>;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  getFollowers: async (userId: string, count: number = 10, maxId: string | null = null) => {
    try {
      const params = new URLSearchParams({
        userId,
        count,
        maxId,
      });
      const response = await axios.get("/api/v1/instagram/search/followers", {
        params,
      });
      return response.data;
    } catch (err) {
      console.error("Error fetching user followers:", err);
      throw err;
    }
  },
  getFollowings: async(userId: string, count: number = 10, maxId: string | null = null) => {
    try {

      const params = new URLSearchParams({
        userId,
        count,
        maxId,
      });

      const response = await axios.get("/api/v1/instagram/search/followings", {
        params,
      });
      return response.data;
    } catch (err) {
      console.error("Error fetching user followings:", err);
      throw err;
    }
  },
}));
