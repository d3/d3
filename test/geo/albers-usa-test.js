require("../env");

var vows = require("vows"),
    assert = require("../env-assert");

var suite = vows.describe("d3.geo.albersUsa");

suite.addBatch({
  "albersUsa": {
    topic: d3.geo.albersUsa,
    "Washington": equalInverse([-120.5, 47.5], [215.478997, 51.976493]),
    "San Francisco": equalInverse([-122.42, 37.78], [150.072677, 211.257829]),
    "Juneau, Alaska": equalInverse([-134.22, 58.43], [217.366590, 409.498517]),
    "Honolulu, Hawaii": equalInverse([-157.82, 21.30], [325.696002, 427.278824]),
    "San Juan, Puerto Rico": equalInverse([-66.07, 18.45], [909.159250, 456.394827])
  }
});

suite.export(module);

function equalInverse(location, point) {
  return function(projection) {
    var projected;
    assert.inDelta(projected = projection(location), point, 1e-6);
    assert.inDelta(projection.invert(projected), location, 1e-6);
    assert.inDelta(projection(projection.invert(point)), point, 1e-6);
  };
};
