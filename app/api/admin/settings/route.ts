import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { FEST_EVENTS } from "@/lib/events";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  const isAuth = await isAuthenticatedAdmin(authHeader);

  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    let settings = await prisma.eventSetting.findMany();

    // Initialize defaults for all events if not already present
    if (settings.length < FEST_EVENTS.length) {
      for (const ev of FEST_EVENTS) {
        const existing = settings.find((s) => s.eventSlug === ev.slug);
        if (!existing) {
          await prisma.eventSetting.create({
            data: {
              eventSlug: ev.slug,
              eventName: ev.name,
              isOpen: true,
              maxTeams: ev.slug === "prompting-the-image" ? 10 : 50,
              dateText: ev.date,
              venueText: ev.venue,
            },
          });
        }
      }
      settings = await prisma.eventSetting.findMany();
    }

    return NextResponse.json({ settings });
  } catch (error) {
    return NextResponse.json({ error: "Failed to load settings" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  const isAuth = await isAuthenticatedAdmin(authHeader);

  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { eventSlug, isOpen, maxTeams, dateText, venueText } = await req.json();

    if (!eventSlug) {
      return NextResponse.json({ error: "eventSlug is required" }, { status: 400 });
    }

    const updated = await prisma.eventSetting.upsert({
      where: { eventSlug },
      update: {
        ...(typeof isOpen === "boolean" ? { isOpen } : {}),
        ...(typeof maxTeams === "number" ? { maxTeams } : {}),
        ...(dateText ? { dateText } : {}),
        ...(venueText ? { venueText } : {}),
      },
      create: {
        eventSlug,
        eventName: FEST_EVENTS.find((e) => e.slug === eventSlug)?.name || eventSlug,
        isOpen: isOpen ?? true,
        maxTeams: maxTeams ?? 50,
        dateText: dateText ?? "To Be Announced",
        venueText: venueText ?? "NIE North Campus, Mysuru",
      },
    });

    return NextResponse.json({ success: true, setting: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update settings" }, { status: 500 });
  }
}
