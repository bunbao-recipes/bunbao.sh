import { execSync } from "node:child_process";
import { configureNginx } from "./lib/bao/configureNginx.mjs";
import { getSites } from "./lib/bao/getSites.mjs";
import { init } from "./lib/bao/init.mjs";
import { Router } from "./lib/bao/router.mjs";
import { serve } from "./lib/bao/serve.mjs";
import { error, debug, info, warn, log } from "./lib/cologger.mjs";
import { pwd } from "./lib/utils/pwd.mjs";

init();

await configureNginx();
await serve();
