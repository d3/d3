import assert from "assert";
import {select, selectAll} from "d3-selection";
import {transition} from "../../src/index.js";
import it from "../jsdom.js";

it("transition.merge(other) merges elements from the specified other transition for null elements in this transition", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const t0 = select(document.documentElement).transition();
  const t1 = selectAll([null, two]).transition(t0);
  const t2 = selectAll([one, null]).transition(t0);
  const t3 = t1.merge(t2);
  assert.strictEqual(t3 instanceof transition, true);
  assert.deepStrictEqual(t3._groups, [[one, two]]);
  assert.strictEqual(t3._parents, t1._parents);
  assert.strictEqual(t3._name, t1._name);
  assert.strictEqual(t3._id, t1._id);
});

it("transition.merge(other) throws an error if the other transition has a different id", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const t1 = selectAll([null, two]).transition();
  const t2 = selectAll([one, null]).transition();
  assert.throws(() => { t1.merge(t2); });
});
