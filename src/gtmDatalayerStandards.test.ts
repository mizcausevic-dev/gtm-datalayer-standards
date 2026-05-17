import { describe, expect, it } from "vitest";

import { eventContracts, failureModes, payload, payloadLane, summary } from "./services/datalayerService";

describe("gtm-datalayer-standards", () => {
  it("summary exposes collection integrity posture", () => {
    const result = summary();

    expect(result.eventCount).toBeGreaterThan(0);
    expect(result.averageCoveragePct).toBeGreaterThan(0);
    expect(result.recommendation).toContain("routing priority");
  });

  it("contracts and payload lanes stay commercially legible", () => {
    expect(eventContracts().length).toBeGreaterThan(1);
    expect(payloadLane().some((scenario) => scenario.explanation.includes("payload"))).toBe(true);
    expect(failureModes().some((failure) => failure.explanation.includes("routing"))).toBe(true);
  });

  it("payload bundles the full collection surface", () => {
    const result = payload();

    expect(result.dashboard.eventCount).toBe(result.eventContracts.length);
    expect(result.payloadLane.length).toBeGreaterThan(0);
    expect(result.failureModes.length).toBeGreaterThan(0);
    expect(result.verification.length).toBe(3);
  });
});
