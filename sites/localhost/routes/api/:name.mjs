import { BaoContext } from "../../../../lib/bao/serve.mjs";

/**
 *
 * @param { BaoContext } ctx
 * @returns
 */
export function GET(ctx) {
	return {
		":name": "name from localhost",
	};
}
