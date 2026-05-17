import { eventContracts, failureModes, payloadLane, summary, verification } from "./datalayerService";

function layout(title: string, activePath: string, body: string) {
  const nav = [
    { href: "/", label: "Overview" },
    { href: "/event-contracts", label: "Event Contracts" },
    { href: "/payload-lane", label: "Payload Lane" },
    { href: "/verification", label: "Verification" },
    { href: "/docs", label: "Docs" }
  ]
    .map((item) => {
      const active = item.href === activePath ? "nav-chip active" : "nav-chip";
      return `<a class="${active}" href="${item.href}">${item.label}</a>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <style>
      :root {
        --bg: #071419;
        --panel: rgba(11, 26, 34, 0.92);
        --line: rgba(83, 242, 222, 0.15);
        --text: #eefbfd;
        --muted: #9bc2ca;
        --accent: #53f2de;
        --accent-strong: #5f9dff;
        --good: #39d98a;
        --watch: #f1bd55;
        --critical: #ff6d84;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: "Segoe UI", Inter, sans-serif;
        color: var(--text);
        background:
          radial-gradient(circle at top left, rgba(83, 242, 222, 0.18), transparent 28%),
          radial-gradient(circle at top right, rgba(95, 157, 255, 0.16), transparent 26%),
          linear-gradient(180deg, #061116 0%, var(--bg) 100%);
      }
      a { color: inherit; text-decoration: none; }
      .shell { max-width: 1280px; margin: 0 auto; padding: 28px 28px 40px; }
      .topbar {
        display: flex; justify-content: space-between; align-items: center; gap: 20px;
        padding: 16px 18px; border: 1px solid var(--line);
        background: rgba(7, 18, 24, 0.9); border-radius: 24px;
      }
      .brand { display: flex; gap: 14px; align-items: center; }
      .brand-mark {
        width: 42px; height: 42px; display: grid; place-items: center;
        border-radius: 14px;
        background: linear-gradient(135deg, var(--accent) 0%, var(--accent-strong) 100%);
        font-weight: 800;
        color: #062228;
      }
      .eyebrow {
        margin: 0 0 2px; font-size: 12px; letter-spacing: 0.22em;
        text-transform: uppercase; color: #9cf2ff;
      }
      .brand-title { margin: 0; font-size: 24px; font-weight: 700; }
      .brand-subtitle { margin: 4px 0 0; color: var(--muted); font-size: 14px; }
      nav { display: flex; flex-wrap: wrap; gap: 10px; justify-content: flex-end; }
      .nav-chip {
        padding: 12px 16px; border-radius: 999px; border: 1px solid var(--line);
        background: rgba(11, 26, 34, 0.95); color: #ddfbff; font-size: 13px;
        letter-spacing: 0.06em; text-transform: uppercase;
      }
      .nav-chip.active {
        background: linear-gradient(135deg, rgba(83, 242, 222, 0.97), rgba(95, 157, 255, 0.93));
        border-color: transparent; color: #08202b; box-shadow: 0 10px 24px rgba(86, 201, 255, 0.28);
      }
      .hero {
        margin-top: 24px; padding: 30px 30px 34px; border-radius: 30px;
        border: 1px solid var(--line);
        background: linear-gradient(180deg, rgba(10, 24, 32, 0.96), rgba(8, 18, 25, 0.94));
      }
      .hero h1 {
        margin: 8px 0 10px; max-width: 960px;
        font-size: clamp(38px, 4.5vw, 62px); line-height: 1; letter-spacing: -0.04em;
      }
      .hero p { max-width: 860px; margin: 0; font-size: 20px; line-height: 1.5; color: #c6dde2; }
      .section { margin-top: 24px; display: grid; gap: 20px; }
      .metrics { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 16px; }
      .panel { padding: 22px; border-radius: 26px; border: 1px solid var(--line); background: var(--panel); }
      .metric-label { color: #9cf2ff; letter-spacing: 0.18em; font-size: 12px; text-transform: uppercase; }
      .metric-value { margin-top: 14px; font-size: 44px; font-weight: 750; line-height: 1; }
      .metric-copy { margin-top: 12px; font-size: 14px; color: var(--muted); line-height: 1.5; }
      .cols-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
      .table { width: 100%; border-collapse: collapse; margin-top: 14px; }
      .table th, .table td {
        padding: 14px 10px; border-bottom: 1px solid rgba(156, 242, 255, 0.11);
        text-align: left; vertical-align: top;
      }
      .table th { color: #9cf2ff; font-size: 12px; text-transform: uppercase; letter-spacing: 0.16em; }
      .table td { color: #eafafd; font-size: 14px; line-height: 1.45; }
      .tag {
        display: inline-flex; align-items: center; padding: 6px 10px; border-radius: 999px;
        font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase;
      }
      .healthy { background: rgba(57, 217, 138, 0.15); color: var(--good); }
      .watch { background: rgba(241, 189, 85, 0.15); color: var(--watch); }
      .critical { background: rgba(255, 109, 132, 0.15); color: var(--critical); }
      .section-title { margin: 0; font-size: 28px; line-height: 1.1; }
      .section-copy { margin: 10px 0 0; color: var(--muted); font-size: 16px; line-height: 1.55; }
      ul.clean { margin: 16px 0 0; padding-left: 18px; color: #e6f7fb; }
      ul.clean li { margin-top: 10px; line-height: 1.5; }
      code { background: rgba(11, 26, 34, 0.95); padding: 2px 6px; border-radius: 8px; }
      @media (max-width: 1100px) {
        .metrics, .cols-2 { grid-template-columns: 1fr; }
        nav { justify-content: flex-start; }
        .topbar { flex-direction: column; align-items: flex-start; }
      }
    </style>
  </head>
  <body>
    <main class="shell">
      <header class="topbar">
        <div class="brand">
          <div class="brand-mark">DL</div>
          <div>
            <p class="eyebrow">Digital Intelligence</p>
            <h1 class="brand-title">GTM Datalayer Standards</h1>
            <p class="brand-subtitle">Event contracts, payload discipline, and analytics-capture integrity in one operator view.</p>
          </div>
        </div>
        <nav>${nav}</nav>
      </header>
      ${body}
    </main>
  </body>
</html>`;
}

export function renderOverview() {
  const stats = summary();
  const failures = failureModes()
    .map((failure) => `<li><strong>${failure.lane}</strong> — ${failure.explanation}</li>`)
    .join("");

  const body = `
    <section class="hero">
      <p class="eyebrow">Collection Control Plane</p>
      <h1>Attribution and RevOps dashboards only work when the collection layer sends complete, consistent intent signals.</h1>
      <p>Model GTM event contracts, payload quality, and failure modes so marketing, analytics, and revenue systems all start from the same event truth.</p>
    </section>
    <section class="section">
      <div class="metrics">
        <article class="panel">
          <div class="metric-label">Events</div>
          <div class="metric-value">${stats.eventCount}</div>
          <div class="metric-copy">Modeled event contracts across key landing, pricing, form, and demo flows.</div>
        </article>
        <article class="panel">
          <div class="metric-label">Coverage</div>
          <div class="metric-value">${stats.averageCoveragePct}%</div>
          <div class="metric-copy">Average required-field coverage across the tracked contracts.</div>
        </article>
        <article class="panel">
          <div class="metric-label">Integrity</div>
          <div class="metric-value">${stats.averageIntegrityScore}</div>
          <div class="metric-copy">Average payload integrity score across the modeled session scenarios.</div>
        </article>
        <article class="panel">
          <div class="metric-label">Healthy Contracts</div>
          <div class="metric-value">${stats.healthyContracts}</div>
          <div class="metric-copy">Event contracts currently carrying enough context for reliable downstream analysis.</div>
        </article>
        <article class="panel">
          <div class="metric-label">Critical Failures</div>
          <div class="metric-value">${stats.criticalFailures}</div>
          <div class="metric-copy">Failure lanes still causing material distortion across CRM and analytics.</div>
        </article>
      </div>
      <div class="cols-2">
        <article class="panel">
          <p class="eyebrow">Recommendation</p>
          <h2 class="section-title">What to fix first</h2>
          <p class="section-copy">${stats.recommendation}</p>
        </article>
        <article class="panel">
          <p class="eyebrow">Failure Lanes</p>
          <h2 class="section-title">Where event integrity is leaking</h2>
          <ul class="clean">${failures}</ul>
        </article>
      </div>
    </section>`;

  return layout("GTM Datalayer Standards", "/", body);
}

export function renderEventContracts() {
  const rows = eventContracts()
    .map(
      (contract) => `
      <tr>
        <td>${contract.event}</td>
        <td>${contract.requiredFields.join(", ")}</td>
        <td>${contract.primaryRoute}</td>
        <td>${contract.downstreamSystem}</td>
        <td>${contract.fieldCoveragePct}%</td>
        <td><span class="tag ${contract.health}">${contract.health}</span></td>
      </tr>`
    )
    .join("");

  const body = `
    <section class="hero">
      <p class="eyebrow">Event Contracts</p>
      <h1>Every meaningful event should arrive with enough commercial context to survive handoff into analytics, CRM, and warehouse systems.</h1>
      <p>This lane makes required fields, route ownership, and downstream dependencies explicit so broken tracking can be found before it becomes reporting debt.</p>
    </section>
    <section class="section">
      <article class="panel">
        <p class="eyebrow">Contract Matrix</p>
        <h2 class="section-title">Required fields, routes, and coverage by event.</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Event</th>
              <th>Required Fields</th>
              <th>Primary Route</th>
              <th>Downstream</th>
              <th>Coverage</th>
              <th>Health</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </article>
    </section>`;

  return layout("GTM Datalayer Standards - Event Contracts", "/event-contracts", body);
}

export function renderPayloadLane() {
  const rows = payloadLane()
    .map(
      (scenario) => `
      <tr>
        <td>${scenario.scenario}</td>
        <td>${scenario.trigger}</td>
        <td>${scenario.event}</td>
        <td>${scenario.keyPayloadFields.join(", ")}</td>
        <td>${scenario.integrityScore}</td>
        <td><span class="tag ${scenario.health}">${scenario.health}</span></td>
        <td>${scenario.explanation}</td>
      </tr>`
    )
    .join("");

  const body = `
    <section class="hero">
      <p class="eyebrow">Payload Lane</p>
      <h1>Payload quality matters because campaign cost, buyer intent, and routing logic all depend on the same event body staying intact.</h1>
      <p>This surface compares tracked scenarios by context, key fields, and integrity score so teams can see where collection quality is already strong and where it is still too fragile.</p>
    </section>
    <section class="section">
      <article class="panel">
        <p class="eyebrow">Scenario Matrix</p>
        <h2 class="section-title">Payload strength by journey and campaign context.</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Scenario</th>
              <th>Trigger</th>
              <th>Event</th>
              <th>Payload Fields</th>
              <th>Integrity</th>
              <th>Health</th>
              <th>Explanation</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </article>
    </section>`;

  return layout("GTM Datalayer Standards - Payload Lane", "/payload-lane", body);
}

export function renderVerification() {
  const body = `
    <section class="hero">
      <p class="eyebrow">Verification</p>
      <h1>This build proves dataLayer discipline is part of revenue architecture, not just tag implementation.</h1>
      <p>The point is not merely to list events. The point is to connect field completeness and payload quality to real attribution, routing, and pipeline trust.</p>
    </section>
    <section class="section">
      <article class="panel">
        <p class="eyebrow">Release Checks</p>
        <h2 class="section-title">What this repo validates</h2>
        <ul class="clean">
          ${verification().map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </article>
    </section>`;

  return layout("GTM Datalayer Standards - Verification", "/verification", body);
}

export function renderDocs() {
  const body = `
    <section class="hero">
      <p class="eyebrow">Docs</p>
      <h1>Modeled as a collection-governance surface for Growth, Analytics, and RevOps teams.</h1>
      <p>This repo combines event contracts, payload scenarios, and failure modes so teams can standardize GTM collection before bad events distort attribution and routing.</p>
    </section>
    <section class="section">
      <div class="cols-2">
        <article class="panel">
          <p class="eyebrow">Routes</p>
          <h2 class="section-title">UI surface</h2>
          <ul class="clean">
            <li><code>/</code> overview and collection posture</li>
            <li><code>/event-contracts</code> required-field and route matrix</li>
            <li><code>/payload-lane</code> scenario-level payload integrity view</li>
            <li><code>/verification</code> release checks and modeling claims</li>
          </ul>
        </article>
        <article class="panel">
          <p class="eyebrow">API</p>
          <h2 class="section-title">Machine-readable outputs</h2>
          <ul class="clean">
            <li><code>/api/dashboard/summary</code></li>
            <li><code>/api/event-contracts</code></li>
            <li><code>/api/payload-lane</code></li>
            <li><code>/api/failure-modes</code></li>
            <li><code>/api/verification</code></li>
            <li><code>/api/sample</code></li>
          </ul>
        </article>
      </div>
    </section>`;

  return layout("GTM Datalayer Standards - Docs", "/docs", body);
}
