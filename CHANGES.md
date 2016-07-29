# Changes in D3 4.0

D3 4.0 is modular. Instead of one library, D3 is now [many small libraries](#table-of-contents) that are designed to work together. You can pick and choose which parts to use as you see fit. Each library is maintained in its own repository, allowing decentralized ownership and independent release cycles. The default bundle combines about thirty of these microlibraries.

```html
<script src="https://d3js.org/d3.v4.js"></script>
```

As before, you can load optional plugins on top of the default bundle, such as [ColorBrewer scales](https://github.com/d3/d3-scale-chromatic):

```html
<script src="https://d3js.org/d3.v4.js"></script>
<script src="https://d3js.org/d3-scale-chromatic.v0.3.js"></script>
```

You are not required to use the default bundle! If you’re just using [d3-selection](https://github.com/d3/d3-selection), use it as a standalone library. Like the default bundle, you can load D3 microlibraries using vanilla script tags or RequireJS (great for HTTP/2!):

```html
<script src="https://d3js.org/d3-selection.v1.js"></script>
```

You can also `cat` D3 microlibraries into a custom bundle, or use tools such as [Webpack](https://webpack.github.io/) and [Rollup](http://rollupjs.org/) to create [optimized bundles](https://bl.ocks.org/mbostock/bb09af4c39c79cffcde4). Custom bundles are great for applications that use a subset of D3’s features; for example, a React chart library might use D3 for scales and shapes, and React to manipulate the DOM. The D3 microlibraries are written as [ES6 modules](http://www.2ality.com/2014/09/es6-modules-final.html), and Rollup lets you pick at the symbol level to produce smaller bundles.

Small files are nice, but modularity is also about making D3 more *fun*. Microlibraries are easier to understand, develop and test. They make it easier for new people to get involved and contribute. They reduce the distinction between a “core module” and a “plugin”, and increase the pace of development in D3 features.

If you don’t care about modularity, you can mostly ignore this change and keep using the default bundle. However, there is one unavoidable consequence of adopting ES6 modules: every symbol in D3 4.0 now shares a flat namespace rather than the nested one of D3 3.x. For example, d3.scale.linear is now d3.scaleLinear, and d3.layout.treemap is now d3.treemap. The adoption of ES6 modules also means that D3 is now written exclusively in [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) and has better readability. And there have been many other significant improvements to D3’s features! (Nearly all of the code from D3 3.x has been rewritten.) These changes are covered below.

### Other Global Changes

The default [UMD bundle](https://github.com/umdjs/umd) is now [anonymous](https://github.com/requirejs/requirejs/wiki/Updating-existing-libraries#register-as-an-anonymous-module-). No `d3` global is exported if AMD or CommonJS is detected. In a vanilla environment, the D3 microlibraries share the `d3` global, even if you load them independently; thus, code you write is the same whether or not you use the default bundle. (See [Let’s Make a (D3) Plugin](https://bost.ocks.org/mike/d3-plugin/) for more.) The generated bundle is no longer stored in the Git repository; Bower has been repointed to [d3-bower](https://github.com/mbostock-bower/d3-bower), and you can find the generated files on [npmcdn](https://npmcdn.com/d3@next/) or attached to the [latest release](https://github.com/d3/d3/releases/latest). The non-minified default bundle is no longer mangled, making it more readable and preserving inline comments.

To the consternation of some users, 3.x employed Unicode variable names such as λ, φ, τ and π for a concise representation of mathematical operations. A downside of this approach was that a SyntaxError would occur if you loaded the non-minified D3 using ISO-8859-1 instead of UTF-8. 3.x also used Unicode string literals, such as the SI-prefix µ for 1e-6. 4.0 uses only ASCII variable names and ASCII string literals (see [rollup-plugin-ascii](https://github.com/mbostock/rollup-plugin-ascii)), avoiding encoding problems.

### Table of Contents

* [Arrays](#arrays-d3-array)
* [Axes](#axes-d3-axis)
* [Brushes](#brushes-d3-brush)
* [Chords](#chords-d3-chord)
* [Collections](#collections-d3-collection)
* [Colors](#colors-d3-color)
* [Dispatches](#dispatches-d3-dispatch)
* [Dragging](#dragging-d3-drag)
* [Delimiter-Separated Values](#delimiter-separated-values-d3-dsv)
* [Easings](#easings-d3-ease)
* [Forces](#forces-d3-force)
* [Number Formats](#number-formats-d3-format)
* [Geographies](#geographies-d3-geo)
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

Replacing d3.svg.brush, there are now three classes of brush for brushing along the *x*-dimension, the *y*-dimension, or both: [d3.brushX](https://github.com/d3/d3-brush#brushX), [d3.brushY](https://github.com/d3/d3-brush#brushY), [d3.brush](https://github.com/d3/d3-brush#brush). Brushes are no longer dependent on [scales](#scales-d3-scale); instead, each brush defines a selection in screen coordinates. This selection can be [inverted](https://github.com/d3/d3-scale#continuous_invert) if you want to compute the corresponding data domain. And rather than rely on the scales’ ranges to determine the brushable area, there is now a [*brush*.extent](https://github.com/d3/d3-brush#brush_extent) method for setting it. If you do not set the brush extent, it defaults to the full extent of the owner SVG element. The *brush*.clamp method has also been eliminated; brushing is always restricted to the brushable area defined by the brush extent.

Brushes no longer store the active brush selection (*i.e.*, the highlighted region; the brush’s position) internally. The brush’s position is now stored on any elements to which the brush has been applied. The brush’s position is available as *event*.selection within a brush event or by calling [d3.brushSelection](https://github.com/d3/d3-brush#brushSelection) on a given *element*. To move the brush programmatically, use [*brush*.move](https://github.com/d3/d3-brush#brush_move) with a given [selection](#selections-d3-selection) or [transition](#transitions-d3-transition); see the [brush snapping example](http://bl.ocks.org/mbostock/6232537). The *brush*.event method has been removed.

Brush interaction has been improved. By default, brushes now ignore right-clicks intended for the context menu; you can change this behavior using [*brush*.filter](https://github.com/d3/d3-brush#brush_filter). Brushes also ignore emulated mouse events on iOS. Holding down SHIFT (⇧) while brushing locks the *x*- or *y*-position of the brush. Holding down META (⌘) while clicking and dragging starts a new selection, rather than translating the existing selection.

The default appearance of the brush has also been improved and slightly simplified. Previously it was necessary to apply styles to the brush to give it a reasonable appearance, such as:

```css
.brush .extent {
  stroke: #fff;
  fill-opacity: .125;
  shape-rendering: crispEdges;
}
```

These styles are now applied by default as attributes; if you want to customize the brush appearance, you can still apply external styles or modify the brush elements. (D3 4.0 features a similar improvement to [axes](#axes-d3-axis).) A new [*brush*.handleSize](https://github.com/d3/d3-brush#brush_handleSize) method lets you override the brush handle size; it defaults to six pixels.

The brush now consumes handled events, making it easier to combine with other interactive behaviors such as [dragging](#dragging-d3-drag) and [zooming](#zooming-d3-zoom). The *brushstart* and *brushend* events have been renamed to *start* and *end*, respectively. The brush event no longer reports a *event*.mode to distinguish between resizing and dragging the brush.

## [Chords (d3-chord)](https://github.com/d3/d3-chord/blob/master/README.md)

Pursuant to the great namespace flattening:

* d3.layout.chord ↦ [d3.chord](https://github.com/d3/d3-chord#chord)
* d3.svg.chord ↦ [d3.ribbon](https://github.com/d3/d3-chord#ribbon)

For consistency with [*arc*.padAngle](https://github.com/d3/d3-shape#arc_padAngle), *chord*.padding has also been renamed to [*ribbon*.padAngle](https://github.com/d3/d3-chord#ribbon_padAngle). A new [*ribbon*.context](https://github.com/d3/d3-chord#ribbon_context) method lets you render chord diagrams to Canvas! See also [d3-path](#paths-d3-path).

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

The drag behavior d3.behavior.drag has been renamed to d3.drag. The *drag*.origin method has been replaced by [*drag*.subject](https://github.com/d3/d3-drag#drag_subject), which allows you to define the thing being dragged at the start of a drag gesture. This is particularly useful with Canvas, where draggable objects typically share a Canvas element (as opposed to SVG, where draggable objects typically have distinct DOM elements); see the [circle dragging example](http://bl.ocks.org/mbostock/444757cc9f0fde320a5f469cd36860f4).

A new [*drag*.container](https://github.com/d3/d3-drag#drag_container) method lets you override the parent element that defines the drag gesture coordinate system. This defaults to the parent node of the element to which the drag behavior was applied. For dragging on Canvas elements, you probably want to use the Canvas element as the container.

[Drag events](https://github.com/d3/d3-drag#drag-events) now expose an [*event*.on](https://github.com/d3/d3-drag#event_on) method for registering temporary listeners for duration of the current drag gesture; these listeners can capture state for the current gesture, such as the thing being dragged. A new *event*.active property lets you detect whether multiple (multitouch) drag gestures are active concurrently. The *dragstart* and *dragend* events have been renamed to *start* and *end*. By default, drag behaviors now ignore right-clicks intended for the context menu; use [*drag*.filter](https://github.com/d3/d3-drag#drag_filter) to control which events are ignored. The drag behavior also ignores emulated mouse events on iOS. The drag behavior now consumes handled events, making it easier to combine with other interactive behaviors such as [zooming](#zooming-d3-zoom).

The new [d3.dragEnable](https://github.com/d3/d3-drag#dragEnable) and [d3.dragDisable](https://github.com/d3/d3-drag#dragDisable) methods provide a low-level API for implementing drag gestures across browsers and devices. These methods are also used by other D3 components, such as the [brush](#brushes-d3-brush).

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

The force layout d3.layout.force has been renamed to d3.forceSimulation. The force simulation now uses [velocity Verlet integration](https://en.wikipedia.org/wiki/Verlet_integration#Velocity_Verlet) rather than position Verlet, tracking the nodes’ positions (*node*.x, *node*.y) and velocities (*node*.vx, *node*.vy) rather than their previous positions (*node*.px, *node*.py).

Rather than hard-coding a set of built-in forces, the force simulation is now extensible: you specify which forces you want! The approach affords greater flexibility through composition. The new forces are more flexible, too: force parameters can typically be configured per-node or per-link. There are separate positioning forces for [*x*](https://github.com/d3/d3-force#forceX) and [*y*](https://github.com/d3/d3-force#forceY) that replace *force*.gravity. The new [link force](https://github.com/d3/d3-force#forceLink) replaces *force*.linkStrength and employs better default heuristics to improve stability. The new [many-body force](https://github.com/d3/d3-force#forceManyBody) replaces *force*.charge and supports a new [minimum-distance parameter](https://github.com/d3/d3-force#manyBody_distanceMin) and performance improvements thanks to 4.0’s [new quadtrees](#quadtrees-d3-quadtree). There are also brand-new forces for [centering nodes](https://github.com/d3/d3-force#forceCenter) and [collision resolution](https://github.com/d3/d3-force#forceCollision).

The new forces and simulation have been carefully crafted to avoid nondeterminism. Rather than initializing nodes randomly, if the nodes do not have preset positions, they are placed in a phyllotaxis pattern:

<img alt="Phyllotaxis" src="https://raw.githubusercontent.com/d3/d3-force/master/img/phyllotaxis.png" width="420" height="219">

Random jitter is still needed to resolve link, collision and many-body forces if there are coincident nodes, but at least in the common case, the force simulation (and the resulting force-directed graph layout) is now consistent across browsers and reloads. D3 no longer plays dice!

The force simulation has several new methods for greater control over heating, such as [*simulation*.alphaMin](https://github.com/d3/d3-force#simulation_alphaMin) and [*simulation*.alphaDecay](https://github.com/d3/d3-force#simulation_alphaDecay), and the internal timer. Calling [*simulation*.alpha](https://github.com/d3/d3-force#simulation_alpha) now has no effect on the internal timer, which is controlled independently via [*simulation*.stop](https://github.com/d3/d3-force#simulation_stop) and [*simulation*.restart](https://github.com/d3/d3-force#simulation_restart). As in 3.x, you can advance the simulation manually using [*simulation*.tick](https://github.com/d3/d3-force#simulation_tick). The *force*.friction parameter is replaced by *simulation*.velocityDecay. A new [*simulation*.alphaTarget](https://github.com/d3/d3-force#simulation_alphaTarget) method allows you to set the desired alpha (temperature) of the simulation, such that the simulation can be smoothly reheated during interaction, and then smoothly cooled again. This improves the stability of the graph during interaction.

The force layout no longer depends on the [drag behavior](#dragging-d3-drag), though you can certainly create [draggable force-directed graphs](http://bl.ocks.org/mbostock/ad70335eeef6d167bc36fd3c04378048)! Set *node*.fx and *node*.fy to fix a node’s position. As an alternative to a [Voronoi](#voronoi-d3-voronoi) SVG overlay, you can now use [*simulation*.find](https://github.com/d3/d3-force#simulation_find) to find the closest node to a pointer.

## [Number Formats (d3-format)](https://github.com/d3/d3-format/blob/master/README.md)

If a precision is not specified, the formatting behavior has changed: there is now a default precision of 6 for all directives except *none*, which defaults to 12. In 3.x, if you did not specify a precision, the number was formatted using its shortest unique representation (per [*number*.toString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toString)); this could lead to unexpected digits due to [floating point math](http://0.30000000000000004.com/). The new default precision in 4.0 produces more consistent results:

```js
var f = d3.format("e");
f(42);        // "4.200000e+1"
f(0.1 + 0.2); // "3.000000e-1"
```

To trim insignificant trailing zeroes, use the *none* directive, which is similar `g`. For example:

```js
var f = d3.format(".3");
f(0.12345);   // "0.123"
f(0.10000);   // "0.1"
f(0.1 + 0.2); // "0.3"
```

Under the hood, number formatting has improved accuracy with very large and very small numbers by using [*number*.toExponential](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toExponential) rather than [Math.log](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/log) to extract the mantissa and exponent. Negative zero (-0, an IEEE 754 construct) and very small numbers that round to zero are now formatted as unsigned zero. The inherently unsafe d3.round method has been removed, along with d3.requote.

The [d3.formatPrefix](https://github.com/d3/d3-format#formatPrefix) method has been changed. Rather than returning an SI-prefix string, it returns an SI-prefix format function for a given *specifier* and reference *value*. For example, to format thousands:

```js
var f = d3.formatPrefix(",.0", 1e3);
f(1e3); // "1k"
f(1e4); // "10k"
f(1e5); // "100k"
f(1e6); // "1,000k"
```

Unlike the `s` format directive, d3.formatPrefix always employs the same SI-prefix, producing consistent results:

```js
var f = d3.format(".0s");
f(1e3); // "1k"
f(1e4); // "10k"
f(1e5); // "100k"
f(1e6); // "1M"
```

The new `(` sign option uses parentheses for negative values. This is particularly useful in conjunction with `$`. For example:

```js
d3.format("+.0f")(-42);  // "-42"
d3.format("(.0f")(-42);  // "(42)"
d3.format("+$.0f")(-42); // "-$42"
d3.format("($.0f")(-42); // "($42)"
```

The new `=` align option places any sign and symbol to the left of any padding:

```js
d3.format(">6d")(-42);  // "   -42"
d3.format("=6d")(-42);  // "-   42"
d3.format(">(6d")(-42); // "  (42)"
d3.format("=(6d")(-42); // "(  42)"
```

The `b`, `o`, `d` and `x` directives now round to the nearest integer, rather than returning the empty string for non-integers:

```js
d3.format("b")(41.9); // "101010"
d3.format("o")(41.9); // "52"
d3.format("d")(41.9); // "42"
d3.format("x")(41.9); // "2a"
```

The `c` directive is now for character data (*i.e.*, literal strings), not for character codes. The is useful if you just want to apply padding and alignment and don’t care about formatting numbers. For example, the infamous [left-pad](http://blog.npmjs.org/post/141577284765/kik-left-pad-and-npm) (as well as center- and right-pad!) can be conveniently implemented as:

```js
d3.format(">10c")("foo"); // "       foo"
d3.format("^10c")("foo"); // "   foo    "
d3.format("<10c")("foo"); // "foo       "
```

There are several new methods for computing suggested decimal precisions; these are used by [d3-scale](#scales-d3-scale) for tick formatting, and are helpful for implementing custom number formats: [d3.precisionFixed](https://github.com/d3/d3-format#precisionFixed), [d3.precisionPrefix](https://github.com/d3/d3-format#precisionPrefix) and [d3.precisionRound](https://github.com/d3/d3-format#precisionRound). There’s also a new [d3.formatSpecifier](https://github.com/d3/d3-format#formatSpecifier) method for parsing, validating and debugging format specifiers; it’s also good for deriving related format specifiers, such as when you want to substitute the precision automatically.

You can now set the default locale using [d3.formatDefaultLocale](https://github.com/d3/d3-format#formatDefaultLocale)! The locales are published as [JSON](https://github.com/d3/d3-request#json) to [NPM](https://npmcdn.com/d3-format/locale/).

## [Geographies (d3-geo)](https://github.com/d3/d3-geo/blob/master/README.md)

Pursuant to the great namespace flattening, various methods have new names:

* d3.geo.graticule ↦ [d3.geoGraticule](https://github.com/d3/d3-geo#geoGraticule)
* d3.geo.circle ↦ [d3.geoCircle](https://github.com/d3/d3-geo#geoCircle)
* d3.geo.area ↦ [d3.geoArea](https://github.com/d3/d3-geo#geoArea)
* d3.geo.bounds ↦ [d3.geoBounds](https://github.com/d3/d3-geo#geoBounds)
* d3.geo.centroid ↦ [d3.geoCentroid](https://github.com/d3/d3-geo#geoCentroid)
* d3.geo.distance ↦ [d3.geoDistance](https://github.com/d3/d3-geo#geoDistance)
* d3.geo.interpolate ↦ [d3.geoInterpolate](https://github.com/d3/d3-geo#geoInterpolate)
* d3.geo.length ↦ [d3.geoLength](https://github.com/d3/d3-geo#geoLength)
* d3.geo.rotation ↦ [d3.geoRotation](https://github.com/d3/d3-geo#geoRotation)
* d3.geo.stream ↦ [d3.geoStream](https://github.com/d3/d3-geo#geoStream)
* d3.geo.path ↦ [d3.geoPath](https://github.com/d3/d3-geo#geoPath)
* d3.geo.projection ↦ [d3.geoProjection](https://github.com/d3/d3-geo#geoProjection)
* d3.geo.projectionMutator ↦ [d3.geoProjectionMutator](https://github.com/d3/d3-geo#geoProjectionMutator)
* d3.geo.albers ↦ [d3.geoAlbers](https://github.com/d3/d3-geo#geoAlbers)
* d3.geo.albersUsa ↦ [d3.geoAlbersUsa](https://github.com/d3/d3-geo#geoAlbersUsa)
* d3.geo.azimuthalEqualArea ↦ [d3.geoAzimuthalEqualArea](https://github.com/d3/d3-geo#geoAzimuthalEqualArea)
* d3.geo.azimuthalEquidistant ↦ [d3.geoAzimuthalEquidistant](https://github.com/d3/d3-geo#geoAzimuthalEquidistant)
* d3.geo.conicConformal ↦ [d3.geoConicConformal](https://github.com/d3/d3-geo#geoConicConformal)
* d3.geo.conicEqualArea ↦ [d3.geoConicEqualArea](https://github.com/d3/d3-geo#geoConicEqualArea)
* d3.geo.conicEquidistant ↦ [d3.geoConicEquidistant](https://github.com/d3/d3-geo#geoConicEquidistant)
* d3.geo.equirectangular ↦ [d3.geoEquirectangular](https://github.com/d3/d3-geo#geoEquirectangular)
* d3.geo.gnomonic ↦ [d3.geoGnomonic](https://github.com/d3/d3-geo#geoGnomonic)
* d3.geo.mercator ↦ [d3.geoMercator](https://github.com/d3/d3-geo#geoMercator)
* d3.geo.orthographic ↦ [d3.geoOrthographic](https://github.com/d3/d3-geo#geoOrthographic)
* d3.geo.stereographic ↦ [d3.geoStereographic](https://github.com/d3/d3-geo#geoStereographic)
* d3.geo.transverseMercator ↦ [d3.geoTransverseMercator](https://github.com/d3/d3-geo#geoTransverseMercator)

Also renamed for consistency:

* *circle*.origin ↦ [*circle*.center](https://github.com/d3/d3-geo#circle_center)
* *circle*.angle ↦ [*circle*.radius](https://github.com/d3/d3-geo#circle_radius)
* *graticule*.majorExtent ↦ [*graticule*.extentMajor](https://github.com/d3/d3-geo#graticule_extentMajor)
* *graticule*.minorExtent ↦ [*graticule*.extentMinor](https://github.com/d3/d3-geo#graticule_extentMinor)
* *graticule*.majorStep ↦ [*graticule*.stepMajor](https://github.com/d3/d3-geo#graticule_stepMajor)
* *graticule*.minorStep ↦ [*graticule*.stepMinor](https://github.com/d3/d3-geo#graticule_stepMinor)

Projections now have more appropriate defaults. For example, [d3.geoOrthographic](https://github.com/d3/d3-geo#geoOrthographic) has a 90° clip angle by default, showing only the front hemisphere, and [d3.geoGnomonic](https://github.com/d3/d3-geo#geoGnomonic) has a default 60° clip angle. The default [projection](https://github.com/d3/d3-geo#path_projection) for [d3.geoPath](https://github.com/d3/d3-geo#geoPath) is now null rather than [d3.geoAlbersUsa](https://github.com/d3/d3-geo#geoAlbersUsa); a null projection is used with [pre-projected geometry](http://bl.ocks.org/mbostock/5557726) and is typically faster to render.

“Fallback projections”—when you pass a function rather than a projection to [*path*.projection](https://github.com/d3/d3-geo#path_projection)—are no longer supported. For geographic projections, use [d3.geoProjection](https://github.com/d3/d3-geo#geoProjection) or [d3.geoProjectionMutator](https://github.com/d3/d3-geo#geoProjectionMutator) to define a custom projection. For arbitrary geometry transformations, implement the [stream interface](https://github.com/d3/d3-geo#streams); see also [d3.geoTransform](https://github.com/d3/d3-geo#geoTransform). The “raw” projections (e.g., d3.geo.equirectangular.raw) are no longer exported.

## [Hierarchies (d3-hierarchy)](https://github.com/d3/d3-hierarchy/blob/master/README.md)

Pursuant to the great namespace flattening:

* d3.layout.cluster ↦ [d3.cluster](https://github.com/d3/d3-hierarchy#cluster)
* d3.layout.hierarchy ↦ [d3.hierarchy](https://github.com/d3/d3-hierarchy#hierarchy)
* d3.layout.pack ↦ [d3.pack](https://github.com/d3/d3-hierarchy#pack)
* d3.layout.partition ↦ [d3.partition](https://github.com/d3/d3-hierarchy#partition)
* d3.layout.tree ↦ [d3.tree](https://github.com/d3/d3-hierarchy#tree)
* d3.layout.treemap ↦ [d3.treemap](https://github.com/d3/d3-hierarchy#treemap)

As an alternative to using JSON to represent hierarchical data (such as the “flare.json format” used by many D3 examples), the new [d3.stratify](https://github.com/d3/d3-hierarchy#stratify) operator simplifies the conversion of tabular data to hierarchical data! This is convenient if you already have data in a tabular format, such as the result of a SQL query or a CSV file:

```
name,parent
Eve,
Cain,Eve
Seth,Eve
Enos,Seth
Noam,Seth
Abel,Eve
Awan,Eve
Enoch,Awan
Azura,Eve
```

To convert this to a root [*node*](https://github.com/d3/d3-hierarchy#hierarchy):

```js
var root = d3.stratify()
    .id(function(d) { return d.name; })
    .parentId(function(d) { return d.parent; })
    (nodes);
```

The resulting *root* can be passed to [d3.tree](https://github.com/d3/d3-hierarchy#tree) to produce a tree diagram like this:

<img src="https://raw.githubusercontent.com/d3/d3/master/img/stratify.png" width="298" height="137">

Root nodes can also be created from JSON data using [d3.hierarchy](https://github.com/d3/d3-hierarchy#hierarchy). The hierarchy layouts now take these root nodes as input rather than operating directly on JSON data, which helps to provide a cleaner separation between the input data and the computed layout. (For example, use [*node*.copy](https://github.com/d3/d3-hierarchy#node_copy) to isolate layout changes.) It also simplifies the API: rather than each hierarchy layout needing to implement value and sorting accessors, there are now generic [*node*.sum](https://github.com/d3/d3-hierarchy#node_sum) and [*node*.sort](https://github.com/d3/d3-hierarchy#node_sort) methods that work with any hierarchy layout.

The new d3.hierarchy API also provides a richer set of methods for manipulating hierarchical data. For example, to generate an array of all nodes in topological order, use [*node*.descendants](https://github.com/d3/d3-hierarchy#node_descendants); for just leaf nodes, use [*node*.leaves](https://github.com/d3/d3-hierarchy#node_leaves). To highlight the ancestors of a given *node* on mouseover, use [*node*.ancestors](https://github.com/d3/d3-hierarchy#node_ancestors). To generate an array of {source, target} links for a given hierarchy, use [*node*.links](https://github.com/d3/d3-hierarchy#node_links); this replaces *treemap*.links and similar methods on the other layouts. The new [*node*.path](https://github.com/d3/d3-hierarchy#node_path) method replaces d3.layout.bundle; see also [d3.curveBundle](https://github.com/d3/d3-shape#curveBundle) for hierarchical edge bundling.

The hierarchy layouts have been rewritten using new, non-recursive traversal methods ([*node*.each](https://github.com/d3/d3-hierarchy#node_each), [*node*.eachAfter](https://github.com/d3/d3-hierarchy#node_eachAfter) and [*node*.eachBefore](https://github.com/d3/d3-hierarchy#node_eachBefore)), improving performance on large datasets. The d3.tree layout no longer uses a *node*.\_ field to store temporary state during layout.

Treemap tiling is now [extensible](https://github.com/d3/d3-hierarchy#treemap-tiling) via [*treemap*.tile](https://github.com/d3/d3-hierarchy#treemap_tile)! The default squarified tiling algorithm, [d3.treemapSquarify](https://github.com/d3/d3-hierarchy#treemapSquarify), has been completely rewritten, improving performance and fixing bugs in padding and rounding. The *treemap*.sticky method has been replaced with the [d3.treemapResquarify](https://github.com/d3/d3-hierarchy#treemapResquarify), which is identical to d3.treemapSquarify except it performs stable neighbor-preserving updates. The *treemap*.ratio method has been replaced with [*squarify*.ratio](https://github.com/d3/d3-hierarchy#squarify_ratio). And there’s a new [d3.treemapBinary](https://github.com/d3/d3-hierarchy#treemapBinary) for binary treemaps!

Treemap padding has also been improved. The treemap now distinguishes between [outer padding](https://github.com/d3/d3-hierarchy#treemap_paddingOuter) that separates a parent from its children, and [inner padding](https://github.com/d3/d3-hierarchy#treemap_paddingInner) that separates adjacent siblings. You can set the [top-](https://github.com/d3/d3-hierarchy#treemap_paddingTop), [right-](https://github.com/d3/d3-hierarchy#treemap_paddingRight), [bottom-](https://github.com/d3/d3-hierarchy#treemap_paddingBottom) and [left-](https://github.com/d3/d3-hierarchy#treemap_paddingLeft)outer padding separately. There are new examples for the traditional [nested treemap](http://bl.ocks.org/mbostock/911ad09bdead40ec0061) and for Lü and Fogarty’s [cascaded treemap](http://bl.ocks.org/mbostock/f85ffb3a5ac518598043). And there’s a new example demonstrating [d3.nest with d3.treemap](http://bl.ocks.org/mbostock/2838bf53e0e65f369f476afd653663a2).

The space-filling layouts [d3.treemap](https://github.com/d3/d3-hierarchy#treemap) and [d3.partition](https://github.com/d3/d3-hierarchy#partition) now output *x0*, *x1*, *y0*, *y1* on each node instead of *x0*, *dx*, *y0*, *dy*. This improves accuracy by ensuring that the edges of adjacent cells are exactly equal, rather than sometimes being slightly off due to floating point math. The partition layout now supports [rounding](https://github.com/d3/d3-hierarchy#partition_round) and [padding](https://github.com/d3/d3-hierarchy#partition_padding).

The circle-packing layout, [d3.pack](https://github.com/d3/d3-hierarchy#pack), has been completely rewritten to better implement Wang et al.’s algorithm, fixing major bugs and improving results! Welzl’s algorithm is now used to compute the exact [smallest enclosing circle](https://bl.ocks.org/mbostock/29c534ff0b270054a01c) for each parent, rather than the approximate answer used by Wang et al. The 3.x output is shown on the left; 4.0 is shown on the right:

<img alt="Circle Packing in 3.x" src="https://raw.githubusercontent.com/d3/d3/master/img/pack-v3.png" width="420" height="420"> <img alt="Circle Packing in 4.0" src="https://raw.githubusercontent.com/d3/d3/master/img/pack-v4.png" width="420" height="420">

A non-hierarchical implementation is also available as [d3.packSiblings](https://github.com/d3/d3-hierarchy#packSiblings), and the smallest enclosing circle implementation is available as [d3.packEnclose](https://github.com/d3/d3-hierarchy#packEnclose). [Pack padding](https://github.com/d3/d3-hierarchy#pack_padding) now applies between a parent and its children, as well as between adjacent siblings. In addition, you can now specify padding as a function that is computed dynamically for each parent.

## [Interpolators (d3-interpolate)](https://github.com/d3/d3-interpolate/blob/master/README.md)

The [d3.interpolate](https://github.com/d3/d3-interpolate#interpolate) method no longer delegates to d3.interpolators, which has been removed; its behavior is now defined by the library. It is now slightly faster in the common case that *b* is a number. It only uses [d3.interpolateRgb](https://github.com/d3/d3-interpolate#interpolateRgb) if *b* is a valid CSS color specifier (and not approximately one). And if the end value *b* is null, undefined, true or false, d3.interpolate now returns a constant function which always returns *b*.

The behavior of [d3.interpolateObject](https://github.com/d3/d3-interpolate#interpolateObject) and [d3.interpolateArray](https://github.com/d3/d3-interpolate#interpolateArray) has changed slightly with respect to properties or elements in the start value *a* that do not exist in the end value *b*: these properties and elements are now ignored, such that the ending value of the interpolator at *t* = 1 is now precisely equal to *b*. So, in 3.x:

```js
d3.interpolateObject({foo: 2, bar: 1}, {foo: 3})(0.5); // {bar: 1, foo: 2.5} in 3.x
```

Whereas in 4.0, *a*.bar is ignored:

```js
d3.interpolateObject({foo: 2, bar: 1}, {foo: 3})(0.5); // {foo: 2.5} in 4.0
```

If *a* or *b* are undefined or not an object, they are now implicitly converted to the empty object or empty array as appropriate, rather than throwing a TypeError.

The d3.interpolateTransform interpolator has been renamed to [d3.interpolateTransformSvg](https://github.com/d3/d3-interpolate#interpolateTransformSvg), and there is a new [d3.interpolateTransformCss](https://github.com/d3/d3-interpolate#interpolateTransformCss) to interpolate CSS transforms! This allows [d3-transition](#transitions-d3-transition) to automatically interpolate both the SVG [transform attribute](https://www.w3.org/TR/SVG/coords.html#TransformAttribute) and the CSS [transform style property](https://www.w3.org/TR/css-transforms-1/#transform-property). (Note, however, that only 2D CSS transforms are supported.) The d3.transform method has been removed.

Color space interpolators now interpolate opacity (see [d3-color](#colors-d3-color)) and return rgb(…) or rgba(…) CSS color specifier strings rather than using the RGB hexadecimal format. This is necessary to support opacity interpolation, but is also beneficial because it matches CSS computed values. When a channel in the start color *a* is undefined, color interpolators now use the corresponding channel value from the end color *b*, or *vice versa*. This logic previously applied to some channels (such as saturation in HSL), but now applies to all channels in all color spaces, and is especially useful when interpolating to or from transparent.

There are now “long” versions of cylindrical color space interpolators: [d3.interpolateHslLong](https://github.com/d3/d3-interpolate#interpolateHslLong), [d3.interpolateHclLong](https://github.com/d3/d3-interpolate#interpolateHclLong) and [d3.interpolateCubehelixLong](https://github.com/d3/d3-interpolate#interpolateCubehelixLong). These interpolators use linear interpolation of hue, rather than using the shortest path around the 360° hue circle. See [d3.interpolateRainbow](https://github.com/d3/d3-scale#interpolateRainbow) for an example. The Cubehelix color space is now supported by [d3-color](#colors-d3-color), and so there are now [d3.interpolateCubehelix](https://github.com/d3/d3-interpolate#interpolateCubehelix) and [d3.interpolateCubehelixLong](https://github.com/d3/d3-interpolate#interpolateCubehelixLong) interpolators.

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

There’s no longer a d3.geom.polygon constructor; instead you just pass an array of vertices to the polygon methods. So instead of *polygon*.area and *polygon*.centroid, there’s [d3.polygonArea](https://github.com/d3/d3-polygon#polygonArea) and [d3.polygonCentroid](https://github.com/d3/d3-polygon#polygonCentroid). There are also new [d3.polygonContains](https://github.com/d3/d3-polygon#polygonContains) and [d3.polygonLength](https://github.com/d3/d3-polygon#polygonLength) methods. There’s no longer an equivalent to *polygon*.clip, but if [Sutherland–Hodgman clipping](https://en.wikipedia.org/wiki/Sutherland–Hodgman_algorithm) is needed, please [file a feature request](https://github.com/d3/d3-polygon/issues).

The d3.geom.hull operator has been simplified: instead of an operator with *hull*.x and *hull*.y accessors, there’s just the [d3.polygonHull](https://github.com/d3/d3-polygon#polygonHull) method which takes an array of points and returns the convex hull.

## [Quadtrees (d3-quadtree)](https://github.com/d3/d3-quadtree/blob/master/README.md)

The d3.geom.quadtree method has been replaced by [d3.quadtree](https://github.com/d3/d3-quadtree#quadtree). 4.0 removes the concept of quadtree “generators” (configurable functions that build a quadtree from an array of data); there are now just quadtrees, which you can create via d3.quadtree and add data to via [*quadtree*.add](https://github.com/d3/d3-quadtree#quadtree_add) and [*quadtree*.addAll](https://github.com/d3/d3-quadtree#quadtree_addAll). This code in 3.x:

```js
var quadtree = d3.geom.quadtree()
    .extent([[0, 0], [width, height]])
    (data);
```

Can be rewritten in 4.0 as:

```js
var quadtree = d3.quadtree()
    .extent([[0, 0], [width, height]])
    .addAll(data);
```

The new quadtree implementation is vastly improved! It is no longer recursive, avoiding stack overflows when there are large numbers of coincident points. The internal storage is now more efficient, and the implementation is also faster; constructing a quadtree of 1M normally-distributed points takes about one second in 4.0, as compared to three seconds in 3.x.

The change in [internal *node* structure](https://github.com/d3/d3-quadtree#nodes) affects [*quadtree*.visit](https://github.com/d3/d3-quadtree#quadtree_visit): use *node*.length to distinguish leaf nodes from internal nodes. For example, to iterate over all data in a quadtree:

```js
quadtree.visit(function(node) {
  if (!node.length) {
    do {
      console.log(node.data);
    } while (node = node.next)
  }
});
```

There’s a new [*quadtree*.visitAfter](https://github.com/d3/d3-quadtree#quadtree_visitAfter) method for visiting nodes in post-order traversal. This feature is used in [d3-force](#forces-d3-force) to implement the [Barnes–Hut approximation](https://en.wikipedia.org/wiki/Barnes–Hut_simulation).

You can now remove data from a quadtree using [*quadtree*.remove](https://github.com/d3/d3-quadtree#quadtree_remove) and [*quadtree*.removeAll](https://github.com/d3/d3-quadtree#quadtree_removeAll). When adding data to a quadtree, the quadtree will now expand its extent by repeated doubling if the new point is outside the existing extent of the quadtree. There are also [*quadtree*.extent](https://github.com/d3/d3-quadtree#quadtree_extent) and [*quadtree*.cover](https://github.com/d3/d3-quadtree#quadtree_cover) methods for explicitly expanding the extent of the quadtree after creation.

Quadtrees support several new utility methods: [*quadtree*.copy](https://github.com/d3/d3-quadtree#quadtree_copy) returns a copy of the quadtree sharing the same data; [*quadtree*.data](https://github.com/d3/d3-quadtree#quadtree_data) generates an array of all data in the quadtree; [*quadtree*.size](https://github.com/d3/d3-quadtree#quadtree_size) returns the number of data points in the quadtree; and [*quadtree*.root](https://github.com/d3/d3-quadtree#quadtree_root) returns the root node, which is useful for manual traversal of the quadtree. The [*quadtree*.find](https://github.com/d3/d3-quadtree#quadtree_find) method now takes an optional search radius, which is useful for pointer-based selection in [force-directed graphs](http://bl.ocks.org/mbostock/ad70335eeef6d167bc36fd3c04378048).

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

The d3.xhr method has been renamed to [d3.request](https://github.com/d3/d3-request#request). Basic authentication is now supported using [*request*.user](https://github.com/d3/d3-request#request_user) and [*request*.password](https://github.com/d3/d3-request#request_password). You can now configure a timeout using [*request*.timeout](https://github.com/d3/d3-request#request_timeout).

If an error occurs, the corresponding [ProgressEvent](https://xhr.spec.whatwg.org/#interface-progressevent) of type “error” is now passed to the error listener, rather than the [XMLHttpRequest](https://xhr.spec.whatwg.org/#interface-xmlhttprequest). Likewise, the ProgressEvent is passed to progress event listeners, rather than using [d3.event](https://github.com/d3/d3-selection#event). If [d3.xml](https://github.com/d3/d3-request#xml) encounters an error parsing XML, this error is now reported to error listeners rather than returning a null response.

The [d3.request](https://github.com/d3/d3-request#request), [d3.text](https://github.com/d3/d3-request#text) and [d3.xml](https://github.com/d3/d3-request#xml) methods no longer take an optional mime type as the second argument; use [*request*.mimeType](https://github.com/d3/d3-request#request_mimeType) instead. For example:

```js
d3.xml("file.svg").mimeType("image/svg+xml").get(function(error, svg) {
  …
});
```

With the exception of [d3.html](https://github.com/d3/d3-request#html) and [d3.xml](https://github.com/d3/d3-request#xml), Node is now supported via [node-XMLHttpRequest](https://github.com/driverdan/node-XMLHttpRequest).

## [Scales (d3-scale)](https://github.com/d3/d3-scale/blob/master/README.md)

Pursuant to the great namespace flattening:

* d3.scale.linear ↦ [d3.scaleLinear](https://github.com/d3/d3-scale#scaleLinear)
* d3.scale.sqrt ↦ [d3.scaleSqrt](https://github.com/d3/d3-scale#scaleSqrt)
* d3.scale.pow ↦ [d3.scalePow](https://github.com/d3/d3-scale#scalePow)
* d3.scale.log ↦ [d3.scaleLog](https://github.com/d3/d3-scale#scaleLog)
* d3.scale.quantize ↦ [d3.scaleQuantize](https://github.com/d3/d3-scale#scaleQuantize)
* d3.scale.threshold ↦ [d3.scaleThreshold](https://github.com/d3/d3-scale#scaleThreshold)
* d3.scale.quantile ↦ [d3.scaleQuantile](https://github.com/d3/d3-scale#scaleQuantile)
* d3.scale.identity ↦ [d3.scaleIdentity](https://github.com/d3/d3-scale#scaleIdentity)
* d3.scale.ordinal ↦ [d3.scaleOrdinal](https://github.com/d3/d3-scale#scaleOrdinal)
* d3.time.scale ↦ [d3.scaleTime](https://github.com/d3/d3-scale#scaleTime)
* d3.time.scale.utc ↦ [d3.scaleUtc](https://github.com/d3/d3-scale#scaleUtc)

Scales now generate ticks in the same order as the domain: if you have a descending domain, you now get descending ticks. This change affects the order of tick elements generated by [axes](#axes-d3-axis). For example:

```js
d3.scaleLinear().domain([10, 0]).ticks(5); // [10, 8, 6, 4, 2, 0]
```

[Log tick formatting](https://github.com/d3/d3-scale#log_tickFormat) now assumes a default *count* of ten, not Infinity, if not specified. Log scales with  domains that span many powers (such as from 1e+3 to 1e+29) now return only one [tick](https://github.com/d3/d3-scale#log_ticks) per power rather than returning *base* ticks per power. Non-linear quantitative scales are slightly more accurate.

You can now control whether an ordinal scale’s domain is implicitly extended when the scale is passed a value that is not already in its domain. By default, [*ordinal*.unknown](https://github.com/d3/d3-scale#ordinal_unknown) is [d3.scaleImplicit](https://github.com/d3/d3-scale#scaleImplicit), causing unknown values to be added to the domain:

```js
var x = d3.scaleOrdinal()
    .domain([0, 1])
    .range(["red", "green", "blue"]);

x.domain(); // [0, 1]
x(2); // "blue"
x.domain(); // [0, 1, 2]
```

By setting *ordinal*.unknown, you instead define the output value for unknown inputs. This is particularly useful for choropleth maps where you want to assign a color to missing data.

```js
var x = d3.scaleOrdinal()
    .domain([0, 1])
    .range(["red", "green", "blue"])
    .unknown(undefined);

x.domain(); // [0, 1]
x(2); // undefined
x.domain(); // [0, 1]
```

The *ordinal*.rangeBands and *ordinal*.rangeRoundBands methods have been replaced with a new subclass of ordinal scale: [band scales](https://github.com/d3/d3-scale#band-scales). The following code in 3.x:

```js
var x = d3.scaleOrdinal()
    .domain(["a", "b", "c"])
    .rangeBands([0, width]);
```

Is equivalent to this in 4.0:

```js
var x = d3.scaleBand()
    .domain(["a", "b", "c"])
    .range([0, width]);
```

The new [*band*.padding](https://github.com/d3/d3-scale#band_padding), [*band*.paddingInner](https://github.com/d3/d3-scale#band_paddingInner) and [*band*.paddingOuter](https://github.com/d3/d3-scale#band_paddingOuter) methods replace the optional arguments to *ordinal*.rangeBands. The new [*band*.bandwidth](https://github.com/d3/d3-scale#band_bandwidth) and [*band*.step](https://github.com/d3/d3-scale#band_step) methods replace *ordinal*.rangeBand. There’s also a new [*band*.align](https://github.com/d3/d3-scale#band_align) method which you can use to control how the extra space outside the bands is distributed, say to shift columns closer to the *y*-axis.

Similarly, the *ordinal*.rangePoints and *ordinal*.rangeRoundPoints methods have been replaced with a new subclass of ordinal scale: [point scales](https://github.com/d3/d3-scale#point-scales). The following code in 3.x:

```js
var x = d3.scaleOrdinal()
    .domain(["a", "b", "c"])
    .rangePoints([0, width]);
```

Is equivalent to this in 4.0:

```js
var x = d3.scalePoint()
    .domain(["a", "b", "c"])
    .range([0, width]);
```

The new [*point*.padding](https://github.com/d3/d3-scale#point_padding) method replaces the optional *padding* argument to *ordinal*.rangePoints. Like *ordinal*.rangeBand with *ordinal*.rangePoints, the [*point*.bandwidth](https://github.com/d3/d3-scale#point_bandwidth) method always returns zero; a new [*point*.step](https://github.com/d3/d3-scale#point_step) method returns the interval between adjacent points.

The [ordinal scale constructor](https://github.com/d3/d3-scale#ordinal-scales) now takes an optional *range* for a shorter alternative to [*ordinal*.range](https://github.com/d3/d3-scale#ordinal_range). This is especially useful now that the categorical color scales have been changed to simple arrays of colors rather than specialized ordinal scale constructors:

* d3.scale.category10 ↦ [d3.schemeCategory10](https://github.com/d3/d3-scale#schemeCategory10)
* d3.scale.category20 ↦ [d3.schemeCategory20](https://github.com/d3/d3-scale#schemeCategory20)
* d3.scale.category20b ↦ [d3.schemeCategory20b](https://github.com/d3/d3-scale#schemeCategory20b)
* d3.scale.category20c ↦ [d3.schemeCategory20c](https://github.com/d3/d3-scale#schemeCategory20c)

The following code in 3.x:

```js
var color = d3.scaleCategory10();
```

Is equivalent to this in 4.0:

```js
var color = d3.scaleOrdinal(d3.schemeCategory10);
```

[Sequential scales](https://github.com/d3/d3-scale#scaleSequential), are a new class of scales with a fixed output [interpolator](https://github.com/d3/d3-scale#sequential_interpolator) instead of a [range](https://github.com/d3/d3-scale#continuous_range). Typically these scales are used to implement continuous sequential or diverging color schemes. Inspired by Matplotlib’s new [perceptually-motived colormaps](https://bids.github.io/colormap/), 4.0 now features [viridis](https://github.com/d3/d3-scale#interpolateViridis), [inferno](https://github.com/d3/d3-scale#interpolateInferno), [magma](https://github.com/d3/d3-scale#interpolateMagma), [plasma](https://github.com/d3/d3-scale#interpolatePlasma) interpolators for use with sequential scales. Using [d3.quantize](https://github.com/d3/d3-interpolate#quantize), these interpolators can also be applied to [quantile](https://github.com/d3/d3-scale#quantile-scales), [quantize](https://github.com/d3/d3-scale#quantize-scales) and [threshold](https://github.com/d3/d3-scale#threshold-scales) scales.

[<img src="https://raw.githubusercontent.com/d3/d3-scale/master/img/viridis.png" width="100%" height="40" alt="viridis">](https://github.com/d3/d3-scale#interpolateViridis)
[<img src="https://raw.githubusercontent.com/d3/d3-scale/master/img/inferno.png" width="100%" height="40" alt="inferno">](https://github.com/d3/d3-scale#interpolateInferno)
[<img src="https://raw.githubusercontent.com/d3/d3-scale/master/img/magma.png" width="100%" height="40" alt="magma">](https://github.com/d3/d3-scale#interpolateMagma)
[<img src="https://raw.githubusercontent.com/d3/d3-scale/master/img/plasma.png" width="100%" height="40" alt="plasma">](https://github.com/d3/d3-scale#interpolatePlasma)

4.0 also ships new Cubehelix schemes, including [Dave Green’s default](https://github.com/d3/d3-scale#interpolateCubehelixDefault) and a [cyclical rainbow](https://github.com/d3/d3-scale#interpolateRainbow) inspired by [Matteo Niccoli](https://mycarta.wordpress.com/2013/02/21/perceptual-rainbow-palette-the-method/):

[<img src="https://raw.githubusercontent.com/d3/d3-scale/master/img/cubehelix.png" width="100%" height="40" alt="cubehelix">](https://github.com/d3/d3-scale#interpolateCubehelixDefault)
[<img src="https://raw.githubusercontent.com/d3/d3-scale/master/img/rainbow.png" width="100%" height="40" alt="rainbow">](https://github.com/d3/d3-scale#interpolateRainbow)
[<img src="https://raw.githubusercontent.com/d3/d3-scale/master/img/warm.png" width="100%" height="40" alt="warm">](https://github.com/d3/d3-scale#interpolateWarm)
[<img src="https://raw.githubusercontent.com/d3/d3-scale/master/img/cool.png" width="100%" height="40" alt="cool">](https://github.com/d3/d3-scale#interpolateCool)

For even more sequential and categorical color schemes, see [d3-scale-chromatic](https://github.com/d3/d3-scale-chromatic).

For an introduction to scales, see [Introducing d3-scale](https://medium.com/@mbostock/introducing-d3-scale-61980c51545f).

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

This change is discussed further in [What Makes Software Good](https://medium.com/@mbostock/what-makes-software-good-943557f8a488).

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

There is now only one class of selection. 3.x implemented enter selections using a special class with different behavior for *enter*.append and *enter*.select; a consequence of this design was that enter selections in 3.x lacked [certain methods](https://github.com/d3/d3/issues/2043). In 4.0, enter selections are simply normal selections; they have the same methods and the same behavior. Placeholder [enter nodes](https://github.com/d3/d3-selection/blob/master/src/selection/enter.js) now implement [*node*.appendChild](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild), [*node*.insertBefore](https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore), [*node*.querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector), and [*node*.querySelectorAll](https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelectorAll).

The [*selection*.data](https://github.com/d3/d3-selection#selection_data) method has been changed slightly with respect to duplicate keys. In 3.x, if multiple data had the same key, the duplicate data would be ignored and not included in enter, update or exit; in 4.0 the duplicate data is always put in the enter selection. In both 3.x and 4.0, if multiple elements have the same key, the duplicate elements are put in the exit selection. Thus, 4.0’s behavior is now symmetric for enter and exit, and the general update pattern will now produce a DOM that matches the data even if there are duplicate keys.

Selections have several new methods! Use [*selection*.raise](https://github.com/d3/d3-selection#selection_raise) to move the selected elements to the front of their siblings, so that they are drawn on top; use [*selection*.lower](https://github.com/d3/d3-selection#selection_lower) to move them to the back. Use [*selection*.dispatch](https://github.com/d3/d3-selection#selection_dispatch) to dispatch a [custom event](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) to event listeners.

When called in getter mode, [*selection*.data](https://github.com/d3/d3-selection#selection_data) now returns the data for all elements in the selection, rather than just the data for the first group of elements. The [*selection*.call](https://github.com/d3/d3-selection#selection_call) method no longer sets the `this` context when invoking the specified function; the *selection* is passed as the first argument to the function, so use that. The [*selection*.on](https://github.com/d3/d3-selection#selection_on) method now accepts multiple whitespace-separated typenames, so you can add or remove multiple listeners simultaneously. For example:

```js
selection.on("mousedown touchstart", function() {
  console.log(d3.event.type);
});
```

The arguments passed to callback functions has changed slightly in 4.0 to be more consistent. The standard arguments are the element’s datum (*d*), the element’s index (*i*), and the element’s group (*nodes*), with *this* as the element. The slight exception to this convention is *selection*.data, which is evaluated for each group rather than each element; it is passed the group’s parent datum (*d*), the group index (*i*), and the selection’s parents (*parents*), with *this* as the group’s parent.

The new [d3.local](https://github.com/d3/d3-selection#local-variables) provides a mechanism for defining [local variables](http://bl.ocks.org/mbostock/e1192fe405703d8321a5187350910e08): state that is bound to DOM elements, and available to any descendant element. This can be a convenient alternative to using [*selection*.each](https://github.com/d3/d3-selection#selection_each) or storing local state in data.

The d3.ns.prefix namespace prefix map has been renamed to [d3.namespaces](https://github.com/d3/d3-selection#namespaces), and the d3.ns.qualify method has been renamed to [d3.namespace](https://github.com/d3/d3-selection#namespace). Several new low-level methods are now available, as well. [d3.matcher](https://github.com/d3/d3-selection#matcher) is used internally by [*selection*.filter](https://github.com/d3/d3-selection#selection_filter); [d3.selector](https://github.com/d3/d3-selection#selector) is used by [*selection*.select](https://github.com/d3/d3-selection#selection_select); [d3.selectorAll](https://github.com/d3/d3-selection#selectorAll) is used by [*selection*.selectAll](https://github.com/d3/d3-selection#selection_selectAll); [d3.creator](https://github.com/d3/d3-selection#creator) is used by [*selection*.append](https://github.com/d3/d3-selection#selection_append) and [*selection*.insert](https://github.com/d3/d3-selection#selection_insert). The new [d3.window](https://github.com/d3/d3-selection#window) returns the owner window for a given element, window or document. The new [d3.customEvent](https://github.com/d3/d3-selection#customEvent) temporarily sets [d3.event](https://github.com/d3/d3-selection#event) while invoking a function, allowing you to implement controls which dispatch custom events; this is used by [d3-drag](https://github.com/d3/d3-drag), [d3-zoom](https://github.com/d3/d3-zoom) and [d3-brush](https://github.com/d3/d3-brush).

For the sake of parsimony, the multi-value methods—where you pass an object to set multiple attributes, styles or properties simultaneously—have been extracted to [d3-selection-multi](https://github.com/d3/d3-selection-multi) and are no longer part of the default bundle. The multi-value map methods have also been renamed to plural form to reduce overload: [*selection*.attrs](https://github.com/d3/d3-selection-multi#selection_attrs), [*selection*.styles](https://github.com/d3/d3-selection-multi#selection_styles) and [*selection*.properties](https://github.com/d3/d3-selection-multi#selection_properties).

## [Shapes (d3-shape)](https://github.com/d3/d3-shape/blob/master/README.md)

Pursuant to the great namespace flattening:

* d3.svg.line ↦ [d3.line](https://github.com/d3/d3-shape#lines)
* d3.svg.line.radial ↦ [d3.radialLine](https://github.com/d3/d3-shape#radialLine)
* d3.svg.area ↦ [d3.area](https://github.com/d3/d3-shape#areas)
* d3.svg.area.radial ↦ [d3.radialArea](https://github.com/d3/d3-shape#radialArea)
* d3.svg.arc ↦ [d3.arc](https://github.com/d3/d3-shape#arcs)
* d3.svg.symbol ↦ [d3.symbol](https://github.com/d3/d3-shape#symbols)
* d3.svg.symbolTypes ↦ [d3.symbolTypes](https://github.com/d3/d3-shape#symbolTypes)
* d3.layout.pie ↦ [d3.pie](https://github.com/d3/d3-shape#pies)
* d3.layout.stack ↦ [d3.stack](https://github.com/d3/d3-shape#stacks)
* d3.svg.diagonal ↦ REMOVED (see [d3/d3-shape#27](https://github.com/d3/d3-shape/issues/27))
* d3.svg.diagonal.radial ↦ REMOVED

Shapes are no longer limited to SVG; they can now render to Canvas! Shape generators now support an optional *context*: given a [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D), you can render a shape as a canvas path to be filled or stroked. For example, a [canvas pie chart](https://bl.ocks.org/mbostock/8878e7fd82034f1d63cf) might use an arc generator:

```js
var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0)
    .context(context);
```

To render an arc for a given datum *d*:

```js
context.beginPath();
arc(d);
context.fill();
```

See [*line*.context](https://github.com/d3/d3-shape#line_context), [*area*.context](https://github.com/d3/d3-shape#area_context) and [*arc*.context](https://github.com/d3/d3-shape#arc_context) for more. Under the hood, shapes use [d3-path](#paths-d3-path) to serialize canvas path methods to SVG path data when the context is null; thus, shapes are optimized for rendering to canvas. You can also now derive lines from areas. The line shares most of the same accessors, such as [*line*.defined](https://github.com/d3/d3-shape#line_defined) and [*line*.curve](https://github.com/d3/d3-shape#line_curve), with the area from which it is derived. For example, to render the topline of an area, use [*area*.lineY1](https://github.com/d3/d3-shape#area_lineY1); for the baseline, use [*area*.lineY0](https://github.com/d3/d3-shape#area_lineY0).

4.0 introduces a new curve API for specifying how line and area shapes interpolate between data points. The *line*.interpolate and *area*.interpolate methods have been replaced with [*line*.curve](https://github.com/d3/d3-shape#line_curve) and [*area*.curve](https://github.com/d3/d3-shape#area_curve). Curves are implemented using the [curve interface](https://github.com/d3/d3-shape#custom-curves) rather than as a function that returns an SVG path data string; this allows curves to render to either SVG or Canvas. In addition, *line*.curve and *area*.curve now take a function which instantiates a curve for a given *context*, rather than a string. The full list of equivalents:

* linear ↦ [d3.curveLinear](https://github.com/d3/d3-shape#curveLinear)
* linear-closed ↦ [d3.curveLinearClosed](https://github.com/d3/d3-shape#curveLinearClosed)
* step ↦ [d3.curveStep](https://github.com/d3/d3-shape#curveStep)
* step-before ↦ [d3.curveStepBefore](https://github.com/d3/d3-shape#curveStepBefore)
* step-after ↦ [d3.curveStepAfter](https://github.com/d3/d3-shape#curveStepAfter)
* basis ↦ [d3.curveBasis](https://github.com/d3/d3-shape#curveBasis)
* basis-open ↦ [d3.curveBasisOpen](https://github.com/d3/d3-shape#curveBasisOpen)
* basis-closed ↦ [d3.curveBasisClosed](https://github.com/d3/d3-shape#curveBasisClosed)
* bundle ↦ [d3.curveBundle](https://github.com/d3/d3-shape#curveBundle)
* cardinal ↦ [d3.curveCardinal](https://github.com/d3/d3-shape#curveCardinal)
* cardinal-open ↦ [d3.curveCardinalOpen](https://github.com/d3/d3-shape#curveCardinalOpen)
* cardinal-closed ↦ [d3.curveCardinalClosed](https://github.com/d3/d3-shape#curveCardinalClosed)
* monotone ↦ [d3.curveMonotoneX](https://github.com/d3/d3-shape#curveMonotoneX)

But that’s not all! 4.0 now provides parameterized Catmull–Rom splines as proposed by [Yuksel *et al.*](http://www.cemyuksel.com/research/catmullrom_param/). These are available as [d3.curveCatmullRom](https://github.com/d3/d3-shape#curveCatmullRom), [d3.curveCatmullRomClosed](https://github.com/d3/d3-shape#curveCatmullRomClosed) and [d3.curveCatmullRomOpen](https://github.com/d3/d3-shape#curveCatmullRomOpen).

<img src="https://raw.githubusercontent.com/d3/d3-shape/master/img/catmullRom.png" width="888" height="240" alt="catmullRom">
<img src="https://raw.githubusercontent.com/d3/d3-shape/master/img/catmullRomOpen.png" width="888" height="240" alt="catmullRomOpen">
<img src="https://raw.githubusercontent.com/d3/d3-shape/master/img/catmullRomClosed.png" width="888" height="330" alt="catmullRomClosed">

Each curve type can define its own named parameters, replacing *line*.tension and *area*.tension. For example, Catmull–Rom splines are parameterized using [*catmullRom*.alpha](https://github.com/d3/d3-shape#curveCatmullRom_alpha) and defaults to 0.5, which corresponds to a centripetal spline that avoids self-intersections and overshoot. For a uniform Catmull–Rom spline instead:

```js
var line = d3.line()
    .curve(d3.curveCatmullRom.alpha(0));
```

4.0 fixes the interpretation of the cardinal spline *tension* parameter, which is now specified as [*cardinal*.tension](https://github.com/d3/d3-shape#curveCardinal_tension) and defaults to zero for a uniform Catmull–Rom spline; a tension of one produces a linear curve. The first and last segments of basis and cardinal curves have also been fixed! The undocumented *interpolate*.reverse field has been removed. Curves can define different behavior for toplines and baselines by counting the sequence of [*curve*.lineStart](https://github.com/d3/d3-shape#curve_lineStart) within [*curve*.areaStart](https://github.com/d3/d3-shape#curve_areaStart). See the [d3.curveStep implementation](https://github.com/d3/d3-shape/blob/master/src/curve/step.js) for an example.

4.0 fixes numerous bugs in the monotone curve implementation, and introduces [d3.curveMonotoneY](https://github.com/d3/d3-shape#curveMonotoneY); this is like d3.curveMonotoneX, except it requires that the input points are monotone in *y* rather than *x*, such as for a vertically-oriented line chart. The new [d3.curveNatural](https://github.com/d3/d3-shape#curveNatural) produces a [natural cubic spline](http://mathworld.wolfram.com/CubicSpline.html). The default [β](https://github.com/d3/d3-shape#bundle_beta) for [d3.curveBundle](https://github.com/d3/d3-shape#curveBundle) is now 0.85, rather than 0.7, matching the values used by [Holten](https://www.win.tue.nl/vis1/home/dholten/papers/bundles_infovis.pdf). 4.0 also has a more robust implementation of arc padding; see [*arc*.padAngle](https://github.com/d3/d3-shape#arc_padAngle) and [*arc*.padRadius](https://github.com/d3/d3-shape#arc_padRadius).

4.0 introduces a new symbol type API. Symbol types are passed to [*symbol*.type](https://github.com/d3/d3-shape#symbol_type) in place of strings. The equivalents are:

* circle ↦ [d3.symbolCircle](https://github.com/d3/d3-shape#symbolCircle)
* cross ↦ [d3.symbolCross](https://github.com/d3/d3-shape#symbolCross)
* diamond ↦ [d3.symbolDiamond](https://github.com/d3/d3-shape#symbolDiamond)
* square ↦ [d3.symbolSquare](https://github.com/d3/d3-shape#symbolSquare)
* triangle-down ↦ REMOVED
* triangle-up ↦ [d3.symbolTriangle](https://github.com/d3/d3-shape#symbolTriangle)
* ADDED ↦ [d3.symbolStar](https://github.com/d3/d3-shape#symbolStar)
* ADDED ↦ [d3.symbolWye](https://github.com/d3/d3-shape#symbolWye)

The full set of symbol types is now:

<a href="#symbolCircle"><img src="https://raw.githubusercontent.com/d3/d3-shape/master/img/circle.png" width="100" height="100"></a><a href="#symbolCross"><img src="https://raw.githubusercontent.com/d3/d3-shape/master/img/cross.png" width="100" height="100"></a><a href="#symbolDiamond"><img src="https://raw.githubusercontent.com/d3/d3-shape/master/img/diamond.png" width="100" height="100"></a><a href="#symbolSquare"><img src="https://raw.githubusercontent.com/d3/d3-shape/master/img/square.png" width="100" height="100"></a><a href="#symbolStar"><img src="https://raw.githubusercontent.com/d3/d3-shape/master/img/star.png" width="100" height="100"></a><a href="#symbolTriangle"><img src="https://raw.githubusercontent.com/d3/d3-shape/master/img/triangle.png" width="100" height="100"><a href="#symbolWye"><img src="https://raw.githubusercontent.com/d3/d3-shape/master/img/wye.png" width="100" height="100"></a>

Lastly, 4.0 overhauls the stack layout API, replacing d3.layout.stack with [d3.stack](https://github.com/d3/d3-shape#stacks). The stack generator no longer needs an *x*-accessor. In addition, the API has been simplified: the *stack* generator now accepts tabular input, such as this array of objects:

```js
var data = [
  {month: new Date(2015, 0, 1), apples: 3840, bananas: 1920, cherries: 960, dates: 400},
  {month: new Date(2015, 1, 1), apples: 1600, bananas: 1440, cherries: 960, dates: 400},
  {month: new Date(2015, 2, 1), apples:  640, bananas:  960, cherries: 640, dates: 400},
  {month: new Date(2015, 3, 1), apples:  320, bananas:  480, cherries: 640, dates: 400}
];
```

To generate the stack layout, first define a stack generator, and then apply it to the data:

```js
var stack = d3.stack()
    .keys(["apples", "bananas", "cherries", "dates"])
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetNone);

var series = stack(data);
```

The resulting array has one element per *series*. Each series has one point per month, and each point has a lower and upper value defining the baseline and topline:

```js
[
  [[   0, 3840], [   0, 1600], [   0,  640], [   0,  320]], // apples
  [[3840, 5760], [1600, 3040], [ 640, 1600], [ 320,  800]], // bananas
  [[5760, 6720], [3040, 4000], [1600, 2240], [ 800, 1440]], // cherries
  [[6720, 7120], [4000, 4400], [2240, 2640], [1440, 1840]], // dates
]
```

Each series in then typically passed to an [area generator](https://github.com/d3/d3-shape#areas) to render an area chart, or used to construct rectangles for a bar chart. Stack generators no longer modify the input data, so *stack*.out has been removed.

For an introduction to shapes, see [Introducing d3-shape](https://medium.com/@mbostock/introducing-d3-shape-73f8367e6d12).

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

The default U.S. English locale now uses 12-hour time and a more concise representation of the date. This aligns with local convention and is consistent with [*date*.toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString) in Chrome, Firefox and Node:

```js
var now = new Date;
d3.timeFormat("%c")(new Date); // "6/23/2016, 2:01:33 PM"
d3.timeFormat("%x")(new Date); // "6/23/2016"
d3.timeFormat("%X")(new Date); // "2:01:38 PM"
```

You can now set the default locale using [d3.timeFormatDefaultLocale](https://github.com/d3/d3-time-format#timeFormatDefaultLocale)! The locales are published as [JSON](https://github.com/d3/d3-request#json) to [NPM](https://npmcdn.com/d3-time-format/locale/).

The performance of time formatting and parsing has been improved, and the UTC formatter and parser have a cleaner implementation (that avoids temporarily overriding the Date global).

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

4.0 also introduces a new [*timer*.restart](https://github.com/d3/d3-timer#timer_restart) method for restarting timers, for replacing the callback of a running timer, or for changing its delay or reference time. Unlike *timer*.stop followed by [d3.timer](https://github.com/d3/d3-timer#timer), *timer*.restart maintains the invocation priority of an existing timer: it guarantees that the order of invocation of active timers remains the same. The d3.timer.flush method has been renamed to [d3.timerFlush](https://github.com/d3/d3-timer#timerFlush).

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

## [Transitions (d3-transition)](https://github.com/d3/d3-transition/blob/master/README.md)

The [*selection*.transition](https://github.com/d3/d3-transition#selection_transition) method now takes an optional *transition* instance which can be used to synchronize a new transition with an existing transition. (This change is discussed further in [What Makes Software Good?](https://medium.com/@mbostock/what-makes-software-good-943557f8a488)) For example:

```js
var t = d3.transition()
    .duration(750)
    .ease(d3.easeLinear);

d3.selectAll(".apple").transition(t)
    .style("fill", "red");

d3.selectAll(".orange").transition(t)
    .style("fill", "orange");
```

Transitions created this way inherit timing from the closest ancestor element, and thus are synchronized even when the referenced *transition* has variable timing such as a staggered delay. This method replaces the deeply magical behavior of *transition*.each in 3.x; in 4.0, [*transition*.each](https://github.com/d3/d3-transition#transition_each) is identical to [*selection*.each](https://github.com/d3/d3-selection#selection_each). Use the new [*transition*.on](https://github.com/d3/d3-transition#transition_on) method to listen to transition events.

The meaning of [*transition*.delay](https://github.com/d3/d3-transition#transition_delay) has changed for chained transitions created by [*transition*.transition](https://github.com/d3/d3-transition#transition_transition). The specified delay is now relative to the *previous* transition in the chain, rather than the *first* transition in the chain; this makes it easier to insert interstitial pauses. For example:

```js
d3.selectAll(".apple")
  .transition() // First fade to green.
    .style("fill", "green")
  .transition() // Then red.
    .style("fill", "red")
  .transition() // Wait one second. Then brown, and remove.
    .delay(1000)
    .style("fill", "brown")
    .remove();
```

Time is now frozen in the background; see [d3-timer](#timers-d3-timer) for more information. While it was previously the case that transitions did not run in the background, now they pick up where they left off when the page returns to the foreground. This avoids page hangs by not scheduling an unbounded number of transitions in the background. If you want to schedule an infinitely-repeating transition, use transition events, or use [d3.timeout](https://github.com/d3/d3-timer#timeout) and [d3.interval](https://github.com/d3/d3-timer#interval) in place of [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setTimeout) and [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval).

The [*selection*.interrupt](https://github.com/d3/d3-transition#selection_interrupt) method now cancels all scheduled transitions on the selected elements, in addition to interrupting any active transition. When transitions are interrupted, any resources associated with the transition are now released immediately, rather than waiting until the transition starts, improving performance. (See also [*timer*.stop](https://github.com/d3/d3-timer#timer_stop).) The new [d3.interrupt](https://github.com/d3/d3-transition#interrupt) method is an alternative to [*selection*.interrupt](https://github.com/d3/d3-transition#selection_interrupt) for quickly interrupting a single node.

The new [d3.active](https://github.com/d3/d3-transition#active) method allows you to select the currently-active transition on a given *node*, if any. This is useful for modifying in-progress transitions and for scheduling infinitely-repeating transitions. For example, this transition continuously oscillates between red and blue:

```js
d3.select("circle")
  .transition()
    .on("start", function repeat() {
        d3.active(this)
            .style("fill", "red")
          .transition()
            .style("fill", "blue")
          .transition()
            .on("start", repeat);
      });
```

The [life cycle of a transition](https://github.com/d3/d3-transition#the-life-of-a-transition) is now more formally defined and enforced. For example, attempting to change the duration of a running transition now throws an error rather than silently failing. The [*transition*.remove](https://github.com/d3/d3-transition#transition_remove) method has been fixed if multiple transition names are in use: the element is only removed if it has no scheduled transitions, regardless of name. The [*transition*.ease](https://github.com/d3/d3-transition#transition_ease) method now always takes an [easing function](#easings-d3-ease), not a string. When a transition ends, the tweens are invoked one last time with *t* equal to exactly 1, regardless of the associated easing function.

As with [selections](#selections-d3-selection) in 4.0, all transition callback functions now receive the standard arguments: the element’s datum (*d*), the element’s index (*i*), and the element’s group (*nodes*), with *this* as the element. This notably affects [*transition*.attrTween](https://github.com/d3/d3-transition#transition_attrTween) and [*transition*.styleTween](https://github.com/d3/d3-transition#transition_styleTween), which no longer pass the *tween* function the current attribute or style value as the third argument. The *transition*.attrTween and *transition*.styleTween methods can now be called in getter modes for debugging or to share tween definitions between transitions.

Homogenous transitions are now optimized! If all elements in a transition share the same tween, interpolator, or event listeners, this state is now shared across the transition rather than separately allocated for each element. 4.0 also uses an optimized default interpolator in place of [d3.interpolate](https://github.com/d3/d3-interpolate#interpolate) for [*transition*.attr](https://github.com/d3/d3-transition#transition_attr) and [*transition*.style](https://github.com/d3/d3-transition#transition_style). And transitions can now interpolate both [CSS](https://github.com/d3/d3-interpolate#interpolateTransformCss) and [SVG](https://github.com/d3/d3-interpolate#interpolateTransformSvg) transforms.

For reusable components that support transitions, such as [axes](#axes-d3-axis), a new [*transition*.selection](https://github.com/d3/d3-transition#transition_selection) method returns the [selection](#selections-d3-selection) that corresponds to a given transition. There is also a new [*transition*.merge](https://github.com/d3/d3-transition#transition_merge) method that is equivalent to [*selection*.merge](https://github.com/d3/d3-selection#selection_merge).

For the sake of parsimony, the multi-value map methods have been extracted to [d3-selection-multi](https://github.com/d3/d3-selection-multi) and are no longer part of the default bundle. The multi-value map methods have also been renamed to plural form to reduce overload: [*transition*.attrs](https://github.com/d3/d3-selection-multi#transition_attrs) and [*transition*.styles](https://github.com/d3/d3-selection-multi#transition_styles).

## [Voronoi Diagrams (d3-voronoi)](https://github.com/d3/d3-voronoi/blob/master/README.md)

The d3.geom.voronoi method has been renamed to [d3.voronoi](https://github.com/d3/d3-voronoi#voronoi), and the *voronoi*.clipExtent method has been renamed to [*voronoi*.extent](https://github.com/d3/d3-voronoi#voronoi_extent). The undocumented *polygon*.point property in 3.x, which is the element in the input *data* corresponding to the polygon, has been renamed to *polygon*.data.

Calling [*voronoi*](https://github.com/d3/d3-voronoi#_voronoi) now returns the full [Voronoi diagram](https://github.com/d3/d3-voronoi#voronoi-diagrams), which includes topological information: each Voronoi edge exposes *edge*.left and *edge*.right specifying the sites on either side of the edge, and each Voronoi cell is defined as an array of these edges and a corresponding site. The Voronoi diagram can be used to efficiently compute both the Voronoi and Delaunay tessellations for a set of points: [*diagram*.polygons](https://github.com/d3/d3-voronoi#diagram_polygons), [*diagram*.links](https://github.com/d3/d3-voronoi#diagram_links), and [*diagram*.triangles](https://github.com/d3/d3-voronoi#diagram_triangles). The new topology is also useful in conjunction with TopoJSON; see the [Voronoi topology example](http://bl.ocks.org/mbostock/cd52a201d7694eb9d890).

The [*voronoi*.polygons](https://github.com/d3/d3-voronoi#voronoi_polygons) and [*diagram*.polygons](https://github.com/d3/d3-voronoi#diagram_polygons) now require an [extent](https://github.com/d3/d3-voronoi#voronoi_extent); there is no longer an implicit extent of ±1e6. The [*voronoi*.links](https://github.com/d3/d3-voronoi#voronoi_links), [*voronoi*.triangles](https://github.com/d3/d3-voronoi#voronoi_triangles), [*diagram*.links](https://github.com/d3/d3-voronoi#diagram_links) and [*diagram*.triangles](https://github.com/d3/d3-voronoi#diagram_triangles) are now affected by the clip extent: as the Delaunay is computed as the dual of the Voronoi, two sites are only linked if the clipped cells are touching. To compute the Delaunay triangulation without respect to clipping, set the extent to null.

The Voronoi generator finally has well-defined behavior for coincident vertices: the first of a set of coincident points has a defined cell, while the subsequent duplicate points have null cells. The returned array of polygons is sparse, so by using *array*.forEach or *array*.map, you can easily skip undefined cells. The Voronoi generator also now correctly handles the case where no cell edges intersect the extent.

## [Zooming (d3-zoom)](https://github.com/d3/d3-zoom/blob/master/README.md)

The zoom behavior d3.behavior.zoom has been renamed to d3.zoom. Zoom behaviors no longer store the active zoom transform (*i.e.*, the visible region; the scale and translate) internally. The zoom transform is now stored on any elements to which the zoom behavior has been applied. The zoom transform is available as *event*.transform within a zoom event or by calling [d3.zoomTransform](https://github.com/d3/d3-zoom#zoomTransform) on a given *element*. To zoom programmatically, use [*zoom*.transform](https://github.com/d3/d3-zoom#zoom_transform) with a given [selection](#selections-d3-selection) or [transition](#transitions-d3-transition); see the [zoom transitions example](http://bl.ocks.org/mbostock/b783fbb2e673561d214e09c7fb5cedee). The *zoom*.event method has been removed.

To make programmatic zooming easier, there are several new convenience methods on top of *zoom*.transform: [*zoom*.translateBy](https://github.com/d3/d3-zoom#zoom_translateBy), [*zoom*.scaleBy](https://github.com/d3/d3-zoom#zoom_scaleBy) and [*zoom*.scaleTo](https://github.com/d3/d3-zoom#zoom_scaleTo). There is also a new API for describing [zoom transforms](https://github.com/d3/d3-zoom#zoom-transforms). Zoom behaviors are no longer dependent on [scales](#scales-d3-scale), but you can use [*transform*.rescaleX](https://github.com/d3/d3-zoom#transform_rescaleX), [*transform*.rescaleY](https://github.com/d3/d3-zoom#transform_rescaleY), [*transform*.invertX](https://github.com/d3/d3-zoom#transform_invertX) or [*transform*.invertY](https://github.com/d3/d3-zoom#transform_invertY) to transform a scale’s domain. 3.x’s *event*.scale is replaced with *event*.transform.k, and *event*.translate is replaced with *event*.transform.x and *event*.transform.y. The *zoom*.center method has been removed in favor of programmatic zooming.

The zoom behavior finally supports simple constraints on panning! The new [*zoom*.translateExtent](https://github.com/d3/d3-zoom#zoom_translateExtent) lets you define the viewable extent of the world: the currently-visible extent (the extent of the viewport, as defined by [*zoom*.extent](https://github.com/d3/d3-zoom#zoom_extent)) is always contained within the translate extent. The *zoom*.size method has been replaced by *zoom*.extent, and the default behavior is now smarter: it defaults to the extent of the zoom behavior’s owner element, rather than being hardcoded to 960×500. (This also improves the default path chosen during smooth zoom transitions!)

The zoom behavior’s interaction has also improved. It now correctly handles concurrent wheeling and dragging, as well as concurrent touching and mousing. The zoom behavior now ignores wheel events at the limits of its scale extent, allowing you to scroll past a zoomable area. The *zoomstart* and *zoomend* events have been renamed *start* and *end*. By default, zoom behaviors now ignore right-clicks intended for the context menu; use [*zoom*.filter](https://github.com/d3/d3-zoom#zoom_filter) to control which events are ignored. The zoom behavior also ignores emulated mouse events on iOS. The zoom behavior now consumes handled events, making it easier to combine with other interactive behaviors such as [dragging](#dragging-d3-drag).
