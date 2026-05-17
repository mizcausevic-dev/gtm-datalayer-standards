export type Health = "healthy" | "watch" | "critical";

export interface EventContract {
  event: string;
  requiredFields: string[];
  optionalFields: string[];
  primaryRoute: string;
  downstreamSystem: string;
  fieldCoveragePct: number;
  health: Health;
  explanation: string;
}

export interface PayloadScenario {
  scenario: string;
  trigger: string;
  event: string;
  keyPayloadFields: string[];
  campaignContext: string;
  integrityScore: number;
  health: Health;
  explanation: string;
}

export interface FailureMode {
  lane: string;
  brokenField: string;
  businessImpact: string;
  health: Health;
  explanation: string;
}

export const eventContractData: EventContract[] = [
  {
    event: "page_view_enriched",
    requiredFields: ["page_type", "page_path", "session_id", "utm_source"],
    optionalFields: ["utm_campaign", "content_group", "experiment_variant"],
    primaryRoute: "/landing/traffic-integrity",
    downstreamSystem: "GA4 + BigQuery",
    fieldCoveragePct: 97,
    health: "healthy",
    explanation:
      "Landing-page views are clean when route, audience, and campaign context all arrive before attribution logic starts splitting traffic."
  },
  {
    event: "pricing_cta_clicked",
    requiredFields: ["offer_id", "cta_label", "session_id", "intent_tier"],
    optionalFields: ["utm_campaign", "persona", "pricing_plan"],
    primaryRoute: "/pricing",
    downstreamSystem: "GA4 + HubSpot",
    fieldCoveragePct: 91,
    health: "healthy",
    explanation:
      "Pricing interactions stay commercially useful when the event includes the actual offer and the session’s commercial intent tier."
  },
  {
    event: "lead_form_submitted",
    requiredFields: ["form_id", "email_domain", "session_id", "lead_source"],
    optionalFields: ["crm_route", "campaign_id", "gclid"],
    primaryRoute: "/contact",
    downstreamSystem: "HubSpot + dbt",
    fieldCoveragePct: 84,
    health: "watch",
    explanation:
      "Form events are still usable, but attribution weakens when routing metadata lands after the submission is already handed to CRM."
  },
  {
    event: "scorecard_completed",
    requiredFields: ["scorecard_type", "completion_pct", "session_id", "utm_source"],
    optionalFields: ["persona", "company_size", "threat_signal"],
    primaryRoute: "/aeo/scorecard",
    downstreamSystem: "GA4 + Warehouse",
    fieldCoveragePct: 89,
    health: "healthy",
    explanation:
      "Assessment completions convert better when score context is preserved all the way into segmentation and nurture logic."
  },
  {
    event: "demo_request_created",
    requiredFields: ["demo_type", "session_id", "utm_campaign", "routing_priority"],
    optionalFields: ["owner_id", "meeting_type", "gclid"],
    primaryRoute: "/book-demo",
    downstreamSystem: "HubSpot + Slack",
    fieldCoveragePct: 72,
    health: "critical",
    explanation:
      "Demo requests are leaking revenue intelligence because routing priority and campaign context are not landing consistently before notification."
  }
];

export const payloadScenarioData: PayloadScenario[] = [
  {
    scenario: "Paid search landing path",
    trigger: "google-cpc visit with first-session pricing interaction",
    event: "pricing_cta_clicked",
    keyPayloadFields: ["utm_source", "utm_campaign", "offer_id", "intent_tier"],
    campaignContext: "High-cost acquisition requiring clean cost-to-pipeline attribution",
    integrityScore: 94,
    health: "healthy",
    explanation:
      "This payload is strong because acquisition cost, offer exposure, and conversion intent stay tied together."
  },
  {
    scenario: "Organic research journey",
    trigger: "multi-page organic session ending in scorecard completion",
    event: "scorecard_completed",
    keyPayloadFields: ["page_group", "utm_source", "scorecard_type", "completion_pct"],
    campaignContext: "SEO and AEO evaluation traffic",
    integrityScore: 88,
    health: "healthy",
    explanation:
      "This lane preserves enough context to distinguish content consumption from actual assessment intent."
  },
  {
    scenario: "Lead form handoff",
    trigger: "contact form submit after comparison-page review",
    event: "lead_form_submitted",
    keyPayloadFields: ["form_id", "email_domain", "lead_source", "crm_route"],
    campaignContext: "High-value inbound routing",
    integrityScore: 76,
    health: "watch",
    explanation:
      "This payload still reaches CRM, but missing route timing makes later source-of-truth reconciliation noisier than it should be."
  },
  {
    scenario: "Demo request escalation",
    trigger: "return session with demo CTA",
    event: "demo_request_created",
    keyPayloadFields: ["demo_type", "utm_campaign", "routing_priority", "owner_id"],
    campaignContext: "Sales-assisted conversion path",
    integrityScore: 63,
    health: "critical",
    explanation:
      "This lane breaks commercial trust because the same demo request can look different in analytics, CRM, and Slack."
  }
];

export const failureModeData: FailureMode[] = [
  {
    lane: "Demo routing",
    brokenField: "routing_priority",
    businessImpact: "Speed-to-lead and owner assignment lose consistency",
    health: "critical",
    explanation:
      "Without routing priority in the event payload, downstream systems cannot distinguish VIP demand from standard intake."
  },
  {
    lane: "Lead source normalization",
    brokenField: "lead_source",
    businessImpact: "Attribution models disagree with CRM reporting",
    health: "watch",
    explanation:
      "Source naming drift makes revenue reporting look like a dashboard problem when it is really a collection-layer problem."
  },
  {
    lane: "Pricing conversion analysis",
    brokenField: "offer_id",
    businessImpact: "Offer-level conversion lift cannot be trusted",
    health: "watch",
    explanation:
      "If the clicked offer is not captured, monetization experiments collapse back into one blended number."
  }
];
