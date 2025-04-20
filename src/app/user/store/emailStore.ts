// stores/userStore.ts
import { create } from "zustand";
import axios from "axios";

type Email = {
  id: string;
  email: string;
};

type EmailStore = {
  email: Email | null;
};

export const emailStore = create<EmailStore>((set) => ({
  email: null,
  login: (email: string) => {
    axios.post("/api/v1/login", { email }).then((res) => {
      set({ email: res.data });
    });
  } 
}));
