import assert from "assert";
import {transition} from "../../src/index.js";
import it from "../jsdom.js";

it("transition() returns a transition on the document element with the null name", () => {
  const root = document.documentElement;
  const t = transition();
  const schedule = root.__transition[t._id];
  assert.strictEqual(t.node(), root);
  assert.strictEqual(schedule.name, null);
});

it("transition(null) returns a transition on the document element with the null name", () => {
  const root = document.documentElement;
  const t = transition(null);
  const schedule = root.__transition[t._id];
  assert.strictEqual(t.node(), root);
  assert.strictEqual(schedule.name, null);
});

it("transition(undefined) returns a transition on the document element with the null name", () => {
  const root = document.documentElement;
  const t = transition(undefined);
  const schedule = root.__transition[t._id];
  assert.strictEqual(t.node(), root);
  assert.strictEqual(schedule.name, null);
});

it("transition(name) returns a transition on the document element with the specified name", () => {
  const root = document.documentElement;
  const t = transition("foo");
  const schedule = root.__transition[t._id];
  assert.strictEqual(t.node(), root);
  assert.strictEqual(schedule.name, "foo");
});

it("transition.prototype can be extended", () => {
  try {
    let pass = 0;
    transition.prototype.test = () => { return ++pass; };
    assert.strictEqual(transition().test(), 1);
    assert.strictEqual(pass, 1);
  } finally {
    delete transition.prototype.test;
  }
});

it("transitions are instanceof transition", () => {
  assert.strictEqual(transition() instanceof transition, true);
});
