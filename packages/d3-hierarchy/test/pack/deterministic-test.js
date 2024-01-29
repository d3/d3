import assert from "assert";
import {hierarchy, stratify, pack} from "../../src/index.js";

it("pack is deterministic", () => {
  const data = stratify().path((d) => d)(
    [41, 41, 11, 11, 4, 4]
      .flatMap((n, i) => Array.from({length: n}, (_, j) => ({i, j})))
      .map(({i, j}) => `/${i}/${i}-${j}`)
  );
  const packer = pack().size([100, 100]).padding(0);
  const pack1 = packer(hierarchy(data).count());
  for (let i = 0; i < 40; ++i) {
    assert.deepStrictEqual(packer(hierarchy(data).count()), pack1);
  }
});
