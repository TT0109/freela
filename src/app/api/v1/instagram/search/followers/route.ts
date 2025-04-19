// src/app/api/search/followers/route.ts (Next.js App Router)

import { Instagram } from "@/services/instagram/instagram.service";

const instagramService = new Instagram();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  try {
    // Etapa 1: Buscar o ID do usuário via username

    if (!userId) {
      return new Response(JSON.stringify({ error: "User ID not found" }), {
        status: 404,
      });
    }

    const followers = await instagramService.getUserFollwers(userId!);
    
    return new Response(
      JSON.stringify({
        followers
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
