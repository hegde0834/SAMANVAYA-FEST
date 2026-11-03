import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { generateRegistrationId, registerTeam } from "../lib/registration";
import { prisma } from "../lib/prisma";

describe("Database Persistence & Unique Registration IDs", () => {
  beforeAll(async () => {
    // Clean up test registrations
    await prisma.registration.deleteMany({
      where: { teamName: { startsWith: "Vitest" } },
    });
  });

  afterAll(async () => {
    await prisma.registration.deleteMany({
      where: { teamName: { startsWith: "Vitest" } },
    });
    await prisma.$disconnect();
  });

  it("Generates server-side unique ID with required prefix SAM2-2026-", () => {
    const id = generateRegistrationId();
    expect(id).toMatch(/^SAM2-2026-[A-Z0-9]{8}$/);
  });

  it("Ensures collision-resistance across 500 generated IDs", () => {
    const ids = new Set<string>();
    for (let i = 0; i < 500; i++) {
      const id = generateRegistrationId();
      expect(ids.has(id)).toBe(false);
      ids.add(id);
    }
    expect(ids.size).toBe(500);
  });

  it("Requirement A: Persists registration with single shared department and related members in database", async () => {
    const testData = {
      teamName: "Vitest Cyber Titans",
      eventSlug: "kairos" as const,
      departmentName: "Department of Computer Science & Engineering",
      members: [
        {
          fullName: "Test Member 1",
          phoneNumber: "9876543210",
          collegeEmail: "test1@nie.ac.in",
        },
        {
          fullName: "Test Member 2",
          phoneNumber: "9876543211",
          collegeEmail: "test2@nie.ac.in",
        },
      ],
    };

    const result = await registerTeam(testData);
    expect(result.success).toBe(true);
    expect(result.registrationId).toBeDefined();

    // Query database to verify persistence
    const saved = await prisma.registration.findUnique({
      where: { registrationId: result.registrationId! },
      include: { members: true },
    });

    expect(saved).toBeDefined();
    expect(saved?.teamName).toBe("Vitest Cyber Titans");
    expect(saved?.departmentName).toBe("Department of Computer Science & Engineering");
    expect(saved?.members.length).toBe(2);

    // Verify members do not have a department property in database
    saved?.members.forEach((member) => {
      expect((member as any).departmentName).toBeUndefined();
      expect((member as any).department).toBeUndefined();
    });
  });

  it("Prevents duplicate team registration for the same event", async () => {
    const duplicateData = {
      teamName: "Vitest Cyber Titans", // Same name as previous test
      eventSlug: "kairos" as const,
      departmentName: "Different Department",
      members: [
        { fullName: "Another 1", phoneNumber: "9876543220", collegeEmail: "a1@nie.ac.in" },
        { fullName: "Another 2", phoneNumber: "9876543221", collegeEmail: "a2@nie.ac.in" },
      ],
    };

    const duplicateResult = await registerTeam(duplicateData);
    expect(duplicateResult.success).toBe(false);
    expect(duplicateResult.error).toContain("already registered");
  });
});
