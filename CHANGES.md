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
* [Geographic Projections](#geographic-projections-d3-geo)
* [Extended Geographic Projections](#geographic-projections-d3-geo-projection)
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
<script>

d3.select("body")
  .append("p")
    .text("Hello, world!");

</script>
```

But you don’t have to use the default bundle. Custom bundles are useful for applications that use a subset of D3’s features; for example, a React charting library might use D3’s scales and shapes, but use React instead of selections to manipulate the DOM. Or if you’re just using [d3-selection](https://github.com/d3/d3-selection), it’s only 5KB instead of 64KB for the default bundle. You can load D3 microlibraries using vanilla script tags or RequireJS (great for HTTP/2!):

```html
<script src="https://d3js.org/d3-selection.v0.8.min.js"></script>
<script>

d3.select("body")
  .append("p")
    .text("Hello, world!");

</script>
```

You can also `cat` D3 microlibraries into a custom bundle, or use tools such as [Webpack](https://webpack.github.io/) or [Rollup](http://rollupjs.org/) to create [optimized bundles](https://bl.ocks.org/mbostock/bb09af4c39c79cffcde4). The D3 microlibraries are written as [ES6 modules](http://www.2ality.com/2014/09/es6-modules-final.html), and Rollup lets you pick at the symbol level to produce the smallest bundles!

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

D3 4.0 provides default styles and shorter syntax. In place of d3.svg.axis and *axis*.orient, D3 4.0 now provides four constructors for each orientation: [d3.axisTop](https://github.com/d3/d3-axis#axisTop), [d3.axisRight](https://github.com/d3/d3-axis#axisRight), [d3.axisBottom](https://github.com/d3/d3-axis#axisBottom), [d3.axisLeft](https://github.com/d3/d3-axis#axisLeft). You can now pass a scale directly to the axis constructor. So you can reduce all of the above to:

```html
<script>

d3.select(".axis")
    .call(d3.axisBottom(x));

</script>
```

And get this:

<img src="https://raw.githubusercontent.com/d3/d3/master/img/axis-v4.png" width="100%" height="105">

You can still override the styles either through CSS or by modifying the axis elements. The new default axis appearance also offsets the axis by a half-pixel to fix a crisp-edges rendering issue on Safari where the axis would be drawn two-pixels thick.

There’s now an [*axis*.tickArguments](https://github.com/d3/d3-axis#axis_tickArguments) method, as an alternative to [*axis*.ticks](https://github.com/d3/d3-axis#axis_ticks) that also allows the axis tick arguments to be inspect. The [*axis*.tickSize](https://github.com/d3/d3-axis#axis_tickSize) method has been changed to only allow a single argument when setting the tick size; use [*axis*.tickSizeInner](https://github.com/d3/d3-axis#axis_tickSizeInner) or [*axis*.tickSizeOuter](https://github.com/d3/d3-axis#axis_tickSizeOuter) to set the inner and outer tick size separately.

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
  {yield: 29.86667, variety: "Peatland",         year: 1931, site: "Morris"},
  {yield: 36.03333, variety: "Peatland",         year: 1932, site: "Waseca"},
  {yield: 34.46667, variety: "Wisconsin No. 38", year: 1931, site: "Grand Rapids"}
];

var sites = d3.set(yields, function(d) { return d.site; }); // Grand Rapids, Duluth, Waseca, Crookston, Morris
```

The d3.map constructor also follows the standard array accessor argument pattern.

The *map*.forEach and *set*.forEach methods have been renamed to [*map*.each](https://github.com/d3/d3-collection#map_each) and [*set*.each](https://github.com/d3/d3-collection#set_each) respectively. The order of arguments for *map*.each has also been changed to *value*, *key* and *map*, while the order of arguments for *set*.each is now *value*, *value* and *set*. This is closer to ES6 [*map*.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach) and [*set*.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/forEach). Also like ES6 Map and Set, *map*.set and *set*.add now return the current collection (rather than the added value) to facilitate method chaining. New [*map*.clear](https://github.com/d3/d3-collection#map_clear) and [*set*.clear](https://github.com/d3/d3-collection#set_clear) methods can be used to empty collections.

The [*nest*.map](https://github.com/d3/d3-collection#nest_map) method now always returns a d3.map instance. For a plain object, use [*nest*.object](https://github.com/d3/d3-collection#nest_object) instead. When used in conjunction with [*nest*.rollup](https://github.com/d3/d3-collection#nest_rollup), [*nest*.entries](https://github.com/d3/d3-collection#nest_entries) now returns {key, value} objects for the leaf entries, instead of {key, values}.

## [Colors (d3-color)](https://github.com/d3/d3-color/blob/master/README.md)

TODO

* all colors now have opacity
* can now parse rgba(…) and hsla(…) CSS color strings
* more robust parsing; for example, you can no longer mix integers and percentages in rgb(…), trims
* d3.color(…) now returns a color instance in the appropriate color space, or null! (matches getComputedStyle)
* *color*.toString now returns rgb(…) or rgba(…), not hexadecimal
* explicitly track which channels are undefined, e.g., black has undefined saturation, transparent
* related improvements in color interpolation!
* d3.rgb now lazily quantizes channel values, improving accuracy in color space conversion
* *rgb*.brighter no longer special-cases black
* the color space constructors, such as d3.rgb, now always return a copy
* removed *rgb*.hsl
* add *color*.displayable
* d3.cubehelix is now built-in
* you can define your own color spaces; see [d3-hsv](https://github.com/d3/d3-hsv) for example

## [Dispatches (d3-dispatch)](https://github.com/d3/d3-dispatch/blob/master/README.md)

TODO

* *dispatch*.*type*.call(…) ↦ *dispatch*.call(*type*, …)
* *dispatch*.*type*.apply(…) ↦ *dispatch*.apply(*type*, …)
* *dispatch*.on now accepts multiple typenames (like the new *selection*.on)
* add *dispatch*.copy, useful for copy-on-rwrite semantics
* fewer closures; better performance
* better error detection (invalid callbacks, illegal types)

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

TODO

* *dsv*.parse now exposes column names as *data*.columns; available to row conversion functions
* *dsv*.format now takes an optional array of column names, useful for filtering and ordering columns
* *dsv*.format coerces input values to strings, fixing a crash in a pathological case like this:

```js
d3.tsvFormat([{foo: {toString: function() { return "\"foo\""; }}}]);
```

* d3.csv.parse ↦ d3.csvParse
* d3.csv.parseRows ↦ d3.csvParseRows
* d3.csv.format ↦ d3.csvFormat
* d3.csv.formatRows ↦ d3.csvFormatRows
* d3.tsv.parse ↦ d3.tsvParse
* d3.tsv.parseRows ↦ d3.tsvParseRows
* d3.tsv.format ↦ d3.tsvFormat
* d3.tsv.formatRows ↦ d3.tsvFormatRows
* d3.dsv(*delimiter*) ↦ d3.dsvFormat(*delimiter*)

* removed deprecated support for *dsv*.format(rows); use *dsv*.formatRows instead.
* improved performance

## [Easings (d3-ease)](https://github.com/d3/d3-ease/blob/master/README.md)

TODO

symbols instead of strings:

* d3.ease("linear-in") ↦ d3.easeLinearIn
* d3.ease("poly-in") ↦ d3.easePolyIn
* d3.ease("quad-in") ↦ d3.easeQuadIn
* d3.ease("cubic-in") ↦ d3.easeCubicIn
* d3.ease("sin-in") ↦ d3.easeSinIn
* d3.ease("exp-in") ↦ d3.easeExpIn
* d3.ease("circle-in") ↦ d3.easeCircleIn
* d3.ease("elastic-in") ↦ d3.easeElasticIn
* d3.ease("back-in") ↦ d3.easeBackIn
* d3.ease("bounce-in") ↦ d3.easeBounceIn

applies to the various modes (-in, -out, -in-out), too, e.g.:

* d3.ease("cubic-in") -> d3.easeCubicIn
* d3.ease("cubic-out") -> d3.easeCubicOut
* d3.ease("cubic-in-out") -> d3.easeCubicInOut

sensible defaults if no mode, instead of always -in:

* d3.easeQuad ↦ d3.easeQuadInOut
* d3.easeCubic ↦ d3.easeCubicInOut
* d3.easePoly ↦ d3.easePolyInOut
* d3.easeSin ↦ d3.easeSinInOut
* d3.easeExp ↦ d3.easeExpInOut
* d3.easeCircle ↦ d3.easeCircleInOut
* d3.easeBounce ↦ d3.easeBounceOut
* d3.easeBack ↦ d3.easeBackInOut
* d3.easeElastic ↦ d3.easeElasticOut

fix confusion around elastic, bounce and back easing:

* “elastic-out” ↦ d3.easeElasticIn
* “elastic-in” ↦ d3.easeElasticOut
* “elastic-out-in” ↦ d3.easeElasticInOut
* “bounce-out” ↦ d3.easeBounceIn
* “bounce-in” ↦ d3.easeBounceOut
* “bounce-out-in” ↦ d3.easeBounceInOut
* remove “-out-in” easing mode
* fix default overshoot parameter for backInOut
* fix period parameter interpretation for elasticInOut

named optional parameters:

* d3.ease("poly", *k*) ↦ d3.easePoly.exponent(*k*)
* d3.ease("elastic", *a*, *p*) ↦ d3.easeElastic.amplitude(*a*).period(*p*)
* d3.ease("back", *s*) ↦ d3.easeBack.overshoot(*s*)

other improvements:

* optimizations (fewer closures, more inlining)
* better accuracy
* remove implicit clamping
* a [visual reference](https://github.com/d3/d3-ease/blob/master/README.md)
* an [animated reference](http://bl.ocks.org/mbostock/248bac3b8e354a9103c4)

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

## [Geographic Projections (d3-geo)](https://github.com/d3/d3-geo/blob/master/README.md)

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

## [Extended Geographic Projections (d3-geo-projection)](https://github.com/d3/d3-geo-projection/blob/master/README.md)

TODO

This module is not yet implemented in D3 4.0, but I’m working on it.

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
* see d3.curveBundle in d3-shape for hierarchical edge bundling

## [Interpolators (d3-interpolate)](https://github.com/d3/d3-interpolate/blob/master/README.md)

TODO

d3.interpolate’s behavior is now faster and more precisely defined. d3.interpolators ↦ REMOVED; d3.interpolate is no longer extensible.

* If *b* is null, undefined or type "boolean", use the constant *b*.
* If *b* is type "number", use d3.interpolateNumber.
* If *b* is a d3.color instance or type "string" and can be parsed by d3.color, use d3.interpolateRgb.
* If *b* is a string, use d3.interpolateString.
* If *b* is an array, use d3.interpolateArray.
* Use d3.interpolateObject.

new transform interpolation methods for CSS, as well as SVG. d3-transition automatically picks the right one…

* d3.transform ↦ REMOVED
* d3.interpolateTransform ↦ d3.interpolateTransformSvg
* new d3.interpolateTransformCss

b-spline interpolation

* add d3.quantize
* add d3.interpolateBasis
* add d3.interpolateBasisClosed
* add d3.interpolateRgbBasis
* add d3.interpolateRgbBasisClosed

color space interpolation

* color interpolation now observes opacity (see d3-color)!
* better behavior when either *a* or *b*’s color channel is undefined
* add “long” versions of interpolators for color spaces with hue angles
* Cubehelix (with optional gamma parameter) is now supported by default
* color interpolators now return rgb(…) or rgba(…) strings (matching *color*.toString)
* use named parameters, e.g., d3.interpolateCubehelixGamma ↦ d3.interpolateCubehelix.gamma
* new d3.interpolateRgb.gamma for gamma-corrected RGB interpolation

better object and array interpolation…

* when *b* has fewer properties or elements than *a*
* when *a* or *b* is undefined or not an object or array

## [Paths (d3-path)](https://github.com/d3/d3-path/blob/master/README.md)

TODO

This is a new repository that provides an implementation of the CanvasPathMethods API, allowing you to write code once that can render to either Canvas or SVG. It’s used by d3-shape and d3-chord.

## [Polygons (d3-polygon)](https://github.com/d3/d3-polygon/blob/master/README.md)

TODO

There’s no longer a d3.geom.polygon constructor; instead you just pass an array of vertices to the polygon methods.

* d3.geom.polygon.area ↦ d3.polygonArea
* d3.geom.polygon.centroid ↦ d3.polygonCentroid
* d3.geom.polygon.clip ↦ REMOVED
* added d3.polygonContains
* added d3.polygonLength

There’s no longer a fancy d3.geom.hull operator. There’s just a method which takes a polygon (an array of vertices):

* d3.geom.hull ↦ d3.polygonHull

## [Queues (d3-queue)](https://github.com/d3/d3-queue/blob/master/README.md)

TODO

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

## [Random Numbers (d3-random)](https://github.com/d3/d3-random/blob/master/README.md)

TODO

* d3.random.normal ↦ d3.randomNormal
* d3.random.logNormal ↦ d3.randomLogNormal
* d3.random.bates ↦ d3.randomBates
* d3.random.irwinHall ↦ d3.randomIrwinHall
* new d3.randomExponential
* new d3.randomUniform
* optimize d3.randomNormal and d3.randomLogNormal

## [Requests (d3-request)](https://github.com/d3/d3-request/blob/master/README.md)

TODO

* d3.xhr ↦ d3.request
* new *request*.user and *request*.password for basic authentication
* new *request*.timeout for changing the timeout duration
* on error, pass the error to the listener
* on progress, pass the progress event to the listener
* if d3.xml loads unparseable XML, report an error rather than a null document

## [Scales (d3-scale)](https://github.com/d3/d3-scale/blob/master/README.md)

TODO

* d3.scale.linear ↦ d3.scaleLinear
* d3.scale.sqrt ↦ d3.scaleSqrt
* d3.scale.pow ↦ d3.scalePow
* d3.scale.log ↦ d3.scaleLog
* d3.scale.quantize ↦ d3.scaleQuantize
* d3.scale.threshold ↦ d3.scaleThreshold
* d3.scale.quantile ↦ d3.scaleQuantile
* d3.scale.identity ↦ d3.scaleIdentity
* d3.scale.ordinal ↦ d3.scaleOrdinal
* d3.scale.category10 ↦ d3.schemeCategory10
* d3.scale.category20 ↦ d3.schemeCategory20
* d3.scale.category20b ↦ d3.schemeCategory20b
* d3.scale.category20c ↦ d3.schemeCategory20c
* d3.time.scale ↦ d3.scaleTime

Mention d3-scale-chromatic?

## [Selections (d3-selection)](https://github.com/d3/d3-selection/blob/master/README.md)

TODO

* no longer extends Array using prototype injection
* immutable; *selection*.data returns a new selection
* only one class of selection; entering nodes are placeholders
* *selection*.enter and *selection*.exit are empty by default (not error)
* *selection*.filter preserves index
* *selection*.append preserves relative order on entering nodes
* *enter*.append no longer merges into *update*; use *selection*.merge
* change how *selection*.data handles duplicate keys
* new d3.matcher, d3.selector, d3.creator
* multi-value map methods moved to d3-selection-multi plugin
* new *selection*.raise, *selection*.lower
* new *selection*.dispatch
* new *selection*.nodes
* new d3.local for local variables
* d3.ns.qualify ↦ d3.namespace
* d3.ns.prefix ↦ d3.namespaces

## [Shapes (d3-shape)](https://github.com/d3/d3-shape/blob/master/README.md)

TODO

* d3.svg.line ↦ d3.line
* d3.svg.line.radial ↦ d3.radialLine
* d3.svg.area ↦ d3.area
* d3.svg.area.radial ↦ d3.radialArea
* d3.svg.arc ↦ d3.arc
* d3.svg.symbol ↦ d3.symbol
* d3.svg.symbolTypes ↦ d3.symbolTypes
* d3.svg.diagonal ↦ REMOVED
* d3.svg.diagonal.radial ↦ REMOVED
* d3.layout.bundle ↦ d3.curveBundle
* d3.layout.stack ↦ d3.stack

## [Time Formats (d3-time-format)](https://github.com/d3/d3-time-format/blob/master/README.md)

TODO

* d3.time.format ↦ d3.timeFormat
* d3.time.format.multi ↦ REMOVED
* d3.time.format.utc ↦ d3.utcFormat
* d3.time.format.iso ↦ d3.isoFormat

## [Time Intervals (d3-time)](https://github.com/d3/d3-time/blob/master/README.md)

TODO

* d3.time.interval ↦ d3.timeInterval
* d3.time.day ↦ d3.timeDay
* d3.time.days ↦ d3.timeDays
* d3.time.dayOfYear ↦ d3.timeDay.count
* d3.time.hour ↦ d3.timeHour
* d3.time.hours ↦ d3.timeHours
* d3.time.minute ↦ d3.timeMinute
* d3.time.minutes ↦ d3.timeMinutes
* d3.time.month ↦ d3.timeMonth
* d3.time.months ↦ d3.timeMonths
* d3.time.second ↦ d3.timeSecond
* d3.time.seconds ↦ d3.timeSeconds
* d3.time.sunday ↦ d3.timeSunday
* d3.time.sundays ↦ d3.timeSundays
* d3.time.sundayOfYear ↦ d3.timeSunday.count
* d3.time.monday ↦ d3.timeMonday
* d3.time.mondays ↦ d3.timeMondays
* d3.time.mondayOfYear ↦ d3.timeMonday.count
* d3.time.tuesday ↦ d3.timeTuesday
* d3.time.tuesdays ↦ d3.timeTuesdays
* d3.time.tuesdayOfYear ↦ d3.timeTuesday.count
* d3.time.wednesday ↦ d3.timeWednesday
* d3.time.wednesdays ↦ d3.timeWednesdays
* d3.time.wednesdayOfYear ↦ d3.timeWednesday.count
* d3.time.thursday ↦ d3.timeThursday
* d3.time.thursdays ↦ d3.timeThursdays
* d3.time.thursdayOfYear ↦ d3.timeThursday.count
* d3.time.friday ↦ d3.timeFriday
* d3.time.fridays ↦ d3.timeFridays
* d3.time.fridayOfYear ↦ d3.timeFriday.count
* d3.time.saturday ↦ d3.timeSaturday
* d3.time.saturdays ↦ d3.timeSaturdays
* d3.time.saturdayOfYear ↦ d3.timeSaturday.count
* d3.time.week ↦ d3.timeWeek
* d3.time.weeks ↦ d3.timeWeeks
* d3.time.weekOfYear ↦ d3.timeWeek.count
* d3.time.year ↦ d3.timeYear
* d3.time.years ↦ d3.timeYears
* d3.time.day.utc ↦ d3.utcDay
* d3.time.days.utc ↦ d3.utcDays
* d3.time.dayOfYear.utc ↦ d3.utcDay.count
* d3.time.hour.utc ↦ d3.utcHour
* d3.time.hours.utc ↦ d3.utcHours
* d3.time.minute.utc ↦ d3.utcMinute
* d3.time.minutes.utc ↦ d3.utcMinutes
* d3.time.month.utc ↦ d3.utcMonth
* d3.time.months.utc ↦ d3.utcMonths
* d3.time.second.utc ↦ d3.utcSecond
* d3.time.seconds.utc ↦ d3.utcSeconds
* d3.time.sunday.utc ↦ d3.utcSunday
* d3.time.sundays.utc ↦ d3.utcSundays
* d3.time.sundayOfYear.utc ↦ d3.utcSunday.count
* d3.time.monday.utc ↦ d3.utcMonday
* d3.time.mondays.utc ↦ d3.utcMondays
* d3.time.mondayOfYear.utc ↦ d3.utcMonday.count
* d3.time.tuesday.utc ↦ d3.utcTuesday
* d3.time.tuesdays.utc ↦ d3.utcTuesdays
* d3.time.tuesdayOfYear.utc ↦ d3.utcTuesday.count
* d3.time.wednesday.utc ↦ d3.utcWednesday
* d3.time.wednesdays.utc ↦ d3.utcWednesdays
* d3.time.wednesdayOfYear.utc ↦ d3.utcWednesday.count
* d3.time.thursday.utc ↦ d3.utcThursday
* d3.time.thursdays.utc ↦ d3.utcThursdays
* d3.time.thursdayOfYear.utc ↦ d3.utcThursday.count
* d3.time.friday.utc ↦ d3.utcFriday
* d3.time.fridays.utc ↦ d3.utcFridays
* d3.time.fridayOfYear.utc ↦ d3.utcFriday.count
* d3.time.saturday.utc ↦ d3.utcSaturday
* d3.time.saturdays.utc ↦ d3.utcSaturdays
* d3.time.saturdayOfYear.utc ↦ d3.utcSaturday.count
* d3.time.week.utc ↦ d3.utcWeek
* d3.time.weeks.utc ↦ d3.utcWeeks
* d3.time.weekOfYear.utc ↦ d3.utcWeek.count
* d3.time.year.utc ↦ d3.utcYear
* d3.time.years.utc ↦ d3.utcYears

## [Timers (d3-timer)](https://github.com/d3/d3-timer/blob/master/README.md)

TODO

* *callback* returning true ↦ *timer*.stop; timers are now stopped synchronously
* new *timer*.restart
* time now freezes in the background, preventing hangs when returning to the foreground!
* new d3.now; timers now use high-precision timers (performance.now) where available
* d3.timer.flush ↦ d3.timerFlush
* new d3.timeout
* new d3.interval

## [Transitions (d3-transition)](https://github.com/d3/d3-transition/blob/master/README.md)

TODO

## [Voronoi Diagrams (d3-voronoi)](https://github.com/d3/d3-voronoi/blob/master/README.md)

TODO

* d3.geom.voronoi ↦ d3.voronoi

## [Zooming (d3-zoom)](https://github.com/d3/d3-zoom/blob/master/README.md)

TODO

* d3.behavior.zoom ↦ d3.zoom
