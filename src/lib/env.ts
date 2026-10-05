/**
 * Fail-Closed Environment Variable Manager
 * Enforces strict presence of critical production secrets with zero hardcoded fallbacks.
 */

export function requireEnv(name: string, description?: string): string {
  const value = process.env[name];
  if (!value || value.trim() === "" || value.includes("placeholder") || value.includes("example")) {
    const msg = `[CRITICAL CONFIG ERROR] Required environment variable "${name}" is missing or unconfigured.${
      description ? ` Purpose: ${description}` : ""
    } System operates in fail-closed mode: zero fallback values are permitted.`;
    
    // In production, always throw hard
    if (process.env.NODE_ENV === "production") {
      throw new Error(msg);
    }
    console.error(msg);
    return "";
  }
  return value.trim();
}

/**
 * Returns true only if explicitly in local development with DEV_MOCKS enabled.
 * This environment flag NEVER exists in the production Vercel environment.
 */
export function isDevMockAllowed(): boolean {
  return (
    process.env.NODE_ENV !== "production" &&
    process.env.ENABLE_DEV_MOCKS === "true"
  );
}

/**
 * Validates critical environment invariants at startup
 */
export function validateEnvironmentInvariants() {
  const isProd = process.env.NODE_ENV === "production";
  if (!isProd) return;

  const requiredInProd = [
    { key: "DATABASE_URL", desc: "Neon PostgreSQL pooled connection" },
    { key: "DIRECT_URL", desc: "Neon PostgreSQL direct migration connection" },
    { key: "OWNER_EMAIL", desc: "Strict Owner authorization check" },
    { key: "CLERK_SECRET_KEY", desc: "Clerk backend authentication" },
    { key: "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY", desc: "Clerk frontend integration" },
    { key: "CLERK_WEBHOOK_SECRET", desc: "Svix webhook signature verification" },
    { key: "RESEND_API_KEY", desc: "Transactional email delivery" },
  ];

  for (const { key, desc } of requiredInProd) {
    requireEnv(key, desc);
  }
}
