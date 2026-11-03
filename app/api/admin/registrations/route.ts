import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  const isAuth = await isAuthenticatedAdmin(authHeader);

  if (!isAuth) {
    return NextResponse.json(
      { error: "Unauthorized. Please log in as an administrator." },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search")?.trim() || "";
  const eventSlug = searchParams.get("event") || "all";
  const status = searchParams.get("status") || "all";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "20", 10);
  const skip = (page - 1) * limit;

  // Build filter conditions
  const where: any = {};

  if (eventSlug !== "all") {
    where.eventSlug = eventSlug;
  }

  if (status !== "all") {
    where.status = status;
  }

  if (search) {
    where.OR = [
      { registrationId: { contains: search } },
      { teamName: { contains: search } },
      { departmentName: { contains: search } },
      {
        members: {
          some: {
            fullName: { contains: search },
          },
        },
      },
    ];
  }

  try {
    const [registrations, totalCount, statsByEvent] = await Promise.all([
      prisma.registration.findMany({
        where,
        include: {
          members: {
            orderBy: { memberIndex: "asc" },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.registration.count({ where }),
      prisma.registration.groupBy({
        by: ["eventSlug"],
        _count: { _all: true },
      }),
    ]);

    const totalAll = await prisma.registration.count();

    return NextResponse.json({
      registrations,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit) || 1,
      },
      stats: {
        total: totalAll,
        byEvent: statsByEvent.reduce((acc, curr) => {
          acc[curr.eventSlug] = curr._count._all;
          return acc;
        }, {} as Record<string, number>),
      },
    });
  } catch (error) {
    console.error("Admin registrations fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch registrations." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  const isAuth = await isAuthenticatedAdmin(authHeader);

  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { registrationId, status } = await req.json();

    if (!registrationId || !status) {
      return NextResponse.json(
        { error: "Registration ID and status are required." },
        { status: 400 }
      );
    }

    const updated = await prisma.registration.update({
      where: { registrationId },
      data: { status },
      include: { members: true },
    });

    return NextResponse.json({ success: true, registration: updated });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update registration status." },
      { status: 500 }
    );
  }
}
