// stores/userStore.ts
import { create } from "zustand";
import axios from "axios";

type WhatsappStore = {
  whatsapp: WhatsAppContact | null ;
};

export interface WhatsAppContact {
    _id: string;
    number: string;
    __v: number;
    about: string;
    countryCode: string;
    date: string;
    id: {
      server: string;
      user: string;
      _serialized: string;
    };
    isBlocked: boolean;
    isBusiness: boolean;
    isGroup: boolean;
    isMe: boolean;
    isMyContact: boolean;
    isUser: boolean;
    isWAContact: boolean;
    labels: string[];
    phone: string;
    profilePic: string;
  }

export const whatsappStore = create<WhatsappStore>((set) => ({
    whatsapp: null,
    getWhatsapp: async () => {
        const res = await axios.get("/api/v1/whatsapp");
        set({ whatsapp: res.data });
    }
}));
