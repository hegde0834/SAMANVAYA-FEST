import { describe, it, expect } from "vitest";
import {
  buildRegistrationsWorkbook,
  sanitizeExcelValue,
  ExportableRegistration,
} from "../lib/excel-export";

describe("Excel Export & Department Architecture", () => {
  it("Protects against Excel formula injection (CSV/Excel DDE attacks)", () => {
    expect(sanitizeExcelValue("=SUM(A1:A10)")).toBe("'=SUM(A1:A10)");
    expect(sanitizeExcelValue("+cmd|' /C calc'!A0")).toBe("'+cmd|' /C calc'!A0");
    expect(sanitizeExcelValue("-2+3")).toBe("'-2+3");
    expect(sanitizeExcelValue("@dangerous")).toBe("'@dangerous");
    expect(sanitizeExcelValue("Normal Department")).toBe("Normal Department");
  });

  it("Requirement A & Section 17: Excel worksheet contains exactly ONE Department Name column", () => {
    const mockRegistrations: ExportableRegistration[] = [
      {
        registrationId: "SAM2-2026-TEST0001",
        createdAt: new Date().toISOString(),
        teamName: "Test Team Alpha",
        eventName: "REEL CAMPUS",
        departmentName: "Master of Computer Applications",
        status: "CONFIRMED",
        members: [
          {
            fullName: "Member One",
            phoneNumber: "9876543210",
            collegeEmail: "m1@nie.ac.in",
            memberIndex: 1,
          },
          {
            fullName: "Member Two",
            phoneNumber: "9876543211",
            collegeEmail: "m2@nie.ac.in",
            memberIndex: 2,
          },
        ],
      },
    ];

    const workbook = buildRegistrationsWorkbook(mockRegistrations);
    const worksheet = workbook.getWorksheet("Registrations");

    expect(worksheet).toBeDefined();

    // Verify exactly 18 columns
    const columns = worksheet!.columns;
    expect(columns?.length).toBe(18);

    const headers = worksheet!.getRow(1).values as string[];

    // Check that Department Name appears in the headers
    const deptColumns = headers.filter(
      (header) => typeof header === "string" && header.toLowerCase().includes("department")
    );

    // STRICT TEST: Exactly ONE department column exists
    expect(deptColumns.length).toBe(1);
    expect(deptColumns[0]).toBe("Department Name");

    // STRICT TEST: Ensure individual member department columns DO NOT exist
    expect(headers).not.toContain("Member 1 Department");
    expect(headers).not.toContain("Member 2 Department");
    expect(headers).not.toContain("Member 3 Department");
    expect(headers).not.toContain("Member 4 Department");
  });

  it("Leaves member 3 and 4 cells blank for 2-member teams", () => {
    const mockRegistrations: ExportableRegistration[] = [
      {
        registrationId: "SAM2-2026-TEST0002",
        createdAt: new Date().toISOString(),
        teamName: "Duo Team",
        eventName: "KAIROS",
        departmentName: "Information Science",
        status: "CONFIRMED",
        members: [
          { fullName: "Alice", phoneNumber: "9876543210", collegeEmail: "a@nie.ac.in", memberIndex: 1 },
          { fullName: "Bob", phoneNumber: "9876543211", collegeEmail: "b@nie.ac.in", memberIndex: 2 },
        ],
      },
    ];

    const workbook = buildRegistrationsWorkbook(mockRegistrations);
    const worksheet = workbook.getWorksheet("Registrations");
    const dataRow = worksheet!.getRow(2);

    // Columns 12-17 correspond to Member 3 and Member 4 (Name, Phone, Email)
    expect(dataRow.getCell(12).value).toBe(""); // Member 3 Name
    expect(dataRow.getCell(13).value).toBe(""); // Member 3 Phone
    expect(dataRow.getCell(14).value).toBe(""); // Member 3 Email
    expect(dataRow.getCell(15).value).toBe(""); // Member 4 Name
    expect(dataRow.getCell(16).value).toBe(""); // Member 4 Phone
    expect(dataRow.getCell(17).value).toBe(""); // Member 4 Email
  });
});
