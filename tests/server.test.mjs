import { join } from "node:path";
import { serve } from "../lib/bao/serve.mjs";
import { debug, log } from "../lib/cologger.mjs";
import {
	describe,
	expect,
	test,
	todo,
	beforeEach,
	epic,
	feat,
} from "../lib/testRunner.mjs";
import { mkdirSync, rmSync, writeFileSync, existsSync } from "node:fs";
const server = await serve();

const testURLs = {
	localhost: "http://localhost:3000",
	test1Localhost: "http://test1.localhost:3000",
	unknownHost: "http://unknown.localhost:3000",
};

const fetchText = async (url) => {
	const resp = await fetch(url);
	return await resp.text();
};

const write = (path, content = "") => {
	return writeFileSync(path, content, "utf-8");
};

const mkdir = (path) => {
	return mkdirSync(path, { recursive: true });
};

function rm(path) {
	existsSync(path) && rmSync(path);
}

const createStaticFiles = () => {
	const config = server.getConfigByHost("test1.localhost");
	const staticPath = join(config.dir, "static");

	mkdir(join(staticPath, "dir"));
	write(join(staticPath, "index.html"), "index.html");
	write(join(staticPath, "index.css"), ":root {}");
	write(join(staticPath, "dir", "text.txt"), "text");
};

const cleanup = () => {
	const config = server.getConfigByHost("test1.localhost");
	const staticPath = join(config.dir, "static");

	rm(join(staticPath, "index.html"), "index.html");
	rm(join(staticPath, "index.css"), ":root {}");
	rm(join(staticPath, "dir", "text.txt"), "text");
};

beforeEach(async () => {
	//cleanup();
});

epic("server", async (d) => {
	feat("testsuite", async () => {
		await import("./server/dynamicRoutes/parametricRoutes.mjs");
	});

	feat("startup", async () => {
		test(`${testURLs.test1Localhost} runned on configured port`, async () => {
			const resp = await fetch(testURLs.localhost);
		});
	});

	feat("static files server", async () => {
		createStaticFiles();

		test("/index.html responses with 'index.html'", async () => {
			expect(await fetchText(testURLs.test1Localhost + "/index.html")).toBe(
				"index.html"
			);
		});

		test("/index.css responses with ':root {}'", async () => {
			expect(await fetchText(testURLs.test1Localhost + "/index.css")).toBe(
				":root {}"
			);
		});

		test("/dir/text.txt responses with 'text'", async () => {
			expect(await fetchText(testURLs.test1Localhost + "/dir/text.txt")).toBe(
				"text"
			);
		});
	});

	feat("dynamic routes server", async () => {
		// test("/", async (done) => {
		// 	cleanup();
		// 	log(testURLs);
		// 	const text = await fetch(`${testURLs.test1Localhost}`).then((resp) =>
		// 		resp.text()
		// 	);
		// 	expect(text).toBe("index.mjs");
		// 	done();
		// });

		test("/api/endpoint", async (done) => {
			const text = await fetchText(`${testURLs.test1Localhost}/api/endpoint`);
			expect(text).toBe("endpoint.mjs");
			done();
		});

		test("/endpoint/:param", async (done) => {
			const text = await fetchText(
				`${testURLs.test1Localhost}/api/endpoint/paramValue`
			);
			expect(text).toBe("paramValue");
			done();
		});
	});

	feat("routes with query", async () => {
		todo("routes serves well with query string", () => {});
	});

	feat("http methods", async () => {
		test("GET, POST, etc /api/endpoint/paramValue serves well", async () => {
			const resp = await fetch(
				`${testURLs.test1Localhost}/api/endpoint/paramValue`,
				{
					method: "POST",
				}
			);
			const text = await resp.text();
			expect(text).toBe("POST paramValue");
		});
	});

	describe("http statuses and headers", async () => {
		test("/notFound responses with 404", async (done) => {
			const resp = await fetch(`${testURLs.test1Localhost}/notFound`);
			expect(resp.status).toBe(404);
			done();
		});

		test("/route500 responses with status 500", async (done) => {
			const resp = await fetch(`${testURLs.test1Localhost}/route500`);
			expect(resp.status).toBe(500);
			done();
		});

		test("api routes responses with application/json", () => {});

		test("jsx routes responses with text/html", () => {});

		test("coustom routes responses with content-type='custom'", () => {});
	});

	describe("configuration", async () => {
		test('site without "config.mjs" file works well');
		test('site without "routes" dir works well');
		test('site without "static" dir works well');
		test("multi hosts");
	});

	describe("benchmark", async () => {
		test("/api/endpoint/paramValue handles 10 000 queries in less than 1 sec", async (done) => {
			const start = Date.now();
			for (let i = 0; i < 10; i++) {
				await fetch(`${testURLs.test1Localhost}/api/endpoint/paramValue`);
			}
			const time = Date.now() - start;
			expect(time).toBeLessThan(1_000);
			done();
		});
	});
});
