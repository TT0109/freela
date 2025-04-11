// src/app/api/search/followers/route.ts (Next.js App Router)

import { Instagram } from "@/services/instagram/instagram.service";

const instagramService = new Instagram();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  console.log(searchParams)
  const userId = searchParams.get("userId");
  console.log(userId)

  try {
    if (!userId) {
      return new Response(JSON.stringify({ error: "User ID not found" }), {
        status: 404,
      });
    }

    const imagesBlur = await instagramService.onBlurFollowersFotos(userId!);
    
    return new Response(
      JSON.stringify({
        imagesBlur
      }),
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Instagram API Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch followers" }),
      {
        status: 500,
      }
    );
  }
}
