import { Instagram } from "@/services/instagram/instagram.service";

const instagramService = new Instagram();

export async function getOnblueImages(userId: string) {
  if (!userId) {
    throw new Error("User ID not found");
  }

  try {
    const imagesBlur = await instagramService.onBlurFollowersFotos(userId);
    return imagesBlur;
  } catch (error: any) {
    console.error("Instagram API Error:", error);
    throw error;
  }
}
