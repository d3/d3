# D3 API Reference

D3 4.0 is a [collection of modules](https://github.com/d3) that are designed to work together; you can use the modules independently, or you can use them together as part of the default build. The source and documentation for each module is available in its repository. Follow the links below to learn more. For changes between 3.x and 4.0, see [CHANGES](https://github.com/d3/d3/blob/master/CHANGES.md); see also the [3.x reference](https://github.com/d3/d3-3.x-api-reference/blob/master/API-Reference.md).

* [Arrays](#arrays-d3-array) ([Statistics](#statistics), [Search](#search), [Transformations](#transformations), [Histograms](#histograms))
* [Axes](#axes-d3-axis)
* [Brushes](#brushes-d3-brush)
* [Chords](#chords-d3-chord)
* [Collections](#collections-d3-collection) ([Objects](#objects), [Maps](#maps), [Sets](#sets), [Nests](#nests))
* [Colors](#colors-d3-color)
* [Dispatches](#dispatches-d3-dispatch)
* [Dragging](#dragging-d3-drag)
* [Delimiter-Separated Values](#delimiter-separated-values-d3-dsv)
* [Easings](#easings-d3-ease)
* [Forces](#forces-d3-force)
* [Number Formats](#number-formats-d3-format)
* [Geographies](#geographies-d3-geo) ([Paths](#paths), [Projections](#projections), [Spherical Math](#spherical-math), [Spherical Shapes](#spherical-shapes), [Streams](#streams), [Transforms](#transforms))
* [Hierarchies](#hierarchies-d3-hierarchy)
* [Interpolators](#interpolators-d3-interpolate)
* [Paths](#paths-d3-path)
* [Polygons](#polygons-d3-polygon)
* [Quadtrees](#quadtrees-d3-quadtree)
* [Queues](#queues-d3-queue)
* [Random Numbers](#random-numbers-d3-random)
* [Requests](#requests-d3-request)
* [Scales](#scales-d3-scale) ([Continuous](#continuous-scales), [Sequential](#sequential-scales), [Quantize](#quantize-scales), [Ordinal](#ordinal-scales))
* [Selections](#selections-d3-selection) ([Selecting](#selecting-elements), [Modifying](#modifying-elements), [Data](#joining-data), [Events](#handling-events), [Control](#control-flow), [Local Variables](#local-variables), [Namespaces](#namespaces))
* [Shapes](#shapes-d3-shape) ([Arcs](#arcs), [Pies](#pies), [Lines](#lines), [Areas](#areas), [Curves](#curves), [Symbols](#symbols), [Stacks](#stacks))
* [Time Formats](#time-formats-d3-time-format)
* [Time Intervals](#time-intervals-d3-time)
* [Timers](#timers-d3-timer)
* [Transitions](#transitions-d3-transition)
* [Voronoi Diagrams](#voronoi-diagrams-d3-voronoi)
* [Zooming](#zooming-d3-zoom)

D3 uses [semantic versioning](http://semver.org/). The current version is exposed as d3.version.

## [Arrays (d3-array)](https://github.com/d3/d3-array)

Array manipulation, ordering, searching, summarizing, etc.

#### [Statistics](https://github.com/d3/d3-array/blob/master/README.md#statistics)

Methods for computing basic summary statistics.

* [d3.min](https://github.com/d3/d3-array/blob/master/README.md#min) - compute the minimum value in an array.
* [d3.max](https://github.com/d3/d3-array/blob/master/README.md#max) - compute the maximum value in an array.
* [d3.extent](https://github.com/d3/d3-array/blob/master/README.md#extent) - compute the minimum and maximum value in an array.
* [d3.sum](https://github.com/d3/d3-array/blob/master/README.md#sum) - compute the sum of an array of numbers.
* [d3.mean](https://github.com/d3/d3-array/blob/master/README.md#mean) - compute the arithmetic mean of an array of numbers.
* [d3.median](https://github.com/d3/d3-array/blob/master/README.md#median) - compute the median of an array of numbers (the 0.5-quantile).
* [d3.quantile](https://github.com/d3/d3-array/blob/master/README.md#quantile) - compute a quantile for a sorted array of numbers.
* [d3.variance](https://github.com/d3/d3-array/blob/master/README.md#variance) - compute the variance of an array of numbers.
* [d3.deviation](https://github.com/d3/d3-array/blob/master/README.md#deviation) - compute the standard deviation of an array of numbers.

#### [Search](https://github.com/d3/d3-array/blob/master/README.md#search)

Methods for searching arrays for a specific element.

* [d3.scan](https://github.com/d3/d3-array/blob/master/README.md#scan) - linear search for an element using a comparator.
* [d3.bisect](https://github.com/d3/d3-array/blob/master/README.md#bisect) - binary search for a value in a sorted array.
* [d3.bisectRight](https://github.com/d3/d3-array/blob/master/README.md#bisectRight) - binary search for a value in a sorted array.
* [d3.bisectLeft](https://github.com/d3/d3-array/blob/master/README.md#bisectLeft) - binary search for a value in a sorted array.
* [d3.bisector](https://github.com/d3/d3-array/blob/master/README.md#bisector) - bisect using an accessor or comparator.
* [*bisector*.left](https://github.com/d3/d3-array/blob/master/README.md#bisector_left) - bisectLeft, with the given comparator.
* [*bisector*.right](https://github.com/d3/d3-array/blob/master/README.md#bisector_right) - bisectRight, with the given comparator.
* [d3.ascending](https://github.com/d3/d3-array/blob/master/README.md#ascending) - compute the natural order of two values.
* [d3.descending](https://github.com/d3/d3-array/blob/master/README.md#descending) - compute the natural order of two values.

#### [Transformations](https://github.com/d3/d3-array/blob/master/README.md#transformations)

Methods for transforming arrays and for generating new arrays.

* [d3.merge](https://github.com/d3/d3-array/blob/master/README.md#merge) - merge multiple arrays into one array.
* [d3.pairs](https://github.com/d3/d3-array/blob/master/README.md#pairs) - create an array of adjacent pairs of elements.
* [d3.permute](https://github.com/d3/d3-array/blob/master/README.md#permute) - reorder an array of elements according to an array of indexes.
* [d3.shuffle](https://github.com/d3/d3-array/blob/master/README.md#shuffle) - randomize the order of an array.
* [d3.ticks](https://github.com/d3/d3-array/blob/master/README.md#ticks) - generate representative values from a numeric interval.
* [d3.tickStep](https://github.com/d3/d3-array/blob/master/README.md#tickStep) - generate representative values from a numeric interval.
* [d3.range](https://github.com/d3/d3-array/blob/master/README.md#range) - generate a range of numeric values.
* [d3.transpose](https://github.com/d3/d3-array/blob/master/README.md#transpose) - transpose an array of arrays.
* [d3.zip](https://github.com/d3/d3-array/blob/master/README.md#zip) - transpose a variable number of arrays.

#### [Histograms](https://github.com/d3/d3-array/blob/master/README.md#histograms)

Bin discrete samples into continuous, non-overlapping intervals.

* [d3.histogram](https://github.com/d3/d3-array/blob/master/README.md#histogram) - create a new histogram generator.
* [*histogram*](https://github.com/d3/d3-array/blob/master/README.md#_histogram) - compute the histogram for the given array of samples.
* [*histogram*.value](https://github.com/d3/d3-array/blob/master/README.md#histogram_value) - specify a value accessor for each sample.
* [*histogram*.domain](https://github.com/d3/d3-array/blob/master/README.md#histogram_domain) - specify the interval of observable values.
* [*histogram*.thresholds](https://github.com/d3/d3-array/blob/master/README.md#histogram_thresholds) - specify how values are divided into bins.
* [d3.thresholdFreedmanDiaconis](https://github.com/d3/d3-array/blob/master/README.md#thresholdFreedmanDiaconis) - the Freedman–Diaconis binning rule.
* [d3.thresholdScott](https://github.com/d3/d3-array/blob/master/README.md#thresholdScott) - Scott’s normal reference binning rule.
* [d3.thresholdSturges](https://github.com/d3/d3-array/blob/master/README.md#thresholdSturges) - Sturges’ binning formula.

## [Axes (d3-axis)](https://github.com/d3/d3-axis)

Human-readable reference marks for scales.

* [d3.axisTop](https://github.com/d3/d3-axis/blob/master/README.md#axisTop) - create a new top-oriented axis generator.
* [d3.axisRight](https://github.com/d3/d3-axis/blob/master/README.md#axisRight) - create a new right-oriented axis generator.
* [d3.axisBottom](https://github.com/d3/d3-axis/blob/master/README.md#axisBottom) - create a new bottom-oriented axis generator.
* [d3.axisLeft](https://github.com/d3/d3-axis/blob/master/README.md#axisLeft) - create a new left-oriented axis generator.
* [*axis*](https://github.com/d3/d3-axis/blob/master/README.md#_axis) - generate an axis for the given selection.
* [*axis*.scale](https://github.com/d3/d3-axis/blob/master/README.md#axis_scale) - set the scale.
* [*axis*.ticks](https://github.com/d3/d3-axis/blob/master/README.md#axis_ticks) - customize how ticks are generated and formatted.
* [*axis*.tickArguments](https://github.com/d3/d3-axis/blob/master/README.md#axis_tickArguments) - customize how ticks are generated and formatted.
* [*axis*.tickValues](https://github.com/d3/d3-axis/blob/master/README.md#axis_tickValues) - set the tick values explicitly.
* [*axis*.tickFormat](https://github.com/d3/d3-axis/blob/master/README.md#axis_tickFormat) - set the tick format explicitly.
* [*axis*.tickSize](https://github.com/d3/d3-axis/blob/master/README.md#axis_tickSize) - set the size of the ticks.
* [*axis*.tickSizeInner](https://github.com/d3/d3-axis/blob/master/README.md#axis_tickSizeInner) - set the size of inner ticks.
* [*axis*.tickSizeOuter](https://github.com/d3/d3-axis/blob/master/README.md#axis_tickSizeOuter) - set the size of outer (extent) ticks.
* [*axis*.tickPadding](https://github.com/d3/d3-axis/blob/master/README.md#axis_tickPadding) - set the padding between ticks and labels.

## [Brushes (d3-brush)](https://github.com/d3/d3-brush)

Select a one- or two-dimensional region using the mouse or touch.

* [d3.brush](https://github.com/d3/d3-brush/blob/master/README.md#brush) - create a new two-dimensional brush.
* [d3.brushX](https://github.com/d3/d3-brush/blob/master/README.md#brushX) - create a brush along the *x*-dimension.
* [d3.brushY](https://github.com/d3/d3-brush/blob/master/README.md#brushY) - create a brush along the *y*-dimension.
* [*brush*](https://github.com/d3/d3-brush/blob/master/README.md#_brush) - apply the brush to a selection.
* [*brush*.move](https://github.com/d3/d3-brush/blob/master/README.md#brush_move) - move the brush selection.
* [*brush*.extent](https://github.com/d3/d3-brush/blob/master/README.md#brush_extent) - define the brushable region.
* [*brush*.filter](https://github.com/d3/d3-brush/blob/master/README.md#brush_filter) - control which input events initiate brushing.
* [*brush*.handleSize](https://github.com/d3/d3-brush/blob/master/README.md#brush_handleSize) - set the size of the brush handles.
* [*brush*.on](https://github.com/d3/d3-brush/blob/master/README.md#brush_on) - listen for brush events.
* [d3.brushSelection](https://github.com/d3/d3-brush/blob/master/README.md#brushSelection) - get the brush selection for a given node.

## [Chords (d3-chord)](https://github.com/d3/d3-chord)

* [d3.chord](https://github.com/d3/d3-chord/blob/master/README.md#chord) - create a new chord layout.
* [*chord*](https://github.com/d3/d3-chord/blob/master/README.md#_chord) - compute the layout for the given matrix.
* [*chord*.padAngle](https://github.com/d3/d3-chord/blob/master/README.md#chord_padAngle) - set the padding between adjacent groups.
* [*chord*.sortGroups](https://github.com/d3/d3-chord/blob/master/README.md#chord_sortGroups) - define the group order.
* [*chord*.sortSubgroups](https://github.com/d3/d3-chord/blob/master/README.md#chord_sortSubgroups) - define the source and target order within groups.
* [*chord*.sortChords](https://github.com/d3/d3-chord/blob/master/README.md#chord_sortChords) - define the chord order across groups.
* [d3.ribbon](https://github.com/d3/d3-chord/blob/master/README.md#ribbon) - create a ribbon shape generator.
* [*ribbon*](https://github.com/d3/d3-chord/blob/master/README.md#_ribbon) - generate a ribbon shape.
* [*ribbon*.source](https://github.com/d3/d3-chord/blob/master/README.md#ribbon_source) - set the source accessor.
* [*ribbon*.target](https://github.com/d3/d3-chord/blob/master/README.md#ribbon_target) - set the target accessor.
* [*ribbon*.radius](https://github.com/d3/d3-chord/blob/master/README.md#ribbon_radius) - set the ribbon source or target radius.
* [*ribbon*.startAngle](https://github.com/d3/d3-chord/blob/master/README.md#ribbon_startAngle) - set the ribbon source or target start angle.
* [*ribbon*.endAngle](https://github.com/d3/d3-chord/blob/master/README.md#ribbon_endAngle) - set the ribbon source or target end angle.
* [*ribbon*.context](https://github.com/d3/d3-chord/blob/master/README.md#ribbon_context) - set the render context.

## [Collections (d3-collection)](https://github.com/d3/d3-collection)

Handy data structures for elements keyed by string.

#### [Objects](https://github.com/d3/d3-collection/blob/master/README.md#objects)

Methods for converting associative arrays (objects) to arrays.

* [d3.keys](https://github.com/d3/d3-collection/blob/master/README.md#keys) - list the keys of an associative array.
* [d3.values](https://github.com/d3/d3-collection/blob/master/README.md#values) - list the values of an associated array.
* [d3.entries](https://github.com/d3/d3-collection/blob/master/README.md#entries) - list the key-value entries of an associative array.

#### [Maps](https://github.com/d3/d3-collection/blob/master/README.md#maps)

Like ES6 Map, but with string keys and a few other differences.

* [d3.map](https://github.com/d3/d3-collection/blob/master/README.md#map) - create a new, empty map.
* [*map*.has](https://github.com/d3/d3-collection/blob/master/README.md#map_has) - returns true if the map contains the given key.
* [*map*.get](https://github.com/d3/d3-collection/blob/master/README.md#map_get) - get the value for the given key.
* [*map*.set](https://github.com/d3/d3-collection/blob/master/README.md#map_set) - set the value for the given key.
* [*map*.remove](https://github.com/d3/d3-collection/blob/master/README.md#map_remove) - remove the entry for given key.
* [*map*.clear](https://github.com/d3/d3-collection/blob/master/README.md#map_clear) - remove all entries.
* [*map*.keys](https://github.com/d3/d3-collection/blob/master/README.md#map_keys) - get the array of keys.
* [*map*.values](https://github.com/d3/d3-collection/blob/master/README.md#map_values) - get the array of values.
* [*map*.entries](https://github.com/d3/d3-collection/blob/master/README.md#map_entries) - get the array of entries (key-values objects).
* [*map*.each](https://github.com/d3/d3-collection/blob/master/README.md#map_each) - call a function for each entry.
* [*map*.empty](https://github.com/d3/d3-collection/blob/master/README.md#map_empty) - returns false if the map has at least one entry.
* [*map*.size](https://github.com/d3/d3-collection/blob/master/README.md#map_size) - compute the number of entries.

#### [Sets](https://github.com/d3/d3-collection/blob/master/README.md#sets)

Like ES6 Set, but with string keys and a few other differences.

* [d3.set](https://github.com/d3/d3-collection/blob/master/README.md#set) - create a new, empty set.
* [*set*.has](https://github.com/d3/d3-collection/blob/master/README.md#set_has) - returns true if the set contains the given value.
* [*set*.add](https://github.com/d3/d3-collection/blob/master/README.md#set_add) - add the given value.
* [*set*.remove](https://github.com/d3/d3-collection/blob/master/README.md#set_remove) - remove the given value.
* [*set*.clear](https://github.com/d3/d3-collection/blob/master/README.md#set_clear) - remove all values.
* [*set*.values](https://github.com/d3/d3-collection/blob/master/README.md#set_values) - get the array of values.
* [*set*.each](https://github.com/d3/d3-collection/blob/master/README.md#set_each) - call a function for each value.
* [*set*.empty](https://github.com/d3/d3-collection/blob/master/README.md#set_empty) - returns true if the set has at least one value.
* [*set*.size](https://github.com/d3/d3-collection/blob/master/README.md#set_size) - compute the number of values.

#### [Nests](https://github.com/d3/d3-collection/blob/master/README.md#nests)

Group data into arbitrary hierarchies.

* [d3.nest](https://github.com/d3/d3-collection/blob/master/README.md#nest) - create a new nest generator.
* [*nest*.key](https://github.com/d3/d3-collection/blob/master/README.md#nest_key) - add a level to the nest hierarchy.
* [*nest*.sortKeys](https://github.com/d3/d3-collection/blob/master/README.md#nest_sortKeys) - sort the current nest level by key.
* [*nest*.sortValues](https://github.com/d3/d3-collection/blob/master/README.md#nest_sortValues) - sort the leaf nest level by value.
* [*nest*.rollup](https://github.com/d3/d3-collection/blob/master/README.md#nest_rollup) - specify a rollup function for leaf values.
* [*nest*.map](https://github.com/d3/d3-collection/blob/master/README.md#nest_map) - generate the nest, returning a map.
* [*nest*.object](https://github.com/d3/d3-collection/blob/master/README.md#nest_object) - generate the nest, returning an associative array.
* [*nest*.entries](https://github.com/d3/d3-collection/blob/master/README.md#nest_entries) - generate the nest, returning an array of key-values tuples.

## [Colors (d3-color)](https://github.com/d3/d3-color)

Color manipulation and color space conversion.

* [d3.color](https://github.com/d3/d3-color/blob/master/README.md#color) - parse the given CSS color specifier.
* [*color*.rgb](https://github.com/d3/d3-color/blob/master/README.md#color_rgb) - compute the RGB equivalent of this color.
* [*color*.brighter](https://github.com/d3/d3-color/blob/master/README.md#color_brighter) - create a brighter copy of this color.
* [*color*.darker](https://github.com/d3/d3-color/blob/master/README.md#color_darker) - create a darker copy of this color.
* [*color*.displayable](https://github.com/d3/d3-color/blob/master/README.md#color_displayable) - returns true if the color is displayable on standard hardware.
* [*color*.toString](https://github.com/d3/d3-color/blob/master/README.md#color_toString) - format the color as an RGB hexadecimal string.
* [d3.rgb](https://github.com/d3/d3-color/blob/master/README.md#rgb) - create a new RGB color.
* [d3.hsl](https://github.com/d3/d3-color/blob/master/README.md#hsl) - create a new HSL color.
* [d3.lab](https://github.com/d3/d3-color/blob/master/README.md#lab) - create a new Lab color.
* [d3.hcl](https://github.com/d3/d3-color/blob/master/README.md#hcl) - create a new HCL color.
* [d3.cubehelix](https://github.com/d3/d3-color/blob/master/README.md#cubehelix) - create a new Cubehelix color.

## [Dispatches (d3-dispatch)](https://github.com/d3/d3-dispatch)

Separate concerns using named callbacks.

* [d3.dispatch](https://github.com/d3/d3-dispatch/blob/master/README.md#dispatch) - create a custom event dispatcher.
* [*dispatch*.on](https://github.com/d3/d3-dispatch/blob/master/README.md#dispatch_on) - register or unregister an event listener.
* [*dispatch*.copy](https://github.com/d3/d3-dispatch/blob/master/README.md#dispatch_copy) - create a copy of a dispatcher.
* [*dispatch*.*call*](https://github.com/d3/d3-dispatch/blob/master/README.md#dispatch_call) - dispatch an event to registered listeners.
* [*dispatch*.*apply*](https://github.com/d3/d3-dispatch/blob/master/README.md#dispatch_apply) - dispatch an event to registered listeners.

## [Dragging (d3-drag)](https://github.com/d3/d3-drag)

Drag and drop SVG, HTML or Canvas using mouse or touch input.

* [d3.drag](https://github.com/d3/d3-drag/blob/master/README.md#drag) - create a drag behavior.
* [*drag*](https://github.com/d3/d3-drag/blob/master/README.md#_drag) - apply the drag behavior to a selection.
* [*drag*.container](https://github.com/d3/d3-drag/blob/master/README.md#drag_container) - set the coordinate system.
* [*drag*.filter](https://github.com/d3/d3-drag/blob/master/README.md#drag_filter) - ignore some initiating input events.
* [*drag*.subject](https://github.com/d3/d3-drag/blob/master/README.md#drag_subject) - set the thing being dragged.
* [*drag*.on](https://github.com/d3/d3-drag/blob/master/README.md#drag_on) - listen for drag events.
* [*event*.on](https://github.com/d3/d3-drag/blob/master/README.md#event_on) - listen for drag events on the current gesture.
* [d3.dragDisable](https://github.com/d3/d3-drag/blob/master/README.md#dragDisable) -
* [d3.dragEnable](https://github.com/d3/d3-drag/blob/master/README.md#dragEnable) -

## [Delimiter-Separated Values (d3-dsv)](https://github.com/d3/d3-dsv)

Parse and format delimiter-separated values, most commonly CSV and TSV.

* [d3.dsvFormat](https://github.com/d3/d3-dsv/blob/master/README.md#dsvFormat) - create a new parser and formatter for the given delimiter.
* [*dsv*.parse](https://github.com/d3/d3-dsv/blob/master/README.md#dsv_parse) - parse the given string, returning an array of objects.
* [*dsv*.parseRows](https://github.com/d3/d3-dsv/blob/master/README.md#dsv_parseRows) - parse the given string, returning an array of rows.
* [*dsv*.format](https://github.com/d3/d3-dsv/blob/master/README.md#dsv_format) - format the given array of objects.
* [*dsv*.formatRows](https://github.com/d3/d3-dsv/blob/master/README.md#dsv_formatRows) - format the given array of rows.
* [d3.csvParse](https://github.com/d3/d3-dsv/blob/master/README.md#csvParse) - parse the given CSV string, returning an array of objects.
* [d3.csvParseRows](https://github.com/d3/d3-dsv/blob/master/README.md#csvParseRows) - parse the given CSV string, returning an array of rows.
* [d3.csvFormat](https://github.com/d3/d3-dsv/blob/master/README.md#csvFormat) - format the given array of objects as CSV.
* [d3.csvFormatRows](https://github.com/d3/d3-dsv/blob/master/README.md#csvFormatRows) - format the given array of rows as CSV.
* [d3.tsvParse](https://github.com/d3/d3-dsv/blob/master/README.md#tsvParse) - parse the given TSV string, returning an array of objects.
* [d3.tsvParseRows](https://github.com/d3/d3-dsv/blob/master/README.md#tsvParseRows) - parse the given TSV string, returning an array of rows.
* [d3.tsvFormat](https://github.com/d3/d3-dsv/blob/master/README.md#tsvFormat) - format the given array of objects as TSV.
* [d3.tsvFormatRows](https://github.com/d3/d3-dsv/blob/master/README.md#tsvFormatRows) - format the given array of rows as TSV.

## [Easings (d3-ease)](https://github.com/d3/d3-ease)

Easing functions for smooth animation.

* [*ease*](https://github.com/d3/d3-ease/blob/master/README.md#_ease) - ease the given normalized time.
* [d3.easeLinear](https://github.com/d3/d3-ease/blob/master/README.md#easeLinear) - linear easing; the identity function.
* [d3.easePolyIn](https://github.com/d3/d3-ease/blob/master/README.md#easePolyIn) - polynomial easing; raises time to the given power.
* [d3.easePolyOut](https://github.com/d3/d3-ease/blob/master/README.md#easePolyOut) - reverse polynomial easing.
* [d3.easePolyInOut](https://github.com/d3/d3-ease/blob/master/README.md#easePolyInOut) - symmetric polynomial easing.
* [*poly*.exponent](https://github.com/d3/d3-ease/blob/master/README.md#poly_exponent) - specify the polynomial exponent.
* [d3.easeQuad](https://github.com/d3/d3-ease/blob/master/README.md#easeQuad) - an alias for easeQuadInOut.
* [d3.easeQuadIn](https://github.com/d3/d3-ease/blob/master/README.md#easeQuadIn) - quadratic easing; squares time.
* [d3.easeQuadOut](https://github.com/d3/d3-ease/blob/master/README.md#easeQuadOut) - reverse quadratic easing.
* [d3.easeQuadInOut](https://github.com/d3/d3-ease/blob/master/README.md#easeQuadInOut) - symmetric quadratic easing.
* [d3.easeCubic](https://github.com/d3/d3-ease/blob/master/README.md#easeCubic) - an alias for easeCubicInOut.
* [d3.easeCubicIn](https://github.com/d3/d3-ease/blob/master/README.md#easeCubicIn) - cubic easing; cubes time.
* [d3.easeCubicOut](https://github.com/d3/d3-ease/blob/master/README.md#easeCubicOut) - reverse cubic easing.
* [d3.easeCubicInOut](https://github.com/d3/d3-ease/blob/master/README.md#easeCubicInOut) - symmetric cubic easing.
* [d3.easeSin](https://github.com/d3/d3-ease/blob/master/README.md#easeSin) - an alias for easeSinInOut.
* [d3.easeSinIn](https://github.com/d3/d3-ease/blob/master/README.md#easeSinIn) - sinusoidal easing.
* [d3.easeSinOut](https://github.com/d3/d3-ease/blob/master/README.md#easeSinOut) - reverse sinusoidal easing.
* [d3.easeSinInOut](https://github.com/d3/d3-ease/blob/master/README.md#easeSinInOut) - symmetric sinusoidal easing.
* [d3.easeExp](https://github.com/d3/d3-ease/blob/master/README.md#easeExp) - an alias for easeExpInOut.
* [d3.easeExpIn](https://github.com/d3/d3-ease/blob/master/README.md#easeExpIn) - exponential easing.
* [d3.easeExpOut](https://github.com/d3/d3-ease/blob/master/README.md#easeExpOut) - reverse exponential easing.
* [d3.easeExpInOut](https://github.com/d3/d3-ease/blob/master/README.md#easeExpInOut) - symmetric exponential easing.
* [d3.easeCircle](https://github.com/d3/d3-ease/blob/master/README.md#easeCircle) - an alias for easeCircleInOut.
* [d3.easeCircleIn](https://github.com/d3/d3-ease/blob/master/README.md#easeCircleIn) - circular easing.
* [d3.easeCircleOut](https://github.com/d3/d3-ease/blob/master/README.md#easeCircleOut) - reverse circular easing.
* [d3.easeCircleInOut](https://github.com/d3/d3-ease/blob/master/README.md#easeCircleInOut) - symmetric circular easing.
* [d3.easeElastic](https://github.com/d3/d3-ease/blob/master/README.md#easeElastic) - an alias for easeElasticOut.
* [d3.easeElasticIn](https://github.com/d3/d3-ease/blob/master/README.md#easeElasticIn) - elastic easing, like a rubber band.
* [d3.easeElasticOut](https://github.com/d3/d3-ease/blob/master/README.md#easeElasticOut) - reverse elastic easing.
* [d3.easeElasticInOut](https://github.com/d3/d3-ease/blob/master/README.md#easeElasticInOut) - symmetric elastic easing.
* [*elastic*.amplitude](https://github.com/d3/d3-ease/blob/master/README.md#elastic_amplitude) - specify the elastic amplitude.
* [*elastic*.period](https://github.com/d3/d3-ease/blob/master/README.md#elastic_period) - specify the elastic period.
* [d3.easeBack](https://github.com/d3/d3-ease/blob/master/README.md#easeBack) - an alias for easeBackInOut.
* [d3.easeBackIn](https://github.com/d3/d3-ease/blob/master/README.md#easeBackIn) - anticipatory easing, like a dancer bending his knees before jumping.
* [d3.easeBackOut](https://github.com/d3/d3-ease/blob/master/README.md#easeBackOut) - reverse anticipatory easing.
* [d3.easeBackInOut](https://github.com/d3/d3-ease/blob/master/README.md#easeBackInOut) - symmetric anticipatory easing.
* [*back*.overshoot](https://github.com/d3/d3-ease/blob/master/README.md#back_overshoot) - specify the amount of overshoot.
* [d3.easeBounce](https://github.com/d3/d3-ease/blob/master/README.md#easeBounce) - an alias for easeBounceOut.
* [d3.easeBounceIn](https://github.com/d3/d3-ease/blob/master/README.md#easeBounceIn) - bounce easing, like a rubber ball.
* [d3.easeBounceOut](https://github.com/d3/d3-ease/blob/master/README.md#easeBounceOut) - reverse bounce easing.
* [d3.easeBounceInOut](https://github.com/d3/d3-ease/blob/master/README.md#easeBounceInOut) - symmetric bounce easing.

## [Forces (d3-force)](https://github.com/d3/d3-force)

Force-directed graph layout using velocity Verlet integration.

* [d3.forceSimulation](https://github.com/d3/d3-force/blob/master/README.md#forceSimulation) - create a new force simulation.
* [*simulation*.restart](https://github.com/d3/d3-force/blob/master/README.md#simulation_restart) - reheat and restart the simulation’s timer.
* [*simulation*.stop](https://github.com/d3/d3-force/blob/master/README.md#simulation_stop) - stop the simulation’s timer.
* [*simulation*.tick](https://github.com/d3/d3-force/blob/master/README.md#simulation_tick) - advance the simulation one step.
* [*simulation*.nodes](https://github.com/d3/d3-force/blob/master/README.md#simulation_nodes) - set the simulation’s nodes.
* [*simulation*.alpha](https://github.com/d3/d3-force/blob/master/README.md#simulation_alpha) - set the current alpha.
* [*simulation*.alphaMin](https://github.com/d3/d3-force/blob/master/README.md#simulation_alphaMin) - set the minimum alpha threshold.
* [*simulation*.alphaDecay](https://github.com/d3/d3-force/blob/master/README.md#simulation_alphaDecay) - set the alpha exponential decay rate.
* [*simulation*.alphaTarget](https://github.com/d3/d3-force/blob/master/README.md#simulation_alphaTarget) - set the target alpha.
* [*simulation*.velocityDecay](https://github.com/d3/d3-force/blob/master/README.md#simulation_velocityDecay) - set the velocity decay rate.
* [*simulation*.force](https://github.com/d3/d3-force/blob/master/README.md#simulation_force) - add or remove a force.
* [*simulation*.find](https://github.com/d3/d3-force/blob/master/README.md#simulation_find) - find the closest node to the given position.
* [*simulation*.on](https://github.com/d3/d3-force/blob/master/README.md#simulation_on) - add or remove an event listener.
* [*force*](https://github.com/d3/d3-force/blob/master/README.md#_force) - apply the force.
* [*force*.initialize](https://github.com/d3/d3-force/blob/master/README.md#force_initialize) - initialize the force with the given nodes.
* [d3.forceCenter](https://github.com/d3/d3-force/blob/master/README.md#forceCenter) - create a centering force.
* [*center*.x](https://github.com/d3/d3-force/blob/master/README.md#center_x) - set the center *x*-coordinate.
* [*center*.y](https://github.com/d3/d3-force/blob/master/README.md#center_y) - set the center *y*-coordinate.
* [d3.forceCollide](https://github.com/d3/d3-force/blob/master/README.md#forceCollide) - create a circle collision force.
* [*collide*.radius](https://github.com/d3/d3-force/blob/master/README.md#collide_radius) - set the circle radius.
* [*collide*.strength](https://github.com/d3/d3-force/blob/master/README.md#collide_strength) - set the collision resolution strength.
* [*collide*.iterations](https://github.com/d3/d3-force/blob/master/README.md#collide_iterations) - set the number of iterations.
* [d3.forceLink](https://github.com/d3/d3-force/blob/master/README.md#forceLink) - create a link force.
* [*link*.links](https://github.com/d3/d3-force/blob/master/README.md#link_links) - set the array of links.
* [*link*.id](https://github.com/d3/d3-force/blob/master/README.md#link_id) - link nodes by numeric index or string identifier.
* [*link*.distance](https://github.com/d3/d3-force/blob/master/README.md#link_distance) - set the link distance.
* [*link*.strength](https://github.com/d3/d3-force/blob/master/README.md#link_strength) - set the link strength.
* [*link*.iterations](https://github.com/d3/d3-force/blob/master/README.md#link_iterations) - set the number of iterations.
* [d3.forceManyBody](https://github.com/d3/d3-force/blob/master/README.md#forceManyBody) - create a many-body force.
* [*manyBody*.strength](https://github.com/d3/d3-force/blob/master/README.md#manyBody_strength) - set the force strength.
* [*manyBody*.theta](https://github.com/d3/d3-force/blob/master/README.md#manyBody_theta) - set the Barnes–Hut approximation accuracy.
* [*manyBody*.distanceMin](https://github.com/d3/d3-force/blob/master/README.md#manyBody_distanceMin) - limit the force when nodes are close.
* [*manyBody*.distanceMax](https://github.com/d3/d3-force/blob/master/README.md#manyBody_distanceMax) - limit the force when nodes are far.
* [d3.forceX](https://github.com/d3/d3-force/blob/master/README.md#forceX) - create an *x*-positioning force.
* [*x*.strength](https://github.com/d3/d3-force/blob/master/README.md#x_strength) - set the force strength.
* [*x*.x](https://github.com/d3/d3-force/blob/master/README.md#x_x) - set the target *x*-coordinate.
* [d3.forceY](https://github.com/d3/d3-force/blob/master/README.md#forceY) - create an *y*-positioning force.
* [*y*.strength](https://github.com/d3/d3-force/blob/master/README.md#y_strength) - set the force strength.
* [*y*.y](https://github.com/d3/d3-force/blob/master/README.md#y_y) - set the target *y*-coordinate.

## [Number Formats (d3-format)](https://github.com/d3/d3-format)

Format numbers for human consumption.

* [d3.format](https://github.com/d3/d3-format/blob/master/README.md#format) - alias for *locale*.format on the default locale.
* [d3.formatPrefix](https://github.com/d3/d3-format/blob/master/README.md#formatPrefix) - alias for *locale*.formatPrefix on the default locale.
* [d3.formatSpecifier](https://github.com/d3/d3-format/blob/master/README.md#formatSpecifier) - parse a number format specifier.
* [d3.formatLocale](https://github.com/d3/d3-format/blob/master/README.md#formatLocale) - define a custom locale.
* [d3.formatDefaultLocale](https://github.com/d3/d3-format/blob/master/README.md#formatDefaultLocale) - define the default locale.
* [*locale*.format](https://github.com/d3/d3-format/blob/master/README.md#locale_format) - create a number format.
* [*locale*.formatPrefix](https://github.com/d3/d3-format/blob/master/README.md#locale_formatPrefix) - create a SI-prefix number format.
* [d3.precisionFixed](https://github.com/d3/d3-format/blob/master/README.md#precisionFixed) - compute decimal precision for fixed-point notation.
* [d3.precisionPrefix](https://github.com/d3/d3-format/blob/master/README.md#precisionPrefix) - compute decimal precision for SI-prefix notation.
* [d3.precisionRound](https://github.com/d3/d3-format/blob/master/README.md#precisionRound) - compute significant digits for rounded notation.

## [Geographies (d3-geo)](https://github.com/d3/d3-geo)

Geographic projections, shapes and math.

### [Paths](https://github.com/d3/d3-geo/blob/master/README.md#paths)

* [d3.geoPath](https://github.com/d3/d3-geo/blob/master/README.md#geoPath) - create a new geographic path generator.
* [*path*](https://github.com/d3/d3-geo/blob/master/README.md#_path) - project and render the specified feature.
* [*path*.area](https://github.com/d3/d3-geo/blob/master/README.md#path_area) - compute the projected planar area of a given feature.
* [*path*.bounds](https://github.com/d3/d3-geo/blob/master/README.md#path_bounds) - compute the projected planar bounding box of a given feature.
* [*path*.centroid](https://github.com/d3/d3-geo/blob/master/README.md#path_centroid) - compute the projected planar centroid of a given feature.
* [*path*.projection](https://github.com/d3/d3-geo/blob/master/README.md#path_projection) - set the geographic projection.
* [*path*.context](https://github.com/d3/d3-geo/blob/master/README.md#path_context) - set the render context.
* [*path*.pointRadius](https://github.com/d3/d3-geo/blob/master/README.md#path_pointRadius) - set the radius to display point features.

### [Projections](https://github.com/d3/d3-geo/blob/master/README.md#projections)

* [*projection*](https://github.com/d3/d3-geo/blob/master/README.md#_projection) - project the specified point from the sphere to the plane.
* [*projection*.invert](https://github.com/d3/d3-geo/blob/master/README.md#projection_invert) - unproject the specified point from the plane to the sphere.
* [*projection*.stream](https://github.com/d3/d3-geo/blob/master/README.md#projection_stream) - wrap the specified stream to project geometry.
* [*projection*.clipAngle](https://github.com/d3/d3-geo/blob/master/README.md#projection_clipAngle) - set the radius of the clip circle.
* [*projection*.clipExtent](https://github.com/d3/d3-geo/blob/master/README.md#projection_clipExtent) - set the viewport clip extent, in pixels.
* [*projection*.scale](https://github.com/d3/d3-geo/blob/master/README.md#projection_scale) - set the scale factor.
* [*projection*.translate](https://github.com/d3/d3-geo/blob/master/README.md#projection_translate) - set the translation offset.
* [*projection*.fitExtent](https://github.com/d3/d3-geo/blob/master/README.md#projection_fitExtent) - set the scale and translate to fit a GeoJSON object.
* [*projection*.fitSize](https://github.com/d3/d3-geo/blob/master/README.md#projection_fitSize) - set the scale and translate to fit a GeoJSON object.
* [*projection*.center](https://github.com/d3/d3-geo/blob/master/README.md#projection_center) - set the center point.
* [*projection*.rotate](https://github.com/d3/d3-geo/blob/master/README.md#projection_rotate) - set the three-axis spherical rotation angles.
* [*projection*.precision](https://github.com/d3/d3-geo/blob/master/README.md#projection_precision) - set the precision threshold for adaptive sampling.
* [d3.geoAlbers](https://github.com/d3/d3-geo/blob/master/README.md#geoAlbers) - the Albers equal-area conic projection.
* [d3.geoAlbersUsa](https://github.com/d3/d3-geo/blob/master/README.md#geoAlbersUsa) - a composite Albers projection for the United States.
* [d3.geoAzimuthalEqualArea](https://github.com/d3/d3-geo/blob/master/README.md#geoAzimuthalEqualArea) - the azimuthal equal-area projection.
* [d3.geoAzimuthalEquidistant](https://github.com/d3/d3-geo/blob/master/README.md#geoAzimuthalEquidistant) - the azimuthal equidistant projection.
* [d3.geoConicConformal](https://github.com/d3/d3-geo/blob/master/README.md#geoConicConformal) - the conic conformal projection.
* [d3.geoConicEqualArea](https://github.com/d3/d3-geo/blob/master/README.md#geoConicEqualArea) - the conic equal-area (Albers) projection.
* [d3.geoConicEquidistant](https://github.com/d3/d3-geo/blob/master/README.md#geoConicEquidistant) - the conic equidistant projection.
* [*conic*.parallels](https://github.com/d3/d3-geo/blob/master/README.md#conic_parallels) - set the two standard parallels.
* [d3.geoEquirectangular](https://github.com/d3/d3-geo/blob/master/README.md#geoEquirectangular) - the equirectangular (plate carreé) projection.
* [d3.geoGnomonic](https://github.com/d3/d3-geo/blob/master/README.md#geoGnomonic) - the gnomonic projection.
* [d3.geoMercator](https://github.com/d3/d3-geo/blob/master/README.md#geoMercator) - the spherical Mercator projection.
* [d3.geoOrthographic](https://github.com/d3/d3-geo/blob/master/README.md#geoOrthographic) - the azimuthal orthographic projection.
* [d3.geoStereographic](https://github.com/d3/d3-geo/blob/master/README.md#geoStereographic) - the azimuthal stereographic projection.
* [d3.geoTransverseMercator](https://github.com/d3/d3-geo/blob/master/README.md#geoTransverseMercator) - the transverse spherical Mercator projection.
* [*project*](https://github.com/d3/d3-geo/blob/master/README.md#_project) - project the specified point from the sphere to the plane.
* [*project*.invert](https://github.com/d3/d3-geo/blob/master/README.md#project_invert) - unproject the specified point from the plane to the sphere.
* [d3.geoProjection](https://github.com/d3/d3-geo/blob/master/README.md#geoProjection) - create a custom projection.
* [d3.geoProjectionMutator](https://github.com/d3/d3-geo/blob/master/README.md#geoProjectionMutator) - create a custom configurable projection.
* [d3.geoAzimuthalEqualAreaRaw](https://github.com/d3/d3-geo/blob/master/README.md#geoAzimuthalEqualAreaRaw) -
* [d3.geoAzimuthalEquidistantRaw](https://github.com/d3/d3-geo/blob/master/README.md#geoAzimuthalEquidistantRaw) -
* [d3.geoConicConformalRaw](https://github.com/d3/d3-geo/blob/master/README.md#geoConicConformalRaw) -
* [d3.geoConicEqualAreaRaw](https://github.com/d3/d3-geo/blob/master/README.md#geoConicEqualAreaRaw) -
* [d3.geoConicEquidistantRaw](https://github.com/d3/d3-geo/blob/master/README.md#geoConicEquidistantRaw) -
* [d3.geoEquirectangularRaw](https://github.com/d3/d3-geo/blob/master/README.md#geoEquirectangularRaw) -
* [d3.geoGnomonicRaw](https://github.com/d3/d3-geo/blob/master/README.md#geoGnomonicRaw) -
* [d3.geoMercatorRaw](https://github.com/d3/d3-geo/blob/master/README.md#geoMercatorRaw) -
* [d3.geoOrthographicRaw](https://github.com/d3/d3-geo/blob/master/README.md#geoOrthographicRaw) -
* [d3.geoStereographicRaw](https://github.com/d3/d3-geo/blob/master/README.md#geoStereographicRaw) -
* [d3.geoTransverseMercatorRaw](https://github.com/d3/d3-geo/blob/master/README.md#geoTransverseMercatorRaw) -

### [Spherical Math](https://github.com/d3/d3-geo/blob/master/README.md#spherical-math)

* [d3.geoArea](https://github.com/d3/d3-geo/blob/master/README.md#geoArea) - compute the spherical area of a given feature.
* [d3.geoBounds](https://github.com/d3/d3-geo/blob/master/README.md#geoBounds) - compute the latitude-longitude bounding box for a given feature.
* [d3.geoCentroid](https://github.com/d3/d3-geo/blob/master/README.md#geoCentroid) - compute the spherical centroid of a given feature.
* [d3.geoDistance](https://github.com/d3/d3-geo/blob/master/README.md#geoDistance) - compute the great-arc distance between two points.
* [d3.geoLength](https://github.com/d3/d3-geo/blob/master/README.md#geoLength) - compute the length of a line string or the perimeter of a polygon.
* [d3.geoInterpolate](https://github.com/d3/d3-geo/blob/master/README.md#geoInterpolate) - interpolate between two points along a great arc.
* [d3.geoRotation](https://github.com/d3/d3-geo/blob/master/README.md#geoRotation) - create a rotation function for the specified angles.
* [*rotation*](https://github.com/d3/d3-geo/blob/master/README.md#_rotation) - rotate the given point around the sphere.
* [*rotation*.invert](https://github.com/d3/d3-geo/blob/master/README.md#rotation_invert) - unrotate the given point around the sphere.

### [Spherical Shapes](https://github.com/d3/d3-geo/blob/master/README.md#spherical-shapes)

* [d3.geoCircle](https://github.com/d3/d3-geo/blob/master/README.md#geoCircle) - create a circle generator.
* [*circle*](https://github.com/d3/d3-geo/blob/master/README.md#_circle) - generate a piecewise circle as a Polygon.
* [*circle*.center](https://github.com/d3/d3-geo/blob/master/README.md#circle_center) - specify the circle center in latitude and longitude.
* [*circle*.radius](https://github.com/d3/d3-geo/blob/master/README.md#circle_radius) - specify the angular radius in degrees.
* [*circle*.precision](https://github.com/d3/d3-geo/blob/master/README.md#circle_precision) - specify the precision of the piecewise circle.
* [d3.geoGraticule](https://github.com/d3/d3-geo/blob/master/README.md#geoGraticule) - create a graticule generator.
* [*graticule*](https://github.com/d3/d3-geo/blob/master/README.md#_graticule) - generate a MultiLineString of meridians and parallels.
* [*graticule*.lines](https://github.com/d3/d3-geo/blob/master/README.md#graticule_lines) - generate an array of LineStrings of meridians and parallels.
* [*graticule*.outline](https://github.com/d3/d3-geo/blob/master/README.md#graticule_outline) - generate a Polygon of the graticule’s extent.
* [*graticule*.extent](https://github.com/d3/d3-geo/blob/master/README.md#graticule_extent) - get or set the major & minor extents.
* [*graticule*.extentMajor](https://github.com/d3/d3-geo/blob/master/README.md#graticule_extentMajor) - get or set the major extent.
* [*graticule*.extentMinor](https://github.com/d3/d3-geo/blob/master/README.md#graticule_extentMinor) - get or set the minor extent.
* [*graticule*.step](https://github.com/d3/d3-geo/blob/master/README.md#graticule_step) - get or set the major & minor step intervals.
* [*graticule*.stepMajor](https://github.com/d3/d3-geo/blob/master/README.md#graticule_stepMajor) - get or set the major step intervals.
* [*graticule*.stepMinor](https://github.com/d3/d3-geo/blob/master/README.md#graticule_stepMinor) - get or set the minor step intervals.
* [*graticule*.precision](https://github.com/d3/d3-geo/blob/master/README.md#graticule_precision) - get or set the latitudinal precision.
* [d3.geoGraticule10](https://github.com/d3/d3-geo/blob/master/README.md#geoGraticule10) - generate the default 10° global graticule.

#### [Streams](https://github.com/d3/d3-geo/blob/master/README.md#streams)

* [d3.geoStream](https://github.com/d3/d3-geo/blob/master/README.md#geoStream) - convert a GeoJSON object to a geometry stream.
* [*stream*.point](https://github.com/d3/d3-geo/blob/master/README.md#stream_point) -
* [*stream*.lineStart](https://github.com/d3/d3-geo/blob/master/README.md#stream_lineStart) -
* [*stream*.lineEnd](https://github.com/d3/d3-geo/blob/master/README.md#stream_lineEnd) -
* [*stream*.polygonStart](https://github.com/d3/d3-geo/blob/master/README.md#stream_polygonStart) -
* [*stream*.polygonEnd](https://github.com/d3/d3-geo/blob/master/README.md#stream_polygonEnd) -
* [*stream*.sphere](https://github.com/d3/d3-geo/blob/master/README.md#stream_sphere) -

#### [Transforms](https://github.com/d3/d3-geo/blob/master/README.md#transforms)

* [d3.geoIdentity](https://github.com/d3/d3-geo/blob/master/README.md#geoIdentity) - scale, translate or clip planar geometry.
* [d3.geoTransform](https://github.com/d3/d3-geo/blob/master/README.md#geoTransform) - define a custom geometry transform.

## [Hierarchies (d3-hierarchy)](https://github.com/d3/d3-hierarchy)

Layout algorithms for visualizing hierarchical data.

* [d3.hierarchy](https://github.com/d3/d3-hierarchy/blob/master/README.md#hierarchy) - constructs a root node from hierarchical data.
* [*node*.ancestors](https://github.com/d3/d3-hierarchy/blob/master/README.md#node_ancestors) - generate an array of ancestors.
* [*node*.descendants](https://github.com/d3/d3-hierarchy/blob/master/README.md#node_descendants) - generate an array of descendants.
* [*node*.leaves](https://github.com/d3/d3-hierarchy/blob/master/README.md#node_leaves) - generate an array of leaves.
* [*node*.path](https://github.com/d3/d3-hierarchy/blob/master/README.md#node_path) - generate the shortest path to another node.
* [*node*.links](https://github.com/d3/d3-hierarchy/blob/master/README.md#node_links) - generate an array of links.
* [*node*.sum](https://github.com/d3/d3-hierarchy/blob/master/README.md#node_sum) - evaluate and aggregate quantitative values.
* [*node*.sort](https://github.com/d3/d3-hierarchy/blob/master/README.md#node_sort) - sort all descendant siblings.
* [*node*.each](https://github.com/d3/d3-hierarchy/blob/master/README.md#node_each) - breadth-first traversal.
* [*node*.eachAfter](https://github.com/d3/d3-hierarchy/blob/master/README.md#node_eachAfter) - post-order traversal.
* [*node*.eachBefore](https://github.com/d3/d3-hierarchy/blob/master/README.md#node_eachBefore) - pre-order traversal.
* [*node*.copy](https://github.com/d3/d3-hierarchy/blob/master/README.md#node_copy) - copy a hierarchy.
* [d3.stratify](https://github.com/d3/d3-hierarchy/blob/master/README.md#stratify) - create a new stratify operator.
* [*stratify*](https://github.com/d3/d3-hierarchy/blob/master/README.md#_stratify) - construct a root node from tabular data.
* [*stratify*.id](https://github.com/d3/d3-hierarchy/blob/master/README.md#stratify_id) - set the node id accessor.
* [*stratify*.parentId](https://github.com/d3/d3-hierarchy/blob/master/README.md#stratify_parentId) - set the parent node id accessor.
* [d3.cluster](https://github.com/d3/d3-hierarchy/blob/master/README.md#cluster) - create a new cluster (dendrogram) layout.
* [*cluster*](https://github.com/d3/d3-hierarchy/blob/master/README.md#_cluster) - layout the specified hierarchy in a dendrogram.
* [*cluster*.size](https://github.com/d3/d3-hierarchy/blob/master/README.md#cluster_size) - set the layout size.
* [*cluster*.nodeSize](https://github.com/d3/d3-hierarchy/blob/master/README.md#cluster_nodeSize) - set the node size.
* [*cluster*.separation](https://github.com/d3/d3-hierarchy/blob/master/README.md#cluster_separation) - set the separation between leaves.
* [d3.tree](https://github.com/d3/d3-hierarchy/blob/master/README.md#tree) - create a new tidy tree layout.
* [*tree*](https://github.com/d3/d3-hierarchy/blob/master/README.md#_tree) - layout the specified hierarchy in a tidy tree.
* [*tree*.size](https://github.com/d3/d3-hierarchy/blob/master/README.md#tree_size) - set the layout size.
* [*tree*.nodeSize](https://github.com/d3/d3-hierarchy/blob/master/README.md#tree_nodeSize) - set the node size.
* [*tree*.separation](https://github.com/d3/d3-hierarchy/blob/master/README.md#tree_separation) - set the separation between nodes.
* [d3.treemap](https://github.com/d3/d3-hierarchy/blob/master/README.md#treemap) - create a new treemap layout.
* [*treemap*](https://github.com/d3/d3-hierarchy/blob/master/README.md#_treemap) - layout the specified hierarchy as a treemap.
* [*treemap*.tile](https://github.com/d3/d3-hierarchy/blob/master/README.md#treemap_tile) - set the tiling method.
* [*treemap*.size](https://github.com/d3/d3-hierarchy/blob/master/README.md#treemap_size) - set the layout size.
* [*treemap*.round](https://github.com/d3/d3-hierarchy/blob/master/README.md#treemap_round) - set whether the output coordinates are rounded.
* [*treemap*.padding](https://github.com/d3/d3-hierarchy/blob/master/README.md#treemap_padding) - set the padding.
* [*treemap*.paddingInner](https://github.com/d3/d3-hierarchy/blob/master/README.md#treemap_paddingInner) - set the padding between siblings.
* [*treemap*.paddingOuter](https://github.com/d3/d3-hierarchy/blob/master/README.md#treemap_paddingOuter) - set the padding between parent and children.
* [*treemap*.paddingTop](https://github.com/d3/d3-hierarchy/blob/master/README.md#treemap_paddingTop) - set the padding between the parent’s top edge and children.
* [*treemap*.paddingRight](https://github.com/d3/d3-hierarchy/blob/master/README.md#treemap_paddingRight) - set the padding between the parent’s right edge and children.
* [*treemap*.paddingBottom](https://github.com/d3/d3-hierarchy/blob/master/README.md#treemap_paddingBottom) - set the padding between the parent’s bottom edge and children.
* [*treemap*.paddingLeft](https://github.com/d3/d3-hierarchy/blob/master/README.md#treemap_paddingLeft) - set the padding between the parent’s left edge and children.
* [d3.treemapBinary](https://github.com/d3/d3-hierarchy/blob/master/README.md#treemapBinary) - tile using a balanced binary tree.
* [d3.treemapDice](https://github.com/d3/d3-hierarchy/blob/master/README.md#treemapDice) - tile into a horizontal row.
* [d3.treemapSlice](https://github.com/d3/d3-hierarchy/blob/master/README.md#treemapSlice) - tile into a vertical column.
* [d3.treemapSliceDice](https://github.com/d3/d3-hierarchy/blob/master/README.md#treemapSliceDice) - alternate between slicing and dicing.
* [d3.treemapSquarify](https://github.com/d3/d3-hierarchy/blob/master/README.md#treemapSquarify) - tile using squarified rows per Bruls *et. al.*
* [d3.treemapResquarify](https://github.com/d3/d3-hierarchy/blob/master/README.md#treemapResquarify) - like d3.treemapSquarify, but performs stable updates.
* [*squarify*.ratio](https://github.com/d3/d3-hierarchy/blob/master/README.md#squarify_ratio) - set the desired rectangle aspect ratio.
* [d3.partition](https://github.com/d3/d3-hierarchy/blob/master/README.md#partition) - create a new partition (icicle or sunburst) layout.
* [*partition*](https://github.com/d3/d3-hierarchy/blob/master/README.md#_partition) - layout the specified hierarchy as a partition diagram.
* [*partition*.size](https://github.com/d3/d3-hierarchy/blob/master/README.md#partition_size) - set the layout size.
* [*partition*.round](https://github.com/d3/d3-hierarchy/blob/master/README.md#partition_round) - set whether the output coordinates are rounded.
* [*partition*.padding](https://github.com/d3/d3-hierarchy/blob/master/README.md#partition_padding) - set the padding.
* [d3.pack](https://github.com/d3/d3-hierarchy/blob/master/README.md#pack) - create a new circle-packing layout.
* [*pack*](https://github.com/d3/d3-hierarchy/blob/master/README.md#_pack) - layout the specified hierarchy using circle-packing.
* [*pack*.radius](https://github.com/d3/d3-hierarchy/blob/master/README.md#pack_radius) - set the radius accessor.
* [*pack*.size](https://github.com/d3/d3-hierarchy/blob/master/README.md#pack_size) - set the layout size.
* [*pack*.padding](https://github.com/d3/d3-hierarchy/blob/master/README.md#pack_padding) - set the padding.
* [d3.packSiblings](https://github.com/d3/d3-hierarchy/blob/master/README.md#packSiblings) - pack the specified array of circles.
* [d3.packEnclose](https://github.com/d3/d3-hierarchy/blob/master/README.md#packEnclose) - enclose the specified array of circles.

## [Interpolators (d3-interpolate)](https://github.com/d3/d3-interpolate)

Interpolate numbers, colors, strings, arrays, objects, whatever!

* [d3.interpolate](https://github.com/d3/d3-interpolate/blob/master/README.md#interpolate) - interpolate arbitrary values.
* [d3.interpolateArray](https://github.com/d3/d3-interpolate/blob/master/README.md#interpolateArray) - interpolate arrays of arbitrary values.
* [d3.interpolateDate](https://github.com/d3/d3-interpolate/blob/master/README.md#interpolateDate) - interpolate dates.
* [d3.interpolateNumber](https://github.com/d3/d3-interpolate/blob/master/README.md#interpolateNumber) - interpolate numbers.
* [d3.interpolateObject](https://github.com/d3/d3-interpolate/blob/master/README.md#interpolateObject) - interpolate arbitrary objects.
* [d3.interpolateRound](https://github.com/d3/d3-interpolate/blob/master/README.md#interpolateRound) - interpolate integers.
* [d3.interpolateString](https://github.com/d3/d3-interpolate/blob/master/README.md#interpolateString) - interpolate strings with embedded numbers.
* [d3.interpolateTransformCss](https://github.com/d3/d3-interpolate/blob/master/README.md#interpolateTransformCss) - interpolate 2D CSS transforms.
* [d3.interpolateTransformSvg](https://github.com/d3/d3-interpolate/blob/master/README.md#interpolateTransformSvg) - interpolate 2D SVG transforms.
* [d3.interpolateZoom](https://github.com/d3/d3-interpolate/blob/master/README.md#interpolateZoom) - zoom and pan between two views.
* [d3.interpolateRgb](https://github.com/d3/d3-interpolate/blob/master/README.md#interpolateRgb) - interpolate RGB colors.
* [d3.interpolateRgbBasis](https://github.com/d3/d3-interpolate/blob/master/README.md#interpolateRgbBasis) - generate a B-spline through a set of colors.
* [d3.interpolateRgbBasisClosed](https://github.com/d3/d3-interpolate/blob/master/README.md#interpolateRgbBasisClosed) - generate a closed B-spline through a set of colors.
* [d3.interpolateHsl](https://github.com/d3/d3-interpolate/blob/master/README.md#interpolateHsl) - interpolate HSL colors.
* [d3.interpolateHslLong](https://github.com/d3/d3-interpolate/blob/master/README.md#interpolateHslLong) - interpolate HSL colors, the long way.
* [d3.interpolateLab](https://github.com/d3/d3-interpolate/blob/master/README.md#interpolateLab) - interpolate Lab colors.
* [d3.interpolateHcl](https://github.com/d3/d3-interpolate/blob/master/README.md#interpolateHcl) - interpolate HCL colors.
* [d3.interpolateHclLong](https://github.com/d3/d3-interpolate/blob/master/README.md#interpolateHclLong) - interpolate HCL colors, the long way.
* [d3.interpolateCubehelix](https://github.com/d3/d3-interpolate/blob/master/README.md#interpolateCubehelix) - interpolate Cubehelix colors.
* [d3.interpolateCubehelixLong](https://github.com/d3/d3-interpolate/blob/master/README.md#interpolateCubehelixLong) - interpolate Cubehelix colors, the long way.
* [*interpolate*.gamma](https://github.com/d3/d3-interpolate/blob/master/README.md#interpolate_gamma) - apply gamma correction during interpolation.
* [d3.interpolateBasis](https://github.com/d3/d3-interpolate/blob/master/README.md#interpolateBasis) - generate a B-spline through a set of values.
* [d3.interpolateBasisClosed](https://github.com/d3/d3-interpolate/blob/master/README.md#interpolateBasisClosed) - generate a closed B-spline through a set of values.
* [d3.quantize](https://github.com/d3/d3-interpolate/blob/master/README.md#quantize) - generate uniformly-spaced samples from an interpolator.

## [Paths (d3-path)](https://github.com/d3/d3-path)

Serialize Canvas path commands to SVG.

* [d3.path](https://github.com/d3/d3-path/blob/master/README.md#path) - create a new path serializer.
* [*path*.moveTo](https://github.com/d3/d3-path/blob/master/README.md#path_moveTo) - move to the given point.
* [*path*.closePath](https://github.com/d3/d3-path/blob/master/README.md#path_closePath) - close the current subpath.
* [*path*.lineTo](https://github.com/d3/d3-path/blob/master/README.md#path_lineTo) - draw a straight line segment.
* [*path*.quadraticCurveTo](https://github.com/d3/d3-path/blob/master/README.md#path_quadraticCurveTo) - draw a quadratic Bézier segment.
* [*path*.bezierCurveTo](https://github.com/d3/d3-path/blob/master/README.md#path_bezierCurveTo) - draw a cubic Bézier segment.
* [*path*.arcTo](https://github.com/d3/d3-path/blob/master/README.md#path_arcTo) - draw a circular arc segment.
* [*path*.arc](https://github.com/d3/d3-path/blob/master/README.md#path_arc) - draw a circular arc segment.
* [*path*.rect](https://github.com/d3/d3-path/blob/master/README.md#path_rect) - draw a rectangle.
* [*path*.toString](https://github.com/d3/d3-path/blob/master/README.md#path_toString) - serialize to an SVG path data string.

## [Polygons (d3-polygon)](https://github.com/d3/d3-polygon)

Geometric operations for two-dimensional polygons.

* [d3.polygonArea](https://github.com/d3/d3-polygon/blob/master/README.md#polygonArea) - compute the area of the given polygon.
* [d3.polygonCentroid](https://github.com/d3/d3-polygon/blob/master/README.md#polygonCentroid) - compute the centroid of the given polygon.
* [d3.polygonHull](https://github.com/d3/d3-polygon/blob/master/README.md#polygonHull) - compute the convex hull of the given points.
* [d3.polygonContains](https://github.com/d3/d3-polygon/blob/master/README.md#polygonContains) - test whether a point is inside a polygon.
* [d3.polygonLength](https://github.com/d3/d3-polygon/blob/master/README.md#polygonLength) - compute the length of the given polygon’s perimeter.

## [Quadtrees (d3-quadtree)](https://github.com/d3/d3-quadtree)

Two-dimensional recursive spatial subdivision.

* [d3.quadtree](https://github.com/d3/d3-quadtree/blob/master/README.md#quadtree) - create a new, empty quadtree.
* [*quadtree*.x](https://github.com/d3/d3-quadtree/blob/master/README.md#quadtree_x) - set the *x* accessor.
* [*quadtree*.y](https://github.com/d3/d3-quadtree/blob/master/README.md#quadtree_y) - set the *y* accessor.
* [*quadtree*.add](https://github.com/d3/d3-quadtree/blob/master/README.md#quadtree_add) - add a datum to a quadtree.
* [*quadtree*.addAll](https://github.com/d3/d3-quadtree/blob/master/README.md#quadtree_addAll) -
* [*quadtree*.remove](https://github.com/d3/d3-quadtree/blob/master/README.md#quadtree_remove) - remove a datum from a quadtree.
* [*quadtree*.removeAll](https://github.com/d3/d3-quadtree/blob/master/README.md#quadtree_removeAll) -
* [*quadtree*.copy](https://github.com/d3/d3-quadtree/blob/master/README.md#quadtree_copy) - create a copy of a quadtree.
* [*quadtree*.root](https://github.com/d3/d3-quadtree/blob/master/README.md#quadtree_root) - get the quadtree’s root node.
* [*quadtree*.data](https://github.com/d3/d3-quadtree/blob/master/README.md#quadtree_data) - retrieve all data from the quadtree.
* [*quadtree*.size](https://github.com/d3/d3-quadtree/blob/master/README.md#quadtree_size) - count the number of data in the quadtree.
* [*quadtree*.find](https://github.com/d3/d3-quadtree/blob/master/README.md#quadtree_find) - quickly find the closest datum in a quadtree.
* [*quadtree*.visit](https://github.com/d3/d3-quadtree/blob/master/README.md#quadtree_visit) - selectively visit nodes in a quadtree.
* [*quadtree*.visitAfter](https://github.com/d3/d3-quadtree/blob/master/README.md#quadtree_visitAfter) - visit all nodes in a quadtree.
* [*quadtree*.cover](https://github.com/d3/d3-quadtree/blob/master/README.md#quadtree_cover) - extend the quadtree to cover a point.
* [*quadtree*.extent](https://github.com/d3/d3-quadtree/blob/master/README.md#quadtree_extent) - extend the quadtree to cover an extent.

## [Queues (d3-queue)](https://github.com/d3/d3-queue)

Evaluate asynchronous tasks with configurable concurrency.

* [d3.queue](https://github.com/d3/d3-queue/blob/master/README.md#queue) - manage the concurrent evaluation of asynchronous tasks.
* [*queue*.defer](https://github.com/d3/d3-queue/blob/master/README.md#queue_defer) - register a task for evaluation.
* [*queue*.abort](https://github.com/d3/d3-queue/blob/master/README.md#queue_abort) - abort any active tasks and cancel any pending ones.
* [*queue*.await](https://github.com/d3/d3-queue/blob/master/README.md#queue_await) - register a callback for when tasks complete.
* [*queue*.awaitAll](https://github.com/d3/d3-queue/blob/master/README.md#queue_awaitAll) - register a callback for when tasks complete.

## [Random Numbers (d3-random)](https://github.com/d3/d3-random)

Generate random numbers from various distributions.

* [d3.randomUniform](https://github.com/d3/d3-random/blob/master/README.md#randomUniform) - from a uniform distribution.
* [d3.randomNormal](https://github.com/d3/d3-random/blob/master/README.md#randomNormal) - from a normal distribution.
* [d3.randomLogNormal](https://github.com/d3/d3-random/blob/master/README.md#randomLogNormal) - from a log-normal distribution.
* [d3.randomBates](https://github.com/d3/d3-random/blob/master/README.md#randomBates) - from a Bates distribution.
* [d3.randomIrwinHall](https://github.com/d3/d3-random/blob/master/README.md#randomIrwinHall) - from an Irwin–Hall distribution.
* [d3.randomExponential](https://github.com/d3/d3-random/blob/master/README.md#randomExponential) - from an exponential distribution.

## [Requests (d3-request)](https://github.com/d3/d3-request)

A convenient alternative to asynchronous XMLHttpRequest.

* [d3.request](https://github.com/d3/d3-request/blob/master/README.md#request) - make an asynchronous request.
* [*request*.header](https://github.com/d3/d3-request/blob/master/README.md#request_header) - set a request header.
* [*request*.user](https://github.com/d3/d3-request/blob/master/README.md#request_user) - set the user for authentication.
* [*request*.password](https://github.com/d3/d3-request/blob/master/README.md#request_password) - set the password for authentication.
* [*request*.mimeType](https://github.com/d3/d3-request/blob/master/README.md#request_mimeType) - set the MIME type.
* [*request*.timeout](https://github.com/d3/d3-request/blob/master/README.md#request_timeout) - set the timeout in milliseconds.
* [*request*.responseType](https://github.com/d3/d3-request/blob/master/README.md#request_responseType) - set the response type.
* [*request*.response](https://github.com/d3/d3-request/blob/master/README.md#request_response) - set the response function.
* [*request*.get](https://github.com/d3/d3-request/blob/master/README.md#request_get) - send a GET request.
* [*request*.post](https://github.com/d3/d3-request/blob/master/README.md#request_post) - send a POST request.
* [*request*.send](https://github.com/d3/d3-request/blob/master/README.md#request_send) - set the request.
* [*request*.abort](https://github.com/d3/d3-request/blob/master/README.md#request_abort) - abort the request.
* [*request*.on](https://github.com/d3/d3-request/blob/master/README.md#request_on) - listen for a request event.
* [d3.csv](https://github.com/d3/d3-request/blob/master/README.md#csv) - get a comma-separated values (CSV) file.
* [d3.html](https://github.com/d3/d3-request/blob/master/README.md#html) - get an HTML file.
* [d3.json](https://github.com/d3/d3-request/blob/master/README.md#json) - get a JSON file.
* [d3.text](https://github.com/d3/d3-request/blob/master/README.md#text) - get a plain text file.
* [d3.tsv](https://github.com/d3/d3-request/blob/master/README.md#tsv) - get a tab-separated values (TSV) file.
* [d3.xml](https://github.com/d3/d3-request/blob/master/README.md#xml) - get an XML file.

## [Scales (d3-scale)](https://github.com/d3/d3-scale)

Encodings that map abstract data to visual representation.

### [Continuous Scales](https://github.com/d3/d3-scale/blob/master/README.md#continuous-scales)

Map a continuous, quantitative domain to a continuous range.

* [*continuous*](https://github.com/d3/d3-scale/blob/master/README.md#_continuous) - compute the range value corresponding to a given domain value.
* [*continuous*.invert](https://github.com/d3/d3-scale/blob/master/README.md#continuous_invert) - compute the domain value corresponding to a given range value.
* [*continuous*.domain](https://github.com/d3/d3-scale/blob/master/README.md#continuous_domain) - set the input domain.
* [*continuous*.range](https://github.com/d3/d3-scale/blob/master/README.md#continuous_range) - set the output range.
* [*continuous*.rangeRound](https://github.com/d3/d3-scale/blob/master/README.md#continuous_rangeRound) - set the output range and enable rounding.
* [*continuous*.clamp](https://github.com/d3/d3-scale/blob/master/README.md#continuous_clamp) - enable clamping to the domain or range.
* [*continuous*.interpolate](https://github.com/d3/d3-scale/blob/master/README.md#continuous_interpolate) - set the output interpolator.
* [*continuous*.ticks](https://github.com/d3/d3-scale/blob/master/README.md#continuous_ticks) - compute representative values from the domain.
* [*continuous*.tickFormat](https://github.com/d3/d3-scale/blob/master/README.md#continuous_tickFormat) - format ticks for human consumption.
* [*continuous*.nice](https://github.com/d3/d3-scale/blob/master/README.md#continuous_nice) - extend the domain to nice round numbers.
* [*continuous*.copy](https://github.com/d3/d3-scale/blob/master/README.md#continuous_copy) - create a copy of this scale.
* [d3.scaleLinear](https://github.com/d3/d3-scale/blob/master/README.md#scaleLinear) - create a quantitative linear scale.
* [d3.scalePow](https://github.com/d3/d3-scale/blob/master/README.md#scalePow) - create a quantitative power scale.
* [*pow*](https://github.com/d3/d3-scale/blob/master/README.md#_pow) - compute the range value corresponding to a given domain value.
* [*pow*.invert](https://github.com/d3/d3-scale/blob/master/README.md#pow_invert) - compute the domain value corresponding to a given range value.
* [*pow*.exponent](https://github.com/d3/d3-scale/blob/master/README.md#pow_exponent) - set the power exponent.
* [*pow*.domain](https://github.com/d3/d3-scale/blob/master/README.md#pow_domain) - set the input domain.
* [*pow*.range](https://github.com/d3/d3-scale/blob/master/README.md#pow_range) - set the output range.
* [*pow*.rangeRound](https://github.com/d3/d3-scale/blob/master/README.md#pow_rangeRound) - set the output range and enable rounding.
* [*pow*.clamp](https://github.com/d3/d3-scale/blob/master/README.md#pow_clamp) - enable clamping to the domain or range.
* [*pow*.interpolate](https://github.com/d3/d3-scale/blob/master/README.md#pow_interpolate) - set the output interpolator.
* [*pow*.ticks](https://github.com/d3/d3-scale/blob/master/README.md#pow_ticks) - compute representative values from the domain.
* [*pow*.tickFormat](https://github.com/d3/d3-scale/blob/master/README.md#pow_tickFormat) - format ticks for human consumption.
* [*pow*.nice](https://github.com/d3/d3-scale/blob/master/README.md#pow_nice) - extend the domain to nice round numbers.
* [*pow*.copy](https://github.com/d3/d3-scale/blob/master/README.md#pow_copy) - create a copy of this scale.
* [d3.scaleSqrt](https://github.com/d3/d3-scale/blob/master/README.md#scaleSqrt) - create a quantitative power scale with exponent 0.5.
* [d3.scaleLog](https://github.com/d3/d3-scale/blob/master/README.md#scaleLog) - create a quantitative logarithmic scale.
* [*log*](https://github.com/d3/d3-scale/blob/master/README.md#_log) - compute the range value corresponding to a given domain value.
* [*log*.invert](https://github.com/d3/d3-scale/blob/master/README.md#log_invert) - compute the domain value corresponding to a given range value.
* [*log*.base](https://github.com/d3/d3-scale/blob/master/README.md#log_base) - set the logarithm base.
* [*log*.domain](https://github.com/d3/d3-scale/blob/master/README.md#log_domain) - set the input domain.
* [*log*.range](https://github.com/d3/d3-scale/blob/master/README.md#log_range) - set the output range.
* [*log*.rangeRound](https://github.com/d3/d3-scale/blob/master/README.md#log_rangeRound) - set the output range and enable rounding.
* [*log*.clamp](https://github.com/d3/d3-scale/blob/master/README.md#log_clamp) - enable clamping to the domain or range.
* [*log*.interpolate](https://github.com/d3/d3-scale/blob/master/README.md#log_interpolate) - set the output interpolator.
* [*log*.ticks](https://github.com/d3/d3-scale/blob/master/README.md#log_ticks) - compute representative values from the domain.
* [*log*.tickFormat](https://github.com/d3/d3-scale/blob/master/README.md#log_tickFormat) - format ticks for human consumption.
* [*log*.nice](https://github.com/d3/d3-scale/blob/master/README.md#log_nice) - extend the domain to nice round numbers.
* [*log*.copy](https://github.com/d3/d3-scale/blob/master/README.md#log_copy) - create a copy of this scale.
* [d3.scaleIdentity](https://github.com/d3/d3-scale/blob/master/README.md#identity) - create a quantitative identity scale.
* [d3.scaleTime](https://github.com/d3/d3-scale/blob/master/README.md#scaleTime) - create a linear scale for time.
* [*time*](https://github.com/d3/d3-scale/blob/master/README.md#_time) - compute the range value corresponding to a given domain value.
* [*time*.invert](https://github.com/d3/d3-scale/blob/master/README.md#time_invert) - compute the domain value corresponding to a given range value.
* [*time*.domain](https://github.com/d3/d3-scale/blob/master/README.md#time_domain) - set the input domain.
* [*time*.range](https://github.com/d3/d3-scale/blob/master/README.md#time_range) - set the output range.
* [*time*.rangeRound](https://github.com/d3/d3-scale/blob/master/README.md#time_rangeRound) - set the output range and enable rounding.
* [*time*.clamp](https://github.com/d3/d3-scale/blob/master/README.md#time_clamp) - enable clamping to the domain or range.
* [*time*.interpolate](https://github.com/d3/d3-scale/blob/master/README.md#time_interpolate) - set the output interpolator.
* [*time*.ticks](https://github.com/d3/d3-scale/blob/master/README.md#time_ticks) - compute representative values from the domain.
* [*time*.tickFormat](https://github.com/d3/d3-scale/blob/master/README.md#time_tickFormat) - format ticks for human consumption.
* [*time*.nice](https://github.com/d3/d3-scale/blob/master/README.md#time_nice) - extend the domain to nice round times.
* [*time*.copy](https://github.com/d3/d3-scale/blob/master/README.md#time_copy) - create a copy of this scale.
* [d3.scaleUtc](https://github.com/d3/d3-scale/blob/master/README.md#scaleUtc) - create a linear scale for UTC.

### [Sequential Scales](https://github.com/d3/d3-scale/blob/master/README.md#sequential-scales)

Map a continuous, quantitative domain to a continuous, fixed interpolator.

* [d3.scaleSequential](https://github.com/d3/d3-scale/blob/master/README.md#scaleSequential) - create a sequential scale.
* [*sequential*.interpolator](https://github.com/d3/d3-scale/blob/master/README.md#sequential_interpolator) - set the scale’s output interpolator.
* [d3.interpolateViridis](https://github.com/d3/d3-scale/blob/master/README.md#interpolateViridis) - a dark-to-light color scheme.
* [d3.interpolateInferno](https://github.com/d3/d3-scale/blob/master/README.md#interpolateInferno) - a dark-to-light color scheme.
* [d3.interpolateMagma](https://github.com/d3/d3-scale/blob/master/README.md#interpolateMagma) - a dark-to-light color scheme.
* [d3.interpolatePlasma](https://github.com/d3/d3-scale/blob/master/README.md#interpolatePlasma) - a dark-to-light color scheme.
* [d3.interpolateWarm](https://github.com/d3/d3-scale/blob/master/README.md#interpolateWarm) - a rotating-hue color scheme.
* [d3.interpolateCool](https://github.com/d3/d3-scale/blob/master/README.md#interpolateCool) - a rotating-hue color scheme.
* [d3.interpolateRainbow](https://github.com/d3/d3-scale/blob/master/README.md#interpolateRainbow) - a cyclical rotating-hue color scheme.
* [d3.interpolateCubehelixDefault](https://github.com/d3/d3-scale/blob/master/README.md#interpolateCubehelixDefault) - a dark-to-light, rotating-hue color scheme.

### [Quantize Scales](https://github.com/d3/d3-scale/blob/master/README.md#quantize-scales)

Map a continuous, quantitative domain to a discrete range.

* [d3.scaleQuantize](https://github.com/d3/d3-scale/blob/master/README.md#scaleQuantize) - create a uniform quantizing linear scale.
* [*quantize*](https://github.com/d3/d3-scale/blob/master/README.md#_quantize) - compute the range value corresponding to a given domain value.
* [*quantize*.invertExtent](https://github.com/d3/d3-scale/blob/master/README.md#quantize_invertExtent) - compute the domain values corresponding to a given range value.
* [*quantize*.domain](https://github.com/d3/d3-scale/blob/master/README.md#quantize_domain) - set the input domain.
* [*quantize*.range](https://github.com/d3/d3-scale/blob/master/README.md#quantize_range) - set the output range.
* [*quantize*.nice](https://github.com/d3/d3-scale/blob/master/README.md#quantize_nice) - extend the domain to nice round numbers.
* [*quantize*.ticks](https://github.com/d3/d3-scale/blob/master/README.md#quantize_ticks) - compute representative values from the domain.
* [*quantize*.tickFormat](https://github.com/d3/d3-scale/blob/master/README.md#quantize_tickFormat) - format ticks for human consumption.
* [*quantize*.copy](https://github.com/d3/d3-scale/blob/master/README.md#quantize_copy) - create a copy of this scale.
* [d3.scaleQuantile](https://github.com/d3/d3-scale/blob/master/README.md#scaleQuantile) - create a quantile quantizing linear scale.
* [*quantile*](https://github.com/d3/d3-scale/blob/master/README.md#_quantile) - compute the range value corresponding to a given domain value.
* [*quantile*.invertExtent](https://github.com/d3/d3-scale/blob/master/README.md#quantile_invertExtent) - compute the domain values corresponding to a given range value.
* [*quantile*.domain](https://github.com/d3/d3-scale/blob/master/README.md#quantile_domain) - set the input domain.
* [*quantile*.range](https://github.com/d3/d3-scale/blob/master/README.md#quantile_range) - set the output range.
* [*quantile*.quantiles](https://github.com/d3/d3-scale/blob/master/README.md#quantile_quantiles) - get the quantile thresholds.
* [*quantile*.copy](https://github.com/d3/d3-scale/blob/master/README.md#quantile_copy) - create a copy of this scale.
* [d3.scaleThreshold](https://github.com/d3/d3-scale/blob/master/README.md#scaleThreshold) - create an arbitrary quantizing linear scale.
* [*threshold*](https://github.com/d3/d3-scale/blob/master/README.md#_threshold) - compute the range value corresponding to a given domain value.
* [*threshold*.invertExtent](https://github.com/d3/d3-scale/blob/master/README.md#threshold_invertExtent) - compute the domain values corresponding to a given range value.
* [*threshold*.domain](https://github.com/d3/d3-scale/blob/master/README.md#threshold_domain) - set the input domain.
* [*threshold*.range](https://github.com/d3/d3-scale/blob/master/README.md#threshold_range) - set the output range.
* [*threshold*.copy](https://github.com/d3/d3-scale/blob/master/README.md#threshold_copy) - create a copy of this scale.

### [Ordinal Scales](https://github.com/d3/d3-scale/blob/master/README.md#ordinal-scales)

Map a discrete domain to a discrete range.

* [d3.scaleOrdinal](https://github.com/d3/d3-scale/blob/master/README.md#scaleOrdinal) - create an ordinal scale.
* [*ordinal*](https://github.com/d3/d3-scale/blob/master/README.md#_ordinal) - compute the range value corresponding to a given domain value.
* [*ordinal*.domain](https://github.com/d3/d3-scale/blob/master/README.md#ordinal_domain) - set the input domain.
* [*ordinal*.range](https://github.com/d3/d3-scale/blob/master/README.md#ordinal_range) - set the output range.
* [*ordinal*.unknown](https://github.com/d3/d3-scale/blob/master/README.md#ordinal_unknown) - set the output value for unknown inputs.
* [*ordinal*.copy](https://github.com/d3/d3-scale/blob/master/README.md#ordinal_copy) - create a copy of this scale.
* [d3.scaleImplicit](https://github.com/d3/d3-scale/blob/master/README.md#scaleImplicit) - a special unknown value for implicit domains.
* [d3.scaleBand](https://github.com/d3/d3-scale/blob/master/README.md#scaleBand) - create an ordinal band scale.
* [*band*](https://github.com/d3/d3-scale/blob/master/README.md#_band) - compute the band start corresponding to a given domain value.
* [*band*.domain](https://github.com/d3/d3-scale/blob/master/README.md#band_domain) - set the input domain.
* [*band*.range](https://github.com/d3/d3-scale/blob/master/README.md#band_range) - set the output range.
* [*band*.rangeRound](https://github.com/d3/d3-scale/blob/master/README.md#band_rangeRound) - set the output range and enable rounding.
* [*band*.round](https://github.com/d3/d3-scale/blob/master/README.md#band_round) - enable rounding.
* [*band*.paddingInner](https://github.com/d3/d3-scale/blob/master/README.md#band_paddingInner) - set padding between bands.
* [*band*.paddingOuter](https://github.com/d3/d3-scale/blob/master/README.md#band_paddingOuter) - set padding outside the first and last bands.
* [*band*.padding](https://github.com/d3/d3-scale/blob/master/README.md#band_padding) - set padding outside and between bands.
* [*band*.align](https://github.com/d3/d3-scale/blob/master/README.md#band_align) - set band alignment, if there is extra space.
* [*band*.bandwidth](https://github.com/d3/d3-scale/blob/master/README.md#band_bandwidth) - get the width of each band.
* [*band*.step](https://github.com/d3/d3-scale/blob/master/README.md#band_step) - get the distance between the starts of adjacent bands.
* [*band*.copy](https://github.com/d3/d3-scale/blob/master/README.md#band_copy) - create a copy of this scale.
* [d3.scalePoint](https://github.com/d3/d3-scale/blob/master/README.md#scalePoint) - create an ordinal point scale.
* [*point*](https://github.com/d3/d3-scale/blob/master/README.md#_point) - compute the point corresponding to a given domain value.
* [*point*.domain](https://github.com/d3/d3-scale/blob/master/README.md#point_domain) - set the input domain.
* [*point*.range](https://github.com/d3/d3-scale/blob/master/README.md#point_range) - set the output range.
* [*point*.rangeRound](https://github.com/d3/d3-scale/blob/master/README.md#point_rangeRound) - set the output range and enable rounding.
* [*point*.round](https://github.com/d3/d3-scale/blob/master/README.md#point_round) - enable rounding.
* [*point*.padding](https://github.com/d3/d3-scale/blob/master/README.md#point_padding) - set padding outside the first and last point.
* [*point*.align](https://github.com/d3/d3-scale/blob/master/README.md#point_align) - set point alignment, if there is extra space.
* [*point*.bandwidth](https://github.com/d3/d3-scale/blob/master/README.md#point_bandwidth) - returns zero.
* [*point*.step](https://github.com/d3/d3-scale/blob/master/README.md#point_step) - get the distance between the starts of adjacent points.
* [*point*.copy](https://github.com/d3/d3-scale/blob/master/README.md#point_copy) - create a copy of this scale.
* [d3.schemeCategory10](https://github.com/d3/d3-scale/blob/master/README.md#schemeCategory10) - a categorical scheme with 10 colors.
* [d3.schemeCategory20](https://github.com/d3/d3-scale/blob/master/README.md#schemeCategory20) - a categorical scheme with 20 colors.
* [d3.schemeCategory20b](https://github.com/d3/d3-scale/blob/master/README.md#schemeCategory20b) - a categorical scheme with 20 colors.
* [d3.schemeCategory20c](https://github.com/d3/d3-scale/blob/master/README.md#schemeCategory20c) - a categorical scheme with 20 colors.

## [Selections (d3-selection)](https://github.com/d3/d3-selection)

Transform the DOM by selecting elements and joining to data.

### [Selecting Elements](https://github.com/d3/d3-selection/blob/master/README.md#selecting-elements)

* [d3.selection](https://github.com/d3/d3-selection/blob/master/README.md#selection) - select the root document element.
* [d3.select](https://github.com/d3/d3-selection/blob/master/README.md#select) - select an element from the document.
* [d3.selectAll](https://github.com/d3/d3-selection/blob/master/README.md#selectAll) - select multiple elements from the document.
* [*selection*.select](https://github.com/d3/d3-selection/blob/master/README.md#selection_select) - select a descendant element for each selected element.
* [*selection*.selectAll](https://github.com/d3/d3-selection/blob/master/README.md#selection_selectAll) - select multiple descendants for each selected element.
* [*selection*.filter](https://github.com/d3/d3-selection/blob/master/README.md#selection_filter) - filter elements based on data.
* [*selection*.merge](https://github.com/d3/d3-selection/blob/master/README.md#selection_merge) - merge this selection with another.
* [d3.matcher](https://github.com/d3/d3-selection/blob/master/README.md#matcher) - test whether an element matches a selector.
* [d3.selector](https://github.com/d3/d3-selection/blob/master/README.md#selector) - select an element.
* [d3.selectorAll](https://github.com/d3/d3-selection/blob/master/README.md#selectorAll) - select elements.
* [d3.window](https://github.com/d3/d3-selection/blob/master/README.md#window) - get a node’s owner window.

### [Modifying Elements](https://github.com/d3/d3-selection/blob/master/README.md#modifying-elements)

* [*selection*.attr](https://github.com/d3/d3-selection/blob/master/README.md#selection_attr) - get or set an attribute.
* [*selection*.classed](https://github.com/d3/d3-selection/blob/master/README.md#selection_classed) - get, add or remove CSS classes.
* [*selection*.style](https://github.com/d3/d3-selection/blob/master/README.md#selection_style) - get or set a style property.
* [*selection*.property](https://github.com/d3/d3-selection/blob/master/README.md#selection_property) - get or set a (raw) property.
* [*selection*.text](https://github.com/d3/d3-selection/blob/master/README.md#selection_text) - get or set the text content.
* [*selection*.html](https://github.com/d3/d3-selection/blob/master/README.md#selection_html) - get or set the inner HTML.
* [*selection*.append](https://github.com/d3/d3-selection/blob/master/README.md#selection_append) - create, append and select new elements.
* [*selection*.insert](https://github.com/d3/d3-selection/blob/master/README.md#selection_insert) - create, insert and select new elements.
* [*selection*.remove](https://github.com/d3/d3-selection/blob/master/README.md#selection_remove) - remove elements from the document.
* [*selection*.sort](https://github.com/d3/d3-selection/blob/master/README.md#selection_sort) - sort elements in the document based on data.
* [*selection*.order](https://github.com/d3/d3-selection/blob/master/README.md#selection_order) - reorders elements in the document to match the selection.
* [*selection*.raise](https://github.com/d3/d3-selection/blob/master/README.md#selection_raise) - reorders each element as the last child of its parent.
* [*selection*.lower](https://github.com/d3/d3-selection/blob/master/README.md#selection_lower) - reorders each element as the first child of its parent.
* [d3.creator](https://github.com/d3/d3-selection/blob/master/README.md#creator) - create an element by name.

### [Joining Data](https://github.com/d3/d3-selection/blob/master/README.md#joining-data)

* [*selection*.data](https://github.com/d3/d3-selection/blob/master/README.md#selection_data) - join elements to data.
* [*selection*.enter](https://github.com/d3/d3-selection/blob/master/README.md#selection_enter) - get the enter selection (data missing elements).
* [*selection*.exit](https://github.com/d3/d3-selection/blob/master/README.md#selection_exit) - get the exit selection (elements missing data).
* [*selection*.datum](https://github.com/d3/d3-selection/blob/master/README.md#selection_datum) - get or set element data (without joining).

### [Handling Events](https://github.com/d3/d3-selection/blob/master/README.md#handling-events)

* [*selection*.on](https://github.com/d3/d3-selection/blob/master/README.md#selection_on) - add or remove event listeners.
* [*selection*.dispatch](https://github.com/d3/d3-selection/blob/master/README.md#selection_dispatch) - dispatch a custom event.
* [d3.event](https://github.com/d3/d3-selection/blob/master/README.md#event) - the current user event, during interaction.
* [d3.customEvent](https://github.com/d3/d3-selection/blob/master/README.md#customEvent) - temporarily define a custom event.
* [d3.mouse](https://github.com/d3/d3-selection/blob/master/README.md#mouse) - get the mouse position relative to a given container.
* [d3.touch](https://github.com/d3/d3-selection/blob/master/README.md#touch) - get a touch position relative to a given container.
* [d3.touches](https://github.com/d3/d3-selection/blob/master/README.md#touches) - get the touch positions relative to a given container.

### [Control Flow](https://github.com/d3/d3-selection/blob/master/README.md#control-flow)

* [*selection*.each](https://github.com/d3/d3-selection/blob/master/README.md#selection_each) - call a function for each element.
* [*selection*.call](https://github.com/d3/d3-selection/blob/master/README.md#selection_call) - call a function with this selection.
* [*selection*.empty](https://github.com/d3/d3-selection/blob/master/README.md#selection_empty) - returns true if this selection is empty.
* [*selection*.nodes](https://github.com/d3/d3-selection/blob/master/README.md#selection_nodes) - returns an array of all selected elements.
* [*selection*.node](https://github.com/d3/d3-selection/blob/master/README.md#selection_node) - returns the first (non-null) element.
* [*selection*.size](https://github.com/d3/d3-selection/blob/master/README.md#selection_size) - returns the count of elements.

### [Local Variables](https://github.com/d3/d3-selection/blob/master/README.md#local-variables)

* [d3.local](https://github.com/d3/d3-selection/blob/master/README.md#local) - declares a new local variable.
* [*local*.set](https://github.com/d3/d3-selection/blob/master/README.md#local_set) - set a local variable’s value.
* [*local*.get](https://github.com/d3/d3-selection/blob/master/README.md#local_get) - get a local variable’s value.
* [*local*.remove](https://github.com/d3/d3-selection/blob/master/README.md#local_remove) - delete a local variable.
* [*local*.toString](https://github.com/d3/d3-selection/blob/master/README.md#local_toString) - get the property identifier of a local variable.

### [Namespaces](https://github.com/d3/d3-selection/blob/master/README.md#namespaces)

* [d3.namespace](https://github.com/d3/d3-selection/blob/master/README.md#namespace) - qualify a prefixed XML name, such as “xlink:href”.
* [d3.namespaces](https://github.com/d3/d3-selection/blob/master/README.md#namespaces) - the built-in XML namespaces.

## [Shapes (d3-shape)](https://github.com/d3/d3-shape)

Graphical primitives for visualization.

### [Arcs](https://github.com/d3/d3-shape/blob/master/README.md#arcs)

Circular or annular sectors, as in a pie or donut chart.

* [d3.arc](https://github.com/d3/d3-shape/blob/master/README.md#arc) - create a new arc generator.
* [*arc*](https://github.com/d3/d3-shape/blob/master/README.md#_arc) - generate an arc for the given datum.
* [*arc*.centroid](https://github.com/d3/d3-shape/blob/master/README.md#arc_centroid) - compute an arc’s midpoint.
* [*arc*.innerRadius](https://github.com/d3/d3-shape/blob/master/README.md#arc_innerRadius) - set the inner radius.
* [*arc*.outerRadius](https://github.com/d3/d3-shape/blob/master/README.md#arc_outerRadius) - set the outer radius.
* [*arc*.cornerRadius](https://github.com/d3/d3-shape/blob/master/README.md#arc_cornerRadius) - set the corner radius, for rounded corners.
* [*arc*.startAngle](https://github.com/d3/d3-shape/blob/master/README.md#arc_startAngle) - set the start angle.
* [*arc*.endAngle](https://github.com/d3/d3-shape/blob/master/README.md#arc_endAngle) - set the end angle.
* [*arc*.padAngle](https://github.com/d3/d3-shape/blob/master/README.md#arc_padAngle) - set the angle between adjacent arcs, for padded arcs.
* [*arc*.padRadius](https://github.com/d3/d3-shape/blob/master/README.md#arc_padRadius) - set the radius at which to linearize padding.
* [*arc*.context](https://github.com/d3/d3-shape/blob/master/README.md#arc_context) - set the rendering context.

### [Pies](https://github.com/d3/d3-shape/blob/master/README.md#pies)

Compute the necessary angles to represent a tabular dataset as a pie or donut chart.

* [d3.pie](https://github.com/d3/d3-shape/blob/master/README.md#pie) - create a new pie generator.
* [*pie*](https://github.com/d3/d3-shape/blob/master/README.md#_pie) - compute the arc angles for the given dataset.
* [*pie*.value](https://github.com/d3/d3-shape/blob/master/README.md#pie_value) - set the value accessor.
* [*pie*.sort](https://github.com/d3/d3-shape/blob/master/README.md#pie_sort) - set the sort order comparator.
* [*pie*.sortValues](https://github.com/d3/d3-shape/blob/master/README.md#pie_sortValues) - set the sort order comparator.
* [*pie*.startAngle](https://github.com/d3/d3-shape/blob/master/README.md#pie_startAngle) - set the overall start angle.
* [*pie*.endAngle](https://github.com/d3/d3-shape/blob/master/README.md#pie_endAngle) - set the overall end angle.
* [*pie*.padAngle](https://github.com/d3/d3-shape/blob/master/README.md#pie_padAngle) - set the pad angle between adjacent arcs.

### [Lines](https://github.com/d3/d3-shape/blob/master/README.md#lines)

A spline or polyline, as in a line chart.

* [d3.line](https://github.com/d3/d3-shape/blob/master/README.md#line) - create a new line generator.
* [*line*](https://github.com/d3/d3-shape/blob/master/README.md#_line) - generate a line for the given dataset.
* [*line*.x](https://github.com/d3/d3-shape/blob/master/README.md#line_x) - set the *x* accessor.
* [*line*.y](https://github.com/d3/d3-shape/blob/master/README.md#line_y) - set the *y* accessor.
* [*line*.defined](https://github.com/d3/d3-shape/blob/master/README.md#line_defined) - set the defined accessor.
* [*line*.curve](https://github.com/d3/d3-shape/blob/master/README.md#line_curve) - set the curve interpolator.
* [*line*.context](https://github.com/d3/d3-shape/blob/master/README.md#line_context) - set the rendering context.
* [d3.radialLine](https://github.com/d3/d3-shape/blob/master/README.md#radialLine) - create a new radial line generator.
* [*radialLine*](https://github.com/d3/d3-shape/blob/master/README.md#_radialLine) - generate a line for the given dataset.
* [*radialLine*.angle](https://github.com/d3/d3-shape/blob/master/README.md#radialLine_angle) - set the angle accessor.
* [*radialLine*.radius](https://github.com/d3/d3-shape/blob/master/README.md#radialLine_radius) - set the radius accessor.
* [*radialLine*.defined](https://github.com/d3/d3-shape/blob/master/README.md#radialLine_defined) - set the defined accessor.
* [*radialLine*.curve](https://github.com/d3/d3-shape/blob/master/README.md#radialLine_curve) - set the curve interpolator.
* [*radialLine*.context](https://github.com/d3/d3-shape/blob/master/README.md#radialLine_context) - set the rendering context.

### [Areas](https://github.com/d3/d3-shape/blob/master/README.md#areas)

An area, defined by a bounding topline and baseline, as in an area chart.

* [d3.area](https://github.com/d3/d3-shape/blob/master/README.md#area) - create a new area generator.
* [*area*](https://github.com/d3/d3-shape/blob/master/README.md#_area) - generate an area for the given dataset.
* [*area*.x](https://github.com/d3/d3-shape/blob/master/README.md#area_x) - set the *x0* and *x1* accessors.
* [*area*.x0](https://github.com/d3/d3-shape/blob/master/README.md#area_x0) - set the baseline *x* accessor.
* [*area*.x1](https://github.com/d3/d3-shape/blob/master/README.md#area_x1) - set the topline *x* accessor.
* [*area*.y](https://github.com/d3/d3-shape/blob/master/README.md#area_y) - set the *y0* and *y1* accessors.
* [*area*.y0](https://github.com/d3/d3-shape/blob/master/README.md#area_y0) - set the baseline *y* accessor.
* [*area*.y1](https://github.com/d3/d3-shape/blob/master/README.md#area_y1) - set the topline *y* accessor.
* [*area*.defined](https://github.com/d3/d3-shape/blob/master/README.md#area_defined) - set the defined accessor.
* [*area*.curve](https://github.com/d3/d3-shape/blob/master/README.md#area_curve) - set the curve interpolator.
* [*area*.context](https://github.com/d3/d3-shape/blob/master/README.md#area_context) - set the rendering context.
* [*area*.lineX0](https://github.com/d3/d3-shape/blob/master/README.md#area_lineX0) - derive a line for the left edge of an area.
* [*area*.lineX1](https://github.com/d3/d3-shape/blob/master/README.md#area_lineX1) - derive a line for the right edge of an area.
* [*area*.lineY0](https://github.com/d3/d3-shape/blob/master/README.md#area_lineY0) - derive a line for the top edge of an area.
* [*area*.lineY1](https://github.com/d3/d3-shape/blob/master/README.md#area_lineY1) - derive a line for the bottom edge of an area.
* [d3.radialArea](https://github.com/d3/d3-shape/blob/master/README.md#radialArea) - create a new radial area generator.
* [*radialArea*](https://github.com/d3/d3-shape/blob/master/README.md#_radialArea) - generate an area for the given dataset.
* [*radialArea*.angle](https://github.com/d3/d3-shape/blob/master/README.md#radialArea_angle) - set the start and end angle accessors.
* [*radialArea*.startAngle](https://github.com/d3/d3-shape/blob/master/README.md#radialArea_startAngle) - set the start angle accessor.
* [*radialArea*.endAngle](https://github.com/d3/d3-shape/blob/master/README.md#radialArea_endAngle) - set the end angle accessor.
* [*radialArea*.radius](https://github.com/d3/d3-shape/blob/master/README.md#radialArea_radius) - set the inner and outer radius accessors.
* [*radialArea*.innerRadius](https://github.com/d3/d3-shape/blob/master/README.md#radialArea_innerRadius) - set the inner radius accessor.
* [*radialArea*.outerRadius](https://github.com/d3/d3-shape/blob/master/README.md#radialArea_outerRadius) - set the outer radius accessor.
* [*radialArea*.defined](https://github.com/d3/d3-shape/blob/master/README.md#radialArea_defined) - set the defined accessor.
* [*radialArea*.curve](https://github.com/d3/d3-shape/blob/master/README.md#radialArea_curve) - set the curve interpolator.
* [*radialArea*.context](https://github.com/d3/d3-shape/blob/master/README.md#radialArea_context) - set the rendering context.
* [*radialArea*.lineStartAngle](https://github.com/d3/d3-shape/blob/master/README.md#area_lineStartAngle) - derive a line for the start edge of an area.
* [*radialArea*.lineEndAngle](https://github.com/d3/d3-shape/blob/master/README.md#area_lineEndAngle) - derive a line for the end edge of an area.
* [*radialArea*.lineInnerRadius](https://github.com/d3/d3-shape/blob/master/README.md#area_lineInnerRadius) - derive a line for the inner edge of an area.
* [*radialArea*.lineOuterRadius](https://github.com/d3/d3-shape/blob/master/README.md#area_lineOuterRadius) - derive a line for the outer edge of an area.

### [Curves](https://github.com/d3/d3-shape/blob/master/README.md#curves)

Interpolate between points to produce a continuous shape.

* [d3.curveBasis](https://github.com/d3/d3-shape/blob/master/README.md#curveBasis) - a cubic basis spline, repeating the end points.
* [d3.curveBasisClosed](https://github.com/d3/d3-shape/blob/master/README.md#curveBasisClosed) - a closed cubic basis spline.
* [d3.curveBasisOpen](https://github.com/d3/d3-shape/blob/master/README.md#curveBasisOpen) - a cubic basis spline.
* [d3.curveBundle](https://github.com/d3/d3-shape/blob/master/README.md#curveBundle) - a straightened cubic basis spline.
* [*bundle*.beta](https://github.com/d3/d3-shape/blob/master/README.md#bundle_beta) - set the bundle tension *beta*.
* [d3.curveCardinal](https://github.com/d3/d3-shape/blob/master/README.md#curveCardinal) - a cubic cardinal spline, with one-sided difference at each end.
* [d3.curveCardinalClosed](https://github.com/d3/d3-shape/blob/master/README.md#curveCardinalClosed) - a closed cubic cardinal spline.
* [d3.curveCardinalOpen](https://github.com/d3/d3-shape/blob/master/README.md#curveCardinalOpen) - a cubic cardinal spline.
* [*cardinal*.tension](https://github.com/d3/d3-shape/blob/master/README.md#cardinal_tension) - set the cardinal spline tension.
* [d3.curveCatmullRom](https://github.com/d3/d3-shape/blob/master/README.md#curveCatmullRom) - a cubic Catmull–Rom spline, with one-sided difference at each end.
* [d3.curveCatmullRomClosed](https://github.com/d3/d3-shape/blob/master/README.md#curveCatmullRomClosed) - a closed cubic Catmull–Rom spline.
* [d3.curveCatmullRomOpen](https://github.com/d3/d3-shape/blob/master/README.md#curveCatmullRomOpen) - a cubic Catmull–Rom spline.
* [*catmullRom*.alpha](https://github.com/d3/d3-shape/blob/master/README.md#catmullRom_alpha) - set the Catmull–Rom parameter *alpha*.
* [d3.curveLinear](https://github.com/d3/d3-shape/blob/master/README.md#curveLinear) - a polyline.
* [d3.curveLinearClosed](https://github.com/d3/d3-shape/blob/master/README.md#curveLinearClosed) - a closed polyline.
* [d3.curveMonotoneX](https://github.com/d3/d3-shape/blob/master/README.md#curveMonotoneX) - a cubic spline that, given monotonicity in *x*, preserves it in *y*.
* [d3.curveMonotoneY](https://github.com/d3/d3-shape/blob/master/README.md#curveMonotoneY) - a cubic spline that, given monotonicity in *y*, preserves it in *x*.
* [d3.curveNatural](https://github.com/d3/d3-shape/blob/master/README.md#curveNatural) - a natural cubic spline.
* [d3.curveStep](https://github.com/d3/d3-shape/blob/master/README.md#curveStep) - a piecewise constant function.
* [d3.curveStepAfter](https://github.com/d3/d3-shape/blob/master/README.md#curveStepAfter) - a piecewise constant function.
* [d3.curveStepBefore](https://github.com/d3/d3-shape/blob/master/README.md#curveStepBefore) - a piecewise constant function.
* [*curve*.areaStart](https://github.com/d3/d3-shape/blob/master/README.md#curve_areaStart) - start a new area segment.
* [*curve*.areaEnd](https://github.com/d3/d3-shape/blob/master/README.md#curve_areaEnd) - end the current area segment.
* [*curve*.lineStart](https://github.com/d3/d3-shape/blob/master/README.md#curve_lineStart) - start a new line segment.
* [*curve*.lineEnd](https://github.com/d3/d3-shape/blob/master/README.md#curve_lineEnd) - end the current line segment.
* [*curve*.point](https://github.com/d3/d3-shape/blob/master/README.md#curve_point) - add a point to the current line segment.

### [Symbols](https://github.com/d3/d3-shape/blob/master/README.md#symbols)

A categorical shape encoding, as in a scatterplot.

* [d3.symbol](https://github.com/d3/d3-shape/blob/master/README.md#symbol) - create a new symbol generator.
* [*symbol*](https://github.com/d3/d3-shape/blob/master/README.md#_symbol) - generate a symbol for the given datum.
* [*symbol*.type](https://github.com/d3/d3-shape/blob/master/README.md#symbol_type) - set the symbol type.
* [*symbol*.size](https://github.com/d3/d3-shape/blob/master/README.md#symbol_size) - set the size of the symbol in square pixels.
* [*symbol*.context](https://github.com/d3/d3-shape/blob/master/README.md#symbol_context) - set the rendering context.
* [d3.symbols](https://github.com/d3/d3-shape/blob/master/README.md#symbols) - the array of built-in symbol types.
* [d3.symbolCircle](https://github.com/d3/d3-shape/blob/master/README.md#symbolCircle) - a circle.
* [d3.symbolCross](https://github.com/d3/d3-shape/blob/master/README.md#symbolCross) - a Greek cross with arms of equal length.
* [d3.symbolDiamond](https://github.com/d3/d3-shape/blob/master/README.md#symbolDiamond) - a rhombus.
* [d3.symbolSquare](https://github.com/d3/d3-shape/blob/master/README.md#symbolSquare) - a square.
* [d3.symbolStar](https://github.com/d3/d3-shape/blob/master/README.md#symbolStar) - a pentagonal star (pentagram).
* [d3.symbolTriangle](https://github.com/d3/d3-shape/blob/master/README.md#symbolTriangle) - an up-pointing triangle.
* [d3.symbolWye](https://github.com/d3/d3-shape/blob/master/README.md#symbolWye) - a Y shape.
* [*symbolType*.draw](https://github.com/d3/d3-shape/blob/master/README.md#symbolType_draw) - draw this symbol to the given context.

### [Stacks](https://github.com/d3/d3-shape/blob/master/README.md#stacks)

Stack shapes, placing one adjacent to another, as in a stacked bar chart.

* [d3.stack](https://github.com/d3/d3-shape/blob/master/README.md#stack) - create a new stack generator.
* [*stack*](https://github.com/d3/d3-shape/blob/master/README.md#_stack) - generate a stack for the given dataset.
* [*stack*.keys](https://github.com/d3/d3-shape/blob/master/README.md#stack_keys) - set the keys accessor.
* [*stack*.value](https://github.com/d3/d3-shape/blob/master/README.md#stack_value) - set the value accessor.
* [*stack*.order](https://github.com/d3/d3-shape/blob/master/README.md#stack_order) - set the order accessor.
* [*stack*.offset](https://github.com/d3/d3-shape/blob/master/README.md#stack_offset) - set the offset accessor.
* [d3.stackOrderAscending](https://github.com/d3/d3-shape/blob/master/README.md#stackOrderAscending) - put the smallest series on bottom.
* [d3.stackOrderDescending](https://github.com/d3/d3-shape/blob/master/README.md#stackOrderDescending) - put the largest series on bottom.
* [d3.stackOrderInsideOut](https://github.com/d3/d3-shape/blob/master/README.md#stackOrderInsideOut) - put larger series in the middle.
* [d3.stackOrderNone](https://github.com/d3/d3-shape/blob/master/README.md#stackOrderNone) - use the given series order.
* [d3.stackOrderReverse](https://github.com/d3/d3-shape/blob/master/README.md#stackOrderReverse) - use the reverse of the given series order.
* [d3.stackOffsetExpand](https://github.com/d3/d3-shape/blob/master/README.md#stackOffsetExpand) - normalize the baseline to zero and topline to one.
* [d3.stackOffsetNone](https://github.com/d3/d3-shape/blob/master/README.md#stackOffsetNone) - apply a zero baseline.
* [d3.stackOffsetSilhouette](https://github.com/d3/d3-shape/blob/master/README.md#stackOffsetSilhouette) - center the streamgraph around zero.
* [d3.stackOffsetWiggle](https://github.com/d3/d3-shape/blob/master/README.md#stackOffsetWiggle) - minimize streamgraph wiggling.

## [Time Formats (d3-time-format)](https://github.com/d3/d3-time-format)

Parse and format times, inspired by strptime and strftime.

* [d3.timeFormat](https://github.com/d3/d3-time-format/blob/master/README.md#timeFormat) - alias for *locale*.format on the default locale.
* [d3.timeParse](https://github.com/d3/d3-time-format/blob/master/README.md#timeParse) - alias for *locale*.parse on the default locale.
* [d3.utcFormat](https://github.com/d3/d3-time-format/blob/master/README.md#utcFormat) -  alias for *locale*.utcFormat on the default locale.
* [d3.utcParse](https://github.com/d3/d3-time-format/blob/master/README.md#utcParse) -  alias for *locale*.utcParse on the default locale.
* [d3.isoFormat](https://github.com/d3/d3-time-format/blob/master/README.md#isoFormat) - an ISO 8601 UTC formatter.
* [d3.isoParse](https://github.com/d3/d3-time-format/blob/master/README.md#isoParse) - an ISO 8601 UTC parser.
* [d3.timeFormatLocale](https://github.com/d3/d3-time-format/blob/master/README.md#timeFormatLocale) - define a custom locale.
* [d3.timeFormatDefaultLocale](https://github.com/d3/d3-time-format/blob/master/README.md#timeFormatDefaultLocale) - define the default locale.
* [*locale*.format](https://github.com/d3/d3-time-format/blob/master/README.md#locale_format) - create a time formatter.
* [*locale*.parse](https://github.com/d3/d3-time-format/blob/master/README.md#locale_parse) - create a time parser.
* [*locale*.utcFormat](https://github.com/d3/d3-time-format/blob/master/README.md#locale_utcFormat) - create a UTC formatter.
* [*locale*.utcParse](https://github.com/d3/d3-time-format/blob/master/README.md#locale_utcParse) - create a UTC parser.

## [Time Intervals (d3-time)](https://github.com/d3/d3-time)

A calculator for humanity’s peculiar conventions of time.

* [d3.timeInterval](https://github.com/d3/d3-time/blob/master/README.md#timeInterval) - implement a new custom time interval.
* [*interval*](https://github.com/d3/d3-time/blob/master/README.md#_interval) - alias for *interval*.floor.
* [*interval*.floor](https://github.com/d3/d3-time/blob/master/README.md#interval_floor) - round down to the nearest boundary.
* [*interval*.round](https://github.com/d3/d3-time/blob/master/README.md#interval_round) - round to the nearest boundary.
* [*interval*.ceil](https://github.com/d3/d3-time/blob/master/README.md#interval_ceil) - round up to the nearest boundary.
* [*interval*.offset](https://github.com/d3/d3-time/blob/master/README.md#interval_offset) - offset a date by some number of intervals.
* [*interval*.range](https://github.com/d3/d3-time/blob/master/README.md#interval_range) - generate a range of dates at interval boundaries.
* [*interval*.filter](https://github.com/d3/d3-time/blob/master/README.md#interval_filter) - create a filtered subset of this interval.
* [*interval*.every](https://github.com/d3/d3-time/blob/master/README.md#interval_every) - create a filtered subset of this interval.
* [*interval*.count](https://github.com/d3/d3-time/blob/master/README.md#interval_count) - count interval boundaries between two dates.
* [d3.timeMillisecond](https://github.com/d3/d3-time/blob/master/README.md#timeMillisecond), [d3.utcMillisecond](https://github.com/d3/d3-time/blob/master/README.md#timeMillisecond) - the millisecond interval.
* [d3.timeMilliseconds](https://github.com/d3/d3-time/blob/master/README.md#timeMillisecond), [d3.utcMilliseconds](https://github.com/d3/d3-time/blob/master/README.md#timeMillisecond) - aliases for millisecond.range.
* [d3.timeSecond](https://github.com/d3/d3-time/blob/master/README.md#timeSecond), [d3.utcSecond](https://github.com/d3/d3-time/blob/master/README.md#timeSecond) - the second interval.
* [d3.timeSeconds](https://github.com/d3/d3-time/blob/master/README.md#timeSecond), [d3.utcSeconds](https://github.com/d3/d3-time/blob/master/README.md#timeSecond) - aliases for second.range.
* [d3.timeMinute](https://github.com/d3/d3-time/blob/master/README.md#timeMinute), [d3.utcMinute](https://github.com/d3/d3-time/blob/master/README.md#timeMinute) - the minute interval.
* [d3.timeMinutes](https://github.com/d3/d3-time/blob/master/README.md#timeMinute), [d3.utcMinutes](https://github.com/d3/d3-time/blob/master/README.md#timeMinute) - aliases for minute.range.
* [d3.timeHour](https://github.com/d3/d3-time/blob/master/README.md#timeHour), [d3.utcHour](https://github.com/d3/d3-time/blob/master/README.md#timeHour) - the hour interval.
* [d3.timeHours](https://github.com/d3/d3-time/blob/master/README.md#timeHour), [d3.utcHours](https://github.com/d3/d3-time/blob/master/README.md#timeHour) - aliases for hour.range.
* [d3.timeDay](https://github.com/d3/d3-time/blob/master/README.md#timeDay), [d3.utcDay](https://github.com/d3/d3-time/blob/master/README.md#timeDay) - the day interval.
* [d3.timeDays](https://github.com/d3/d3-time/blob/master/README.md#timeDay), [d3.utcDays](https://github.com/d3/d3-time/blob/master/README.md#timeDay) - aliases for day.range.
* [d3.timeWeek](https://github.com/d3/d3-time/blob/master/README.md#timeWeek), [d3.utcWeek](https://github.com/d3/d3-time/blob/master/README.md#timeWeek) - aliases for sunday.
* [d3.timeWeeks](https://github.com/d3/d3-time/blob/master/README.md#timeWeek), [d3.utcWeeks](https://github.com/d3/d3-time/blob/master/README.md#timeWeek) - aliases for week.range.
* [d3.timeSunday](https://github.com/d3/d3-time/blob/master/README.md#timeSunday), [d3.utcSunday](https://github.com/d3/d3-time/blob/master/README.md#timeSunday) - the week interval, starting on Sunday.
* [d3.timeSundays](https://github.com/d3/d3-time/blob/master/README.md#timeSunday), [d3.utcSundays](https://github.com/d3/d3-time/blob/master/README.md#timeSunday) - aliases for sunday.range.
* [d3.timeMonday](https://github.com/d3/d3-time/blob/master/README.md#timeMonday), [d3.utcMonday](https://github.com/d3/d3-time/blob/master/README.md#timeMonday) - the week interval, starting on Monday.
* [d3.timeMondays](https://github.com/d3/d3-time/blob/master/README.md#timeMonday), [d3.utcMondays](https://github.com/d3/d3-time/blob/master/README.md#timeMonday) - aliases for monday.range.
* [d3.timeTuesday](https://github.com/d3/d3-time/blob/master/README.md#timeTuesday), [d3.utcTuesday](https://github.com/d3/d3-time/blob/master/README.md#timeTuesday) - the week interval, starting on Tuesday.
* [d3.timeTuesdays](https://github.com/d3/d3-time/blob/master/README.md#timeTuesday), [d3.utcTuesdays](https://github.com/d3/d3-time/blob/master/README.md#timeTuesday) - aliases for tuesday.range.
* [d3.timeWednesday](https://github.com/d3/d3-time/blob/master/README.md#timeWednesday), [d3.utcWednesday](https://github.com/d3/d3-time/blob/master/README.md#timeWednesday) - the week interval, starting on Wednesday.
* [d3.timeWednesdays](https://github.com/d3/d3-time/blob/master/README.md#timeWednesday), [d3.utcWednesdays](https://github.com/d3/d3-time/blob/master/README.md#timeWednesday) - aliases for wednesday.range.
* [d3.timeThursday](https://github.com/d3/d3-time/blob/master/README.md#timeThursday), [d3.utcThursday](https://github.com/d3/d3-time/blob/master/README.md#timeThursday) - the week interval, starting on Thursday.
* [d3.timeThursdays](https://github.com/d3/d3-time/blob/master/README.md#timeThursday), [d3.utcThursdays](https://github.com/d3/d3-time/blob/master/README.md#timeThursday) - aliases for thursday.range.
* [d3.timeFriday](https://github.com/d3/d3-time/blob/master/README.md#timeFriday), [d3.utcFriday](https://github.com/d3/d3-time/blob/master/README.md#timeFriday) - the week interval, starting on Friday.
* [d3.timeFridays](https://github.com/d3/d3-time/blob/master/README.md#timeFriday), [d3.utcFridays](https://github.com/d3/d3-time/blob/master/README.md#timeFriday) - aliases for friday.range.
* [d3.timeSaturday](https://github.com/d3/d3-time/blob/master/README.md#timeSaturday), [d3.utcSaturday](https://github.com/d3/d3-time/blob/master/README.md#timeSaturday) - the week interval, starting on Saturday.
* [d3.timeSaturdays](https://github.com/d3/d3-time/blob/master/README.md#timeSaturday), [d3.utcSaturdays](https://github.com/d3/d3-time/blob/master/README.md#timeSaturday) - aliases for saturday.range.
* [d3.timeMonth](https://github.com/d3/d3-time/blob/master/README.md#timeMonth), [d3.utcMonth](https://github.com/d3/d3-time/blob/master/README.md#timeMonth) - the month interval.
* [d3.timeMonths](https://github.com/d3/d3-time/blob/master/README.md#timeMonth), [d3.utcMonths](https://github.com/d3/d3-time/blob/master/README.md#timeMonth) - aliases for month.range.
* [d3.timeYear](https://github.com/d3/d3-time/blob/master/README.md#timeYear), [d3.utcYear](https://github.com/d3/d3-time/blob/master/README.md#timeYear) - the year interval.
* [d3.timeYears](https://github.com/d3/d3-time/blob/master/README.md#timeYear), [d3.utcYears](https://github.com/d3/d3-time/blob/master/README.md#timeYear) - aliases for year.range.

## [Timers (d3-timer)](https://github.com/d3/d3-timer)

An efficient queue for managing thousands of concurrent animations.

* [d3.now](https://github.com/d3/d3-timer/blob/master/README.md#now) - get the current high-resolution time.
* [d3.timer](https://github.com/d3/d3-timer/blob/master/README.md#timer) - schedule a new timer.
* [*timer*.restart](https://github.com/d3/d3-timer/blob/master/README.md#timer_restart) - reset the timer’s start time and callback.
* [*timer*.stop](https://github.com/d3/d3-timer/blob/master/README.md#timer_stop) - stop the timer.
* [d3.timerFlush](https://github.com/d3/d3-timer/blob/master/README.md#timerFlush) - immediately execute any eligible timers.
* [d3.timeout](https://github.com/d3/d3-timer/blob/master/README.md#timeout) - schedule a timer that stops on its first callback.
* [d3.interval](https://github.com/d3/d3-timer/blob/master/README.md#interval) - schedule a timer that is called with a configurable period.

## [Transitions (d3-transition)](https://github.com/d3/d3-transition)

Animated transitions for [selections](#selections).

* [*selection*.transition](https://github.com/d3/d3-transition/blob/master/README.md#selection_transition) - schedule a transition for the selected elements.
* [*selection*.interrupt](https://github.com/d3/d3-transition/blob/master/README.md#selection_interrupt) - interrupt and cancel transitions on the selected elements.
* [d3.transition](https://github.com/d3/d3-transition/blob/master/README.md#transition) - schedule a transition on the root document element.
* [*transition*.select](https://github.com/d3/d3-transition/blob/master/README.md#transition_select) - schedule a transition on the selected elements.
* [*transition*.selectAll](https://github.com/d3/d3-transition/blob/master/README.md#transition_selectAll) - schedule a transition on the selected elements.
* [*transition*.filter](https://github.com/d3/d3-transition/blob/master/README.md#transition_filter) - filter elements based on data.
* [*transition*.merge](https://github.com/d3/d3-transition/blob/master/README.md#transition_merge) - merge this transition with another.
* [*transition*.selection](https://github.com/d3/d3-transition/blob/master/README.md#transition_selection) - returns a selection for this transition.
* [*transition*.transition](https://github.com/d3/d3-transition/blob/master/README.md#transition_transition) - schedule a new transition following this one.
* [*transition*.call](https://github.com/d3/d3-transition/blob/master/README.md#transition_call) - call a function with this transition.
* [*transition*.nodes](https://github.com/d3/d3-transition/blob/master/README.md#transition_nodes) - returns an array of all selected elements.
* [*transition*.node](https://github.com/d3/d3-transition/blob/master/README.md#transition_node) - returns the first (non-null) element.
* [*transition*.size](https://github.com/d3/d3-transition/blob/master/README.md#transition_size) - returns the count of elements.
* [*transition*.empty](https://github.com/d3/d3-transition/blob/master/README.md#transition_empty) - returns true if this transition is empty.
* [*transition*.each](https://github.com/d3/d3-transition/blob/master/README.md#transition_each) - call a function for each element.
* [*transition*.on](https://github.com/d3/d3-transition/blob/master/README.md#transition_on) - add or remove transition event listeners.
* [*transition*.attr](https://github.com/d3/d3-transition/blob/master/README.md#transition_attr) - tween the given attribute using the default interpolator.
* [*transition*.attrTween](https://github.com/d3/d3-transition/blob/master/README.md#transition_attrTween) - tween the given attribute using a custom interpolator.
* [*transition*.style](https://github.com/d3/d3-transition/blob/master/README.md#transition_style) - tween the given style property using the default interpolator.
* [*transition*.styleTween](https://github.com/d3/d3-transition/blob/master/README.md#transition_styleTween) - tween the given style property using a custom interpolator.
* [*transition*.text](https://github.com/d3/d3-transition/blob/master/README.md#transition_text) - set the text content when the transition starts.
* [*transition*.remove](https://github.com/d3/d3-transition/blob/master/README.md#transition_remove) - remove the selected elements when the transition ends.
* [*transition*.tween](https://github.com/d3/d3-transition/blob/master/README.md#transition_tween) - run custom code during the transition.
* [*transition*.delay](https://github.com/d3/d3-transition/blob/master/README.md#transition_delay) - specify per-element delay in milliseconds.
* [*transition*.duration](https://github.com/d3/d3-transition/blob/master/README.md#transition_duration) - specify per-element duration in milliseconds.
* [*transition*.ease](https://github.com/d3/d3-transition/blob/master/README.md#transition_ease) - specify the easing function.
* [d3.active](https://github.com/d3/d3-transition/blob/master/README.md#active) - select the active transition for a given node.
* [d3.interrupt](https://github.com/d3/d3-transition/blob/master/README.md#interrupt) -

## [Voronoi Diagrams (d3-voronoi)](https://github.com/d3/d3-voronoi)

Compute the Voronoi diagram of a given set of points.

* [d3.voronoi](https://github.com/d3/d3-voronoi/blob/master/README.md#voronoi) - create a new Voronoi generator.
* [*voronoi*](https://github.com/d3/d3-voronoi/blob/master/README.md#_voronoi) - generate a new Voronoi diagram for the given points.
* [*voronoi*.polygons](https://github.com/d3/d3-voronoi/blob/master/README.md#voronoi_polygons) - compute the Voronoi polygons for the given points.
* [*voronoi*.triangles](https://github.com/d3/d3-voronoi/blob/master/README.md#voronoi_triangles) - compute the Delaunay triangles for the given points.
* [*voronoi*.links](https://github.com/d3/d3-voronoi/blob/master/README.md#voronoi_links) - compute the Delaunay links for the given points.
* [*voronoi*.x](https://github.com/d3/d3-voronoi/blob/master/README.md#voronoi_x) - set the *x* accessor.
* [*voronoi*.y](https://github.com/d3/d3-voronoi/blob/master/README.md#voronoi_y) - set the *y* accessor.
* [*voronoi*.extent](https://github.com/d3/d3-voronoi/blob/master/README.md#voronoi_extent) - set the observed extent of points.
* [*voronoi*.size](https://github.com/d3/d3-voronoi/blob/master/README.md#voronoi_size) - set the observed extent of points.
* [*diagram*.polygons](https://github.com/d3/d3-voronoi/blob/master/README.md#diagram_polygons) - compute the polygons for this Voronoi diagram.
* [*diagram*.triangles](https://github.com/d3/d3-voronoi/blob/master/README.md#diagram_triangles) - compute the triangles for this Voronoi diagram.
* [*diagram*.links](https://github.com/d3/d3-voronoi/blob/master/README.md#diagram_links) - compute the links for this Voronoi diagram.
* [*diagram*.find](https://github.com/d3/d3-voronoi/blob/master/README.md#diagram_find) - find the closest point in this Voronoi diagram.

## [Zooming (d3-zoom)](https://github.com/d3/d3-zoom)

Pan and zoom SVG, HTML or Canvas using mouse or touch input.

* [d3.zoom](https://github.com/d3/d3-zoom/blob/master/README.md#zoom) - create a zoom behavior.
* [*zoom*](https://github.com/d3/d3-zoom/blob/master/README.md#_zoom) - apply the zoom behavior to the selected elements.
* [*zoom*.transform](https://github.com/d3/d3-zoom/blob/master/README.md#zoom_transform) - change the transform for the selected elements.
* [*zoom*.translateBy](https://github.com/d3/d3-zoom/blob/master/README.md#zoom_translateBy) - translate the transform for the selected elements.
* [*zoom*.scaleBy](https://github.com/d3/d3-zoom/blob/master/README.md#zoom_scaleBy) - scale the transform for the selected elements.
* [*zoom*.scaleTo](https://github.com/d3/d3-zoom/blob/master/README.md#zoom_scaleTo) - scale the transform for the selected elements.
* [*zoom*.filter](https://github.com/d3/d3-zoom/blob/master/README.md#zoom_filter) - control which input events initiate zooming.
* [*zoom*.extent](https://github.com/d3/d3-zoom/blob/master/README.md#zoom_extent) - set the extent of the viewport.
* [*zoom*.scaleExtent](https://github.com/d3/d3-zoom/blob/master/README.md#zoom_scaleExtent) - set the allowed scale range.
* [*zoom*.translateExtent](https://github.com/d3/d3-zoom/blob/master/README.md#zoom_translateExtent) - set the extent of the zoomable world.
* [*zoom*.duration](https://github.com/d3/d3-zoom/blob/master/README.md#zoom_duration) - set the duration of zoom transitions.
* [*zoom*.on](https://github.com/d3/d3-zoom/blob/master/README.md#zoom_on) - listen for zoom events.
* [d3.zoomTransform](https://github.com/d3/d3-zoom/blob/master/README.md#zoomTransform) - get the zoom transform for a given element.
* [*transform*.scale](https://github.com/d3/d3-zoom/blob/master/README.md#transform_scale) - scale a transform by the specified amount.
* [*transform*.translate](https://github.com/d3/d3-zoom/blob/master/README.md#transform_translate) - translate a transform by the specified amount.
* [*transform*.apply](https://github.com/d3/d3-zoom/blob/master/README.md#transform_apply) - apply the transform to the given point.
* [*transform*.applyX](https://github.com/d3/d3-zoom/blob/master/README.md#transform_applyX) - apply the transform to the given *x*-coordinate.
* [*transform*.applyY](https://github.com/d3/d3-zoom/blob/master/README.md#transform_applyY) - apply the transform to the given *y*-coordinate.
* [*transform*.invert](https://github.com/d3/d3-zoom/blob/master/README.md#transform_invert) - unapply the transform to the given point.
* [*transform*.invertX](https://github.com/d3/d3-zoom/blob/master/README.md#transform_invertX) - unapply the transform to the given *x*-coordinate.
* [*transform*.invertY](https://github.com/d3/d3-zoom/blob/master/README.md#transform_invertY) - unapply the transform to the given *y*-coordinate.
* [*transform*.rescaleX](https://github.com/d3/d3-zoom/blob/master/README.md#transform_rescaleX) - apply the transform to an *x*-scale’s domain.
* [*transform*.rescaleY](https://github.com/d3/d3-zoom/blob/master/README.md#transform_rescaleY) - apply the transform to a *y*-scale’s domain.
* [*transform*.toString](https://github.com/d3/d3-zoom/blob/master/README.md#transform_toString) - format the transform as an SVG transform string.
* [d3.zoomIdentity](https://github.com/d3/d3-zoom/blob/master/README.md#zoomIdentity) - the identity transform.
