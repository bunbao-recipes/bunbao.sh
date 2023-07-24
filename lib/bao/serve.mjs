import { join } from "node:path";
import { parse } from "node:url";
import { readSiteConfig } from "./readSiteConfig.mjs";
import { throwIf } from "../utils/throwIf.mjs";
import { getSites } from "./getSites.mjs";
import { say } from "../utils/say.mjs";
import { renderToReadableStream } from "react-dom/server";
import { debug, error, log } from "../cologger.mjs";
import { NOT_FOUND, err } from "../utils/err.mjs";
import React from "react";
const port = 3000;

export class BaoResponse {
	status = 404;
	headers = {
		"content-type": "text/plain",
	};
	data;
	async setData(data) {
		this.status = 200;

		if (typeof data === "string") {
			this.data = data;
			return this;
		}

		if (React.isValidElement(data)) {
			this.headers["content-type"] = "text/html";
			this.data = await renderToReadableStream(data);
			return this;
		}

		if (typeof data === "object") {
			debug("setting json data");
			this.headers["content-type"] = "application/json";
			this.data = JSON.stringify(data);
			return this;
		}
	}
	getResponse() {
		let data;

		return new Response(this.data || "not found", {
			status: this.status,
			headers: this.headers,
		});
	}
}

export class BaoContext {
	resp = new BaoResponse();
	req;
	params = {};
	constructor(request) {
		this.req = request;
	}
}

export async function serve() {
	const sites = getSites();
	const configs = await Promise.all(sites.map(readSiteConfig));
	const host2config = {};
	for (const cfg of configs) {
		for (const hst of cfg.hosts) {
			throwIf.defined(host2config[hst], say.duplicated("host", hst));
			host2config[hst] = cfg;
		}
	}

	Bun.serve({
		port,
		development: false,

		async fetch(req) {
			const url = parse(req.url);
			const config = host2config[url.hostname];
			throwIf.notTruthy(config, say.unknown("host", url.hostname));

			const pathname =
				url.pathname.slice(-1) === "/" ? url.pathname + "index" : url.pathname;
			const [path, format] = pathname.split(".");
			const staticFilePath = join(
				config.dir,
				"static",
				format ? pathname : `${pathname}.html`
			);
			const staticFile = Bun.file(staticFilePath);

			if (await staticFile.exists()) {
				return new Response(staticFile);
			}

			const ctx = new BaoContext(req);
			const match = config.router.match(pathname);
			ctx.params = match?.params || {};
			const result = match?.route.handler[req.method](ctx);

			if (result instanceof Response) {
				return result;
			}

			if (result instanceof BaoContext === true) {
				return result.resp.getResponse();
			}

			if (result !== undefined) {
				await ctx.resp.setData(result);
				return ctx.resp.getResponse();
			}

			return ctx.resp.getResponse();
		},

		error(error) {
			return new Response(`${error.stack}`, {
				status: 500,
				headers: {
					"Content-Type": "text/plain",
				},
			});
		},
	});

	const getConfigByHost = (host) => {
		return host2config[host] || err(`unknown host`, { host });
	};

	return {
		getConfigByHost,
	};
}
