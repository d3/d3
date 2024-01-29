import assert from "assert";
import {selector} from "../src/index.js";
import it from "./jsdom.js";

it("selector(selector).call(element) returns the first element that matches the selector", "<body class='foo'>", () => {
  assert.strictEqual(selector("body").call(document.documentElement), document.body);
  assert.strictEqual(selector(".foo").call(document.documentElement), document.body);
  assert.strictEqual(selector("body.foo").call(document.documentElement), document.body);
  assert.strictEqual(selector("h1").call(document.documentElement), null);
  assert.strictEqual(selector("body.bar").call(document.documentElement), null);
});

it("selector(null).call(element) always returns undefined", "<body class='foo'><undefined></undefined><null></null>", () => {
  assert.strictEqual(selector().call(document.documentElement), undefined);
  assert.strictEqual(selector(null).call(document.documentElement), undefined);
  assert.strictEqual(selector(undefined).call(document.documentElement), undefined);
});
