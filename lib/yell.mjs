/**
 *
 * @param {string} what
 * @param {Array} params
 */
export function yell(what, ...params) {
	for (const p of params) {
		what = what.replace("%%", typeof p === "string" ? `"${p}"` : p);
	}
	return what.toLowerCase();
}
