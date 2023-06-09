# d3-dsv

This module provides a parser and formatter for delimiter-separated values, most commonly [comma-separated values](https://en.wikipedia.org/wiki/Comma-separated_values) (CSV) or tab-separated values (TSV). These tabular formats are popular with spreadsheet programs such as Microsoft Excel, and are often more space-efficient than JSON. This implementation is based on [RFC 4180](http://tools.ietf.org/html/rfc4180).

For example, to parse:

```js
d3.csvParse("foo,bar\n1,2") // [{foo: "1", bar: "2"}, columns: ["foo", "bar"]]
```
```js
d3.tsvParse("foo\tbar\n1\t2") // [{foo: "1", bar: "2"}, columns: ["foo", "bar"]]
```

To format:

```js
d3.csvFormat([{foo: "1", bar: "2"}]) // "foo,bar\n1,2"
```
```js
d3.tsvFormat([{foo: "1", bar: "2"}]) // "foo\tbar\n1\t2"
```

To use a different delimiter, such as “|” for pipe-separated values, use [d3.dsvFormat](#dsvFormat):

```js
d3.dsvFormat("|").parse("foo|bar\n1|2")) // [{foo: "1", bar: "2"}, columns: ["foo", "bar"]]
```

For easy loading of DSV files in a browser, see [d3-fetch](./d3-fetch.md)’s [d3.csv](./d3-fetch.md#csv), [d3.tsv](./d3-fetch.md#tsv) and [d3.dsv](./d3-fetch.md#dsv) methods.

## dsvFormat(*delimiter*) {#dsvFormat}

```js
const csv = d3.dsvFormat(",");
```

[Source](https://github.com/d3/d3-dsv/blob/main/src/dsv.js) · Constructs a new DSV parser and formatter for the specified *delimiter*. The *delimiter* must be a single character (*i.e.*, a single 16-bit code unit); so, ASCII delimiters are fine, but emoji delimiters are not.

## *dsv*.parse(*string*, *row*) {#dsv_parse}

:::warning CAUTION
This method requires the unsafe-eval [content security policy](#content-security-policy).
:::

```js
d3.csvParse("foo,bar\n1,2") // [{foo: "1", bar: "2"}, columns: ["foo", "bar"]]
```

[Source](https://github.com/d3/d3-dsv/blob/main/src/dsv.js) · Parses the specified *string*, which must be in the delimiter-separated values format with the appropriate delimiter, returning an array of objects representing the parsed rows.

Unlike [*dsv*.parseRows](#dsv_parseRows), this method requires that the first line of the DSV content contains a delimiter-separated list of column names; these column names become the attributes on the returned objects. For example, consider the following CSV file:

```
Year,Make,Model,Length
1997,Ford,E350,2.34
2000,Mercury,Cougar,2.38
```

The resulting JavaScript array is:

```js
[
  {"Year": "1997", "Make": "Ford", "Model": "E350", "Length": "2.34"},
  {"Year": "2000", "Make": "Mercury", "Model": "Cougar", "Length": "2.38"}
]
```

The returned array also exposes a `columns` property containing the column names in input order (in contrast to Object.keys, whose iteration order is arbitrary). For example:

```js
data.columns // ["Year", "Make", "Model", "Length"]
```

If the column names are not unique, only the last value is returned for each name; to access all values, use [*dsv*.parseRows](#dsv_parseRows) instead (see [example](https://observablehq.com/@d3/parse-csv-with-duplicate-column-names)).

If a *row* conversion function is not specified, field values are strings. For safety, there is no automatic conversion to numbers, dates, or other types. In some cases, JavaScript may coerce strings to numbers for you automatically (for example, using the `+` operator), but better is to specify a *row* conversion function. See [d3.autoType](#autoType) for a convenient *row* conversion function that infers and coerces common types like numbers and strings.

If a *row* conversion function is specified, the specified function is invoked for each row, being passed an object representing the current row (`d`), the index (`i`) starting at zero for the first non-header row, and the array of column names. If the returned value is null or undefined, the row is skipped and will be omitted from the array returned by *dsv*.parse; otherwise, the returned value defines the corresponding row object. For example:

```js
const data = d3.csvParse(string, (d) => {
  return {
    year: new Date(+d.Year, 0, 1), // lowercase and convert "Year" to Date
    make: d.Make, // lowercase
    model: d.Model, // lowercase
    length: +d.Length // lowercase and convert "Length" to number
  };
});
```

Note: using `+` or `Number` rather than [parseInt](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/parseInt) or [parseFloat](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/parseFloat) is typically faster, though more restrictive. For example, `"30px"` when coerced using `+` returns `NaN`, while parseInt and parseFloat return `30`.

## *dsv*.parseRows(*string*, *row*) {#dsv_parseRows}

```js
d3.csvParseRows("foo,bar\n1,2") // [["foo", "bar"], ["1", "2"]]
```

[Source](https://github.com/d3/d3-dsv/blob/main/src/dsv.js) · Parses the specified *string*, which must be in the delimiter-separated values format with the appropriate delimiter, returning an array of arrays representing the parsed rows.

Unlike [*dsv*.parse](#dsv_parse), this method treats the header line as a standard row, and should be used whenever DSV content does not contain a header. Each row is represented as an array rather than an object. Rows may have variable length. For example, consider the following CSV file, which notably lacks a header line:

```
1997,Ford,E350,2.34
2000,Mercury,Cougar,2.38
```

The resulting JavaScript array is:

```js
[
  ["1997", "Ford", "E350", "2.34"],
  ["2000", "Mercury", "Cougar", "2.38"]
]
```

If a *row* conversion function is not specified, field values are strings. For safety, there is no automatic conversion to numbers, dates, or other types. In some cases, JavaScript may coerce strings to numbers for you automatically (for example, using the `+` operator), but better is to specify a *row* conversion function. See [d3.autoType](#autoType) for a convenient *row* conversion function that infers and coerces common types like numbers and strings.

If a *row* conversion function is specified, the specified function is invoked for each row, being passed an array representing the current row (`d`), the index (`i`) starting at zero for the first row, and the array of column names. If the returned value is null or undefined, the row is skipped and will be omitted from the array returned by *dsv*.parse; otherwise, the returned value defines the corresponding row object. For example:

```js
const data = d3.csvParseRows(string, (d, i) => {
  return {
    year: new Date(+d[0], 0, 1), // convert first column to Date
    make: d[1],
    model: d[2],
    length: +d[3] // convert fourth column to number
  };
});
```

In effect, *row* is similar to applying a [map](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/map) and [filter](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/filter) operator to the returned rows.

## *dsv*.format(*rows*, *columns*) {#dsv_format}

```js
d3.csvFormat([{foo: "1", bar: "2"}]) // "foo,bar\n1,2"
```
```js
d3.csvFormat([{foo: "1", bar: "2"}], ["foo"]) // "foo\n1"
```

[Source](https://github.com/d3/d3-dsv/blob/main/src/dsv.js) · Formats the specified array of object *rows* as delimiter-separated values, returning a string. This operation is the inverse of [*dsv*.parse](#dsv_parse). Each row will be separated by a newline (`\n`), and each column within each row will be separated by the delimiter (such as a comma, `,`). Values that contain either the delimiter, a double-quote (`"`) or a newline will be escaped using double-quotes.

If *columns* is not specified, the list of column names that forms the header row is determined by the union of all properties on all objects in *rows*; the order of columns is nondeterministic. If *columns* is specified, it is an array of strings representing the column names. For example:

```js
const string = d3.csvFormat(data, ["year", "make", "model", "length"]);
```

All fields on each row object will be coerced to strings. If the field value is null or undefined, the empty string is used. If the field value is a Date, the [ECMAScript date-time string format](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-date-time-string-format) (a subset of ISO 8601) is used: for example, dates at UTC midnight are formatted as `YYYY-MM-DD`. For more control over which and how fields are formatted, first map *rows* to an array of array of string, and then use [*dsv*.formatRows](#dsv_formatRows).

## *dsv*.formatBody(*rows*, *columns*) {#dsv_formatBody}

```js
d3.csvFormatBody([{foo: "1", bar: "2"}]) // "1,2"
```
```js
d3.csvFormatBody([{foo: "1", bar: "2"}], ["foo"]) // "1"
```

[Source](https://github.com/d3/d3-dsv/blob/main/src/dsv.js) · Equivalent to [*dsv*.format](#dsv_format), but omits the header row. This is useful, for example, when appending rows to an existing file.

## *dsv*.formatRows(*rows*) {#dsv_formatRows}

```js
d3.csvFormatRows([["foo", "bar"], ["1", "2"]]) // "foo,bar\n1,2"
```

[Source](https://github.com/d3/d3-dsv/blob/main/src/dsv.js) · Formats the specified array of array of string *rows* as delimiter-separated values, returning a string. This operation is the reverse of [*dsv*.parseRows](#dsv_parseRows). Each row will be separated by a newline (`\n`), and each column within each row will be separated by the delimiter (such as a comma, `,`). Values that contain either the delimiter, a double-quote (") or a newline will be escaped using double-quotes.

To convert an array of objects to an array of arrays while explicitly specifying the columns, use [*array*.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map). For example:

```js
const string = d3.csvFormatRows(data.map((d, i) => {
  return [
    d.year.getUTCFullYear(), // Assuming d.year is a Date object.
    d.make,
    d.model,
    d.length
  ];
}));
```

If you like, you can also [*array*.concat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat) this result with an array of column names to generate the first row:

```js
const string = d3.csvFormatRows([[
    "year",
    "make",
    "model",
    "length"
  ]].concat(data.map((d, i) => {
  return [
    d.year.getUTCFullYear(), // Assuming d.year is a Date object.
    d.make,
    d.model,
    d.length
  ];
})));
```

## *dsv*.formatRow(*row*) {#dsv_formatRow}

```js
d3.csvFormatRow(["foo", "bar"]) // "foo,bar"
```

[Source](https://github.com/d3/d3-dsv/blob/main/src/dsv.js) · Formats a single array *row* of strings as delimiter-separated values, returning a string. Each column within the row will be separated by the delimiter (such as a comma, `,`). Values that contain either the delimiter, a double-quote (") or a newline will be escaped using double-quotes.

## *dsv*.formatValue(*value*) {#dsv_formatValue}

```js
d3.csvFormatValue("foo") // "foo"
```

[Source](https://github.com/d3/d3-dsv/blob/main/src/dsv.js) · Format a single *value* or string as a delimiter-separated value, returning a string. A value that contains either the delimiter, a double-quote (") or a newline will be escaped using double-quotes.

## csvParse(*string*, *row*) {#csvParse}

Equivalent to [`d3.dsvFormat(",").parse`](#dsv_parse).

## csvParseRows(*string*, *row*) {#csvParseRows}

Equivalent to [`d3.dsvFormat(",").parseRows`](#dsv_parseRows).

## csvFormat(*rows*, *columns*) {#csvFormat}

Equivalent to [`d3.dsvFormat(",").format`](#dsv_format).

## csvFormatBody(*rows*, *columns*) {#csvFormatBody}

Equivalent to [`d3.dsvFormat(",").formatBody`](#dsv_formatBody).

## csvFormatRows(*rows*) {#csvFormatRows}

Equivalent to [`d3.dsvFormat(",").formatRows`](#dsv_formatRows).

## csvFormatRow(*row*) {#csvFormatRow}

Equivalent to [`d3.dsvFormat(",").formatRow`](#dsv_formatRow).

## csvFormatValue(*value*) {#csvFormatValue}

Equivalent to [`d3.dsvFormat(",").formatValue`](#dsv_formatValue).

## tsvParse(*string*, *row*) {#tsvParse}

Equivalent to [`d3.dsvFormat("\t").parse`](#dsv_parse).

## tsvParseRows(*string*, *row*) {#tsvParseRows}

Equivalent to [`d3.dsvFormat("\t").parseRows`](#dsv_parseRows).

## tsvFormat(*rows*, *columns*) {#tsvFormat}

Equivalent to [`d3.dsvFormat("\t").format`](#dsv_format).

## tsvFormatBody(*rows*, *columns*) {#tsvFormatBody}

Equivalent to [`d3.dsvFormat("\t").formatBody`](#dsv_formatBody).

## tsvFormatRows(*rows*) {#tsvFormatRows}

Equivalent to [`d3.dsvFormat("\t").formatRows`](#dsv_formatRows).

## tsvFormatRow(*row*) {#tsvFormatRow}

Equivalent to [`d3.dsvFormat("\t").formatRow`](#dsv_formatRow).

## tsvFormatValue(*value*) {#tsvFormatValue}

Equivalent to [`d3.dsvFormat("\t").formatValue`](#dsv_formatValue).

## autoType(*object*) {#autoType}

[Source](https://github.com/d3/d3-dsv/blob/main/src/autoType.js) · Given an *object* (or array) representing a parsed row, infers the types of values on the *object* and coerces them accordingly, returning the mutated *object*. This function is intended to be used as a *row* accessor function in conjunction with [*dsv*.parse](#dsv_parse) and [*dsv*.parseRows](#dsv_parseRows). For example, consider the following CSV file:

```
Year,Make,Model,Length
1997,Ford,E350,2.34
2000,Mercury,Cougar,2.38
```

When used with [d3.csvParse](#csvParse),

```js
d3.csvParse(string, d3.autoType)
```

the resulting JavaScript array is:

```js
[
  {"Year": 1997, "Make": "Ford", "Model": "E350", "Length": 2.34},
  {"Year": 2000, "Make": "Mercury", "Model": "Cougar", "Length": 2.38}
]
```

Type inference works as follows. For each *value* in the given *object*, the [trimmed](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim) value is computed; the value is then re-assigned as follows:

1. If empty, then `null`.
1. If exactly `"true"`, then `true`.
1. If exactly `"false"`, then `false`.
1. If exactly `"NaN"`, then `NaN`.
1. Otherwise, if [coercible to a number](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-tonumber-applied-to-the-string-type), then a number.
1. Otherwise, if a [date-only or date-time string](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-date-time-string-format), then a Date.
1. Otherwise, a string (the original untrimmed value).

Values with leading zeroes may be coerced to numbers; for example `"08904"` coerces to `8904`. However, extra characters such as commas or units (*e.g.*, `"$1.00"`, `"(123)"`, `"1,234"` or `"32px"`) will prevent number coercion, resulting in a string.

Date strings must be in ECMAScript’s subset of the [ISO 8601 format](https://en.wikipedia.org/wiki/ISO_8601). When a date-only string such as YYYY-MM-DD is specified, the inferred time is midnight UTC; however, if a date-time string such as YYYY-MM-DDTHH:MM is specified without a time zone, it is assumed to be local time.

Automatic type inference is primarily intended to provide safe, predictable behavior in conjunction with [*dsv*.format](#dsv_format) and [*dsv*.formatRows](#dsv_formatRows) for common JavaScript types. If you need different behavior, you should implement your own row accessor function.

For more, see [the d3.autoType notebook](https://observablehq.com/@d3/d3-autotype).

## Content security policy

If a [content security policy](http://www.w3.org/TR/CSP/) is in place, note that [*dsv*.parse](#dsv_parse) requires `unsafe-eval` in the `script-src` directive, due to the (safe) use of dynamic code generation for fast parsing. (See [source](https://github.com/d3/d3-dsv/blob/main/src/dsv.js).) Alternatively, use [*dsv*.parseRows](#dsv_parseRows).

## Byte-order marks

DSV files sometimes begin with a [byte order mark (BOM)](https://en.wikipedia.org/wiki/Byte_order_mark); saving a spreadsheet in CSV UTF-8 format from Microsoft Excel, for example, will include a BOM. On the web this is not usually a problem because the [UTF-8 decode algorithm](https://encoding.spec.whatwg.org/#utf-8-decode) specified in the Encoding standard removes the BOM. Node.js, on the other hand, [does not remove the BOM](https://github.com/nodejs/node-v0.x-archive/issues/1918) when decoding UTF-8.

If the BOM is not removed, the first character of the text is a zero-width non-breaking space. So if a CSV file with a BOM is parsed by [d3.csvParse](#csvParse), the first column’s name will begin with a zero-width non-breaking space. This can be hard to spot since this character is usually invisible when printed.

To remove the BOM before parsing, consider using [strip-bom](https://www.npmjs.com/package/strip-bom).
