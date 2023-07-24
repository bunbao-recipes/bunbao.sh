import { debug } from "../../../lib/cologger.mjs";

export function GET() {
	throw new Error("test broken route");
}
