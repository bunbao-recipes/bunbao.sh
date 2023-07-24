/**
 * Bunbao initialization
 */

import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { log } from "../misc.mjs";
import { pwd } from "../utils/pwd.mjs";
import { Bao } from "./bao.mjs";

const mkdirIfNotExists = (dir) => {
	!existsSync(dir) && mkdirSync(dir);
}

export const init = () => {
	mkdirIfNotExists(Bao.baoDir)
};