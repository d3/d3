import assert from "assert";
import {selectAll} from "d3-selection";
import {transition} from "../../src/index.js";
import it from "../jsdom.js";

it("transition.selectChildren(selector) selects the children matching the specified selector, then derives a transition", "<h1 id='one'><child/></h1><h1 id='two'><child/></h1>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const t1 = selectAll([one, two]).data([1, 2]).transition().delay(function(d) { return d * 10; });
  const t2 = t1.selectChildren("child");
  assert.strictEqual(t2 instanceof transition, true);
  assert.deepStrictEqual(t2._groups.map(group => Array.from(group)), [[one.firstChild], [two.firstChild]]);
  assert.deepStrictEqual(t2._parents, [one, two]);
  assert.strictEqual(t2._name, t1._name);
  assert.strictEqual(t2._id, t1._id);
  assert.strictEqual("__data__" in one.firstChild, false);
  assert.strictEqual("__data__" in two.firstChild, false);
  assert.strictEqual(one.firstChild.__transition[t1._id].delay, 10);
  assert.strictEqual(two.firstChild.__transition[t1._id].delay, 20);
});
