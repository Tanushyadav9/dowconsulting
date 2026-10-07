import { currentUser } from "@clerk/nextjs/server";
import { requireEnv } from "@/lib/env";
import { prisma } from "@/lib/prisma";

/**
 * Checks if the given email corresponds to the Owner.
 * STRICT ENFORCEMENT: process.env.OWNER_EMAIL is read ONLY from the environment.
 * Zero fallback strings and zero default lists; unset means no one is Owner.
 */
export function isOwnerEmail(email?: string | null): boolean {
  if (!email) return false;
  const ownerEnv = process.env.OWNER_EMAIL?.trim();
  if (!ownerEnv || ownerEnv === "" || ownerEnv.toLowerCase().includes("placeholder") || ownerEnv.toLowerCase().includes("example.com")) {
    return false;
  }
  return email.trim().toLowerCase() === ownerEnv.toLowerCase();
}

export interface AuthContext {
  isAuthenticated: boolean;
  user: any | null;
  dbUserId?: string;
  email?: string;
  isOwner: boolean;
  permissions: {
    canManageSubmissions: boolean;
    canManageQuotes: boolean;
    canManageBookings: boolean;
    canManageReports: boolean;
    canManageTeam: boolean;
    role: "OWNER" | "ADMIN" | "STAFF";
    roleTitle?: string;
  } | null;
}

/**
 * Retrieves the current authenticated user's email, owner status, database user ID, and staff permissions.
 */
export async function getAuthContext(): Promise<AuthContext> {
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

    let dbUser: any = null;
    if (primaryEmail) {
      try {
        dbUser = await prisma.user.findUnique({
          where: { email: primaryEmail.toLowerCase() },
          include: { staffPermission: true },
        });

        if (!dbUser && isOwner) {
          dbUser = await prisma.user.create({
            data: {
              clerkId: clerkUser.id,
              email: primaryEmail.toLowerCase(),
              name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || "Niraj Kumar",
            },
            include: { staffPermission: true },
          });
        }
      } catch (dbErr) {
        console.warn("DB user lookup in getAuthContext:", dbErr);
      }
    }

    // If owner, grant all permissions inherently
    if (isOwner) {
      return {
        isAuthenticated: true,
        user: clerkUser,
        dbUserId: dbUser?.id,
        email: primaryEmail,
        isOwner: true,
        permissions: {
          canManageSubmissions: true,
          canManageQuotes: true,
          canManageBookings: true,
          canManageReports: true,
          canManageTeam: true,
          role: "OWNER",
          roleTitle: "Lead Strategic Advisor / Owner",
        },
      };
    }

    // Otherwise check StaffPermission table in database
    if (dbUser?.staffPermission) {
      return {
        isAuthenticated: true,
        user: clerkUser,
        dbUserId: dbUser.id,
        email: primaryEmail,
        isOwner: false,
        permissions: dbUser.staffPermission,
      };
    }

    return {
      isAuthenticated: true,
      user: clerkUser,
      dbUserId: dbUser?.id,
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
