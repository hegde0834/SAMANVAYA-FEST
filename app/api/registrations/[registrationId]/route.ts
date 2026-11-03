import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { registrationId: string } }
) {
  try {
    const { registrationId } = params;
    if (!registrationId) {
      return NextResponse.json({ error: "Registration ID is required" }, { status: 400 });
    }

    const reg = await prisma.registration.findUnique({
      where: { registrationId },
      select: {
        registrationId: true,
        teamName: true,
        eventSlug: true,
        eventName: true,
        departmentName: true, // Shared department
        status: true,
        createdAt: true,
        // STRICT PRIVACY: Only return member names and indices, NEVER phone numbers or emails
        members: {
          select: {
            fullName: true,
            memberIndex: true,
          },
          orderBy: { memberIndex: "asc" },
        },
      },
    });

    if (!reg) {
      return NextResponse.json(
        { error: "Registration record not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ registration: reg });
  } catch (error) {
    console.error("Fetch confirmation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
