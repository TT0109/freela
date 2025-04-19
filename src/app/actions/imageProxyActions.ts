"use server";

import axios from "axios";
import sharp from "sharp";

export async function getImageBase64(imageUrl: string, onBlurFollowersFotos = false): Promise<string | null> {
  if (!imageUrl) return null;

  try {
    const response = await axios.get<ArrayBuffer>(imageUrl, {
      responseType: "arraybuffer",
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "image/*",
      },
    });

    const contentType = response.headers["content-type"] || "image/jpeg";

    // Garante que é um Node.js Buffer
    const imageBuffer = Buffer.from(response.data as ArrayBuffer);  // Garantir que seja um ArrayBuffer

    let finalBuffer = imageBuffer as any;

    if (onBlurFollowersFotos) {
      finalBuffer = await sharp(imageBuffer).blur(10).toBuffer();
    }

    const base64 = finalBuffer.toString("base64");
    return `data:${contentType};base64,${base64}`;
  } catch (error) {
    console.error("Erro ao converter imagem para base64:", error);
    return '';
  }
}
