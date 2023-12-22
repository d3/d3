import assert from "assert";
import {selectAll} from "../../src/index.js";
import {assertSelection} from "../asserts.js";
import it from "../jsdom.js";

it("selection.insert(name, before) inserts a new element of the specified name before the specified child of each selected element", "<div id='one'><span class='before'></span></div><div id='two'><span class='before'></span></div>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const selection = selectAll([one, two]).insert("span", ".before");
  const three = one.querySelector("span:first-child");
  const four = two.querySelector("span:first-child");
  assertSelection(selection, {groups: [[three, four]], parents: [null]});
});

it("selection.insert(function, function) inserts the returned element before the specified child of each selected element", "<div id='one'><span class='before'></span></div><div id='two'><span class='before'></span></div>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const selection = selectAll([one, two]).insert(function() { return document.createElement("SPAN"); }, function() { return this.firstChild; });
  const three = one.querySelector("span:first-child");
  const four = two.querySelector("span:first-child");
  assertSelection(selection, {groups: [[three, four]], parents: [null]});
});

it("selection.insert(function, function) inserts the returned element as the last child if the selector function returns null", "<div id='one'><span class='before'></span></div><div id='two'><span class='before'></span></div>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const selection = selectAll([one, two]).insert(function() { return document.createElement("SPAN"); }, function() { return; });
  const three = one.querySelector("span:last-child");
  const four = two.querySelector("span:last-child");
  assertSelection(selection, {groups: [[three, four]], parents: [null]});
});

it("selection.insert(name, function) passes the selector function data, index and group", "<parent id='one'><child id='three'></child><child id='four'></child></parent><parent id='two'><child id='five'></child></parent>", () => {
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
      .insert("span", function(d, i, nodes) { results.push([this, d, i, nodes]); });

  assert.deepStrictEqual(results, [
    [three, "child-0-0", 0, [three, four]],
    [four, "child-0-1", 1, [three, four]],
    [five, "child-1-0", 0, [five,, ]]
  ]);
});
