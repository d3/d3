import assert from "assert";
import {create} from "../src/index.js";
import it from "./jsdom.js";

it("create(name) returns a new HTML element with the given name", () => {
  const h1 = create("h1");
  assert.strictEqual(h1._groups[0][0].namespaceURI, "http://www.w3.org/1999/xhtml");
  assert.strictEqual(h1._groups[0][0].tagName, "H1");
  assert.deepStrictEqual(h1._parents, [null]);
});

it("create(name) returns a new SVG element with the given name", () => {
  const svg = create("svg");
  assert.strictEqual(svg._groups[0][0].namespaceURI, "http://www.w3.org/2000/svg");
  assert.strictEqual(svg._groups[0][0].tagName, "svg");
  assert.deepStrictEqual(svg._parents, [null]);
});
