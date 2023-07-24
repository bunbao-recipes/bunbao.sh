#!/usr/bin/env bun

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { log } from "bao/lib/misc.mjs";
import { throwIf } from "../lib/utils/throwIf.mjs";
import { yell } from "../lib/yell.mjs";

const cwd = process.cwd();
const argv = process.argv;

const site = {};
site.dirs = {};
site.files = {};
site.name = argv[2];
site.dirs.root = join(cwd, "sites", site.name);
site.dirs.routes = join(site.dirs.root, "routes");
site.dirs.static = join(site.dirs.root, "static");
site.files.config = join(site.dirs.root, "config.mjs");

const main = () => {
	throwIf.undefined(site.name, "site not defined use: bao-site siteName");
	//throwIf.exists(site.dirs.root);

	!existsSync(site.dirs.root) && mkdirSync(site.dirs.root);
	!existsSync(site.dirs.static) && mkdirSync(site.dirs.static);
	!existsSync(site.dirs.routes) && mkdirSync(site.dirs.routes);
	!existsSync(site.files.config) &&
		writeFileSync(
			site.files.config,
			`
export default {
	hosts: ['${site.name}.loc']
}
		`.trim(),
			"utf-8"
		);
	log(yell("site %% initialized %%", site.name, "huy"));
};

main();
