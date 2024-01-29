import assert from "assert";
import {select, selectAll} from "../../src/index.js";
import {assertSelection} from "../asserts.js";
import it from "../jsdom.js";

it("selection.merge(selection) returns a new selection, merging the two selections", "<h1 id='one'>one</h1><h1 id='two'>two</h1>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const selection0 = select(document.body).selectAll("h1");
  const selection1 = selection0.select(function(d, i) { return i & 1 ? this : null; });
  const selection2 = selection0.select(function(d, i) { return i & 1 ? null : this; });
  assertSelection(selection1.merge(selection2), {groups: [[one, two]], parents: [document.body]});
  assertSelection(selection1, {groups: [[, two]], parents: [document.body]});
  assertSelection(selection2, {groups: [[one,, ]], parents: [document.body]});
});

it("selection.merge(selection) returns a selection with the same size and parents as this selection", "<div id='body0'><h1 name='one'>one</h1><h1 name='two'>two</h1></div><div id='body1'><h1 name='one'>one</h1><h1 name='two'>two</h1><h1 name='three'>three</h1></div>", () => {
  const body0 = document.querySelector("#body0");
  const body1 = document.querySelector("#body1");
  const one0 = body0.querySelector("[name='one']");
  const one1 = body1.querySelector("[name='one']");
  const two0 = body0.querySelector("[name='two']");
  const two1 = body1.querySelector("[name='two']");
  const three1 = body1.querySelector("[name='three']");
  assertSelection(select(body0).selectAll("h1").merge(select(body1).selectAll("h1")), {groups: [[one0, two0]], parents: [body0]});
  assertSelection(select(body1).selectAll("h1").merge(select(body0).selectAll("h1")), {groups: [[one1, two1, three1]], parents: [body1]});
});

it("selection.merge(selection) reuses groups from this selection if the other selection has fewer groups", "<parent><child></child><child></child></parent><parent><child></child><child></child></parent>", () => {
  const selection0 = selectAll("parent").selectAll("child");
  const selection1 = selectAll("parent:first-child").selectAll("child");
  const selection01 = selection0.merge(selection1);
  const selection10 = selection1.merge(selection0);
  assertSelection(selection01, selection0);
  assertSelection(selection10, selection1);
  assert.strictEqual(selection01._groups[1], selection0._groups[1]);
});

it("selection.merge(selection) reuses this selection’s parents", "<parent><child></child><child></child></parent><parent><child></child><child></child></parent>", () => {
  const selection0 = selectAll("parent").selectAll("child");
  const selection1 = selectAll("parent:first-child").selectAll("child");
  const selection01 = selection0.merge(selection1);
  const selection10 = selection1.merge(selection0);
  assert.strictEqual(selection01._parents, selection0._parents);
  assert.strictEqual(selection10._parents, selection1._parents);
});

it("selection.merge(transition) returns a new selection, merging the two selections", "<h1 id='one'>one</h1><h1 id='two'>two</h1>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const selection0 = select(document.body).selectAll("h1");
  const selection1 = selection0.select(function(d, i) { return i & 1 ? this : null; });
  const selection2 = selection0.select(function(d, i) { return i & 1 ? null : this; });
  assertSelection(selection1.merge(mockTransition(selection2)), {groups: [[one, two]], parents: [document.body]});
});

function mockTransition(selection) {
  return {
    selection() {
      return selection;
    }
  };
}
