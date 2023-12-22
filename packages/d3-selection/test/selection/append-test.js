import assert from "assert";
import {namespaces, select, selectAll, selection} from "../../src/index.js";
import {assertSelection} from "../asserts.js";
import it from "../jsdom.js";

it("selection.append(…) returns a selection", () => {
  assert(select(document.body).append("h1") instanceof selection);
});

it("selection.append(name) appends a new element of the specified name as the last child of each selected element", "<div id='one'><span class='before'></span></div><div id='two'><span class='before'></span></div>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const s = selectAll([one, two]).append("span");
  const three = one.querySelector("span:last-child");
  const four = two.querySelector("span:last-child");
  assertSelection(s, {groups: [[three, four]]});
});

it("selection.append(name) observes the specified namespace, if any", "<div id='one'></div><div id='two'></div>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const s = selectAll([one, two]).append("svg:g");
  const three = one.querySelector("g");
  const four = two.querySelector("g");
  assert.strictEqual(three.namespaceURI, "http://www.w3.org/2000/svg");
  assert.strictEqual(four.namespaceURI, "http://www.w3.org/2000/svg");
  assertSelection(s, {groups: [[three, four]]});
});

it("selection.append(name) uses createElement, not createElementNS, if the implied namespace is the same as the document", "<div id='one'></div><div id='two'></div>", () => {
  let pass = 0;
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const createElement = document.createElement;

  document.createElement = function() {
    ++pass;
    return createElement.apply(this, arguments);
  };

  const selection = selectAll([one, two]).append("P");
  const three = one.querySelector("p");
  const four = two.querySelector("p");
  assert.strictEqual(pass, 2);
  assertSelection(selection, {groups: [[three, four]]});
});

it("selection.append(name) observes the implicit namespace, if any", "<div id='one'></div><div id='two'></div>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const selection = selectAll([one, two]).append("svg");
  const three = one.querySelector("svg");
  const four = two.querySelector("svg");
  assert.strictEqual(three.namespaceURI, "http://www.w3.org/2000/svg");
  assert.strictEqual(four.namespaceURI, "http://www.w3.org/2000/svg");
  assertSelection(selection, {groups: [[three, four]]});
});

it("selection.append(name) observes the inherited namespace, if any", "<div id='one'></div><div id='two'></div>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const selection = selectAll([one, two]).append("svg").append("g");
  const three = one.querySelector("g");
  const four = two.querySelector("g");
  assert.strictEqual(three.namespaceURI, "http://www.w3.org/2000/svg");
  assert.strictEqual(four.namespaceURI, "http://www.w3.org/2000/svg");
  assertSelection(selection, {groups: [[three, four]]});
});

it("selection.append(name) observes a custom namespace, if any", "<div id='one'></div><div id='two'></div>", () => {
  try {
    namespaces.d3js = "https://d3js.org/2016/namespace";
    const one = document.querySelector("#one");
    const two = document.querySelector("#two");
    const selection = selectAll([one, two]).append("d3js");
    const three = one.querySelector("d3js");
    const four = two.querySelector("d3js");
    assert.strictEqual(three.namespaceURI, "https://d3js.org/2016/namespace");
    assert.strictEqual(four.namespaceURI, "https://d3js.org/2016/namespace");
    assertSelection(selection, {groups: [[three, four]]});
  } finally {
    delete namespaces.d3js;
  }
});

it("selection.append(function) appends the returned element as the last child of each selected element", "<div id='one'><span class='before'></span></div><div id='two'><span class='before'></span></div>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const selection = selectAll([one, two]).append(function() { return document.createElement("SPAN"); });
  const three = one.querySelector("span:last-child");
  const four = two.querySelector("span:last-child");
  assertSelection(selection, {groups: [[three, four]]});
});

it("selection.append(function) passes the creator function data, index and group", "<parent id='one'><child id='three'></child><child id='four'></child></parent><parent id='two'><child id='five'></child></parent>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const three = document.querySelector("#three");
  const four = document.querySelector("#four");
  const five = document.querySelector("#five");
  const results = [];

  selectAll([one, two])
      .datum(function(d, i) { return "parent-" + i; })
    .selectAll("child")
      .data(function(d, i) { return [0, 1].map(function(j) { return "child-" + i + "-" + j; }); })
      .append(function(d, i, nodes) { results.push([this, d, i, nodes]); return document.createElement("SPAN"); });

  assert.deepStrictEqual(results, [
    [three, "child-0-0", 0, [three, four]],
    [four, "child-0-1", 1, [three, four]],
    [five, "child-1-0", 0, [five,, ]]
  ]);
});

it("selection.append(…) propagates data if defined on the originating element", "<parent><child>hello</child></parent>", () => {
  const parent = document.querySelector("parent");
  parent.__data__ = 0; // still counts as data even though falsey
  assert.strictEqual(select(parent).append("child").datum(), 0);
});

it("selection.append(…) will not propagate data if not defined on the originating element", "<parent><child>hello</child></parent>", () => {
  const parent = document.querySelector("parent");
  const child = document.querySelector("child");
  child.__data__ = 42;
  select(parent).append(function() { return child; });
  assert.strictEqual(child.__data__, 42);
});

it("selection.append(…) propagates parents from the originating selection", "<parent></parent><parent></parent>", () => {
  const parents = select(document).selectAll("parent");
  const childs = parents.append("child");
  assertSelection(parents, {groups: [document.querySelectorAll("parent")], parents: [document]});
  assertSelection(childs, {groups: [document.querySelectorAll("child")], parents: [document]});
  assert.strictEqual(parents.parents, childs.parents); // Not copied!
});

it("selection.append(…) can select elements when the originating selection is nested", "<parent id='one'><child></child></parent><parent id='two'><child></child></parent>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const selection = selectAll([one, two]).selectAll("child").append("span");
  const three = one.querySelector("span");
  const four = two.querySelector("span");
  assertSelection(selection, {groups: [[three], [four]], parents: [one, two]});
});

it("selection.append(…) skips missing originating elements", "<h1></h1>", () => {
  const h1 = document.querySelector("h1");
  const selection = selectAll([, h1]).append("span");
  const span = h1.querySelector("span");
  assertSelection(selection, {groups: [[, span]]});
});
