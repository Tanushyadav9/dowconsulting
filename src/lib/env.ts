/**
 * Fail-Closed Environment Variable Manager
 * Enforces strict presence of critical production secrets with zero hardcoded fallbacks.
 */

export function requireEnv(name: string, description?: string): string {
  const value = process.env[name];
  if (!value || value.trim() === "" || value.includes("placeholder") || value.includes("example") || value.endsWith("...")) {
    const msg = `[CRITICAL CONFIG ERROR] Required environment variable "${name}" is missing or unconfigured.${
      description ? ` Purpose: ${description}` : ""
    } System operates in fail-closed mode: zero fallback values are permitted.`;
    throw new Error(msg);
  }
  return value.trim();
}

/**
 * Returns canonical site URL with fallback to VERCEL_URL and production domain
 */
export function getAppUrl(): string {
  const url = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (url && !url.includes("placeholder") && !url.includes("example")) {
    return url.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "https://dowconsulting-r756.vercel.app";
}

/**
 * Returns official contact email with safe production fallback
 */
export function getContactEmail(): string {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
  if (email && !email.includes("placeholder") && !email.includes("example")) {
    return email;
  }
  return "advisory@dowconsulting.in";
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
