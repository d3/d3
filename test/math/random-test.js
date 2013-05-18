var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.random");

suite.addBatch({
  "random": {
    topic: load("math/random").expression("d3.random"),
    "normal": {
      "topic": function(random) {
        return random.normal();
      },
      "returns a number": function(r) {
        assert.typeOf(r(), "number");
      }
    },
    "logNormal": {
      "topic": function(random) {
        return random.logNormal();
      },
      "returns a number": function(r) {
        assert.typeOf(r(), "number");
      }
    },
    "irwinHall": {
      "topic": function(random) {
        return random.irwinHall(10);
      },
      "returns a number": function(r) {
        assert.typeOf(r(), "number");
      }
    }
  }
});

suite.export(module);
