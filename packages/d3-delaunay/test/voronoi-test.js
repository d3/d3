import assert from "assert";
import {Delaunay} from "../src/index.js";
import Context from "./context.js";

it("voronoi.renderCell(i, context) is a noop for coincident points", () => {
  let voronoi = Delaunay.from([[0, 0], [1, 0], [0, 1], [1, 0]]).voronoi([-1, -1, 2, 2]);
  assert.strictEqual(voronoi.renderCell(3, {}), undefined);
});

it("voronoi.renderCell(i, context) handles midpoint coincident with circumcenter", () => {
  let voronoi = Delaunay.from([[0, 0], [1, 0], [0, 1]]).voronoi([-1, -1, 2, 2]);
  let context = new Context;
  assert.strictEqual((voronoi.renderCell(0, context), context.toString()), `M-1,-1L0.5,-1L0.5,0.5L-1,0.5Z`);
  assert.strictEqual((voronoi.renderCell(1, context), context.toString()), `M2,-1L2,2L0.5,0.5L0.5,-1Z`);
  assert.strictEqual((voronoi.renderCell(2, context), context.toString()), `M-1,2L-1,0.5L0.5,0.5L2,2Z`);
});

it("voronoi.contains(i, x, y) is false for coincident points", () => {
  let voronoi = Delaunay.from([[0, 0], [1, 0], [0, 1], [1, 0]]).voronoi([-1, -1, 2, 2]);
  assert.strictEqual(voronoi.contains(3, 1, 0), false);
  assert.strictEqual(voronoi.contains(1, 1, 0), true);
});

it("voronoi.update() updates the voronoi", () => {
  let delaunay = Delaunay.from([[0, 0], [300, 0], [0, 300], [300, 300], [100, 100]]);
  let voronoi = delaunay.voronoi([-500, -500, 500, 500]);
  for (let i = 0; i < delaunay.points.length; i++) {
    delaunay.points[i] = 10 - delaunay.points[i];
  }
  const p = voronoi.update().cellPolygon(1); // correct after voronoi.update
  assert.deepStrictEqual(p, [[-500, 500], [-500, -140], [-240, -140], [-140, 60], [-140, 500], [-500, 500]]);
});

it("voronoi.update() updates a degenerate voronoi", () => {
  const pts = [10, 10, -290, 10, 10, -290, -290, -290, -90, -90];
  let delaunay = new Delaunay(Array.from({length: pts.length}).fill(0));
  let voronoi = delaunay.voronoi([-500, -500, 500, 500]);
  assert.deepStrictEqual(voronoi.cellPolygon(0), [ [ 500, -500 ], [ 500, 500 ], [ -500, 500 ], [ -500, -500 ], [ 500, -500 ] ]);
  assert.strictEqual(voronoi.cellPolygon(1), null);
  for (let i = 0; i < delaunay.points.length; i++) {
    delaunay.points[i] = pts[i];
  }
  const p = voronoi.update().cellPolygon(1);
  assert.deepStrictEqual(p, [[-500, 500], [-500, -140], [-240, -140], [-140, 60], [-140, 500], [-500, 500]]);
});

it("zero-length edges are removed", () => {
   const voronoi1 = Delaunay.from([[50, 10], [10, 50], [10, 10], [200, 100]]).voronoi([40, 40, 440, 180]);
   assert.strictEqual(voronoi1.cellPolygon(0).length, 4);
   const voronoi2 = Delaunay.from([[10, 10], [20, 10]]).voronoi([0, 0, 30, 20]);
   assert.deepStrictEqual(voronoi2.cellPolygon(0), [[0, 20], [0, 0], [15, 0], [15, 20], [0, 20]]);
});

it("voronoi neighbors are clipped", () => {
   const voronoi = Delaunay.from([[300, 10], [200, 100], [300, 100], [10, 10], [350, 200], [350, 400]]).voronoi([0, 0, 500, 150]);
   assert.deepStrictEqual([0, 1, 2, 3, 4, 5].map(i => [...voronoi.neighbors(i)].sort()), [ [1, 2], [0, 2, 3], [0, 1, 4], [1], [2], []]);
});

it("unnecessary points on the corners are avoided (#88)", () => {
  for (const [points, lengths] of [
    [ [[289,25],[3,22],[93,165],[282,184],[65,89]], [ 6, 4, 6, 5, 6 ] ],
    [ [[189,13],[197,26],[47,133],[125,77],[288,15]], [ 4, 6, 5, 6, 5 ] ],
    [ [[44,42],[210,193],[113,103],[185,43],[184,37]], [ 5, 5, 7, 5, 6 ]]
  ]) {
    const voronoi = Delaunay.from(points).voronoi([0, 0, 290, 190]);
    assert.deepStrictEqual([...voronoi.cellPolygons()].map(d => d.length), lengths);
  }
});

it("a degenerate triangle is avoided", () => {
  const pts = [[424.75, 253.75],[424.75, 253.74999999999997],[407.17640687119285, 296.17640687119285],[364.75, 313.75],[322.32359312880715, 296.17640687119285],[304.75, 253.75],[322.32359312880715, 211.32359312880715],[364.75, 193.75],[407.17640687119285, 211.32359312880715],[624.75, 253.75],[607.1764068711929, 296.17640687119285],[564.75, 313.75],[522.3235931288071, 296.17640687119285],[504.75, 253.75],[564.75, 193.75]
  ]
  const voronoi = Delaunay.from(pts).voronoi([10, 10, 960, 500]);
  assert.strictEqual(voronoi.cellPolygon(0).length, 4);
});

it("cellPolygons filter out empty cells and have the cell index as a property", () => {
  const pts = [[0, 0], [3, 3], [1, 1], [-3, -2]];
  const voronoi = Delaunay.from(pts).voronoi([0, 0, 2, 2]);
  assert.deepStrictEqual([...voronoi.cellPolygons()], [
    Object.assign([[0, 0], [1, 0], [0, 1], [0, 0]], {index:0, }),
    Object.assign([[2, 2], [0, 2], [0, 1], [1, 0], [2, 0], [2, 2]], { index: 2 })
  ]);
});

it("voronoi.neighbors returns the correct neighbors", () => {
  const points = [[10, 10], [36, 27], [90, 19], [50, 75]];
  const voronoi = Delaunay.from(points).voronoi([0, 0, 100, 90]);
  assert.deepStrictEqual([0, 1, 2, 3].map(i => [...voronoi.neighbors(i)].sort()), [[1], [0, 2, 3], [1, 3], [1, 2]]);
});

it("voronoi.neighbors returns the correct neighbors, flipped vertically", () => {
  const points = [[10, -10], [36, -27], [90, -19], [50, -75]];
  const voronoi = Delaunay.from(points).voronoi([0, -90, 100, 0]);
  assert.deepStrictEqual([0, 1, 2, 3].map(i => [...voronoi.neighbors(i)].sort()), [[1], [0, 2, 3], [1, 3], [1, 2]]);
});

it("voronoi.neighbors returns the correct neighbors, flipped horizontally", () => {
  const points = [[-10, 10], [-36, 27], [-90, 19], [-50, 75]];
  const voronoi = Delaunay.from(points).voronoi([-100, 0, 0, 90]);
  assert.deepStrictEqual([0, 1, 2, 3].map(i => [...voronoi.neighbors(i)].sort()), [[1], [0, 2, 3], [1, 3], [1, 2]]);
});

it("voronoi.neighbors returns the correct neighbors, rotated", () => {
  const points = [[-10, -10], [-36, -27], [-90, -19], [-50, -75]];
  const voronoi = Delaunay.from(points).voronoi([-100, -90, 0, 0]);
  assert.deepStrictEqual([0, 1, 2, 3].map(i => [...voronoi.neighbors(i)].sort()), [[1], [0, 2, 3], [1, 3], [1, 2]]);
});

it("voronoi returns the expected result (#136)", () => {
  const points = [
    [447.27981036477433, 698.9400262172304],
    [485.27830313288746, 668.9946483670656],
    [611.9525697080425, 397.71056371206487],
    [491.44637766366105, 692.071157339428],
    [697.553622336339, 692.071157339428],
    [497.00778156318086, 667.1990851383492],
    [691.9922184368191, 667.1990851383492],
    [544.9897579870977, 407.0828550310619],
    [543.1738215956482, 437.35879519252677]
  ];
  const voronoi = Delaunay.from(points).voronoi([0, 0, 1000, 1000]);
  assert.strictEqual(voronoi.cellPolygon(3).length, 6);
});

it("voronoi returns the expected result (#141)", () => {
  const points = [[10, 190]].concat(Array.from({ length: 7 }, (d, i) => [i * 80, (i * 50) / 7]));
  const voronoi = Delaunay.from(points).voronoi([1, 1, 499, 199]);
  assert.deepEqual(Array.from(voronoi.cellPolygons(), (d) => d.length), [7, 5, 5, 5, 6, 5, 5, 5]);
});
