import { payload, summary } from "../src/services/datalayerService";

console.log("gtm-datalayer-standards demo");
console.log(JSON.stringify(summary(), null, 2));
console.log(JSON.stringify(payload().eventContracts, null, 2));
