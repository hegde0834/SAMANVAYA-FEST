import crypto from "crypto";
import { prisma } from "./prisma";
import { RegistrationFormData, normalizePhoneNumber } from "./validations";
import { FEST_EVENTS, getEventBySlug } from "./events";
import { syncLocalExcelExport } from "./excel-export";

/**
 * Generates a collision-resistant unique registration ID
 * Format: SAM2-2026-XXXXXXXX (e.g. SAM2-2026-A8F3K9Q2)
 */
export function generateRegistrationId(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Removed ambiguous 0, O, 1, I
  const randomBytes = crypto.randomBytes(8);
  let suffix = "";
  for (let i = 0; i < 8; i++) {
    suffix += chars[randomBytes[i] % chars.length];
  }
  return `SAM2-2026-${suffix}`;
}

export interface RegisterResult {
  success: boolean;
  registrationId?: string;
  error?: string;
}

/**
 * Registers a team in the database within a transaction and synchronizes the Excel workbook.
 * Strictly adheres to Requirement A: departmentName is stored once per team.
 */
export async function registerTeam(data: RegistrationFormData): Promise<RegisterResult> {
  const event = getEventBySlug(data.eventSlug);
  if (!event) {
    return { success: false, error: "Selected event not found." };
  }

  // Check event settings if present in database
  const eventSetting = await prisma.eventSetting.findUnique({
    where: { eventSlug: data.eventSlug },
  });

  if (eventSetting && !eventSetting.isOpen) {
    return {
      success: false,
      error: `Registrations for ${event.name} are currently closed.`,
    };
  }

  // Check team count limit
  const currentCount = await prisma.registration.count({
    where: {
      eventSlug: data.eventSlug,
      status: { not: "CANCELLED" },
    },
  });

  const maxTeams = eventSetting?.maxTeams ?? (data.eventSlug === "prompting-the-image" ? 10 : 50);
  if (currentCount >= maxTeams) {
    return {
      success: false,
      error: `Registrations for ${event.name} have reached the maximum limit (${maxTeams} teams).`,
    };
  }

  // Check if team name already exists for this event
  const existingTeam = await prisma.registration.findFirst({
    where: {
      eventSlug: data.eventSlug,
      teamName: {
        equals: data.teamName,
      },
      status: { not: "CANCELLED" },
    },
  });

  if (existingTeam) {
    return {
      success: false,
      error: `A team named "${data.teamName}" is already registered for ${event.name}. Please choose a unique team name.`,
    };
  }

  // Generate unique collision-resistant ID with database verification
  let uniqueId = generateRegistrationId();
  let attempts = 0;
  while (attempts < 5) {
    const exists = await prisma.registration.findUnique({
      where: { registrationId: uniqueId },
    });
    if (!exists) break;
    uniqueId = generateRegistrationId();
    attempts++;
  }

  try {
    // Database Transaction: Source of truth
    const createdRegistration = await prisma.$transaction(async (tx) => {
      const reg = await tx.registration.create({
        data: {
          registrationId: uniqueId,
          teamName: data.teamName.trim(),
          eventSlug: data.eventSlug,
          eventName: event.name,
          // Requirement A: Single shared department field for the entire team
          departmentName: data.departmentName.trim(),
          status: "CONFIRMED",
          members: {
            create: data.members.map((m, idx) => ({
              fullName: m.fullName.trim(),
              phoneNumber: normalizePhoneNumber(m.phoneNumber),
              collegeEmail: m.collegeEmail.trim().toLowerCase(),
              memberIndex: idx + 1,
              // Notice: TeamMember does NOT have department field!
            })),
          },
        },
        include: {
          members: true,
        },
      });
      return reg;
    });

    // Asynchronously update local Excel export file without blocking response
    // An Excel generation failure does NOT erase or rollback the successful registration!
    (async () => {
      try {
        const allRegistrations = await prisma.registration.findMany({
          orderBy: { createdAt: "desc" },
          include: { members: { orderBy: { memberIndex: "asc" } } },
        });
        await syncLocalExcelExport(allRegistrations);
      } catch (excelErr) {
        console.error("Non-fatal: Background Excel sync error:", excelErr);
      }
    })();

    return {
      success: true,
      registrationId: createdRegistration.registrationId,
    };
  } catch (err: any) {
    console.error("Database registration error:", err);
    return {
      success: false,
      error: err.message || "Failed to commit registration to database.",
    };
  }
}
