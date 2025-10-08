import type { APIRoute } from 'astro';
import { Resend } from 'resend';
 // Route as server-rendered
export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.formData();
        const name = data.get('name')?.toString();
        const email = data.get('email')?.toString();
        const subject = data.get('subject')?.toString();
        const message = data.get('message')?.toString();

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return new Response(
                JSON.stringify({ error: 'All fields are required' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Send email using Resend
        const { data: emailData, error } = await resend.emails.send({
            from: 'Contact Form <onboarding@resend.dev>',
            to: 'rafa03-dev@proton.me',
            replyTo: email,
            subject: `Contact Form: ${subject}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>From:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <hr>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `,
        });

        if (error) {
            console.error('Resend error:', error);
            return new Response(
                JSON.stringify({ error: 'Failed to send email' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }

        return new Response(
            JSON.stringify({ success: true, messageId: emailData?.id }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('API error:', error);
        return new Response(
            JSON.stringify({ error: 'Internal server error' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};