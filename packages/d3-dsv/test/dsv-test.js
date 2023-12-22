import assert from "assert";
import {readFileSync} from "fs";
import {dsvFormat} from "../src/index.js";
import {table} from "./table.js";

const psv = dsvFormat("|");

it("dsv(\"|\").parse(string) returns the expected objects", () => {
  assert.deepStrictEqual(psv.parse("a|b|c\n1|2|3\n"), table([{a: "1", b: "2", c: "3"}], ["a", "b", "c"]));
  assert.deepStrictEqual(psv.parse(readFileSync("test/data/sample.psv", "utf-8")), table([{Hello: "42", World: "\"fish\""}], ["Hello", "World"]));
});

it("dsv(\"|\").parse(string) does not strip whitespace", () => {
  assert.deepStrictEqual(psv.parse("a|b|c\n 1| 2|3\n"), table([{a: " 1", b: " 2", c: "3"}], ["a", "b", "c"]));
});

it("dsv(\"|\").parse(string) parses quoted values", () => {
  assert.deepStrictEqual(psv.parse("a|b|c\n\"1\"|2|3"), table([{a: "1", b: "2", c: "3"}], ["a", "b", "c"]));
  assert.deepStrictEqual(psv.parse("a|b|c\n\"1\"|2|3\n"), table([{a: "1", b: "2", c: "3"}], ["a", "b", "c"]));
});

it("dsv(\"|\").parse(string) parses quoted values with quotes", () => {
  assert.deepStrictEqual(psv.parse("a\n\"\"\"hello\"\"\""), table([{a: "\"hello\""}], ["a"]));
});

it("dsv(\"|\").parse(string) parses quoted values with newlines", () => {
  assert.deepStrictEqual(psv.parse("a\n\"new\nline\""), table([{a: "new\nline"}], ["a"]));
  assert.deepStrictEqual(psv.parse("a\n\"new\rline\""), table([{a: "new\rline"}], ["a"]));
  assert.deepStrictEqual(psv.parse("a\n\"new\r\nline\""), table([{a: "new\r\nline"}], ["a"]));
});

it("dsv(\"|\").parse(string) observes Unix, Mac and DOS newlines", () => {
  assert.deepStrictEqual(psv.parse("a|b|c\n1|2|3\n4|5|\"6\"\n7|8|9"), table([{a: "1", b: "2", c: "3"}, {a: "4", b: "5", c: "6"}, {a: "7", b: "8", c: "9"}], ["a", "b", "c"]));
  assert.deepStrictEqual(psv.parse("a|b|c\r1|2|3\r4|5|\"6\"\r7|8|9"), table([{a: "1", b: "2", c: "3"}, {a: "4", b: "5", c: "6"}, {a: "7", b: "8", c: "9"}], ["a", "b", "c"]));
  assert.deepStrictEqual(psv.parse("a|b|c\r\n1|2|3\r\n4|5|\"6\"\r\n7|8|9"), table([{a: "1", b: "2", c: "3"}, {a: "4", b: "5", c: "6"}, {a: "7", b: "8", c: "9"}], ["a", "b", "c"]));
});

it("dsv(\"|\").parse(string, row) returns the expected converted objects", () => {
  function row(d) { d.Hello = -d.Hello; return d; }
  assert.deepStrictEqual(psv.parse(readFileSync("test/data/sample.psv", "utf-8"), row), table([{Hello: -42, World: "\"fish\""}], ["Hello", "World"]));
  assert.deepStrictEqual(psv.parse("a|b|c\n1|2|3\n", function(d) { return d; }), table([{a: "1", b: "2", c: "3"}], ["a", "b", "c"]));
});

it("dsv(\"|\").parse(string, row) skips rows if row returns null or undefined", () => {
  function row(d, i) { return [d, null, undefined, false][i]; }
  assert.deepStrictEqual(psv.parse("field\n42\n\n\n\n", row), table([{field: "42"}, false], ["field"]));
  assert.deepStrictEqual(psv.parse("a|b|c\n1|2|3\n2|3|4", function(d) { return d.a & 1 ? null : d; }), table([{a: "2", b: "3", c: "4"}], ["a", "b", "c"]));
  assert.deepStrictEqual(psv.parse("a|b|c\n1|2|3\n2|3|4", function(d) { return d.a & 1 ? undefined : d; }), table([{a: "2", b: "3", c: "4"}], ["a", "b", "c"]));
});

it("dsv(\"|\").parse(string, row) invokes row(d, i, columns) for each row d, in order", () => {
  const rows = [];
  psv.parse("a\n1\n2\n3\n4", function(d, i, columns) { rows.push({d: d, i: i, columns: columns}); });
  assert.deepStrictEqual(rows, [{d: {a: "1"}, i: 0, columns: ["a"]}, {d: {a: "2"}, i: 1, columns: ["a"]}, {d: {a: "3"}, i: 2, columns: ["a"]}, {d: {a: "4"}, i: 3, columns: ["a"]}]);
});

it("dsv(\"|\").parseRows(string) returns the expected array of array of string", () => {
  assert.deepStrictEqual(psv.parseRows("a|b|c\n"), [["a", "b", "c"]]);
});

it("dsv(\"|\").parseRows(string) parses quoted values", () => {
  assert.deepStrictEqual(psv.parseRows("\"1\"|2|3\n"), [["1", "2", "3"]]);
  assert.deepStrictEqual(psv.parseRows("\"hello\""), [["hello"]]);
});

it("dsv(\"|\").parseRows(string) parses quoted values with quotes", () => {
  assert.deepStrictEqual(psv.parseRows("\"\"\"hello\"\"\""), [["\"hello\""]]);
});

it("dsv(\"|\").parseRows(string) parses quoted values with newlines", () => {
  assert.deepStrictEqual(psv.parseRows("\"new\nline\""), [["new\nline"]]);
  assert.deepStrictEqual(psv.parseRows("\"new\rline\""), [["new\rline"]]);
  assert.deepStrictEqual(psv.parseRows("\"new\r\nline\""), [["new\r\nline"]]);
});

it("dsv(\"|\").parseRows(string) parses Unix, Mac and DOS newlines", () => {
  assert.deepStrictEqual(psv.parseRows("a|b|c\n1|2|3\n4|5|\"6\"\n7|8|9"), [["a", "b", "c"], ["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"]]);
  assert.deepStrictEqual(psv.parseRows("a|b|c\r1|2|3\r4|5|\"6\"\r7|8|9"), [["a", "b", "c"], ["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"]]);
  assert.deepStrictEqual(psv.parseRows("a|b|c\r\n1|2|3\r\n4|5|\"6\"\r\n7|8|9"), [["a", "b", "c"], ["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"]]);
});

it("dsv(\"|\").parseRows(string, row) returns the expected converted array of array of string", () => {
  function row(d, i) { if (i) d[0] = -d[0]; return d; }
  assert.deepStrictEqual(psv.parseRows(readFileSync("test/data/sample.psv", "utf-8"), row), [["Hello", "World"], [-42, "\"fish\""]]);
  assert.deepStrictEqual(psv.parseRows("a|b|c\n1|2|3\n", function(d) { return d; }), [["a", "b", "c"], ["1", "2", "3"]]);
});

it("dsv(\"|\").parseRows(string, row) skips rows if row returns null or undefined", () => {
  function row(d, i) { return [d, null, undefined, false][i]; }
  assert.deepStrictEqual(psv.parseRows("field\n42\n\n\n", row), [["field"], false]);
  assert.deepStrictEqual(psv.parseRows("a|b|c\n1|2|3\n2|3|4", function(d, i) { return i & 1 ? null : d; }), [["a", "b", "c"], ["2", "3", "4"]]);
  assert.deepStrictEqual(psv.parseRows("a|b|c\n1|2|3\n2|3|4", function(d, i) { return i & 1 ? undefined : d; }), [["a", "b", "c"], ["2", "3", "4"]]);
});

it("dsv(\"|\").parseRows(string, row) invokes row(d, i) for each row d, in order", () => {
  const rows = [];
  psv.parseRows("a\n1\n2\n3\n4", function(d, i) { rows.push({d: d, i: i}); });
  assert.deepStrictEqual(rows, [{d: ["a"], i: 0}, {d: ["1"], i: 1}, {d: ["2"], i: 2}, {d: ["3"], i: 3}, {d: ["4"], i: 4}]);
});

it("dsv(\"|\").format(array) takes an array of objects as input", () => {
  assert.deepStrictEqual(psv.format([{a: 1, b: 2, c: 3}]), "a|b|c\n1|2|3");
});

it("dsv(\"|\").format(array) escapes field names and values containing delimiters", () => {
  assert.deepStrictEqual(psv.format([{"foo|bar": true}]), "\"foo|bar\"\ntrue");
  assert.deepStrictEqual(psv.format([{field: "foo|bar"}]), "field\n\"foo|bar\"");
});

it("dsv(\"|\").format(array) computes the union of all fields", () => {
  assert.deepStrictEqual(psv.format([{a: 1}, {a: 1, b: 2}, {a: 1, b: 2, c: 3}, {b: 1, c: 2}, {c: 1}]), "a|b|c\n1||\n1|2|\n1|2|3\n|1|2\n||1");
});

it("dsv(\"|\").format(array) orders fields by first-seen", () => {
  assert.deepStrictEqual(psv.format([{a: 1, b: 2}, {c: 3, b: 4}, {c: 5, a: 1, b: 2}]), "a|b|c\n1|2|\n|4|3\n1|2|5");
});

it("dsv(\"|\").format(array, columns) observes the specified array of column names", () => {
  assert.deepStrictEqual(psv.format([{a: 1, b: 2, c: 3}], ["c", "b", "a"]), "c|b|a\n3|2|1");
  assert.deepStrictEqual(psv.format([{a: 1, b: 2, c: 3}], ["c", "a"]), "c|a\n3|1");
  assert.deepStrictEqual(psv.format([{a: 1, b: 2, c: 3}], []), "\n");
  assert.deepStrictEqual(psv.format([{a: 1, b: 2, c: 3}], ["d"]), "d\n");
});

it("dsv(\"|\").formatRows(array) takes an array of array of string as input", () => {
  assert.deepStrictEqual(psv.formatRows([["a", "b", "c"], ["1", "2", "3"]]), "a|b|c\n1|2|3");
});

it("dsv(\"|\").formatRows(array) separates lines using Unix newline", () => {
  assert.deepStrictEqual(psv.formatRows([[], []]), "\n");
});

it("dsv(\"|\").formatRows(array) does not strip whitespace", () => {
  assert.deepStrictEqual(psv.formatRows([["a ", " b", "c"], ["1", "2", "3 "]]), "a | b|c\n1|2|3 ");
});

it("dsv(\"|\").formatRows(array) does not quote simple values", () => {
  assert.deepStrictEqual(psv.formatRows([["a"], [1]]), "a\n1");
});

it("dsv(\"|\").formatRows(array) escapes double quotes", () => {
  assert.deepStrictEqual(psv.formatRows([["\"fish\""]]), "\"\"\"fish\"\"\"");
});

it("dsv(\"|\").formatRows(array) escapes Unix newlines", () => {
  assert.deepStrictEqual(psv.formatRows([["new\nline"]]), "\"new\nline\"");
});

it("dsv(\"|\").formatRows(array) escapes Windows newlines", () => {
  assert.deepStrictEqual(psv.formatRows([["new\rline"]]), "\"new\rline\"");
});

it("dsv(\"|\").formatRows(array) escapes values containing delimiters", () => {
  assert.deepStrictEqual(psv.formatRows([["oxford|tab"]]), "\"oxford|tab\"");
});

it("dsv(\"|\").formatRow(array) takes a single array of string as input", () => {
  assert.deepStrictEqual(psv.formatRow(["a", "b", "c"]), "a|b|c");
});
