var vows = require("vows"),
    load = require("../load"),
    assert = require("../env-assert");

var suite = vows.describe("d3.random");

suite.addBatch({
  "random": {
    topic: load("math/random"),
    "normal": {
      "topic": function(d3) {
        return d3.random.normal();
      },
      "returns a number": function(random) {
        assert.typeOf(random(), "number");
      }
    },
    "logNormal": {
      "topic": function(d3) {
        return d3.random.logNormal();
      },
      "returns a number": function(random) {
        assert.typeOf(random(), "number");
      }
    },
    "irwinHall": {
      "topic": function(d3) {
        return d3.random.irwinHall(10);
      },
      "returns a number": function(random) {
        assert.typeOf(random(), "number");
      }
    }
  }
});

suite.export(module);
