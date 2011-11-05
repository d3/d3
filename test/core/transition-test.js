require("../env");
require("../../d3");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.transition");

suite.addBatch({
  "transition": {
    topic: function() {
      return d3.transition();
    },
    "selects the document": function(transition) {
      assert.domEqual(transition[0][0].node, document);
    },
    "is an instanceof d3.transition": function(transition) {
      assert.isTrue(transition instanceof d3.transition);
    },
    "subselections are also instanceof d3.transition": function(transition) {
      assert.isTrue(transition.select("body") instanceof d3.transition);
      assert.isTrue(transition.selectAll("body") instanceof d3.transition);
    },
    "transition prototype can be extended": function(transition) {
      var vv = [];
      d3.transition.prototype.foo = function(v) { vv.push(v); return this; };
      transition.select("body").foo(42);
      assert.deepEqual(vv, [42]);
      delete d3.transition.prototype.foo;
    }
  }
});

suite.export(module);

var suite = vows.describe("transition");

suite.addBatch({

  // Subtransitions
  "select": require("./transition-test-select"),
  "selectAll": require("./transition-test-selectAll"),
  "transition": require("./transition-test-transition"),

  // Content
  "attr": require("./transition-test-attr"),
  "attrTween": require("./transition-test-attrTween"),
  "style": require("./transition-test-style"),
  "styleTween": require("./transition-test-styleTween"),
  "text": require("./transition-test-text"),
  "remove": require("./transition-test-remove"),

  // Animation
  "delay": require("./transition-test-delay"),
  "duration": require("./transition-test-duration"),

  // Control
  "each": require("./transition-test-each"),
  "call": require("./transition-test-call"),
  "tween": require("./transition-test-tween"),
  "id": require("./transition-test-id"),
  "time": require("./transition-test-time")

});

suite.export(module);
