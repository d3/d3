import assert from "assert";
import {creator} from "../src/index.js";
import it from "./jsdom.js";

it("creator(name).call(element) returns a new element with the given name", "<body class='foo'>", () => {
  assert.deepStrictEqual(type(creator("h1").call(document.body)), {namespace: "http://www.w3.org/1999/xhtml", name: "H1"});
  assert.deepStrictEqual(type(creator("xhtml:h1").call(document.body)), {namespace: "http://www.w3.org/1999/xhtml", name: "H1"});
  assert.deepStrictEqual(type(creator("svg").call(document.body)), {namespace: "http://www.w3.org/2000/svg", name: "svg"});
  assert.deepStrictEqual(type(creator("g").call(document.body)), {namespace: "http://www.w3.org/1999/xhtml", name: "G"});
});

it("creator(name).call(element) can inherit the namespace from the given element", "<body class='foo'><svg></svg>", () => {
  const svg = document.querySelector("svg");
  assert.deepStrictEqual(type(creator("g").call(document.body)), {namespace: "http://www.w3.org/1999/xhtml", name: "G"});
  assert.deepStrictEqual(type(creator("g").call(svg)), {namespace: "http://www.w3.org/2000/svg", name: "g"});
});

function type(element) {
  return {namespace: element.namespaceURI, name: element.tagName};
}
