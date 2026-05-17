import express from "express";

import {
  eventContracts,
  failureModes,
  payload,
  payloadLane,
  summary,
  verification
} from "./services/datalayerService";
import {
  renderDocs,
  renderEventContracts,
  renderOverview,
  renderPayloadLane,
  renderVerification
} from "./services/render";

const app = express();
const port = Number(process.env.PORT ?? 5322);

app.get("/", (_req, res) => res.type("html").send(renderOverview()));
app.get("/event-contracts", (_req, res) => res.type("html").send(renderEventContracts()));
app.get("/payload-lane", (_req, res) => res.type("html").send(renderPayloadLane()));
app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
app.get("/api/event-contracts", (_req, res) => res.json(eventContracts()));
app.get("/api/payload-lane", (_req, res) => res.json(payloadLane()));
app.get("/api/failure-modes", (_req, res) => res.json(failureModes()));
app.get("/api/verification", (_req, res) => res.json(verification()));
app.get("/api/sample", (_req, res) => res.json(payload()));

if (require.main === module) {
  app.listen(port, "127.0.0.1", () => {
    console.log(`GTM Datalayer Standards listening on http://127.0.0.1:${port}`);
  });
}

export default app;
