"use server";

import axios from "axios";

export async function getImageBase64(imageUrl: string): Promise<string | null> {
  if (!imageUrl) return null;

  try {
    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer",
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "image/*",
      },
    });

    const base64 = Buffer.from(response.data, "binary").toString("base64");
    const contentType = response.headers["content-type"] || "image/jpeg";
    return `data:${contentType};base64,${base64}`;
  } catch (error) {
    console.error("Erro ao converter imagem para base64:", error);
    return null;
  }
}
