import { Instagram } from "@/services/instagram/instagram.service";

const instagramService = new Instagram();

export async function getPublications(userId: string) {
  if (!userId) {
    throw new Error("User ID not found");
  }

  try {
    const publications = await instagramService.getPublications(userId);
    return publications;
  } catch (error: any) {
    console.error("Instagram API Error:", error);
    throw error;
  }
}
