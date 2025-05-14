// stores/userStore.ts
import { create } from "zustand";
import { getFollowers, getFollowings } from "@/static/instagram/search";
import { getStories } from "@/static/instagram/stories";
import { getPublications } from "@/static/instagram/publications";

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
  followers: any;
  followings: any;
  setUser: (user: User) => void;
  clearUser: () => void;
  setFollowers: (followers: Follower[]) => void;
  setFollowings: (followings: Follower[]) => void;
  getFollowers: (userId: string, count?: number, maxId?: string | null) => Promise<Follower[]>;
  getFollowings: (userId: string, count?: number, maxId?: string | null) => Promise<Follower[]>;
  getStories: (userId: string, count?: number, maxId?: string | null) => Promise<any>;
  stories: any;
  publications: any;
  getPublications: (userId: string, count?: number, maxId?: string | null) => Promise<any[]>;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  followers: [],
  followings: [],
  stories: [], 
  publications: [],
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null, followers: [], followings: [] }),
  setFollowers: (followers) => set({ followers }),
  setFollowings: (followings) => set({ followings }),
  
  getFollowers: async (userId, count = 10, maxId = null) => {
    try {
      const followers = await getFollowers(userId);
      set({ followers });
      return followers;
    } catch (err) {
      console.error("Error fetching user followers:", err);
      throw err;
    }
  },

  getFollowings: async (userId, count = 10, maxId = null) => {
    try {
      const followings = await getFollowings(userId);
      set({ followings });
      return followings;
    } catch (err) {
      console.error("Error fetching user followings:", err);
      throw err;
    }
  },

  getStories: async (userId, count = 10, maxId = null) => {
    try {
      const stories = await getStories(userId);
      set({ stories });
      return stories;
    } catch (err) {
      console.error("Error fetching user stories:", err);
      throw err;
    }
  },

  getPublications: async (userId, count = 10, maxId = null) => {
    try {
      const publications = await getPublications(userId);
      set({ publications });
      return publications;
    } catch (err) {
      console.error("Error fetching user publications:", err);
      throw err;
    }
  },
}));
