import assert from "assert";
import {selectAll} from "d3-selection";
import {transition} from "../../src/index.js";
import it from "../jsdom.js";

it("transition.filter(selector) retains the elements matching the specified selector", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const t1 = selectAll([one, two]).data([1, 2]).transition().delay(function(d) { return d * 10; });
  const t2 = t1.filter("#two");
  assert.strictEqual(t2 instanceof transition, true);
  assert.deepStrictEqual(t2._groups, [[two]]);
  assert.strictEqual(t2._parents, t1._parents);
  assert.strictEqual(t2._name, t1._name);
  assert.strictEqual(t2._id, t1._id);
});

it("transition.filter(function) retains the elements for which the specified function returns true", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const t1 = selectAll([one, two]).data([1, 2]).transition().delay(function(d) { return d * 10; });
  const t2 = t1.filter(function() { return this === two; });
  assert.strictEqual(t2 instanceof transition, true);
  assert.deepStrictEqual(t2._groups, [[two]]);
  assert.strictEqual(t2._parents, t1._parents);
  assert.strictEqual(t2._name, t1._name);
  assert.strictEqual(t2._id, t1._id);
});
