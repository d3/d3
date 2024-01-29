import assert from "assert";
import {InternSet} from "internmap";

export function assertSetEqual(actual, expected) {
  assert(actual instanceof Set);
  expected = new InternSet(expected);
  for (const a of actual) assert(expected.has(a), `unexpected ${a}`);
  for (const e of expected) assert(actual.has(e), `expected ${e}`);
}
