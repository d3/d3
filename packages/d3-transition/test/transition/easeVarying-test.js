import assert from "assert";
import {easePolyIn} from "d3-ease";
import {select} from "d3-selection";
import "../../src/index.js";
import it from "../jsdom.js";

it("transition.easeVarying(factory) accepts an easing function factory", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  const t = select(document).selectAll("h1").data([{exponent: 3}, {exponent: 4}]).transition();
  t.easeVarying(d => easePolyIn.exponent(d.exponent));
  assert.strictEqual(t.ease()(0.5), easePolyIn.exponent(3)(0.5));
});

it("transition.easeVarying(factory) passes factory datum, index, group with the node as this", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  const t = select(document).selectAll("h1").data([{exponent: 3}, {exponent: 4}]).transition();
  const results = [];
  t.easeVarying(function(d, i, e) { results.push([d, i, e, this]); return t => t; });
  assert.deepStrictEqual(results, [
    [{exponent: 3}, 0, [...t], document.querySelector("#one")],
    [{exponent: 4}, 1, [...t], document.querySelector("#two")],
  ]);
});

it("transition.easeVarying() throws an error if the argument is not a function", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  const t = select(document).selectAll("h1").data([{exponent: 3}, {exponent: 4}]).transition();
  assert.throws(() => { t.easeVarying(); });
  assert.throws(() => { t.easeVarying("a"); });
});
