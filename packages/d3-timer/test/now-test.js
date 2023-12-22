import assert from "assert";
import {now} from "../src/index.js";
import {assertInRange} from "./asserts.js";

it("now() returns the same time when called repeatedly", end => {
  const then = now();
  assert(then > 0);
  assert.strictEqual(now(), then);
  end();
});

it("now() returns a different time when called after a timeout", end => {
  const then = now();
  assert(then > 0);
  setTimeout(() => {
    assertInRange(now() - then, 50 - 10, 50 + 10);
    end();
  }, 50);
});
