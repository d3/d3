import assert from "assert";
import {select} from "d3-selection";
import {timeout} from "d3-timer";
import "../../src/index.js";
import it from "../jsdom.js";

it("transition.transition() allows preceeding transitions with zero duration to end naturally", async () => {
  let end0 = false;
  let end1 = false;
  let end2 = false;
  const s = select(document.documentElement);
  const t = s.transition().duration(0).on("end", () => { end0 = true; });
  s.transition().duration(0).on("end", () => { end1 = true; });
  t.transition().duration(0).on("end", () => { end2 = true; });
  await new Promise(resolve => timeout(resolve, 50));
  assert.strictEqual(end0, true);
  assert.strictEqual(end1, true);
  assert.strictEqual(end2, true);
});
