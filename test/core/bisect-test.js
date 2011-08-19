require("../env");
require("../../d3");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.bisect");

suite.addBatch({
  "bisectLeft": {
    topic: function() {
      return d3.bisectLeft;
    },
    "finds the index of an exact match": function(bisect) {
      var array = [1, 2, 3];
      assert.equal(bisect(array, 1), 0);
      assert.equal(bisect(array, 2), 1);
      assert.equal(bisect(array, 3), 2);
    },
    "finds the index of the first match": function(bisect) {
      var array = [1, 2, 2, 3];
      assert.equal(bisect(array, 1), 0);
      assert.equal(bisect(array, 2), 1);
      assert.equal(bisect(array, 3), 3);
    },
    "finds the insertion point of a non-exact match": function(bisect) {
      var array = [1, 2, 3];
      assert.equal(bisect(array, 0.5), 0);
      assert.equal(bisect(array, 1.5), 1);
      assert.equal(bisect(array, 2.5), 2);
      assert.equal(bisect(array, 3.5), 3);
    },
    "observes the optional lower bound": function(bisect) {
      var array = [1, 2, 3, 4, 5];
      assert.equal(bisect(array, 0, 2), 2);
      assert.equal(bisect(array, 1, 2), 2);
      assert.equal(bisect(array, 2, 2), 2);
      assert.equal(bisect(array, 3, 2), 2);
      assert.equal(bisect(array, 4, 2), 3);
      assert.equal(bisect(array, 5, 2), 4);
      assert.equal(bisect(array, 6, 2), 5);
    },
    "observes the optional bounds": function(bisect) {
      var array = [1, 2, 3, 4, 5];
      assert.equal(bisect(array, 0, 2, 3), 2);
      assert.equal(bisect(array, 1, 2, 3), 2);
      assert.equal(bisect(array, 2, 2, 3), 2);
      assert.equal(bisect(array, 3, 2, 3), 2);
      assert.equal(bisect(array, 4, 2, 3), 3);
      assert.equal(bisect(array, 5, 2, 3), 3);
      assert.equal(bisect(array, 6, 2, 3), 3);
    }
  }
});

suite.addBatch({
  "bisectRight": {
    topic: function() {
      return d3.bisectRight;
    },
    "finds the index after an exact match": function(bisect) {
      var array = [1, 2, 3];
      assert.equal(bisect(array, 1), 1);
      assert.equal(bisect(array, 2), 2);
      assert.equal(bisect(array, 3), 3);
    },
    "finds the index after the last match": function(bisect) {
      var array = [1, 2, 2, 3];
      assert.equal(bisect(array, 1), 1);
      assert.equal(bisect(array, 2), 3);
      assert.equal(bisect(array, 3), 4);
    },
    "finds the insertion point of a non-exact match": function(bisect) {
      var array = [1, 2, 3];
      assert.equal(bisect(array, 0.5), 0);
      assert.equal(bisect(array, 1.5), 1);
      assert.equal(bisect(array, 2.5), 2);
      assert.equal(bisect(array, 3.5), 3);
    },
    "observes the optional lower bound": function(bisect) {
      var array = [1, 2, 3, 4, 5];
      assert.equal(bisect(array, 0, 2), 2);
      assert.equal(bisect(array, 1, 2), 2);
      assert.equal(bisect(array, 2, 2), 2);
      assert.equal(bisect(array, 3, 2), 3);
      assert.equal(bisect(array, 4, 2), 4);
      assert.equal(bisect(array, 5, 2), 5);
      assert.equal(bisect(array, 6, 2), 5);
    },
    "observes the optional bounds": function(bisect) {
      var array = [1, 2, 3, 4, 5];
      assert.equal(bisect(array, 0, 2, 3), 2);
      assert.equal(bisect(array, 1, 2, 3), 2);
      assert.equal(bisect(array, 2, 2, 3), 2);
      assert.equal(bisect(array, 3, 2, 3), 3);
      assert.equal(bisect(array, 4, 2, 3), 3);
      assert.equal(bisect(array, 5, 2, 3), 3);
      assert.equal(bisect(array, 6, 2, 3), 3);
    }
  }
});

suite.export(module);
