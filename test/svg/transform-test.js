var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.svg.transform");
suite.addBatch({
  "transform" : {
    topic: load("svg/transform").expression("d3.svg.transform"),
    'the initial object' : {
      'is an identity transform' : function(transform) {
        var t1 = transform();
        assert.equal(t1(),"");
      }
    },
    'calling translate' : {
      topic: load("svg/transform").expression("d3.svg.transform"),
      'works for one argument' : function(transform) {
        var t1 = transform();
        t1.translate(1);

        assert.equal(t1(), 'translate(1)');
      },
      'works for two arguments' : function(transform) {
        var t1 = transform();
        t1.translate(1, 2);
        assert.equal(t1(), 'translate(1,2)');
      },
      'works for a function argument' : function(transform) {
        var t1 = transform();
        t1.translate(function() { return [3, 5]; });

        assert.equal(t1(), 'translate(3,5)');
      },
      'works for a function argument, given arguments' : function(transform) {
        var transform = transform()
            .translate(function(x) { return [x, 13]; });

        assert.equal(transform(8), 'translate(8,13)');
      },
      'works for a function argument, as a method' : function(transform) {
        var transform = transform()
            .translate(function() { return [this.x, 34]; });
        var cxt = { 'x' : 21 };

        assert.equal(transform.call(cxt), 'translate(21,34)');
      }
    },
    'composing transforms' : {
      topic: load("svg/transform").expression("d3.svg.transform"),
      'works' : function(transform) {
        var t1 = transform();
        t1.translate(1, 1)
          .rotate(2);
        assert.equal(t1(), 'translate(1,1) rotate(2)');
      }
    },
    'composing multiple transform objects' : {
      topic: load("svg/transform").expression("d3.svg.transform"),
      'works' : function(transform) {
        var t1 = transform()
          .translate(1,1)
          .rotate(2)
        var t2 = transform(t1)
          .scale(3,3);
        assert.equal(t2(),"translate(1,1) rotate(2) scale(3,3)");
      },
      'works with functions at any point' : function(transform) {
        var t1 = transform()
          .translate(function(d) { return [d,1];})
          .rotate(2)
        var t2 = transform(t1)
          .scale(function(d) { return [d+1,4];});
        assert.equal(t2(10),"translate(10,1) rotate(2) scale(11,4)");
      }
    }
  }
}).export(module);
