import { Resend } from "resend";
import { BRAND } from "@/lib/constants/brand";

const resendApiKey = process.env.RESEND_API_KEY;
export const resend = resendApiKey ? new Resend(resendApiKey) : null;

const DEFAULT_FROM = process.env.RESEND_FROM_EMAIL || "DOW Consulting <advisory@dowconsulting.com>";

/**
 * 1. Intake Submission Confirmation Email
 */
export async function sendIntakeConfirmationEmail(params: {
  to: string;
  name: string;
  businessName: string;
  submissionId: string;
}) {
  if (!resend) {
    console.warn("Resend API key not set; skipping intake confirmation email.");
    return { success: false, simulated: true };
  }

  const subject = `Intake Received: Strategic Consultation for ${params.businessName}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1B2838; line-height: 1.6;">
      <div style="background-color: #1B2838; padding: 24px; text-align: center;">
        <h1 style="color: #F7F6F3; margin: 0; font-size: 20px; letter-spacing: 0.5px;">DOW CONSULTING</h1>
        <p style="color: #C9A24B; margin: 6px 0 0; font-size: 13px; font-weight: bold;">Strategic Business Timing & Commercial Vastu</p>
      </div>
      <div style="padding: 30px; background-color: #FFFFFF; border: 1px solid #E2E8F0;">
        <p>Dear ${params.name},</p>
        <p>Thank you for submitting your detailed business profile for <strong>${params.businessName}</strong>.</p>
        <p>Niraj Kumar and our advisory desk are reviewing your strategic goals, current timeline, and spatial context. We evaluate every inquiry with direct corporate operating rigor and commercial timing methodologies.</p>
        
        <div style="background-color: #F7F6F3; border-left: 4px solid #C9A24B; padding: 16px; margin: 20px 0;">
          <p style="margin: 0; font-size: 14px; font-weight: bold;">Submission Reference ID: ${params.submissionId}</p>
          <p style="margin: 6px 0 0; font-size: 13px; color: #5A6472;">Status: <strong>Under Review</strong></p>
        </div>

        <p><strong>Next Steps:</strong></p>
        <ul>
          <li>Our desk will review your submission within 24 to 48 business hours.</li>
          <li>You will receive a tailored scope confirmation or schedule coordinate directly.</li>
          <li>For immediate queries, reach our direct advisory WhatsApp: <a href="${BRAND.contact.whatsapp.link}" style="color: #1B2838; font-weight: bold;">${BRAND.contact.whatsapp.display}</a>.</li>
        </ul>

        <p style="margin-top: 30px; font-size: 13px; color: #5A6472;">
          Office Address:<br />
          ${BRAND.contact.address.full}
        </p>
      </div>
    </div>
  `;

  return resend.emails.send({
    from: DEFAULT_FROM,
    to: params.to,
    subject,
    html,
  });
}

/**
 * 2. Custom Quote Delivery Email
 */
export async function sendQuoteDeliveryEmail(params: {
  to: string;
  name: string;
  businessName: string;
  quoteTitle: string;
  amount: number;
  currency: string;
  quoteId: string;
  checkoutUrl: string;
}) {
  if (!resend) {
    console.warn("Resend API key not set; skipping quote delivery email.");
    return { success: false, simulated: true };
  }

  const formattedAmount =
    params.currency === "INR"
      ? `₹${params.amount.toLocaleString("en-IN")}`
      : `$${params.amount.toLocaleString("en-US")}`;

  const subject = `Consulting Proposal: ${params.quoteTitle} for ${params.businessName}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1B2838; line-height: 1.6;">
      <div style="background-color: #1B2838; padding: 24px; text-align: center;">
        <h1 style="color: #F7F6F3; margin: 0; font-size: 20px;">DOW CONSULTING</h1>
        <p style="color: #C9A24B; margin: 6px 0 0; font-size: 13px; font-weight: bold;">Executive Proposal & Scope of Advisory</p>
      </div>
      <div style="padding: 30px; background-color: #FFFFFF; border: 1px solid #E2E8F0;">
        <p>Dear ${params.name},</p>
        <p>Following our diagnostic review of <strong>${params.businessName}</strong>, Niraj Kumar has formulated your tailored advisory proposal:</p>
        
        <div style="background-color: #F7F6F3; border: 1px solid #E2E8F0; padding: 20px; border-radius: 4px; margin: 20px 0;">
          <h3 style="margin: 0 0 10px; color: #1B2838;">${params.quoteTitle}</h3>
          <p style="margin: 0; font-size: 22px; font-weight: bold; color: #1B2838;">Fee: ${formattedAmount} <span style="font-size: 13px; font-weight: normal; color: #5A6472;">(One-Time Flat Retainer)</span></p>
          <p style="margin: 10px 0 0; font-size: 13px; color: #5A6472;">Includes direct live strategy session + comprehensive written diagnostic report PDF.</p>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${params.checkoutUrl}" style="background-color: #C9A24B; color: #1B2838; text-decoration: none; padding: 14px 28px; font-weight: bold; border-radius: 4px; display: inline-block;">
            Review Proposal & Proceed to Booking
          </a>
        </div>

        <p style="font-size: 13px; color: #5A6472;">Have specific scope questions? Reply to this email or contact us via WhatsApp at ${BRAND.contact.whatsapp.display}.</p>
      </div>
    </div>
  `;

  return resend.emails.send({
    from: DEFAULT_FROM,
    to: params.to,
    subject,
    html,
  });
}

/**
 * 3. Payment Receipt Email
 */
export async function sendPaymentReceiptEmail(params: {
  to: string;
  name: string;
  orderNumber: string;
  packageName: string;
  amount: number;
  currency: string;
  provider: string;
}) {
  if (!resend) {
    console.warn("Resend API key not set; skipping payment receipt email.");
    return { success: false, simulated: true };
  }

  const formattedAmount =
    params.currency === "INR"
      ? `₹${params.amount.toLocaleString("en-IN")}`
      : `$${params.amount.toLocaleString("en-US")}`;

  const subject = `Payment Receipt [${params.orderNumber}]: DOW Consulting`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1B2838; line-height: 1.6;">
      <div style="background-color: #1B2838; padding: 24px; text-align: center;">
        <h1 style="color: #F7F6F3; margin: 0; font-size: 20px;">DOW CONSULTING</h1>
        <p style="color: #C9A24B; margin: 6px 0 0; font-size: 13px; font-weight: bold;">Official Payment Confirmation</p>
      </div>
      <div style="padding: 30px; background-color: #FFFFFF; border: 1px solid #E2E8F0;">
        <p>Dear ${params.name},</p>
        <p>Thank you. Your one-time advisory fee for <strong>${params.packageName}</strong> has been successfully processed.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
          <tr style="border-bottom: 1px solid #E2E8F0;">
            <td style="padding: 8px 0; color: #5A6472;">Order Number</td>
            <td style="padding: 8px 0; font-weight: bold; text-align: right;">${params.orderNumber}</td>
          </tr>
          <tr style="border-bottom: 1px solid #E2E8F0;">
            <td style="padding: 8px 0; color: #5A6472;">Engagement</td>
            <td style="padding: 8px 0; font-weight: bold; text-align: right;">${params.packageName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #E2E8F0;">
            <td style="padding: 8px 0; color: #5A6472;">Amount Paid</td>
            <td style="padding: 8px 0; font-weight: bold; text-align: right;">${formattedAmount}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #5A6472;">Payment Gateway</td>
            <td style="padding: 8px 0; font-weight: bold; text-align: right;">${params.provider}</td>
          </tr>
        </table>

        <p>Your session schedule coordinate will follow in a separate confirmation email shortly.</p>
      </div>
    </div>
  `;

  return resend.emails.send({
    from: DEFAULT_FROM,
    to: params.to,
    subject,
    html,
  });
}

/**
 * 4. Booking Confirmation Email with WhatsApp Contact & Google Meet
 */
export async function sendBookingConfirmationEmail(params: {
  to: string;
  name: string;
  packageName: string;
  scheduledAt: string;
  meetingChannel: "WHATSAPP_CALL" | "GOOGLE_MEET";
  meetingLink?: string;
}) {
  if (!resend) {
    console.warn("Resend API key not set; skipping booking confirmation email.");
    return { success: false, simulated: true };
  }

  const channelText =
    params.meetingChannel === "WHATSAPP_CALL"
      ? `WhatsApp Call (+91 93112 15564)`
      : `Google Meet (${params.meetingLink || "Link sent via calendar invite"})`;

  const subject = `Session Confirmed: Strategic Consultation with Niraj Kumar`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1B2838; line-height: 1.6;">
      <div style="background-color: #1B2838; padding: 24px; text-align: center;">
        <h1 style="color: #F7F6F3; margin: 0; font-size: 20px;">DOW CONSULTING</h1>
        <p style="color: #C9A24B; margin: 6px 0 0; font-size: 13px; font-weight: bold;">Consultation Session Confirmed</p>
      </div>
      <div style="padding: 30px; background-color: #FFFFFF; border: 1px solid #E2E8F0;">
        <p>Dear ${params.name},</p>
        <p>Your live strategic consultation session with <strong>Niraj Kumar</strong> has been confirmed.</p>
        
        <div style="background-color: #F7F6F3; border-left: 4px solid #1B2838; padding: 18px; margin: 20px 0;">
          <p style="margin: 0; font-size: 14px;"><strong>Engagement:</strong> ${params.packageName}</p>
          <p style="margin: 8px 0 0; font-size: 14px;"><strong>Scheduled Time:</strong> ${params.scheduledAt}</p>
          <p style="margin: 8px 0 0; font-size: 14px;"><strong>Delivery Channel:</strong> ${channelText}</p>
          <p style="margin: 8px 0 0; font-size: 13px; color: #5A6472;">Direct Advisor WhatsApp: <a href="${BRAND.contact.whatsapp.link}" style="color: #1B2838; font-weight: bold;">${BRAND.contact.whatsapp.display}</a></p>
        </div>

        <p><strong>What to Prepare for the Call:</strong></p>
        <ul>
          <li>Any premises floor plans, layout sketches, or commercial site photos.</li>
          <li>Key target milestones (e.g. lease signing, brand launch, investor presentations).</li>
          <li>Specific business bottlenecks or key team dynamic questions.</li>
        </ul>

        <p>Following this live session, your comprehensive written strategic report will be prepared and delivered to your portal vault.</p>
      </div>
    </div>
  `;

  return resend.emails.send({
    from: DEFAULT_FROM,
    to: params.to,
    subject,
    html,
  });
}

/**
 * 5. Report Delivered Notification Email
 */
export async function sendReportDeliveredEmail(params: {
  to: string;
  name: string;
  businessName: string;
  reportTitle: string;
  portalUrl: string;
}) {
  if (!resend) {
    console.warn("Resend API key not set; skipping report delivered email.");
    return { success: false, simulated: true };
  }

  const subject = `Strategic Report Ready: ${params.reportTitle} for ${params.businessName}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1B2838; line-height: 1.6;">
      <div style="background-color: #1B2838; padding: 24px; text-align: center;">
        <h1 style="color: #F7F6F3; margin: 0; font-size: 20px;">DOW CONSULTING</h1>
        <p style="color: #C9A24B; margin: 6px 0 0; font-size: 13px; font-weight: bold;">Executive Written Report Delivered</p>
      </div>
      <div style="padding: 30px; background-color: #FFFFFF; border: 1px solid #E2E8F0;">
        <p>Dear ${params.name},</p>
        <p>Niraj Kumar has completed your comprehensive written strategic advisory report for <strong>${params.businessName}</strong>.</p>
        
        <div style="background-color: #F7F6F3; border: 1px solid #E2E8F0; padding: 20px; text-align: center; margin: 20px 0;">
          <h3 style="margin: 0 0 10px; color: #1B2838;">${params.reportTitle}</h3>
          <p style="margin: 0 0 16px; font-size: 13px; color: #5A6472;">Secure PDF document available for instant download in your client portal.</p>
          <a href="${params.portalUrl}" style="background-color: #1B2838; color: #F7F6F3; text-decoration: none; padding: 12px 24px; font-weight: bold; border-radius: 4px; display: inline-block;">
            Access Your Report in Client Portal
          </a>
        </div>

        <p>Your report includes the detailed timing breakdown, commercial spatial recommendations, and operational priorities discussed during your session.</p>
        <p style="font-size: 13px; color: #5A6472;">For follow-up questions during your active review window, reach out directly via WhatsApp at ${BRAND.contact.whatsapp.display}.</p>
      </div>
    </div>
  `;

  return resend.emails.send({
    from: DEFAULT_FROM,
    to: params.to,
    subject,
    html,
  });
}
