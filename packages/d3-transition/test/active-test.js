import assert from "assert";
import {select} from "d3-selection";
import {timeout} from "d3-timer";
import {active} from "../src/index.js";
import it from "./jsdom.js";

it("active(node) returns null if the specified node has no active transition with the null name", async () => {
  const root = document.documentElement;
  const s = select(root);

  // No transitions pending.
  assert.strictEqual(active(root), null);

  // Two transitions created.
  s.transition().delay(50).duration(50);
  s.transition("foo").duration(50);
  assert.strictEqual(active(root), null);

  // One transition scheduled; one active with a different name.
  await new Promise(resolve => timeout(() => {
    assert.strictEqual(active(root), null);
    resolve();
  }));

  // No transitions remaining after the transition ends.
  await new Promise(resolve => timeout(() => {
    assert.strictEqual(active(root), null);
    resolve();
  }, 100));
});

it("active(node, null) returns null if the specified node has no active transition with the null name", async () => {
  const root = document.documentElement;
  const s = select(root);

  // No transitions pending.
  assert.strictEqual(active(root, null), null);

  // Two transitions created.
  s.transition().delay(50).duration(50);
  s.transition("foo").duration(50);
  assert.strictEqual(active(root, null), null);

  // One transition scheduled; one active with a different name.
  await new Promise(resolve => timeout(() => {
    assert.strictEqual(active(root, null), null);
    resolve();
  }));

  // No transitions remaining after the transition ends.
  await new Promise(resolve => timeout(() => {
    assert.strictEqual(active(root, null), null);
    resolve();
  }, 100));
});

it("active(node, undefined) returns null if the specified node has no active transition with the null name", async () => {
  const root = document.documentElement;
  const s = select(root);

  // No transitions pending.
  assert.strictEqual(active(root, undefined), null);

  // Two transitions created.
  s.transition().delay(50).duration(50);
  s.transition("foo").duration(50);
  assert.strictEqual(active(root, undefined), null);

  // One transition scheduled; one active with a different name.
  await new Promise(resolve => timeout(() => {
    assert.strictEqual(active(root, undefined), null);
    resolve();
  }));

  // No transitions remaining after the transition ends.
  await new Promise(resolve => timeout(() => {
    assert.strictEqual(active(root, undefined), null);
    resolve();
  }, 100));
});

it("active(node, name) returns null if the specified node has no active transition with the specified name", async () => {
  const root = document.documentElement;
  const s = select(root);

  // No transitions pending.
  assert.strictEqual(active(root, "foo"), null);

  // Two transitions created.
  s.transition("foo").delay(50).duration(50);
  s.transition().duration(50);
  assert.strictEqual(active(root, null), null);

  // One transition scheduled; one active with a different name.
  assert.strictEqual(active(root, "foo"), null);

  // One transition scheduled.
  await new Promise(resolve => timeout(() => {
    assert.strictEqual(active(root, "foo"), null);
    resolve();
  }));

  // No transitions remaining after the transition ends.
  await new Promise(resolve => timeout(() => {
    assert.strictEqual(active(root, "foo"), null);
    resolve();
  }, 100));
});

it("active(node) returns the active transition on the specified node with the null name", async () => {
  const root = document.documentElement;
  const s = select(root);
  const t = s.transition().on("start", check).tween("tween", tweened).on("end", check);

  function check() {
    const a = active(root);
    assert.deepStrictEqual(a._groups, [[root]]);
    assert.deepStrictEqual(a._parents, [null]);
    assert.strictEqual(a._name, null);
    assert.strictEqual(a._id, t._id);
  }

  function tweened() {
    check();
    return t => {
      if (t >= 1) check();
    };
  }

  await t.end();
});

it("active(node, name) returns the active transition on the specified node with the specified name", async () => {
  const root = document.documentElement;
  const s = select(root);
  const t = s.transition("foo").on("start", check).tween("tween", tweened).on("end", check);

  function check() {
    const a = active(root, "foo");
    assert.deepStrictEqual(a._groups, [[root]]);
    assert.deepStrictEqual(a._parents, [null]);
    assert.strictEqual(a._name, "foo");
    assert.strictEqual(a._id, t._id);
  }

  function tweened() {
    check();
    return t => {
      if (t >= 1) check();
    };
  }

  await t.end();
});
