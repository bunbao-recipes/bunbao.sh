import { join } from "node:path";
import { Bao } from "./bao.mjs";
import { log } from "../misc.mjs";
import { awd } from "../utils/awd.mjs";
import { Router } from "./router.mjs";
import { throwIf } from "../utils/throwIf.mjs";
import { existsSync } from "node:fs";
import { error } from "../cologger.mjs";

export async function readSiteConfig(name) {
	const configPath = join(Bao.sitesDir, name, "config.mjs");
	if (!existsSync(configPath)) {
		error(configPath);
	}
	const config = (await import(configPath)).default;
	const dir = join(Bao.sitesDir, name);
	const router = new Router();
	router.readFromFs(join(dir, "routes"));
	const fullConfig = {
		name,
		dir,
		hosts: [],
		router,
		...config,
	};
	return fullConfig;
}
