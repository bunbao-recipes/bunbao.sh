import { existsSync } from "node:fs";
function f(format = "", val) {
	return format.replace("%s", `"${val}"`);
}

export function throwIf(val, text = "Error") {
	if (val === true) {
		throw new Error(text);
	}
}

throwIf.notInArray = (val, array = [], text = "notInArray") => {
	throwIf(array.indexOf(val) === -1, f(text, val));
};

throwIf.notTruthy = (val, text = "notTruthy") => {
	throwIf([undefined, null, ""].indexOf(val) !== -1, f(text, val));
};

throwIf.defined = (val, text = "already defined") => {
	throwIf(val !== undefined, f(text, val));
};

throwIf.undefined = (val, text = "undefined") => {
	throwIf(val === undefined, f(text, val));
};

/**
 * throws if file exists
 * @param {string} path
 * @param {string} text
 */
throwIf.exists = (path, text = "path is exists") => {
	throwIf(existsSync(path), text);
};
