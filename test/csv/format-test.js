require("../env");
require("../../d3");
require("../../d3.csv");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.csv.format");

suite.addBatch({
  "format": {
    topic: function() {
      return d3.csv.format;
    },
    "takes an array of arrays as input": function(format) {
      assert.equal(format([["a", "b", "c"], ["1", "2", "3"]]), "a,b,c\n1,2,3");
    },
    "separates lines using unix newline": function(format) {
      assert.equal(format([[], []]), "\n");
    },
    "does not strip whitespace": function(format) {
      assert.equal(format([["a ", " b", "c"], ["1", "2", "3 "]]), "a , b,c\n1,2,3 ");
    },
    "does not quote simple values": function(format) {
      assert.equal(format([["a"], [1]]), "a\n1");
    },
    "escapes double quotes": function(format) {
      assert.equal(format([["\"fish\""]]), "\"\"\"fish\"\"\"");
    },
    "escapes unix newlines": function(format) {
      assert.equal(format([["new\nline"]]), "\"new\nline\"");
    },
    "escapes commas": function(format) {
      assert.equal(format([["oxford,comma"]]), "\"oxford,comma\"");
    }
  }
});

suite.export(module);
