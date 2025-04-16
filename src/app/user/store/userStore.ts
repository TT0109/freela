// stores/userStore.ts
import { create } from "zustand";
import axios from "axios";

type User = {
  id: string;
  username: string;
  full_name: string;
  profile_pic_url_hd: string;
};

type Follower = {
  id: string;
  username: string;
  full_name: string;
  profile_pic_url: string;
};

type UserStore = {
  user: User | null;
  followers: Follower[];
  followings: Follower[];
  setUser: (user: User) => void;
  clearUser: () => void;
  setFollowers: (followers: Follower[]) => void;
  setFollowings: (followings: Follower[]) => void;
  getFollowers: (userId: string, count?: number, maxId?: string | null) => Promise<Follower[]>;
  getFollowings: (userId: string, count?: number, maxId?: string | null) => Promise<Follower[]>;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  followers: [],
  followings: [],
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null, followers: [], followings: [] }),
  setFollowers: (followers) => set({ followers }),
  setFollowings: (followings) => set({ followings }),
  
  getFollowers: async (userId, count = 10, maxId = null) => {
    try {
      const response = await axios.get("/api/v1/instagram/search/followers", {
        params: { userId, count, maxId },
      });
      set({ followers: response.data });
      return response.data;
    } catch (err) {
      console.error("Error fetching user followers:", err);
      throw err;
    }
  },

  getFollowings: async (userId, count = 10, maxId = null) => {
    try {
      const response = await axios.get("/api/v1/instagram/search/followings", {
        params: { userId, count, maxId },
      });
      set({ followings: response.data });
      return response.data;
    } catch (err) {
      console.error("Error fetching user followings:", err);
      throw err;
    }
  },
}));
