import assert from "assert";
import {selectAll} from "d3-selection";
import {transition} from "../../src/index.js";
import it from "../jsdom.js";

it("transition.selectChild(selector) selects the child matching the specified selector, then derives a transition", "<h1 id='one'><child/></h1><h1 id='two'><child/></h1>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const t1 = selectAll([one, two]).data([1, 2]).transition().delay(function(d) { return d * 10; });
  const t2 = t1.selectChild("child");
  assert.strictEqual(t2 instanceof transition, true);
  assert.deepStrictEqual(t2._groups, [[one.firstChild, two.firstChild]]);
  assert.strictEqual(t2._parents, t1._parents);
  assert.strictEqual(t2._name, t1._name);
  assert.strictEqual(t2._id, t1._id);
  assert.strictEqual(one.firstChild.__data__, 1);
  assert.strictEqual(two.firstChild.__data__, 2);
  assert.strictEqual(one.firstChild.__transition[t1._id].delay, 10);
  assert.strictEqual(two.firstChild.__transition[t1._id].delay, 20);
});
