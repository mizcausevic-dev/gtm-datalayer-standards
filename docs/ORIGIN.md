# Origin

This repo exists because many GTM stacks have tracking events, but not event discipline.

The usual failure modes are familiar:
- `dataLayer` pushes fire without the fields needed for downstream trust
- form and demo events reach CRM, but not in a way attribution can reconcile later
- route ownership and event ownership are different, so missing fields linger for months
- analytics teams inherit broken context and then get blamed for “bad dashboards”

`gtm-datalayer-standards` was designed as a Kinetic Gain portfolio build to show how collection governance can stay commercially useful, not just implementation-specific.

The operating principle is simple:
- define the contract
- inspect the payload
- surface the failure
- tie the fix back to revenue trust
