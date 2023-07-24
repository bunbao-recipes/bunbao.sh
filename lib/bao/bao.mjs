import { join } from "node:path";
import { awd } from "../utils/awd.mjs";
import { cwd } from "../misc.mjs";

export const Bao = {
	baoDir: join(cwd, '.bao'),
	sitesDir: awd('sites')
}