require('../env');

var vows = require('vows'),
  assert = require('assert');

var suite = vows.describe('d3.ql');

var data1 = [
  { "store number" : 1, "state" : "MA" },
  { "store number" : 2, "state" : "MA" },
  { "store number" : 3, "state" : "CA" },
  { "store number" : 4, "state" : "CA" },
  { "store number" : 5, "state" : "CC" }
],
bigData = (function(){
  var arr = [];
  var len = 10000;
  for(var i = 0; i < len; i++){
    arr = arr.concat(data1);
  }
  return arr;
}());

suite.addBatch({
  'ql': {
    topic: function(){
      return d3.ql;
    },
    constructor: function(){
      d3.ql(data1).select({state: true});
    },
    select: {
      simple: function(){
        var result = d3.ql(data1).select({'state': true});
        assert.deepEqual(result, d3.ql([
          {"state": "MA"},
          {"state": "MA"},
          {"state": "CA"},
          {"state": "CA"},
          {"state": "CC"}
        ]));
      },
      performance: function(){
        var begin = Date.now();
        var result = d3.ql(bigData).select({'state': true});
        assert.ok((Date.now() - begin) / 1000 < 0.1);
      }
    },
    where: {
      const: function(){
        var result = d3.ql(data1).where({'state': "MA"});
        assert.deepEqual(result, d3.ql([
          { "store number" : 1, "state" : "MA" },
          { "store number" : 2, "state" : "MA" }
        ]));
      },
      const_performance: function(){
        var begin = Date.now();
        var result = d3.ql(bigData).where({'state': "MA"});
        assert.ok((Date.now() - begin) / 1000 < 0.1);
      },
      regexp: function(){
        var result = d3.ql(data1).where({state: /^C/});
        assert.deepEqual(result, d3.ql([
          { "store number" : 3, "state" : "CA" },
          { "store number" : 4, "state" : "CA" },
          { "store number" : 5, "state" : "CC" }
        ]));
      },
      regexp_performance: function(){
        var begin = Date.now();
        var result = d3.ql(bigData).where({state: /^C/});
        assert.ok((Date.now() - begin) / 1000 < 0.1);
      },
      func: function(){
        var result = d3.ql(data1).where({'store number': function(d){ return d > 2; }});
        assert.deepEqual(result, d3.ql([
          { "store number" : 3, "state" : "CA" },
          { "store number" : 4, "state" : "CA" },
          { "store number" : 5, "state" : "CC" }
        ]));
      },
      func_performance: function(){
        var begin = Date.now();
        var result = d3.ql(bigData).where({'store number': function(d){ return d > 2; }});
        assert.ok((Date.now() - begin) / 1000 < 0.1);
      },
      multi: function(){
        var result = d3.ql(data1).where({state: /^C/, 'store number': function(d){return d > 3;}});
        assert.deepEqual(result, d3.ql([
          { "store number" : 4, "state" : "CA" },
          { "store number" : 5, "state" : "CC" }
        ]));
      }
    },
    join: {
      simple: function(){
        // not implemented
      }
    },
    group: {
      simple: function(){
        var result = d3.ql(data1).group(["state"], {"sum": function(p, d){ return p + d["store number"]; }}, {"sum": 0});
        assert.deepEqual(result, d3.ql([
          { "sum" : 3, "state" : "MA" },
          { "sum" : 7, "state" : "CA" },
          { "sum" : 5, "state" : "CC" }
        ]));
      },
      init: function(){
        var result = d3.ql(data1).group(["state"], {"sum": function(p, d){ return p + d["store number"]; }}, {"sum": 100});
        assert.deepEqual(result, d3.ql([
          { "sum" : 103, "state" : "MA" },
          { "sum" : 107, "state" : "CA" },
          { "sum" : 105, "state" : "CC" }
        ]));
      },
      multi: function(){
        var result = d3.ql(data1).group(["state"], {"cnt": function(p, d){ return p + 1; }, "sum": function(p, d){ return p + d["store number"]; }}, {"sum": 0});
        assert.deepEqual(result, d3.ql([
          { "sum" : 3, "cnt" : 2, "state" : "MA" },
          { "sum" : 7, "cnt" : 2, "state" : "CA" },
          { "sum" : 5, "cnt" : 1, "state" : "CC" }
        ]));
      },
      performance: function(){
        var begin = Date.now();
        var result = d3.ql(bigData).group(["state"], {"cnt": function(p, d){ return p + 1; }, "sum": function(p, d){ return p + d["store number"]; }}, {"sum": 0});
        assert.ok((Date.now() - begin) / 1000 < 0.1);
      }
    },
    distinct: {
      simple: function(){
        var result = d3.ql(data1).distinct("state", /* sorted */ true);
        assert.deepEqual(result, ["CA", "CC", "MA"]);
        
        result = d3.ql(data1).distinct("state");
        assert.deepEqual(result, ["CA", "CC", "MA"]);
      }
    },
    count: {
      simple: function(){
        var result = d3.ql(data1).where({state: 'MA'}).count();
        assert.equal(result, 2);
      }
    },
    combination: {
      select_where: function(){
        var result = d3.ql(data1).select({state: true}).where({'state': "MA"});
        assert.deepEqual(result, d3.ql([
          {"state" : "MA" },
          {"state" : "MA" }
        ]));
      },
      select_group: function(){
        var result = d3.ql(data1).group(["state"], {"sum": function(p, d){ return p + d["store number"]; }}, {"sum": 0}).select({"sum": true});
        assert.deepEqual(result, d3.ql([
          { "sum" : 3},
          { "sum" : 7},
          { "sum" : 5}
        ]));
      }
    }
  }
});

suite.export(module);