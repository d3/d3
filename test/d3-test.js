var tape = require("tape"),
    d3 = require("../"),
    testExports = require("./test-exports");

tape("version matches package.json", function(test) {
  test.equal(d3.version, require("../package.json").version);
  test.end();
});

testExports("d3-array");
testExports("d3-axis");
testExports("d3-brush");
testExports("d3-collection");
testExports("d3-color");
testExports("d3-dispatch");
testExports("d3-drag");
testExports("d3-dsv");
testExports("d3-ease");
testExports("d3-force");
testExports("d3-format");
testExports("d3-geo");
testExports("d3-hierarchy");
testExports("d3-interpolate");
testExports("d3-path");
testExports("d3-polygon");
testExports("d3-quadtree");
testExports("d3-queue");
testExports("d3-random");
testExports("d3-request");
testExports("d3-scale");
testExports("d3-selection");
testExports("d3-shape");
testExports("d3-time");
testExports("d3-time-format");
testExports("d3-timer");
testExports("d3-transition");
testExports("d3-voronoi");
testExports("d3-zoom");
