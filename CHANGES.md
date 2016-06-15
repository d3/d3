# Changes in D3 4.0

* [Modules](#modules)
* [Arrays](#arrays-d3-array)
* [Axes](#axes-d3-axis)
* [Brushes](#brushes-d3-brush)
* [Collections](#collections-d3-collection)
* [Colors](#colors-d3-color)
* [Dispatches](#dispatches-d3-dispatch)
* [Dragging](#dragging-d3-drag)
* [Delimiter-Separated Values](#delimiter-separated-values-d3-dsv)
* [Easings](#easings-d3-ease)
* [Forces](#forces-d3-force)
* [Number Formats](#number-formats-d3-format)
* [Geographies](#geographic-projections-d3-geo)
* [Hierarchies](#hierarchies-d3-hierarchy)
* [Interpolators](#interpolators-d3-interpolate)
* [Paths](#paths-d3-path)
* [Polygons](#polygons-d3-polygon)
* [Quadtrees](#quadtrees-d3-quadtree)
* [Queues](#queues-d3-queue)
* [Random Numbers](#random-numbers-d3-random)
* [Requests](#requests-d3-request)
* [Scales](#scales-d3-scale)
* [Selections](#selections-d3-selection)
* [Shapes](#shapes-d3-shape)
* [Time Formats](#time-formats-d3-time-format)
* [Time Intervals](#time-intervals-d3-time)
* [Timers](#timers-d3-timer)
* [Transitions](#transitions-d3-transition)
* [Voronoi Diagrams](#voronoi-diagrams-d3-voronoi)
* [Zooming](#zooming-d3-zoom)

N.B.: This document is a [work-in-progress](https://github.com/d3/d3/issues/2841). It does not yet cover all API changes.

## Modules

D3 3.x was a monolithic library: the core functionality resided in a single [repository](https://github.com/d3/d3) and was published in a [single file](https://d3js.org/d3.v3.js). It was possible to create a custom build using a [nonstandard tool](https://github.com/mbostock/smash), but not easy and few did. (There were also plugins, but these could only add features and had their own [monolithic repository](https://github.com/d3/d3-plugins).)

D3 4.0 is modular. Instead of one library, D3 is now [many small libraries](https://github.com/d3) that are designed to work together. You can pick and choose which parts to use as you see fit. Each library is maintained in a separate repository, allowing decentralized ownership and independent release cycles. Want to own a new repository in the [D3 organization](https://github.com/d3)? [Let me know!](https://twitter.com/mbostock)

The [default bundle](https://d3js.org/d3.v4.0.0-alpha.49.js) of D3 4.0 conveniently aggregates [about thirty](https://github.com/d3/d3/blob/master/index.js) of these microlibraries.

```html
<script src="https://d3js.org/d3.v4.0.0-alpha.49.min.js"></script>
```

As before, you can load optional plugins on top of the default bundle, such as [ColorBrewer scales](https://github.com/d3/d3-scale-chromatic):

```html
<script src="https://d3js.org/d3.v4.0.0-alpha.49.min.js"></script>
<script src="https://d3js.org/d3-scale-chromatic.v0.3.min.js"></script>
```

But now in 4.0, you don’t have to use the default bundle! Custom bundles are useful for applications that use a subset of D3’s features; for example, a React charting library might use D3’s scales and shapes, but use React instead of selections to manipulate the DOM. Or if you’re just using [d3-selection](https://github.com/d3/d3-selection), it’s only 5KB instead of 64KB for the default bundle. You can load D3 microlibraries using vanilla script tags or RequireJS (great for HTTP/2!):

```html
<script src="https://d3js.org/d3-selection.v0.8.min.js"></script>
```

You can `cat` D3 microlibraries into a custom bundle, or use tools such as [Webpack](https://webpack.github.io/) or [Rollup](http://rollupjs.org/) to create [optimized bundles](https://bl.ocks.org/mbostock/bb09af4c39c79cffcde4). The D3 microlibraries are written as [ES6 modules](http://www.2ality.com/2014/09/es6-modules-final.html), and Rollup lets you pick at the symbol level to produce the smallest bundles!

Small files are nice, but modularity is also about making D3 *fun* again. Microlibraries are easier to understand, develop and test. They make it easier for new people to get involved and contribute. They reduce the distinction between a “core module” and a “plugin”, and increase the pace of development in D3 features.

If you don’t care about modularity, you can mostly ignore this change and keep using the default bundle. However, there’s an unavoidable consequence of adopting ES6 modules: every symbol in D3 4.0 now shares a flat namespace rather than the nested one of D3 3.x. For example, d3.scale.linear is now d3.scaleLinear, and d3.layout.treemap is now d3.treemap. The adoption of ES6 modules also means that D3 is now written exclusively in [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) and has better readability. And there have been many other significant improvements to D3’s features! (Nearly all of the code from D3 3.x has been rewritten.) These changes are covered in the sections below.

The default D3 [UMD bundle](https://github.com/umdjs/umd) is now [anonymous](https://github.com/requirejs/requirejs/wiki/Updating-existing-libraries#register-as-an-anonymous-module-), rather being named “d3”. No `d3` global is exported if AMD or CommonJS is detected. In a vanilla environment, the D3 microlibraries share the `d3` global, meaning the code you write for the default D3 bundle works identically if you load the modules separately. (See [Let’s Make a (D3) Plugin](https://bost.ocks.org/mike/d3-plugin/) for more.) The generated UMD bundles are no longer stored in the Git repository; Bower has been repointed to [d3-bower](https://github.com/mbostock-bower/d3-bower), and you can find the generated files on [npmcdn](https://npmcdn.com/d3@next/) or attached to the [latest release](https://github.com/d3/d3/releases/latest). The non-minified default bundle is no longer mangled, making it more readable and preserving inline comments.

To the consternation of some users, D3 3.x employed Unicode variable names such as τ and π for a concise representation of mathematical operations. A downside of this approach was that a SyntaxError would occur if you loaded the non-minified D3 using ISO-8859-1 instead of UTF-8. D3 3.x also used Unicode string literals, such as the SI-prefix µ for 1e-6. D3 4.0 uses only ASCII variable names and ASCII string literals (see [rollup-plugin-ascii](https://github.com/mbostock/rollup-plugin-ascii)), avoiding these encoding problems.

## [Arrays (d3-array)](https://github.com/d3/d3-array/blob/master/README.md)

The new [d3.scan](https://github.com/d3/d3-array#scan) method performs a linear scan of an array, returning the index of the least element according to the specified comparator. This is similar to [d3.min](https://github.com/d3/d3-array#min) and [d3.max](https://github.com/d3/d3-array#max), except you can use it to find the position of an extreme element, rather than just calculate an extreme value.

```js
var data = [
  {name: "Alice", value: 2},
  {name: "Bob", value: 3},
  {name: "Carol", value: 1},
  {name: "Dwayne", value: 5}
];

var i = d3.scan(data, function(a, b) { return a.value - b.value; }); // 2
data[i]; // {name: "Carol", value: 1}
```

The new [d3.ticks](https://github.com/d3/d3-array#ticks) and [d3.tickStep](https://github.com/d3/d3-array#tickStep) methods are useful for generating human-readable numeric ticks. These methods are a low-level alternative to [*continuous*.ticks](https://github.com/d3/d3-scale#continuous_ticks) from [d3-scale](https://github.com/d3/d3-scale). The new implementation is also more accurate, returning the optimal number of ticks as measured by relative error.

```js
var ticks = d3.ticks(0, 10, 5); // [0, 2, 4, 6, 8, 10]
```

The [d3.range](https://github.com/d3/d3-array#range) method no longer makes an elaborate attempt to avoid floating-point error when *step* is not an integer. The returned values are strictly defined as *start* + *i* \* *step*, where *i* is an integer. (Learn more about [floating point math](http://0.30000000000000004.com/).) d3.range returns the empty array for infinite ranges, rather than throwing an error.

The method signature for optional accessors has been changed to be more consistent with array methods such as [*array*.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach): the accessor is passed the current element (*d*), the index (*i*), and the array (*data*), with *this* as undefined. This affects [d3.min](https://github.com/d3/d3-array#min), [d3.max](https://github.com/d3/d3-array#max), [d3.extent](https://github.com/d3/d3-array#extent), [d3.sum](https://github.com/d3/d3-array#sum), [d3.mean](https://github.com/d3/d3-array#mean), [d3.median](https://github.com/d3/d3-array#median), [d3.quantile](https://github.com/d3/d3-array#quantile), [d3.variance](https://github.com/d3/d3-array#variance) and [d3.deviation](https://github.com/d3/d3-array#deviation). The [d3.quantile](https://github.com/d3/d3-array#quantile) method previously did not take an accessor. Some methods with optional arguments now treat those arguments as missing if they are null or undefined, rather than strictly checking arguments.length.

### Histograms

The new [d3.histogram](https://github.com/d3/d3-array#histograms) API replaces d3.layout.histogram. Rather than exposing *bin*.x and *bin*.dx on each returned bin, the histogram exposes *bin*.x0 and *bin*.x1, guaranteeing that *bin*.x0 is exactly equal to *bin*.x1 on the preceeding bin. The “frequency” and “probability” modes are no longer supported; each bin is simply an array of elements from the input data, so *bin*.length is equal to D3 3.x’s *bin*.y in frequency mode. To compute a probability distribution, divide the number of elements in each bin by the total number of elements.

The *histogram*.range method has been renamed [*histogram*.domain](https://github.com/d3/d3-array#histogram_domain) for consistency with scales. The *histogram*.bins method has been renamed [*histogram*.thresholds](https://github.com/d3/d3-array#histogram_thresholds), and no longer accepts an upper value: *n* thresholds will produce *n* + 1 bins. If you specify a desired number of bins rather than thresholds, d3.histogram now uses [d3.ticks](https://github.com/d3/d3-array#ticks) to compute nice bin thresholds. In addition to the default Sturges’ formula, D3 now implements the [Freedman-Diaconis rule](https://github.com/d3/d3-array#thresholdFreedmanDiaconis) and [Scott’s normal reference rule](https://github.com/d3/d3-array#thresholdScott).

## [Axes (d3-axis)](https://github.com/d3/d3-axis/blob/master/README.md)

To render axes properly in D3 3.x, you needed to style them:

```html
<style>

.axis path,
.axis line {
  fill: none;
  stroke: #000;
  shape-rendering: crispEdges;
}

.axis text {
  font: 10px sans-serif;
}

</style>
<script>

d3.select(".axis")
    .call(d3.svg.axis()
        .scale(x)
        .orient("bottom"));

</script>
```

If you didn’t, you saw this:

<img src="https://raw.githubusercontent.com/d3/d3/master/img/axis-v3.png" width="100%" height="105">

D3 4.0 provides default styles and shorter syntax. In place of d3.svg.axis and *axis*.orient, D3 4.0 now provides four constructors for each orientation: [d3.axisTop](https://github.com/d3/d3-axis#axisTop), [d3.axisRight](https://github.com/d3/d3-axis#axisRight), [d3.axisBottom](https://github.com/d3/d3-axis#axisBottom), [d3.axisLeft](https://github.com/d3/d3-axis#axisLeft). These constructors accept a scale, so you can reduce all of the above to:

```html
<script>

d3.select(".axis")
    .call(d3.axisBottom(x));

</script>
```

And get this:

<img src="https://raw.githubusercontent.com/d3/d3/master/img/axis-v4.png" width="100%" height="105">

As before, you can customize the axis appearance either by applying stylesheets or by modifying the axis elements. The default appearance has been changed slightly to offset the axis by a half-pixel;  this fixes a crisp-edges rendering issue on Safari where the axis would be drawn two-pixels thick.

There’s now an [*axis*.tickArguments](https://github.com/d3/d3-axis#axis_tickArguments) method, as an alternative to [*axis*.ticks](https://github.com/d3/d3-axis#axis_ticks) that also allows the axis tick arguments to be inspected. The [*axis*.tickSize](https://github.com/d3/d3-axis#axis_tickSize) method has been changed to only allow a single argument when setting the tick size; use [*axis*.tickSizeInner](https://github.com/d3/d3-axis#axis_tickSizeInner) or [*axis*.tickSizeOuter](https://github.com/d3/d3-axis#axis_tickSizeOuter) to set the inner and outer tick size separately.

## [Brushes (d3-brush)](https://github.com/d3/d3-brush/blob/master/README.md)

TODO

* d3.svg.brush, *brush*.x, *brush*.y ↦ d3.brush, d3.brushX, d3.brushY
* *brush*.event ↦ *brush*.move
* *brushstart* event ↦ *start* event
* *brushend* event ↦ *end* event
* add *brush*.handleSize
* add *brush*.filter
* improve the default appearance of the brush
* simplify the internal structure of the brush slightly (still customizable?)
* change the structure of brush events, no longer reports “mode”
* improve brush interaction - ignore right-click, SHIFT to lock x/y, META for new brush
* brushes no longer use scales; they operate in screen coordinates
* brushes no longer store state internally; it is stored on applied elements
* remove *brush*.clamp; always clamps to the brushable region
* consume handled events

## [Chords (d3-chord)](https://github.com/d3/d3-chord/blob/master/README.md)

TODO

This module is not yet implemented in D3 4.0, but I’m working on it.

* d3.svg.chord ↦ d3.ribbon
* d3.layout.chord ↦ d3.chord

## [Collections (d3-collection)](https://github.com/d3/d3-collection/blob/master/README.md)

The [d3.set](https://github.com/d3/d3-collection#set) constructor now accepts an existing set for making a copy. If you pass an array to d3.set, you can also pass a value accessor. This accessor takes the standard arguments: the current element (*d*), the index (*i*), and the array (*data*), with *this* undefined. For example:

```js
var yields = [
  {yield: 22.13333, variety: "Manchuria",        year: 1932, site: "Grand Rapids"},
  {yield: 26.76667, variety: "Peatland",         year: 1932, site: "Grand Rapids"},
  {yield: 28.10000, variety: "No. 462",          year: 1931, site: "Duluth"},
  {yield: 38.50000, variety: "Svansota",         year: 1932, site: "Waseca"},
  {yield: 40.46667, variety: "Svansota",         year: 1931, site: "Crookston"},
  {yield: 36.03333, variety: "Peatland",         year: 1932, site: "Waseca"},
  {yield: 34.46667, variety: "Wisconsin No. 38", year: 1931, site: "Grand Rapids"}
];

var sites = d3.set(yields, function(d) { return d.site; }); // Grand Rapids, Duluth, Waseca, Crookston
```

The [d3.map](https://github.com/d3/d3-collection#map) constructor also follows the standard array accessor argument pattern.

The *map*.forEach and *set*.forEach methods have been renamed to [*map*.each](https://github.com/d3/d3-collection#map_each) and [*set*.each](https://github.com/d3/d3-collection#set_each) respectively. The order of arguments for *map*.each has also been changed to *value*, *key* and *map*, while the order of arguments for *set*.each is now *value*, *value* and *set*. This is closer to ES6 [*map*.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach) and [*set*.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/forEach). Also like ES6 Map and Set, *map*.set and *set*.add now return the current collection (rather than the added value) to facilitate method chaining. New [*map*.clear](https://github.com/d3/d3-collection#map_clear) and [*set*.clear](https://github.com/d3/d3-collection#set_clear) methods can be used to empty collections.

The [*nest*.map](https://github.com/d3/d3-collection#nest_map) method now always returns a d3.map instance. For a plain object, use [*nest*.object](https://github.com/d3/d3-collection#nest_object) instead. When used in conjunction with [*nest*.rollup](https://github.com/d3/d3-collection#nest_rollup), [*nest*.entries](https://github.com/d3/d3-collection#nest_entries) now returns {key, value} objects for the leaf entries, instead of {key, values}. This makes *nest*.rollup easier to use in conjunction with [hierarchies](#hierarchies-d3-hierarchy), as in this [Nest Treemap example](http://bl.ocks.org/mbostock/2838bf53e0e65f369f476afd653663a2).

## [Colors (d3-color)](https://github.com/d3/d3-color/blob/master/README.md)

All colors now have opacity exposed as *color*.opacity, which is a number in [0, 1]. You can pass an optional opacity argument to the color space constructors [d3.rgb](https://github.com/d3/d3-color#rgb), [d3.hsl](https://github.com/d3/d3-color#hsl), [d3.lab](https://github.com/d3/d3-color#lab), [d3.hcl](https://github.com/d3/d3-color#hcl) or [d3.cubehelix](https://github.com/d3/d3-color#cubehelix).

You can now parse rgba(…) and hsla(…) CSS color specifiers or the string “transparent” using [d3.color](https://github.com/d3/d3-color#color). The “transparent” color is defined as an RGB color with zero opacity and undefined red, green and blue channels; this differs slightly from CSS which defines it as transparent black, but is useful for simplifying color interpolation logic where either the starting or ending color has undefined channels. The [*color*.toString](https://github.com/d3/d3-color#color_toString) method now likewise returns an rgb(…) or rgba(…) string with integer channel values, not the hexadecimal RGB format, consistent with CSS computed values. This improves performance by short-circuiting transitions when the element’s starting style matches its ending style.

The new [d3.color](https://github.com/d3/d3-color#color) method is the primary method for parsing colors: it returns a d3.color instance in the appropriate color space, or null if the CSS color specifier is invalid. For example:

```js
var red = d3.color("hsl(0, 80%, 50%)"); // {h: 0, l: 0.5, s: 0.8, opacity: 1}
```

The parsing implementation is now more robust. For example, you can no longer mix integers and percentages in rgb(…), and it correctly handles whitespace, decimal points, number signs, and other edge cases. The color space constructors d3.rgb, d3.hsl, d3.lab, d3.hcl and d3.cubehelix now always return a copy of the input color, converted to the corresponding color space. While [*color*.rgb](https://github.com/d3/d3-color#color_rgb) remains, *rgb*.hsl has been removed; use d3.hsl to convert a color to the RGB color space.

The RGB color space no longer greedily quantizes and clamps channel values when creating colors, improving accuracy in color space conversion. Quantization and clamping now occurs in *color*.toString when formatting a color for display. You can use the new [*color*.displayable](https://github.com/d3/d3-color#color_displayable) to test whether a color is [out-of-gamut](https://en.wikipedia.org/wiki/Gamut).

The [*rgb*.brighter](https://github.com/d3/d3-color#rgb_brighter) method no longer special-cases black. This is a multiplicative operator, defining a new color *r*′, *g*′, *b*′ where *r*′ = *r* × *pow*(0.7, *k*), *g*′ = *g* × *pow*(0.7, *k*) and *b*′ = *b* × *pow*(0.7, *k*); a brighter black is still black.

There’s a new [d3.cubehelix](https://github.com/d3/d3-color#cubehelix) color space, generalizing Dave Green’s color scheme! (See also [d3.interpolateCubehelixDefault](https://github.com/d3/d3-scale#interpolateCubehelixDefault) from [d3-scale](#scales-d3-scale).) You can continue to define your own custom color spaces, too; see [d3-hsv](https://github.com/d3/d3-hsv) for an example.

## [Dispatches (d3-dispatch)](https://github.com/d3/d3-dispatch/blob/master/README.md)

Rather than decorating the *dispatch* object with each event type, the dispatch object now exposes generic [*dispatch*.call](https://github.com/d3/d3-dispatch#dispatch_call) and [*dispatch*.apply](https://github.com/d3/d3-dispatch#dispatch_apply) methods which take the *type* string as the first argument. For example, in D3 3.x, you might say:

```js
dispatcher.foo.call(that, "Hello, Foo!");
```

To dispatch a *foo* event in D3 4.0, you’d say:

```js
dispatcher.call("foo", that, "Hello, Foo!");
```

The [*dispatch*.on](https://github.com/d3/d3-dispatch#dispatch_on) method now accepts multiple typenames, allowing you to add or remove listeners for multiple events simultaneously. For example, to send both *foo* and *bar* events to the same listener:

```js
dispatcher.on("foo bar", function(message) {
  console.log(message);
});
```

This matches the new behavior of [*selection*.on](https://github.com/d3/d3-selection#selection_on) in [d3-selection](#selections-d3-selection). The *dispatch*.on method now validates that the specifier *listener* is a function, rather than throwing an error in the future.

The new implementation d3.dispatch is faster, using fewer closures to improve performance. There’s also a new [*dispatch*.copy](https://github.com/d3/d3-dispatch#dispatch_copy) method for making a copy of a dispatcher; this is used by [d3-transition](#transitions-d3-transition) to improve the performance of transitions in the common case where all elements in a transition have the same transition event listeners.

## [Dragging (d3-drag)](https://github.com/d3/d3-drag/blob/master/README.md)

TODO

* d3.behavior.drag ↦ d3.drag
* add *drag*.filter
* add *drag*.subject - for Canvas-based dragging
* add *drag*.container - for Canvas-based dragging, or avoiding feedback loop
* ignore emulated mouse events on iOS
* *dragstart* event ↦ *start* event
* *dragend* event ↦ *end* event
* add d3.dragEnable, d3.dragDisable - dealing with browser quirks
* new *event*.active property makes it easier to tell if any active gesture
* new *event*.on lets you register temporary listeners for the current gesture

## [Delimiter-Separated Values (d3-dsv)](https://github.com/d3/d3-dsv/blob/master/README.md)

Pursuant to the great namespace flattening, various CSV and TSV methods have new names:

* d3.csv.parse ↦ [d3.csvParse](https://github.com/d3/d3-dsv#csvParse)
* d3.csv.parseRows ↦ [d3.csvParseRows](https://github.com/d3/d3-dsv#csvParseRows)
* d3.csv.format ↦ [d3.csvFormat](https://github.com/d3/d3-dsv#csvFormat)
* d3.csv.formatRows ↦ [d3.csvFormatRows](https://github.com/d3/d3-dsv#csvFormatRows)
* d3.tsv.parse ↦ [d3.tsvParse](https://github.com/d3/d3-dsv#tsvParse)
* d3.tsv.parseRows ↦ [d3.tsvParseRows](https://github.com/d3/d3-dsv#tsvParseRows)
* d3.tsv.format ↦ [d3.tsvFormat](https://github.com/d3/d3-dsv#tsvFormat)
* d3.tsv.formatRows ↦ [d3.tsvFormatRows](https://github.com/d3/d3-dsv#tsvFormatRows)

The [d3.csv](https://github.com/d3/d3-request#csv) and [d3.tsv](https://github.com/d3/d3-request#tsv) methods for loading files of the corresponding formats have not been renamed, however! Those are defined in [d3-request](#requests-d3-request).There’s no longer a d3.dsv method, which served the triple purpose of defining a DSV formatter, a DSV parser and a DSV requestor; instead, there’s just [d3.dsvFormat](https://github.com/d3/d3-dsv#dsvFormat) which you can use to define a DSV formatter and parser. You can use [*request*.response](https://github.com/d3/d3-request#request_response) to make a request and then parse the response body, or just use [d3.text](https://github.com/d3/d3-request#text).

The [*dsv*.parse](https://github.com/d3/d3-dsv#dsv_parse) method now exposes the column names and their input order as *data*.columns. For example:

```js
d3.csv("cars.csv", function(error, data) {
  if (error) throw error;
  console.log(data.columns); // ["Year", "Make", "Model", "Length"]
});
```

You can likewise pass an optional array of column names to [*dsv*.format](https://github.com/d3/d3-dsv#dsv_format) to format only a subset of columns, or to specify the column order explicitly:

```js
var string = d3.csvFormat(data, ["Year", "Model", "Length"]);
```

The parser is a bit faster and the formatter is a bit more robust: inputs are coerced to strings before formatting, fixing an obscure crash, and deprecated support for falling back to [*dsv*.formatRows](https://github.com/d3/d3-dsv#dsv_formatRows) when the input *data* is an array of arrays has been removed.

## [Easings (d3-ease)](https://github.com/d3/d3-ease/blob/master/README.md)

D3 3.x used strings, such as “cubic-in-out”, to identify easing methods; these strings could be passed to d3.ease or *transition*.ease. D3 4.0 uses symbols instead, such as [d3.easeCubicInOut](https://github.com/d3/d3-ease#easeCubicInOut). Symbols are simpler and cleaner. They work well with Rollup to produce smaller custom bundles. You can still define your own custom easing function, too, if desired. Here’s the full list of equivalents:

* linear ↦ [d3.easeLinear](https://github.com/d3/d3-ease#easeLinear)¹
* linear-in ↦ [d3.easeLinear](https://github.com/d3/d3-ease#easeLinear)¹
* linear-out ↦ [d3.easeLinear](https://github.com/d3/d3-ease#easeLinear)¹
* linear-in-out ↦ [d3.easeLinear](https://github.com/d3/d3-ease#easeLinear)¹
* linear-out-in ↦ [d3.easeLinear](https://github.com/d3/d3-ease#easeLinear)¹
* poly-in ↦ [d3.easePolyIn](https://github.com/d3/d3-ease#easePolyIn)
* poly-out ↦ [d3.easePolyOut](https://github.com/d3/d3-ease#easePolyOut)
* poly-in-out ↦ [d3.easePolyInOut](https://github.com/d3/d3-ease#easePolyInOut)
* poly-out-in ↦ REMOVED²
* quad-in ↦ [d3.easeQuadIn](https://github.com/d3/d3-ease#easeQuadIn)
* quad-out ↦ [d3.easeQuadOut](https://github.com/d3/d3-ease#easeQuadOut)
* quad-in-out ↦ [d3.easeQuadInOut](https://github.com/d3/d3-ease#easeQuadInOut)
* quad-out-in ↦ REMOVED²
* cubic-in ↦ [d3.easeCubicIn](https://github.com/d3/d3-ease#easeCubicIn)
* cubic-out ↦ [d3.easeCubicOut](https://github.com/d3/d3-ease#easeCubicOut)
* cubic-in-out ↦ [d3.easeCubicInOut](https://github.com/d3/d3-ease#easeCubicInOut)
* cubic-out-in ↦ REMOVED²
* sin-in ↦ [d3.easeSinIn](https://github.com/d3/d3-ease#easeSinIn)
* sin-out ↦ [d3.easeSinOut](https://github.com/d3/d3-ease#easeSinOut)
* sin-in-out ↦ [d3.easeSinInOut](https://github.com/d3/d3-ease#easeSinInOut)
* sin-out-in ↦ REMOVED²
* exp-in ↦ [d3.easeExpIn](https://github.com/d3/d3-ease#easeExpIn)
* exp-out ↦ [d3.easeExpOut](https://github.com/d3/d3-ease#easeExpOut)
* exp-in-out ↦ [d3.easeExpInOut](https://github.com/d3/d3-ease#easeExpInOut)
* exp-out-in ↦ REMOVED²
* circle-in ↦ [d3.easeCircleIn](https://github.com/d3/d3-ease#easeCircleIn)
* circle-out ↦ [d3.easeCircleOut](https://github.com/d3/d3-ease#easeCircleOut)
* circle-in-out ↦ [d3.easeCircleInOut](https://github.com/d3/d3-ease#easeCircleInOut)
* circle-out-in ↦ REMOVED²
* elastic-in ↦ [d3.easeElasticOut](https://github.com/d3/d3-ease#easeElasticOut)²
* elastic-out ↦ [d3.easeElasticIn](https://github.com/d3/d3-ease#easeElasticIn)²
* elastic-in-out ↦ REMOVED²
* elastic-out-in ↦ [d3.easeElasticInOut](https://github.com/d3/d3-ease#easeElasticInOut)²
* back-in ↦ [d3.easeBackIn](https://github.com/d3/d3-ease#easeBackIn)
* back-out ↦ [d3.easeBackOut](https://github.com/d3/d3-ease#easeBackOut)
* back-in-out ↦ [d3.easeBackInOut](https://github.com/d3/d3-ease#easeBackInOut)
* back-out-in ↦ REMOVED²
* bounce-in ↦ [d3.easeBounceOut](https://github.com/d3/d3-ease#easeBounceOut)²
* bounce-out ↦ [d3.easeBounceIn](https://github.com/d3/d3-ease#easeBounceIn)²
* bounce-in-out ↦ REMOVED²
* bounce-out-in ↦ [d3.easeBounceInOut](https://github.com/d3/d3-ease#easeBounceInOut)²

¹ The -in, -out and -in-out variants of linear easing are identical, so there’s just d3.easeLinear.
<br>² Elastic and bounce easing were inadvertently reversed in 3.x, so 4.0 eliminates -out-in easing!

For convenience, there are also default aliases for each easing method. For example, [d3.easeCubic](https://github.com/d3/d3-ease#easeCubic) is an alias for [d3.easeCubicInOut](https://github.com/d3/d3-ease#easeCubicInOut). Most default to -in-out; the exceptions are [d3.easeBounce](https://github.com/d3/d3-ease#easeBounce) and [d3.easeElastic](https://github.com/d3/d3-ease#easeElastic), which default to -out.

Rather than pass optional arguments to d3.ease or *transition*.ease, parameterizable easing functions now have named parameters: [*poly*.exponent](https://github.com/d3/d3-ease#poly_exponent), [*elastic*.amplitude](https://github.com/d3/d3-ease#elastic_amplitude), [*elastic*.period](https://github.com/d3/d3-ease#elastic_period) and [*back*.overshoot](https://github.com/d3/d3-ease#back_overshoot). For example, in D3 3.x you might say:

```js
var e = d3.ease("elastic-out-in", 1.2);
```

The equivalent in D3 4.0 is:

```js
var e = d3.easeElastic.amplitude(1.2);
```

Many of the easing functions have been optimized for performance and accuracy. Several bugs have been fixed, as well, such as the interpretation of the overshoot parameter for back easing, and the period parameter for elastic easing. Also, [d3-transition](#transitions-d3-transition) now explicitly guarantees that the last tick of the transition happens at exactly *t* = 1, avoiding floating point errors in some easing functions.

There’s now a nice [visual reference](https://github.com/d3/d3-ease/blob/master/README.md) and an [animated reference](http://bl.ocks.org/mbostock/248bac3b8e354a9103c4) to the new easing functions, too!

## [Forces (d3-force)](https://github.com/d3/d3-force/blob/master/README.md)

TODO

* velocity verlet instead of position verlet
* deterministic initialization and forces; D3 does not play dice!
* d3.layout.force ↦ d3.forceSimulation
* *force*.friction ↦ *force*.drag

the simulation is extensible rather than hard-coding several forces:

* *force*.gravity ↦ d3.forceX, d3.forceY
* *force*.charge ↦ d3.forceManyBody
* *force*.link ↦ d3.forceLink
* new d3.forceCenter
* new d3.forceCollision - more stable than prior examples, too
* new *forceManyBody*.distanceMin

the new forces are more flexible, and better:

* force strengths can typically be configured per-node or per-link
* separate positioning forces for *x* and *y*
* better default link strength and bias heuristics to improve stability

easier controls for heating and cooling the layout:

* *simulation*.alpha
* *simulation*.alphaMin - control when the internal timer stops
* *simulation*.alphaDecay - control how quickly the simulation cools
* *simulation*.alphaTarget - smooth reheating during interaction!

better controls for starting and stopping the internal timer, independent of heat:

* *simulation*.restart
* *simulation*.stop
* *simulation*.tick

the dependency on the drag behavior is removed. instead:

* *simulation*.fix
* *simulation*.unfix
* *simulation*.unfixAll
* *simulation*.find

## [Number Formats (d3-format)](https://github.com/d3/d3-format/blob/master/README.md)

TODO

* treat negative zero (-0) and very small numbers that round to zero as unsigned zero
* the `c` directive is now for character data (i.e., literals), not for character codes
* the `b` and `d` directives now round to the nearest integer rather than returning the empty string
* new `(` sign option uses parentheses for negative values
* new `=` align option places any sign and symbol to the left of any padding
* improve accuracy by relying on *number*.toExponential to extract the mantissa and exponent
* locales are now published as JSON data; can load from npmcdn.com if desired

changed the behavior for default precision. now 6 for all directives except none, which defaults to 12. *none* is a new directive type that is like `g` except it trims insignificant trailing zeros. d3.round and d3.requote are now removed.

new methods for computing the suggested decimal precision for formatting values (used by d3-scale for tick formatting)

* d3.precisionFixed
* d3.precisionPrefix
* d3.precisionRound

new d3.formatSpecifier method for parsing, validating and debugging format specifiers. also good for deriving related format specifiers, such as when you want to set the precision automatically.

quite a few more changes… TODO describe them

## [Geographies (d3-geo)](https://github.com/d3/d3-geo/blob/master/README.md)

TODO

This module is not yet implemented in D3 4.0, but I’m working on it.

* d3.geo.graticule ↦ d3.geoGraticule
* *graticule*.majorExtent ↦ *graticule*.extentMajor
* *graticule*.minorExtent ↦ *graticule*.extentMinor
* *graticule*.majorStep ↦ *graticule*.stepMajor
* *graticule*.minorStep ↦ *graticule*.stepMinor
* d3.geo.circle ↦ d3.geoCircle
* *circle*.origin ↦ *circle*.center
* *circle*.angle ↦ *circle*.radius
* d3.geo.area ↦ d3.geoArea
* d3.geo.bounds ↦ d3.geoBounds
* d3.geo.centroid ↦ d3.geoCentroid
* d3.geo.distance ↦ d3.geoDistance
* d3.geo.interpolate ↦ d3.geoInterpolate
* d3.geo.length ↦ d3.geoLength
* d3.geo.rotation ↦ d3.geoRotation
* d3.geo.stream ↦ d3.geoStream
* d3.geo.path ↦ d3.geoPath
* d3.geo.projection ↦ d3.geoProjection
* d3.geo.projectionMutator ↦ d3.geoProjectionMutator?

Projections:

* d3.geo.albers ↦ d3.geoAlbers
* d3.geo.albersUsa ↦ d3.geoAlbersUsa
* d3.geo.azimuthalEqualArea ↦ d3.geoAzimuthalEqualArea
* d3.geo.azimuthalEquidistant ↦ d3.geoAzimuthalEquidistant
* d3.geo.conicConformal ↦ d3.geoConicConformal
* d3.geo.conicEqualArea ↦ d3.geoConicEqualArea
* d3.geo.conicEquidistant ↦ d3.geoConicEquidistant
* d3.geo.equirectangular ↦ d3.geoEquirectangular
* d3.geo.gnomonic ↦ d3.geoGnomonic
* d3.geo.mercator ↦ d3.geoMercator
* d3.geo.orthographic ↦ d3.geoOrthographic
* d3.geo.stereographic ↦ d3.geoStereographic
* d3.geo.transverseMercator ↦ d3.geoTransverseMercator

Raw projections:

* d3.geo.azimuthalEqualArea.raw ↦ d3.geoRawAzimuthalEqualArea
* d3.geo.azimuthalEquidistant.raw ↦ d3.geoRawAzimuthalEquidistant
* d3.geo.conicConformal.raw ↦ d3.geoRawConicConformal
* d3.geo.conicEqualArea.raw ↦ d3.geoRawConicEqualArea
* d3.geo.conicEquidistant.raw ↦ d3.geoRawConicEquidistant
* d3.geo.equirectangular.raw ↦ d3.geoRawEquirectangular
* d3.geo.gnomonic.raw ↦ d3.geoRawGnomonic
* d3.geo.mercator.raw ↦ d3.geoRawMercator
* d3.geo.orthographic.raw ↦ d3.geoRawOrthographic
* d3.geo.stereographic.raw ↦ d3.geoRawStereographic
* d3.geo.transverseMercator.raw ↦ d3.geoRawTransverseMercator

A new d3.geoPipeline API is in development for D3 5.0.

## [Hierarchies (d3-hierarchy)](https://github.com/d3/d3-hierarchy/blob/master/README.md)

TODO

* d3.layout.cluster ↦ d3.cluster
* d3.layout.hierarchy ↦ d3.hierarchy
* d3.layout.pack ↦ d3.pack
* d3.layout.partition ↦ d3.partition
* d3.layout.tree ↦ d3.tree
* d3.layout.treemap ↦ d3.treemap
* new d3.stratify API for converting tabular data to hierarchies!
* new d3.hierarchy API for working with hierarchical data!
* new *treemap*.tile - the treemap tiling algorithms are now extensible
* reimplemented squarified treemaps, fixing bugs with padding and rounding
* reimplemented circle-packing layout, fixing major bugs and improving results
* new d3.treemapBinary for binary treemaps
* new d3.packSiblings for circle-packing (non-hierarchical circles)
* new d3.packEnclose uses Welzl’s algorithm to compute the exact enclosing circle
* *treemap*.sticky ↦ d3.treemapResquarify
* new treemap padding parameters, distinguishing parent and sibling padding
* new nested treemap example
* new treemap + d3.nest example
* new partition padding parameter
* space-filling layouts now output *x0*, *x1*, *y0*, *y1* instead of *x0*, *dx*, *y0*, *dy*; better accuracy
* d3.layout.bundle ↦ *node*.path
* see d3.curveBundle in d3-shape for hierarchical edge bundling

## [Interpolators (d3-interpolate)](https://github.com/d3/d3-interpolate/blob/master/README.md)

The [d3.interpolate](https://github.com/d3/d3-interpolate#interpolate) method no longer delegates to d3.interpolators, which has been removed; its behavior is now defined by the library. Compared to 3.x, d3.interpolate in 4.0 now returns a constant interpolator which always returns the end value *b* if *b* is null, undefined, true or false. It is slightly faster in the common case that *b* is a number. And it only uses [d3.interpolateRgb](https://github.com/d3/d3-interpolate#interpolateRgb) if *b* is a valid CSS color specifier (and not approximately one).

The behavior of [d3.interpolateObject](https://github.com/d3/d3-interpolate#interpolateObject) and [d3.interpolateArray](https://github.com/d3/d3-interpolate#interpolateArray) has changed slightly with respect to properties or elements in the start value *a* that do not exist in the end value *b*: these properties and elements are now ignored, such that the ending value of the interpolator at *t* = 1 is now precisely equal to *b*. So, in 3.x:

```js
d3.interpolateObject({foo: 2, bar: 1}, {foo: 3})(0.5); // {bar: 1, foo: 2.5}
```

Whereas in 4.0, *a*.bar is ignored:

```js
d3.interpolateObject({foo: 2, bar: 1}, {foo: 3})(0.5); // {foo: 2.5}
```

If *a* or *b* are undefined or not an object, they are now implicitly converted to the empty object or empty array as appropriate, rather than throwing a TypeError.

The d3.interpolateTransform interpolator has been renamed to [d3.interpolateTransformSvg](https://github.com/d3/d3-interpolate#interpolateTransformSvg), and there is a new [d3.interpolateTransformCss](https://github.com/d3/d3-interpolate#interpolateTransformCss) to interpolate CSS transforms! This allows [d3-transition](#transitions-d3-transition) to automatically select the right interpolator for both SVG’s [transform attribute](https://www.w3.org/TR/SVG/coords.html#TransformAttribute) and the CSS [transform style property](https://www.w3.org/TR/css-transforms-1/#transform-property). (Note, however, that only 2D CSS transforms are supported.) The d3.transform method has been removed.

Color space interpolators now interpolate opacity; see [d3-color](#colors-d3-color). Color interpolators now return rgb(…) or rgba(…) CSS color specifier strings, matching [*color*.toString](https://github.com/d3/d3-color#color_toString), rather than using the RGB hexadecimal format. This is necessary to support opacity interpolation, but is also beneficial because it matches CSS computed values.

When a channel in the start color *a* is undefined, color interpolators use the corresponding value from the end color *b*, or *vice versa*. This logic previously applied to some channels (such as saturation in HSL), but now applies to all channels in all color spaces, and is especially useful when interpolating to or from transparent. There are now “long” versions of cylindrical color space interpolators: [d3.interpolateHslLong](https://github.com/d3/d3-interpolate#interpolateHslLong), [d3.interpolateHclLong](https://github.com/d3/d3-interpolate#interpolateHclLong) and [d3.interpolateCubehelixLong](https://github.com/d3/d3-interpolate#interpolateCubehelixLong). These interpolators use linear interpolation of hue, rather than using the shortest path around the 360° hue circle. See [d3.interpolateRainbow](https://github.com/d3/d3-scale#interpolateRainbow) for an example.

The Cubehelix color space is now supported by [d3-color](#colors-d3-color), and so there are now [d3.interpolateCubehelix](https://github.com/d3/d3-interpolate#interpolateCubehelix) and [d3.interpolateCubehelixLong](https://github.com/d3/d3-interpolate#interpolateCubehelixLong) interpolators.

[Gamma-corrected color interpolation](https://web.archive.org/web/20160112115812/http://www.4p8.com/eric.brasseur/gamma.html) is now supported for both RGB and Cubehelix color spaces as [*interpolate*.gamma](https://github.com/d3/d3-interpolate#interpolate_gamma). For example, to interpolate from purple to orange with a gamma of 2.2 in RGB space:

```js
var interpolate = d3.interpolateRgb.gamma(2.2)("purple", "orange");
```

There are new interpolators for uniform non-rational [B-splines](https://en.wikipedia.org/wiki/B-spline)! These are useful for smoothly interpolating between an arbitrary sequence of values from *t* = 0 to *t* = 1, such as to generate a smooth color gradient from a discrete set of colors. The [d3.interpolateBasis](https://github.com/d3/d3-interpolate#interpolateBasis) and [d3.interpolateBasisClosed](https://github.com/d3/d3-interpolate#interpolateBasisClosed) interpolators generate one-dimensional B-splines, while [d3.interpolateRgbBasis](https://github.com/d3/d3-interpolate#interpolateRgbBasis) and [d3.interpolateRgbBasisClosed](https://github.com/d3/d3-interpolate#interpolateRgbBasisClosed) generate three-dimensional B-splines through RGB color space. These are used by [d3-scale-chromatic](https://github.com/d3/d3-scale-chromatic) to generate continuous color scales from ColorBrewer’s discrete color schemes, such as [PiYG](http://bl.ocks.org/mbostock/048d21cf747371b11884f75ad896e5a5).

There’s also now a [d3.quantize](https://github.com/d3/d3-interpolate#quantize) method for generating uniformly-spaced discrete samples from a continuous interpolator. This is useful for taking one of the built-in color scales (such as [d3.interpolateViridis](https://github.com/d3/d3-scale#interpolateViridis)) and quantizing it for use with [d3.scaleQuantize](https://github.com/d3/d3-scale#scaleQuantize), [d3.scaleQuantile](https://github.com/d3/d3-scale#scaleQuantile) or [d3.scaleThreshold](https://github.com/d3/d3-scale#scaleThreshold).

## [Paths (d3-path)](https://github.com/d3/d3-path/blob/master/README.md)

The [d3.path](https://github.com/d3/d3-path#path) serializer implements the [CanvasPathMethods API](https://www.w3.org/TR/2dcontext/#canvaspathmethods), allowing you to write code that can render to either Canvas or SVG. For example, given some code that draws to a canvas:

```js
function drawCircle(context, radius) {
  context.moveTo(radius, 0);
  context.arc(0, 0, radius, 0, 2 * Math.PI);
}
```

You can render to SVG as follows:

```js
var context = d3.path();
drawCircle(context, 40);
pathElement.setAttribute("d", context.toString());
```

The path serializer enables [d3-shape](#shapes-d3-shape) to support both Canvas and SVG; see [*line*.context](https://github.com/d3/d3-shape#line_context) and [*area*.context](https://github.com/d3/d3-shape#area_context), for example.

## [Polygons (d3-polygon)](https://github.com/d3/d3-polygon/blob/master/README.md)

There’s no longer a d3.geom.polygon constructor; instead you just pass an array of vertices to the polygon methods. So instead of *polygon*.area and *polygon*.centroid, there’s [d3.polygonArea](https://github.com/d3/d3-polygon#polygonArea) and [d3.polygonCentroid](https://github.com/d3/d3-polygon#polygonCentroid). There are also new [d3.polygonContains](https://github.com/d3/d3-polygon#polygonContains) and [d3.polygonLength](https://github.com/d3/d3-polygon#polygonLength) methods. There’s no longer an equivalent to *polygon*.clip, but it [Sutherland–Hodgman clipping](https://en.wikipedia.org/wiki/Sutherland–Hodgman_algorithm) is needed, please [file a feature request](https://github.com/d3/d3-polygon/issues).

The d3.geom.hull operator has been simplified: instead of an operator with *hull*.x and *hull*.y accessors, there’s just the [d3.polygonHull](https://github.com/d3/d3-polygon#polygonHull) method which takes an array of points and returns the convex hull.

## [Quadtrees (d3-quadtree)](https://github.com/d3/d3-quadtree/blob/master/README.md)

TODO

* d3.geom.quadtree ↦ d3.quadtree
* new non-recursive implementation!
* coincident points are now stored more efficiently
* internal nodes are now represented more efficiently
* use *node*.length to distinguish between leaf and internal nodes
* there’s no longer a quadtree operator and a quadtree; there’s just a mutable quadtree
* new *quadtree*.remove - remove points from the quadtree!
* new *quadtree*.extent, *quadtree*.cover - increase the extent of the quadtree after creation!
* new *quadtree*.addAll, *quadtree*.removeAll - bulk methods for adding and remove points
* new *quadtree*.copy
* *quadtree*.find now takes a search radius
* new *quadtree*.visitAll for post-order traversal

## [Queues (d3-queue)](https://github.com/d3/d3-queue/blob/master/README.md)

Formerly known as Queue.js and queue-async, [d3.queue](https://github.com/d3/d3-queue) is now included in the default bundle, making it easy to load data files in parallel. It has been rewritten with fewer closures to improve performance, and there are now stricter checks in place to guarantee well-defined behavior. You can now use instanceof d3.queue and inspect the queue’s internal private state.

## [Random Numbers (d3-random)](https://github.com/d3/d3-random/blob/master/README.md)

Pursuant to the great namespace flattening, the random number generators have new names:

* d3.random.normal ↦ [d3.randomNormal](https://github.com/d3/d3-random#randomNormal)
* d3.random.logNormal ↦ [d3.randomLogNormal](https://github.com/d3/d3-random#randomLogNormal)
* d3.random.bates ↦ [d3.randomBates](https://github.com/d3/d3-random#randomBates)
* d3.random.irwinHall ↦ [d3.randomIrwinHall](https://github.com/d3/d3-random#randomIrwinHall)

There are also new random number generators for [exponential](https://github.com/d3/d3-random#randomExponential) and [uniform](https://github.com/d3/d3-random#randomUniform) distributions. The [normal](https://github.com/d3/d3-random#randomNormal) and [log-normal](https://github.com/d3/d3-random#randomLogNormal) random generators have been optimized.

## [Requests (d3-request)](https://github.com/d3/d3-request/blob/master/README.md)

TODO

* d3.xhr ↦ d3.request
* new *request*.user and *request*.password for basic authentication
* new *request*.timeout for changing the timeout duration
* on error, pass the error to the listener
* on progress, pass the progress event to the listener
* if d3.xml loads unparseable XML, report an error rather than a null document
* d3-request is now supported on Node using node-XMLHttpRequest

## [Scales (d3-scale)](https://github.com/d3/d3-scale/blob/master/README.md)

TODO

[Introducing d3-scale](https://medium.com/@mbostock/introducing-d3-scale-61980c51545f#.d38uz6vuz)

* d3.scale.linear ↦ d3.scaleLinear
* d3.scale.sqrt ↦ d3.scaleSqrt
* d3.scale.pow ↦ d3.scalePow
* d3.scale.log ↦ d3.scaleLog
* d3.scale.quantize ↦ d3.scaleQuantize
* d3.scale.threshold ↦ d3.scaleThreshold
* d3.scale.quantile ↦ d3.scaleQuantile
* d3.scale.identity ↦ d3.scaleIdentity
* d3.scale.ordinal ↦ d3.scaleOrdinal
* d3.time.scale ↦ d3.scaleTime
* d3.time.scale.utc ↦ d3.scaleUtc
* quantitative scales generate ticks in the same order as the domain
* non-linear quantitative scales are more accurate
* better *log*.ticks filtering for large domains
* *time*.ticks and *time*.nice now only accept time intervals
* new d3.scaleSequential
  * new Viridis, Inferno, Magma, Plasma interpolators
  * new Warm, Cool, Rainbow interpolators
  * new default Cubehelix interpolator
* d3.scaleOrdinal constructor now takes an optional *range*
* new *ordinal*.unknown
* new d3.scaleBand, *band*.bandwidth, *band*.align
* new d3.scalePoint
* category scales now defined as arrays of colors:
  * d3.scale.category10 ↦ d3.schemeCategory10
  * d3.scale.category20 ↦ d3.schemeCategory20
  * d3.scale.category20b ↦ d3.schemeCategory20b
  * d3.scale.category20c ↦ d3.schemeCategory20c

Mention d3-scale-chromatic?

## [Selections (d3-selection)](https://github.com/d3/d3-selection/blob/master/README.md)

Selections no longer subclass Array using [prototype chain injection](http://perfectionkills.com/how-ecmascript-5-still-does-not-allow-to-subclass-an-array/#wrappers_prototype_chain_injection); they are now plain objects, improving performance. The internal fields (*selection*.\_groups, *selection*.\_parents) are private; please use the documented public API to manipulate selections. The new [*selection*.nodes](https://github.com/d3/d3-selection#selection_nodes) method generates an array of all nodes in a selection.

Selections are now immutable: the elements and parents in a selection never change. (The elements’ attributes and content will of course still be modified!) The [*selection*.sort](https://github.com/d3/d3-selection#selection_sort) and [*selection*.data](https://github.com/d3/d3-selection#selection_data) methods now return new selections rather than modifying the selection in-place. In addition, [*selection*.append](https://github.com/d3/d3-selection#selection_append) no longer merges entering nodes into the update selection; use [*selection*.merge](https://github.com/d3/d3-selection#selection_merge) to combine enter and update after a data join. For example, the following [general update pattern](http://bl.ocks.org/mbostock/a8a5baa4c4a470cda598) in 3.x:

```js
var circle = svg.selectAll("circle").data(data) // UPDATE
    .style("fill", "blue");

circle.exit().remove(); // EXIT

circle.enter().append("circle") // ENTER; modifies UPDATE! 🌶
    .style("fill", "green");

circle // ENTER + UPDATE
    .style("stroke", "black");
```

Would be rewritten in 4.0 as:

```js
var circle = svg.selectAll("circle").data(data) // UPDATE
    .style("fill", "blue");

circle.exit().remove(); // EXIT

circle.enter().append("circle") // ENTER
    .style("fill", "green")
  .merge(circle) // ENTER + UPDATE
    .style("stroke", "black");
```

This change is discussed further in [What Makes Software Good](https://medium.com/@mbostock/what-makes-software-good-943557f8a488#.4ukdnxqiz).

In 3.x, the [*selection*.enter](https://github.com/d3/d3-selection#selection_enter) and [*selection*.exit](https://github.com/d3/d3-selection#selection_exit) methods were undefined until you called *selection*.data, resulting in a TypeError if you attempted to access them. In 4.0, now they simply return the empty selection if the selection has not been joined to data.

In 3.x, [*selection*.append](https://github.com/d3/d3-selection#selection_append) would always append the new element as the last child of its parent. A little-known trick was to use [*selection*.insert](https://github.com/d3/d3-selection#selection_insert) without specifying a *before* selector when entering nodes, causing the entering nodes to be inserted before the following element in the update selection. In 4.0, this is now the default behavior of *selection*.append; if you do not specify a *before* selector to *selection*.insert, the inserted element is appended as the last child. This change makes the general update pattern preserve the relative order of elements and data. For example, given the following DOM:

```html
<div>a</div>
<div>b</div>
<div>f</div>
```

And the following code:

```js
var div = d3.select("body").selectAll("div")
  .data(["a", "b", "c", "d", "e", "f"], function(d) { return d || this.textContent; });

div.enter().append("div")
    .text(function(d) { return d; });
```

The resulting DOM will be:

```html
<div>a</div>
<div>b</div>
<div>c</div>
<div>d</div>
<div>e</div>
<div>f</div>
```

Thus, the entering *c*, *d* and *e* are inserted before *f*, since *f* is the following element in the update selection. Although this behavior is sufficient to preserve order if the new data’s order is stable, if the data changes order, you must still use [*selection*.order](https://github.com/d3/d3-selection#selection_order) to reorder elements.

There is now only one class of selection. 3.x implemented enter selections using a special class with different behavior for *enter*.append and *enter*.select; a consequence of this design was that enter selections in 3.x lacked [certain methods](https://github.com/d3/d3/issues/2043). In 4.0, enter selections are simply normal selections; they have the same methods and the same behavior. [Enter nodes](https://github.com/d3/d3-selection/blob/master/src/selection/enter.js) now implement [*node*.appendChild](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild), [*node*.insertBefore](https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore), [*node*.querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector), and [*node*.querySelectorAll](https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelectorAll).

The [*selection*.data](https://github.com/d3/d3-selection#selection_data) method has been changed slightly with respect to duplicate keys. In 3.x, if multiple data had the same key, the duplicate data would be ignored and not included in enter, update or exit; in 4.0 the duplicate data is always put in the enter selection. In both 3.x and 4.0, if multiple elements have the same key, the duplicate elements are put in the exit selection. Thus, 4.0’s behavior is now symmetric for enter and exit, and the general update pattern will now produce a DOM that matches the data even if there are duplicate keys.

Selections have several new methods! Use [*selection*.raise](https://github.com/d3/d3-selection#selection_raise) to move the selected elements to the front of their siblings, so that they are drawn on top; use [*selection*.lower](https://github.com/d3/d3-selection#selection_lower) to move them to the back. Use [*selection*.dispatch](https://github.com/d3/d3-selection#selection_dispatch) to dispatch a [custom event](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) to event listeners.

When called in getter mode, [*selection*.data](https://github.com/d3/d3-selection#selection_data) now returns the data for all elements in the selection, rather than just the data for the first group of elements. The [*selection*.call](https://github.com/d3/d3-selection#selection_call) method no longer sets the `this` context when invoking the specified function; the *selection* is passed as the first argument to the function, so use that. The [*selection*.on](https://github.com/d3/d3-selection#selection_on) method now accepts multiple whitespace-separated typenames, so you can add or remove multiple listeners simultaneously. For example:

```js
selection.on("mousedown touchstart", function() {
  console.log(d3.event.type);
});
```

The arguments passed to callback functions has changed slightly in 4.0 to be more consistent. The standard arguments are the element’s datum (*d*), the element’s index (*i*), and the element’s group (*nodes*), with *this* as the element. The slight exception to this convention is *selection*data, which is evaluated for each group rather than each element; it is passed the group’s parent datum (*d*), the group index (*i*), and the selection’s parents (*parents*), with *this* as the group’s parent.

The new [d3.local](https://github.com/d3/d3-selection#local-variables) provides a mechanism for defining [local variables](http://bl.ocks.org/mbostock/e1192fe405703d8321a5187350910e08): state that is bound to DOM elements, and available to any descendant element. This can be a convenient alternative to using [*selection*.each](https://github.com/d3/d3-selection#selection_each) or storing local state in data.

The d3.ns.prefix namespace prefix map has been renamed to [d3.namespaces](https://github.com/d3/d3-selection#namespaces), and the d3.ns.qualify method has been renamed to [d3.namespace](https://github.com/d3/d3-selection#namespace). Several new low-level methods are now available, as well. [d3.matcher](https://github.com/d3/d3-selection#matcher) is used internally by [*selection*.filter](https://github.com/d3/d3-selection#selection_filter); [d3.selector](https://github.com/d3/d3-selection#selector) is used by [*selection*.select](https://github.com/d3/d3-selection#selection_select); [d3.selectorAll](https://github.com/d3/d3-selection#selectorAll) is used by [*selection*.selectAll](https://github.com/d3/d3-selection#selection_selectAll); [d3.creator](https://github.com/d3/d3-selection#creator) is used by [*selection*.append](https://github.com/d3/d3-selection#selection_append) and [*selection*.insert](https://github.com/d3/d3-selection#selection_insert). The new [d3.window](https://github.com/d3/d3-selection#window) returns the owner window for a given element, window or document. The new [d3.customEvent](https://github.com/d3/d3-selection#customEvent) temporarily sets [d3.event](https://github.com/d3/d3-selection#event) while invoking a function, allowing you to implement controls which dispatch custom events; this is used by [d3-drag](https://github.com/d3/d3-drag), [d3-zoom](https://github.com/d3/d3-zoom) and [d3-brush](https://github.com/d3/d3-brush).

For the sake of parsimony, the multi-value map methods have been extracted to [d3-selection-multi](https://github.com/d3/d3-selection-multi) and are no longer part of the default bundle. The multi-value map methods have also been renamed to plural form to reduce overload: [*selection*.attrs](https://github.com/d3/d3-selection-multi#selection_attrs), [*selection*.styles](https://github.com/d3/d3-selection-multi#selection_styles) and [*selection*.properties](https://github.com/d3/d3-selection-multi#selection_properties).

## [Shapes (d3-shape)](https://github.com/d3/d3-shape/blob/master/README.md)

TODO

[Introducing d3-shape](https://medium.com/@mbostock/introducing-d3-shape-73f8367e6d12#.78ucz4hr2)

* d3.svg.line ↦ d3.line
* d3.svg.line.radial ↦ d3.radialLine
* d3.svg.area ↦ d3.area
* d3.svg.area.radial ↦ d3.radialArea
* d3.svg.arc ↦ d3.arc
* more robust arc padding?

shapes can now render to canvas!

* *line*.context
* *area*.context
* *arc*.context
* see also d3-path
* fast; uses streaming geometry transforms similar to d3-geo

new curve API!

* *line*.interpolate ↦ *line*.curve
* *area*.interpolate ↦ *area*.curve
* "basis" ↦ d3.curveBasis
* "basis-closed" ↦ d3.curveBasisClosed
* "basis-open" ↦ d3.curveBasisOpen
* "bundle" ↦ d3.curveBundle, *bundle*.beta
* default bundle β to 0.85
* "cardinal" ↦ d3.curveCardinal
* "cardinal-closed" ↦ d3.curveCardinalClosed
* "cardinal-open" ↦ d3.curveCardinalOpen
* fixed interpretation of cardinal spline tension
* fixed first and last segment of basis curve
* fixed first and last segment of cardinal curve
* new d3.curveCatmullRom!
* new d3.curveCatmullRomClosed!
* new d3.curveCatmullRomOpen!
* *catmullRom*.alpha implements Yuksel et al.’s parameterization
* defaults to centripetal Catmull–Rom
* "linear" ↦ d3.curveLinear
* "linear-closed" ↦ d3.curveLinearClosed
* fixed monotone curve implementation
* "monotone" ↦ d3.curveMonotoneX
* new d3.curveMonotoneY
* new d3.curveNatural
* "step" ↦ d3.curveStep
* "step-after" ↦ d3.curveStepAfter
* "step-before" ↦ d3.curveStepBefore
* no more funky *interpolate*.reverse; curves can define different behavior for topline vs. baseline

new symbol API

* d3.svg.symbol ↦ d3.symbol
* d3.svg.symbolTypes ↦ d3.symbolTypes
* new d3.symbolStar
* new d3.symbolWye
* "triangle-up" ↦ d3.symbolTriangle
* removed "triangle-down"

new stack API!

* d3.layout.stack ↦ d3.stack
* no more x-accessor
* no more weird *stack*.out

removed diagonal shapes

* d3.svg.diagonal ↦ REMOVED
* d3.svg.diagonal.radial ↦ REMOVED

## [Time Formats (d3-time-format)](https://github.com/d3/d3-time-format/blob/master/README.md)

Pursuant to the great namespace flattening, the format constructors have new names:

* d3.time.format ↦ [d3.timeFormat](https://github.com/d3/d3-time-format#timeFormat)
* d3.time.format.utc ↦ [d3.utcFormat](https://github.com/d3/d3-time-format#utcFormat)
* d3.time.format.iso ↦ [d3.isoFormat](https://github.com/d3/d3-time-format#isoFormat)

The *format*.parse method has also been removed in favor of separate [d3.timeParse](https://github.com/d3/d3-time-format#timeParse), [d3.utcParse](https://github.com/d3/d3-time-format#utcParse) and [d3.isoParse](https://github.com/d3/d3-time-format#isoParse) parser constructors. Thus, this code in 3.x:

```js
var parseTime = d3.time.format("%c").parse;
```

Can be rewritten in 4.0 as:

```js
var parseTime = d3.timeParse("%c");
```

The multi-scale time format d3.time.format.multi has been replaced by [d3.scaleTime](https://github.com/d3/d3-scale#scaleTime)’s [tick format](https://github.com/d3/d3-scale#time_tickFormat). Time formats now coerce inputs to dates, and time parsers coerce inputs to strings. The `%Z` directive now allows more flexible parsing of time zone offsets, such as `-0700`, `-07:00`, `-07`, and `Z`. The `%p` directive is now parsed correctly when the locale’s period name is longer than two characters (*e.g.*, “a.m.”).

The performance of time formatting and parsing has been improved, and the UTC formatter and parser have a cleaner implementation (that avoids temporarily overriding the Date global). The locales are now published as [JSON](https://github.com/d3/d3-request#json) to [NPM](https://npmcdn.com/d3-time-format/locale/).

## [Time Intervals (d3-time)](https://github.com/d3/d3-time/blob/master/README.md)

Pursuant to the great namespace flattening, the local time intervals have been renamed:

* ADDED ↦ [d3.timeMillisecond](https://github.com/d3/d3-time#timeMillisecond)
* d3.time.second ↦ [d3.timeSecond](https://github.com/d3/d3-time#timeSecond)
* d3.time.minute ↦ [d3.timeMinute](https://github.com/d3/d3-time#timeMinute)
* d3.time.hour ↦ [d3.timeHour](https://github.com/d3/d3-time#timeHour)
* d3.time.day ↦ [d3.timeDay](https://github.com/d3/d3-time#timeDay)
* d3.time.sunday ↦ [d3.timeSunday](https://github.com/d3/d3-time#timeSunday)
* d3.time.monday ↦ [d3.timeMonday](https://github.com/d3/d3-time#timeMonday)
* d3.time.tuesday ↦ [d3.timeTuesday](https://github.com/d3/d3-time#timeTuesday)
* d3.time.wednesday ↦ [d3.timeWednesday](https://github.com/d3/d3-time#timeWednesday)
* d3.time.thursday ↦ [d3.timeThursday](https://github.com/d3/d3-time#timeThursday)
* d3.time.friday ↦ [d3.timeFriday](https://github.com/d3/d3-time#timeFriday)
* d3.time.saturday ↦ [d3.timeSaturday](https://github.com/d3/d3-time#timeSaturday)
* d3.time.week ↦ [d3.timeWeek](https://github.com/d3/d3-time#timeWeek)
* d3.time.month ↦ [d3.timeMonth](https://github.com/d3/d3-time#timeMonth)
* d3.time.year ↦ [d3.timeYear](https://github.com/d3/d3-time#timeYear)

The UTC time intervals have likewise been renamed:

* ADDED ↦ [d3.utcMillisecond](https://github.com/d3/d3-time#utcMillisecond)
* d3.time.second.utc ↦ [d3.utcSecond](https://github.com/d3/d3-time#utcSecond)
* d3.time.minute.utc ↦ [d3.utcMinute](https://github.com/d3/d3-time#utcMinute)
* d3.time.hour.utc ↦ [d3.utcHour](https://github.com/d3/d3-time#utcHour)
* d3.time.day.utc ↦ [d3.utcDay](https://github.com/d3/d3-time#utcDay)
* d3.time.sunday.utc ↦ [d3.utcSunday](https://github.com/d3/d3-time#utcSunday)
* d3.time.monday.utc ↦ [d3.utcMonday](https://github.com/d3/d3-time#utcMonday)
* d3.time.tuesday.utc ↦ [d3.utcTuesday](https://github.com/d3/d3-time#utcTuesday)
* d3.time.wednesday.utc ↦ [d3.utcWednesday](https://github.com/d3/d3-time#utcWednesday)
* d3.time.thursday.utc ↦ [d3.utcThursday](https://github.com/d3/d3-time#utcThursday)
* d3.time.friday.utc ↦ [d3.utcFriday](https://github.com/d3/d3-time#utcFriday)
* d3.time.saturday.utc ↦ [d3.utcSaturday](https://github.com/d3/d3-time#utcSaturday)
* d3.time.week.utc ↦ [d3.utcWeek](https://github.com/d3/d3-time#utcWeek)
* d3.time.month.utc ↦ [d3.utcMonth](https://github.com/d3/d3-time#utcMonth)
* d3.time.year.utc ↦ [d3.utcYear](https://github.com/d3/d3-time#utcYear)

The local time range aliases have been renamed:

* d3.time.seconds ↦ [d3.timeSeconds](https://github.com/d3/d3-time#timeSeconds)
* d3.time.minutes ↦ [d3.timeMinutes](https://github.com/d3/d3-time#timeMinutes)
* d3.time.hours ↦ [d3.timeHours](https://github.com/d3/d3-time#timeHours)
* d3.time.days ↦ [d3.timeDays](https://github.com/d3/d3-time#timeDays)
* d3.time.sundays ↦ [d3.timeSundays](https://github.com/d3/d3-time#timeSundays)
* d3.time.mondays ↦ [d3.timeMondays](https://github.com/d3/d3-time#timeMondays)
* d3.time.tuesdays ↦ [d3.timeTuesdays](https://github.com/d3/d3-time#timeTuesdays)
* d3.time.wednesdays ↦ [d3.timeWednesdays](https://github.com/d3/d3-time#timeWednesdays)
* d3.time.thursdays ↦ [d3.timeThursdays](https://github.com/d3/d3-time#timeThursdays)
* d3.time.fridays ↦ [d3.timeFridays](https://github.com/d3/d3-time#timeFridays)
* d3.time.saturdays ↦ [d3.timeSaturdays](https://github.com/d3/d3-time#timeSaturdays)
* d3.time.weeks ↦ [d3.timeWeeks](https://github.com/d3/d3-time#timeWeeks)
* d3.time.months ↦ [d3.timeMonths](https://github.com/d3/d3-time#timeMonths)
* d3.time.years ↦ [d3.timeYears](https://github.com/d3/d3-time#timeYears)

The UTC time range aliases have been renamed:

* d3.time.seconds.utc ↦ [d3.utcSeconds](https://github.com/d3/d3-time#utcSeconds)
* d3.time.minutes.utc ↦ [d3.utcMinutes](https://github.com/d3/d3-time#utcMinutes)
* d3.time.hours.utc ↦ [d3.utcHours](https://github.com/d3/d3-time#utcHours)
* d3.time.days.utc ↦ [d3.utcDays](https://github.com/d3/d3-time#utcDays)
* d3.time.sundays.utc ↦ [d3.utcSundays](https://github.com/d3/d3-time#utcSundays)
* d3.time.mondays.utc ↦ [d3.utcMondays](https://github.com/d3/d3-time#utcMondays)
* d3.time.tuesdays.utc ↦ [d3.utcTuesdays](https://github.com/d3/d3-time#utcTuesdays)
* d3.time.wednesdays.utc ↦ [d3.utcWednesdays](https://github.com/d3/d3-time#utcWednesdays)
* d3.time.thursdays.utc ↦ [d3.utcThursdays](https://github.com/d3/d3-time#utcThursdays)
* d3.time.fridays.utc ↦ [d3.utcFridays](https://github.com/d3/d3-time#utcFridays)
* d3.time.saturdays.utc ↦ [d3.utcSaturdays](https://github.com/d3/d3-time#utcSaturdays)
* d3.time.weeks.utc ↦ [d3.utcWeeks](https://github.com/d3/d3-time#utcWeeks)
* d3.time.months.utc ↦ [d3.utcMonths](https://github.com/d3/d3-time#utcMonths)
* d3.time.years.utc ↦ [d3.utcYears](https://github.com/d3/d3-time#utcYears)

The behavior of [*interval*.range](https://github.com/d3/d3-time#interval_range) (and the convenience aliases such as [d3.timeDays](https://github.com/d3/d3-time#timeDays)) has been changed when *step* is greater than one. Rather than filtering the returned dates using the field number, *interval*.range now behaves like [d3.range](https://github.com/d3/d3-array#range): it simply skips, returning every *step*th date. For example, the following code in 3.x returns only odd days of the month:

```js
d3.time.days(new Date(2016, 4, 28), new Date(2016, 5, 5), 2);
// [Sun May 29 2016 00:00:00 GMT-0700 (PDT),
//  Tue May 31 2016 00:00:00 GMT-0700 (PDT),
//  Wed Jun 01 2016 00:00:00 GMT-0700 (PDT),
//  Fri Jun 03 2016 00:00:00 GMT-0700 (PDT)]
```

Note the returned array of dates does not start on the *start* date because May 28 is even. Also note that May 31 and June 1 are one day apart, not two! The behavior of d3.timeDays in 4.0 is probably closer to what you expect:

```js
d3.timeDays(new Date(2016, 4, 28), new Date(2016, 5, 5), 2);
// [Sat May 28 2016 00:00:00 GMT-0700 (PDT),
//  Mon May 30 2016 00:00:00 GMT-0700 (PDT),
//  Wed Jun 01 2016 00:00:00 GMT-0700 (PDT),
//  Fri Jun 03 2016 00:00:00 GMT-0700 (PDT)]
```

If you want a filtered view of a time interval (say to guarantee that two overlapping ranges are consistent, such as when generating [time scale ticks](https://github.com/d3/d3-scale#time_ticks)), you can use the new [*interval*.every](https://github.com/d3/d3-time#interval_every) method or its more general cousin [*interval*.filter](https://github.com/d3/d3-time#interval_filter):

```js
d3.timeDay.every(2).range(new Date(2016, 4, 28), new Date(2016, 5, 5));
// [Sun May 29 2016 00:00:00 GMT-0700 (PDT),
//  Tue May 31 2016 00:00:00 GMT-0700 (PDT),
//  Wed Jun 01 2016 00:00:00 GMT-0700 (PDT),
//  Fri Jun 03 2016 00:00:00 GMT-0700 (PDT)]
```

Time intervals now expose an [*interval*.count](https://github.com/d3/d3-time#interval_count) method for counting the number of interval boundaries after a *start* date and before or equal to an *end* date. This replaces d3.time.dayOfYear and related methods in 3.x. For example, this code in 3.x:

```js
var now = new Date;
d3.time.dayOfYear(now); // 165
```

Can be rewritten in 4.0 as:

```js
var now = new Date;
d3.timeDay.count(d3.timeYear(now), now); // 165
```

Likewise, in place of 3.x’s d3.time.weekOfYear, in 4.0 you would say:

```js
d3.timeWeek.count(d3.timeYear(now), now); // 24
```

The new *interval*.count is of course more general. For example, you can use it to compute hour-of-week for a heatmap:

```js
d3.timeHour.count(d3.timeWeek(now), now); // 64
```

Here are all the equivalences from 3.x to 4.0:

* d3.time.dayOfYear ↦ [d3.timeDay](https://github.com/d3/d3-time#timeDay).[count](https://github.com/d3/d3-time#interval_count)
* d3.time.sundayOfYear ↦ [d3.timeSunday](https://github.com/d3/d3-time#timeSunday).[count](https://github.com/d3/d3-time#interval_count)
* d3.time.mondayOfYear ↦ [d3.timeMonday](https://github.com/d3/d3-time#timeMonday).[count](https://github.com/d3/d3-time#interval_count)
* d3.time.tuesdayOfYear ↦ [d3.timeTuesday](https://github.com/d3/d3-time#timeTuesday).[count](https://github.com/d3/d3-time#interval_count)
* d3.time.wednesdayOfYear ↦ [d3.timeWednesday](https://github.com/d3/d3-time#timeWednesday).[count](https://github.com/d3/d3-time#interval_count)
* d3.time.thursdayOfYear ↦ [d3.timeThursday](https://github.com/d3/d3-time#timeThursday).[count](https://github.com/d3/d3-time#interval_count)
* d3.time.fridayOfYear ↦ [d3.timeFriday](https://github.com/d3/d3-time#timeFriday).[count](https://github.com/d3/d3-time#interval_count)
* d3.time.saturdayOfYear ↦ [d3.timeSaturday](https://github.com/d3/d3-time#timeSaturday).[count](https://github.com/d3/d3-time#interval_count)
* d3.time.weekOfYear ↦ [d3.timeWeek](https://github.com/d3/d3-time#timeWeek).[count](https://github.com/d3/d3-time#interval_count)
* d3.time.dayOfYear.utc ↦ [d3.utcDay](https://github.com/d3/d3-time#utcDay).[count](https://github.com/d3/d3-time#interval_count)
* d3.time.sundayOfYear.utc ↦ [d3.utcSunday](https://github.com/d3/d3-time#utcSunday).[count](https://github.com/d3/d3-time#interval_count)
* d3.time.mondayOfYear.utc ↦ [d3.utcMonday](https://github.com/d3/d3-time#utcMonday).[count](https://github.com/d3/d3-time#interval_count)
* d3.time.tuesdayOfYear.utc ↦ [d3.utcTuesday](https://github.com/d3/d3-time#utcTuesday).[count](https://github.com/d3/d3-time#interval_count)
* d3.time.wednesdayOfYear.utc ↦ [d3.utcWednesday](https://github.com/d3/d3-time#utcWednesday).[count](https://github.com/d3/d3-time#interval_count)
* d3.time.thursdayOfYear.utc ↦ [d3.utcThursday](https://github.com/d3/d3-time#utcThursday).[count](https://github.com/d3/d3-time#interval_count)
* d3.time.fridayOfYear.utc ↦ [d3.utcFriday](https://github.com/d3/d3-time#utcFriday).[count](https://github.com/d3/d3-time#interval_count)
* d3.time.saturdayOfYear.utc ↦ [d3.utcSaturday](https://github.com/d3/d3-time#utcSaturday).[count](https://github.com/d3/d3-time#interval_count)
* d3.time.weekOfYear.utc ↦ [d3.utcWeek](https://github.com/d3/d3-time#utcWeek).[count](https://github.com/d3/d3-time#interval_count)

D3 4.0 now also lets you define custom time intervals using [d3.timeInterval](https://github.com/d3/d3-time#timeInterval). The [d3.timeYear](https://github.com/d3/d3-time#timeYear), [d3.utcYear](https://github.com/d3/d3-time#utcYear), [d3.timeMillisecond](https://github.com/d3/d3-time#timeMillisecond) and [d3.utcMillisecond](https://github.com/d3/d3-time#utcMillisecond) intervals have optimized implementations of [*interval*.every](https://github.com/d3/d3-time#interval_every), which is necessary to generate time ticks for very large or very small domains efficiently. More generally, the performance of time intervals has been improved, and time intervals now do a better job with respect to daylight savings in various locales.

## [Timers (d3-timer)](https://github.com/d3/d3-timer/blob/master/README.md)

In D3 3.x, the only way to stop a timer was for its callback to return true. For example, this timer stops after one second:

```js
d3.timer(function(elapsed) {
  console.log(elapsed);
  return elapsed >= 1000;
});
```

In 4.0, use [*timer*.stop](https://github.com/d3/d3-timer#timer_stop) instead:

```js
var t = d3.timer(function(elapsed) {
  console.log(elapsed);
  if (elapsed >= 1000) {
    t.stop();
  }
});
```

The primary benefit of *timer*.stop is that timers are not required to self-terminate: they can be stopped externally, allowing for the immediate and synchronous disposal of associated resources, and the separation of concerns. The above is equivalent to:

```js
var t = d3.timer(function(elapsed) {
  console.log(elapsed);
});

d3.timeout(function() {
  t.stop();
}, 1000);
```

This improvement extends to [d3-transition](#transitions-d3-transition): now when a transition is interrupted, its resources are immediately freed rather than having to wait for transition to start.

4.0 also introduces a new [*timer*.restart](https://github.com/d3/d3-timer#timer_restart) method for restarting timers, for replacing the callback of a running timer, or for changing its delay or reference time. Unlike *timer*.stop followed by [d3.timer](https://github.com/d3/d3-timer#timer), *timer*.restart maintains the invocation priority of an existing timer: it guarantees that the order of invocation of active timers remains the same.

Some usage patterns in D3 3.x could cause the browser to hang when a background page returned to the foreground. For example, the following code schedules a transition every second:

```js
setInterval(function() {
  d3.selectAll("div").transition().call(someAnimation); // BAD
}, 1000);
```

If such code runs in the background for hours, thousands of queued transitions will try to run simultaneously when the page is foregrounded. D3 4.0 avoids this hang by freezing time in the background: when a page is in the background, time does not advance, and so no queue of timers accumulates to run when the page returns to the foreground. Use d3.timer instead of transitions to schedule a long-running animation, or use [d3.timeout](https://github.com/d3/d3-timer#timeout) and [d3.interval](https://github.com/d3/d3-timer#interval) in place of setTimeout and setInterval to prevent transitions from being queued in the background:

```js
d3.interval(function() {
  d3.selectAll("div").transition().call(someAnimation); // GOOD
}, 1000);
```

By freezing time in the background, timers are effectively “unaware” of being backgrounded. It’s like nothing happened! 4.0 also now uses high-precision time ([performance.now](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now)) where available; the current time is available as [d3.now](https://github.com/d3/d3-timer#now).

The d3.timer.flush method has been renamed to [d3.timerFlush](https://github.com/d3/d3-timer#timerFlush).

## [Transitions (d3-transition)](https://github.com/d3/d3-transition/blob/master/README.md)

TODO

* transitions are immutable, too; *transition*.merge
* *transition*.each ↦ *transition*.on
* *transition*.each is now the same as *selection*.each
* new d3.active for chaining transitions / modifying in-progress transitions
* new *selection*.transition(*transition*); searches ancestors
* new d3.interrupt
* change *transition*.transition semantics in regards to *transition*.delay
* strict state machine to enforce when transitions can be modified; more robust
* enforces *t* = 1 on end
* functions passed to transition methods take the same standard arguments as selections
* optimize transitions to re-use tweens and interpolators to improve performance!
* *transition*.attrTween gets standard arguments (not current attribute value)
* *transition*.styleTween gets standard arguments (not current style value)
* call *transition*.{tween,attrTween,styleTween} in getter mode
* uses optimized interpolator rather than d3.interpolate
* fix *transition*.remove if multiple transition names are in use
* new *transition*.selection
* changed *transition*.ease to always take an easing function, not a name
* see also d3-timer, d3-ease, d3-interpolate
* in particular note that transitions are now frozen in the background! and there’s d3.timeout, d3.interval

## [Voronoi Diagrams (d3-voronoi)](https://github.com/d3/d3-voronoi/blob/master/README.md)

TODO

* d3.geom.voronoi ↦ d3.voronoi
* *voronoi*.clipExtent ↦ *voronoi*.extent
* *voronoi* now returns the full Voronoi diagram
* new *voronoi*.polygons returns clipped polygons
* *voronoi*.polygons and *diagram*.polygons require an extent
* the diagram can be used to compute Voronoi & Delaunay simultaneously
* the diagram also exposes topology, which is useful for TopoJSON applications
* well-defined behavior for coincident vertices: subsequent cells are null
* input data exposed as *polygon*.data, not *polygon*.point

## [Zooming (d3-zoom)](https://github.com/d3/d3-zoom/blob/master/README.md)

TODO

* d3.behavior.zoom ↦ d3.zoom
* ignore wheel events if at limits of scale extent
* ignores right-click by default
* new *zoom*.translateExtent!
* consume handled events
* new *zoom*.transform replaces *zoom*.event; *zoom* behavior is stateless
* new *zoom*.translateBy
* new *zoom*.scaleBy
* new *zoom*.scaleTo
* new *zoom*.filter
* removed *zoom*.center; use programmatic zooming instead
* *zoom*.size ↦ *zoom*.extent; better default extent using the DOM
* *zoomstart* event ↦ *start* event
* *zoomend* event ↦ *end* event

new d3.zoomTransform API

* *event*.scale, *event*.translate ↦ *event*.transform
* *zoom*.x ↦ *transform*.rescaleX
* *zoom*.y ↦ *transform*.rescaleY
