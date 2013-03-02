require("../env");

var assert = require("../env-assert");

module.exports = {
  topic: function() {
    return d3.select("body").append("div").transition();
  },
  "calls the function once": function(transition) {
    var count = 0;
    transition.call(function() { ++count; });
    assert.equal(count, 1);
  },
  "passes any optional arguments": function(transition) {
    var abc;
    transition.call(function(selection, a, b, c) { abc = [a, b, c]; }, "a", "b", "c");
    assert.deepEqual(abc, ["a", "b", "c"]);
  },
  "passes the transition as the first argument": function(transition) {
    var t;
    transition.call(function(x) { t = x; });
    assert.isTrue(t === transition);
  },
  "uses the transition as the context": function(transition) {
    var t;
    transition.call(function() { t = this; });
    assert.isTrue(t === transition);
  },
  "returns the current transition": function(transition) {
    assert.isTrue(transition.call(function() {}) === transition);
  }
};
