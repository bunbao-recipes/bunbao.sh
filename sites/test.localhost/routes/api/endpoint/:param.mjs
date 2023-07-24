import { debug } from "../../../../../lib/cologger.mjs";

export function GET(ctx) {
	return ctx.params.param;
}

export function POST(ctx) {
	return `POST ${ctx.params.param}`;
}
