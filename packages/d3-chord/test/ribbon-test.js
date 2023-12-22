import assert from "assert";
import {ribbon} from "../src/index.js";

it("ribbon() has the expected defaults", () => {
  const r = ribbon();
  assert.strictEqual(r.radius()({radius: 42}), 42);
  assert.strictEqual(r.startAngle()({startAngle: 42}), 42);
  assert.strictEqual(r.endAngle()({endAngle: 42}), 42);
  assert.deepStrictEqual(r.source()({source: {name: "foo"}}), {name: "foo"});
  assert.deepStrictEqual(r.target()({target: {name: "foo"}}), {name: "foo"});
  assert.strictEqual(r.context(), null);
});

it("ribbon.radius(radius) sets the radius accessor", () => {
  const foo = d => d.foo;
  const r = ribbon();
  assert.strictEqual(r.radius(foo), r);
  assert.strictEqual(r.radius(), foo);
  assert.strictEqual(r.radius(42), r);
  assert.strictEqual(r.radius()(), 42);
});

it("ribbon.startAngle(startAngle) sets the startAngle accessor", () => {
  const foo = d => d.foo;
  const r = ribbon();
  assert.strictEqual(r.startAngle(foo), r);
  assert.strictEqual(r.startAngle(), foo);
  assert.strictEqual(r.startAngle(1.2), r);
  assert.strictEqual(r.startAngle()(), 1.2);
});

it("ribbon.endAngle(endAngle) sets the endAngle accessor", () => {
  const foo = d => d.foo;
  const r = ribbon();
  assert.strictEqual(r.endAngle(foo), r);
  assert.strictEqual(r.endAngle(), foo);
  assert.strictEqual(r.endAngle(1.2), r);
  assert.strictEqual(r.endAngle()(), 1.2);
});

it("ribbon.source(source) sets the source accessor", () => {
  const foo = d => d.foo;
  const r = ribbon();
  assert.strictEqual(r.source(foo), r);
  assert.strictEqual(r.source(), foo);
});

it("ribbon.target(target) sets the target accessor", () => {
  const foo = d => d.foo;
  const r = ribbon();
  assert.strictEqual(r.target(foo), r);
  assert.strictEqual(r.target(), foo);
});
