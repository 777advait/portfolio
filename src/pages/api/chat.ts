import type { APIRoute, APIContext } from "astro";
import { z } from "zod";
import { Resend } from "resend";
import { generateContactEmailHtml } from "@/emails/generateContactEmail";
import { rateLimit } from "@/lib/rate-limit";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const { isAllowed } = rateLimit(clientAddress);

  if (!isAllowed) {
    return new Response(
      JSON.stringify({
        message: "Rate limit exceeded",
      }),
      { status: 429 }
    );
  }

  const data = await request.json();
  const schema = z.object({
    name: z.string(),
    email: z.string(),
    message: z.string(),
  });
  const validation = schema.safeParse(data);

  if (!validation.success) {
    return new Response(
      JSON.stringify({
        message: "Invalid data",
      }),
      { status: 400 }
    );
  }

  try {
    const htmlContent = generateContactEmailHtml(
      validation.data.name,
      validation.data.email,
      validation.data.message
    );

    const { error } = await resend.emails.send({
      from: "astro-dev.tech <notifications@astro-dev.tech>",
      to: "advait.nsj@proton.me",
      subject: "New Contact Form Submission",
      html: htmlContent,
    });

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify({
        message: "Message sent!!",
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Failed to send mesage" }), {
      status: 500,
    });
  }
};
