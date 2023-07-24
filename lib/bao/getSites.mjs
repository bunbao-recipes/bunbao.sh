import { readdirSync } from "node:fs";
import { Bao } from "./bao.mjs";

export function getSites() {
	const sitesDirs = readdirSync(Bao.sitesDir);
	return sitesDirs;
}
