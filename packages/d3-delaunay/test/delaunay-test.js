import assert from "assert";
import {Delaunay} from "../src/index.js";
import Path from "../src/path.js";
import Context from "./context.js";

it("Delaunay.from(array)", () => {
  let delaunay = Delaunay.from([[0, 0], [1, 0], [0, 1], [1, 1]]);
  assert.deepStrictEqual(delaunay.points, Float64Array.of(0, 0, 1, 0, 0, 1, 1, 1));
  assert.deepStrictEqual(delaunay.triangles, Uint32Array.of(0, 2, 1, 2, 3, 1));
  assert.deepStrictEqual(delaunay.halfedges, Int32Array.of(-1, 5, -1, -1, -1, 1));
  assert.deepStrictEqual(delaunay.inedges, Int32Array.of(2, 4, 0, 3));
  assert.deepStrictEqual(Array.from(delaunay.neighbors(0)), [1, 2]);
  assert.deepStrictEqual(Array.from(delaunay.neighbors(1)), [3, 2, 0]);
  assert.deepStrictEqual(Array.from(delaunay.neighbors(2)), [0, 1, 3]);
  assert.deepStrictEqual(Array.from(delaunay.neighbors(3)), [2, 1]);
});

it("Delaunay.from(array) handles coincident points", () => {
  let delaunay = Delaunay.from([[0, 0], [1, 0], [0, 1], [1, 0]]);
  assert.deepStrictEqual(delaunay.inedges, Int32Array.of(2, 1, 0, -1));
  assert.deepStrictEqual(Array.from(delaunay.neighbors(0)), [1, 2]);
  assert.deepStrictEqual(Array.from(delaunay.neighbors(1)), [2, 0]);
  assert.deepStrictEqual(Array.from(delaunay.neighbors(2)), [0, 1]);
  assert.deepStrictEqual(Array.from(delaunay.neighbors(3)), []);
});

it("Delaunay.from(iterable)", () => {
  let delaunay = Delaunay.from((function*() {
    yield [0, 0];
    yield [1, 0];
    yield [0, 1];
    yield [1, 1];
  })());
  assert.deepStrictEqual(delaunay.points, Float64Array.of(0, 0, 1, 0, 0, 1, 1, 1));
  assert.deepStrictEqual(delaunay.triangles, Uint32Array.of(0, 2, 1, 2, 3, 1));
  assert.deepStrictEqual(delaunay.halfedges, Int32Array.of(-1, 5, -1, -1, -1, 1));
});

it("Delaunay.from(iterable, fx, fy)", () => {
  let delaunay = Delaunay.from((function*() {
    yield {x: 0, y: 0};
    yield {x: 1, y: 0};
    yield {x: 0, y: 1};
    yield {x: 1, y: 1};
  })(), d => d.x, d => d.y);
  assert.deepStrictEqual(delaunay.points, Float64Array.of(0, 0, 1, 0, 0, 1, 1, 1));
  assert.deepStrictEqual(delaunay.triangles, Uint32Array.of(0, 2, 1, 2, 3, 1));
  assert.deepStrictEqual(delaunay.halfedges, Int32Array.of(-1, 5, -1, -1, -1, 1));
});

it("Delaunay.from({length}, fx, fy)", () => {
  let delaunay = Delaunay.from({length: 4}, (d, i) => i & 1, (d, i) => (i >> 1) & 1);
  assert.deepStrictEqual(delaunay.points, Float64Array.of(0, 0, 1, 0, 0, 1, 1, 1));
  assert.deepStrictEqual(delaunay.triangles, Uint32Array.of(0, 2, 1, 2, 3, 1));
  assert.deepStrictEqual(delaunay.halfedges, Int32Array.of(-1, 5, -1, -1, -1, 1));
});

it("delaunay.voronoi() uses the default bounds", () => {
  let voronoi = Delaunay.from([[0, 0], [1, 0], [0, 1], [1, 1]]).voronoi();
  assert.strictEqual(voronoi.xmin, 0);
  assert.strictEqual(voronoi.ymin, 0);
  assert.strictEqual(voronoi.xmax, 960);
  assert.strictEqual(voronoi.ymax, 500);
});

it("delaunay.voronoi([xmin, ymin, xmax, ymax]) uses the specified bounds", () => {
  let voronoi = Delaunay.from([[0, 0], [1, 0], [0, 1], [1, 1]]).voronoi([-1, -1, 2, 2]);
  assert.strictEqual(voronoi.xmin, -1);
  assert.strictEqual(voronoi.ymin, -1);
  assert.strictEqual(voronoi.xmax, 2);
  assert.strictEqual(voronoi.ymax, 2);
});

it("delaunay.voronoi() returns the expected diagram", () => {
  let voronoi = Delaunay.from([[0, 0], [1, 0], [0, 1], [1, 1]]).voronoi();
  assert.deepStrictEqual(voronoi.circumcenters, Float64Array.of(0.5, 0.5, 0.5, 0.5));
  assert.deepStrictEqual(voronoi.vectors, Float64Array.of(0, -1, -1, 0, 1, 0, 0, -1, -1, 0, 0, 1, 0, 1, 1, 0));
});

it("delaunay.voronoi() skips cells for coincident points", () => {
  let voronoi = Delaunay.from([[0, 0], [1, 0], [0, 1], [1, 0]]).voronoi([-1, -1, 2, 2]);
  assert.deepStrictEqual(voronoi.circumcenters, Float64Array.of(0.5, 0.5));
  assert.deepStrictEqual(voronoi.vectors, Float64Array.of(0, -1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, 0, 0, 0));
});

it("delaunay.voronoi() for zero point returns expected values", () => {
  let voronoi = Delaunay.from([]).voronoi([-1, -1, 2, 2]);
  assert.strictEqual(voronoi.render(), null);
});

it("delaunay.renderPoints() accepts r", () => {
  const delaunay = Delaunay.from([[0, 0]]);
  assert.strictEqual(delaunay.renderPoints(), 'M2,0A2,2,0,1,1,-2,0A2,2,0,1,1,2,0');
  assert.strictEqual(delaunay.renderPoints(5), 'M5,0A5,5,0,1,1,-5,0A5,5,0,1,1,5,0');
  assert.strictEqual(delaunay.renderPoints("5"), 'M5,0A5,5,0,1,1,-5,0A5,5,0,1,1,5,0');
  assert.strictEqual(delaunay.renderPoints(null, 5), 'M5,0A5,5,0,1,1,-5,0A5,5,0,1,1,5,0');
  assert.strictEqual(delaunay.renderPoints(undefined), 'M2,0A2,2,0,1,1,-2,0A2,2,0,1,1,2,0');
  assert.strictEqual(delaunay.renderPoints(null), 'M2,0A2,2,0,1,1,-2,0A2,2,0,1,1,2,0');
  assert.strictEqual(delaunay.renderPoints(null, null), 'M2,0A2,2,0,1,1,-2,0A2,2,0,1,1,2,0');
  const path = new Path();
  assert.strictEqual((delaunay.renderPoints(path, "3"), path.value()), 'M3,0A3,3,0,1,1,-3,0A3,3,0,1,1,3,0');
});

it("delaunay.voronoi() for one point returns the bounding rectangle", () => {
  let voronoi = Delaunay.from([[0, 0]]).voronoi([-1, -1, 2, 2]);
  assert.strictEqual(voronoi.renderCell(0), "M2,-1L2,2L-1,2L-1,-1Z");
  assert.strictEqual(voronoi.render(), null);
});

it("delaunay.voronoi() for two points", () => {
  let voronoi = Delaunay.from([[0, 0], [1, 0], [1, 0], [1, 0]]).voronoi([-1, -1, 2, 2]);
  assert.strictEqual(voronoi.renderCell(0), "M-1,2L-1,-1L0.5,-1L0.5,2Z");
  assert.strictEqual(voronoi.delaunay.find(-1,0), 0);
  assert.strictEqual(voronoi.delaunay.find(2,0), 1);
});

it("delaunay.voronoi() for collinear points", () => {
  let voronoi = Delaunay.from([[0, 0], [1, 0], [-1, 0]]).voronoi([-1, -1, 2, 2]);
  assert.deepStrictEqual(Array.from(voronoi.delaunay.neighbors(0)).sort(), [1, 2]);
  assert.deepStrictEqual(Array.from(voronoi.delaunay.neighbors(1)), [0]);
  assert.deepStrictEqual(Array.from(voronoi.delaunay.neighbors(2)), [0]);
});

it("delaunay.find(x, y) returns the index of the cell that contains the specified point", () => {
  let delaunay = Delaunay.from([[0, 0], [300, 0], [0, 300], [300, 300], [100, 100]]);
  assert.strictEqual(delaunay.find(49, 49), 0);
  assert.strictEqual(delaunay.find(51, 51), 4);
});

it("delaunay.find(x, y) works with one or two points", () => {
  const points = [[0, 1], [0, 2]];
  const delaunay = Delaunay.from(points);
  assert.strictEqual(points[delaunay.find(0, -1)][1], 1);
  assert.strictEqual(points[delaunay.find(0, 2.2)][1], 2);
  delaunay.points.fill(0);
  delaunay.update();
  assert.strictEqual(delaunay.find(0, -1), 0);
  assert.strictEqual(delaunay.find(0, 1.2), 0);
});

it("delaunay.find(x, y) works with collinear points", () => {
  const points = [[0, 1], [0, 2], [0, 4], [0, 0], [0, 3], [0, 4], [0, 4]];
  const delaunay = Delaunay.from(points);
  assert.strictEqual(points[delaunay.find(0, -1)][1], 0);
  assert.strictEqual(points[delaunay.find(0, 1.2)][1], 1);
  assert.strictEqual(points[delaunay.find(1, 1.9)][1], 2);
  assert.strictEqual(points[delaunay.find(-1, 3.3)][1], 3);
  assert.strictEqual(points[delaunay.find(10, 10)][1], 4);
  assert.strictEqual(points[delaunay.find(10, 10, 0)][1], 4);
});

it("delaunay.find(x, y) works with collinear points 2", () => {
  const points = Array.from({ length: 120 }, (_, i) => [i * 4, i / 3 + 100]);
  const delaunay = Delaunay.from(points);
  assert.deepStrictEqual([...delaunay.neighbors(2)], [ 1, 3 ]);
});

it("delaunay.find(x, y) works with collinear points 3", () => {
  const points = Array.from({ length: 120 }, (_, i) => [i * 4, i / 3 + 100]);
  const delaunay = Delaunay.from(points);
  assert.deepStrictEqual([...delaunay.neighbors(2)], [ 1, 3 ]);
});

it("delaunay.find(x, y) works with collinear points (large)", () => {
  const points = Array.from({length: 2000}, (_,i) => [i**2,i**2]);
  const delaunay = Delaunay.from(points);
  assert.strictEqual(points[delaunay.find(0, -1)][1], 0);
  assert.strictEqual(points[delaunay.find(0, 1.2)][1], 1);
  assert.strictEqual(points[delaunay.find(3.9, 3.9)][1], 4);
  assert.strictEqual(points[delaunay.find(10, 9.5)][1], 9);
  assert.strictEqual(points[delaunay.find(10, 9.5, 0)][1], 9);
  assert.strictEqual(points[delaunay.find(1e6, 1e6)][1], 1e6);
});

it("delaunay.update() allows fast updates", () => {
  let delaunay = Delaunay.from([[0, 0], [300, 0], [0, 300], [300, 300], [100, 100]]);
  let circumcenters1 = delaunay.voronoi([-500, -500, 500, 500]).circumcenters;
  for (let i = 0; i < delaunay.points.length; i++) {
    delaunay.points[i] = -delaunay.points[i];
  }
  delaunay.update();
  let circumcenters2 = delaunay.voronoi([-500, -500, 500, 500]).circumcenters;
  assert.deepStrictEqual(circumcenters1, Float64Array.from([ 150, -50, -50, 150, 250, 150, 150, 250 ]));
  assert.deepStrictEqual(circumcenters2, Float64Array.from([ -150, 50, -250, -150, 50, -150, -150, -250 ]));
});

it("delaunay.update() updates collinear points", () => {
  const delaunay = new Delaunay(Array.from({ length: 250 }).fill(0));
  assert.strictEqual(delaunay.collinear, undefined);
  for (let i = 0; i < delaunay.points.length; i++)
    delaunay.points[i] = (i % 2) ? i : 0;
  delaunay.update();
  assert.strictEqual(delaunay.collinear.length, 125);
  for (let i = 0; i < delaunay.points.length; i++)
    delaunay.points[i] = Math.sin(i);
  delaunay.update();
  assert.strictEqual(delaunay.collinear, undefined);
  for (let i = 0; i < delaunay.points.length; i++)
    delaunay.points[i] = (i % 2) ? i : 0;
  delaunay.update();
  assert.strictEqual(delaunay.collinear.length, 125);
  for (let i = 0; i < delaunay.points.length; i++)
    delaunay.points[i] = 0;
  delaunay.update();
  assert.strictEqual(delaunay.collinear, undefined);
});

it("delaunay.find(x, y) with coincident point", () => {
  let delaunay = Delaunay.from([[0, 0], [0, 0], [10,10], [10, -10]]);
  assert.strictEqual(delaunay.find(100,100), 2);
  assert(delaunay.find(0,0,1) > -1);
  delaunay = Delaunay.from(Array.from({length:1000}, () => [0, 0]).concat([[10,10], [10, -10]]));
  assert(delaunay.find(0,0,1) > -1);
});

it("delaunay.find(x, y, i) traverses the convex hull", () => {
  let delaunay = new Delaunay(Float64Array.of(509,253,426,240,426,292,567,272,355,356,413,392,319,408,374,285,327,303,381,215,475,319,301,352,247,426,532,334,234,366,479,375,251,302,340,170,160,377,626,317,177,296,322,243,195,422,241,232,585,358,666,406,689,343,172,198,527,401,766,350,444,432,117,316,267,170,580,412,754,425,117,231,725,300,700,222,438,165,703,168,558,221,475,211,491,125,216,166,240,108,783,266,640,258,184,77,387,90,162,125,621,162,296,78,532,154,763,199,132,165,422,343,312,128,125,77,450,95,635,106,803,415,714,63,529,87,388,152,575,126,573,64,726,381,773,143,787,67,690,117,813,203,811,319));
  assert.strictEqual(delaunay.find(49, 311), 31);
  assert.strictEqual(delaunay.find(49, 311, 22), 31);
});

it("delaunay.renderHull(context) is closed", () => {
  let delaunay = Delaunay.from([[0, 0], [1, 0], [0, 1], [1, 1]]);
  let context = new Context;
  assert.strictEqual((delaunay.renderHull(context), context.toString()), `M0,1L1,1L1,0L0,0Z`);
});
