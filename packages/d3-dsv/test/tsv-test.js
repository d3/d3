import assert from "assert";
import {readFileSync} from "fs";
import {tsvFormat, tsvFormatRow, tsvFormatRows, tsvParse, tsvParseRows} from "../src/index.js";
import {table} from "./table.js";

it("tsvParse(string) returns the expected objects", () => {
  assert.deepStrictEqual(tsvParse("a\tb\tc\n1\t2\t3\n"), table([{a: "1", b: "2", c: "3"}], ["a", "b", "c"]));
  assert.deepStrictEqual(tsvParse(readFileSync("test/data/sample.tsv", "utf-8")), table([{Hello: "42", World: "\"fish\""}], ["Hello", "World"]));
});

it("tsvParse(string) does not strip whitespace", () => {
  assert.deepStrictEqual(tsvParse("a\tb\tc\n 1\t 2\t3\n"), table([{a: " 1", b: " 2", c: "3"}], ["a", "b", "c"]));
});

it("tsvParse(string) parses quoted values", () => {
  assert.deepStrictEqual(tsvParse("a\tb\tc\n\"1\"\t2\t3"), table([{a: "1", b: "2", c: "3"}], ["a", "b", "c"]));
  assert.deepStrictEqual(tsvParse("a\tb\tc\n\"1\"\t2\t3\n"), table([{a: "1", b: "2", c: "3"}], ["a", "b", "c"]));
});

it("tsvParse(string) parses quoted values with quotes", () => {
  assert.deepStrictEqual(tsvParse("a\n\"\"\"hello\"\"\""), table([{a: "\"hello\""}], ["a"]));
});

it("tsvParse(string) parses quoted values with newlines", () => {
  assert.deepStrictEqual(tsvParse("a\n\"new\nline\""), table([{a: "new\nline"}], ["a"]));
  assert.deepStrictEqual(tsvParse("a\n\"new\rline\""), table([{a: "new\rline"}], ["a"]));
  assert.deepStrictEqual(tsvParse("a\n\"new\r\nline\""), table([{a: "new\r\nline"}], ["a"]));
});

it("tsvParse(string) observes Unix, Mac and DOS newlines", () => {
  assert.deepStrictEqual(tsvParse("a\tb\tc\n1\t2\t3\n4\t5\t\"6\"\n7\t8\t9"), table([{a: "1", b: "2", c: "3"}, {a: "4", b: "5", c: "6"}, {a: "7", b: "8", c: "9"}], ["a", "b", "c"]));
  assert.deepStrictEqual(tsvParse("a\tb\tc\r1\t2\t3\r4\t5\t\"6\"\r7\t8\t9"), table([{a: "1", b: "2", c: "3"}, {a: "4", b: "5", c: "6"}, {a: "7", b: "8", c: "9"}], ["a", "b", "c"]));
  assert.deepStrictEqual(tsvParse("a\tb\tc\r\n1\t2\t3\r\n4\t5\t\"6\"\r\n7\t8\t9"), table([{a: "1", b: "2", c: "3"}, {a: "4", b: "5", c: "6"}, {a: "7", b: "8", c: "9"}], ["a", "b", "c"]));
});

it("tsvParse(string, row) returns the expected converted objects", () => {
  function row(d) { d.Hello = -d.Hello; return d; }
  assert.deepStrictEqual(tsvParse(readFileSync("test/data/sample.tsv", "utf-8"), row), table([{Hello: -42, World: "\"fish\""}], ["Hello", "World"]));
  assert.deepStrictEqual(tsvParse("a\tb\tc\n1\t2\t3\n", function(d) { return d; }), table([{a: "1", b: "2", c: "3"}], ["a", "b", "c"]));
});

it("tsvParse(string, row) skips rows if row returns null or undefined", () => {
  function row(d, i) { return [d, null, undefined, false][i]; }
  assert.deepStrictEqual(tsvParse("field\n42\n\n\n\n", row), table([{field: "42"}, false], ["field"]));
  assert.deepStrictEqual(tsvParse("a\tb\tc\n1\t2\t3\n2\t3\t4", function(d) { return d.a & 1 ? null : d; }), table([{a: "2", b: "3", c: "4"}], ["a", "b", "c"]));
  assert.deepStrictEqual(tsvParse("a\tb\tc\n1\t2\t3\n2\t3\t4", function(d) { return d.a & 1 ? undefined : d; }), table([{a: "2", b: "3", c: "4"}], ["a", "b", "c"]));
});

it("tsvParse(string, row) invokes row(d, i) for each row d, in order", () => {
  const rows = [];
  tsvParse("a\n1\n2\n3\n4", function(d, i) { rows.push({d: d, i: i}); });
  assert.deepStrictEqual(rows, [{d: {a: "1"}, i: 0}, {d: {a: "2"}, i: 1}, {d: {a: "3"}, i: 2}, {d: {a: "4"}, i: 3}]);
});

it("tsvParse(string) accepts numbers as names", () => {
  assert.deepStrictEqual(tsvParse("11\t22\t33\n\"a\"\tb\t0"), table([{11: "a", 22: "b", 33: "0"}], ["11", "22", "33"]));
});

it("tsvParseRows(string) returns the expected array of array of string", () => {
  assert.deepStrictEqual(tsvParseRows("a\tb\tc\n"), [["a", "b", "c"]]);
});

it("tsvParseRows(string) parses quoted values", () => {
  assert.deepStrictEqual(tsvParseRows("\"1\"\t2\t3\n"), [["1", "2", "3"]]);
  assert.deepStrictEqual(tsvParseRows("\"hello\""), [["hello"]]);
});

it("tsvParseRows(string) parses quoted values with quotes", () => {
  assert.deepStrictEqual(tsvParseRows("\"\"\"hello\"\"\""), [["\"hello\""]]);
});

it("tsvParseRows(string) parses quoted values with newlines", () => {
  assert.deepStrictEqual(tsvParseRows("\"new\nline\""), [["new\nline"]]);
  assert.deepStrictEqual(tsvParseRows("\"new\rline\""), [["new\rline"]]);
  assert.deepStrictEqual(tsvParseRows("\"new\r\nline\""), [["new\r\nline"]]);
});

it("tsvParseRows(string) parses Unix, Mac and DOS newlines", () => {
  assert.deepStrictEqual(tsvParseRows("a\tb\tc\n1\t2\t3\n4\t5\t\"6\"\n7\t8\t9"), [["a", "b", "c"], ["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"]]);
  assert.deepStrictEqual(tsvParseRows("a\tb\tc\r1\t2\t3\r4\t5\t\"6\"\r7\t8\t9"), [["a", "b", "c"], ["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"]]);
  assert.deepStrictEqual(tsvParseRows("a\tb\tc\r\n1\t2\t3\r\n4\t5\t\"6\"\r\n7\t8\t9"), [["a", "b", "c"], ["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"]]);
});

it("tsvParseRows(string, row) returns the expected converted array of array of string", () => {
  function row(d, i) { if (i) d[0] = -d[0]; return d; }
  assert.deepStrictEqual(tsvParseRows(readFileSync("test/data/sample.tsv", "utf-8"), row), [["Hello", "World"], [-42, "\"fish\""]]);
  assert.deepStrictEqual(tsvParseRows("a\tb\tc\n1\t2\t3\n", function(d) { return d; }), [["a", "b", "c"], ["1", "2", "3"]]);
});

it("tsvParseRows(string, row) skips rows if row returns null or undefined", () => {
  function row(d, i) { return [d, null, undefined, false][i]; }
  assert.deepStrictEqual(tsvParseRows("field\n42\n\n\n", row), [["field"], false]);
  assert.deepStrictEqual(tsvParseRows("a\tb\tc\n1\t2\t3\n2\t3\t4", function(d, i) { return i & 1 ? null : d; }), [["a", "b", "c"], ["2", "3", "4"]]);
  assert.deepStrictEqual(tsvParseRows("a\tb\tc\n1\t2\t3\n2\t3\t4", function(d, i) { return i & 1 ? undefined : d; }), [["a", "b", "c"], ["2", "3", "4"]]);
});

it("tsvParseRows(string, row) invokes row(d, i) for each row d, in order", () => {
  const rows = [];
  tsvParseRows("a\n1\n2\n3\n4", function(d, i) { rows.push({d: d, i: i}); });
  assert.deepStrictEqual(rows, [{d: ["a"], i: 0}, {d: ["1"], i: 1}, {d: ["2"], i: 2}, {d: ["3"], i: 3}, {d: ["4"], i: 4}]);
});

it("tsvFormat(array) takes an array of objects as input", () => {
  assert.deepStrictEqual(tsvFormat([{a: 1, b: 2, c: 3}]), "a\tb\tc\n1\t2\t3");
});

it("tsvFormat(array) escapes field names and values containing delimiters", () => {
  assert.deepStrictEqual(tsvFormat([{"foo\tbar": true}]), "\"foo\tbar\"\ntrue");
  assert.deepStrictEqual(tsvFormat([{field: "foo\tbar"}]), "field\n\"foo\tbar\"");
});

it("tsvFormat(array) computes the union of all fields", () => {
  assert.deepStrictEqual(tsvFormat([{a: 1}, {a: 1, b: 2}, {a: 1, b: 2, c: 3}, {b: 1, c: 2}, {c: 1}]), "a\tb\tc\n1\t\t\n1\t2\t\n1\t2\t3\n\t1\t2\n\t\t1");
});

it("tsvFormat(array) orders fields by first-seen", () => {
  assert.deepStrictEqual(tsvFormat([{a: 1, b: 2}, {c: 3, b: 4}, {c: 5, a: 1, b: 2}]), "a\tb\tc\n1\t2\t\n\t4\t3\n1\t2\t5");
});

it("tsvFormat(array, columns) observes the specified array of column names", () => {
  assert.deepStrictEqual(tsvFormat([{a: 1, b: 2, c: 3}], ["c", "b", "a"]), "c\tb\ta\n3\t2\t1");
  assert.deepStrictEqual(tsvFormat([{a: 1, b: 2, c: 3}], ["c", "a"]), "c\ta\n3\t1");
  assert.deepStrictEqual(tsvFormat([{a: 1, b: 2, c: 3}], []), "\n");
  assert.deepStrictEqual(tsvFormat([{a: 1, b: 2, c: 3}], ["d"]), "d\n");
});

it("tsvFormatRows(array) takes an array of array of string as input", () => {
  assert.deepStrictEqual(tsvFormatRows([["a", "b", "c"], ["1", "2", "3"]]), "a\tb\tc\n1\t2\t3");
});

it("tsvFormatRows(array) separates lines using Unix newline", () => {
  assert.deepStrictEqual(tsvFormatRows([[], []]), "\n");
});

it("tsvFormatRows(array) does not strip whitespace", () => {
  assert.deepStrictEqual(tsvFormatRows([["a ", " b", "c"], ["1", "2", "3 "]]), "a \t b\tc\n1\t2\t3 ");
});

it("tsvFormatRows(array) does not quote simple values", () => {
  assert.deepStrictEqual(tsvFormatRows([["a"], [1]]), "a\n1");
});

it("tsvFormatRows(array) escapes double quotes", () => {
  assert.deepStrictEqual(tsvFormatRows([["\"fish\""]]), "\"\"\"fish\"\"\"");
});

it("tsvFormatRows(array) escapes Unix newlines", () => {
  assert.deepStrictEqual(tsvFormatRows([["new\nline"]]), "\"new\nline\"");
});

it("tsvFormatRows(array) escapes Windows newlines", () => {
  assert.deepStrictEqual(tsvFormatRows([["new\rline"]]), "\"new\rline\"");
});

it("tsvFormatRows(array) escapes values containing delimiters", () => {
  assert.deepStrictEqual(tsvFormatRows([["oxford\ttab"]]), "\"oxford\ttab\"");
});

it("tsvFormatRow(array) takes a single array of string as input", () => {
  assert.deepStrictEqual(tsvFormatRow(["a", "b", "c"]), "a\tb\tc");
});
