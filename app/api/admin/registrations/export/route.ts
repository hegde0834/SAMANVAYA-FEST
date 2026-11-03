import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { buildRegistrationsWorkbook } from "@/lib/excel-export";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  const isAuth = await isAuthenticatedAdmin(authHeader);

  if (!isAuth) {
    return NextResponse.json(
      { error: "Unauthorized. Excel export is restricted to authenticated festival administrators." },
      { status: 401 }
    );
  }

  try {
    // Database is the source of truth
    const registrations = await prisma.registration.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        members: {
          orderBy: { memberIndex: "asc" },
        },
      },
    });

    // Build the workbook according to the strict specification
    const workbook = buildRegistrationsWorkbook(registrations);
    const buffer = await workbook.xlsx.writeBuffer();

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
    const filename = `SAMANVAYA_2_0_Registrations_${timestamp}.xlsx`;

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("Admin Excel export error:", error);
    return NextResponse.json(
      { error: "Failed to generate Excel export workbook." },
      { status: 500 }
    );
  }
}
