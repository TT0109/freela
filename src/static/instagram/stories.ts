import { Instagram } from "@/services/instagram/instagram.service";

const instagramService = new Instagram();

export async function getStories(userId: string) {
  if (!userId) {
    throw new Error("User ID not found");
  }

  try {
    const stories = await instagramService.getStories(userId);
    return stories;
  } catch (error: any) {
    console.error("Instagram API Error:", error);
    throw error;
  }
}
