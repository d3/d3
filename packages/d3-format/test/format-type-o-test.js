import assert from "assert";
import {format} from "../src/index.js";

it("format(\"o\") octal", () => {
  assert.strictEqual(format("o")(10), "12");
});

it("format(\"#o\") octal with prefix", () => {
  assert.strictEqual(format("#o")(10), "0o12");
});
