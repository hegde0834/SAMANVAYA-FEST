import { NextRequest, NextResponse } from "next/server";
import { getAdminSecret, ADMIN_COOKIE_NAME } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const secret = getAdminSecret();

    if (!password || password !== secret) {
      return NextResponse.json(
        { success: false, error: "Invalid organizer access key." },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Authentication successful.",
      token: secret,
    });

    // Set HTTP-only session cookie (expires when browser session ends)
    response.cookies.set(ADMIN_COOKIE_NAME, secret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Authentication failed." },
      { status: 500 }
    );
  }
}
