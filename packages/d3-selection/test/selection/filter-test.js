import assert from "assert";
import {select, selection, selectAll} from "../../src/index.js";
import {assertSelection} from "../asserts.js";
import it from "../jsdom.js";

it("selection.filter(…) returns a selection", "<h1>hello</h1>", () => {
  assert(select(document.body).filter("body") instanceof selection);
});

it("selection.filter(string) retains the selected elements that matches the selector string", "<h1><span id='one'></span><span id='two'></span></h1><h1><span id='three'></span><span id='four'></span></h1>", () => {
  const one = document.querySelector("#one");
  const three = document.querySelector("#three");
  assertSelection(select(document).selectAll("span").filter("#one,#three"), {groups: [[one, three]], parents: [document]});
});

it("selection.filter(function) retains elements for which the given function returns true", "<h1><span id='one'></span><span id='two'></span></h1><h1><span id='three'></span><span id='four'></span></h1>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const three = document.querySelector("#three");
  const four = document.querySelector("#four");
  assertSelection(selectAll([one, two, three, four]).filter(function(d, i) { return i & 1; }), {groups: [[two, four]], parents: [null]});
});

it("selection.filter(function) passes the selector function data, index and group", "<parent id='one'><child id='three'></child><child id='four'></child></parent><parent id='two'><child id='five'></child></parent>", () => {
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
      .filter(function(d, i, nodes) { results.push([this, d, i, nodes]); });

  assert.deepStrictEqual(results, [
    [three, "child-0-0", 0, [three, four]],
    [four, "child-0-1", 1, [three, four]],
    [five, "child-1-0", 0, [five,, ]]
  ]);
});

it("selection.filter(…) propagates parents from the originating selection", "<parent><child>1</child></parent><parent><child>2</child></parent>", () => {
  const parents = select(document).selectAll("parent");
  const parents2 = parents.filter(function() { return true; });
  assertSelection(parents, {groups: [document.querySelectorAll("parent")], parents: [document]});
  assertSelection(parents2, {groups: [document.querySelectorAll("parent")], parents: [document]});
  assert(parents._parents === parents2._parents); // Not copied!
});

it("selection.filter(…) can filter elements when the originating selection is nested", "<parent id='one'><child><span id='three'></span></child></parent><parent id='two'><child><span id='four'></span></child></parent>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const three = document.querySelector("#three");
  const four = document.querySelector("#four");
  assertSelection(selectAll([one, two]).selectAll("span").filter("*"), {groups: [[three], [four]], parents: [one, two]});
});

it("selection.filter(…) skips missing originating elements and does not retain the original indexes", "<h1>hello</h1>", () => {
  const h1 = document.querySelector("h1");
  assertSelection(selectAll([, h1]).filter("*"), {groups: [[h1]], parents: [null]});
  assertSelection(selectAll([null, h1]).filter("*"), {groups: [[h1]], parents: [null]});
  assertSelection(selectAll([undefined, h1]).filter("*"), {groups: [[h1]], parents: [null]});
});

it("selection.filter(…) skips missing originating elements when the originating selection is nested", "<parent id='one'><child></child><child id='three'></child></parent><parent id='two'><child></child><child id='four'></child></parent>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const three = document.querySelector("#three");
  const four = document.querySelector("#four");
  assertSelection(selectAll([one, two]).selectAll("child").select(function(d, i) { return i & 1 ? this : null; }).filter("*"), {groups: [[three], [four]], parents: [one, two]});
});
