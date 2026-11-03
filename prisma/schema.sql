-- SAMANVAYA 2.0 PostgreSQL Database Initialization Script
-- Use this script in Vercel Postgres, Neon, Supabase, or any PostgreSQL database SQL Editor.

-- 1. Create Registration Table
CREATE TABLE IF NOT EXISTS "Registration" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "registrationId" TEXT NOT NULL UNIQUE,
  "teamName" TEXT NOT NULL,
  "eventSlug" TEXT NOT NULL,
  "eventName" TEXT NOT NULL,
  -- Requirement A: Exactly ONE shared department field for the entire team
  "departmentName" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'CONFIRMED',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS "Registration_eventSlug_idx" ON "Registration"("eventSlug");
CREATE INDEX IF NOT EXISTS "Registration_registrationId_idx" ON "Registration"("registrationId");
CREATE INDEX IF NOT EXISTS "Registration_teamName_idx" ON "Registration"("teamName");

-- 2. Create TeamMember Table
CREATE TABLE IF NOT EXISTS "TeamMember" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "registrationId" TEXT NOT NULL,
  "fullName" TEXT NOT NULL,
  "phoneNumber" TEXT NOT NULL,
  "collegeEmail" TEXT NOT NULL,
  "memberIndex" INTEGER NOT NULL,
  CONSTRAINT "TeamMember_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "Registration"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "TeamMember_registrationId_idx" ON "TeamMember"("registrationId");

-- 3. Create EventSetting Table
CREATE TABLE IF NOT EXISTS "EventSetting" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "eventSlug" TEXT NOT NULL UNIQUE,
  "eventName" TEXT NOT NULL,
  "isOpen" BOOLEAN NOT NULL DEFAULT true,
  "maxTeams" INTEGER NOT NULL DEFAULT 50,
  "dateText" TEXT NOT NULL DEFAULT '20th Nov',
  "venueText" TEXT NOT NULL DEFAULT 'NIE North Campus, Mysuru',
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 4. Seed Default Event Settings for all 4 competitions
INSERT INTO "EventSetting" ("id", "eventSlug", "eventName", "isOpen", "maxTeams", "dateText", "venueText", "updatedAt")
VALUES 
  ('es_reel_campus', 'reel-campus', 'REEL CAMPUS', true, 50, '20th Nov', 'NIE North Campus, Mysuru', CURRENT_TIMESTAMP),
  ('es_prompting_img', 'prompting-the-image', 'PROMPTING THE IMAGE', true, 10, '20th Nov', 'NIE North Campus, Mysuru', CURRENT_TIMESTAMP),
  ('es_treasure_hunt', 'treasure-hunt', 'TREASURE HUNT', true, 50, '20th Nov', 'NIE North Campus, Mysuru', CURRENT_TIMESTAMP),
  ('es_kairos', 'kairos', 'KAIROS', true, 50, '20th Nov', 'NIE North Campus, Mysuru', CURRENT_TIMESTAMP)
ON CONFLICT ("eventSlug") DO NOTHING;
