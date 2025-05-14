import { Instagram } from "@/services/instagram/instagram.service";

const instagramService = new Instagram();

export async function getUserInfo(username: string) {
  if (!username) {
    throw new Error("Username not found");
  }

  try {
    const response = await instagramService.getUserInfo(username);
    return response.data.user;
  } catch (error: any) {
    console.error("Instagram API Error:", error);
    throw error;
  }
}
