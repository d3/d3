import assert from "assert";
import {select} from "../../src/index.js";
import it from "../jsdom.js";

it("selection.call(function) calls the specified function, passing the selection", () => {
  let result;
  const s = select(document);
  assert.strictEqual(s.call((s) => { result = s; }), s);
  assert.strictEqual(result, s);
});

it("selection.call(function, arguments…) calls the specified function, passing the additional arguments", () => {
  const result = [];
  const foo = {};
  const bar = {};
  const s = select(document);
  assert.strictEqual(s.call((s, a, b) => { result.push(s, a, b); }, foo, bar), s);
  assert.deepStrictEqual(result, [s, foo, bar]);
});
