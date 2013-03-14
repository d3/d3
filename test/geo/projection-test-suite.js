var assert = require("../assert"),
    _ = require("../../"),
    format = _.format("13.8f");

module.exports = function(suite, mapping) {

  for (var place in mapping) {
    suite[place] = test(mapping[place][0], mapping[place][1]);
  }

  function test(location, point) {
    return function(projection) {
      var actualLocation = projection.invert(point),
          actualPoint = projection(location);
      try {
        assert.inDelta([actualPoint, actualLocation], [point, location], 1e-5);
      } catch (e) {
        e.message = "project [["
            + location.map(format).join(", ") + "], [" + actualPoint.map(format).join(", ")
            + "]]\n         invert [["
            + actualLocation.map(format).join(", ") + "], [" + point.map(format).join(", ")
            + "]]";
        throw e;
      }
    };
  }

  return suite;
};
