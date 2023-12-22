import assert from "assert";
import {window} from "../src/index.js";
import it from "./jsdom.js";

it("window(node) returns node.ownerDocument.defaultView", "", () => {
  assert.strictEqual(window(document.body), document.defaultView);
});

it("window(document) returns document.defaultView", "", () => {
  assert.strictEqual(window(document), document.defaultView);
});

it("window(window) returns window", "", () => {
  assert.strictEqual(window(global.window), global.window);
});
