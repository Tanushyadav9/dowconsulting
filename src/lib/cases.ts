import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { AuthContext } from "@/lib/auth";
import { CaseStageName, StageStatus } from "@prisma/client";
import {
  sendStageHandoffEmail,
  sendOwnerStageHandoffEmail,
  sendReportDeliveredEmail,
  sendFeedbackRequestEmail,
} from "@/lib/email/resend";

export interface StageDefinition {
  stageName: CaseStageName;
  order: number;
  label: string;
  defaultRoleTitle: string;
}

export const STAGES_CONFIG: StageDefinition[] = [
  {
    stageName: "INFORMATION_COLLECTION",
    order: 1,
    label: "Information Collection",
    defaultRoleTitle: "Information Coordinator",
  },
  {
    stageName: "RESEARCH",
    order: 2,
    label: "Market & Field Research",
    defaultRoleTitle: "Research Analyst",
  },
  {
    stageName: "CONSULTATION",
    order: 3,
    label: "Strategic Consultation",
    defaultRoleTitle: "Consultant",
  },
  {
    stageName: "REPORT_PREPARATION",
    order: 4,
    label: "Report Preparation",
    defaultRoleTitle: "Consultant",
  },
  {
    stageName: "OWNER_REVIEW",
    order: 5,
    label: "Owner Review & Approval",
    defaultRoleTitle: "Lead Strategic Advisor / Owner",
  },
  {
    stageName: "DELIVERED",
    order: 6,
    label: "Delivered to Client",
    defaultRoleTitle: "Advisory Desk",
  },
];

/**
 * Access verification result
 */
export interface CaseAccessResult {
  allowed: boolean;
  isOwner: boolean;
  assignedStageNames?: CaseStageName[];
  reason?: string;
}

/**
 * Server-Side Least Privilege Rule 1:
 * A team member sees ONLY the cases and stages assigned to them.
 * The Owner sees everything.
 */
export async function verifyCaseAccess(
  authCtx: AuthContext,
  caseId: string
): Promise<CaseAccessResult> {
  if (!authCtx.isAuthenticated) {
    return { allowed: false, isOwner: false, reason: "Unauthenticated" };
  }

  // Owner sees everything
  if (authCtx.isOwner) {
    return { allowed: true, isOwner: true };
  }

  // Staff: Verify that user is assigned to at least one stage in this case
  if (authCtx.permissions && authCtx.dbUserId) {
    const assignedStages = await prisma.caseStage.findMany({
      where: {
        caseId,
        assignedToId: authCtx.dbUserId,
      },
      select: { stageName: true },
    });

    if (assignedStages.length > 0) {
      return {
        allowed: true,
        isOwner: false,
        assignedStageNames: assignedStages.map((s) => s.stageName),
      };
    }

    return {
      allowed: false,
      isOwner: false,
      reason: "Least Privilege Violation: Staff member is not assigned to this case.",
    };
  }

  return { allowed: false, isOwner: false, reason: "Insufficient permissions" };
}

/**
 * Server-Side Least Privilege Rule 2:
 * A staff member can ONLY modify or add notes to their explicitly assigned stage.
 * The Owner can modify any stage.
 */
export async function verifyStageModification(
  authCtx: AuthContext,
  caseId: string,
  stageName: CaseStageName
): Promise<boolean> {
  if (!authCtx.isAuthenticated) return false;
  if (authCtx.isOwner) return true;

  if (authCtx.permissions && authCtx.dbUserId) {
    const stage = await prisma.caseStage.findUnique({
      where: {
        caseId_stageName: { caseId, stageName },
      },
    });

    return stage?.assignedToId === authCtx.dbUserId;
  }

  return false;
}

/**
 * Server-Side Rule 3:
 * Owner-only actions: assigning, approving final reports, building quotes, managing team.
 */
export function verifyOwnerOnlyAction(authCtx: AuthContext): boolean {
  return authCtx.isAuthenticated && authCtx.isOwner === true;
}

/**
 * Creates a Case record linked to an IntakeSubmission with all 6 stages initialized.
 */
export async function createCaseFromSubmission(submissionId: string) {
  const submission = await prisma.intakeSubmission.findUnique({
    where: { id: submissionId },
    include: { case: true },
  });

  if (!submission) throw new Error("Submission not found");
  if (submission.case) return submission.case; // Already created

  const caseCount = await prisma.case.count();
  const caseNumber = `CASE-${new Date().getFullYear()}-${String(caseCount + 1).padStart(4, "0")}`;

  // Find Owner DB user if available to pre-assign stage 5 (OWNER_REVIEW)
  const ownerUser = await prisma.user.findFirst({
    where: {
      staffPermission: {
        role: "OWNER",
      },
    },
  });

  const newCase = await prisma.case.create({
    data: {
      caseNumber,
      submissionId: submission.id,
      userId: submission.userId,
      title: `${submission.businessName} — ${submission.serviceRequested || "Strategic Advisory"}`,
      clientName: submission.contactName,
      clientEmail: submission.contactEmail,
      clientPhone: submission.contactPhone,
      serviceRequested: submission.serviceRequested || "General Business Consulting",
      currentStage: "INFORMATION_COLLECTION",
      stages: {
        create: STAGES_CONFIG.map((s) => ({
          stageName: s.stageName,
          order: s.order,
          status: s.order === 1 ? ("IN_PROGRESS" as StageStatus) : ("PENDING" as StageStatus),
          startedAt: s.order === 1 ? new Date() : null,
          assignedToId: s.stageName === "OWNER_REVIEW" && ownerUser ? ownerUser.id : null,
        })),
      },
    },
    include: {
      stages: true,
    },
  });

  // Record initial audit log
  await logCaseAction({
    caseId: newCase.id,
    actorId: submission.userId || "system",
    actorName: submission.contactName || "Client Intake",
    actorRole: "CLIENT",
    action: "CASE_INITIALIZED",
    details: {
      submissionId: submission.id,
      serviceRequested: submission.serviceRequested,
      businessName: submission.businessName,
    },
  });

  return newCase;
}

/**
 * Handles stage completion, status advancement, and Resend email hand-offs.
 */
export async function completeStageAndHandoff(params: {
  caseId: string;
  stageName: CaseStageName;
  actor: { id: string; name: string; email: string; role: string };
  internalNotes?: string;
  attachments?: any;
}) {
  const currentCase = await prisma.case.findUnique({
    where: { id: params.caseId },
    include: {
      stages: {
        orderBy: { order: "asc" },
        include: { assignedTo: true },
      },
    },
  });

  if (!currentCase) throw new Error("Case not found");

  const currentStage = currentCase.stages.find((s) => s.stageName === params.stageName);
  if (!currentStage) throw new Error("Stage not found");

  const now = new Date();

  // 1. Mark current stage as COMPLETED
  await prisma.caseStage.update({
    where: { id: currentStage.id },
    data: {
      status: "COMPLETED",
      completedAt: now,
      internalNotes: params.internalNotes ?? currentStage.internalNotes,
      attachments: params.attachments ?? currentStage.attachments,
    },
  });

  // 2. Find next stage in sequence
  const nextStage = currentCase.stages.find((s) => s.order === currentStage.order + 1);

  if (nextStage) {
    // Advance next stage to IN_PROGRESS
    await prisma.caseStage.update({
      where: { id: nextStage.id },
      data: {
        status: "IN_PROGRESS",
        startedAt: now,
      },
    });

    await prisma.case.update({
      where: { id: params.caseId },
      data: {
        currentStage: nextStage.stageName,
      },
    });

    const currentDef = STAGES_CONFIG.find((s) => s.stageName === currentStage.stageName);
    const nextDef = STAGES_CONFIG.find((s) => s.stageName === nextStage.stageName);

    // 3. Email Hand-Off: Send email to next assignee if assigned
    if (nextStage.assignedTo?.email && process.env.RESEND_API_KEY) {
      try {
        await sendStageHandoffEmail({
          to: nextStage.assignedTo.email,
          name: nextStage.assignedTo.name || "Team Member",
          caseNumber: currentCase.caseNumber,
          businessName: currentCase.title,
          stageName: nextDef?.label || nextStage.stageName,
          previousStage: currentDef?.label || currentStage.stageName,
          serviceRequested: currentCase.serviceRequested,
        });
      } catch (emailErr) {
        console.warn("Handoff email error to assignee:", emailErr);
      }
    }

    // 4. Email Hand-Off: Send email to Owner
    const ownerEmail = process.env.OWNER_EMAIL?.trim();
    if (ownerEmail && process.env.RESEND_API_KEY) {
      try {
        await sendOwnerStageHandoffEmail({
          ownerEmail,
          caseNumber: currentCase.caseNumber,
          businessName: currentCase.title,
          completedStage: currentDef?.label || currentStage.stageName,
          completedByName: params.actor.name,
          nextStage: nextDef?.label || nextStage.stageName,
          nextAssigneeName: nextStage.assignedTo?.name || "Unassigned",
        });
      } catch (ownerEmailErr) {
        console.warn("Handoff email error to Owner:", ownerEmailErr);
      }
    }
  } else if (currentStage.stageName === "DELIVERED") {
    // Reached final stage
    await prisma.case.update({
      where: { id: params.caseId },
      data: {
        currentStage: "DELIVERED",
        deliveredAt: now,
      },
    });
  }

  // 5. Audit Log Entry
  await logCaseAction({
    caseId: params.caseId,
    actorId: params.actor.id,
    actorName: params.actor.name,
    actorRole: params.actor.role,
    action: "STAGE_COMPLETED",
    details: {
      stageName: params.stageName,
      nextStage: nextStage?.stageName || "FINISHED",
      notesAppended: Boolean(params.internalNotes),
    },
  });

  return { success: true, nextStage: nextStage?.stageName || null };
}

/**
 * Owner-Only Action: Assign or reassign a stage to a staff member.
 */
export async function assignStage(params: {
  caseId: string;
  stageName: CaseStageName;
  assignedToUserId: string | null;
  actor: { id: string; name: string; role: string };
}) {
  const stage = await prisma.caseStage.update({
    where: {
      caseId_stageName: { caseId: params.caseId, stageName: params.stageName },
    },
    data: {
      assignedToId: params.assignedToUserId,
    },
    include: {
      assignedTo: true,
    },
  });

  await logCaseAction({
    caseId: params.caseId,
    actorId: params.actor.id,
    actorName: params.actor.name,
    actorRole: params.actor.role,
    action: "STAGE_ASSIGNED",
    details: {
      stageName: params.stageName,
      assignedToUserId: params.assignedToUserId,
      assignedToName: stage.assignedTo?.name || "Unassigned",
    },
  });

  return stage;
}

/**
 * Owner-Only Action: Approves the final report and delivers it to the client.
 */
export async function approveAndDeliverReport(params: {
  caseId: string;
  reportTitle: string;
  reportUrl: string;
  ownerUser: { id: string; name: string; email: string };
}) {
  const currentCase = await prisma.case.findUnique({
    where: { id: params.caseId },
  });

  if (!currentCase) throw new Error("Case not found");

  const now = new Date();

  // Update case status and deliverables
  const updatedCase = await prisma.case.update({
    where: { id: params.caseId },
    data: {
      finalReportTitle: params.reportTitle,
      finalReportUrl: params.reportUrl,
      finalReportApproved: true,
      finalReportApprovedAt: now,
      approvedByOwnerId: params.ownerUser.id,
      currentStage: "DELIVERED",
      deliveredAt: now,
    },
  });

  // Mark OWNER_REVIEW and DELIVERED stages as completed
  await prisma.caseStage.updateMany({
    where: {
      caseId: params.caseId,
      stageName: { in: ["OWNER_REVIEW", "DELIVERED"] },
    },
    data: {
      status: "COMPLETED",
      completedAt: now,
    },
  });

  // 1. Generate feedback token and pre-register pending testimonial stub
  const feedbackToken = crypto.randomUUID();
  try {
    await prisma.testimonial.create({
      data: {
        caseId: params.caseId,
        clientName: currentCase.clientName,
        company: currentCase.title,
        role: "Founder / Executive",
        quote: "", // Pending client submission
        serviceUsed: currentCase.serviceRequested,
        consentConfirmed: false,
        isPublished: false,
        status: "PENDING",
        feedbackToken,
      },
    });
  } catch (tErr) {
    console.warn("Could not create pending testimonial stub:", tErr);
  }

  // 2. Notify client via Resend: deliverable notification + feedback request
  if (currentCase.clientEmail && process.env.RESEND_API_KEY) {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://dowconsulting.in";
    try {
      await sendReportDeliveredEmail({
        to: currentCase.clientEmail,
        name: currentCase.clientName,
        businessName: currentCase.title,
        reportTitle: params.reportTitle,
        portalUrl: `${appUrl}/account?tab=deliverables`,
      });
    } catch (emailErr) {
      console.warn("Client report delivered email error:", emailErr);
    }

    try {
      const feedbackUrl = `${appUrl}/feedback?token=${feedbackToken}`;
      await sendFeedbackRequestEmail({
        to: currentCase.clientEmail,
        name: currentCase.clientName,
        businessName: currentCase.title,
        caseNumber: currentCase.caseNumber,
        feedbackUrl,
      });
    } catch (fbErr) {
      console.warn("Feedback request email error:", fbErr);
    }
  }

  // 3. Audit Log Entry
  await logCaseAction({
    caseId: params.caseId,
    actorId: params.ownerUser.id,
    actorName: params.ownerUser.name,
    actorRole: "OWNER",
    action: "REPORT_APPROVED_AND_DELIVERED",
    details: {
      reportTitle: params.reportTitle,
      reportUrl: params.reportUrl,
      feedbackTokenIssued: true,
    },
  });

  return updatedCase;
}

/**
 * Records an entry into the CaseAuditLog
 */
export async function logCaseAction(params: {
  caseId: string;
  actorId: string;
  actorName: string;
  actorRole: string;
  action: string;
  details?: any;
}) {
  try {
    return await prisma.caseAuditLog.create({
      data: {
        caseId: params.caseId,
        actorId: params.actorId,
        actorName: params.actorName,
        actorRole: params.actorRole,
        action: params.action,
        details: params.details || null,
      },
    });
  } catch (err) {
    console.error("Audit log error:", err);
  }
}

/**
 * Client Portal Sanitized DTO:
 * - Shows only simple status stages and the delivered report.
 * - NEVER shows internal notes.
 * - Shows staff names ONLY if the Owner switches that on (showStaffNamesToClient).
 */
export async function getClientCaseView(clientEmail: string) {
  if (!clientEmail) return null;

  const currentCase = await prisma.case.findFirst({
    where: {
      clientEmail: {
        equals: clientEmail.trim().toLowerCase(),
        mode: "insensitive",
      },
    },
    include: {
      stages: {
        orderBy: { order: "asc" },
        include: {
          assignedTo: {
            select: {
              name: true,
              staffPermission: {
                select: { roleTitle: true },
              },
            },
          },
        },
      },
    },
  });

  if (!currentCase) return null;

  // Strict sanitation: internal notes are completely stripped!
  const sanitizedStages = currentCase.stages.map((stage) => {
    const stageDef = STAGES_CONFIG.find((s) => s.stageName === stage.stageName);
    return {
      stageName: stage.stageName,
      order: stage.order,
      label: stageDef?.label || stage.stageName,
      status: stage.status,
      startedAt: stage.startedAt,
      completedAt: stage.completedAt,
      // Staff names shown ONLY if showStaffNamesToClient is enabled
      assignedStaff: currentCase.showStaffNamesToClient
        ? stage.assignedTo?.name || "Consulting Team"
        : stage.assignedTo?.staffPermission?.roleTitle || stageDef?.defaultRoleTitle || "Consulting Team",
      // Notice: internalNotes is deliberately NOT returned here
    };
  });

  return {
    id: currentCase.id,
    caseNumber: currentCase.caseNumber,
    title: currentCase.title,
    serviceRequested: currentCase.serviceRequested,
    currentStage: currentCase.currentStage,
    stages: sanitizedStages,
    report: currentCase.finalReportApproved && currentCase.finalReportUrl
      ? {
          title: currentCase.finalReportTitle || "Final Strategic Advisory Report.pdf",
          url: currentCase.finalReportUrl,
          deliveredAt: currentCase.deliveredAt,
        }
      : null,
  };
}
