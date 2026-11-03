import { z } from "zod";

// Indian 10-digit phone number regex (allowing optional +91 or 0 prefix)
const indianPhoneRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;

export function normalizePhoneNumber(phone: string): string {
  // Remove non-digits
  const digits = phone.replace(/\D/g, "");
  // If starts with 91 and has 12 digits, return last 10 digits
  if (digits.length === 12 && digits.startsWith("91")) {
    return digits.slice(2);
  }
  // If starts with 0 and has 11 digits
  if (digits.length === 11 && digits.startsWith("0")) {
    return digits.slice(1);
  }
  return digits;
}

export function validateCollegeEmailDomain(email: string, allowedDomainsString?: string): boolean {
  if (!allowedDomainsString || allowedDomainsString.trim() === "") {
    return true; // No domain restriction configured
  }
  const domains = allowedDomainsString
    .split(",")
    .map((d) => d.trim().toLowerCase())
    .filter(Boolean);
  
  if (domains.length === 0) return true;

  const emailDomain = email.split("@")[1]?.toLowerCase();
  return domains.some((d) => emailDomain === d || emailDomain?.endsWith("." + d));
}

// Single member schema: full name, phone number, college email
// Strictly NO department field here! All members share team-level departmentName.
export const memberSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(60, "Full name cannot exceed 60 characters"),
  phoneNumber: z
    .string()
    .trim()
    .regex(indianPhoneRegex, "Enter a valid 10-digit mobile number (e.g. 9876543210)"),
  collegeEmail: z
    .string()
    .trim()
    .toLowerCase()
    .email("Enter a valid college email address"),
});

export type MemberFormData = z.infer<typeof memberSchema>;

// Registration form schema with single shared department field
export const registrationSchema = z
  .object({
    teamName: z
      .string()
      .trim()
      .min(2, "Team name must be at least 2 characters")
      .max(60, "Team name cannot exceed 60 characters"),
    eventSlug: z.enum(
      ["reel-campus", "prompting-the-image", "treasure-hunt", "kairos"],
      {
        errorMap: () => ({ message: "Please select a valid event" }),
      }
    ),
    // Requirement A: Exactly ONE common Department field for the entire team!
    departmentName: z
      .string()
      .trim()
      .min(2, "Department name must be at least 2 characters")
      .max(80, "Department name cannot exceed 80 characters"),
    members: z
      .array(memberSchema)
      .min(2, "At least 2 team members required")
      .max(4, "Maximum 4 members allowed"),
  })
  .superRefine((data, ctx) => {
    // Dynamic team size check
    const requiredSize = data.eventSlug === "treasure-hunt" ? 4 : 2;
    if (data.members.length !== requiredSize) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["members"],
        message: `${
          data.eventSlug === "treasure-hunt" ? "Treasure Hunt" : "This event"
        } requires exactly ${requiredSize} members. You provided ${data.members.length}.`,
      });
    }

    // Uniqueness checks within team
    const emails = new Set<string>();
    const phones = new Set<string>();

    data.members.forEach((member, index) => {
      const normEmail = member.collegeEmail.toLowerCase();
      const normPhone = normalizePhoneNumber(member.phoneNumber);

      if (emails.has(normEmail)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["members", index, "collegeEmail"],
          message: "Each team member must have a distinct college email address",
        });
      } else {
        emails.add(normEmail);
      }

      if (phones.has(normPhone)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["members", index, "phoneNumber"],
          message: "Each team member must have a distinct phone number",
        });
      } else {
        phones.add(normPhone);
      }
    });
  });

export type RegistrationFormData = z.infer<typeof registrationSchema>;
