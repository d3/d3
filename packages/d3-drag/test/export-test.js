import assert from "assert";
import * as d3 from "../src/index.js";

it("drag methods", () => {
  assert.deepStrictEqual(Object.keys(d3), [
    "drag", "dragDisable", "dragEnable"
  ]);
});	
