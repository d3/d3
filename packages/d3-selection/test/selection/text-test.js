import assert from "assert";
import {select, selectAll} from "../../src/index.js";
import it from "../jsdom.js";

it("selection.text() returns the text content on the first selected element", () => {
  const node = {textContent: "hello"};
  assert.strictEqual(select(node).text(), "hello");
  assert.strictEqual(selectAll([null, node]).text(), "hello");
});

it("selection.text(value) sets text content on the selected elements", () => {
  const one = {textContent: ""};
  const two = {textContent: ""};
  const selection = selectAll([one, two]);
  assert.strictEqual(selection.text("bar"), selection);
  assert.strictEqual(one.textContent, "bar");
  assert.strictEqual(two.textContent, "bar");
});

it("selection.text(null) clears the text content on the selected elements", () => {
  const one = {textContent: "bar"};
  const two = {textContent: "bar"};
  const selection = selectAll([one, two]);
  assert.strictEqual(selection.text(null), selection);
  assert.strictEqual(one.textContent, "");
  assert.strictEqual(two.textContent, "");
});

it("selection.text(function) sets the value of the text content on the selected elements", () => {
  const one = {textContent: "bar"};
  const two = {textContent: "bar"};
  const selection = selectAll([one, two]);
  assert.strictEqual(selection.text(function(d, i) { return i ? "baz" : null; }), selection);
  assert.strictEqual(one.textContent, "");
  assert.strictEqual(two.textContent, "baz");
});

it("selection.text(function) passes the value function data, index and group", "<parent id='one'><child id='three'></child><child id='four'></child></parent><parent id='two'><child id='five'></child></parent>", () => {
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
      .text(function(d, i, nodes) { results.push([this, d, i, nodes]); });

  assert.deepStrictEqual(results, [
    [three, "child-0-0", 0, [three, four]],
    [four, "child-0-1", 1, [three, four]],
    [five, "child-1-0", 0, [five,, ]]
  ]);
});
