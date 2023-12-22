import assert from "assert";
import {matcher} from "../src/index.js";
import it from "./jsdom.js";

it("matcher(selector).call(element) returns true if the element matches the selector", "<body class='foo'>", () => {
  assert.strictEqual(matcher("body").call(document.body), true);
  assert.strictEqual(matcher(".foo").call(document.body), true);
  assert.strictEqual(matcher("body.foo").call(document.body), true);
  assert.strictEqual(matcher("h1").call(document.body), false);
  assert.strictEqual(matcher("body.bar").call(document.body), false);
});
