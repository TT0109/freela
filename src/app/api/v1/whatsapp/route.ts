import { Whatsapp } from "@/services/whatsapp/whatsapp.service";
const whatsappService = new Whatsapp();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("number");

  if (!username) {
    return new Response(JSON.stringify({ error: "number is required" }), {
      status: 400,
    });
  }

  try {
    const userInfo = await whatsappService.getUserInfo(username);
    
    return new Response(JSON.stringify(userInfo), {
      status: 200,
    });
  } catch (error: any) {
    console.error("Whatsapp API Error:", error.message);
    return new Response(
      JSON.stringify({ error: "Failed to fetch user info" }),
      {
        status: 500,
      }
    );
  }
}
