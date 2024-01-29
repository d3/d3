import assert from "assert";
import {color, cubehelix} from "../src/index.js";

it("cubehelix(…) returns an instance of cubehelix and color", () => {
  const c = cubehelix("steelblue");
  assert(c instanceof cubehelix);
  assert(c instanceof color);
});
