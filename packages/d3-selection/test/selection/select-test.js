import assert from "assert";
import {select, selection, selectAll} from "../../src/index.js";
import {assertSelection} from "../asserts.js";
import it from "../jsdom.js";

it("selection.select(…) returns a selection", "<h1>hello</h1>", () => {
  assert(select(document).select("h1") instanceof selection);
});

it("selection.select(string) selects the first descendant that matches the selector string for each selected element", "<h1><span id='one'></span><span id='two'></span></h1><h1><span id='three'></span><span id='four'></span></h1>", () => {
  const one = document.querySelector("#one");
  const three = document.querySelector("#three");
  assertSelection(select(document).selectAll("h1").select("span"), {groups: [[one, three]], parents: [document]});
});

it("selection.select(function) selects the return value of the given function for each selected element", "<span id='one'></span>", () => {
  const one = document.querySelector("#one");
  assertSelection(select(document).select(function() { return one; }), {groups: [[one]], parents: [null]});
});

it("selection.select(function) passes the selector function data, index and group", "<parent id='one'><child id='three'></child><child id='four'></child></parent><parent id='two'><child id='five'></child></parent>", () => {
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
      .select(function(d, i, nodes) { results.push([this, d, i, nodes]); });

  assert.deepStrictEqual(results, [
    [three, "child-0-0", 0, [three, four]],
    [four, "child-0-1", 1, [three, four]],
    [five, "child-1-0", 0, [five,, ]]
  ]);
});

it("selection.select(…) propagates data if defined on the originating element", "<parent><child>hello</child></parent>", () => {
  const parent = document.querySelector("parent");
  const child = document.querySelector("child");
  parent.__data__ = 0; // still counts as data even though falsey
  child.__data__ = 42;
  select(parent).select("child");
  assert.strictEqual(child.__data__, 0);
});

it("selection.select(…) will not propagate data if not defined on the originating element", "<parent><child>hello</child></parent>", () => {
  const parent = document.querySelector("parent");
  const child = document.querySelector("child");
  child.__data__ = 42;
  select(parent).select("child");
  assert.strictEqual(child.__data__, 42);
});

it("selection.select(…) propagates parents from the originating selection", "<parent><child>1</child></parent><parent><child>2</child></parent>", () => {
  const parents = select(document).selectAll("parent");
  const childs = parents.select("child");
  assertSelection(parents, {groups: [document.querySelectorAll("parent")], parents: [document]});
  assertSelection(childs, {groups: [document.querySelectorAll("child")], parents: [document]});
  assert(parents.parents === childs.parents); // Not copied!
});

it("selection.select(…) can select elements when the originating selection is nested", "<parent id='one'><child><span id='three'></span></child></parent><parent id='two'><child><span id='four'></span></child></parent>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const three = document.querySelector("#three");
  const four = document.querySelector("#four");
  assertSelection(selectAll([one, two]).selectAll("child").select("span"), {groups: [[three], [four]], parents: [one, two]});
});

it("selection.select(…) skips missing originating elements", "<h1><span>hello</span></h1>", () => {
  const h1 = document.querySelector("h1");
  const span = document.querySelector("span");
  assertSelection(selectAll([, h1]).select("span"), {groups: [[, span]], parents: [null]});
  assertSelection(selectAll([null, h1]).select("span"), {groups: [[, span]], parents: [null]});
  assertSelection(selectAll([undefined, h1]).select("span"), {groups: [[, span]], parents: [null]});
});

it("selection.select(…) skips missing originating elements when the originating selection is nested", "<parent id='one'><child></child><child><span id='three'></span></child></parent><parent id='two'><child></child><child><span id='four'></span></child></parent>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const three = document.querySelector("#three");
  const four = document.querySelector("#four");
  assertSelection(selectAll([one, two]).selectAll("child").select(function(d, i) { return i & 1 ? this : null; }).select("span"), {groups: [[, three], [, four]], parents: [one, two]});
});

it("selection.selection() returns itself", "<h1>hello</h1>", () => {
  const sel = select(document).select("h1");
  assert(sel === sel.selection());
  assert(sel === sel.selection().selection());
});
