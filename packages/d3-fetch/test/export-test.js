import assert from "assert";
import * as d3 from "../src/index.js";

it("fetch methods", () => {
  assert.strictEqual(typeof d3.blob, "function");
  assert.strictEqual(typeof d3.buffer, "function");
  assert.strictEqual(typeof d3.csv, "function");
  assert.strictEqual(typeof d3.dsv, "function");
  assert.strictEqual(typeof d3.html, "function");
  assert.strictEqual(typeof d3.image, "function");
  assert.strictEqual(typeof d3.json, "function");
  assert.strictEqual(typeof d3.svg, "function");
  assert.strictEqual(typeof d3.text, "function");
  assert.strictEqual(typeof d3.tsv, "function");
  assert.strictEqual(typeof d3.xml, "function");
});
