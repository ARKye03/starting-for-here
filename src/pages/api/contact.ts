import type { APIRoute } from "astro";
import { Resend } from "resend";
// Route as server-rendered
export const prerender = false;

const FROM =
  import.meta.env.CONTACT_FROM || "Contact Form <onboarding@resend.dev>";
const TO = import.meta.env.CONTACT_TO || "rafa03-dev@proton.me";

const MAX_LENGTHS = { name: 200, email: 254, subject: 300, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function json(body: object, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const name = data.get("name")?.toString().trim();
    const email = data.get("email")?.toString().trim();
    const subject = data.get("subject")?.toString().trim();
    const message = data.get("message")?.toString().trim();

    // Honeypot: hidden field humans never fill. Pretend success so bots don't adapt.
    if (data.get("website")?.toString()) {
      return json({ success: true }, 200);
    }

    if (!name || !email || !subject || !message) {
      return json({ error: "missing_fields" }, 400);
    }

    if (!EMAIL_RE.test(email) || email.length > MAX_LENGTHS.email) {
      return json({ error: "invalid_email" }, 400);
    }

    if (
      name.length > MAX_LENGTHS.name ||
      subject.length > MAX_LENGTHS.subject ||
      message.length > MAX_LENGTHS.message
    ) {
      return json({ error: "too_long" }, 400);
    }

    if (!import.meta.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      return json({ error: "send_failed" }, 500);
    }

    const resend = new Resend(import.meta.env.RESEND_API_KEY);
    const { data: emailData, error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>From:</strong> ${escapeHtml(name)}</p>
                <p><strong>Email:</strong> ${escapeHtml(email)}</p>
                <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
                <hr>
                <p><strong>Message:</strong></p>
                <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
            `,
    });

    if (error) {
      console.error("Resend error:", error);
      return json({ error: "send_failed" }, 500);
    }

    return json({ success: true, messageId: emailData?.id }, 200);
  } catch (error) {
    console.error("API error:", error);
    return json({ error: "server_error" }, 500);
  }
};
