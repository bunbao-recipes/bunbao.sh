/**
 * Router
 * DISCLAMER: we are not using bun router to be compatable with node and deno
 * @todo make router fully compatable with bun router
 */

import { readdirSync } from "node:fs";
import { cwd, log } from "../misc.mjs";
import { throwIf } from "../utils/throwIf.mjs";
import { join, parse } from "node:path";
import { say } from "../utils/say.mjs";
import { debug } from "../cologger.mjs";

/**
 * sortByLengthDesc
 * @param {object} a
 * @param {object} b
 */
function sortByLengthDesc(a, b) {
	return b.templatePathname.length - a.templatePathname.length;
}

/**
 *
 * @param {string} dir
 * @returns {array}
 */
function readdirRecursive(dir) {
	const dirEnts = readdirSync(dir, { withFileTypes: true });
	let files = [];
	for (const ent of dirEnts) {
		if (ent.isDirectory()) {
			const subdir = readdirRecursive(join(dir, ent.name));
			files = files.concat(...subdir);
			continue;
		}
		files.push(join(dir, ent.name));
	}
	return files;
}

/**
 * Router
 */
export class Router {
	routes = [];
	cache = {};

	_routesIdx = {};

	/**
	 * adds route
	 * @param {string} templatePathname
	 * @param {object} handler GET, POST, DELETE, OPTION etc methods
	 * @returns {Router}
	 */
	addRoute(templatePathname, handler = {}, opts = {}) {
		throwIf.defined(
			this._routesIdx[templatePathname],
			say.duplicated("route", templatePathname)
		);

		const regexStr = `^${templatePathname.replace(
			/\/:([^/.]+)/gi,
			"/(?<$1>[^/]+)"
		)}$`;
		const regex = new RegExp(regexStr, "i");

		this._routesIdx[templatePathname] = {
			templatePathname,
			regex,
			regexStr,
			handler,
			opts,
		};
		this.routes.push(this._routesIdx[templatePathname]);
		this.routes = this.routes.sort(sortByLengthDesc);

		return this;
	}

	/**
	 * reads routes from file system
	 * @param {string} dir
	 */
	async readFromFs(dir) {
		dir = join(dir); // normalization. do not remove.
		const files = readdirRecursive(dir);
		const formats = ["mjs", "jsx", "ts", "tsx"];
		for (const file of files) {
			const tokens = file.split(".");
			const format = tokens.pop();
			const routePath = tokens.join(".");
			const pathObj = parse(routePath);
			const route = routePath.replace(dir, "");
			throwIf.notInArray(format, formats, `not in array ${format}`);
			const handler = await import(file);

			this.addRoute(route, handler, {
				fs: {
					file,
					format,
				},
			});
		}
		return this;
	}

	/**
	 * matches url
	 * @param {string} url
	 * @returns {object|null} match or null
	 */
	match(uri) {
		// route.regex.exec(uri)?.groups
		for (const route of this.routes) {
			const match = route.regex.exec(uri.trim());
			if (match) {
				return {
					uri,
					route,
					params: match.groups || {},
				};
			}
		}
		return null;
	}
}
