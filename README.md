# D3: Data-Driven Documents

This branch contains the prerelease of D3 4.0. This API is unstable and may change at any point prior to the release.

## Installing

If you use NPM, `npm install d3@4.0.0-alpha.1`. Otherwise, download the [latest release](https://github.com/mbostock/d3/releases/latest). The released bundle supports AMD, CommonJS, and vanilla environments. Create a custom build using [Rollup](https://github.com/rollup/rollup) or your preferred bundler. You can also load directly from [d3js.org](https://d3js.org):

```html
<script src="https://d3js.org/d3.v4.0.0-alpha.1.min.js"></script>
```

## API Reference

* [Arrays](#arrays) ([Statistics](#statistics), [Histograms](#histograms), [Search](#search), [Transformations](#transformations))
* [Collections](#collections) ([Objects](#objects), [Maps](#maps), [Sets](#sets), [Nests](#nests))
* [Colors](#colors)
* [Delimiter-Separated Values](#delimiter-separated-values)
* [Dispatches](#Dispatches)
* [Easings](#easing-functions)
* [Interpolators](#interpolators)
* [Number Formats](#number-formats)
* [Paths](#paths)
* [Random Numbers](#random-numbers)
* [Requests](#requests)
* [Scales](#scales) ([Continuous](#continuous), [Sequential](#sequential), [Quantize](#quantize), [Ordinal](#ordinal), [Categorical](#categorical))
* [Selections](#selections)
* [Shapes](#shapes) ([Arcs](#arcs), [Pies](#pies), [Lines](#lines), [Areas](#areas), [Curves](#curves), [Symbols](#symbols), [Stacks](#stacks))
* [Time Formats](#time-formats)
* [Time Intervals](#time-intervals)
* [Timers](#timers)

D3 uses [semantic versioning](http://semver.org/). The current version is exposed as d3.version.

## [Arrays](https://github.com/d3/d3-array)

Array manipulation, ordering, searching, summarizing, etc.

#### [Statistics](https://github.com/d3/d3-array#statistics)

Methods for computing basic summary statistics.

* [d3.min](https://github.com/d3/d3-array#min) - compute the minimum value in an array.
* [d3.max](https://github.com/d3/d3-array#max) - compute the maximum value in an array.
* [d3.extent](https://github.com/d3/d3-array#extent) - compute the minimum and maximum value in an array.
* [d3.sum](https://github.com/d3/d3-array#sum) - compute the sum of an array of numbers.
* [d3.mean](https://github.com/d3/d3-array#mean) - compute the arithmetic mean of an array of numbers.
* [d3.median](https://github.com/d3/d3-array#median) - compute the median of an array of numbers (the 0.5-quantile).
* [d3.quantile](https://github.com/d3/d3-array#quantile) - compute a quantile for a sorted array of numbers.
* [d3.variance](https://github.com/d3/d3-array#variance) - compute the variance of an array of numbers.
* [d3.deviation](https://github.com/d3/d3-array#deviation) - compute the standard deviation of an array of numbers.

#### [Histograms](https://github.com/d3/d3-array#histograms)

Bin discrete samples into continuous, non-overlapping intervals.

* [d3.histogram](https://github.com/d3/d3-array#histogram) - constructs a new histogram generator.
* [*histogram*](https://github.com/d3/d3-array#_histogram) - compute the histogram for the given array of samples.
* [*histogram*.value](https://github.com/d3/d3-array#histogram_value) - specify a value accessor for each sample.
* [*histogram*.domain](https://github.com/d3/d3-array#histogram_domain) - specify the interval of observable values.
* [*histogram*.thresholds](https://github.com/d3/d3-array#histogram_thresholds) - specify how values are divided into bins.
* [d3.thresholdFreedmanDiaconis](https://github.com/d3/d3-array#thresholdFreedmanDiaconis) - the Freedman–Diaconis binning rule.
* [d3.thresholdScott](https://github.com/d3/d3-array#thresholdScott) - Scott’s normal reference binning rule.
* [d3.thresholdSturges](https://github.com/d3/d3-array#thresholdSturges) - Sturge’s binning formula.

#### [Search](https://github.com/d3/d3-array#search)

Methods for searching arrays for a specific element.

* [d3.scan](https://github.com/d3/d3-array#scan) - linear search for an element using a comparator.
* [d3.bisect](https://github.com/d3/d3-array#bisect) - binary search for a value in a sorted array.
* [d3.bisectRight](https://github.com/d3/d3-array#bisectRight) - binary search for a value in a sorted array.
* [d3.bisectLeft](https://github.com/d3/d3-array#bisectLeft) - binary search for a value in a sorted array.
* [d3.bisector](https://github.com/d3/d3-array#bisector) - bisect using an accessor or comparator.
* [*bisector*.left](https://github.com/d3/d3-array#bisector_left) - bisectLeft, with the given comparator.
* [*bisector*.right](https://github.com/d3/d3-array#bisector_right) - bisectRight, with the given comparator.
* [d3.ascending](https://github.com/d3/d3-array#ascending) - compute the natural order of two values.
* [d3.descending](https://github.com/d3/d3-array#descending) - compute the natural order of two values.

#### [Transformations](https://github.com/d3/d3-array#transformations)

Methods for transforming arrays and for generating new arrays.

* [d3.merge](https://github.com/d3/d3-array#merge) - merge multiple arrays into one array.
* [d3.pairs](https://github.com/d3/d3-array#pairs) - returns an array of adjacent pairs of elements.
* [d3.permute](https://github.com/d3/d3-array#permute) - reorder an array of elements according to an array of indexes.
* [d3.shuffle](https://github.com/d3/d3-array#shuffle) - randomize the order of an array.
* [d3.ticks](https://github.com/d3/d3-array#ticks) - generate representative values from a numeric interval.
* [d3.tickStep](https://github.com/d3/d3-array#tickStep) - generate representative values from a numeric interval.
* [d3.range](https://github.com/d3/d3-array#range) - generate a range of numeric values.
* [d3.transpose](https://github.com/d3/d3-array#transpose) - transpose an array of arrays.
* [d3.zip](https://github.com/d3/d3-array#zip) - transpose a variable number of arrays.

## [Collections](https://github.com/d3/d3-array)

#### [Objects](https://github.com/d3/d3-array#objects)

Methods for converting associative arrays (objects) to arrays.

* [d3.keys](https://github.com/d3/d3-array#keys) - list the keys of an associative array.
* [d3.values](https://github.com/d3/d3-array#values) - list the values of an associated array.
* [d3.entries](https://github.com/d3/d3-array#entries) - list the key-value entries of an associative array.

#### [Maps](https://github.com/d3/d3-array#maps)

Like ES6 Map, but with string keys and a few other differences.

* [d3.map](https://github.com/d3/d3-array#map) - constructs a new, empty map.
* [*map*.has](https://github.com/d3/d3-array#map_has) - returns true if the map contains the given key.
* [*map*.get](https://github.com/d3/d3-array#map_get) - returns the value for the given key.
* [*map*.set](https://github.com/d3/d3-array#map_set) - sets the value for the given key.
* [*map*.remove](https://github.com/d3/d3-array#map_remove) - removes the entry for given key.
* [*map*.clear](https://github.com/d3/d3-array#map_clear) - removes all entries.
* [*map*.keys](https://github.com/d3/d3-array#map_keys) - returns the map’s array of keys.
* [*map*.values](https://github.com/d3/d3-array#map_values) - returns the map’s array of values.
* [*map*.entries](https://github.com/d3/d3-array#map_entries) - returns the map’s array of entries (key-values objects).
* [*map*.each](https://github.com/d3/d3-array#map_each) - calls the given function for each entry in the map.
* [*map*.empty](https://github.com/d3/d3-array#map_empty) - returns false if the map has at least one entry.
* [*map*.size](https://github.com/d3/d3-array#map_size) - returns the number of entries in the map.

#### [Sets](https://github.com/d3/d3-array#sets)

Like ES6 Set, but with string keys and a few other differences.

* [d3.set](https://github.com/d3/d3-array#set) - constructs a new, empty set.
* [*set*.has](https://github.com/d3/d3-array#set_has) - returns true if the set contains the given value.
* [*set*.add](https://github.com/d3/d3-array#set_add) - adds the given value.
* [*set*.remove](https://github.com/d3/d3-array#set_remove) - removes the given value.
* [*set*.clear](https://github.com/d3/d3-array#set_clear) - removes all values.
* [*set*.values](https://github.com/d3/d3-array#set_values) - returns the set’s array of values.
* [*set*.each](https://github.com/d3/d3-array#set_each) - calls the given function for each value in the set.
* [*set*.empty](https://github.com/d3/d3-array#set_empty) - returns true if the set has at least one value.
* [*set*.size](https://github.com/d3/d3-array#set_size) - returns the number of values in the set.

#### [Nests](https://github.com/d3/d3-array#nests)

Group data into arbitrary hierarchies.

* [d3.nest](https://github.com/d3/d3-array#nest) - constructs a new nest generator.
* [*nest*.key](https://github.com/d3/d3-array#nest_key) - add a level to the nest hierarchy.
* [*nest*.sortKeys](https://github.com/d3/d3-array#nest_sortKeys) - sort the current nest level by key.
* [*nest*.sortValues](https://github.com/d3/d3-array#nest_sortValues) - sort the leaf nest level by value.
* [*nest*.rollup](https://github.com/d3/d3-array#nest_rollup) - specify a rollup function for leaf values.
* [*nest*.map](https://github.com/d3/d3-array#nest_map) - generate the nest, returning a map.
* [*nest*.object](https://github.com/d3/d3-array#nest_object) - generate the nest, returning an associative array.
* [*nest*.entries](https://github.com/d3/d3-array#nest_entries) - generate the nest, returning an array of key-values tuples.

## [Colors](https://github.com/d3/d3-color)

Color manipulation and color space conversion.

* [d3.color](https://github.com/d3/d3-color#color) - parses the given CSS color specifier.
* [*color*.rgb](https://github.com/d3/d3-color#color_rgb) - returns the RGB equivalent of this color.
* [*color*.brighter](https://github.com/d3/d3-color#color_brighter) - returns a brighter copy of this color.
* [*color*.darker](https://github.com/d3/d3-color#color_darker) - returns a darker copy of this color.
* [*color*.displayable](https://github.com/d3/d3-color#color_displayable) - returns true if the color is displayable on standard hardware.
* [*color*.toString](https://github.com/d3/d3-color#color_toString) - formats the color as an RGB hexadecimal string.
* [d3.rgb](https://github.com/d3/d3-color#rgb) - constructs a new RGB color.
* [d3.hsl](https://github.com/d3/d3-color#hsl) - constructs a new HSL color.
* [d3.lab](https://github.com/d3/d3-color#lab) - constructs a new Lab color.
* [d3.hcl](https://github.com/d3/d3-color#hcl) - constructs a new HCL color.
* [d3.cubehelix](https://github.com/d3/d3-color#cubehelix) - constructs a new Cubehelix color.

## [Delimiter-Separated Values](https://github.com/d3/d3-dsv)

Parse and format delimiter-separated values, most commonly CSV and TSV.

* [d3.dsv](https://github.com/d3/d3-dsv#dsv) - constructs a new parser and formatter for the given delimiter.
* [*dsv*.parse](https://github.com/d3/d3-dsv#dsv_parse) - parse the given string, returning an array of objects.
* [*dsv*.parseRows](https://github.com/d3/d3-dsv#dsv_parseRows) - parse the given string, returning an array of rows.
* [*dsv*.format](https://github.com/d3/d3-dsv#dsv_format) - format the given array of objects.
* [*dsv*.formatRows](https://github.com/d3/d3-dsv#dsv_formatRows) - format the given array of rows.
* [d3.csv](https://github.com/d3/d3-dsv#csv) - a parser and formatter for comma-separated values (CSV).
* [d3.tsv](https://github.com/d3/d3-dsv#tsv) - a parser and formatter for tab-separated values (TSV).

## [Dispatches](https://github.com/d3/d3-dispatch)

Separate concerns using named callbacks.

* [d3.dispatch](https://github.com/d3/d3-dispatch#dispatch) - create a custom event dispatcher.
* [*dispatch*.on](https://github.com/d3/d3-dispatch#dispatch_on) - register or unregister an event listener.
* [*dispatch*.*type*](https://github.com/d3/d3-dispatch#dispatch_type) - dispatch an event to registered listeners.

## [Easings](https://github.com/d3/d3-ease)

* [d3.easeBind](https://github.com/d3/d3-ease#bind) - bind optional parameters to the given easing function.
* [d3.easeLinearIn](https://github.com/d3/d3-ease#linearIn) - linear easing; the identity function.
* [d3.easeLinearOut](https://github.com/d3/d3-ease#linearOut) - linear easing; the identity function.
* [d3.easeLinearInOut](https://github.com/d3/d3-ease#linearInOut) - linear easing; the identity function.
* [d3.easePolyIn](https://github.com/d3/d3-ease#polyIn) - polynomial easing; raises time to the given power.
* [d3.easePolyOut](https://github.com/d3/d3-ease#polyOut) - reverse polynomial easing.
* [d3.easePolyInOut](https://github.com/d3/d3-ease#polyInOut) - symmetric polynomial easing.
* [d3.easeQuadIn](https://github.com/d3/d3-ease#quadIn) - quadratic easing; squares time.
* [d3.easeQuadOut](https://github.com/d3/d3-ease#quadOut) - reverse quadratic easing.
* [d3.easeQuadInOut](https://github.com/d3/d3-ease#quadInOut) - symmetric quadratic easing.
* [d3.easeCubicIn](https://github.com/d3/d3-ease#cubicIn) - cubic easing; cubes time.
* [d3.easeCubicOut](https://github.com/d3/d3-ease#cubicOut) - reverse cubic easing.
* [d3.easeCubicInOut](https://github.com/d3/d3-ease#cubicInOut) - symmetric cubic easing.
* [d3.easeSinIn](https://github.com/d3/d3-ease#sinIn) - sinusoidal easing.
* [d3.easeSinOut](https://github.com/d3/d3-ease#sinOut) - reverse sinusoidal easing.
* [d3.easeSinInOut](https://github.com/d3/d3-ease#sinInOut) - symmetric sinusoidal easing.
* [d3.easeExpIn](https://github.com/d3/d3-ease#expIn) - exponential easing.
* [d3.easeExpOut](https://github.com/d3/d3-ease#expOut) - reverse exponential easing.
* [d3.easeExpInOut](https://github.com/d3/d3-ease#expInOut) - symmetric exponential easing.
* [d3.easeCircleIn](https://github.com/d3/d3-ease#circleIn) - circular easing.
* [d3.easeCircleOut](https://github.com/d3/d3-ease#circleOut) - reverse circular easing.
* [d3.easeCircleInOut](https://github.com/d3/d3-ease#circleInOut) - symmetric circular easing.
* [d3.easeElasticIn](https://github.com/d3/d3-ease#elasticIn) - elastic easing, like a rubber band.
* [d3.easeElasticOut](https://github.com/d3/d3-ease#elasticOut) - reverse elastic easing.
* [d3.easeElasticInOut](https://github.com/d3/d3-ease#elasticInOut) - symmetric elastic easing.
* [d3.easeBackIn](https://github.com/d3/d3-ease#backIn) - anticipatory easing, like a dancer bending his knees before jumping.
* [d3.easeBackOut](https://github.com/d3/d3-ease#backOut) - reverse anticipatory easing.
* [d3.easeBackInOut](https://github.com/d3/d3-ease#backInOut) - symmetric anticipatory easing.
* [d3.easeBounceIn](https://github.com/d3/d3-ease#bounceIn) - bounce easing, like a rubber ball.
* [d3.easeBounceOut](https://github.com/d3/d3-ease#bounceOut) - reverse bounce easing.
* [d3.easeBounceInOut](https://github.com/d3/d3-ease#bounceInOut) - symmetric bounce easing.

## [Interpolators](https://github.com/d3/d3-interpolate)

Interpolate numbers, colors, strings, arrays, objects, whatever!

* [d3.interpolateBind](https://github.com/d3/d3-interpolate#bind) - bind optional parameters to the given interpolator.
* [d3.interpolate](https://github.com/d3/d3-interpolate#value) - interpolate arbitrary values.
* [d3.interpolators](https://github.com/d3/d3-interpolato#values) - register a custom interpolator.
* [d3.interpolateArray](https://github.com/d3/d3-interpolate#array) - interpolate arrays of arbitrary values.
* [d3.interpolateNumber](https://github.com/d3/d3-interpolate#number) - interpolate numbers.
* [d3.interpolateObject](https://github.com/d3/d3-interpolate#object) - interpolate arbitrary objects.
* [d3.interpolateRound](https://github.com/d3/d3-interpolate#round) - interpolate integers.
* [d3.interpolateString](https://github.com/d3/d3-interpolate#string) - interpolate strings with embedded numbers.
* [d3.interpolateTransform](https://github.com/d3/d3-interpolate#transform) - interpolate 2D matrix transforms.
* [d3.interpolateZoom](https://github.com/d3/d3-interpolate#zoom) - zoom and pan between two views.
* [d3.interpolateRgb](https://github.com/d3/d3-interpolate#rgb) - interpolate RGB colors.
* [d3.interpolateHsl](https://github.com/d3/d3-interpolate#hsl) - interpolate HSL colors.
* [d3.interpolateHslLong](https://github.com/d3/d3-interpolate#hslLong) - interpolate HSL colors, the long way.
* [d3.interpolateLab](https://github.com/d3/d3-interpolate#lab) - interpolate Lab colors.
* [d3.interpolateHcl](https://github.com/d3/d3-interpolate#hcl) - interpolate HCL colors.
* [d3.interpolateHclLong](https://github.com/d3/d3-interpolate#hclLong) - interpolate HCL colors, the long way.
* [d3.interpolateCubehelix](https://github.com/d3/d3-interpolate#cubehelix) - interpolate Cubehelix colors.
* [d3.interpolateCubehelixLong](https://github.com/d3/d3-interpolate#cubehelixLong) - interpolate Cubehelix colors, the long way.

## [Number Formats](https://github.com/d3/d3-format)

* [d3.format](https://github.com/d3/d3-format#format) -
* [d3.formatPrefix](https://github.com/d3/d3-format#formatPrefix) -
* [d3.formatSpecifier](https://github.com/d3/d3-format#formatSpecifier) -
* [d3.formatLocale](https://github.com/d3/d3-format#locale) -
* [*locale*.format](https://github.com/d3/d3-format#locale_format) -
* [*locale*.formatPrefix](https://github.com/d3/d3-format#locale_formatPrefix) -
* [d3.precisionFixed](https://github.com/d3/d3-format#precisionFixed) -
* [d3.precisionPrefix](https://github.com/d3/d3-format#precisionPrefix) -
* [d3.precisionRound](https://github.com/d3/d3-format#precisionRound) -
* [d3.formatCaEs](https://github.com/d3/d3-format#localeCaEs) -
* [d3.formatCsCz](https://github.com/d3/d3-format#localeCsCz) -
* [d3.formatDeCh](https://github.com/d3/d3-format#localeDeCh) -
* [d3.formatDeDe](https://github.com/d3/d3-format#localeDeDe) -
* [d3.formatEnCa](https://github.com/d3/d3-format#localeEnCa) -
* [d3.formatEnGb](https://github.com/d3/d3-format#localeEnGb) -
* [d3.formatEnUs](https://github.com/d3/d3-format#localeEnUs) -
* [d3.formatEsEs](https://github.com/d3/d3-format#localeEsEs) -
* [d3.formatFiFi](https://github.com/d3/d3-format#localeFiFi) -
* [d3.formatFrCa](https://github.com/d3/d3-format#localeFrCa) -
* [d3.formatFrFr](https://github.com/d3/d3-format#localeFrFr) -
* [d3.formatHeIl](https://github.com/d3/d3-format#localeHeIl) -
* [d3.formatHuHu](https://github.com/d3/d3-format#localeHuHu) -
* [d3.formatItIt](https://github.com/d3/d3-format#localeItIt) -
* [d3.formatJaJp](https://github.com/d3/d3-format#localeJaJp) -
* [d3.formatKoKr](https://github.com/d3/d3-format#localeKoKr) -
* [d3.formatMkMk](https://github.com/d3/d3-format#localeMkMk) -
* [d3.formatNlNl](https://github.com/d3/d3-format#localeNlNl) -
* [d3.formatPlPl](https://github.com/d3/d3-format#localePlPl) -
* [d3.formatPtBr](https://github.com/d3/d3-format#localePtBr) -
* [d3.formatRuRu](https://github.com/d3/d3-format#localeRuRu) -
* [d3.formatSvSe](https://github.com/d3/d3-format#localeSvSe) -
* [d3.formatZhCn](https://github.com/d3/d3-format#localeZhCn) -

## [Paths](https://github.com/d3/d3-path)

Serialize Canvas path commands to SVG.

* [d3.path](https://github.com/d3/d3-path#path) - constructs a new path serializer.
* [*path*.moveTo](https://github.com/d3/d3-path#path_moveTo) - move to the given point.
* [*path*.closePath](https://github.com/d3/d3-path#path_closePath) - close the current subpath.
* [*path*.lineTo](https://github.com/d3/d3-path#path_lineTo) - draw a straight line segment.
* [*path*.quadraticCurveTo](https://github.com/d3/d3-path#path_quadraticCurveTo) - draw a quadratic Bézier segment.
* [*path*.bezierCurveTo](https://github.com/d3/d3-path#path_bezierCurveTo) - draw a cubic Bézier segment.
* [*path*.arcTo](https://github.com/d3/d3-path#path_arcTo) - draw a circular arc segment.
* [*path*.arc](https://github.com/d3/d3-path#path_arc) - draw a circular arc segment.
* [*path*.rect](https://github.com/d3/d3-path#path_rect) - draw a rectangle.
* [*path*.toString](https://github.com/d3/d3-path#path_toString) - serialize to an SVG path data string.

## [Random Numbers](https://github.com/d3/d3-random)

Generate random numbers from various distributions.

* [d3.randomUniform](https://github.com/d3/d3-random#uniform) - from a uniform distribution.
* [d3.randomNormal](https://github.com/d3/d3-random#normal) - from a normal distribution.
* [d3.randomLogNormal](https://github.com/d3/d3-random#logNormal) - from a log-normal distribution.
* [d3.randomBates](https://github.com/d3/d3-random#bates) - from a Bates distribution.
* [d3.randomIrwinHall](https://github.com/d3/d3-random#irwinHall) - from an Irwin–Hall distribution.
* [d3.randomExponential](https://github.com/d3/d3-random#exponential) - from an exponential distribution.

## [Requests](https://github.com/d3/d3-request)

A convenient alternative to asynchronous XMLHttpRequest.

* [d3.request](https://github.com/d3/d3-request#request) - make an asynchronous request.
* [*request*.header](https://github.com/d3/d3-request#request_header) - set a request header.
* [*request*.mimeType](https://github.com/d3/d3-request#request_mimeType) - set the MIME type.
* [*request*.timeout](https://github.com/d3/d3-request#request_timeout) - set the timeout in milliseconds.
* [*request*.responseType](https://github.com/d3/d3-request#request_responseType) - set the response type.
* [*request*.response](https://github.com/d3/d3-request#request_response) - set the response function.
* [*request*.get](https://github.com/d3/d3-request#request_get) - send a GET request.
* [*request*.post](https://github.com/d3/d3-request#request_post) - send a POST request.
* [*request*.send](https://github.com/d3/d3-request#request_send) - set the request.
* [*request*.abort](https://github.com/d3/d3-request#request_abort) - abort the request.
* [*request*.on](https://github.com/d3/d3-request#request_on) - listen for a request event.
* [d3.requestCsv](https://github.com/d3/d3-request#requestCsv) - get a comma-separated values (CSV) file.
* [d3.requestHtml](https://github.com/d3/d3-request#requestHtml) - get an HTML file.
* [d3.requestJson](https://github.com/d3/d3-request#requestJson) - get a JSON file.
* [d3.requestText](https://github.com/d3/d3-request#requestText) - get a plain text file.
* [d3.requestTsv](https://github.com/d3/d3-request#requestTsv) - get a tab-separated values (TSV) file.
* [d3.requestXml](https://github.com/d3/d3-request#requestXml) - get an XML file.

## [Scales](https://github.com/d3/d3-scale)

### [Continuous](https://github.com/d3/d3-scale#continuous-scales)

Map a continuous, quantitative domain to a continuous range.

* [*continuous*](https://github.com/d3/d3-scale#continuous) -
* [*continuous*.invert](https://github.com/d3/d3-scale#continuous_invert) -
* [*continuous*.domain](https://github.com/d3/d3-scale#continuous_domain) -
* [*continuous*.range](https://github.com/d3/d3-scale#continuous_range) -
* [*continuous*.rangeRound](https://github.com/d3/d3-scale#continuous_rangeRound) -
* [*continuous*.clamp](https://github.com/d3/d3-scale#continuous_clamp) -
* [*continuous*.interpolate](https://github.com/d3/d3-scale#continuous_interpolate) -
* [*continuous*.ticks](https://github.com/d3/d3-scale#continuous_ticks) -
* [*continuous*.tickFormat](https://github.com/d3/d3-scale#continuous_tickFormat) -
* [*continuous*.nice](https://github.com/d3/d3-scale#continuous_nice) -
* [*continuous*.copy](https://github.com/d3/d3-scale#continuous_copy) -
* [d3.scaleLinear](https://github.com/d3/d3-scale#linear) -
* [d3.scalePow](https://github.com/d3/d3-scale#pow) -
* [*pow*.exponent](https://github.com/d3/d3-scale#pow_exponent) -
* [d3.scaleSqrt](https://github.com/d3/d3-scale#sqrt) -
* [d3.scaleLog](https://github.com/d3/d3-scale#log) -
* [*log*.base](https://github.com/d3/d3-scale#log_base) -
* [*log*.nice](https://github.com/d3/d3-scale#log_nice) -
* [*log*.ticks](https://github.com/d3/d3-scale#log_ticks) -
* [*log*.tickFormat](https://github.com/d3/d3-scale#log_tickFormat) -
* [d3.scaleIdentity](https://github.com/d3/d3-scale#identity) -
* [d3.scaleTime](https://github.com/d3/d3-scale#time) -
* [*time*.ticks](https://github.com/d3/d3-scale#time_ticks) -
* [*time*.ticks](https://github.com/d3/d3-scale#time_ticks) -
* [*time*.tickFormat](https://github.com/d3/d3-scale#time_tickFormat) -
* [*time*.nice](https://github.com/d3/d3-scale#time_nice) -
* [*time*.nice](https://github.com/d3/d3-scale#time_nice) -
* [d3.scaleUtc](https://github.com/d3/d3-scale#utcTime) -

### [Sequential](https://github.com/d3/d3-scale#sequential-color-scales)

Map a continuous, quantitative domain to a continuous, fixed color ramp.

* [d3.scaleViridis](https://github.com/d3/d3-scale#viridis) -
* [d3.scaleInferno](https://github.com/d3/d3-scale#inferno) -
* [d3.scaleMagma](https://github.com/d3/d3-scale#magma) -
* [d3.scalePlasma](https://github.com/d3/d3-scale#plasma) -
* [d3.scaleWarm](https://github.com/d3/d3-scale#warm) -
* [d3.scaleCool](https://github.com/d3/d3-scale#cool) -
* [d3.scaleRainbow](https://github.com/d3/d3-scale#rainbow) -
* [d3.scaleCubehelix](https://github.com/d3/d3-scale#cubehelix) -

### [Quantize](https://github.com/d3/d3-scale#quantize-scales)

Map a continuous, quantitative domain to a discrete range.

* [d3.scaleQuantize](https://github.com/d3/d3-scale#quantize) -
* [*quantize*](https://github.com/d3/d3-scale#_quantize) -
* [*quantize*.invertExtent](https://github.com/d3/d3-scale#quantize_invertExtent) -
* [*quantize*.domain](https://github.com/d3/d3-scale#quantize_domain) -
* [*quantize*.range](https://github.com/d3/d3-scale#quantize_range) -
* [*quantize*.nice](https://github.com/d3/d3-scale#quantize_nice) -
* [*quantize*.ticks](https://github.com/d3/d3-scale#quantize_ticks) -
* [*quantize*.tickFormat](https://github.com/d3/d3-scale#quantize_tickFormat) -
* [*quantize*.copy](https://github.com/d3/d3-scale#quantize_copy) -
* [d3.scaleQuantile](https://github.com/d3/d3-scale#quantile) -
* [*quantile*](https://github.com/d3/d3-scale#_quantile) -
* [*quantile*.invertExtent](https://github.com/d3/d3-scale#quantile_invertExtent) -
* [*quantile*.domain](https://github.com/d3/d3-scale#quantile_domain) -
* [*quantile*.range](https://github.com/d3/d3-scale#quantile_range) -
* [*quantile*.quantiles](https://github.com/d3/d3-scale#quantile_quantiles) -
* [*quantile*.copy](https://github.com/d3/d3-scale#quantile_copy) -
* [d3.scaleThreshold](https://github.com/d3/d3-scale#threshold) -
* [*threshold*](https://github.com/d3/d3-scale#_threshold) -
* [*threshold*.invertExtent](https://github.com/d3/d3-scale#threshold_invertExtent) -
* [*threshold*.domain](https://github.com/d3/d3-scale#threshold_domain) -
* [*threshold*.range](https://github.com/d3/d3-scale#threshold_range) -
* [*threshold*.copy](https://github.com/d3/d3-scale#threshold_copy) -

### [Ordinal](https://github.com/d3/d3-scale#ordinal-scales)

Map a discrete domain to a discrete range.

* [d3.scaleOrdinal](https://github.com/d3/d3-scale#ordinal) -
* [*ordinal*](https://github.com/d3/d3-scale#_ordinal) -
* [*ordinal*.domain](https://github.com/d3/d3-scale#ordinal_domain) -
* [*ordinal*.range](https://github.com/d3/d3-scale#ordinal_range) -
* [*ordinal*.unknown](https://github.com/d3/d3-scale#ordinal_unknown) -
* [*ordinal*.copy](https://github.com/d3/d3-scale#ordinal_copy) -
* [d3.scaleImplicit](https://github.com/d3/d3-scale#implicit) -
* [d3.scaleBand](https://github.com/d3/d3-scale#band) -
* [*band*](https://github.com/d3/d3-scale#_band) -
* [*band*.domain](https://github.com/d3/d3-scale#band_domain) -
* [*band*.range](https://github.com/d3/d3-scale#band_range) -
* [*band*.rangeRound](https://github.com/d3/d3-scale#band_rangeRound) -
* [*band*.round](https://github.com/d3/d3-scale#band_round) -
* [*band*.paddingInner](https://github.com/d3/d3-scale#band_paddingInner) -
* [*band*.paddingOuter](https://github.com/d3/d3-scale#band_paddingOuter) -
* [*band*.padding](https://github.com/d3/d3-scale#band_padding) -
* [*band*.align](https://github.com/d3/d3-scale#band_align) -
* [*band*.bandwidth](https://github.com/d3/d3-scale#band_bandwidth) -
* [*band*.step](https://github.com/d3/d3-scale#band_step) -
* [*band*.copy](https://github.com/d3/d3-scale#band_copy) -
* [d3.scalePoint](https://github.com/d3/d3-scale#point) -
* [*point*.padding](https://github.com/d3/d3-scale#point_padding) -

### [Categorical](https://github.com/d3/d3-scale#categorical-color-scales)

Map a discrete domain to a discrete, fixed categorical color range.

* [d3.scaleCategory10](https://github.com/d3/d3-scale#category10) -
* [d3.scaleCategory20](https://github.com/d3/d3-scale#category20) -
* [d3.scaleCategory20b](https://github.com/d3/d3-scale#category20b) -
* [d3.scaleCategory20c](https://github.com/d3/d3-scale#category20c) -

## [Selections](https://github.com/d3/d3-selection)

* [d3.mouse](https://github.com/d3/d3-selection#mouse) -
* [d3.namespace](https://github.com/d3/d3-selection#namespace) -
* [d3.namespaces](https://github.com/d3/d3-selection#namespaces) -
* [d3.requote](https://github.com/d3/d3-selection#requote) -
* [d3.select](https://github.com/d3/d3-selection#select) -
* [d3.selectAll](https://github.com/d3/d3-selection#selectAll) -
* [d3.selection](https://github.com/d3/d3-selection#selection) -
* [*selection*.select](https://github.com/d3/d3-selection#selection_select) -
* [*selection*.selectAll](https://github.com/d3/d3-selection#selection_selectAll) -
* [*selection*.filter](https://github.com/d3/d3-selection#selection_filter) -
* [*selection*.data](https://github.com/d3/d3-selection#selection_data) -
* [*selection*.enter](https://github.com/d3/d3-selection#selection_enter) -
* [*selection*.exit](https://github.com/d3/d3-selection#selection_exit) -
* [*selection*.order](https://github.com/d3/d3-selection#selection_order) -
* [*selection*.sort](https://github.com/d3/d3-selection#selection_sort) -
* [*selection*.call](https://github.com/d3/d3-selection#selection_call) -
* [*selection*.nodes](https://github.com/d3/d3-selection#selection_nodes) -
* [*selection*.node](https://github.com/d3/d3-selection#selection_node) -
* [*selection*.size](https://github.com/d3/d3-selection#selection_size) -
* [*selection*.empty](https://github.com/d3/d3-selection#selection_empty) -
* [*selection*.each](https://github.com/d3/d3-selection#selection_each) -
* [*selection*.attr](https://github.com/d3/d3-selection#selection_attr) -
* [*selection*.style](https://github.com/d3/d3-selection#selection_style) -
* [*selection*.property](https://github.com/d3/d3-selection#selection_property) -
* [*selection*.classed](https://github.com/d3/d3-selection#selection_classed) -
* [*selection*.text](https://github.com/d3/d3-selection#selection_text) -
* [*selection*.html](https://github.com/d3/d3-selection#selection_html) -
* [*selection*.append](https://github.com/d3/d3-selection#selection_append) -
* [*selection*.remove](https://github.com/d3/d3-selection#selection_remove) -
* [*selection*.datum](https://github.com/d3/d3-selection#selection_datum) -
* [*selection*.on](https://github.com/d3/d3-selection#selection_on) -
* [*selection*.dispatch](https://github.com/d3/d3-selection#selection_dispatch) -
* [d3.touch](https://github.com/d3/d3-selection#touch) -
* [d3.touches](https://github.com/d3/d3-selection#touches) -
* [d3.event](https://github.com/d3/d3-selection#event) -

## [Shapes](https://github.com/d3/d3-shape)

### [Arcs](https://github.com/d3/d3-shape#arcs)

* [d3.arc](https://github.com/d3/d3-shape#arc) -
* [*arc*](https://github.com/d3/d3-shape#_arc) -
* [*arc*.centroid](https://github.com/d3/d3-shape#arc_centroid) -
* [*arc*.innerRadius](https://github.com/d3/d3-shape#arc_innerRadius) -
* [*arc*.outerRadius](https://github.com/d3/d3-shape#arc_outerRadius) -
* [*arc*.cornerRadius](https://github.com/d3/d3-shape#arc_cornerRadius) -
* [*arc*.startAngle](https://github.com/d3/d3-shape#arc_startAngle) -
* [*arc*.endAngle](https://github.com/d3/d3-shape#arc_endAngle) -
* [*arc*.padAngle](https://github.com/d3/d3-shape#arc_padAngle) -
* [*arc*.padRadius](https://github.com/d3/d3-shape#arc_padRadius) -
* [*arc*.context](https://github.com/d3/d3-shape#arc_context) -

### [Pies](https://github.com/d3/d3-shape#pies)

* [d3.pie](https://github.com/d3/d3-shape#pie) -
* [*pie*](https://github.com/d3/d3-shape#_pie) -
* [*pie*.value](https://github.com/d3/d3-shape#pie_value) -
* [*pie*.sort](https://github.com/d3/d3-shape#pie_sort) -
* [*pie*.sortValues](https://github.com/d3/d3-shape#pie_sortValues) -
* [*pie*.startAngle](https://github.com/d3/d3-shape#pie_startAngle) -
* [*pie*.endAngle](https://github.com/d3/d3-shape#pie_endAngle) -
* [*pie*.padAngle](https://github.com/d3/d3-shape#pie_padAngle) -

### [Lines](https://github.com/d3/d3-shape#lines)

* [d3.line](https://github.com/d3/d3-shape#line) -
* [*line*](https://github.com/d3/d3-shape#_line) -
* [*line*.x](https://github.com/d3/d3-shape#line_x) -
* [*line*.y](https://github.com/d3/d3-shape#line_y) -
* [*line*.defined](https://github.com/d3/d3-shape#line_defined) -
* [*line*.curve](https://github.com/d3/d3-shape#line_curve) -
* [*line*.context](https://github.com/d3/d3-shape#line_context) -
* [d3.radialLine](https://github.com/d3/d3-shape#radialLine) -
* [*radialLine*.angle](https://github.com/d3/d3-shape#radialLine_angle) -
* [*radialLine*.radius](https://github.com/d3/d3-shape#radialLine_radius) -
* [*radialLine*.defined](https://github.com/d3/d3-shape#radialLine_defined) -
* [*radialLine*.curve](https://github.com/d3/d3-shape#radialLine_curve) -
* [*radialLine*.context](https://github.com/d3/d3-shape#radialLine_context) -

### [Areas](https://github.com/d3/d3-shape#areas)

* [d3.area](https://github.com/d3/d3-shape#area) -
* [*area*](https://github.com/d3/d3-shape#_area) -
* [*area*.x](https://github.com/d3/d3-shape#area_x) -
* [*area*.x0](https://github.com/d3/d3-shape#area_x0) -
* [*area*.x1](https://github.com/d3/d3-shape#area_x1) -
* [*area*.y](https://github.com/d3/d3-shape#area_y) -
* [*area*.y0](https://github.com/d3/d3-shape#area_y0) -
* [*area*.y1](https://github.com/d3/d3-shape#area_y1) -
* [*area*.defined](https://github.com/d3/d3-shape#area_defined) -
* [*area*.curve](https://github.com/d3/d3-shape#area_curve) -
* [*area*.context](https://github.com/d3/d3-shape#area_context) -
* [d3.radialArea](https://github.com/d3/d3-shape#radialArea) -
* [*radialArea*.angle](https://github.com/d3/d3-shape#radialArea_angle) -
* [*radialArea*.startAngle](https://github.com/d3/d3-shape#radialArea_startAngle) -
* [*radialArea*.endAngle](https://github.com/d3/d3-shape#radialArea_endAngle) -
* [*radialArea*.radius](https://github.com/d3/d3-shape#radialArea_radius) -
* [*radialArea*.innerRadius](https://github.com/d3/d3-shape#radialArea_innerRadius) -
* [*radialArea*.outerRadius](https://github.com/d3/d3-shape#radialArea_outerRadius) -
* [*radialArea*.defined](https://github.com/d3/d3-shape#radialArea_defined) -
* [*radialArea*.curve](https://github.com/d3/d3-shape#radialArea_curve) -
* [*radialArea*.context](https://github.com/d3/d3-shape#radialArea_context) -

### [Curves](https://github.com/d3/d3-shape#curves)

* [d3.curveBasis](https://github.com/d3/d3-shape#basis) -
* [d3.curveBasisClosed](https://github.com/d3/d3-shape#basisClosed) -
* [d3.curveBasisOpen](https://github.com/d3/d3-shape#basisOpen) -
* [d3.curveBundle](https://github.com/d3/d3-shape#bundle) -
* [d3.curveCardinal](https://github.com/d3/d3-shape#cardinal) -
* [d3.curveCardinalClosed](https://github.com/d3/d3-shape#cardinalClosed) -
* [d3.curveCardinalOpen](https://github.com/d3/d3-shape#cardinalOpen) -
* [d3.curveCatmullRom](https://github.com/d3/d3-shape#catmullRom) -
* [d3.curveCatmullRomClosed](https://github.com/d3/d3-shape#catmullRomClosed) -
* [d3.curveCatmullRomOpen](https://github.com/d3/d3-shape#catmullRomOpen) -
* [d3.curveLinear](https://github.com/d3/d3-shape#linear) -
* [d3.curveLinearClosed](https://github.com/d3/d3-shape#linearClosed) -
* [d3.curveMonotone](https://github.com/d3/d3-shape#monotone) -
* [d3.curveNatural](https://github.com/d3/d3-shape#natural) -
* [d3.curveStep](https://github.com/d3/d3-shape#step) -
* [d3.curveStepAfter](https://github.com/d3/d3-shape#stepAfter) -
* [d3.curveStepBefore](https://github.com/d3/d3-shape#stepBefore) -
* [*curve*.areaStart](https://github.com/d3/d3-shape#curve_areaStart) -
* [*curve*.areaEnd](https://github.com/d3/d3-shape#curve_areaEnd) -
* [*curve*.lineStart](https://github.com/d3/d3-shape#curve_lineStart) -
* [*curve*.lineEnd](https://github.com/d3/d3-shape#curve_lineEnd) -
* [*curve*.point](https://github.com/d3/d3-shape#curve_point) -

### [Symbols](https://github.com/d3/d3-shape#symbols)

* [d3.symbol](https://github.com/d3/d3-shape#symbol) -
* [*symbol*](https://github.com/d3/d3-shape#_symbol) -
* [*symbol*.type](https://github.com/d3/d3-shape#symbol_type) -
* [*symbol*.size](https://github.com/d3/d3-shape#symbol_size) -
* [*symbol*.context](https://github.com/d3/d3-shape#symbol_context) -
* [d3.symbols](https://github.com/d3/d3-shape#symbols) -
* [d3.symbolCircle](https://github.com/d3/d3-shape#circle) -
* [d3.symbolCross](https://github.com/d3/d3-shape#cross) -
* [d3.symbolDiamond](https://github.com/d3/d3-shape#diamond) -
* [d3.symbolSquare](https://github.com/d3/d3-shape#square) -
* [d3.symbolStar](https://github.com/d3/d3-shape#star) -
* [d3.symbolTriangle](https://github.com/d3/d3-shape#triangle) -
* [d3.symbolWye](https://github.com/d3/d3-shape#wye) -
* [*symbolType*.draw](https://github.com/d3/d3-shape#symbolType_draw) -

### [Stacks](https://github.com/d3/d3-shape#stacks)

* [d3.stack](https://github.com/d3/d3-shape#stack) -
* [*stack*](https://github.com/d3/d3-shape#_stack) -
* [*stack*.keys](https://github.com/d3/d3-shape#stack_keys) -
* [*stack*.value](https://github.com/d3/d3-shape#stack_value) -
* [*stack*.order](https://github.com/d3/d3-shape#stack_order) -
* [*stack*.offset](https://github.com/d3/d3-shape#stack_offset) -
* [d3.stackOrderAscending](https://github.com/d3/d3-shape#orderAscending) -
* [d3.stackOrderDescending](https://github.com/d3/d3-shape#orderDescending) -
* [d3.stackOrderInsideOut](https://github.com/d3/d3-shape#orderInsideOut) -
* [d3.stackOrderNone](https://github.com/d3/d3-shape#orderNone) -
* [d3.stackOrderReverse](https://github.com/d3/d3-shape#orderReverse) -
* [d3.stackOffsetExpand](https://github.com/d3/d3-shape#offsetExpand) -
* [d3.stackOffsetNone](https://github.com/d3/d3-shape#offsetNone) -
* [d3.stackOffsetSilhouette](https://github.com/d3/d3-shape#offsetSilhouette) -
* [d3.stackOffsetWiggle](https://github.com/d3/d3-shape#offsetWiggle) -

## [Time Formats](https://github.com/d3/d3-time-format)

* [d3.timeFormat](https://github.com/d3/d3-time-format#format) -
* [*format*](https://github.com/d3/d3-time-format#_format) -
* [*format*.parse](https://github.com/d3/d3-time-format#format_parse) -
* [*format*.toString](https://github.com/d3/d3-time-format#format_toString) -
* [d3.utcFormat](https://github.com/d3/d3-time-format#utcFormat) -
* [d3.isoFormat](https://github.com/d3/d3-time-format#isoFormat) -
* [d3.timeFormatLocale](https://github.com/d3/d3-time-format#locale) -
* [*locale*.format](https://github.com/d3/d3-time-format#locale_format) -
* [*locale*.utcFormat](https://github.com/d3/d3-time-format#locale_utcFormat) -
* [d3.timeFormatCaEs](https://github.com/d3/d3-time-format#localeCaEs) -
* [d3.timeFormatDeCh](https://github.com/d3/d3-time-format#localeDeCh) -
* [d3.timeFormatDeDe](https://github.com/d3/d3-time-format#localeDeDe) -
* [d3.timeFormatEnCa](https://github.com/d3/d3-time-format#localeEnCa) -
* [d3.timeFormatEnGb](https://github.com/d3/d3-time-format#localeEnGb) -
* [d3.timeFormatEnUs](https://github.com/d3/d3-time-format#localeEnUs) -
* [d3.timeFormatEsEs](https://github.com/d3/d3-time-format#localeEsEs) -
* [d3.timeFormatFiFi](https://github.com/d3/d3-time-format#localeFiFi) -
* [d3.timeFormatFrCa](https://github.com/d3/d3-time-format#localeFrCa) -
* [d3.timeFormatFrFr](https://github.com/d3/d3-time-format#localeFrFr) -
* [d3.timeFormatHeIl](https://github.com/d3/d3-time-format#localeHeIl) -
* [d3.timeFormatHuHu](https://github.com/d3/d3-time-format#localeHuHu) -
* [d3.timeFormatItIt](https://github.com/d3/d3-time-format#localeItIt) -
* [d3.timeFormatJaJp](https://github.com/d3/d3-time-format#localeJaJp) -
* [d3.timeFormatKoKr](https://github.com/d3/d3-time-format#localeKoKr) -
* [d3.timeFormatMkMk](https://github.com/d3/d3-time-format#localeMkMk) -
* [d3.timeFormatNlNl](https://github.com/d3/d3-time-format#localeNlNl) -
* [d3.timeFormatPlPl](https://github.com/d3/d3-time-format#localePlPl) -
* [d3.timeFormatPtBr](https://github.com/d3/d3-time-format#localePtBr) -
* [d3.timeFormatRuRu](https://github.com/d3/d3-time-format#localeRuRu) -
* [d3.timeFormatSvSe](https://github.com/d3/d3-time-format#localeSvSe) -
* [d3.timeFormatZhCn](https://github.com/d3/d3-time-format#localeZhCn) -

## [Time Intervals](https://github.com/d3/d3-time)

A calculator for humanity’s peculiar conventions of time.

* [d3.timeInterval](https://github.com/d3/d3-time#interval) - implement a new custom time interval.
* [*interval*](https://github.com/d3/d3-time#_interval) - alias for *interval*.floor.
* [*interval*.floor](https://github.com/d3/d3-time#interval_floor) - round down to the nearest boundary.
* [*interval*.round](https://github.com/d3/d3-time#interval_round) - round to the nearest boundary.
* [*interval*.ceil](https://github.com/d3/d3-time#interval_ceil) - round up to the nearest boundary.
* [*interval*.offset](https://github.com/d3/d3-time#interval_offset) - offset a date by some number of intervals.
* [*interval*.range](https://github.com/d3/d3-time#interval_range) - generate a range of dates at interval boundaries.
* [*interval*.filter](https://github.com/d3/d3-time#interval_filter) - create a filtered subset of this interval.
* [*interval*.every](https://github.com/d3/d3-time#interval_every) - create a filtered subset of this interval.
* [*interval*.count](https://github.com/d3/d3-time#interval_count) - count interval boundaries between two dates.
* [d3.timeMillisecond](https://github.com/d3/d3-time#millisecond), [d3.utcMillisecond](https://github.com/d3/d3-time#millisecond) - the millisecond interval.
* [d3.timeMilliseconds](https://github.com/d3/d3-time#millisecond), [d3.utcMilliseconds](https://github.com/d3/d3-time#millisecond) - aliases for millisecond.range.
* [d3.timeSecond](https://github.com/d3/d3-time#second), [d3.utcSecond](https://github.com/d3/d3-time#second) - the second interval.
* [d3.timeSeconds](https://github.com/d3/d3-time#second), [d3.utcSeconds](https://github.com/d3/d3-time#second) - aliases for second.range.
* [d3.timeMinute](https://github.com/d3/d3-time#minute), [d3.utcMinute](https://github.com/d3/d3-time#minute) - the minute interval.
* [d3.timeMinutes](https://github.com/d3/d3-time#minute), [d3.utcMinutes](https://github.com/d3/d3-time#minute) - aliases for minute.range.
* [d3.timeHour](https://github.com/d3/d3-time#hour), [d3.utcHour](https://github.com/d3/d3-time#hour) - the hour interval.
* [d3.timeHours](https://github.com/d3/d3-time#hour), [d3.utcHours](https://github.com/d3/d3-time#hour) - aliases for hour.range.
* [d3.timeDay](https://github.com/d3/d3-time#day), [d3.utcDay](https://github.com/d3/d3-time#day) - the day interval.
* [d3.timeDays](https://github.com/d3/d3-time#day), [d3.utcDays](https://github.com/d3/d3-time#day) - aliases for day.range.
* [d3.timeWeek](https://github.com/d3/d3-time#week), [d3.utcWeek](https://github.com/d3/d3-time#week) - aliases for Sunday and UTC Sunday.
* [d3.timeWeeks](https://github.com/d3/d3-time#week), [d3.utcWeeks](https://github.com/d3/d3-time#week) - aliases for week.range.
* [d3.timeSunday](https://github.com/d3/d3-time#sunday), [d3.utcSunday](https://github.com/d3/d3-time#sunday) - the week interval, starting on Sunday.
* [d3.timeSundays](https://github.com/d3/d3-time#sunday), [d3.utcSundays](https://github.com/d3/d3-time#sunday) - aliases for sunday.range.
* [d3.timeMonday](https://github.com/d3/d3-time#monday), [d3.utcMonday](https://github.com/d3/d3-time#monday) - the week interval, starting on Monday.
* [d3.timeMondays](https://github.com/d3/d3-time#monday), [d3.utcMondays](https://github.com/d3/d3-time#monday) - aliases for monday.range.
* [d3.timeTuesday](https://github.com/d3/d3-time#tuesday), [d3.utcTuesday](https://github.com/d3/d3-time#tuesday) - the week interval, starting on Tuesday.
* [d3.timeTuesdays](https://github.com/d3/d3-time#tuesday), [d3.utcTuesdays](https://github.com/d3/d3-time#tuesday) - aliases for tuesday.range.
* [d3.timeWednesday](https://github.com/d3/d3-time#wednesday), [d3.utcWednesday](https://github.com/d3/d3-time#wednesday) - the week interval, starting on Wednesday.
* [d3.timeWednesdays](https://github.com/d3/d3-time#wednesday), [d3.utcWednesdays](https://github.com/d3/d3-time#wednesday) - aliases for wednesday.range.
* [d3.timeThursday](https://github.com/d3/d3-time#thursday), [d3.utcThursday](https://github.com/d3/d3-time#thursday) - the week interval, starting on Thursday.
* [d3.timeThursdays](https://github.com/d3/d3-time#thursday), [d3.utcThursdays](https://github.com/d3/d3-time#thursday) - aliases for thursday.range.
* [d3.timeFriday](https://github.com/d3/d3-time#friday), [d3.utcFriday](https://github.com/d3/d3-time#friday) - the week interval, starting on Friday.
* [d3.timeFridays](https://github.com/d3/d3-time#friday), [d3.utcFridays](https://github.com/d3/d3-time#friday) - aliases for friday.range.
* [d3.timeSaturday](https://github.com/d3/d3-time#saturday), [d3.utcSaturday](https://github.com/d3/d3-time#saturday) - the week interval, starting on Saturday.
* [d3.timeSaturdays](https://github.com/d3/d3-time#saturday), [d3.utcSaturdays](https://github.com/d3/d3-time#saturday) - aliases for saturday.range.
* [d3.timeMonth](https://github.com/d3/d3-time#month), [d3.utcMonth](https://github.com/d3/d3-time#month) - the month interval.
* [d3.timeMonths](https://github.com/d3/d3-time#month), [d3.utcMonths](https://github.com/d3/d3-time#month) - aliases for month.range.
* [d3.timeYear](https://github.com/d3/d3-time#year), [d3.utcYear](https://github.com/d3/d3-time#year) - the year interval.
* [d3.timeYears](https://github.com/d3/d3-time#year), [d3.utcYears](https://github.com/d3/d3-time#year) - aliases for year.range.

## [Timers](https://github.com/d3/d3-timer)

An efficient queue capable of managing thousands of concurrent animations.

* [d3.timer](https://github.com/d3/d3-timer#timer) - schedules a new timer.
* [*timer*.restart](https://github.com/d3/d3-timer#timer_restart) - resets the timer’s start time and callback.
* [*timer*.stop](https://github.com/d3/d3-timer#timer_stop) - stops the timer.
* [*timer*.id](https://github.com/d3/d3-timer#timer_id) - a unique, opaque identifier.
* [d3.timerFlush](https://github.com/d3/d3-timer#timerFlush) - immediately executes any active timers.
