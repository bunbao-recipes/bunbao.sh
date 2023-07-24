import { test, beforeAll } from "bun:test";
import { serve } from "../../../lib/bao/serve.mjs";
import { TEST1_URL } from "../setup.mjs";
import { debug } from "../../../lib/cologger.mjs";

test("/api/endpoint/:param", async (done) => {
	const url = `${TEST1_URL}/api/endpoint/paramValue`;
	const res = await fetch(`${TEST1_URL}/api/endpoint/paramValue`);
	const txt = await res.text();
	done();
});
