import assert from "assert";
import {interval, now, timer} from "../src/index.js";
import {assertInRange} from "./asserts.js";

// It’s difficult to test the timing behavior reliably, since there can be small
// hiccups that cause a timer to be delayed. So we test only the mean rate.
it("interval(callback) invokes the callback about every 17ms", end => {
  const then = now();
  let count = 0;
  const t = interval(function() {
    if (++count > 10) {
      t.stop();
      assertInRange(now() - then, (17 - 5) * count, (17 + 5) * count);
      end();
    }
  });
});

it("interval(callback) invokes the callback until the timer is stopped", end => {
  let count = 0;
  const t = interval(function() {
    if (++count > 2) {
      t.stop();
      end();
    }
  });
});

it("interval(callback, delay) invokes the callback about every delay milliseconds", end => {
  const then = now(), delay = 50, nows = [then];
  const t = interval(function() {
    if (nows.push(now()) > 10) {
      t.stop();
      nows.forEach(function(now, i) { assertInRange(now - then, delay * i - 20, delay * i + 20); });
      end();
    }
  }, delay);
});

it("interval(callback, delay, time) invokes the callback repeatedly after the specified delay relative to the given time", end => {
  const then = now() + 50, delay = 50;
  const t = interval(function() {
    assertInRange(now() - then, delay - 10, delay + 10);
    t.stop();
    end();
  }, delay, then);
});

it("interval(callback) uses the undefined context for the callback", end => {
  const t = interval(function() {
    assert.strictEqual(this, undefined);
    t.stop();
    end();
  });
});

it("interval(callback) passes the callback the elapsed time", end => {
  const then = now();
  const t = interval(function(elapsed) {
    assert.strictEqual(elapsed, now() - then);
    t.stop();
    end();
  }, 100);
});

it("interval(callback) returns a timer", end => {
  let count = 0;
  const t = interval(function() { ++count; });
  assert.strictEqual(t instanceof timer, true);
  t.stop();
  setTimeout(function() {
    assert.strictEqual(count, 0);
    end();
  }, 100);
});

it("interval(callback).restart restarts as an interval", end => {
  const then = now(), delay = 50, nows = [then];
  const callback = function() {
    if (nows.push(now()) > 10) {
      t.stop();
      nows.forEach(function(now, i) { assertInRange(now - then, delay * i - 20, delay * i + 20); });
      end();
    }
  };
  const t = interval(callback, delay);
  t.stop();
  t.restart(callback, delay);
});
