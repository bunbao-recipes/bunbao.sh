import { join } from "node:path";
import { cwd } from "../misc.mjs";

export const pwd = (...args) => join(cwd, ...args);