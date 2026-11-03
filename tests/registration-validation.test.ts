import { describe, it, expect } from "vitest";
import {
  registrationSchema,
  normalizePhoneNumber,
  validateCollegeEmailDomain,
} from "../lib/validations";

describe("Registration Validation & Shared Department Field", () => {
  const validTwoMemberTeam = {
    teamName: "Code Warriors",
    eventSlug: "reel-campus" as const,
    departmentName: "Master of Computer Applications",
    members: [
      {
        fullName: "Aarav Sharma",
        phoneNumber: "9876543210",
        collegeEmail: "aarav@nie.ac.in",
      },
      {
        fullName: "Ananya Rao",
        phoneNumber: "9876543211",
        collegeEmail: "ananya@nie.ac.in",
      },
    ],
  };

  it("Requirement A: Validates registration with exactly ONE shared department for the team", () => {
    const result = registrationSchema.safeParse(validTwoMemberTeam);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.departmentName).toBe("Master of Computer Applications");
      // Verify members do not have department fields
      expect((result.data.members[0] as any).departmentName).toBeUndefined();
      expect((result.data.members[1] as any).departmentName).toBeUndefined();
    }
  });

  it("Rejects missing department name", () => {
    const invalid = { ...validTwoMemberTeam, departmentName: "" };
    const result = registrationSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it("Enforces dynamic team size: Reel Campus requires exactly 2 members", () => {
    const withOneMember = {
      ...validTwoMemberTeam,
      eventSlug: "reel-campus" as const,
      members: [validTwoMemberTeam.members[0]],
    };
    const result = registrationSchema.safeParse(withOneMember);
    expect(result.success).toBe(false);
  });

  it("Enforces dynamic team size: Treasure Hunt requires exactly 4 members", () => {
    // 2 members for Treasure Hunt should fail
    const twoMembersTreasureHunt = {
      ...validTwoMemberTeam,
      eventSlug: "treasure-hunt" as const,
    };
    const failResult = registrationSchema.safeParse(twoMembersTreasureHunt);
    expect(failResult.success).toBe(false);

    // 4 members for Treasure Hunt should succeed
    const fourMembersTreasureHunt = {
      ...validTwoMemberTeam,
      eventSlug: "treasure-hunt" as const,
      members: [
        { fullName: "Member 1", phoneNumber: "9876543210", collegeEmail: "m1@nie.ac.in" },
        { fullName: "Member 2", phoneNumber: "9876543211", collegeEmail: "m2@nie.ac.in" },
        { fullName: "Member 3", phoneNumber: "9876543212", collegeEmail: "m3@nie.ac.in" },
        { fullName: "Member 4", phoneNumber: "9876543213", collegeEmail: "m4@nie.ac.in" },
      ],
    };
    const successResult = registrationSchema.safeParse(fourMembersTreasureHunt);
    expect(successResult.success).toBe(true);
  });

  it("Rejects invalid Indian phone numbers", () => {
    const invalidPhone = {
      ...validTwoMemberTeam,
      members: [
        { ...validTwoMemberTeam.members[0], phoneNumber: "12345" }, // Too short
        validTwoMemberTeam.members[1],
      ],
    };
    const result = registrationSchema.safeParse(invalidPhone);
    expect(result.success).toBe(false);
  });

  it("Normalizes Indian phone numbers correctly", () => {
    expect(normalizePhoneNumber("+91 9876543210")).toBe("9876543210");
    expect(normalizePhoneNumber("09876543210")).toBe("9876543210");
    expect(normalizePhoneNumber("9876543210")).toBe("9876543210");
  });

  it("Rejects invalid college email syntax", () => {
    const invalidEmail = {
      ...validTwoMemberTeam,
      members: [
        { ...validTwoMemberTeam.members[0], collegeEmail: "not-an-email" },
        validTwoMemberTeam.members[1],
      ],
    };
    const result = registrationSchema.safeParse(invalidEmail);
    expect(result.success).toBe(false);
  });

  it("Enforces distinct email and phone numbers among team members", () => {
    const duplicateEmail = {
      ...validTwoMemberTeam,
      members: [
        { ...validTwoMemberTeam.members[0], collegeEmail: "same@nie.ac.in" },
        { ...validTwoMemberTeam.members[1], collegeEmail: "same@nie.ac.in" },
      ],
    };
    const result = registrationSchema.safeParse(duplicateEmail);
    expect(result.success).toBe(false);
  });

  it("Validates college email domain when configured", () => {
    expect(validateCollegeEmailDomain("student@nie.ac.in", "nie.ac.in,nieit.ac.in")).toBe(true);
    expect(validateCollegeEmailDomain("student@gmail.com", "nie.ac.in,nieit.ac.in")).toBe(false);
    expect(validateCollegeEmailDomain("student@anywhere.com", "")).toBe(true);
  });
});
