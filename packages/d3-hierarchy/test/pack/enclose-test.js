import assert from "assert";
import {packEnclose} from "../../src/index.js";

// https://github.com/d3/d3-hierarchy/issues/188
it("packEnclose(circles) handles a tricky case", () => {
  assert.deepStrictEqual(
    packEnclose([
      {x: 14.5, y: 48.5, r: 7.585},
      {x: 9.5, y: 79.5, r: 2.585},
      {x: 15.5, y: 73.5, r: 8.585}
    ]),
    {
      r: 20.790781637717107,
      x: 12.80193548387092,
      y: 61.59615384615385
    }
  );
});
