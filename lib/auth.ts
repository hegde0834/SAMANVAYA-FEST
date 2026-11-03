import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "samanvaya_admin_session";

export function getAdminSecret(): string {
  return process.env.ADMIN_SECRET || "samanvaya2026admin";
}

/**
 * Checks if the request has valid admin credentials via cookie or Authorization header
 */
export async function isAuthenticatedAdmin(authHeader?: string | null): Promise<boolean> {
  const secret = getAdminSecret();

  // Check Bearer token from header
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7);
    if (token === secret) return true;
  }

  // Check cookie in server components / route handlers
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME);
    if (sessionCookie && sessionCookie.value === secret) {
      return true;
    }
  } catch {
    // cookies() not available in some contexts
  }

  return false;
}

export { ADMIN_COOKIE_NAME };
