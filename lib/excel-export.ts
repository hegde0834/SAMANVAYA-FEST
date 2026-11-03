import ExcelJS from "exceljs";
import path from "path";
import fs from "fs";

export interface ExportableRegistration {
  registrationId: string;
  createdAt: Date | string;
  teamName: string;
  eventName: string;
  departmentName: string; // Exactly one shared department field
  status: string;
  members: {
    fullName: string;
    phoneNumber: string;
    collegeEmail: string;
    memberIndex: number;
  }[];
}

/**
 * Sanitizes input text against CSV/Excel formula injection (CSV Injection / DDE attacks)
 * Prevents execution of formulas starting with =, +, -, @, \t, \r
 */
export function sanitizeExcelValue(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return "";
  const str = String(value).trim();
  if (/^[=+\-@\t\r]/.test(str)) {
    return `'${str}`;
  }
  return str;
}

/**
 * Builds an ExcelJS Workbook from a list of registrations.
 * Adheres strictly to the column specifications with ONE Department Name column.
 */
export function buildRegistrationsWorkbook(registrations: ExportableRegistration[]): ExcelJS.Workbook {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "SAMANVAYA 2.0 Fest Portal";
  workbook.lastModifiedBy = "Organizer Dashboard";
  workbook.created = new Date();
  workbook.modified = new Date();

  const worksheet = workbook.addWorksheet("Registrations", {
    views: [{ state: "frozen", ySplit: 1 }],
  });

  // Exactly 18 columns with single Department Name column
  worksheet.columns = [
    { header: "Registration ID", key: "regId", width: 24 },
    { header: "Registration Date and Time", key: "createdAt", width: 24 },
    { header: "Team Name", key: "teamName", width: 26 },
    { header: "Event Name", key: "eventName", width: 26 },
    { header: "Department Name", key: "departmentName", width: 26 }, // Shared department for whole team
    { header: "Member 1 Name", key: "m1Name", width: 22 },
    { header: "Member 1 Phone", key: "m1Phone", width: 18 },
    { header: "Member 1 College Email", key: "m1Email", width: 28 },
    { header: "Member 2 Name", key: "m2Name", width: 22 },
    { header: "Member 2 Phone", key: "m2Phone", width: 18 },
    { header: "Member 2 College Email", key: "m2Email", width: 28 },
    { header: "Member 3 Name", key: "m3Name", width: 22 },
    { header: "Member 3 Phone", key: "m3Phone", width: 18 },
    { header: "Member 3 College Email", key: "m3Email", width: 28 },
    { header: "Member 4 Name", key: "m4Name", width: 22 },
    { header: "Member 4 Phone", key: "m4Phone", width: 18 },
    { header: "Member 4 College Email", key: "m4Email", width: 28 },
    { header: "Registration Status", key: "status", width: 18 },
  ];

  // Style Header Row (Futuristic Midnight & Cyan theme)
  const headerRow = worksheet.getRow(1);
  headerRow.height = 30;
  headerRow.eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF0A1128" }, // Deep Midnight Navy
    };
    cell.font = {
      name: "Segoe UI",
      size: 11,
      bold: true,
      color: { argb: "FF00F3FF" }, // Neon Cyan
    };
    cell.alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };
    cell.border = {
      top: { style: "thin", color: { argb: "FF182752" } },
      bottom: { style: "medium", color: { argb: "FF00F3FF" } },
      left: { style: "thin", color: { argb: "FF182752" } },
      right: { style: "thin", color: { argb: "FF182752" } },
    };
  });

  // Populate data rows
  registrations.forEach((reg, index) => {
    const m1 = reg.members.find((m) => m.memberIndex === 1);
    const m2 = reg.members.find((m) => m.memberIndex === 2);
    const m3 = reg.members.find((m) => m.memberIndex === 3);
    const m4 = reg.members.find((m) => m.memberIndex === 4);

    const formattedDate =
      typeof reg.createdAt === "string"
        ? reg.createdAt
        : new Intl.DateTimeFormat("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
          }).format(new Date(reg.createdAt));

    const row = worksheet.addRow({
      regId: sanitizeExcelValue(reg.registrationId),
      createdAt: formattedDate,
      teamName: sanitizeExcelValue(reg.teamName),
      eventName: sanitizeExcelValue(reg.eventName),
      departmentName: sanitizeExcelValue(reg.departmentName), // Exactly once
      m1Name: sanitizeExcelValue(m1?.fullName || ""),
      m1Phone: sanitizeExcelValue(m1?.phoneNumber || ""),
      m1Email: sanitizeExcelValue(m1?.collegeEmail || ""),
      m2Name: sanitizeExcelValue(m2?.fullName || ""),
      m2Phone: sanitizeExcelValue(m2?.phoneNumber || ""),
      m2Email: sanitizeExcelValue(m2?.collegeEmail || ""),
      m3Name: sanitizeExcelValue(m3?.fullName || ""),
      m3Phone: sanitizeExcelValue(m3?.phoneNumber || ""),
      m3Email: sanitizeExcelValue(m3?.collegeEmail || ""),
      m4Name: sanitizeExcelValue(m4?.fullName || ""),
      m4Phone: sanitizeExcelValue(m4?.phoneNumber || ""),
      m4Email: sanitizeExcelValue(m4?.collegeEmail || ""),
      status: sanitizeExcelValue(reg.status),
    });

    row.height = 24;
    const isEven = index % 2 === 0;

    row.eachCell((cell, colNumber) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: isEven ? "FFFFFFFF" : "FFF5F9FF" },
      };
      cell.font = {
        name: "Segoe UI",
        size: 10,
        color: { argb: "FF1E293B" },
      };
      cell.alignment = {
        vertical: "middle",
        horizontal: colNumber === 1 || colNumber === 2 || colNumber === 18 ? "center" : "left",
      };
      cell.border = {
        top: { style: "thin", color: { argb: "FFE2E8F0" } },
        bottom: { style: "thin", color: { argb: "FFE2E8F0" } },
        left: { style: "thin", color: { argb: "FFE2E8F0" } },
        right: { style: "thin", color: { argb: "FFE2E8F0" } },
      };
    });
  });

  worksheet.autoFilter = {
    from: "A1",
    to: `R${Math.max(registrations.length + 1, 1)}`,
  };

  return workbook;
}

/**
 * Saves or updates local development excel workbook at `data/SAMANVAYA_2_0_Registrations.xlsx`
 * Safely bypassed in serverless / Vercel environments where disk is read-only.
 */
export async function syncLocalExcelExport(registrations: ExportableRegistration[]): Promise<string> {
  // Serverless environments like Vercel have read-only filesystems
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    return "";
  }

  try {
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const filePath = path.join(dataDir, "SAMANVAYA_2_0_Registrations.xlsx");
    const workbook = buildRegistrationsWorkbook(registrations);
    await workbook.xlsx.writeFile(filePath);
    return filePath;
  } catch (err) {
    console.warn("Non-fatal: Skipping local excel file write:", err);
    return "";
  }
}
