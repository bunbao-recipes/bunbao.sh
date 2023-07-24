/**
 *
 */

import { describe, it, expect, test as bunTest, beforeEach } from "bun:test";

export { describe, it, expect, beforeEach };

export const epic = describe;
export const feat = describe;
export const testlist = describe;
export const todo = bunTest.todo;

export function test(name, fn) {
	fn ? bunTest(name, fn) : todo(name, () => {});
}
