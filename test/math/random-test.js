require("../env");

var vows = require("vows"),
    assert = require("../env-assert");

var suite = vows.describe("d3.random");

suite.addBatch({
  "normal": {
    "topic": function() {
      return d3.random.normal();
    },
    "returns a number": function(random) {
      assert.typeOf(random(), "number");
    }
  },
  "logNormal": {
    "topic": function() {
      return d3.random.logNormal();
    },
    "returns a number": function(random) {
      assert.typeOf(random(), "number");
    }
  },
  "irwinHall": {
    "topic": function() {
      return d3.random.irwinHall(10);
    },
    "returns a number": function(random) {
      assert.typeOf(random(), "number");
    }
  }
});

suite.export(module);
