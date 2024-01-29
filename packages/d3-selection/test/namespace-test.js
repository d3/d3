import assert from "assert";
import {namespace, namespaces} from "../src/index.js";

it("namespace(name) returns name if there is no namespace prefix", () => {
  assert.strictEqual(namespace("foo"), "foo");
  assert.strictEqual(namespace("foo:bar"), "bar");
});

it("namespace(name) coerces name to a string", () => {
  assert.strictEqual(namespace({toString: function() { return "foo"; }}), "foo");
  assert.deepStrictEqual(namespace({toString: function() { return "svg"; }}), {space: "http://www.w3.org/2000/svg", local: "svg"});
});

it("namespace(name) returns the expected values for built-in namespaces", () => {
  assert.deepStrictEqual(namespace("svg"), {space: "http://www.w3.org/2000/svg", local: "svg"});
  assert.deepStrictEqual(namespace("xhtml"), {space: "http://www.w3.org/1999/xhtml", local: "xhtml"});
  assert.deepStrictEqual(namespace("xlink"), {space: "http://www.w3.org/1999/xlink", local: "xlink"});
  assert.deepStrictEqual(namespace("xml"), {space: "http://www.w3.org/XML/1998/namespace", local: "xml"});
  assert.deepStrictEqual(namespace("svg:g"), {space: "http://www.w3.org/2000/svg", local: "g"});
  assert.deepStrictEqual(namespace("xhtml:b"), {space: "http://www.w3.org/1999/xhtml", local: "b"});
  assert.deepStrictEqual(namespace("xlink:href"), {space: "http://www.w3.org/1999/xlink", local: "href"});
  assert.deepStrictEqual(namespace("xml:lang"), {space: "http://www.w3.org/XML/1998/namespace", local: "lang"});
});

it("namespace(\"xmlns:…\") treats the whole name as the local name", () => {
  assert.deepStrictEqual(namespace("xmlns:xlink"), {space: "http://www.w3.org/2000/xmlns/", local: "xmlns:xlink"});
});

it("namespace(name) observes modifications to namespaces", () => {
  namespaces.d3js = "https://d3js.org/2016/namespace";
  assert.deepStrictEqual(namespace("d3js:pie"), {space: "https://d3js.org/2016/namespace", local: "pie"});
  delete namespaces.d3js;
  assert.strictEqual(namespace("d3js:pie"), "pie");
});
