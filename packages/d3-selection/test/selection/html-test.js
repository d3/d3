import assert from "assert";
import {select, selectAll} from "../../src/index.js";
import it from "../jsdom.js";

it("selection.html() returns the inner HTML on the first selected element", () => {
  const node = {innerHTML: "hello"};
  assert.strictEqual(select(node).html(), "hello");
  assert.strictEqual(selectAll([null, node]).html(), "hello");
});

it("selection.html(value) sets inner HTML on the selected elements", () => {
  const one = {innerHTML: ""};
  const two = {innerHTML: ""};
  const selection = selectAll([one, two]);
  assert.strictEqual(selection.html("bar"), selection);
  assert.strictEqual(one.innerHTML, "bar");
  assert.strictEqual(two.innerHTML, "bar");
});

it("selection.html(null) clears the inner HTML on the selected elements", () => {
  const one = {innerHTML: "bar"};
  const two = {innerHTML: "bar"};
  const selection = selectAll([one, two]);
  assert.strictEqual(selection.html(null), selection);
  assert.strictEqual(one.innerHTML, "");
  assert.strictEqual(two.innerHTML, "");
});

it("selection.html(function) sets the value of the inner HTML on the selected elements", () => {
  const one = {innerHTML: "bar"};
  const two = {innerHTML: "bar"};
  const selection = selectAll([one, two]);
  assert.strictEqual(selection.html(function(d, i) { return i ? "baz" : null; }), selection);
  assert.strictEqual(one.innerHTML, "");
  assert.strictEqual(two.innerHTML, "baz");
});

it("selection.html(function) passes the value function data, index and group", "<parent id='one'><child id='three'></child><child id='four'></child></parent><parent id='two'><child id='five'></child></parent>", () => {
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
      .html(function(d, i, nodes) { results.push([this, d, i, nodes]); });

  assert.deepStrictEqual(results, [
    [three, "child-0-0", 0, [three, four]],
    [four, "child-0-1", 1, [three, four]],
    [five, "child-1-0", 0, [five,, ]]
  ]);
});
