var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.tsv");

suite.addBatch({
  "tsv": {
    topic: load("dsv/tsv").expression("d3.tsv").document(),

    "on a sample file": {
      topic: function(tsv) {
        tsv("test/data/sample.tsv", this.callback);
      },
      "invokes the callback with the parsed tsv": function(tsv) {
        assert.deepEqual(tsv, [{"Hello":42,"World":"\"fish\""}]);
      },
      "overrides the mime type to text/tab-separated-values": function(tsv) {
        assert.equal(XMLHttpRequest._last._info.mimeType, "text/tab-separated-values");
      }
    },

    "on a file that does not exist": {
      topic: function(tsv) {
        var callback = this.callback;
        tsv("//does/not/exist.tsv", function(error, tsv) {
          callback(null, tsv);
        });
      },
      "invokes the callback with undefined when an error occurs": function(tsv) {
        assert.isUndefined(tsv);
      }
    },

    "parse": {
      topic: function(tsv) {
        return tsv.parse;
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
      topic: function(tsv) {
        return tsv.parseRows;
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
      topic: function(tsv) {
        return tsv.format;
      },
      "takes an array of objects as input": function(format) {
        assert.equal(format([{a: 1, b: 2, c: 3}]), "a\tb\tc\n1\t2\t3");
      },
      "escapes field names containing special characters": function(format) {
        assert.equal(format([{"foo\tbar": true}]), "\"foo\tbar\"\ntrue");
      },
      "computes the union of all fields": function(format) {
        assert.equal(format([
          {a: 1},
          {a: 1, b: 2},
          {a: 1, b: 2, c: 3},
          {b: 1, c: 2},
          {c: 1}
        ]), "a\tb\tc\n1\t\t\n1\t2\t\n1\t2\t3\n\t1\t2\n\t\t1");
      },
      "orders field by first-seen": function(format) {
        assert.equal(format([
          {a: 1, b: 2},
          {c: 3, b: 4},
          {c: 5, a: 1, b: 2}
        ]), "a\tb\tc\n1\t2\t\n\t4\t3\n1\t2\t5");
      }
    },

    "formatRows": {
      topic: function(tsv) {
        return tsv.formatRows;
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
  }
});

suite.export(module);
