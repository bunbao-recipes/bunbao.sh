import { readFileSync } from "node:fs";

export function importCSS(path) {
	return readFileSync(path, "utf-8");
}
