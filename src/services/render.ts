import { eventContracts, failureModes, payloadLane, summary, verification } from "./datalayerService";

const productTitle = "GTM Datalayer Standards";
const domain = "http://datalayer.kineticgain.com";

const KG_FAVICON_DATA_URI =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img" aria-label="Kinetic Gain"><rect width="64" height="64" rx="15" fill="#0D0F12"/><g transform="translate(10 22.79) scale(0.25581)"><rect x="0" y="0" width="14" height="72" fill="#475B6B"/><polygon points="32,0 83,0 77,18 26,18" fill="#F5F2EB"/><polygon points="32,27 127,27 121,45 26,45" fill="#F5F2EB"/><polygon points="32,54 172,54 166,72 26,72" fill="#F5F2EB"/></g></svg>`
  );

const KG_MARK_SVG = `<svg class="kg-mark" viewBox="-8 -8 188 88" aria-hidden="true"><rect class="anchor" x="0" y="0" width="14" height="72"/><polygon class="bar" points="32,0 83,0 77,18 26,18"/><polygon class="bar" points="32,27 127,27 121,45 26,45"/><polygon class="bar" points="32,54 172,54 166,72 26,72"/></svg>`;

const BASE_CSS = `:root{--onyx:#0D0F12;--cream:#F5F2EB;--bluegray:#475B6B;--bluegray-bright:#6E879A;--radius:18px;--maxw:1180px;--ease:cubic-bezier(.22,.61,.36,1);--font:"Geist",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;--mono:"Geist Mono","SFMono-Regular",Consolas,monospace;--a-emerald:#34D399;--a-cyan:#22D3EE;--a-violet:#A78BFA;--a-amber:#FBBF24;--a-blue:#60A5FA;--a-coral:#FB7185}html[data-theme="dark"]{--ground:#0A0B11;--ink:var(--cream);--ink-dim:#9AA1AD;--ink-faint:#565C68;--surface:rgba(255,255,255,.025);--surface-2:rgba(255,255,255,.045);--line:rgba(255,255,255,.08);--line-soft:rgba(255,255,255,.05);--signal:var(--bluegray-bright);--glow:1}html[data-theme="light"]{--ground:var(--cream);--ink:var(--onyx);--ink-dim:#5A5E63;--ink-faint:#A8A59C;--surface:rgba(13,15,18,.02);--surface-2:rgba(13,15,18,.04);--line:#E2DDD1;--line-soft:#EBE7DC;--signal:var(--bluegray);--glow:0}*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}body{background:var(--ground);color:var(--ink);font-family:var(--font);line-height:1.5;letter-spacing:-.011em;-webkit-font-smoothing:antialiased;overflow-x:hidden;position:relative;transition:background .5s var(--ease),color .5s var(--ease)}body::after{content:"";position:fixed;inset:0;z-index:0;pointer-events:none;opacity:var(--glow);transition:opacity .5s var(--ease);background:radial-gradient(900px 600px at 12% -5%,rgba(124,92,232,.16),transparent 60%),radial-gradient(800px 600px at 92% 8%,rgba(34,211,238,.10),transparent 55%),radial-gradient(1000px 700px at 70% 100%,rgba(71,91,107,.18),transparent 60%),linear-gradient(180deg,#0A0B11 0%,#0C0E16 55%,#0A0C13 100%)}body::before{content:"";position:fixed;inset:0;pointer-events:none;z-index:1;opacity:.02;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}a{color:inherit}.wrap{max-width:var(--maxw);margin:0 auto;padding:0 28px}.kg-logo{display:flex;align-items:center;gap:11px;text-decoration:none;color:var(--ink)}.kg-mark{height:22px;width:auto;display:block;flex:none}.kg-mark .anchor{fill:var(--signal)}.kg-mark .bar{fill:var(--ink)}.kg-word{font-weight:600;font-size:18px;letter-spacing:-.035em;color:var(--ink);white-space:nowrap}.eyebrow{font-family:var(--mono);font-size:11px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:var(--ink-faint)}header{position:sticky;top:0;z-index:50;background:color-mix(in srgb,var(--ground) 72%,transparent);backdrop-filter:blur(16px) saturate(150%);border-bottom:1px solid var(--line-soft)}.nav{display:flex;align-items:center;justify-content:space-between;height:68px;position:relative;z-index:2}.nav-links{display:flex;align-items:center;gap:22px;flex-wrap:wrap}.nav-links a{font-family:var(--mono);font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-dim);text-decoration:none;transition:color .25s var(--ease)}.nav-links a:hover,.nav-links a.active{color:var(--ink)}.nav-links a.active{border-bottom:1px solid var(--a-cyan);padding-bottom:2px}.nav-right{display:flex;align-items:center;gap:14px}.theme-btn,.menu-btn{width:34px;height:34px;border:1px solid var(--line);border-radius:9px;background:transparent;color:var(--ink-dim);cursor:pointer;display:grid;place-items:center;transition:all .25s var(--ease)}.menu-btn{display:none;color:var(--ink)}.theme-btn:hover,.menu-btn:hover{color:var(--ink);border-color:var(--a-violet)}.theme-btn svg,.menu-btn svg{width:15px;height:15px}.shell{max-width:var(--maxw);margin:0 auto;padding:0 28px 60px;position:relative;z-index:2}.hero{padding:82px 0 40px}.hero-panel{position:relative;overflow:hidden;background:var(--surface);border:1px solid var(--line);border-radius:24px;padding:36px 36px 28px}.hero-panel::before{content:"";position:absolute;left:0;right:0;top:0;height:3px;background:linear-gradient(90deg,var(--a-violet),var(--a-cyan),var(--a-emerald))}.hero-grid{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(300px,.65fr);gap:28px;align-items:start}.hero-copy{min-width:0}.hero .eyebrow{margin-bottom:18px;display:inline-flex;align-items:center;gap:10px}.hero .eyebrow .dot{width:8px;height:8px;border-radius:50%;background:linear-gradient(135deg,var(--a-violet),var(--a-cyan));box-shadow:0 0 14px rgba(34,211,238,.55)}.hero h1{font-size:clamp(38px,5.4vw,74px);font-weight:600;line-height:1.02;letter-spacing:-.045em;max-width:12ch;text-wrap:balance}.hero p{margin-top:20px;max-width:62ch;font-size:clamp(15px,1.35vw,17px);line-height:1.65;color:var(--ink-dim)}.hero-nav{display:flex;gap:10px;flex-wrap:wrap;margin-top:26px}.hero-nav a{padding:10px 14px;border:1px solid var(--line);border-radius:999px;color:var(--ink-dim);font-family:var(--mono);font-size:11px;letter-spacing:.04em;text-decoration:none;transition:border-color .2s var(--ease),color .2s var(--ease)}.hero-nav a:hover,.hero-nav a.active{color:var(--ink);border-color:var(--a-cyan)}.hero-aside{display:grid;gap:14px}.acard,.card{position:relative;background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);padding:22px;overflow:hidden}.acard::before,.card::before{content:"";position:absolute;top:0;left:0;right:0;height:3px;background:var(--accent,linear-gradient(90deg,var(--a-violet),var(--a-cyan)));opacity:.9}.metric-chip{display:inline-flex;align-items:center;gap:7px;padding:6px 11px;border-radius:999px;border:1px solid var(--line);color:var(--ink-faint);font-family:var(--mono);font-size:10.5px;letter-spacing:.08em;text-transform:uppercase}.metric-chip::before{content:"";width:7px;height:7px;border-radius:50%;background:linear-gradient(135deg,var(--a-violet),var(--a-cyan))}.hero-aside h3,.card h3{font-size:18px;font-weight:600;line-height:1.25;margin:12px 0 8px}.hero-aside p,.card p{margin:0;color:var(--ink-dim);font-size:13.5px;line-height:1.6}.hero-mini-list{display:grid;gap:10px;list-style:none}.hero-mini-list li{padding:12px 0;border-top:1px solid var(--line-soft)}.hero-mini-list li:first-child{border-top:0;padding-top:0}.hero-mini-list strong{display:block;color:var(--ink);font-size:14px;line-height:1.35;margin-bottom:4px}.hero-mini-list span{display:block;color:var(--ink-dim);font-size:12.5px;line-height:1.55}.stat-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:14px;margin-top:26px}.stat{padding:18px 20px;background:var(--surface-2);border:1px solid var(--line);border-radius:14px}.stat label{display:block;font-family:var(--mono);font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--a-emerald);margin-bottom:10px}.stat strong{display:block;font-size:clamp(28px,3.3vw,40px);font-weight:600;letter-spacing:-.04em;line-height:1}.stat span{display:block;margin-top:9px;color:var(--ink-dim);font-size:13px;line-height:1.55}.sec{padding:70px 0;border-top:1px solid var(--line-soft)}.sec-head{display:flex;gap:18px;align-items:baseline;margin-bottom:34px;flex-wrap:wrap}.sec-num{font-family:var(--mono);font-size:12px;letter-spacing:.1em;background:linear-gradient(120deg,var(--a-violet),var(--a-cyan));-webkit-background-clip:text;background-clip:text;color:transparent}.sec-title{font-size:clamp(24px,3vw,38px);font-weight:600;letter-spacing:-.03em;line-height:1.08}.sec-lead{color:var(--ink-dim);max-width:58ch;font-size:16px;line-height:1.6;margin-top:6px}.card-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.lane-card{display:flex;flex-direction:column;gap:12px;min-height:100%}.lane-card h3{font-size:18px;font-weight:600;line-height:1.2}.lane-meta{display:grid;gap:6px}.lane-meta p{margin:0;color:var(--ink-dim);font-size:13.5px;line-height:1.55}.lane-meta strong{color:var(--ink)}.lane-copy{margin-top:2px;color:var(--ink-dim);font-size:14px;line-height:1.6}.tag{display:inline-flex;align-items:center;padding:5px 10px;border-radius:999px;font-family:var(--mono);font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;border:1px solid var(--line);width:max-content}.tag.healthy{color:var(--a-emerald);border-color:color-mix(in srgb,var(--a-emerald) 38%,transparent);background:color-mix(in srgb,var(--a-emerald) 12%,transparent)}.tag.watch{color:var(--a-amber);border-color:color-mix(in srgb,var(--a-amber) 38%,transparent);background:color-mix(in srgb,var(--a-amber) 12%,transparent)}.tag.critical{color:var(--a-coral);border-color:color-mix(in srgb,var(--a-coral) 38%,transparent);background:color-mix(in srgb,var(--a-coral) 12%,transparent)}.table-wrap{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);padding:18px 20px 20px;position:relative;overflow:hidden}.table-wrap::before{content:"";position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--a-cyan),var(--a-violet));opacity:.9}table{width:100%;border-collapse:collapse;font:13.5px/1.55 var(--font)}th,td{text-align:left;padding:12px 10px;border-bottom:1px solid var(--line-soft);vertical-align:top;color:var(--ink)}th{font-family:var(--mono);font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-faint)}tbody tr:last-child td{border-bottom:0}tbody tr:hover{background:var(--surface-2)}td strong{color:var(--ink)}.route-list{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px}.route-list span{font-family:var(--mono);font-size:11px;letter-spacing:.04em;color:var(--a-cyan);border:1px solid color-mix(in srgb,var(--a-cyan) 30%,transparent);background:color-mix(in srgb,var(--a-cyan) 8%,transparent);border-radius:999px;padding:7px 11px}.verification-list{display:grid;gap:12px;list-style:none}.verification-list li{padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:var(--surface-2);color:var(--ink-dim);line-height:1.6}.code-block{margin-top:18px;white-space:pre-wrap;overflow-wrap:anywhere;color:var(--ink-dim);background:rgba(7,17,29,.75);border:1px solid rgba(125,196,255,.12);border-radius:18px;padding:18px;font-family:var(--mono);font-size:12.5px;line-height:1.65}.foot-tag{max-width:38ch;color:var(--ink-dim);font-size:14.5px;line-height:1.6;margin-top:14px}.foot-cols{display:flex;gap:48px;flex-wrap:wrap}.foot-col h4{font-family:var(--mono);font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-faint);margin-bottom:14px}.foot-col a{display:block;color:var(--ink-dim);text-decoration:none;font-size:13.5px;margin-bottom:8px}.foot-bot{display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap;padding-top:22px;border-top:1px solid var(--line-soft);font-family:var(--mono);font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-faint)}footer{border-top:1px solid var(--line-soft);padding:44px 0 32px;position:relative;z-index:2;margin-top:48px}.foot-top{display:flex;justify-content:space-between;align-items:flex-start;gap:32px;flex-wrap:wrap;margin-bottom:32px}.cols-2{display:grid;grid-template-columns:1fr 1fr;gap:18px}@media(max-width:1080px){.hero-grid{grid-template-columns:1fr}.card-grid{grid-template-columns:repeat(2,1fr)}.stat-grid,.cols-2{grid-template-columns:repeat(2,1fr)}}@media(max-width:880px){.menu-btn{display:grid}.nav-links{position:absolute;top:68px;left:0;right:0;flex-direction:column;align-items:flex-start;background:var(--ground);border-bottom:1px solid var(--line);padding:20px 28px;gap:18px;display:none}.nav-links.open{display:flex}}@media(max-width:760px){.hero h1{max-width:100%;font-size:clamp(34px,11vw,56px)}.card-grid,.stat-grid,.cols-2{grid-template-columns:1fr}.shell{padding:0 18px 46px}.wrap{padding:0 18px}}`;

const THEME_JS = `(function(){var key='kg-theme';var saved=null;try{saved=localStorage.getItem(key)}catch(e){}var t=saved||'dark';document.documentElement.setAttribute('data-theme',t);document.addEventListener('DOMContentLoaded',function(){var btn=document.getElementById('themeBtn');if(btn){btn.addEventListener('click',function(){var cur=document.documentElement.getAttribute('data-theme');var n=cur==='dark'?'light':'dark';document.documentElement.setAttribute('data-theme',n);try{localStorage.setItem(key,n)}catch(e){}})}var m=document.getElementById('menuBtn');if(m){m.addEventListener('click',function(){var nl=document.querySelector('.nav-links');if(nl){nl.classList.toggle('open')}})}})})();`;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function navLink(href: string, label: string, activePath: string) {
  return `<a${href === activePath ? ' class="active"' : ""} href="${href}">${label}</a>`;
}

function routeNav(activePath: string) {
  return [
    ["/", "Overview"],
    ["/event-contracts", "Event contracts"],
    ["/payload-lane", "Payload lane"],
    ["/verification", "Verification"],
    ["/docs", "Docs"]
  ]
    .map(([href, label]) => navLink(href, label, activePath))
    .join("");
}

function pageFrame(title: string, description: string, activePath: string, body: string) {
  const canonical = activePath === "/" ? `${domain}/` : `${domain}${activePath}/`;

  return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>${escapeHtml(title)} · Kinetic Gain</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <meta name="theme-color" content="#0A0B11" />
  <meta name="referrer" content="strict-origin-when-cross-origin" />
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'; upgrade-insecure-requests" />
  <link rel="canonical" href="${canonical}" />
  <link rel="icon" type="image/svg+xml" href="${KG_FAVICON_DATA_URI}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Kinetic Gain" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <style>${BASE_CSS}</style>
</head>
<body>
  <header>
    <div class="wrap nav">
      <a class="kg-logo" href="/" aria-label="Kinetic Gain — GTM Datalayer Standards">
        ${KG_MARK_SVG}
        <span class="kg-word">Kinetic Gain</span>
      </a>
      <nav class="nav-links" id="primaryNav">${routeNav(activePath)}</nav>
      <div class="nav-right">
        <button class="theme-btn" id="themeBtn" aria-label="Toggle theme">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
        </button>
        <button class="menu-btn" id="menuBtn" aria-label="Menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
    </div>
  </header>
  <main class="shell">${body}</main>
  <footer>
    <div class="wrap">
      <div class="foot-top">
        <div>
          <a class="kg-logo" href="/" aria-label="Kinetic Gain">${KG_MARK_SVG}<span class="kg-word">Kinetic Gain</span></a>
          <p class="foot-tag">GTM Datalayer Standards keeps event contracts, payload integrity, and downstream analytics capture visible in one operator surface. Static demo data only.</p>
        </div>
        <div class="foot-cols">
          <div class="foot-col">
            <h4>Surface</h4>
            <a href="${domain}/">Overview</a>
            <a href="${domain}/event-contracts/">Event contracts</a>
            <a href="${domain}/payload-lane/">Payload lane</a>
          </div>
          <div class="foot-col">
            <h4>Links</h4>
            <a href="${domain}/">${domain.replace("http://", "")}</a>
            <a href="https://github.com/mizcausevic-dev/gtm-datalayer-standards">GitHub repo</a>
            <a href="https://www.linkedin.com/in/mirzacausevic/">LinkedIn</a>
            <a href="https://kineticgain.com/">Kinetic Gain</a>
          </div>
        </div>
      </div>
      <div class="foot-bot">
        <span>${productTitle}</span>
        <span>Style01 · analytics contract governance</span>
      </div>
    </div>
  </footer>
  <script>${THEME_JS}</script>
</body>
</html>`;
}

export function renderOverview() {
  const stats = summary();
  const riskyContracts = eventContracts().filter((contract) => contract.health !== "healthy");

  return pageFrame(
    productTitle,
    "Board-ready surface for GTM dataLayer governance, event-contract discipline, and analytics-capture integrity.",
    "/",
    `<section class="hero">
      <div class="hero-panel">
        <div class="hero-grid">
          <div class="hero-copy">
            <span class="eyebrow"><span class="dot"></span>Digital intelligence</span>
            <h1>Where is dataLayer drift quietly breaking attribution, routing, and monetization trust?</h1>
            <p>GTM Datalayer Standards keeps event completeness, payload quality, and downstream system handoff visible in one control plane so Growth, Analytics, and RevOps can standardize collection before reporting and CRM views disagree.</p>
            <div class="hero-nav">${routeNav("/")}</div>
            <div class="stat-grid">
              <div class="stat"><label>Events</label><strong>${stats.eventCount}</strong><span>Tracked contracts across pricing, forms, assessments, and demo flows.</span></div>
              <div class="stat"><label>Coverage</label><strong>${stats.averageCoveragePct}%</strong><span>Average required-field coverage across the active event catalog.</span></div>
              <div class="stat"><label>Integrity</label><strong>${stats.averageIntegrityScore}</strong><span>Average payload integrity score across modeled session scenarios.</span></div>
              <div class="stat"><label>Healthy contracts</label><strong>${stats.healthyContracts}</strong><span>Contracts already carrying enough context for trusted downstream use.</span></div>
              <div class="stat"><label>Critical failures</label><strong>${stats.criticalFailures}</strong><span>Breaks still distorting revenue and attribution truth.</span></div>
            </div>
          </div>
          <aside class="hero-aside">
            <div class="acard">
              <span class="metric-chip">Board takeaway</span>
              <h3>What to fix first</h3>
              <p>${escapeHtml(stats.recommendation)}</p>
            </div>
            <div class="acard">
              <span class="metric-chip">Watch list</span>
              <ul class="hero-mini-list">
                ${riskyContracts
                  .map(
                    (contract) =>
                      `<li><strong>${escapeHtml(contract.event)}</strong><span>${contract.fieldCoveragePct}% coverage · ${escapeHtml(contract.explanation)}</span></li>`
                  )
                  .join("")}
              </ul>
            </div>
            <div class="acard">
              <span class="metric-chip">Failure lanes</span>
              <ul class="hero-mini-list">
                ${failureModes()
                  .map(
                    (failure) =>
                      `<li><strong>${escapeHtml(failure.lane)}</strong><span>${escapeHtml(failure.brokenField)} · ${escapeHtml(failure.businessImpact)}</span></li>`
                  )
                  .join("")}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
    <section class="sec">
      <div class="sec-head">
        <span class="sec-num">01</span>
        <div>
          <h2 class="sec-title">Contract posture</h2>
          <p class="sec-lead">Make required fields, route ownership, and downstream dependency explicit so collection problems are treated as operating risk instead of dashboard noise.</p>
        </div>
      </div>
      <div class="card-grid">
        ${eventContracts()
          .slice(0, 3)
          .map(
            (contract) => `<article class="acard lane-card">
              <span class="tag ${escapeHtml(contract.health)}">${escapeHtml(contract.health)}</span>
              <h3>${escapeHtml(contract.event)}</h3>
              <div class="lane-meta">
                <p><strong>Primary route:</strong> ${escapeHtml(contract.primaryRoute)}</p>
                <p><strong>Downstream:</strong> ${escapeHtml(contract.downstreamSystem)}</p>
                <p><strong>Required fields:</strong> ${escapeHtml(contract.requiredFields.join(", "))}</p>
                <p><strong>Coverage:</strong> ${contract.fieldCoveragePct}%</p>
              </div>
              <p class="lane-copy">${escapeHtml(contract.explanation)}</p>
            </article>`
          )
          .join("")}
      </div>
    </section>`
  );
}

export function renderEventContracts() {
  return pageFrame(
    `${productTitle} — Event Contracts`,
    "Required fields, route ownership, downstream systems, and coverage by GTM event contract.",
    "/event-contracts",
    `<section class="hero">
      <div class="hero-panel">
        <div class="hero-grid">
          <div class="hero-copy">
            <span class="eyebrow"><span class="dot"></span>Event contracts</span>
            <h1>Every event should arrive with enough commercial context to survive its handoff into analytics, CRM, and the warehouse.</h1>
            <p>This route compares required fields, downstream systems, and contract health so teams can standardize event payloads before collection drift becomes reporting debt.</p>
            <div class="hero-nav">${routeNav("/event-contracts")}</div>
          </div>
          <aside class="hero-aside">
            <div class="acard">
              <span class="metric-chip">Contract logic</span>
              <p>Required fields, route owners, and downstream dependencies stay in the same view so missing context can be fixed at the source instead of patched downstream.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
    <section class="sec">
      <div class="table-wrap">
        <table>
          <thead><tr><th>Event</th><th>Required fields</th><th>Route</th><th>Downstream</th><th>Coverage</th><th>Health</th></tr></thead>
          <tbody>
            ${eventContracts()
              .map(
                (contract) =>
                  `<tr><td><strong>${escapeHtml(contract.event)}</strong></td><td>${escapeHtml(contract.requiredFields.join(", "))}</td><td>${escapeHtml(contract.primaryRoute)}</td><td>${escapeHtml(contract.downstreamSystem)}</td><td>${contract.fieldCoveragePct}%</td><td><span class="tag ${escapeHtml(contract.health)}">${escapeHtml(contract.health)}</span></td></tr>`
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </section>`
  );
}

export function renderPayloadLane() {
  return pageFrame(
    `${productTitle} — Payload Lane`,
    "Scenario trigger, campaign context, key payload fields, and integrity score by GTM payload lane.",
    "/payload-lane",
    `<section class="hero">
      <div class="hero-panel">
        <div class="hero-grid">
          <div class="hero-copy">
            <span class="eyebrow"><span class="dot"></span>Payload lane</span>
            <h1>Payload quality decides whether channel cost, buyer intent, and routing logic stay tied together all the way downstream.</h1>
            <p>This route compares session scenarios by trigger, key fields, campaign context, and integrity score so teams can see where payload discipline is strong and where it is still too fragile.</p>
            <div class="hero-nav">${routeNav("/payload-lane")}</div>
          </div>
          <aside class="hero-aside">
            <div class="acard">
              <span class="metric-chip">Payload logic</span>
              <p>Triggers, key fields, and campaign context stay in the same view so analysts can debug lost attribution as an operating failure instead of a reporting mystery.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
    <section class="sec">
      <div class="card-grid">
        ${payloadLane()
          .map(
            (scenario) => `<article class="acard lane-card">
              <span class="tag ${escapeHtml(scenario.health)}">${escapeHtml(scenario.health)}</span>
              <h3>${escapeHtml(scenario.scenario)}</h3>
              <div class="lane-meta">
                <p><strong>Trigger:</strong> ${escapeHtml(scenario.trigger)}</p>
                <p><strong>Event:</strong> ${escapeHtml(scenario.event)}</p>
                <p><strong>Campaign context:</strong> ${escapeHtml(scenario.campaignContext)}</p>
                <p><strong>Integrity:</strong> ${scenario.integrityScore}</p>
              </div>
              <p class="lane-copy">${escapeHtml(scenario.explanation)}</p>
            </article>`
          )
          .join("")}
      </div>
    </section>`
  );
}

export function renderVerification() {
  return pageFrame(
    `${productTitle} — Verification`,
    "Verification claims for GTM dataLayer contract quality, payload integrity, and business-facing failure visibility.",
    "/verification",
    `<section class="hero">
      <div class="hero-panel">
        <div class="hero-grid">
          <div class="hero-copy">
            <span class="eyebrow"><span class="dot"></span>Verification</span>
            <h1>Collection governance should be provable, not just assumed because tags happen to fire.</h1>
            <p>This route captures the product’s verification claims and the public API surfaces that back the control plane.</p>
            <div class="hero-nav">${routeNav("/verification")}</div>
          </div>
          <aside class="hero-aside">
            <div class="acard">
              <span class="metric-chip">Route set</span>
              <div class="route-list">
                <span>/</span><span>/event-contracts</span><span>/payload-lane</span><span>/verification</span><span>/docs</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
    <section class="sec">
      <div class="card-grid">
        ${verification()
          .map(
            (item) => `<article class="acard lane-card">
              <span class="metric-chip">Verified claim</span>
              <p class="lane-copy">${escapeHtml(item)}</p>
            </article>`
          )
          .join("")}
      </div>
    </section>`
  );
}

export function renderDocs() {
  return pageFrame(
    `${productTitle} — Docs`,
    "Architecture, routes, APIs, and local verification commands for GTM Datalayer Standards.",
    "/docs",
    `<section class="hero">
      <div class="hero-panel">
        <div class="hero-grid">
          <div class="hero-copy">
            <span class="eyebrow"><span class="dot"></span>Docs</span>
            <h1>Implementation notes, route map, and validation commands for the dataLayer governance surface.</h1>
            <p>Use this page to inspect the route vocabulary, JSON endpoints, and the exact local commands used to regenerate static output and proof assets.</p>
            <div class="hero-nav">${routeNav("/docs")}</div>
          </div>
          <aside class="hero-aside">
            <div class="acard">
              <span class="metric-chip">Routes</span>
              <div class="route-list">
                <span>/</span><span>/event-contracts</span><span>/payload-lane</span><span>/verification</span><span>/docs</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
    <section class="sec">
      <div class="cols-2">
        <article class="card">
          <h3>Public API</h3>
          <ul class="verification-list">
            <li><code>/api/dashboard/summary</code></li>
            <li><code>/api/event-contracts</code></li>
            <li><code>/api/payload-lane</code></li>
            <li><code>/api/failure-modes</code></li>
            <li><code>/api/verification</code></li>
            <li><code>/api/sample</code></li>
          </ul>
        </article>
        <article class="card">
          <h3>Local commands</h3>
          <div class="code-block">npm install
npm run verify
powershell -ExecutionPolicy Bypass -File .\\scripts\\render_readme_assets.ps1</div>
          <p class="section-copy">Primary documentation lives in <code>docs/architecture.md</code> and <code>docs/ORIGIN.md</code>.</p>
        </article>
      </div>
    </section>`
  );
}
