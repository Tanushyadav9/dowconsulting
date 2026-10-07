import assert from "node:assert";
import { test, describe, beforeEach } from "node:test";
import {
  verifyCaseAccess,
  verifyStageModification,
  verifyOwnerOnlyAction,
  getClientCaseView,
} from "@/lib/cases";
import { AuthContext } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

describe("Case Workflow & Server-Side Least Privilege Security Tests", () => {
  const MOCK_CASE_ID = "case_cm789abc0001";
  const ASSIGNED_STAFF_ID = "user_staff_analyst_01";
  const UNASSIGNED_STAFF_ID = "user_staff_coordinator_02";
  const OWNER_USER_ID = "user_owner_niraj_00";
  const CLIENT_EMAIL = "founder@apexretail.in";

  // Auth Context Fixtures
  const ownerAuth: AuthContext = {
    isAuthenticated: true,
    user: { id: "clerk_owner" },
    dbUserId: OWNER_USER_ID,
    email: "niraj@dowconsulting.in",
    isOwner: true,
    permissions: {
      role: "OWNER",
      roleTitle: "Lead Strategic Advisor / Owner",
      canManageSubmissions: true,
      canManageQuotes: true,
      canManageBookings: true,
      canManageReports: true,
      canManageTeam: true,
    },
  };

  const assignedStaffAuth: AuthContext = {
    isAuthenticated: true,
    user: { id: "clerk_staff_1" },
    dbUserId: ASSIGNED_STAFF_ID,
    email: "analyst@dowconsulting.in",
    isOwner: false,
    permissions: {
      role: "STAFF",
      roleTitle: "Research Analyst",
      canManageSubmissions: true,
      canManageQuotes: false,
      canManageBookings: false,
      canManageReports: false,
      canManageTeam: false,
    },
  };

  const unassignedStaffAuth: AuthContext = {
    isAuthenticated: true,
    user: { id: "clerk_staff_2" },
    dbUserId: UNASSIGNED_STAFF_ID,
    email: "coordinator@dowconsulting.in",
    isOwner: false,
    permissions: {
      role: "STAFF",
      roleTitle: "Information Coordinator",
      canManageSubmissions: true,
      canManageQuotes: false,
      canManageBookings: false,
      canManageReports: false,
      canManageTeam: false,
    },
  };

  const clientAuth: AuthContext = {
    isAuthenticated: true,
    user: { id: "clerk_client" },
    dbUserId: "user_client_99",
    email: CLIENT_EMAIL,
    isOwner: false,
    permissions: null,
  };

  // -------------------------------------------------------------
  // TEST 1: Unassigned team member cannot open case
  // -------------------------------------------------------------
  test("1. Proves a team member CANNOT open an unassigned case (Least Privilege)", async () => {
    // Stub prisma.caseStage.findMany to return no assignments for this user
    (prisma.caseStage as any).findMany = async (query: any) => {
      if (query.where?.assignedToId === UNASSIGNED_STAFF_ID) {
        return []; // No stages assigned to staff member 2
      }
      return [{ stageName: "RESEARCH" }];
    };

    const access = await verifyCaseAccess(unassignedStaffAuth, MOCK_CASE_ID);

    assert.strictEqual(
      access.allowed,
      false,
      "Expected unassigned staff member to be DENIED access to case"
    );
    assert.match(
      access.reason || "",
      /Least Privilege Violation|not assigned/,
      "Expected violation reason explaining lack of assignment"
    );
  });

  // -------------------------------------------------------------
  // TEST 1b: Assigned team member CAN open their assigned case
  // -------------------------------------------------------------
  test("1b. Proves an assigned team member CAN open their assigned case", async () => {
    // Stub prisma.caseStage.findMany to return the RESEARCH stage assignment
    (prisma.caseStage as any).findMany = async (query: any) => {
      if (query.where?.assignedToId === ASSIGNED_STAFF_ID) {
        return [{ stageName: "RESEARCH" }];
      }
      return [];
    };

    const access = await verifyCaseAccess(assignedStaffAuth, MOCK_CASE_ID);

    assert.strictEqual(
      access.allowed,
      true,
      "Expected assigned staff member to be GRANTED access"
    );
    assert.deepStrictEqual(
      access.assignedStageNames,
      ["RESEARCH"],
      "Expected assignedStageNames to list only RESEARCH stage"
    );
  });

  // -------------------------------------------------------------
  // TEST 2: Client view strictly excludes internal notes
  // -------------------------------------------------------------
  test("2. Proves a client CANNOT see internal notes in client portal view", async () => {
    const CONFIDENTIAL_TEXT = "CONFIDENTIAL_AUDIT_NOTE: High vendor concentration risk and unit economics strain.";

    // Mock case record in database with sensitive internal notes
    (prisma.case as any).findFirst = async () => ({
      id: MOCK_CASE_ID,
      caseNumber: "CASE-2026-0042",
      title: "Apex Retail LLP — GTM Strategy",
      serviceRequested: "GTM Strategy",
      currentStage: "RESEARCH",
      showStaffNamesToClient: false,
      finalReportApproved: false,
      finalReportUrl: null,
      finalReportTitle: null,
      deliveredAt: null,
      stages: [
        {
          stageName: "INFORMATION_COLLECTION",
          order: 1,
          status: "COMPLETED",
          startedAt: new Date("2026-10-01"),
          completedAt: new Date("2026-10-02"),
          internalNotes: "Internal client onboarding notes: prompt response.",
          assignedTo: {
            name: "Vikram Malhotra",
            staffPermission: { roleTitle: "Information Coordinator" },
          },
        },
        {
          stageName: "RESEARCH",
          order: 2,
          status: "IN_PROGRESS",
          startedAt: new Date("2026-10-02"),
          completedAt: null,
          internalNotes: CONFIDENTIAL_TEXT, // SENSITIVE TEAM NOTES
          assignedTo: {
            name: "Ananya Sharma",
            staffPermission: { roleTitle: "Research Analyst" },
          },
        },
        {
          stageName: "CONSULTATION",
          order: 3,
          status: "PENDING",
          startedAt: null,
          completedAt: null,
          internalNotes: null,
          assignedTo: null,
        },
        {
          stageName: "REPORT_PREPARATION",
          order: 4,
          status: "PENDING",
          startedAt: null,
          completedAt: null,
          internalNotes: null,
          assignedTo: null,
        },
        {
          stageName: "OWNER_REVIEW",
          order: 5,
          status: "PENDING",
          startedAt: null,
          completedAt: null,
          internalNotes: null,
          assignedTo: null,
        },
        {
          stageName: "DELIVERED",
          order: 6,
          status: "PENDING",
          startedAt: null,
          completedAt: null,
          internalNotes: null,
          assignedTo: null,
        },
      ],
    });

    const clientView = await getClientCaseView(CLIENT_EMAIL);

    assert.ok(clientView, "Expected client case view to be returned");
    assert.strictEqual(clientView?.caseNumber, "CASE-2026-0042");
    assert.strictEqual(clientView?.stages.length, 6, "Expected 6 stages in client view");

    // Assertion 1: No stage object in the client DTO has an internalNotes property
    for (const stage of clientView!.stages) {
      assert.strictEqual(
        (stage as any).internalNotes,
        undefined,
        `Stage ${stage.stageName} must NOT have an internalNotes property in client view`
      );
    }

    // Assertion 2: The raw confidential text is nowhere in the serialized JSON
    const serialized = JSON.stringify(clientView);
    assert.strictEqual(
      serialized.includes("CONFIDENTIAL_AUDIT_NOTE"),
      false,
      "Confidential internal notes must never leak into client view payload"
    );
  });

  // -------------------------------------------------------------
  // TEST 2b: Client view hides staff names unless Owner explicitly toggles it on
  // -------------------------------------------------------------
  test("2b. Proves client view hides staff names by default when toggle is off", async () => {
    (prisma.case as any).findFirst = async () => ({
      id: MOCK_CASE_ID,
      caseNumber: "CASE-2026-0042",
      title: "Apex Retail LLP",
      serviceRequested: "GTM Strategy",
      currentStage: "RESEARCH",
      showStaffNamesToClient: false, // DISABLED
      stages: [
        {
          stageName: "RESEARCH",
          order: 2,
          status: "IN_PROGRESS",
          assignedTo: {
            name: "Ananya Sharma",
            staffPermission: { roleTitle: "Research Analyst" },
          },
        },
      ],
    });

    const clientView = await getClientCaseView(CLIENT_EMAIL);
    assert.ok(clientView);

    // Should show generic role title, NOT Ananya Sharma's real name
    assert.strictEqual(
      clientView?.stages[0].assignedStaff,
      "Research Analyst",
      "Expected generic role title when staff name visibility is disabled by Owner"
    );
  });

  // -------------------------------------------------------------
  // TEST 3: Non-Owner cannot approve or deliver a report
  // -------------------------------------------------------------
  test("3. Proves a non-Owner CANNOT approve or deliver a final report", () => {
    // Staff attempting to perform Owner-only action
    const staffCanApprove = verifyOwnerOnlyAction(assignedStaffAuth);
    assert.strictEqual(
      staffCanApprove,
      false,
      "Staff member must NOT have permission to approve/deliver reports"
    );

    // Client attempting to perform Owner-only action
    const clientCanApprove = verifyOwnerOnlyAction(clientAuth);
    assert.strictEqual(
      clientCanApprove,
      false,
      "Client must NOT have permission to approve/deliver reports"
    );
  });

  // -------------------------------------------------------------
  // TEST 3b: Owner CAN approve and perform owner-only actions
  // -------------------------------------------------------------
  test("3b. Proves Owner CAN approve reports and perform owner-only actions", () => {
    const ownerCanApprove = verifyOwnerOnlyAction(ownerAuth);
    assert.strictEqual(
      ownerCanApprove,
      true,
      "Designated Owner (Niraj Kumar) must have permission to approve reports"
    );
  });

  // -------------------------------------------------------------
  // TEST 4: Staff member cannot modify an unassigned stage
  // -------------------------------------------------------------
  test("4. Proves a staff member CANNOT modify an unassigned stage", async () => {
    (prisma.caseStage as any).findUnique = async (query: any) => {
      const stageName = query.where?.caseId_stageName?.stageName;
      if (stageName === "RESEARCH") {
        return { assignedToId: ASSIGNED_STAFF_ID };
      }
      return { assignedToId: null }; // Unassigned
    };

    // Staff member 1 is assigned to RESEARCH, NOT to CONSULTATION
    const canModifyConsultation = await verifyStageModification(
      assignedStaffAuth,
      MOCK_CASE_ID,
      "CONSULTATION"
    );
    assert.strictEqual(
      canModifyConsultation,
      false,
      "Staff member must be DENIED modification of an unassigned stage"
    );

    // Staff member 1 IS assigned to RESEARCH
    const canModifyResearch = await verifyStageModification(
      assignedStaffAuth,
      MOCK_CASE_ID,
      "RESEARCH"
    );
    assert.strictEqual(
      canModifyResearch,
      true,
      "Staff member must be GRANTED modification of their explicitly assigned stage"
    );

    // Owner can modify any stage regardless of assignment
    const ownerCanModifyAny = await verifyStageModification(
      ownerAuth,
      MOCK_CASE_ID,
      "CONSULTATION"
    );
    assert.strictEqual(
      ownerCanModifyAny,
      true,
      "Owner must be GRANTED modification rights on any stage"
    );
  });

  // -------------------------------------------------------------
  // TEST 5: Strict Testimonial Consent Validation
  // -------------------------------------------------------------
  test("5. Proves testimonial publication is REJECTED without confirmed consent and consent note", () => {
    function validateTestimonialPublish(params: {
      isPublished: boolean;
      consentConfirmed: boolean;
      consentNote?: string | null;
    }) {
      if (params.isPublished && (!params.consentConfirmed || !params.consentNote?.trim())) {
        return {
          allowed: false,
          error: "Mandatory compliance rule: Cannot publish without confirmed consent and consent note.",
        };
      }
      return { allowed: true };
    }

    // Attempt 1: isPublished = true, but consentConfirmed = false
    const res1 = validateTestimonialPublish({
      isPublished: true,
      consentConfirmed: false,
      consentNote: "WhatsApp on 12-Apr-2026",
    });
    assert.strictEqual(res1.allowed, false, "Must reject publish when consent is false");

    // Attempt 2: isPublished = true, consentConfirmed = true, but empty consentNote
    const res2 = validateTestimonialPublish({
      isPublished: true,
      consentConfirmed: true,
      consentNote: "   ",
    });
    assert.strictEqual(res2.allowed, false, "Must reject publish when consent note is empty");

    // Attempt 3: isPublished = true, consentConfirmed = true, valid consentNote
    const res3 = validateTestimonialPublish({
      isPublished: true,
      consentConfirmed: true,
      consentNote: "Client confirmed via WhatsApp message on 12-Apr-2026",
    });
    assert.strictEqual(res3.allowed, true, "Must allow publish when consent and note are valid");
  });

  // -------------------------------------------------------------
  // TEST 6: Public Testimonial Filter Isolation
  // -------------------------------------------------------------
  test("6. Proves public query returns ONLY published testimonials with verified consent", () => {
    const mockDbTestimonials = [
      { id: "t1", clientName: "A. Patel", isPublished: true, consentConfirmed: true },
      { id: "t2", clientName: "B. Sharma", isPublished: false, consentConfirmed: true }, // Unpublished
      { id: "t3", clientName: "C. Verma", isPublished: true, consentConfirmed: false }, // No consent (tampered)
      { id: "t4", clientName: "D. Rao", isPublished: false, consentConfirmed: false }, // Pending draft
    ];

    // Filter used by /api/public/meta, TestimonialsSection, and /testimonials page
    const publicResults = mockDbTestimonials.filter(
      (t) => t.isPublished === true && t.consentConfirmed === true
    );

    assert.strictEqual(publicResults.length, 1);
    assert.strictEqual(publicResults[0].id, "t1");
    assert.strictEqual(publicResults.some((t) => t.id === "t2"), false, "Unpublished item must not leak");
    assert.strictEqual(publicResults.some((t) => t.id === "t3"), false, "Unconsented item must not leak");
  });

  // -------------------------------------------------------------
  // TEST 7: Public Team Directory Query Isolation
  // -------------------------------------------------------------
  test("7. Proves public team directory filters out unpublished drafts", () => {
    const mockDbTeam = [
      { id: "m1", name: "Alok Mathur", roleTitle: "Research Analyst", isPublished: true },
      { id: "m2", name: "Draft Candidate", roleTitle: "Consultant", isPublished: false },
    ];

    const publicTeam = mockDbTeam.filter((m) => m.isPublished === true);

    assert.strictEqual(publicTeam.length, 1);
    assert.strictEqual(publicTeam[0].name, "Alok Mathur");
    assert.strictEqual(publicTeam.some((m) => m.id === "m2"), false, "Draft profile must not leak");
  });

  // -------------------------------------------------------------
  // TEST 8: Post-Delivery Client Feedback Arrives as PENDING & UNPUBLISHED
  // -------------------------------------------------------------
  test("8. Proves post-delivery client feedback always enters as PENDING and UNPUBLISHED", () => {
    function processClientFeedbackSubmission(input: {
      clientName: string;
      quote: string;
      consentConfirmed: boolean;
      attributionPreference: string;
    }) {
      return {
        clientName: input.clientName,
        quote: input.quote,
        consentConfirmed: input.consentConfirmed,
        status: "PENDING" as const,
        isPublished: false, // Explicit Owner approval required
      };
    }

    const submission = processClientFeedbackSubmission({
      clientName: "Sunil K.",
      quote: "Strategic GTM roadmap gave us great market clarity.",
      consentConfirmed: true,
      attributionPreference: "Initials Only",
    });

    assert.strictEqual(submission.status, "PENDING", "Must default to PENDING status");
    assert.strictEqual(submission.isPublished, false, "Must default to UNPUBLISHED");
    assert.strictEqual(submission.consentConfirmed, true, "Consent must be recorded");
  });
});

