# d3-fetch

This module provides convenient parsing on top of [Fetch](https://fetch.spec.whatwg.org/). For example, to load a text file:

```js
const text = await d3.text("hello-world.txt"); // "Hello, world!"
```

To load and parse a CSV file:

```js
const data = await d3.csv("hello-world.csv"); // [{"Hello": "world"}, …]
```

This module has built-in support for parsing [JSON](#json), [CSV](#csv), and [TSV](#tsv). You can parse additional formats by using [text](#text) directly. (This module replaced [d3-request](https://github.com/d3/d3-request).)

## blob(*input*, *init*) {#blob}

```js
const blob = await d3.blob("example.db");
```

[Source](https://github.com/d3/d3-fetch/blob/main/src/blob.js) · Fetches the binary file at the specified *input* URL as a Blob. If *init* is specified, it is passed along to the underlying call to [fetch](https://fetch.spec.whatwg.org/#fetch-method); see [RequestInit](https://fetch.spec.whatwg.org/#requestinit) for allowed fields.

## buffer(*input*, *init*) {#buffer}

```js
const buffer = await d3.buffer("example.db");
```

[Source](https://github.com/d3/d3-fetch/blob/main/src/buffer.js) · Fetches the binary file at the specified *input* URL as an ArrayBuffer. If *init* is specified, it is passed along to the underlying call to [fetch](https://fetch.spec.whatwg.org/#fetch-method); see [RequestInit](https://fetch.spec.whatwg.org/#requestinit) for allowed fields.

## csv(*input*, *init*, *row*) {#csv}

```js
const data = await d3.csv("example.csv");
```

[Source](https://github.com/d3/d3-fetch/blob/main/src/dsv.js) · Equivalent to [d3.dsv](#dsv) with the comma character as the delimiter.

## dsv(*delimiter*, *input*, *init*, *row*) {#dsv}

```js
const data = await d3.dsv(",", "example.csv");
```

[Source](https://github.com/d3/d3-fetch/blob/main/src/dsv.js) · Fetches the [DSV](./d3-dsv.md) file at the specified *input* URL. If *init* is specified, it is passed along to the underlying call to [fetch](https://fetch.spec.whatwg.org/#fetch-method); see [RequestInit](https://fetch.spec.whatwg.org/#requestinit) for allowed fields. An optional *row* conversion function may be specified to map and filter row objects to a more-specific representation; see [*dsv*.parse](./d3-dsv.md#dsv_parse) for details. For example:

```js
const data = await d3.dsv(",", "example.csv", (d) => {
  return {
    year: new Date(+d.Year, 0, 1), // convert "Year" column to Date
    make: d.Make,
    model: d.Model,
    length: +d.Length // convert "Length" column to number
  };
});
```

If only one of *init* and *row* is specified, it is interpreted as the *row* conversion function if it is a function, and otherwise an *init* object. See also [d3.csv](#csv) and [d3.tsv](#tsv).

## html(*input*, *init*) {#html}

```js
const document = await d3.html("example.html");
```

[Source](https://github.com/d3/d3-fetch/blob/main/src/xml.js) · Fetches the file at the specified *input* URL as [text](#text) and then [parses it](https://developer.mozilla.org/docs/Web/API/DOMParser) as HTML. If *init* is specified, it is passed along to the underlying call to [fetch](https://fetch.spec.whatwg.org/#fetch-method); see [RequestInit](https://fetch.spec.whatwg.org/#requestinit) for allowed fields.

## image(*input*, *init*) {#image}

```js
const image = await d3.image("example.png");
```

[Source](https://github.com/d3/d3-fetch/blob/main/src/image.js) · Fetches the image at the specified *input* URL. If *init* is specified, sets any additional properties on the image before loading. For example, to enable an anonymous [cross-origin request](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image):

```js
const image = await d3.image("https://example.com/image.png", {crossOrigin: "anonymous"});
```

## json(*input*, *init*) {#json}

```js
const data = await d3.json("example.json");
```

[Source](https://github.com/d3/d3-fetch/blob/main/src/json.js) · Fetches the [JSON](http://json.org) file at the specified *input* URL. If *init* is specified, it is passed along to the underlying call to [fetch](https://fetch.spec.whatwg.org/#fetch-method); see [RequestInit](https://fetch.spec.whatwg.org/#requestinit) for allowed fields. If the server returns a status code of [204 No Content](https://developer.mozilla.org/docs/Web/HTTP/Status/204) or [205 Reset Content](https://developer.mozilla.org/docs/Web/HTTP/Status/205), the promise resolves to `undefined`.

## svg(*input*, *init*) {#svg}

```js
const document = await d3.svg("example.svg");
```

[Source](https://github.com/d3/d3-fetch/blob/main/src/xml.js) · Fetches the file at the specified *input* URL as [text](#text) and then [parses it](https://developer.mozilla.org/docs/Web/API/DOMParser) as SVG. If *init* is specified, it is passed along to the underlying call to [fetch](https://fetch.spec.whatwg.org/#fetch-method); see [RequestInit](https://fetch.spec.whatwg.org/#requestinit) for allowed fields.

## text(*input*, *init*) {#text}

```js
const text = await d3.text("example.txt");
```

[Source](https://github.com/d3/d3-fetch/blob/main/src/text.js) · Fetches the text file at the specified *input* URL. If *init* is specified, it is passed along to the underlying call to [fetch](https://fetch.spec.whatwg.org/#fetch-method); see [RequestInit](https://fetch.spec.whatwg.org/#requestinit) for allowed fields.

## tsv(input, init, row) {#tsv}

```js
const data = await d3.tsv("example.tsv");
```

[Source](https://github.com/d3/d3-fetch/blob/main/src/dsv.js) · Equivalent to [d3.dsv](#dsv) with the tab character as the delimiter.

## xml(*input*, *init*) {#xml}

```js
const document = await d3.xml("example.xml");
```

[Source](https://github.com/d3/d3-fetch/blob/main/src/xml.js) · Fetches the file at the specified *input* URL as [text](#text) and then [parses it](https://developer.mozilla.org/docs/Web/API/DOMParser) as XML. If *init* is specified, it is passed along to the underlying call to [fetch](https://fetch.spec.whatwg.org/#fetch-method); see [RequestInit](https://fetch.spec.whatwg.org/#requestinit) for allowed fields.
