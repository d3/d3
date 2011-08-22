require("../env");
require("../../d3");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.transition");

suite.addBatch({
  "transition": {
    topic: function() {
      return d3.transition;
    },
    "selects the document": function(transition) {
      var t = transition();
      assert.domEqual(t[0][0].node, document);
    }
  }
});

suite.export(module);

var suite = vows.describe("transition");

suite.addBatch({

  // Subtransitions
  "select": require("./transition-test-select"),
  "selectAll": require("./transition-test-selectAll"),

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
  "id": require("./transition-test-id")

});

suite.export(module);
