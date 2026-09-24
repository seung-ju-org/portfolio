import { describe, expect, it } from "vitest";
import { scrolledPast } from "./site-motion";

describe("scrolledPast", () => {
  it("leaves a target that can still reach the observer threshold", () => {
    expect(scrolledPast({ bottom: 400, height: 400 })).toBe(false);
    expect(scrolledPast({ bottom: 40, height: 400 })).toBe(false);
  });

  it("reveals a target scrolled above the viewport, as a restored or jumped scroll leaves it", () => {
    expect(scrolledPast({ bottom: -606, height: 400 })).toBe(true);
    expect(scrolledPast({ bottom: 0, height: 400 })).toBe(true);
  });
});
