var vows = require('vows'),
    assert = require('assert');

/*
 * Don't require d3 in a var declaration so the name is available to
 * d3-transform. This makes it global, which should probably be avoided but
 * ???
 */
d3 = require('d3');
var transform = require("../src/d3-transform.js");

vows.describe('d3-transform').addBatch({
  'the initial object' : {
    topic : function() {
      return d3.svg.transform();
    },
    'is an identity transform' : function(topic) {
      assert.equal(topic(), "");
    }
  },
  'calling translate' : {
    'works for one argument' : function() {
      var transform = d3.svg.transform()
          .translate(1);

      assert.equal(transform(), 'translate(1)');
    },
    'works for two arguments' : function() {
      var transform = d3.svg.transform()
          .translate(1, 2);

      assert.equal(transform(), 'translate(1,2)');
    },
    'works for a function argument' : function() {
      var transform = d3.svg.transform()
          .translate(function() { return [3, 5]; });

      assert.equal(transform(), 'translate(3,5)');
    },
    'works for a function argument, given arguments' : function() {
      var transform = d3.svg.transform()
          .translate(function(x) { return [x, 13]; });

      assert.equal(transform(8), 'translate(8,13)');
    },
    'works for a function argument, as a method' : function() {
      var transform = d3.svg.transform()
          .translate(function() { return [this.x, 34]; });
      var cxt = { 'x' : 21 };

      assert.equal(transform.call(cxt), 'translate(21,34)');
    }
  },
  'composing transforms' : {
    'works' : function() {
      var transform = d3.svg.transform()
          .translate(1, 1)
          .rotate(2);
      assert.equal(transform(), 'translate(1,1) rotate(2)');
    }
  },
  'composing multiple transform objects' : {
    'works' : function() {
      var t1 = d3.svg.transform()
        .translate(1,1)
        .rotate(2)
      var t2 = d3.svg
        .transform(t1)
        .scale(3,3);
      assert.equal(t2(),"translate(1,1) rotate(2) scale(3,3)");
    },
    'works with functions at any point' : function() {
      var t1 = d3.svg.transform()
        .translate(function(d) { return [d,1];})
        .rotate(2)
      var t2 = d3.svg
        .transform(t1)
        .scale(function(d) { return [d+1,4];});
      assert.equal(t2(10),"translate(10,1) rotate(2) scale(11,4)");
    }
  }
}).export(module);
