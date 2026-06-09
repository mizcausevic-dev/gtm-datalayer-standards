# GTM Datalayer Standards

Board-ready Kinetic Gain surface for governing GTM `dataLayer` contracts, payload discipline, and analytics-capture integrity before attribution trust starts leaking.

## Why this matters

Attribution failures usually start in collection, not reporting. `gtm-datalayer-standards` keeps event completeness, route ownership, and downstream payload health visible in one operator surface so Growth, Analytics, and RevOps teams can fix collection truth before dashboards and CRM views diverge.

## What this product does

GTM Datalayer Standards is an analytics-governance surface for keeping event contracts, campaign context, consent posture, and downstream handoff quality aligned before reporting trust collapses. It turns dataLayer events into a governed contract catalog: event name, required fields, route owner, downstream system, payload integrity, and business impact stay visible together.

For a SaaS go-to-market analyst, this is useful before campaign launches, pricing tests, form changes, and funnel redesigns. It shows whether the GTM data contract is strong enough to support attribution, scoring, routing, experimentation, and board reporting.

For a SaaS value architect, this exposes revenue leakage from missing UTMs, inconsistent product identifiers, consent gaps, broken CRM handoffs, and analytics events that fire but do not carry enough commercial context to drive decisions.

For technical review, the repo includes static routes, API-style payloads, seeded event contracts, failure-mode records, prerendered output, tests, smoke checks, and screenshot generation. It fits the broader Kinetic Gain pattern: operational evidence becomes a decision surface with owner, signal, risk, value, route, and verification visible together.

## Routes

- `/`
- `/event-contracts`
- `/payload-lane`
- `/verification`
- `/docs`

## API

- `/api/dashboard/summary`
- `/api/event-contracts`
- `/api/payload-lane`
- `/api/failure-modes`
- `/api/verification`
- `/api/sample`

## Local run

```powershell
cd gtm-datalayer-standards
npm install
npm run verify
npm run render:assets
```

## Docs

- [Architecture](./docs/architecture.md)
- [Origin](./docs/ORIGIN.md)
- [Changelog](./CHANGELOG.md)

## Screenshots

![Overview](./screenshots/01-overview-proof.png)
![Event contracts](./screenshots/02-event-contracts-proof.png)
![Payload lane](./screenshots/03-payload-lane-proof.png)
![Verification](./screenshots/04-verification-proof.png)
