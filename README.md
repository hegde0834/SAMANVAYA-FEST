# SAMANVAYA 2.0 — THE AWAKENING
## Modern, Futuristic 3D College Fest Web Application

**The National Institute of Engineering (NIE), Mysuru**  
*Department of Master of Computer Applications (MCA)*  
*North Campus, Mysuru, Karnataka, India*

---

## 🌟 Overview

**SAMANVAYA 2.0 — THE AWAKENING** is the flagship annual technical and creative fest of the Department of Master of Computer Applications (MCA) at The National Institute of Engineering (NIE), North Campus, Mysuru.

This full-stack application provides an end-to-end digital experience featuring:
- Futuristic cyberpunk neon aesthetic inspired by the official fest posters.
- Ambient 3D particle constellation and glowing glassmorphism design system.
- Showcase for all 4 flagship fest competitions based on official posters.
- Real-time team registration with dynamic team sizes (2 or 4 members).
- Transaction-safe database persistence with unique ID generation (`SAM2-2026-XXXXXXXX`).
- Server-side generated Excel (`.xlsx`) workbook export using ExcelJS.
- Protected organizer console for real-time monitoring and event management.
- Complete automated test suite verifying strict business logic and security policies.

---

## 🔒 Strict Requirements Compliance

### Requirement A: Exactly ONE Shared Department Field
- **Form Interface**: The registration form features a single, prominent **Department Name** field applying to the entire team. Individual team members do not have separate department dropdowns or inputs.
- **Database Schema**: The `departmentName` column is defined once on the `Registration` model. The `TeamMember` model contains strictly `fullName`, `phoneNumber`, `collegeEmail`, and `memberIndex`—inheriting the team's shared department.
- **Excel Workbook**: The generated spreadsheet contains exactly one column named **`Department Name`** (Column 5). Member 1, 2, 3, and 4 do not have duplicated department columns.
- **Admin & Pass**: Both the printable team confirmation pass and the organizer dashboard display the shared department once per team.

### Requirement B: Contact Number Visibility Isolation
- **No Shared Contact Numbers**: Contact phone numbers are **strictly prohibited** and omitted from all shared website sections (Homepage, Hero, Navbar, About, Event Listing Cards, Footer, Registration Form, Confirmation Pass, Admin Login).
- **Poster-Accurate Event Isolation**:
  - **Treasure Hunt**: Contact numbers (`72043 74002` and `7411751633`) printed on its original poster are displayed **only** on its dedicated page (`/events/treasure-hunt`).
  - **Prompting the Image**: Coordinators Sanjay (`6361779381`), Rajath (`89046 95721`), and Abraham (`7483307037`) printed on its poster appear **only** on `/events/prompting-the-image`.
  - **Reel Campus**: No phone numbers appear on the poster, hence no phone numbers are displayed.
  - **Kairos**: No phone numbers appear on the poster, hence no phone numbers are displayed.
  - Contact numbers are **never copied** across event boundaries.

---

## 🚀 Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript with strict mode
- **UI & Styling**: Tailwind CSS, Modern CSS, Glassmorphism & Custom Cyberpunk Glow Tokens
- **3D & Animations**: HTML5 Canvas 3D Particle Constellation, Framer Motion, Canvas Confetti
- **Icons**: Lucide React
- **Forms & Validation**: React Hook Form, Zod
- **Database**: Prisma ORM with SQLite for local development (`file:./dev.db`), PostgreSQL compatible
- **Excel Generation**: ExcelJS
- **Toast Notifications**: Sonner
- **Testing**: Vitest with unit, schema, database, and Excel test suites

---

## 📁 Official Event Posters

All four official posters are integrated directly into the portal from `public/images/events/`:

| Event Name | Poster Path | Team Size | Category |
| :--- | :--- | :--- | :--- |
| **REEL CAMPUS** | `/images/events/reel-campus.jpg` | 2 Members | Creative & Media |
| **PROMPTING THE IMAGE** | `/images/events/prompting-the-image.jpg` | 2 Members | Artificial Intelligence |
| **TREASURE HUNT** | `/images/events/treasure-hunt.jpg` | 4 Members (2G + 2B) | Adventure & Mystery |
| **KAIROS** | `/images/events/kairos.jpg` | 2 Members | Technical Gaming & Logic |

---

## 🛠️ Project Structure

```
├── app/
│   ├── layout.tsx                     # Cyberpunk root layout with navbar, footer, 3D canvas
│   ├── page.tsx                       # Homepage (Hero, About, Showcase, Rules)
│   ├── globals.css                    # Design system tokens, neon glows, scrollbars
│   ├── events/
│   │   ├── page.tsx                   # Events catalog
│   │   └── [slug]/page.tsx            # Dedicated event detail route
│   ├── register/
│   │   └── page.tsx                   # Team registration portal
│   ├── confirmation/
│   │   └── [registrationId]/page.tsx  # Secure team confirmation pass
│   ├── admin/
│   │   └── page.tsx                   # Organizer management console
│   └── api/
│       ├── registrations/
│       │   ├── route.ts               # POST (register team), GET (counts)
│       │   └── [registrationId]/      # GET (privacy-preserving pass data)
│       └── admin/
│           ├── login/route.ts         # Secure authentication
│           ├── logout/route.ts        # Session termination
│           ├── check/route.ts         # Session verification
│           ├── registrations/         # GET (search/filter), PATCH (status)
│           │   └── export/route.ts    # GET (Excel workbook download)
│           └── settings/route.ts      # GET/POST (event status & limit controls)
├── components/
│   ├── 3d/
│   │   └── CyberCanvas.tsx            # 3D interactive particle field
│   ├── layout/
│   │   ├── Navbar.tsx                 # Responsive glassmorphic navigation
│   │   └── Footer.tsx                 # NIE branding footer (no phone numbers)
│   ├── home/
│   │   ├── Hero.tsx                   # Cyber hero with animated badges & CTA
│   │   ├── AboutSection.tsx           # 4 highlight cards (Creativity, Innovation, Teamwork, Competition)
│   │   ├── EventShowcase.tsx          # Responsive 4-card poster showcase
│   │   └── GeneralRules.tsx           # Code of conduct and fest rules
│   ├── events/
│   │   ├── EventCard.tsx              # Interactive 3D tilt event card
│   │   ├── EventDetails.tsx           # Rich event detail view with poster lightbox
│   │   └── EventContact.tsx           # Strictly isolated contact section
│   ├── registration/
│   │   ├── RegistrationForm.tsx       # Dynamic team size, single department field
│   │   ├── TeamMemberFields.tsx       # Member inputs without department duplication
│   │   └── RegistrationSuccess.tsx    # Printable pass with confetti & copy ID
│   └── admin/
│       └── AdminDashboard.tsx         # Organizer metrics, filters, Excel export, settings
├── lib/
│   ├── prisma.ts                      # Prisma client singleton
│   ├── events.ts                      # Authoritative event data model
│   ├── validations.ts                 # Zod validation schema & domain helpers
│   ├── registration.ts                # ID generation, transactions, async Excel sync
│   ├── excel-export.ts                # ExcelJS workbook builder & CSV injection guard
│   └── auth.ts                        # Admin session & cookie management
├── prisma/
│   └── schema.prisma                  # Database schema (Single department on Registration)
├── public/
│   └── images/events/                 # 4 official festival posters
├── data/
│   └── SAMANVAYA_2_0_Registrations.xlsx # Auto-synchronized Excel export
└── tests/
    ├── registration-validation.test.ts # Dynamic team size & single department tests
    ├── excel-export.test.ts           # 18-column Excel & formula injection tests
    ├── contact-isolation.test.ts      # Contact isolation & poster accuracy tests
    └── database-persistence.test.ts   # Database transaction & unique ID tests
```

---

## ⚡ Installation & Quick Start

### 1. Prerequisites
- **Node.js**: v18+ or v20+ (Tested on v24)
- **npm**: v9+

### 2. Environment Setup
Copy the example environment file:
```bash
cp .env.example .env
```
Default `.env` values:
```env
DATABASE_URL="file:./dev.db"
ADMIN_SECRET="samanvaya2026admin"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
COLLEGE_EMAIL_DOMAINS=""
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Initialize Database
Generate Prisma client and push schema to SQLite:
```bash
npx prisma generate
npx prisma db push
```

### 5. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Running Automated Tests

Run the full Vitest suite covering all strict requirements:
```bash
npm run test
```
The test suite validates:
1. Dynamic team sizing (2 members for Reel Campus/Kairos/Prompting the Image; 4 members for Treasure Hunt).
2. Exactly one shared department field for the entire team in validation schemas.
3. Strict absence of separate member department fields.
4. Excel workbook structure (18 columns, single Department Name column, formula injection sanitization).
5. Contact isolation (Treasure Hunt and Prompting the Image retain original poster contacts; Reel Campus and Kairos display zero phone numbers; contacts are never leaked to shared sections).
6. Collision-resistant ID generation (`SAM2-2026-XXXXXXXX`).
7. Database transactional persistence and duplicate team prevention.

---

## 📊 Excel Export Specification

The Excel workbook is automatically built using **ExcelJS** with the following 18 columns:
1. `Registration ID`
2. `Registration Date and Time`
3. `Team Name`
4. `Event Name`
5. `Department Name` *(Single shared department for the entire team)*
6. `Member 1 Name`
7. `Member 1 Phone`
8. `Member 1 College Email`
9. `Member 2 Name`
10. `Member 2 Phone`
11. `Member 2 College Email`
12. `Member 3 Name` *(Blank for 2-member teams)*
13. `Member 3 Phone` *(Blank for 2-member teams)*
14. `Member 3 College Email` *(Blank for 2-member teams)*
15. `Member 4 Name` *(Blank for 2-member teams)*
16. `Member 4 Phone` *(Blank for 2-member teams)*
17. `Member 4 College Email` *(Blank for 2-member teams)*
18. `Registration Status`

**Formula Injection Guard**: Any user-entered field starting with `=`, `+`, `-`, or `@` is automatically sanitized by prepending a single quote `'` to prevent DDE/CSV injection attacks.

---

## 🛡️ Organizer Admin Portal

- **URL**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Default Secret Key**: `samanvaya2026admin` (Configured in `.env`)
- **Features**:
  - Live team count metrics per event.
  - Real-time search across ID, team name, department, or member name.
  - Event and registration status filters.
  - Full team inspector modal.
  - Status management (`CONFIRMED`, `WAITLISTED`, `CANCELLED`).
  - Instant Excel download via `GET /api/admin/registrations/export`.
  - Event controls to open/close registrations or update limits.

---

## 🚢 Production Deployment

1. **Environment Variables**:
   - Set `DATABASE_URL` to your production PostgreSQL connection string (e.g., Supabase / Neon / AWS RDS).
   - In `prisma/schema.prisma`, change `provider = "sqlite"` to `provider = "postgresql"`.
   - Set a strong, random `ADMIN_SECRET` in environment variables.
   - Set `NEXT_PUBLIC_APP_URL` to your production domain (e.g., `https://samanvaya.nie.ac.in`).
2. **Build and Start**:
   ```bash
   npm run build
   npm start
   ```
