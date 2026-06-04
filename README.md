# GTM Datalayer Standards

Board-ready Kinetic Gain surface for governing GTM `dataLayer` contracts, payload discipline, and analytics-capture integrity before attribution trust starts leaking.

## Why this matters

Attribution failures usually start in collection, not reporting. `gtm-datalayer-standards` keeps event completeness, route ownership, and downstream payload health visible in one operator surface so Growth, Analytics, and RevOps teams can fix collection truth before dashboards and CRM views diverge.

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
