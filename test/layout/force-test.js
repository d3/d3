var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.layout.force");

suite.addBatch({
  "force": {
    topic: load("layout/force").expression("d3.layout.force").document(),

    "default instance": {
      topic: function(force) {
        return force();
      },

      "friction": {
        "defaults to .9": function(f) {
          assert.equal(f.friction(), .9);
        },
        "can be a number": function(f) {
          f.friction(.5);
          assert.equal(f.friction(), .5);
        },
        "coerces to a number": function(f) {
          f.friction(".5");
          assert.strictEqual(f.friction(), .5);
        }
      },

      "gravity": {
        "defaults to .1": function(f) {
          assert.equal(f.gravity(), .1);
        },
        "can be a number": function(f) {
          f.gravity(.5);
          assert.equal(f.gravity(), .5);
        },
        "coerces to a number": function(f) {
          f.gravity(".5");
          assert.strictEqual(f.gravity(), .5);
        }
      },

      "theta": {
        "defaults to .8": function(f) {
          assert.equal(f.theta(), .8);
        },
        "can be a number": function(f) {
          f.theta(.5);
          assert.equal(f.theta(), .5);
        },
        "coerces to a number": function(f) {
          f.theta(".5");
          assert.strictEqual(f.theta(), .5);
        }
      },

      "charge": {
        "defaults to -30": function(f) {
          assert.equal(f.charge(), -30);
        },
        "can be a number": function(f) {
          f.charge(-40);
          assert.equal(f.charge(), -40);
        },
        "can be a function": function(f) { // TODO expose the computed value?
          f.charge(foo);
          assert.equal(f.charge(), foo);
        },
        "coerces to a number": function(f) {
          f.charge("-40");
          assert.strictEqual(f.charge(), -40);
        }
      },

      "linkDistance": {
        "defaults to 20": function(f) {
          assert.equal(f.linkDistance(), 20);
        },
        "can be a number": function(f) {
          f.linkDistance(40);
          assert.equal(f.linkDistance(), 40);
        },
        "can be a function": function(f) { // TODO expose the computed value?
          f.linkDistance(foo);
          assert.equal(f.linkDistance(), foo);
        },
        "coerces to a number": function(f) {
          f.linkDistance("40");
          assert.strictEqual(f.linkDistance(), 40);
        }
      },

      "linkStrength": {
        "defaults to 1": function(f) {
          assert.equal(f.linkStrength(), 1);
        },
        "can be a number": function(f) {
          f.linkStrength(.5);
          assert.equal(f.linkStrength(), .5);
        },
        "can be a function": function(f) { // TODO expose the computed value?
          f.linkStrength(foo);
          assert.equal(f.linkStrength(), foo);
        },
        "coerces to a number": function(f) {
          f.linkStrength(".5");
          assert.strictEqual(f.linkStrength(), .5);
        }
      }
    }
  }
});

function foo(d) {
  return d.foo;
}

suite.export(module);
