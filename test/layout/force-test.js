require("../env");

var vows = require("vows"),
    assert = require("../env-assert");

var suite = vows.describe("d3.layout.force");

suite.addBatch({
  "force": {
    topic: d3.layout.force,

    "friction": {
      "defaults to .9": function(force) {
        assert.equal(force.friction(), .9);
      },
      "can be a number": function(force) {
        force.friction(.5);
        assert.equal(force.friction(), .5);
      },
      "coerces to a number": function(force) {
        force.friction(".5");
        assert.strictEqual(force.friction(), .5);
      }
    },

    "gravity": {
      "defaults to .1": function(force) {
        assert.equal(force.gravity(), .1);
      },
      "can be a number": function(force) {
        force.gravity(.5);
        assert.equal(force.gravity(), .5);
      },
      "coerces to a number": function(force) {
        force.gravity(".5");
        assert.strictEqual(force.gravity(), .5);
      }
    },

    "theta": {
      "defaults to .8": function(force) {
        assert.equal(force.theta(), .8);
      },
      "can be a number": function(force) {
        force.theta(.5);
        assert.equal(force.theta(), .5);
      },
      "coerces to a number": function(force) {
        force.theta(".5");
        assert.strictEqual(force.theta(), .5);
      }
    },

    "charge": {
      "defaults to -30": function(force) {
        assert.equal(force.charge(), -30);
      },
      "can be a number": function(force) {
        force.charge(-40);
        assert.equal(force.charge(), -40);
      },
      "can be a function": function(force) { // TODO expose the computed value?
        force.charge(foo);
        assert.equal(force.charge(), foo);
      },
      "coerces to a number": function(force) {
        force.charge("-40");
        assert.strictEqual(force.charge(), -40);
      }
    },

    "linkDistance": {
      "defaults to 20": function(force) {
        assert.equal(force.linkDistance(), 20);
      },
      "can be a number": function(force) {
        force.linkDistance(40);
        assert.equal(force.linkDistance(), 40);
      },
      "can be a function": function(force) { // TODO expose the computed value?
        force.linkDistance(foo);
        assert.equal(force.linkDistance(), foo);
      },
      "coerces to a number": function(force) {
        force.linkDistance("40");
        assert.strictEqual(force.linkDistance(), 40);
      }
    },

    "linkStrength": {
      "defaults to 1": function(force) {
        assert.equal(force.linkStrength(), 1);
      },
      "can be a number": function(force) {
        force.linkStrength(.5);
        assert.equal(force.linkStrength(), .5);
      },
      "can be a function": function(force) { // TODO expose the computed value?
        force.linkStrength(foo);
        assert.equal(force.linkStrength(), foo);
      },
      "coerces to a number": function(force) {
        force.linkStrength(".5");
        assert.strictEqual(force.linkStrength(), .5);
      }
    }
  }
});

function foo(d) {
  return d.foo;
}

suite.export(module);
