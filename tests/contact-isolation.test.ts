import { describe, it, expect } from "vitest";
import { FEST_EVENTS, getEventBySlug } from "../lib/events";

describe("Requirement B: Event-Specific Contact Number Restrictions", () => {
  it("Reel Campus: No coordinator contact numbers (as per original poster)", () => {
    const event = getEventBySlug("reel-campus");
    expect(event).toBeDefined();
    expect(event?.contacts).toBeDefined();
    expect(event?.contacts?.length).toBe(0);
  });

  it("Kairos: No coordinator contact numbers (as per original poster)", () => {
    const event = getEventBySlug("kairos");
    expect(event).toBeDefined();
    expect(event?.contacts).toBeDefined();
    expect(event?.contacts?.length).toBe(0);
  });

  it("Treasure Hunt: Displays its exact original poster phone numbers", () => {
    const event = getEventBySlug("treasure-hunt");
    expect(event).toBeDefined();
    expect(event?.contacts?.length).toBe(2);

    const phones = event?.contacts?.map((c) => c.phone);
    expect(phones).toContain("72043 74002");
    expect(phones).toContain("7411751633");
  });

  it("Prompting the Image: Displays its exact original poster coordinators", () => {
    const event = getEventBySlug("prompting-the-image");
    expect(event).toBeDefined();
    expect(event?.contacts?.length).toBe(3);

    const names = event?.contacts?.map((c) => c.name);
    expect(names).toContain("Sanjay");
    expect(names).toContain("Rajath");
    expect(names).toContain("Abraham");

    const phones = event?.contacts?.map((c) => c.phone.replace(/\s+/g, ""));
    expect(phones).toContain("6361779381");
    expect(phones).toContain("8904695721");
    expect(phones).toContain("7483307037");
  });

  it("Strict Prohibition: Treasure Hunt contact numbers are NEVER copied to other events", () => {
    const otherEvents = FEST_EVENTS.filter((e) => e.slug !== "treasure-hunt");
    for (const ev of otherEvents) {
      const phones = ev.contacts?.map((c) => c.phone) || [];
      expect(phones).not.toContain("72043 74002");
      expect(phones).not.toContain("7411751633");
    }
  });

  it("Ensures all 4 events have accurate poster asset paths", () => {
    expect(getEventBySlug("reel-campus")?.posterImage).toBe("/images/events/reel-campus.jpg");
    expect(getEventBySlug("prompting-the-image")?.posterImage).toBe(
      "/images/events/prompting-the-image.jpg"
    );
    expect(getEventBySlug("treasure-hunt")?.posterImage).toBe("/images/events/treasure-hunt.jpg");
    expect(getEventBySlug("kairos")?.posterImage).toBe("/images/events/kairos.jpg");
  });
});
