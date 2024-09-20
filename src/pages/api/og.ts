import OGImage from "@/components/og-image";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const imageResponse = await OGImage();

  // Convert ImageResponse to a Uint8Array
  const imageBuffer = await imageResponse.arrayBuffer();
  const image = new Uint8Array(imageBuffer);

  return new Response(image, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Disposition": `inline; filename="og-image.png"`,
    },
  });
};
