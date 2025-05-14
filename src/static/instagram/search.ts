import { Instagram } from "@/services/instagram/instagram.service";

const instagramService = new Instagram();

export async function getFollowers(userId: string, count: number = 10) {
  if (!userId) {
    throw new Error("User ID not found");
  }

  try {
    const followers = await instagramService.getUserFollwers(userId, count);
    debugger
    return followers;
  } catch (error: any) {
    console.error("Instagram API Error:", error);
    throw error;
  }
}

export async function getFollowings(userId: string, count: number = 10) {
  if (!userId) {
    throw new Error("User ID not found");
  }

  try {
    const followings = await instagramService.getFollowings(userId, count);
    return followings;
  } catch (error: any) {
    console.error("Instagram API Error:", error);
    throw error;
  }
}
