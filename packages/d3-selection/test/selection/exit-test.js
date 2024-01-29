import assert from "assert";
import {select} from "../../src/index.js";
import {assertSelection} from "../asserts.js";
import it from "../jsdom.js";

it("selection.exit() returns an empty selection before a data-join", "<h1>hello</h1>", () => {
  const selection = select(document.body);
  assertSelection(selection.exit(), {groups: [[,]]});
});

it("selection.exit() shares the update selection’s parents", "<h1>hello</h1>", () => {
  const selection = select(document.body);
  assert.strictEqual(selection.exit()._parents, selection._parents);
});

it("selection.exit() returns the same selection each time", "<h1>hello</h1>", () => {
  const selection = select(document.body);
  assert.deepStrictEqual(selection.exit(), selection.exit());
});

it("selection.exit() contains unbound elements after a data-join", "<div id='one'></div><div id='two'></div>", () => {
  const selection = select(document.body).selectAll("div").data(["foo"]);
  assertSelection(selection.exit(), {groups: [[, document.body.querySelector("#two")]], parents: [document.body]});
});

it("selection.exit() uses the order of the originating selection", "<div id='one'></div><div id='two'></div><div id='three'></div>", () => {
  const selection = select(document.body).selectAll("div").data(["three", "one"], function(d) { return d || this.id; });
  assertSelection(selection.exit(), {groups: [[, document.body.querySelector("#two"),, ]], parents: [document.body]});
});
