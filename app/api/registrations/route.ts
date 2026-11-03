import { NextRequest, NextResponse } from "next/server";
import { registrationSchema, validateCollegeEmailDomain } from "@/lib/validations";
import { registerTeam } from "@/lib/registration";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Zod Validation (dynamic team sizes, single shared department)
    const parseResult = registrationSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed. Please review your input.",
          details: parseResult.error.flatten(),
        },
        { status: 400 }
      );
    }

    const validData = parseResult.data;

    // 2. Check college email domain restriction if configured
    const allowedDomains = process.env.COLLEGE_EMAIL_DOMAINS;
    for (const member of validData.members) {
      if (!validateCollegeEmailDomain(member.collegeEmail, allowedDomains)) {
        return NextResponse.json(
          {
            success: false,
            error: `Email ${member.collegeEmail} does not match the approved college domain (${allowedDomains}).`,
          },
          { status: 400 }
        );
      }
    }

    // 3. Register team in database transaction & sync Excel
    const result = await registerTeam(validData);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        registrationId: result.registrationId,
        message: "Team registration completed successfully!",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("API registration error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected server error occurred during registration.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Return registration counts per event without exposing any private data
    const counts = await prisma.registration.groupBy({
      by: ["eventSlug"],
      where: { status: { not: "CANCELLED" } },
      _count: { _all: true },
    });

    const settings = await prisma.eventSetting.findMany();

    return NextResponse.json({
      counts: counts.map((c) => ({
        eventSlug: c.eventSlug,
        count: c._count._all,
      })),
      settings,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch event statistics" }, { status: 500 });
  }
}
