require("../env");

var vows = require("vows"),
    assert = require("../env-assert");

var suite = vows.describe("d3.tsv");

suite.addBatch({
  "tsv": {
    topic: function() {
      var cb = this.callback;
      d3.tsv("test/data/sample.tsv", function(error, tsv) {
        cb(null, tsv);
      });
    },
    "invokes the callback with the parsed tsv": function(tsv) {
      assert.deepEqual(tsv, [{"Hello":42,"World":"\"fish\""}]);
    },
    "overrides the mime type to text/tab-separated-values": function(tsv) {
      assert.equal(XMLHttpRequest._last._info.mimeType, "text/tab-separated-values");
    },
    "": {
      topic: function() {
        var cb = this.callback;
        d3.tsv("//does/not/exist.tsv", function(error, tsv) {
          cb(null, tsv);
        });
      },
      "invokes the callback with undefined when an error occurs": function(tsv) {
        assert.isUndefined(tsv);
      }
    }
  },

  "parse": {
    topic: function() {
      return d3.tsv.parse;
    },
    "returns an array of objects": function(parse) {
      assert.deepEqual(parse("a\tb\tc\n1\t2\t3\n"), [{a: "1", b: "2", c: "3"}]);
    },
    "does not strip whitespace": function(parse) {
      assert.deepEqual(parse("a\tb\tc\n 1\t 2\t3\n"), [{a: " 1", b: " 2", c: "3"}]);
    },
    "parses quoted values": function(parse) {
      assert.deepEqual(parse("a\tb\tc\n\"1\"\t2\t3"), [{a: "1", b: "2", c: "3"}]);
      assert.deepEqual(parse("a\tb\tc\n\"1\"\t2\t3\n"), [{a: "1", b: "2", c: "3"}]);
    },
    "parses quoted values with quotes": function(parse) {
      assert.deepEqual(parse("a\n\"\"\"hello\"\"\""), [{a: "\"hello\""}]);
    },
    "parses quoted values with newlines": function(parse) {
      assert.deepEqual(parse("a\n\"new\nline\""), [{a: "new\nline"}]);
      assert.deepEqual(parse("a\n\"new\rline\""), [{a: "new\rline"}]);
      assert.deepEqual(parse("a\n\"new\r\nline\""), [{a: "new\r\nline"}]);
    },
    "parses unix newlines": function(parse) {
      assert.deepEqual(parse("a\tb\tc\n1\t2\t3\n4\t5\t\"6\"\n7\t8\t9"), [
        {a: "1", b: "2", c: "3"},
        {a: "4", b: "5", c: "6"},
        {a: "7", b: "8", c: "9"}
      ]);
    },
    "parses mac newlines": function(parse) {
      assert.deepEqual(parse("a\tb\tc\r1\t2\t3\r4\t5\t\"6\"\r7\t8\t9"), [
        {a: "1", b: "2", c: "3"},
        {a: "4", b: "5", c: "6"},
        {a: "7", b: "8", c: "9"}
      ]);
    },
    "parses dos newlines": function(parse) {
      assert.deepEqual(parse("a\tb\tc\r\n1\t2\t3\r\n4\t5\t\"6\"\r\n7\t8\t9"), [
        {a: "1", b: "2", c: "3"},
        {a: "4", b: "5", c: "6"},
        {a: "7", b: "8", c: "9"}
      ]);
    }
  },
  "parseRows": {
    topic: function() {
      return d3.tsv.parseRows;
    },
    "returns an array of arrays": function(parse) {
      assert.deepEqual(parse("a\tb\tc\n"), [["a", "b", "c"]]);
    },
    "parses quoted values": function(parse) {
      assert.deepEqual(parse("\"1\"\t2\t3\n"), [["1", "2", "3"]]);
      assert.deepEqual(parse("\"hello\""), [["hello"]]);
    },
    "parses quoted values with quotes": function(parse) {
      assert.deepEqual(parse("\"\"\"hello\"\"\""), [["\"hello\""]]);
    },
    "parses quoted values with newlines": function(parse) {
      assert.deepEqual(parse("\"new\nline\""), [["new\nline"]]);
      assert.deepEqual(parse("\"new\rline\""), [["new\rline"]]);
      assert.deepEqual(parse("\"new\r\nline\""), [["new\r\nline"]]);
    },
    "parses unix newlines": function(parse) {
      assert.deepEqual(parse("a\tb\tc\n1\t2\t3\n4\t5\t\"6\"\n7\t8\t9"), [
        ["a", "b", "c"],
        ["1", "2", "3"],
        ["4", "5", "6"],
        ["7", "8", "9"]
      ]);
    },
    "parses mac newlines": function(parse) {
      assert.deepEqual(parse("a\tb\tc\r1\t2\t3\r4\t5\t\"6\"\r7\t8\t9"), [
        ["a", "b", "c"],
        ["1", "2", "3"],
        ["4", "5", "6"],
        ["7", "8", "9"]
      ]);
    },
    "parses dos newlines": function(parse) {
      assert.deepEqual(parse("a\tb\tc\r\n1\t2\t3\r\n4\t5\t\"6\"\r\n7\t8\t9"), [
        ["a", "b", "c"],
        ["1", "2", "3"],
        ["4", "5", "6"],
        ["7", "8", "9"]
      ]);
    }
  },

  "format": {
    topic: function() {
      return d3.tsv.format;
    },
    "takes an array of arrays as input": function(format) {
      assert.equal(format([["a", "b", "c"], ["1", "2", "3"]]), "a\tb\tc\n1\t2\t3");
    },
    "separates lines using unix newline": function(format) {
      assert.equal(format([[], []]), "\n");
    },
    "does not strip whitespace": function(format) {
      assert.equal(format([["a ", " b", "c"], ["1", "2", "3 "]]), "a \t b\tc\n1\t2\t3 ");
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
    "escapes tabs": function(format) {
      assert.equal(format([["oxford\tcomma"]]), "\"oxford\tcomma\"");
    },
    "does not escape commas": function(format) {
      assert.equal(format([["oxford,comma"]]), "oxford,comma");
    }
  }
});

suite.export(module);
