import { describe, expect, it } from "vitest";
import { daysUntilDate } from "./study";

describe("daysUntilDate", () => {
  it("returns zero when the exam is today", () => {
    expect(daysUntilDate("2026-10-24", "2026-10-24")).toBe(0);
  });

  it("counts calendar days until a future exam", () => {
    expect(daysUntilDate("2026-11-17", "2026-10-24")).toBe(24);
  });

  it("returns a negative number for a past date", () => {
    expect(daysUntilDate("2026-10-23", "2026-10-24")).toBe(-1);
  });
});
