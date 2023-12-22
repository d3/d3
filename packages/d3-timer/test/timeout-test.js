import assert from "assert";
import {now, timeout, timer} from "../src/index.js";
import {assertInRange} from "./asserts.js";

it("timeout(callback) invokes the callback once", end => {
  let count = 0;
  timeout(function() {
    assert.strictEqual(++count, 1);
    end();
  });
});

it("timeout(callback, delay) invokes the callback once after the specified delay", end => {
  const then = now(), delay = 50;
  timeout(function() {
    assertInRange(now() - then, delay - 10, delay + 10);
    end();
  }, delay);
});

it("timeout(callback, delay, time) invokes the callback once after the specified delay relative to the given time", end => {
  const then = now() + 50, delay = 50;
  timeout(function() {
    assertInRange(now() - then, delay - 10, delay + 10);
    end();
  }, delay, then);
});

it("timeout(callback) uses the undefined context for the callback", end => {
  timeout(function() {
    assert.strictEqual(this, undefined);
    end();
  });
});

it("timeout(callback) passes the callback the elapsed time", end => {
  const then = now();
  timeout(function(elapsed) {
    assert.strictEqual(elapsed, now() - then);
    end();
  });
});

it("timeout(callback) returns a timer", end => {
  let count = 0;
  const t = timeout(function() { ++count; });
  assert.strictEqual(t instanceof timer, true);
  t.stop();
  setTimeout(function() {
    assert.strictEqual(count, 0);
    end();
  }, 100);
});
