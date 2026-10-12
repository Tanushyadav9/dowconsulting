import { Resend } from "resend";
import { BRAND } from "@/lib/constants/brand";

export function getResendClient(): { client: Resend; from: string } | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from =
    process.env.RESEND_FROM_EMAIL?.trim() ||
    "DOW Consulting <advisory@dowconsulting.in>";

  if (!apiKey || apiKey.includes("placeholder") || apiKey.includes("re_...")) {
    return null;
  }

  return { client: new Resend(apiKey), from };
}

/**
 * Optional email enquiry forwarder
 */
export async function sendEnquiryNotificationEmail(params: {
  name: string;
  businessName: string;
  email?: string;
  phone: string;
  message: string;
}) {
  const clientInfo = getResendClient();
  if (!clientInfo) return { success: false, reason: "Resend unconfigured" };

  const { client, from } = clientInfo;
  const targetEmail =
    process.env.NOTIFICATION_RECEIVER_EMAIL?.trim() ||
    BRAND.contact.email;

  const subject = `New Client Enquiry: ${params.businessName} (${params.name})`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1B2838; line-height: 1.6;">
      <div style="background-color: #1B2838; padding: 20px; text-align: center;">
        <h2 style="color: #F7F6F3; margin: 0;">DOW CONSULTING</h2>
        <p style="color: #C9A24B; margin: 4px 0 0; font-size: 13px;">Direct Client Enquiry</p>
      </div>
      <div style="padding: 24px; background-color: #FFFFFF; border: 1px solid #E2E8F0;">
        <p><strong>Name:</strong> ${params.name}</p>
        <p><strong>Business:</strong> ${params.businessName}</p>
        <p><strong>Phone:</strong> ${params.phone}</p>
        <p><strong>Email:</strong> ${params.email || "Not provided"}</p>
        <p><strong>Details:</strong><br />${params.message}</p>
      </div>
    </div>
  `;

  return client.emails.send({
    from,
    to: targetEmail,
    subject,
    html,
  });
}
