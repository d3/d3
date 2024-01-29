import assert from "assert";
import {select, selection, selectAll} from "../../src/index.js";
import {assertSelection} from "../asserts.js";
import it from "../jsdom.js";

it("selection.selectAll(…) returns a selection", "<h1>hello</h1>", () => {
  assert(select(document).selectAll("h1") instanceof selection);
});

it("selection.selectAll(string) selects all descendants that match the selector string for each selected element", "<h1 id='one'><span></span><span></span></h1><h1 id='two'><span></span><span></span></h1>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  assertSelection(selectAll([one, two]).selectAll("span"), {groups: [one.querySelectorAll("span"), two.querySelectorAll("span")], parents: [one, two]});
});

it("selection.selectAll(function) selects the return values of the given function for each selected element", "<span id='one'></span>", () => {
  const one = document.querySelector("#one");
  assertSelection(select(document).selectAll(function() { return [one]; }), {groups: [[one]], parents: [document]});
});

it("selection.selectAll(function) passes the selector function data, index and group", "<parent id='one'><child id='three'></child><child id='four'></child></parent><parent id='two'><child id='five'></child></parent>", () => {
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
    .selectAll(function(d, i, nodes) { results.push([this, d, i, nodes]); });

  assert.deepStrictEqual(results, [
    [three, "child-0-0", 0, [three, four]],
    [four, "child-0-1", 1, [three, four]],
    [five, "child-1-0", 0, [five,, ]]
  ]);
});

it("selection.selectAll(…) will not propagate data", "<parent><child>hello</child></parent>", () => {
  const parent = document.querySelector("parent");
  const child = document.querySelector("child");
  parent.__data__ = 42;
  select(parent).selectAll("child");
  assert(!("__data__" in child));
});

it("selection.selectAll(…) groups selected elements by their parent in the originating selection", "<parent id='one'><child id='three'></child></parent><parent id='two'><child id='four'></child></parent>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const three = document.querySelector("#three");
  const four = document.querySelector("#four");
  assertSelection(select(document).selectAll("parent").selectAll("child"), {groups: [[three], [four]], parents: [one, two]});
  assertSelection(select(document).selectAll("child"), {groups: [[three, four]], parents: [document]});
});

it("selection.selectAll(…) can select elements when the originating selection is nested", "<parent id='one'><child id='three'><span id='five'></span></child></parent><parent id='two'><child id='four'><span id='six'></span></child></parent>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const three = document.querySelector("#three");
  const four = document.querySelector("#four");
  const five = document.querySelector("#five");
  const six = document.querySelector("#six");
  assertSelection(selectAll([one, two]).selectAll("child").selectAll("span"), {groups: [[five], [six]], parents: [three, four]});
});

it("selection.selectAll(…) skips missing originating elements", "<h1><span>hello</span></h1>", () => {
  const h1 = document.querySelector("h1");
  const span = document.querySelector("span");
  assertSelection(selectAll([, h1]).selectAll("span"), {groups: [[span]], parents: [h1]});
  assertSelection(selectAll([null, h1]).selectAll("span"), {groups: [[span]], parents: [h1]});
  assertSelection(selectAll([undefined, h1]).selectAll("span"), {groups: [[span]], parents: [h1]});
});

it("selection.selectAll(…) skips missing originating elements when the originating selection is nested", "<parent id='one'><child></child><child id='three'><span id='five'></span></child></parent><parent id='two'><child></child><child id='four'><span id='six'></span></child></parent>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const three = document.querySelector("#three");
  const four = document.querySelector("#four");
  const five = document.querySelector("#five");
  const six = document.querySelector("#six");
  assertSelection(selectAll([one, two]).selectAll("child").select(function(d, i) { return i & 1 ? this : null; }).selectAll("span"), {groups: [[five], [six]], parents: [three, four]});
});
