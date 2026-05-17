import { eventContractData, failureModeData, payloadScenarioData } from "../data/sampleDatalayer";

export function summary() {
  const averageCoveragePct = Math.round(
    eventContractData.reduce((total, contract) => total + contract.fieldCoveragePct, 0) / eventContractData.length
  );
  const averageIntegrityScore = Math.round(
    payloadScenarioData.reduce((total, scenario) => total + scenario.integrityScore, 0) / payloadScenarioData.length
  );
  const healthyContracts = eventContractData.filter((contract) => contract.health === "healthy").length;
  const criticalFailures = failureModeData.filter((failure) => failure.health === "critical").length;

  return {
    eventCount: eventContractData.length,
    averageCoveragePct,
    averageIntegrityScore,
    healthyContracts,
    criticalFailures,
    recommendation:
      "Fix demo-request routing priority first, because that one field is distorting both speed-to-lead and campaign attribution at the same time."
  };
}

export function eventContracts() {
  return eventContractData;
}

export function payloadLane() {
  return payloadScenarioData;
}

export function failureModes() {
  return failureModeData;
}

export function verification() {
  return [
    "Event contracts are modeled with required fields, optional fields, route context, and downstream system dependencies in one surface.",
    "Payload scenarios connect session and campaign context to actual analytics integrity instead of treating GTM as a pure implementation detail.",
    "Failure modes make broken tracking legible in revenue terms so fixes can be prioritized by business impact, not just tag completeness."
  ];
}

export function payload() {
  return {
    dashboard: summary(),
    eventContracts: eventContracts(),
    payloadLane: payloadLane(),
    failureModes: failureModes(),
    verification: verification()
  };
}
