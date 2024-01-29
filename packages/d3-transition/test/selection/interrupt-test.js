import assert from "assert";
import {select} from "d3-selection";
import {timeout} from "d3-timer";
import "../../src/index.js";
import {CREATED, ENDED, ENDING, SCHEDULED, STARTED, STARTING} from "../../src/transition/schedule.js";
import it from "../jsdom.js";

it("selection.interrupt() returns the selection", () => {
  const s = select(document);
  assert.strictEqual(s.interrupt(), s);
});

it("selection.interrupt() cancels any pending transitions on the selected elements", () => {
  const root = document.documentElement;
  const s = select(root);
  const t1 = s.transition();
  const t2 = t1.transition();
  assert.strictEqual(t1._id in root.__transition, true);
  assert.strictEqual(t2._id in root.__transition, true);
  assert.strictEqual(s.interrupt(), s);
  assert.strictEqual(root.__transition, undefined);
});

it("selection.interrupt() only cancels pending transitions with the null name", () => {
  const root = document.documentElement;
  const s = select(root);
  const t1 = s.transition("foo");
  const t2 = s.transition();
  assert.strictEqual(t1._id in root.__transition, true);
  assert.strictEqual(t2._id in root.__transition, true);
  assert.strictEqual(s.interrupt(), s);
  assert.strictEqual(t1._id in root.__transition, true);
  assert.strictEqual(t2._id in root.__transition, false);
});

it("selection.interrupt(null) only cancels pending transitions with the null name", () => {
  const root = document.documentElement;
  const s = select(root);
  const t1 = s.transition("foo");
  const t2 = s.transition();
  assert.strictEqual(t1._id in root.__transition, true);
  assert.strictEqual(t2._id in root.__transition, true);
  assert.strictEqual(s.interrupt(null), s);
  assert.strictEqual(t1._id in root.__transition, true);
  assert.strictEqual(t2._id in root.__transition, false);
});

it("selection.interrupt(undefined) only cancels pending transitions with the null name", () => {
  const root = document.documentElement;
  const s = select(root);
  const t1 = s.transition("foo");
  const t2 = s.transition();
  assert.strictEqual(t1._id in root.__transition, true);
  assert.strictEqual(t2._id in root.__transition, true);
  assert.strictEqual(s.interrupt(undefined), s);
  assert.strictEqual(t1._id in root.__transition, true);
  assert.strictEqual(t2._id in root.__transition, false);
});

it("selection.interrupt(name) only cancels pending transitions with the specified name", () => {
  const root = document.documentElement;
  const s = select(root);
  const t1 = s.transition("foo");
  const t2 = s.transition();
  assert.strictEqual(t1._id in root.__transition, true);
  assert.strictEqual(t2._id in root.__transition, true);
  assert.strictEqual(s.interrupt("foo"), s);
  assert.strictEqual(t1._id in root.__transition, false);
  assert.strictEqual(t2._id in root.__transition, true);
});

it("selection.interrupt(name) coerces the name to a string", () => {
  const root = document.documentElement;
  const s = select(root);
  const t1 = s.transition("foo");
  const t2 = s.transition();
  assert.strictEqual(t1._id in root.__transition, true);
  assert.strictEqual(t2._id in root.__transition, true);
  assert.strictEqual(s.interrupt({toString() { return "foo"; }}), s);
  assert.strictEqual(t1._id in root.__transition, false);
  assert.strictEqual(t2._id in root.__transition, true);
});

it("selection.interrupt() does nothing if there is no transition on the selected elements", () => {
  const root = document.documentElement;
  const s = select(root);
  assert.strictEqual(root.__transition, undefined);
  assert.strictEqual(s.interrupt(), s);
  assert.strictEqual(root.__transition, undefined);
});

it("selection.interrupt() dispatches an interrupt event to the started transition on the selected elements", async () => {
  const root = document.documentElement;
  let interrupts = 0;
  const s = select(root);
  const t = s.transition().on("interrupt", () => { ++interrupts; });
  await new Promise(resolve => timeout(() => {
    const schedule = root.__transition[t._id];
    assert.strictEqual(schedule.state, STARTED);
    s.interrupt();
    assert.strictEqual(schedule.timer._call, null);
    assert.strictEqual(schedule.state, ENDED);
    assert.strictEqual(root.__transition, undefined);
    assert.strictEqual(interrupts, 1);
    resolve();
  }));
});

it("selection.interrupt() destroys the schedule after dispatching the interrupt event", async () => {
  const root = document.documentElement;
  const s = select(root);
  const t = s.transition().on("interrupt", interrupted);
  await new Promise(resolve => timeout(() => {
    s.interrupt();
    resolve();
  }));
  function interrupted() {
    assert.strictEqual(t.delay(), 0);
    assert.strictEqual(t.duration(), 250);
    assert.strictEqual(t.on("interrupt"), interrupted);
  }
});

it("selection.interrupt() does not dispatch an interrupt event to a starting transition", async () => {
  const root = document.documentElement;
  let interrupts = 0;
  const s = select(root);
  const t = s.transition().on("interrupt", () => { ++interrupts; });
  await new Promise(resolve => t.on("start", () => {
    const schedule = root.__transition[t._id];
    assert.strictEqual(schedule.state, STARTING);
    s.interrupt();
    assert.strictEqual(schedule.timer._call, null);
    assert.strictEqual(schedule.state, ENDED);
    assert.strictEqual(root.__transition, undefined);
    assert.strictEqual(interrupts, 0);
    resolve();
  }));
});

it("selection.interrupt() prevents a created transition from starting", async () => {
  const root = document.documentElement;
  let starts = 0;
  const s = select(root);
  const t = s.transition().on("start", () => { ++starts; });
  const schedule = root.__transition[t._id];
  assert.strictEqual(schedule.state, CREATED);
  s.interrupt();
  assert.strictEqual(schedule.timer._call, null);
  assert.strictEqual(schedule.state, ENDED);
  assert.strictEqual(root.__transition, undefined);
  await new Promise(resolve => timeout(resolve, 10));
  assert.strictEqual(starts, 0);
});

it("selection.interrupt() prevents a scheduled transition from starting", async () => {
  const root = document.documentElement;
  let starts = 0;
  const s = select(root);
  const t = s.transition().delay(50).on("start", () => { ++starts; });
  const schedule = root.__transition[t._id];
  await new Promise(resolve => timeout(resolve));
  assert.strictEqual(schedule.state, SCHEDULED);
  s.interrupt();
  assert.strictEqual(schedule.timer._call, null);
  assert.strictEqual(schedule.state, ENDED);
  assert.strictEqual(root.__transition, undefined);
  await new Promise(resolve => timeout(resolve, 60));
  assert.strictEqual(starts, 0);
});

it("selection.interrupt() prevents a starting transition from initializing tweens", async () => {
  const root = document.documentElement;
  let tweens = 0;
  const s = select(root);
  const t = s.transition().tween("tween", () => { ++tweens; });
  const schedule = root.__transition[t._id];
  await new Promise(resolve => t.on("start", () => {
    assert.strictEqual(schedule.state, STARTING);
    s.interrupt();
    assert.strictEqual(schedule.timer._call, null);
    assert.strictEqual(schedule.state, ENDED);
    assert.strictEqual(root.__transition, undefined);
    resolve();
  }));
  await new Promise(resolve => timeout(resolve, 10));
  assert.strictEqual(tweens, 0);
});

it("selection.interrupt() during tween initialization prevents an active transition from continuing", async () => {
  const root = document.documentElement;
  let tweens = 0;
  const s = select(root);
  const t = s.transition().tween("tween", () => { s.interrupt(); return () => { ++tweens; }; });
  const schedule = root.__transition[t._id];
  await new Promise(resolve => timeout(resolve, 10));
  assert.strictEqual(schedule.timer._call, null);
  assert.strictEqual(schedule.state, ENDED);
  assert.strictEqual(root.__transition, undefined);
  assert.strictEqual(tweens, 0);
});

it("selection.interrupt() prevents an active transition from continuing", async () => {
  const root = document.documentElement;
  let interrupted = false;
  let tweens = 0;
  const s = select(root);
  const t = s.transition().tween("tween", () => () => { if (interrupted) ++tweens; });
  const schedule = root.__transition[t._id];
  await new Promise(resolve => timeout(() => {
    interrupted = true;
    assert.strictEqual(schedule.state, STARTED);
    s.interrupt();
    assert.strictEqual(schedule.timer._call, null);
    assert.strictEqual(schedule.state, ENDED);
    assert.strictEqual(root.__transition, undefined);
    resolve();
  }, 10));
  await new Promise(resolve => timeout(resolve, 50));
  assert.strictEqual(tweens, 0);
});

it("selection.interrupt() during the final tween invocation prevents the end event from being dispatched", async () => {
  const root = document.documentElement;
  let ends = 0;
  const s = select(root);
  const t = s.transition().duration(50).tween("tween", tween).on("end", () => { ++ends; });
  const schedule = root.__transition[t._id];
  function tween() {
    return (t) => {
      if (t >= 1) {
        assert.strictEqual(schedule.state, ENDING);
        s.interrupt();
      }
    };
  }
  await new Promise(resolve => timeout(() => {
    assert.strictEqual(schedule.timer._call, null);
    assert.strictEqual(schedule.state, ENDED);
    assert.strictEqual(root.__transition, undefined);
    assert.strictEqual(ends, 0);
    resolve();
  }, 60));
});

it("selection.interrupt() has no effect on an ended transition", async () => {
  const root = document.documentElement;
  const s = select(root);
  const t = s.transition().duration(50);
  const schedule = root.__transition[t._id];
  await t.end();
  assert.strictEqual(schedule.state, ENDED);
  assert.strictEqual(schedule.timer._call, null);
  s.interrupt();
  assert.strictEqual(schedule.state, ENDED);
  assert.strictEqual(schedule.timer._call, null);
  assert.strictEqual(root.__transition, undefined);
});

it("selection.interrupt() has no effect on an interrupting transition", async () => {
  const root = document.documentElement;
  let interrupts = 0;
  const s = select(root);
  const t = s.transition().duration(50).on("interrupt", interrupted);
  const schedule = root.__transition[t._id];

  function interrupted() {
    ++interrupts;
    s.interrupt();
  }

  await new Promise(resolve => timeout(() => {
    assert.strictEqual(schedule.state, STARTED);
    s.interrupt();
    assert.strictEqual(schedule.state, ENDED);
    assert.strictEqual(schedule.timer._call, null);
    assert.strictEqual(interrupts, 1);
    resolve();
  }));
});
