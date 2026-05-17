# Architecture

## Core idea

`gtm-datalayer-standards` models collection governance through three linked views:
- event contracts
- payload scenarios
- failure modes

## Surface model

- overview
  - event count, average field coverage, payload integrity, failure pressure, and recommendation
- event contracts
  - required fields, route ownership, downstream systems, and coverage by event
- payload lane
  - scenario triggers, payload fields, campaign context, and integrity score
- verification
  - claims about collection quality and analytics trust

## Data model

- `EventContract`
  - event
  - required fields
  - optional fields
  - primary route
  - downstream system
  - field coverage
  - health
  - explanation
- `PayloadScenario`
  - scenario
  - trigger
  - event
  - key payload fields
  - campaign context
  - integrity score
  - health
  - explanation
- `FailureMode`
  - lane
  - broken field
  - business impact
  - health
  - explanation

## Commercial value

The point is not just to document tags. The point is to show how incomplete payloads distort attribution, routing, and monetization decisions across the whole GTM machine.
