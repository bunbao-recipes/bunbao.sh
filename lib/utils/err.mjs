import { debug, error, log } from "../cologger.mjs";

export function err(type, data = {}) {
	error(type);
	log(data);
	throw new Error(type);
}

export const NOT_FOUND = "not found";
