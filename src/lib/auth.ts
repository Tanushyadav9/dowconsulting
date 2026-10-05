import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

/**
 * Checks if the given email corresponds to the Owner.
 * STRICT ENFORCEMENT: process.env.OWNER_EMAIL is read directly with ZERO hardcoded fallback emails.
 */
export function isOwnerEmail(email?: string | null): boolean {
  if (!email) return false;
  const ownerEmail = process.env.OWNER_EMAIL?.trim().toLowerCase();
  if (!ownerEmail) {
    // If OWNER_EMAIL is not set in environment, fail securely - NEVER fall back to a hardcoded string
    console.warn("SECURITY WARNING: OWNER_EMAIL environment variable is not configured.");
    return false;
  }
  return email.trim().toLowerCase() === ownerEmail;
}

/**
 * Retrieves the current authenticated user's email, owner status, and staff permissions.
 */
export async function getAuthContext() {
  try {
    const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
    if (!clerkKey || !clerkKey.startsWith("pk_") || clerkKey.includes("placeholder")) {
      return {
        isAuthenticated: false,
        user: null,
        isOwner: false,
        permissions: null,
      };
    }

    const clerkUser = await currentUser();
    if (!clerkUser) {
      return {
        isAuthenticated: false,
        user: null,
        isOwner: false,
        permissions: null,
      };
    }

    const primaryEmail =
      clerkUser.emailAddresses?.find((e) => e.id === clerkUser.primaryEmailAddressId)?.emailAddress ||
      clerkUser.emailAddresses?.[0]?.emailAddress;

    const isOwner = isOwnerEmail(primaryEmail);

    // If owner, grant all permissions inherently
    if (isOwner) {
      return {
        isAuthenticated: true,
        user: clerkUser,
        email: primaryEmail,
        isOwner: true,
        permissions: {
          canManageSubmissions: true,
          canManageQuotes: true,
          canManageBookings: true,
          canManageReports: true,
          canManageTeam: true,
          role: "OWNER",
        },
      };
    }

    // Otherwise check StaffPermission table in database
    if (primaryEmail) {
      try {
        const staff = await prisma.user.findUnique({
          where: { email: primaryEmail.toLowerCase() },
          include: { staffPermission: true },
        });

        if (staff?.staffPermission) {
          return {
            isAuthenticated: true,
            user: clerkUser,
            email: primaryEmail,
            isOwner: false,
            permissions: staff.staffPermission,
          };
        }
      } catch (err) {
        console.error("Error looking up staff permissions:", err);
      }
    }

    return {
      isAuthenticated: true,
      user: clerkUser,
      email: primaryEmail,
      isOwner: false,
      permissions: null,
    };
  } catch (error) {
    console.error("Auth context error:", error);
    return {
      isAuthenticated: false,
      user: null,
      isOwner: false,
      permissions: null,
    };
  }
}
