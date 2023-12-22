import assert from "assert";
import {now, timer, timerFlush} from "../src/index.js";
import {assertInRange} from "./asserts.js";

it("timer(callback) returns an instanceof timer", end => {
  const t = timer(() => {});
  assert.strictEqual(t instanceof timer, true);
  t.stop();
  end();
});

it("timer(callback) verifies that callback is a function", end => {
  assert.throws(() => { timer(); }, TypeError);
  assert.throws(() => { timer("42"); }, TypeError);
  assert.throws(() => { timer(null); }, TypeError);
  end();
});

// It’s difficult to test the timing behavior reliably, since there can be small
// hiccups that cause a timer to be delayed. So we test only the mean rate.
it("timer(callback) invokes the callback about every 17ms", end => {
  const then = now();
  let count = 0;
  const t = timer(function() {
    if (++count > 10) {
      t.stop();
      assertInRange(now() - then, (17 - 5) * count, (17 + 5) * count);
      end();
    }
  });
});

it("timer(callback) invokes the callback until the timer is stopped", end => {
  let count = 0;
  const t = timer(function() {
    if (++count > 2) {
      t.stop();
      end();
    }
  });
});

it("timer(callback) uses the undefined context for the callback", end => {
  const t = timer(function() {
    assert.strictEqual(this, undefined);
    t.stop();
    end();
  });
});

it("timer(callback) passes the callback the elapsed time", end => {
  const then = now();
  let count = 0;
  const t = timer(function(elapsed) {
    ++count;
    assert.strictEqual(elapsed, now() - then);
    if (count > 10) {
      t.stop();
      end();
    }
  });
});

it("timer(callback, delay) first invokes the callback after the specified delay", end => {
  const then = now(), delay = 150;
  const t = timer(function() {
    t.stop();
    assertInRange(now() - then, delay - 10, delay + 10);
    end();
  }, delay);
});

it("timer(callback, delay) computes the elapsed time relative to the delay", end => {
  const delay = 150;
  const t = timer(function(elapsed) {
    t.stop();
    assertInRange(elapsed, 0, 10);
    end();
  }, delay);
});

it("timer(callback, delay, time) computes the effective delay relative to the specified time", end => {
  const delay = 150, skew = 200;
  const t = timer(function(elapsed) {
    t.stop();
    assertInRange(elapsed, skew - delay + 17 - 10, skew - delay + 17 + 10);
    end();
  }, delay, now() - skew);
});

it("timer(callback) invokes callbacks in scheduling order during synchronous flush", end => {
  const results = [];
  const t0 = timer(function() { results.push(1); t0.stop(); });
  const t1 = timer(function() { results.push(2); t1.stop(); });
  const t2 = timer(function() { results.push(3); t2.stop(); });
  timerFlush();
  assert.deepStrictEqual(results, [1, 2, 3]);
  end();
});

it("timer(callback) invokes callbacks in scheduling order during asynchronous flush", end => {
  const results = [];
  const t0 = timer(function() { results.push(1); t0.stop(); });
  const t1 = timer(function() { results.push(2); t1.stop(); });
  const t2 = timer(function() { results.push(3); t2.stop(); });
  const t3 = timer(function() {
    t3.stop();
    assert.deepStrictEqual(results, [1, 2, 3]);
    end();
  });
});

// Even though these timers have different delays, they are still called back in
// scheduling order when they are simultaneously active.
it("timer(callback, delay) invokes callbacks in scheduling order during asynchronous flush", end => {
  const then = now();
  let results;
  const t0 = timer(function() { results = [1]; t0.stop(); }, 60, then);
  const t1 = timer(function() { if (results) results.push(2), t1.stop(); }, 40, then);
  const t2 = timer(function() { if (results) results.push(3), t2.stop(); }, 80, then);
  const t3 = timer(function() {
    t3.stop();
    assert.deepStrictEqual(results, [1, 2, 3]);
    end();
  }, 100, then);
});

it("timer(callback) within a frame invokes the callback at the end of the same frame", end => {
  const then = now();
  const t0 = timer(function(elapsed1, now1) {
    const delay = now() - then;
    const t1 = timer(function(elapsed2, now2) {
      t1.stop();
      assert.strictEqual(elapsed2, 0);
      assert.strictEqual(now2, now1);
      assertInRange(now() - then, delay, delay + 3);
      end();
    }, 0, now1);
    t0.stop();
  });
});

// Note: assumes that Node doesn’t support requestAnimationFrame, falling back to setTimeout.
it("timer(callback, delay) within a timerFlush() does not request duplicate frames", end => {
  // A small delay before starting this test to give existing timers a chance to clear.
  setTimeout(() => {
    const setTimeout0 = setTimeout;
    let frames = 0;

    // This requests a frame, too, so do it before the test starts.
    now();

    setTimeout = function() {
      ++frames;
      return setTimeout0.apply(this, arguments);
    };

    const t0 = timer(function() {

      // 2. The first timer is invoked synchronously by timerFlush, so only the
      // first frame—when this timer was created—has been requested.
      assert.strictEqual(frames, 1);

      t0.stop();

      // 3. This timer was stopped during flush, so it doesn’t request a frame.
      assert.strictEqual(frames, 1);

      const t1 = timer(function() {

        // 6. Still only one frame has been requested so far: the second timer has
        // a <17ms delay, and so was called back during the first frame requested
        // by the first timer on creation. If the second timer had a longer delay,
        // it might need another frame (or timeout) before invocation.
        assert.strictEqual(frames, 1);

        t1.stop();

        // 7. Stopping the second timer doesn’t immediately request a frame since
        // we’re now within an implicit flush (initiated by this timer).
        assert.strictEqual(frames, 1);

        setTimeout0(function() {

          // 8. Since the timer queue was empty when we stopped the second timer,
          // no additional frame was requested after the timers were flushed.
          assert.strictEqual(frames, 1);

          setTimeout = setTimeout0;
          end();
        }, 50);
      }, 1);

      // 4. Creating a second timer during flush also doesn’t immediately request
      // a frame; the request would happen AFTER all the timers are called back,
      // and we still have the request active from when the first timer was
      // created, since the first timer is invoked synchronously.
      assert.strictEqual(frames, 1);
    });

    // 1. Creating the first timer requests the first frame.
    assert.strictEqual(frames, 1);

    timerFlush();

    // 5. Still only one frame active!
    assert.strictEqual(frames, 1);
  }, 100);
});

// Note: assumes that Node doesn’t support requestAnimationFrame, falling back to setTimeout.
it("timer(callback) switches to setTimeout for long delays", end => {
  // A small delay before starting this test to give existing timers a chance to clear.
  setTimeout(() => {
    const setTimeout0 = setTimeout;
    let frames = 0, timeouts = 0;

    // This requests a frame, too, so do it before the test starts.
    now();

    setTimeout = function(callback, delay) {
      delay === 17 ? ++frames : ++timeouts;
      return setTimeout0.apply(this, arguments);
    };

    const t0 = timer(function() {

      // 2. The first timer had a delay >24ms, so after the first scheduling
      // frame, we used a longer timeout to wake up.
      assert.strictEqual(frames, 1);
      assert.strictEqual(timeouts, 1);

      t0.stop();

      // 3. Stopping a timer during flush doesn’t request a new frame.
      assert.strictEqual(frames, 1);
      assert.strictEqual(timeouts, 1);

      const t1 = timer(function() {

        // 5. The second timer had a short delay, so it’s not immediately invoked
        // during the same tick as the first timer; it gets a new frame.
        assert.strictEqual(frames, 2);
        assert.strictEqual(timeouts, 1);

        t1.stop();

        // 6. Stopping a timer during flush doesn’t request a new frame.
        assert.strictEqual(frames, 2);
        assert.strictEqual(timeouts, 1);

        setTimeout0(function() {

          // 7. Since the timer queue was empty when we stopped the second timer,
          // no additional frame was requested after the timers were flushed.
          assert.strictEqual(frames, 2);
          assert.strictEqual(timeouts, 1);

          setTimeout = setTimeout0;
          end();
        }, 50);
      }, 1);

      // 4. Scheduling a new timer during flush doesn’t request a new frame;
      // that happens after all the timers have been invoked.
      assert.strictEqual(frames, 1);
      assert.strictEqual(timeouts, 1);
    }, 100);

    // 1. Creating the first timer requests the first frame. Even though the timer
    // has a long delay, we always use a frame to consolidate timer creation for
    // multiple timers. That way, if you schedule a bunch of timers with different
    // delays, we don’t thrash timeouts.
    assert.strictEqual(frames, 1);
    assert.strictEqual(timeouts, 0);
  }, 100);
});

it("timer.stop() immediately stops the timer", end => {
  let count = 0;
  const t = timer(function() { ++count; });
  setTimeout(function() {
    t.stop();
    assert.strictEqual(count, 1);
    end();
  }, 24);
});

it("timer.stop() recomputes the new wake time after one frame", end => {
  // A small delay before starting this test to give existing timers a chance to clear.
  setTimeout(() => {
    const setTimeout0 = setTimeout;
    const delays = [];

    // This requests a frame, too, so do it before the test starts.
    now();

    setTimeout = function(callback, delay) {
      delays.push(delay);
      return setTimeout0.apply(this, arguments);
    };

    const t0 = timer(function() {}, 1000);
    const t1 = timer(function() {}, 500);
    setTimeout0(function() {

      // 1. The two timers are scheduling in the first frame, and then the new
      // wake time is computed based on minimum relative time of active timers.
      assert.strictEqual(delays.length, 2);
      assert.strictEqual(delays[0], 17);
      assertInRange(delays[1], 500 - 17 - 10, 500 - 17 + 10);

      t1.stop();

      // 2. The second timer (with the smaller delay) was stopped, but the new
      // wake time isn’t computed until the next frame, since we stopped the timer
      // outside of a flush.
      assert.strictEqual(delays.length, 3);
      assert.strictEqual(delays[2], 17);

      setTimeout0(function() {

        // 3. The alarm was reset to wake for the long-delay.
        assert.strictEqual(delays.length, 4);
        assertInRange(delays[3], 1000 - 100 - 17 * 1.5 - 10, 1000 - 100 - 17 * 1.5 + 10);

        t0.stop();

        setTimeout0(function() {

          // 4. The alarm was cleared after the long-delay timer was cancelled.
          assert.strictEqual(delays.length, 5);
          assert.strictEqual(delays[4], 17);

          setTimeout = setTimeout0;
          end();
        }, 100);
      }, 100);
    }, 100);
  }, 100);
});

it("timer.restart(callback) verifies that callback is a function", end => {
  const t = timer(function() {});
  assert.throws(function() { t.restart(); }, TypeError);
  assert.throws(function() { t.restart(null); }, TypeError);
  assert.throws(function() { t.restart("42"); }, TypeError);
  t.stop();
  end();
});

it("timer.restart(callback) implicitly uses zero delay and the current time", end => {
  const t = timer(function() {}, 1000);
  t.restart(function(elapsed) {
    assertInRange(elapsed, 17 - 10, 17 + 10);
    t.stop();
    end();
  });
});

it("timer.restart(callback, delay, time) recomputes the new wake time after one frame", end => {
  // A small delay before starting this test to give existing timers a chance to clear.
  setTimeout(() => {
    const then = now();
    const setTimeout0 = setTimeout;
    const delays = [];

    setTimeout = function(callback, delay) {
      delays.push(delay);
      return setTimeout0.apply(this, arguments);
    };

    const t = timer(function() {}, 500, then);
    setTimeout0(function() {

      // 1. The timer is scheduled in the first frame, and then the new wake time
      // is computed based on its relative time.
      assert.strictEqual(delays.length, 2);
      assert.strictEqual(delays[0], 17);
      assertInRange(delays[1], 500 - 17 - 10, 500 - 17 + 10);

      t.restart(function() {}, 1000, then);

      // 2. The timer was delayed, but the new wake time isn’t computed until the
      // next frame, since we restarted the timer outside of a flush.
      assert.strictEqual(delays.length, 3);
      assert.strictEqual(delays[2], 17);

      setTimeout0(function() {

        // 3. The alarm was reset to wake for the longer delay.
        assert.strictEqual(delays.length, 4);
        assertInRange(delays[3], 1000 - 100 - 17 * 1.5 - 10, 1000 - 100 - 17 * 1.5 + 10);

        t.stop();

        setTimeout0(function() {

          // 4. The alarm was cleared after the timer was cancelled.
          assert.strictEqual(delays.length, 5);
          assert.strictEqual(delays[4], 17);

          setTimeout = setTimeout0;
          end();
        }, 100);
      }, 100);
    }, 100);
  }, 100);
});

it("timer.stop() immediately followed by restart() doesn’t cause an infinite loop", end => {
  const t = timer(function() {});
  let last;
  t.stop();
  t.restart(function(elapsed) {
    if (!last) return last = elapsed;
    if (elapsed === last) assert.fail("repeated invocation");
    t.stop();
  });
  end();
});

it("timer.stop() immediately followed by restart() doesn’t cause an infinite loop (2)", end => {
  const t0 = timer(function() {}), t1 = timer(function() {});
  let last;
  t0.stop();
  t0.restart(function(elapsed) {
    if (!last) return last = elapsed;
    if (elapsed === last) assert.fail("repeated invocation");
    t0.stop();
  });
  t1.stop();
  end();
});

it("timer.stop() clears the internal _next field after a timeout", end => {
  const t0 = timer(function() {}), t1 = timer(function() {});
  t0.stop();
  setTimeout(function() {
    assert.strictEqual(!t0._next, true);
    t1.stop();
    end();
  }, 100);
});
