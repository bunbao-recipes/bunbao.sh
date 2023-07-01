import path, { join } from "node:path";

const cwd = process.cwd();
const log = console.log;

Bun.serve({
	development: false,
	async fetch(req) {
		const url = new URL(req.url);
		const pathname =
			url.pathname.slice(-1) === "/"
				? `${url.pathname}index.html`
				: url.pathname;

		let filepath = join(cwd, "static", pathname);
		let file = Bun.file(filepath);

		if (await file.exists()) {
			return new Response(file);
		}

		return new Response("404", { status: 404 });
	},
});
