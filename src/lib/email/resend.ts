import { Resend } from "resend";
import { requireEnv } from "@/lib/env";
import { BRAND } from "@/lib/constants/brand";

export function getResendClient(): { client: Resend; from: string } {
  const apiKey = requireEnv("RESEND_API_KEY", "Resend transactional email delivery API key");
  const from = requireEnv("RESEND_FROM_EMAIL", "Verified transactional sender address");
  return { client: new Resend(apiKey), from };
}

/**
 * 1. Intake Submission Confirmation Email
 */
export async function sendIntakeConfirmationEmail(params: {
  to: string;
  name: string;
  businessName: string;
  submissionId: string;
}) {
  const { client, from } = getResendClient();

  const subject = `Intake Received: Strategic Consultation for ${params.businessName}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1B2838; line-height: 1.6;">
      <div style="background-color: #1B2838; padding: 24px; text-align: center;">
        <h1 style="color: #F7F6F3; margin: 0; font-size: 20px; letter-spacing: 0.5px;">DOW CONSULTING</h1>
        <p style="color: #C9A24B; margin: 6px 0 0; font-size: 13px; font-weight: bold;">Business Consulting for Startups, Small Companies &amp; MSMEs</p>
      </div>
      <div style="padding: 30px; background-color: #FFFFFF; border: 1px solid #E2E8F0;">
        <p>Dear ${params.name},</p>
        <p>Thank you for submitting your detailed business profile for <strong>${params.businessName}</strong>.</p>
        <p>Our consulting team and Lead Strategic Advisor Niraj Kumar are reviewing your strategic goals and operational requirements. We evaluate every inquiry with structured commercial operating analysis and research methodologies.</p>
        
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

  return client.emails.send({
    from,
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
  const { client, from } = getResendClient();

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

  return client.emails.send({
    from,
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
  const { client, from } = getResendClient();

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

  return client.emails.send({
    from,
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
  const { client, from } = getResendClient();

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
        <p>Your live strategic consultation session with the <strong>DOW Consulting</strong> team has been confirmed.</p>
        
        <div style="background-color: #F7F6F3; border-left: 4px solid #1B2838; padding: 18px; margin: 20px 0;">
          <p style="margin: 0; font-size: 14px;"><strong>Engagement:</strong> ${params.packageName}</p>
          <p style="margin: 8px 0 0; font-size: 14px;"><strong>Scheduled Time:</strong> ${params.scheduledAt}</p>
          <p style="margin: 8px 0 0; font-size: 14px;"><strong>Delivery Channel:</strong> ${channelText}</p>
          <p style="margin: 8px 0 0; font-size: 13px; color: #5A6472;">Advisory Desk WhatsApp: <a href="${BRAND.contact.whatsapp.link}" style="color: #1B2838; font-weight: bold;">${BRAND.contact.whatsapp.display}</a></p>
        </div>

        <p><strong>What to Prepare for the Call:</strong></p>
        <ul>
          <li>Business background, pitch deck, or notes regarding your target market.</li>
          <li>Key target milestones (e.g. product launch, expansion plans, market entry).</li>
          <li>Specific business bottlenecks or strategic priorities you want addressed.</li>
        </ul>

        <p>Following this live session, your comprehensive written strategic report will be prepared by our team and delivered to your portal vault.</p>
      </div>
    </div>
  `;

  return client.emails.send({
    from,
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
  const { client, from } = getResendClient();

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

        <p>Your report includes the detailed strategic insights, research findings, and operational priorities formulated for your enterprise.</p>
        <p style="font-size: 13px; color: #5A6472;">For follow-up questions during your active review window, reach out directly via WhatsApp at ${BRAND.contact.whatsapp.display}.</p>
      </div>
    </div>
  `;

  return client.emails.send({
    from,
    to: params.to,
    subject,
    html,
  });
}

/**
 * 6. Case Stage Hand-Off Notification Email to Next Staff Assignee
 */
export async function sendStageHandoffEmail(params: {
  to: string;
  name: string;
  caseNumber: string;
  businessName: string;
  stageName: string;
  previousStage: string;
  serviceRequested: string;
}) {
  const { client, from } = getResendClient();

  const subject = `[Case Action Required] ${params.caseNumber}: ${params.stageName} for ${params.businessName}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1B2838; line-height: 1.6;">
      <div style="background-color: #1B2838; padding: 24px; text-align: center;">
        <h1 style="color: #F7F6F3; margin: 0; font-size: 20px;">DOW CONSULTING</h1>
        <p style="color: #C9A24B; margin: 6px 0 0; font-size: 13px; font-weight: bold;">Internal Workflow Hand-Off Notification</p>
      </div>
      <div style="padding: 30px; background-color: #FFFFFF; border: 1px solid #E2E8F0;">
        <p>Dear ${params.name},</p>
        <p>A case stage has completed and been handed off to you for active execution:</p>
        
        <div style="background-color: #F7F6F3; border-left: 4px solid #C9A24B; padding: 18px; margin: 20px 0;">
          <p style="margin: 0; font-size: 14px;"><strong>Case Number:</strong> ${params.caseNumber}</p>
          <p style="margin: 6px 0 0; font-size: 14px;"><strong>Business:</strong> ${params.businessName}</p>
          <p style="margin: 6px 0 0; font-size: 14px;"><strong>Service:</strong> ${params.serviceRequested}</p>
          <p style="margin: 6px 0 0; font-size: 14px;"><strong>Completed Stage:</strong> ${params.previousStage}</p>
          <p style="margin: 6px 0 0; font-size: 14px; color: #1B2838;"><strong>Your Assigned Stage:</strong> <span style="color: #C9A24B; font-weight: bold;">${params.stageName}</span></p>
        </div>

        <p>Please log in to your DOW Consulting workspace to review the intake brief, previous stage findings, and internal notes.</p>
      </div>
    </div>
  `;

  return client.emails.send({
    from,
    to: params.to,
    subject,
    html,
  });
}

/**
 * 7. Case Stage Hand-Off Notification to Owner
 */
export async function sendOwnerStageHandoffEmail(params: {
  ownerEmail: string;
  caseNumber: string;
  businessName: string;
  completedStage: string;
  completedByName: string;
  nextStage: string;
  nextAssigneeName: string;
}) {
  const { client, from } = getResendClient();

  const subject = `[Owner Update] ${params.caseNumber}: Stage '${params.completedStage}' Completed`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1B2838; line-height: 1.6;">
      <div style="background-color: #1B2838; padding: 24px; text-align: center;">
        <h1 style="color: #F7F6F3; margin: 0; font-size: 20px;">DOW CONSULTING</h1>
        <p style="color: #C9A24B; margin: 6px 0 0; font-size: 13px; font-weight: bold;">Owner Pipeline Activity Brief</p>
      </div>
      <div style="padding: 30px; background-color: #FFFFFF; border: 1px solid #E2E8F0;">
        <p>Hello Niraj,</p>
        <p>A workflow hand-off has occurred on active engagement <strong>${params.caseNumber}</strong>:</p>
        
        <div style="background-color: #F7F6F3; border-left: 4px solid #1B2838; padding: 18px; margin: 20px 0;">
          <p style="margin: 0; font-size: 14px;"><strong>Case Number:</strong> ${params.caseNumber}</p>
          <p style="margin: 6px 0 0; font-size: 14px;"><strong>Client Entity:</strong> ${params.businessName}</p>
          <p style="margin: 6px 0 0; font-size: 14px;"><strong>Completed Stage:</strong> ${params.completedStage} (by ${params.completedByName})</p>
          <p style="margin: 6px 0 0; font-size: 14px;"><strong>Next Stage:</strong> ${params.nextStage}</p>
          <p style="margin: 6px 0 0; font-size: 14px;"><strong>Next Assignee:</strong> ${params.nextAssigneeName}</p>
        </div>

        <p>You can review all internal stage notes, reassign stages, or review deliverables directly on your Owner dashboard.</p>
      </div>
    </div>
  `;

  return client.emails.send({
    from,
    to: params.ownerEmail,
    subject,
    html,
  });
}

/**
 * 8. Post-Delivery Client Feedback Request Email
 */
export async function sendFeedbackRequestEmail(params: {
  to: string;
  name: string;
  businessName: string;
  caseNumber: string;
  feedbackUrl: string;
}) {
  const { client, from } = getResendClient();

  const subject = `Your Advisory Experience with DOW Consulting [Engagement ${params.caseNumber}]`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1B2838; line-height: 1.6;">
      <div style="background-color: #1B2838; padding: 24px; text-align: center;">
        <h1 style="color: #F7F6F3; margin: 0; font-size: 20px;">DOW CONSULTING</h1>
        <p style="color: #C9A24B; margin: 6px 0 0; font-size: 13px; font-weight: bold;">Post-Engagement Feedback &amp; Review</p>
      </div>
      <div style="padding: 30px; background-color: #FFFFFF; border: 1px solid #E2E8F0;">
        <p>Dear ${params.name},</p>
        <p>Following the delivery of your strategic advisory deliverables for <strong>${params.businessName}</strong>, our advisory team and Lead Strategic Advisor Niraj Kumar would appreciate your feedback on the consultation.</p>
        
        <p>At DOW Consulting, we rely exclusively on genuine, verified client feedback with explicit consent. Your insights help us maintain the quality of our strategic advisory practice.</p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${params.feedbackUrl}" style="background-color: #C9A24B; color: #1B2838; text-decoration: none; padding: 14px 28px; font-weight: bold; border-radius: 4px; display: inline-block;">
            Share Feedback (2-Minute Form)
          </a>
        </div>

        <p style="font-size: 13px; color: #5A6472;">
          You retain full control over whether your comments are published, how your name is displayed (full name or initials), and your organization details.
        </p>

        <p style="margin-top: 24px; font-size: 12px; color: #8C96A5;">
          Direct Link: <a href="${params.feedbackUrl}" style="color: #1B2838;">${params.feedbackUrl}</a>
        </p>
      </div>
    </div>
  `;

  return client.emails.send({
    from,
    to: params.to,
    subject,
    html,
  });
}

/**
 * 9. Notification to Owner when a client submits feedback
 */
export async function sendOwnerNewFeedbackNotificationEmail(params: {
  ownerEmail: string;
  clientName: string;
  company?: string;
  caseNumber?: string;
  quote: string;
  consentConfirmed: boolean;
}) {
  const { client, from } = getResendClient();

  const subject = `[Client Feedback] New Feedback Submitted by ${params.clientName}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1B2838; line-height: 1.6;">
      <div style="background-color: #1B2838; padding: 24px; text-align: center;">
        <h1 style="color: #F7F6F3; margin: 0; font-size: 20px;">DOW CONSULTING</h1>
        <p style="color: #C9A24B; margin: 6px 0 0; font-size: 13px; font-weight: bold;">New Client Feedback Pending Owner Approval</p>
      </div>
      <div style="padding: 30px; background-color: #FFFFFF; border: 1px solid #E2E8F0;">
        <p>Hello Niraj,</p>
        <p>A client has submitted post-delivery feedback for your review:</p>
        
        <div style="background-color: #F7F6F3; border-left: 4px solid #C9A24B; padding: 18px; margin: 20px 0;">
          <p style="margin: 0; font-size: 14px;"><strong>Client:</strong> ${params.clientName} ${params.company ? `(${params.company})` : ""}</p>
          ${params.caseNumber ? `<p style="margin: 6px 0 0; font-size: 14px;"><strong>Case:</strong> ${params.caseNumber}</p>` : ""}
          <p style="margin: 6px 0 0; font-size: 14px;"><strong>Consent Confirmed:</strong> ${params.consentConfirmed ? "Yes" : "No"}</p>
          <div style="margin-top: 12px; font-style: italic; color: #1B2838; font-size: 14px;">
            &ldquo;${params.quote}&rdquo;
          </div>
        </div>

        <p>This feedback has arrived as <strong>PENDING</strong> and will NOT be visible publicly until you explicitly approve and publish it in the Admin Testimonials section.</p>
      </div>
    </div>
  `;

  return client.emails.send({
    from,
    to: params.ownerEmail,
    subject,
    html,
  });
}

