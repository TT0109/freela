import { Instagram } from "@/services/instagram/instagram.service";
const instagramService = new Instagram();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return new Response(JSON.stringify({ error: "Username is required" }), {
      status: 400,
    });
  }

  try {
    const userInfo = await instagramService.getUserInfo(username);
    console.log(userInfo);
    return new Response(JSON.stringify(userInfo), {
      status: 200,
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch user info" }),
      {
        status: 500,
      }
    );
  }
}
