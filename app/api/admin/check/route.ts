import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  const authenticated = await isAuthenticatedAdmin(authHeader);

  return NextResponse.json({ authenticated });
}
