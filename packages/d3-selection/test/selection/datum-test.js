import assert from "assert";
import {select, selectAll} from "../../src/index.js";
import it from "../jsdom.js";

it("selection.datum() returns the datum on the first selected element", () => {
  const node = {__data__: "hello"};
  assert.strictEqual(select(node).datum(), "hello");
  assert.strictEqual(selectAll([null, node]).datum(), "hello");
});

it("selection.datum(value) sets datum on the selected elements", () => {
  const one = {__data__: ""};
  const two = {__data__: ""};
  const selection = selectAll([one, two]);
  assert.strictEqual(selection.datum("bar"), selection);
  assert.strictEqual(one.__data__, "bar");
  assert.strictEqual(two.__data__, "bar");
});

it("selection.datum(null) clears the datum on the selected elements", () => {
  const one = {__data__: "bar"};
  const two = {__data__: "bar"};
  const selection = selectAll([one, two]);
  assert.strictEqual(selection.datum(null), selection);
  assert.strictEqual("__data__" in one, false);
  assert.strictEqual("__data__" in two, false);
});

it("selection.datum(function) sets the value of the datum on the selected elements", () => {
  const one = {__data__: "bar"};
  const two = {__data__: "bar"};
  const selection = selectAll([one, two]);
  assert.strictEqual(selection.datum((d, i) => i ? "baz" : null), selection);
  assert.strictEqual("__data__" in one, false);
  assert.strictEqual(two.__data__, "baz");
});

it("selection.datum(function) passes the value function data, index and group", "<parent id='one'><child id='three'></child><child id='four'></child></parent><parent id='two'><child id='five'></child></parent>", () => {
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
      .datum(function(d, i, nodes) { results.push([this, d, i, nodes]); });

  assert.deepStrictEqual(results, [
    [three, "child-0-0", 0, [three, four]],
    [four, "child-0-1", 1, [three, four]],
    [five, "child-1-0", 0, [five,, ]]
  ]);
});
