import assert from "assert";
import {stackOrderNone} from "../../src/index.js";

it("stackOrderNone(series) returns [0, 1, … series.length - 1]", () => {
  assert.deepStrictEqual(stackOrderNone(new Array(4)), [0, 1, 2, 3]);
});
