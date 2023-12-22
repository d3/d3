import assert from "assert";
import {format} from "../src/index.js";

it("format(\"b\") binary", () => {
  assert.strictEqual(format("b")(10), "1010");
});

it("format(\"#b\") binary with prefix", () => {
  assert.strictEqual(format("#b")(10), "0b1010");
});
