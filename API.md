# D3 API Reference

D3 is a [collection of modules](https://github.com/d3) that are designed to work together; you can use the modules independently, or you can use them together as part of the default build. The source and documentation for each module is available in its repository. Follow the links below to learn more. For changes between major versions, see [CHANGES](https://github.com/d3/d3/blob/master/CHANGES.md); see also the [release notes](https://github.com/d3/d3/releases) and the [3.x reference](https://github.com/d3/d3-3.x-api-reference/blob/master/API-Reference.md).

* [Arrays](#arrays-d3-array) ([Statistics](#statistics), [Search](#search), [Iterables](#iterables), [Sets](#sets), [Transformations](#transformations), [Histograms](#histograms))
* [Axes](#axes-d3-axis)
* [Brushes](#brushes-d3-brush)
* [Chords](#chords-d3-chord)
* [Colors](#colors-d3-color)
* [Color Schemes](#color-schemes-d3-scale-chromatic)
* [Contours](#contours-d3-contour)
* [Voronoi Diagrams](#voronoi-diagrams-d3-delaunay)
* [Dispatches](#dispatches-d3-dispatch)
* [Dragging](#dragging-d3-drag)
* [Delimiter-Separated Values](#delimiter-separated-values-d3-dsv)
* [Easings](#easings-d3-ease)
* [Fetches](#fetches-d3-fetch)
* [Forces](#forces-d3-force)
* [Number Formats](#number-formats-d3-format)
* [Geographies](#geographies-d3-geo) ([Paths](#paths), [Projections](#projections), [Spherical Math](#spherical-math), [Spherical Shapes](#spherical-shapes), [Streams](#streams), [Transforms](#transforms))
* [Hierarchies](#hierarchies-d3-hierarchy)
* [Interpolators](#interpolators-d3-interpolate)
* [Paths](#paths-d3-path)
* [Polygons](#polygons-d3-polygon)
* [Quadtrees](#quadtrees-d3-quadtree)
* [Random Numbers](#random-numbers-d3-random)
* [Scales](#scales-d3-scale) ([Continuous](#continuous-scales), [Sequential](#sequential-scales), [Diverging](#diverging-scales), [Quantize](#quantize-scales), [Ordinal](#ordinal-scales))
* [Selections](#selections-d3-selection) ([Selecting](#selecting-elements), [Modifying](#modifying-elements), [Data](#joining-data), [Events](#handling-events), [Control](#control-flow), [Local Variables](#local-variables), [Namespaces](#namespaces))
* [Shapes](#shapes-d3-shape) ([Arcs](#arcs), [Pies](#pies), [Lines](#lines), [Areas](#areas), [Curves](#curves), [Links](#links), [Symbols](#symbols), [Stacks](#stacks))
* [Time Formats](#time-formats-d3-time-format)
* [Time Intervals](#time-intervals-d3-time)
* [Timers](#timers-d3-timer)
* [Transitions](#transitions-d3-transition)
* [Zooming](#zooming-d3-zoom)

D3 uses [semantic versioning](http://semver.org/). The current version is exposed as d3.version.

## [Arrays (d3-array)](https://github.com/d3/d3-array/tree/v2.8.0)

Array manipulation, ordering, searching, summarizing, etc.

### [Statistics](https://github.com/d3/d3-array/blob/v2.8.0/README.md#statistics)

Methods for computing basic summary statistics.

* [d3.min](https://github.com/d3/d3-array/blob/v2.8.0/README.md#min) - compute the minimum value in an iterable.
* [d3.minIndex](https://github.com/d3/d3-array/blob/v2.8.0/README.md#minIndex) - compute the index of the minimum value in an iterable.
* [d3.max](https://github.com/d3/d3-array/blob/v2.8.0/README.md#max) - compute the maximum value in an iterable.
* [d3.maxIndex](https://github.com/d3/d3-array/blob/v2.8.0/README.md#maxIndex) - compute the index of the maximum value in an iterable.
* [d3.extent](https://github.com/d3/d3-array/blob/v2.8.0/README.md#extent) - compute the minimum and maximum value in an iterable.
* [d3.sum](https://github.com/d3/d3-array/blob/v2.8.0/README.md#sum) - compute the sum of an iterable of numbers.
* [d3.mean](https://github.com/d3/d3-array/blob/v2.8.0/README.md#mean) - compute the arithmetic mean of an iterable of numbers.
* [d3.median](https://github.com/d3/d3-array/blob/v2.8.0/README.md#median) - compute the median of an iterable of numbers (the 0.5-quantile).
* [d3.cumsum](https://github.com/d3/d3-array/blob/v2.8.0/README.md#cumsum) - comute the cumulative sum of an iterable.
* [d3.quantile](https://github.com/d3/d3-array/blob/v2.8.0/README.md#quantile) - compute a quantile for an iterable of numbers.
* [d3.quantileSorted](https://github.com/d3/d3-array/blob/v2.8.0/README.md#quantileSorted) - compute a quantile for a sorted array of numbers.
* [d3.variance](https://github.com/d3/d3-array/blob/v2.8.0/README.md#variance) - compute the variance of an iterable of numbers.
* [d3.deviation](https://github.com/d3/d3-array/blob/v2.8.0/README.md#deviation) - compute the standard deviation of an iterable of numbers.
* [d3.fsum](https://github.com/d3/d3-array/blob/v2.8.0/README.md#fsum) - compute a full precision summation of an iterable of numbers.
* [new d3.Adder](https://github.com/d3/d3-array/blob/v2.8.0/README.md#adder) - creates a full precision adder.
* [*adder*.add](https://github.com/d3/d3-array/blob/v2.8.0/README.md#adder_add) - add a value to an adder.
* [*adder*.valueOf](https://github.com/d3/d3-array/blob/v2.8.0/README.md#adder_valueOf) - returns a double precision representation of an adder’s value.

### [Search](https://github.com/d3/d3-array/blob/v2.8.0/README.md#search)

Methods for searching arrays for a specific element.

* [d3.least](https://github.com/d3/d3-array/blob/v2.8.0/README.md#least) - returns the least element of an iterable.
* [d3.leastIndex](https://github.com/d3/d3-array/blob/v2.8.0/README.md#leastIndex) - returns the index of the least element of an iterable.
* [d3.greatest](https://github.com/d3/d3-array/blob/v2.8.0/README.md#greatest) - returns the greatest element of an iterable.
* [d3.greatestIndex](https://github.com/d3/d3-array/blob/v2.8.0/README.md#greatestIndex) - returns the index of the greatest element of an iterable.
* [d3.bisectCenter](https://github.com/d3/d3-array/blob/v2.8.0/README.md#bisectCenter) - binary search for a value in a sorted array.
* [d3.bisectLeft](https://github.com/d3/d3-array/blob/v2.8.0/README.md#bisectLeft) - binary search for a value in a sorted array.
* [d3.bisect](https://github.com/d3/d3-array/blob/v2.8.0/README.md#bisect) - binary search for a value in a sorted array.
* [d3.bisectRight](https://github.com/d3/d3-array/blob/v2.8.0/README.md#bisectRight) - binary search for a value in a sorted array.
* [d3.bisector](https://github.com/d3/d3-array/blob/v2.8.0/README.md#bisector) - bisect using an accessor or comparator.
* [*bisector*.center](https://github.com/d3/d3-array/blob/v2.8.0/README.md#bisector_center) - binary search for a value in a sorted array.
* [*bisector*.left](https://github.com/d3/d3-array/blob/v2.8.0/README.md#bisector_left) - bisectLeft, with the given comparator.
* [*bisector*.right](https://github.com/d3/d3-array/blob/v2.8.0/README.md#bisector_right) - bisectRight, with the given comparator.
* [d3.quickselect](https://github.com/d3/d3-array/blob/v2.8.0/README.md#quickselect) - reorder an array of numbers.
* [d3.ascending](https://github.com/d3/d3-array/blob/v2.8.0/README.md#ascending) - compute the natural order of two values.
* [d3.descending](https://github.com/d3/d3-array/blob/v2.8.0/README.md#descending) - compute the natural order of two values.

### [Transformations](https://github.com/d3/d3-array/blob/v2.8.0/README.md#transformations)

Methods for transforming arrays and for generating new arrays.

* [d3.group](https://github.com/d3/d3-array/blob/v2.8.0/README.md#group) - group an iterable into a nested Map.
* [d3.groups](https://github.com/d3/d3-array/blob/v2.8.0/README.md#groups) - group an iterable into a nested array.
* [d3.index](https://github.com/d3/d3-array/blob/v2.8.0/README.md#index) - index an iterable into a nested Map.
* [d3.indexes](https://github.com/d3/d3-array/blob/v2.8.0/README.md#indexes) - index an iterable into a nested array.
* [d3.rollup](https://github.com/d3/d3-array/blob/v2.8.0/README.md#rollup) - reduce an iterable into a nested Map.
* [d3.rollups](https://github.com/d3/d3-array/blob/v2.8.0/README.md#rollups) - reduce an iterable into a nested array.
* [d3.count](https://github.com/d3/d3-array/blob/v2.8.0/README.md#count) - count valid number values in an iterable.
* [d3.cross](https://github.com/d3/d3-array/blob/v2.8.0/README.md#cross) - compute the Cartesian product of two iterables.
* [d3.merge](https://github.com/d3/d3-array/blob/v2.8.0/README.md#merge) - merge multiple iterables into one array.
* [d3.pairs](https://github.com/d3/d3-array/blob/v2.8.0/README.md#pairs) - create an array of adjacent pairs of elements.
* [d3.permute](https://github.com/d3/d3-array/blob/v2.8.0/README.md#permute) - reorder an iterable of elements according to an iterable of indexes.
* [d3.shuffle](https://github.com/d3/d3-array/blob/v2.8.0/README.md#shuffle) - randomize the order of an iterable.
* [d3.shuffler](https://github.com/d3/d3-array/blob/v2.8.0/README.md#shuffler) - randomize the order of an iterable.
* [d3.ticks](https://github.com/d3/d3-array/blob/v2.8.0/README.md#ticks) - generate representative values from a numeric interval.
* [d3.tickIncrement](https://github.com/d3/d3-array/blob/v2.8.0/README.md#tickIncrement) - generate representative values from a numeric interval.
* [d3.tickStep](https://github.com/d3/d3-array/blob/v2.8.0/README.md#tickStep) - generate representative values from a numeric interval.
* [d3.nice](https://github.com/d3/d3-array/blob/v2.8.0/README.md#nice) - extend an interval to align with ticks.
* [d3.range](https://github.com/d3/d3-array/blob/v2.8.0/README.md#range) - generate a range of numeric values.
* [d3.transpose](https://github.com/d3/d3-array/blob/v2.8.0/README.md#transpose) - transpose an array of arrays.
* [d3.zip](https://github.com/d3/d3-array/blob/v2.8.0/README.md#zip) - transpose a variable number of arrays.

### [Iterables](https://github.com/d3/d3-array/blob/v2.8.0/README.md#iterables)

* [d3.every](https://github.com/d3/d3-array/blob/v2.8.0/README.md#every) - test if all values satisfy a condition.
* [d3.some](https://github.com/d3/d3-array/blob/v2.8.0/README.md#some) - test if any value satisfies a condition.
* [d3.filter](https://github.com/d3/d3-array/blob/v2.8.0/README.md#filter) - filter values.
* [d3.map](https://github.com/d3/d3-array/blob/v2.8.0/README.md#map) - map values.
* [d3.reduce](https://github.com/d3/d3-array/blob/v2.8.0/README.md#reduce) - reduce values.
* [d3.reverse](https://github.com/d3/d3-array/blob/v2.8.0/README.md#reverse) - reverse the order of values.
* [d3.sort](https://github.com/d3/d3-array/blob/v2.8.0/README.md#sort) - sort values.

### [Sets](https://github.com/d3/d3-array/blob/v2.8.0/README.md#sets)

* [d3.difference](https://github.com/d3/d3-array/blob/v2.8.0/README.md#difference) - compute a set difference.
* [d3.disjoint](https://github.com/d3/d3-array/blob/v2.8.0/README.md#disjoint) - test whether two sets are disjoint.
* [d3.intersection](https://github.com/d3/d3-array/blob/v2.8.0/README.md#intersection) - compute a set intersection.
* [d3.superset](https://github.com/d3/d3-array/blob/v2.8.0/README.md#superset) - test whether a set is a superset of another.
* [d3.subset](https://github.com/d3/d3-array/blob/v2.8.0/README.md#subset) - test whether a set is a subset of another.
* [d3.union](https://github.com/d3/d3-array/blob/v2.8.0/README.md#union) - compute a set union.

### [Histograms](https://github.com/d3/d3-array/blob/v2.8.0/README.md#bins)

Bin discrete samples into continuous, non-overlapping intervals.

* [d3.bin](https://github.com/d3/d3-array/blob/v2.8.0/README.md#bin) - create a new bin generator.
* [*bin*](https://github.com/d3/d3-array/blob/v2.8.0/README.md#_bin) - bins a given array of samples.
* [*bin*.value](https://github.com/d3/d3-array/blob/v2.8.0/README.md#bin_value)- specify a value accessor for each sample.
* [*bin*.domain](https://github.com/d3/d3-array/blob/v2.8.0/README.md#bin_domain) - specify the interval of observable values.
* [*bin*.thresholds](https://github.com/d3/d3-array/blob/v2.8.0/README.md#bin_thresholds) - specify how values are divided into bins.
* [d3.thresholdFreedmanDiaconis](https://github.com/d3/d3-array/blob/v2.8.0/README.md#thresholdFreedmanDiaconis) - the Freedman–Diaconis binning rule.
* [d3.thresholdScott](https://github.com/d3/d3-array/blob/v2.8.0/README.md#thresholdScott) - Scott’s normal reference binning rule.
* [d3.thresholdSturges](https://github.com/d3/d3-array/blob/v2.8.0/README.md#thresholdSturges) - Sturges’ binning formula.

## [Axes (d3-axis)](https://github.com/d3/d3-axis/tree/v2.0.0)

Human-readable reference marks for scales.

* [d3.axisTop](https://github.com/d3/d3-axis/blob/v2.0.0/README.md#axisTop) - create a new top-oriented axis generator.
* [d3.axisRight](https://github.com/d3/d3-axis/blob/v2.0.0/README.md#axisRight) - create a new right-oriented axis generator.
* [d3.axisBottom](https://github.com/d3/d3-axis/blob/v2.0.0/README.md#axisBottom) - create a new bottom-oriented axis generator.
* [d3.axisLeft](https://github.com/d3/d3-axis/blob/v2.0.0/README.md#axisLeft) - create a new left-oriented axis generator.
* [*axis*](https://github.com/d3/d3-axis/blob/v2.0.0/README.md#_axis) - generate an axis for the given selection.
* [*axis*.scale](https://github.com/d3/d3-axis/blob/v2.0.0/README.md#axis_scale) - set the scale.
* [*axis*.ticks](https://github.com/d3/d3-axis/blob/v2.0.0/README.md#axis_ticks) - customize how ticks are generated and formatted.
* [*axis*.tickArguments](https://github.com/d3/d3-axis/blob/v2.0.0/README.md#axis_tickArguments) - customize how ticks are generated and formatted.
* [*axis*.tickValues](https://github.com/d3/d3-axis/blob/v2.0.0/README.md#axis_tickValues) - set the tick values explicitly.
* [*axis*.tickFormat](https://github.com/d3/d3-axis/blob/v2.0.0/README.md#axis_tickFormat) - set the tick format explicitly.
* [*axis*.tickSize](https://github.com/d3/d3-axis/blob/v2.0.0/README.md#axis_tickSize) - set the size of the ticks.
* [*axis*.tickSizeInner](https://github.com/d3/d3-axis/blob/v2.0.0/README.md#axis_tickSizeInner) - set the size of inner ticks.
* [*axis*.tickSizeOuter](https://github.com/d3/d3-axis/blob/v2.0.0/README.md#axis_tickSizeOuter) - set the size of outer (extent) ticks.
* [*axis*.tickPadding](https://github.com/d3/d3-axis/blob/v2.0.0/README.md#axis_tickPadding) - set the padding between ticks and labels.

## [Brushes (d3-brush)](https://github.com/d3/d3-brush/tree/v2.0.0)

Select a one- or two-dimensional region using the mouse or touch.

* [d3.brush](https://github.com/d3/d3-brush/blob/v2.0.0/README.md#brush) - create a new two-dimensional brush.
* [d3.brushX](https://github.com/d3/d3-brush/blob/v2.0.0/README.md#brushX) - create a brush along the *x*-dimension.
* [d3.brushY](https://github.com/d3/d3-brush/blob/v2.0.0/README.md#brushY) - create a brush along the *y*-dimension.
* [*brush*](https://github.com/d3/d3-brush/blob/v2.0.0/README.md#_brush) - apply the brush to a selection.
* [*brush*.move](https://github.com/d3/d3-brush/blob/v2.0.0/README.md#brush_move) - move the brush selection.
* [*brush*.clear](https://github.com/d3/d3-brush/blob/v2.0.0/README.md#brush_clear) - clear the brush selection.
* [*brush*.extent](https://github.com/d3/d3-brush/blob/v2.0.0/README.md#brush_extent) - define the brushable region.
* [*brush*.filter](https://github.com/d3/d3-brush/blob/v2.0.0/README.md#brush_filter) - control which input events initiate brushing.
* [*brush*.touchable](https://github.com/d3/d3-brush/blob/v2.0.0/README.md#brush_touchable) - set the touch support detector.
* [*brush*.keyModifiers](https://github.com/d3/d3-brush/blob/v2.0.0/README.md#brush_keyModifiers) - enable or disable key interaction.
* [*brush*.handleSize](https://github.com/d3/d3-brush/blob/v2.0.0/README.md#brush_handleSize) - set the size of the brush handles.
* [*brush*.on](https://github.com/d3/d3-brush/blob/v2.0.0/README.md#brush_on) - listen for brush events.
* [d3.brushSelection](https://github.com/d3/d3-brush/blob/v2.0.0/README.md#brushSelection) - get the brush selection for a given node.

## [Chords (d3-chord)](https://github.com/d3/d3-chord/tree/v2.0.0)

* [d3.chord](https://github.com/d3/d3-chord/blob/v2.0.0/README.md#chord) - create a new chord layout.
* [*chord*](https://github.com/d3/d3-chord/blob/v2.0.0/README.md#_chord) - compute the layout for the given matrix.
* [*chord*.padAngle](https://github.com/d3/d3-chord/blob/v2.0.0/README.md#chord_padAngle) - set the padding between adjacent groups.
* [*chord*.sortGroups](https://github.com/d3/d3-chord/blob/v2.0.0/README.md#chord_sortGroups) - define the group order.
* [*chord*.sortSubgroups](https://github.com/d3/d3-chord/blob/v2.0.0/README.md#chord_sortSubgroups) - define the source and target order within groups.
* [*chord*.sortChords](https://github.com/d3/d3-chord/blob/v2.0.0/README.md#chord_sortChords) - define the chord order across groups.
* [d3.chordDirected](https://github.com/d3/d3-chord/blob/v2.0.0/README.md#chordDirected) - create a directed chord generator.
* [d3.chordTranspose](https://github.com/d3/d3-chord/blob/v2.0.0/README.md#chordTranspose) - create a transposed chord generator.
* [d3.ribbon](https://github.com/d3/d3-chord/blob/v2.0.0/README.md#ribbon) - create a ribbon shape generator.
* [*ribbon*](https://github.com/d3/d3-chord/blob/v2.0.0/README.md#_ribbon) - generate a ribbon shape.
* [*ribbon*.source](https://github.com/d3/d3-chord/blob/v2.0.0/README.md#ribbon_source) - set the source accessor.
* [*ribbon*.target](https://github.com/d3/d3-chord/blob/v2.0.0/README.md#ribbon_target) - set the target accessor.
* [*ribbon*.radius](https://github.com/d3/d3-chord/blob/v2.0.0/README.md#ribbon_radius) - set the ribbon source and target radius.
* [*ribbon*.sourceRadius](https://github.com/d3/d3-chord/blob/v2.0.0/README.md#ribbon_sourceRadius) - set the ribbon source radius.
* [*ribbon*.targetRadius](https://github.com/d3/d3-chord/blob/v2.0.0/README.md#ribbon_targetRadius) - set the ribbon target radius.
* [*ribbon*.startAngle](https://github.com/d3/d3-chord/blob/v2.0.0/README.md#ribbon_startAngle) - set the ribbon source or target start angle.
* [*ribbon*.endAngle](https://github.com/d3/d3-chord/blob/v2.0.0/README.md#ribbon_endAngle) - set the ribbon source or target end angle.
* [*ribbon*.padAngle](https://github.com/d3/d3-chord/blob/v2.0.0/README.md#ribbon_padAngle) - set the pad angle accessor.
* [*ribbon*.context](https://github.com/d3/d3-chord/blob/v2.0.0/README.md#ribbon_context) - set the render context.
* [d3.ribbonArrow](https://github.com/d3/d3-chord/blob/v2.0.0/README.md#ribbonArrow) - create an arrow ribbon generator.
* [*ribbonArrow*.headRadius](https://github.com/d3/d3-chord/blob/v2.0.0/README.md#ribbonArrow_headRadius) - set the arrowhead radius accessor.

## [Colors (d3-color)](https://github.com/d3/d3-color/tree/v2.0.0)

Color manipulation and color space conversion.

* [d3.color](https://github.com/d3/d3-color/blob/v2.0.0/README.md#color) - parse the given CSS color specifier.
* [*color*.opacity](https://github.com/d3/d3-color/blob/v2.0.0/README.md#color_opacity) - the color’s opacity.
* [*color*.rgb](https://github.com/d3/d3-color/blob/v2.0.0/README.md#color_rgb) - compute the RGB equivalent of this color.
* [*color*.copy](https://github.com/d3/d3-color/blob/v2.0.0/README.md#color_copy) - return a copy of this color.
* [*color*.brighter](https://github.com/d3/d3-color/blob/v2.0.0/README.md#color_brighter) - create a brighter copy of this color.
* [*color*.darker](https://github.com/d3/d3-color/blob/v2.0.0/README.md#color_darker) - create a darker copy of this color.
* [*color*.displayable](https://github.com/d3/d3-color/blob/v2.0.0/README.md#color_displayable) - returns true if the color is displayable on standard hardware.
* [*color*.formatHex](https://github.com/d3/d3-color/blob/v2.0.0/README.md#color_formatHex) - returns the hexadecimal RGB string representation of this color.
* [*color*.formatHsl](https://github.com/d3/d3-color/blob/v2.0.0/README.md#color_formatHsl) - returns the RGB string representation of this color.
* [*color*.formatRgb](https://github.com/d3/d3-color/blob/v2.0.0/README.md#color_formatRgb) - returns the HSL string representation of this color.
* [*color*.toString](https://github.com/d3/d3-color/blob/v2.0.0/README.md#color_toString) - returns the RGB string representation of this color.
* [d3.rgb](https://github.com/d3/d3-color/blob/v2.0.0/README.md#rgb) - create a new RGB color.
* [d3.hsl](https://github.com/d3/d3-color/blob/v2.0.0/README.md#hsl) - create a new HSL color.
* [d3.lab](https://github.com/d3/d3-color/blob/v2.0.0/README.md#lab) - create a new Lab color.
* [d3.gray](https://github.com/d3/d3-color/blob/v2.0.0/README.md#gray) - create a new Lab gray.
* [d3.hcl](https://github.com/d3/d3-color/blob/v2.0.0/README.md#hcl) - create a new HCL color.
* [d3.lch](https://github.com/d3/d3-color/blob/v2.0.0/README.md#lch) - create a new HCL color.
* [d3.cubehelix](https://github.com/d3/d3-color/blob/v2.0.0/README.md#cubehelix) - create a new Cubehelix color.

## [Color Schemes (d3-scale-chromatic)](https://github.com/d3/d3-scale-chromatic/tree/v2.0.0)

Color ramps and palettes for quantitative, ordinal and categorical scales.

### Categorical

* [d3.schemeCategory10](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#schemeCategory10) - an array of ten categorical colors.
* [d3.schemeAccent](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#schemeAccent) - an array of eight categorical colors.
* [d3.schemeDark2](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#schemeDark2) - an array of eight categorical colors.
* [d3.schemePaired](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#schemePaired) - an array of twelve categorical colors.
* [d3.schemePastel1](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#schemePastel1) - an array of nine categorical colors.
* [d3.schemePastel2](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#schemePastel2) - an array of eight categorical colors.
* [d3.schemeSet1](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#schemeSet1) - an array of nine categorical colors.
* [d3.schemeSet2](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#schemeSet2) - an array of eight categorical colors.
* [d3.schemeSet3](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#schemeSet3) - an array of twelve categorical colors.
* [d3.schemeTableau10](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#schemeTableau10) - an array of ten categorical colors.

### Diverging

* [d3.interpolateBrBG](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#interpolateBrBG) - ColorBrewer BrBG interpolator.
* [d3.interpolatePiYG](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#interpolatePiYG) - ColorBrewer PiYG interpolator.
* [d3.interpolatePRGn](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#interpolatePRGn) - ColorBrewer PRGn interpolator.
* [d3.interpolatePuOr](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#interpolatePuOr) - ColorBrewer PuOr interpolator.
* [d3.interpolateRdBu](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#interpolateRdBu) - ColorBrewer RdBu interpolator.
* [d3.interpolateRdGy](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#interpolateRdGy) - ColorBrewer RdGy interpolator.
* [d3.interpolateRdYlBu](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#interpolateRdYlBu) - ColorBrewer RdYlBu interpolator.
* [d3.interpolateRdYlGn](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#interpolateRdYlGn) - ColorBrewer RdYlGn interpolator.
* [d3.interpolateSpectral](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#interpolateSpectral) - ColorBrewer spectral interpolator.
* [d3.schemeBrBG](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#schemeBrBG) - ColorBrewer BrBG scheme.
* [d3.schemePiYG](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#schemePiYG) - ColorBrewer PiYG scheme.
* [d3.schemePRGn](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#schemePRGn) - ColorBrewer PRGn scheme.
* [d3.schemePuOr](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#schemePuOr) - ColorBrewer PuOr scheme.
* [d3.schemeRdBu](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#schemeRdBu) - ColorBrewer RdBu scheme.
* [d3.schemeRdGy](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#schemeRdGy) - ColorBrewer RdGy scheme.
* [d3.schemeRdYlBu](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#schemeRdYlBu) - ColorBrewer RdYlBu scheme.
* [d3.schemeRdYlGn](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#schemeRdYlGn) - ColorBrewer RdYlGn scheme.
* [d3.schemeSpectral](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#schemeSpectral) - ColorBrewer spectral scheme.

### Sequential (Single Hue)

* [d3.interpolateBlues](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#interpolateBlues) -
* [d3.interpolateGreens](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#interpolateGreens) -
* [d3.interpolateGreys](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#interpolateGreys) -
* [d3.interpolateOranges](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#interpolateOranges) -
* [d3.interpolatePurples](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#interpolatePurples) -
* [d3.interpolateReds](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#interpolateReds) -
* [d3.schemeBlues](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#schemeBlues) -
* [d3.schemeGreens](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#schemeGreens) -
* [d3.schemeGreys](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#schemeGreys) -
* [d3.schemeOranges](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#schemeOranges) -
* [d3.schemePurples](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#schemePurples) -
* [d3.schemeReds](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#schemeReds) -

### Sequential (Multi-Hue)

* [d3.interpolateBuGn](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#interpolateBuGn) - ColorBrewer BuGn interpolator.
* [d3.interpolateBuPu](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#interpolateBuPu) - ColorBrewer BuPu interpolator.
* [d3.interpolateCividis](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#interpolateCividis) - cividis interpolator.
* [d3.interpolateCool](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#interpolateCool) - cool interpolator.
* [d3.interpolateCubehelixDefault](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#interpolateCubehelixDefault) - cubehelix interpolator.
* [d3.interpolateGnBu](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#interpolateGnBu) - ColorBrewer GnBu interpolator.
* [d3.interpolateInferno](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#interpolateInferno) - inferno interpolator.
* [d3.interpolateMagma](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#interpolateMagma) - magma interpolator.
* [d3.interpolateOrRd](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#interpolateOrRd) - ColorBrewer OrRd interpolator.
* [d3.interpolatePlasma](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#interpolatePlasma) - plasma interpolator.
* [d3.interpolatePuBu](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#interpolatePuBu) - ColorBrewer PuBu interpolator.
* [d3.interpolatePuBuGn](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#interpolatePuBuGn) - ColorBrewer PuBuGn interpolator.
* [d3.interpolatePuRd](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#interpolatePuRd) - ColorBrewer PuRd interpolator.
* [d3.interpolateRdPu](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#interpolateRdPu) - ColorBrewer RdPu interpolator.
* [d3.interpolateTurbo](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#interpolateTurbo) - turbo interpolator.
* [d3.interpolateViridis](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#interpolateViridis) - viridis interpolator.
* [d3.interpolateWarm](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#interpolateWarm) - warm interpolator.
* [d3.interpolateYlGn](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#interpolateYlGn) - ColorBrewer YlGn interpolator.
* [d3.interpolateYlGnBu](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#interpolateYlGnBu) - ColorBrewer YlGnBu interpolator.
* [d3.interpolateYlOrBr](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#interpolateYlOrBr) - ColorBrewer YlOrBr interpolator.
* [d3.interpolateYlOrRd](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#interpolateYlOrRd) - ColorBrewer YlOrRd interpolator.
* [d3.schemeBuGn](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#schemeBuGn) - ColorBrewer BuGn scheme.
* [d3.schemeBuPu](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#schemeBuPu) - ColorBrewer BuPu scheme.
* [d3.schemeGnBu](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#schemeGnBu) - ColorBrewer GnBu scheme.
* [d3.schemeOrRd](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#schemeOrRd) - ColorBrewer OrRd scheme.
* [d3.schemePuBu](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#schemePuBu) - ColorBrewer PuBu scheme.
* [d3.schemePuBuGn](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#schemePuBuGn) - ColorBrewer PuBuGn scheme.
* [d3.schemePuRd](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#schemePuRd) - ColorBrewer PuRd scheme.
* [d3.schemeRdPu](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#schemeRdPu) - ColorBrewer RdPu scheme.
* [d3.schemeYlGn](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#schemeYlGn) - ColorBrewer YlGn scheme.
* [d3.schemeYlGnBu](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#schemeYlGnBu) - ColorBrewer YlGnBu scheme.
* [d3.schemeYlOrBr](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#schemeYlOrBr) - ColorBrewer YlOrBr scheme.
* [d3.schemeYlOrRd](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#schemeYlOrRd) - ColorBrewer YlOrRd scheme.

### Cyclical

* [d3.interpolateRainbow](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#interpolateRainbow) - the “less-angry” rainbow
* [d3.interpolateSinebow](https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md#interpolateSinebow) - the “sinebow” smooth rainbow

## [Contours (d3-contour)](https://github.com/d3/d3-contour/tree/v2.0.0)

Compute contour polygons using marching squares.

* [d3.contours](https://github.com/d3/d3-contour/blob/v2.0.0/README.md#contours) - create a new contour generator.
* [*contours*](https://github.com/d3/d3-contour/blob/v2.0.0/README.md#_contours) - compute the contours for a given grid of values.
* [*contours*.contour](https://github.com/d3/d3-contour/blob/v2.0.0/README.md#contours_contour) - compute a contour for a given value.
* [*contours*.size](https://github.com/d3/d3-contour/blob/v2.0.0/README.md#contours_size) - set the size of a contour generator.
* [*contours*.smooth](https://github.com/d3/d3-contour/blob/v2.0.0/README.md#contours_smooth) - set whether or not the generated contours are smoothed.
* [*contours*.thresholds](https://github.com/d3/d3-contour/blob/v2.0.0/README.md#contours_thresholds) - set the thresholds of a contour generator.
* [d3.contourDensity](https://github.com/d3/d3-contour/blob/v2.0.0/README.md#contourDensity) - create a new density estimator.
* [*density*](https://github.com/d3/d3-contour/blob/v2.0.0/README.md#_density) - estimate the density of a given array of samples.
* [*density*.x](https://github.com/d3/d3-contour/blob/v2.0.0/README.md#density_x) - set the *x* accessor of the density estimator.
* [*density*.y](https://github.com/d3/d3-contour/blob/v2.0.0/README.md#density_y) - set the *y* accessor of the density estimator.
* [*density*.weight](https://github.com/d3/d3-contour/blob/v2.0.0/README.md#density_weight) - set the *weight* accessor of the density estimator.
* [*density*.size](https://github.com/d3/d3-contour/blob/v2.0.0/README.md#density_size) - set the size of the density estimator.
* [*density*.cellSize](https://github.com/d3/d3-contour/blob/v2.0.0/README.md#density_cellSize) - set the cell size of the density estimator.
* [*density*.thresholds](https://github.com/d3/d3-contour/blob/v2.0.0/README.md#density_thresholds) - set the thresholds of the density estimator.
* [*density*.bandwidth](https://github.com/d3/d3-contour/blob/v2.0.0/README.md#density_bandwidth) - set the bandwidth of the density estimator.

## [Voronoi Diagrams (d3-delaunay)](https://github.com/d3/d3-delaunay/tree/v5.3.0)

Compute the Voronoi diagram of a set of two-dimensional points.

* [new Delaunay](https://github.com/d3/d3-delaunay/blob/v5.3.0/README.md#new_Delaunay) - create a delaunay triangulation for an array of point coordinates.
* [Delaunay.from](https://github.com/d3/d3-delaunay/blob/v5.3.0/README.md#delaunay_from) - create a delaunay triangulation for an iterable of points.
* [*delaunay*.points](https://github.com/d3/d3-delaunay/blob/v5.3.0/README.md#delaunay_points) - the coordinates of the points.
* [*delaunay*.halfedges](https://github.com/d3/d3-delaunay/blob/v5.3.0/README.md#delaunay_halfedges) - the delaunay halfedges.
* [*delaunay*.hull](https://github.com/d3/d3-delaunay/blob/v5.3.0/README.md#delaunay_hull) - the convex hull as point indices.
* [*delaunay*.triangles](https://github.com/d3/d3-delaunay/blob/v5.3.0/README.md#delaunay_triangles) - the delaunay triangles.
* [*delaunay*.inedges](https://github.com/d3/d3-delaunay/blob/v5.3.0/README.md#delaunay_inedges) - the delaunay inedges
* [*delaunay*.find](https://github.com/d3/d3-delaunay/blob/v5.3.0/README.md#delaunay_find) - find the closest point in the delaunay triangulation.
* [*delaunay*.neighbors](https://github.com/d3/d3-delaunay/blob/v5.3.0/README.md#delaunay_neighbors) - the neighbors of a point in the delaunay triangulation.
* [*delaunay*.render](https://github.com/d3/d3-delaunay/blob/v5.3.0/README.md#delaunay_render) - render the edges of the delaunay triangulation.
* [*delaunay*.renderHull](https://github.com/d3/d3-delaunay/blob/v5.3.0/README.md#delaunay_renderHull) - render the convex hull.
* [*delaunay*.renderTriangle](https://github.com/d3/d3-delaunay/blob/v5.3.0/README.md#delaunay_renderTriangle) - render a triangle.
* [*delaunay*.renderPoints](https://github.com/d3/d3-delaunay/blob/v5.3.0/README.md#delaunay_renderPoints) - render the points.
* [*delaunay*.hullPolygon](https://github.com/d3/d3-delaunay/blob/v5.3.0/README.md#delaunay_hullPolygon) - the closed convex hull as point coordinates.
* [*delaunay*.trianglePolygons](https://github.com/d3/d3-delaunay/blob/v5.3.0/README.md#delaunay_trianglePolygons) - iterate over all the triangles as polygons.
* [*delaunay*.trianglePolygon](https://github.com/d3/d3-delaunay/blob/v5.3.0/README.md#delaunay_trianglePolygon) - return a triangle as a polygon.
* [*delaunay*.update](https://github.com/d3/d3-delaunay/blob/v5.3.0/README.md#delaunay_update) - update a delaunay triangulation in place.
* [*delaunay*.voronoi](https://github.com/d3/d3-delaunay/blob/v5.3.0/README.md#delaunay_voronoi) - compute the voronoi diagram associated with a delaunay triangulation.
* [*voronoi*.delaunay](https://github.com/d3/d3-delaunay/blob/v5.3.0/README.md#voronoi_delaunay) - the voronoi diagram’s source delaunay triangulation.
* [*voronoi*.circumcenters](https://github.com/d3/d3-delaunay/blob/v5.3.0/README.md#voronoi_circumcenters) - the triangles’ circumcenters.
* [*voronoi*.vectors](https://github.com/d3/d3-delaunay/blob/v5.3.0/README.md#voronoi_vectors) - directions for the outer (infinite) cells of the voronoi diagram.
* [*voronoi*.xmin](https://github.com/d3/d3-delaunay/blob/v5.3.0/README.md#voronoi_xmin) - set the *xmin* bound of the extent.
* [*voronoi*.ymin](https://github.com/d3/d3-delaunay/blob/v5.3.0/README.md#voronoi_ymin) - set the *ymin* bound of the extent.
* [*voronoi*.xmax](https://github.com/d3/d3-delaunay/blob/v5.3.0/README.md#voronoi_xmax) - set the *xmax* bound of the extent.
* [*voronoi*.ymax](https://github.com/d3/d3-delaunay/blob/v5.3.0/README.md#voronoi_ymax) - set the *ymax* bound of the extent.
* [*voronoi*.contains](https://github.com/d3/d3-delaunay/blob/v5.3.0/README.md#voronoi_contains) - test whether a point is inside a voronoi cell.
* [*voronoi*.neighbors](https://github.com/d3/d3-delaunay/blob/v5.3.0/README.md#voronoi_neighbors) - the neighbors of a point in the voronoi diagram.
* [*voronoi*.render](https://github.com/d3/d3-delaunay/blob/v5.3.0/README.md#voronoi_render) - render the mesh of voronoi cells.
* [*voronoi*.renderBounds](https://github.com/d3/d3-delaunay/blob/v5.3.0/README.md#voronoi_renderBounds) - render the extent.
* [*voronoi*.renderCell](https://github.com/d3/d3-delaunay/blob/v5.3.0/README.md#voronoi_renderCell) - render a voronoi cell.
* [*voronoi*.cellPolygons](https://github.com/d3/d3-delaunay/blob/v5.3.0/README.md#voronoi_cellPolygons) - iterate over all the cells as polygons.
* [*voronoi*.cellPolygon](https://github.com/d3/d3-delaunay/blob/v5.3.0/README.md#voronoi_cellPolygon) - return a cell as a polygon.
* [*voronoi*.update](https://github.com/d3/d3-delaunay/blob/v5.3.0/README.md#voronoi_update) - update a voronoi diagram in place.

## [Dispatches (d3-dispatch)](https://github.com/d3/d3-dispatch/tree/v2.0.0)

Separate concerns using named callbacks.

* [d3.dispatch](https://github.com/d3/d3-dispatch/blob/v2.0.0/README.md#dispatch) - create a custom event dispatcher.
* [*dispatch*.on](https://github.com/d3/d3-dispatch/blob/v2.0.0/README.md#dispatch_on) - register or unregister an event listener.
* [*dispatch*.copy](https://github.com/d3/d3-dispatch/blob/v2.0.0/README.md#dispatch_copy) - create a copy of a dispatcher.
* [*dispatch*.call](https://github.com/d3/d3-dispatch/blob/v2.0.0/README.md#dispatch_call) - dispatch an event to registered listeners.
* [*dispatch*.apply](https://github.com/d3/d3-dispatch/blob/v2.0.0/README.md#dispatch_apply) - dispatch an event to registered listeners.

## [Dragging (d3-drag)](https://github.com/d3/d3-drag/tree/v2.0.0)

Drag and drop SVG, HTML or Canvas using mouse or touch input.

* [d3.drag](https://github.com/d3/d3-drag/blob/v2.0.0/README.md#drag) - create a drag behavior.
* [*drag*](https://github.com/d3/d3-drag/blob/v2.0.0/README.md#_drag) - apply the drag behavior to a selection.
* [*drag*.container](https://github.com/d3/d3-drag/blob/v2.0.0/README.md#drag_container) - set the coordinate system.
* [*drag*.filter](https://github.com/d3/d3-drag/blob/v2.0.0/README.md#drag_filter) - ignore some initiating input events.
* [*drag*.touchable](https://github.com/d3/d3-drag/blob/v2.0.0/README.md#drag_touchable) - set the touch support detector.
* [*drag*.subject](https://github.com/d3/d3-drag/blob/v2.0.0/README.md#drag_subject) - set the thing being dragged.
* [*drag*.clickDistance](https://github.com/d3/d3-drag/blob/v2.0.0/README.md#drag_clickDistance) - set the click distance threshold.
* [*drag*.on](https://github.com/d3/d3-drag/blob/v2.0.0/README.md#drag_on) - listen for drag events.
* [d3.dragDisable](https://github.com/d3/d3-drag/blob/v2.0.0/README.md#dragDisable) - prevent native drag-and-drop and text selection.
* [d3.dragEnable](https://github.com/d3/d3-drag/blob/v2.0.0/README.md#dragEnable) - enable native drag-and-drop and text selection.
* [*event*.on](https://github.com/d3/d3-drag/blob/v2.0.0/README.md#event_on) - listen for drag events on the current gesture.

## [Delimiter-Separated Values (d3-dsv)](https://github.com/d3/d3-dsv/tree/v2.0.0)

Parse and format delimiter-separated values, most commonly CSV and TSV.

* [d3.csvParse](https://github.com/d3/d3-dsv/blob/v2.0.0/README.md#csvParse) - parse the given CSV string, returning an array of objects.
* [d3.csvParseRows](https://github.com/d3/d3-dsv/blob/v2.0.0/README.md#csvParseRows) - parse the given CSV string, returning an array of rows.
* [d3.csvFormat](https://github.com/d3/d3-dsv/blob/v2.0.0/README.md#csvFormat) - format the given array of objects as CSV.
* [d3.csvFormatBody](https://github.com/d3/d3-dsv/blob/v2.0.0/README.md#csvFormatBody) - format the given array of objects as CSV.
* [d3.csvFormatRows](https://github.com/d3/d3-dsv/blob/v2.0.0/README.md#csvFormatRows) - format the given array of rows as CSV.
* [d3.csvFormatRow](https://github.com/d3/d3-dsv/blob/v2.0.0/README.md#csvFormatRow) - format the given row as CSV.
* [d3.csvFormatValue](https://github.com/d3/d3-dsv/blob/v2.0.0/README.md#csvFormatValue) - format the given value as CSV.
* [d3.tsvParse](https://github.com/d3/d3-dsv/blob/v2.0.0/README.md#tsvParse) - parse the given TSV string, returning an array of objects.
* [d3.tsvParseRows](https://github.com/d3/d3-dsv/blob/v2.0.0/README.md#tsvParseRows) - parse the given TSV string, returning an array of rows.
* [d3.tsvFormat](https://github.com/d3/d3-dsv/blob/v2.0.0/README.md#tsvFormat) - format the given array of objects as TSV.
* [d3.tsvFormatBody](https://github.com/d3/d3-dsv/blob/v2.0.0/README.md#tsvFormatBody) - format the given array of objects as TSV.
* [d3.tsvFormatRows](https://github.com/d3/d3-dsv/blob/v2.0.0/README.md#tsvFormatRows) - format the given array of rows as TSV.
* [d3.tsvFormatRow](https://github.com/d3/d3-dsv/blob/v2.0.0/README.md#tsvFormatRow) - format the given row as TSV.
* [d3.tsvFormatValue](https://github.com/d3/d3-dsv/blob/v2.0.0/README.md#tsvFormatValue) - format the given value as TSV.
* [d3.dsvFormat](https://github.com/d3/d3-dsv/blob/v2.0.0/README.md#dsvFormat) - create a new parser and formatter for the given delimiter.
* [*dsv*.parse](https://github.com/d3/d3-dsv/blob/v2.0.0/README.md#dsv_parse) - parse the given string, returning an array of objects.
* [*dsv*.parseRows](https://github.com/d3/d3-dsv/blob/v2.0.0/README.md#dsv_parseRows) - parse the given string, returning an array of rows.
* [*dsv*.format](https://github.com/d3/d3-dsv/blob/v2.0.0/README.md#dsv_format) - format the given array of objects.
* [*dsv*.formatBody](https://github.com/d3/d3-dsv/blob/v2.0.0/README.md#dsv_formatBody) - format the given array of objects.
* [*dsv*.formatRows](https://github.com/d3/d3-dsv/blob/v2.0.0/README.md#dsv_formatRows) - format the given array of rows.
* [*dsv*.formatRow](https://github.com/d3/d3-dsv/blob/v2.0.0/README.md#dsv_formatRow) - format the given row.
* [*dsv*.formatValue](https://github.com/d3/d3-dsv/blob/v2.0.0/README.md#dsv_formatValue) - format the given value.
* [d3.autoType](https://github.com/d3/d3-dsv/blob/v2.0.0/README.md#autoType) - automatically infer value types for the given object.

## [Easings (d3-ease)](https://github.com/d3/d3-ease/tree/v2.0.0)

Easing functions for smooth animation.

* [*ease*](https://github.com/d3/d3-ease/blob/v2.0.0/README.md#_ease) - ease the given normalized time.
* [d3.easeLinear](https://github.com/d3/d3-ease/blob/v2.0.0/README.md#easeLinear) - linear easing; the identity function.
* [d3.easePolyIn](https://github.com/d3/d3-ease/blob/v2.0.0/README.md#easePolyIn) - polynomial easing; raises time to the given power.
* [d3.easePolyOut](https://github.com/d3/d3-ease/blob/v2.0.0/README.md#easePolyOut) - reverse polynomial easing.
* [d3.easePoly](https://github.com/d3/d3-ease/blob/v2.0.0/README.md#easePoly) - an alias for easePolyInOut.
* [d3.easePolyInOut](https://github.com/d3/d3-ease/blob/v2.0.0/README.md#easePolyInOut) - symmetric polynomial easing.
* [*poly*.exponent](https://github.com/d3/d3-ease/blob/v2.0.0/README.md#poly_exponent) - specify the polynomial exponent.
* [d3.easeQuadIn](https://github.com/d3/d3-ease/blob/v2.0.0/README.md#easeQuadIn) - quadratic easing; squares time.
* [d3.easeQuadOut](https://github.com/d3/d3-ease/blob/v2.0.0/README.md#easeQuadOut) - reverse quadratic easing.
* [d3.easeQuad](https://github.com/d3/d3-ease/blob/v2.0.0/README.md#easeQuad) - an alias for easeQuadInOut.
* [d3.easeQuadInOut](https://github.com/d3/d3-ease/blob/v2.0.0/README.md#easeQuadInOut) - symmetric quadratic easing.
* [d3.easeCubicIn](https://github.com/d3/d3-ease/blob/v2.0.0/README.md#easeCubicIn) - cubic easing; cubes time.
* [d3.easeCubicOut](https://github.com/d3/d3-ease/blob/v2.0.0/README.md#easeCubicOut) - reverse cubic easing.
* [d3.easeCubic](https://github.com/d3/d3-ease/blob/v2.0.0/README.md#easeCubic) - an alias for easeCubicInOut.
* [d3.easeCubicInOut](https://github.com/d3/d3-ease/blob/v2.0.0/README.md#easeCubicInOut) - symmetric cubic easing.
* [d3.easeSinIn](https://github.com/d3/d3-ease/blob/v2.0.0/README.md#easeSinIn) - sinusoidal easing.
* [d3.easeSinOut](https://github.com/d3/d3-ease/blob/v2.0.0/README.md#easeSinOut) - reverse sinusoidal easing.
* [d3.easeSin](https://github.com/d3/d3-ease/blob/v2.0.0/README.md#easeSin) - an alias for easeSinInOut.
* [d3.easeSinInOut](https://github.com/d3/d3-ease/blob/v2.0.0/README.md#easeSinInOut) - symmetric sinusoidal easing.
* [d3.easeExpIn](https://github.com/d3/d3-ease/blob/v2.0.0/README.md#easeExpIn) - exponential easing.
* [d3.easeExpOut](https://github.com/d3/d3-ease/blob/v2.0.0/README.md#easeExpOut) - reverse exponential easing.
* [d3.easeExp](https://github.com/d3/d3-ease/blob/v2.0.0/README.md#easeExp) - an alias for easeExpInOut.
* [d3.easeExpInOut](https://github.com/d3/d3-ease/blob/v2.0.0/README.md#easeExpInOut) - symmetric exponential easing.
* [d3.easeCircleIn](https://github.com/d3/d3-ease/blob/v2.0.0/README.md#easeCircleIn) - circular easing.
* [d3.easeCircleOut](https://github.com/d3/d3-ease/blob/v2.0.0/README.md#easeCircleOut) - reverse circular easing.
* [d3.easeCircle](https://github.com/d3/d3-ease/blob/v2.0.0/README.md#easeCircle) - an alias for easeCircleInOut.
* [d3.easeCircleInOut](https://github.com/d3/d3-ease/blob/v2.0.0/README.md#easeCircleInOut) - symmetric circular easing.
* [d3.easeElasticIn](https://github.com/d3/d3-ease/blob/v2.0.0/README.md#easeElasticIn) - elastic easing, like a rubber band.
* [d3.easeElastic](https://github.com/d3/d3-ease/blob/v2.0.0/README.md#easeElastic) - an alias for easeElasticOut.
* [d3.easeElasticOut](https://github.com/d3/d3-ease/blob/v2.0.0/README.md#easeElasticOut) - reverse elastic easing.
* [d3.easeElasticInOut](https://github.com/d3/d3-ease/blob/v2.0.0/README.md#easeElasticInOut) - symmetric elastic easing.
* [*elastic*.amplitude](https://github.com/d3/d3-ease/blob/v2.0.0/README.md#elastic_amplitude) - specify the elastic amplitude.
* [*elastic*.period](https://github.com/d3/d3-ease/blob/v2.0.0/README.md#elastic_period) - specify the elastic period.
* [d3.easeBackIn](https://github.com/d3/d3-ease/blob/v2.0.0/README.md#easeBackIn) - anticipatory easing, like a dancer bending his knees before jumping.
* [d3.easeBackOut](https://github.com/d3/d3-ease/blob/v2.0.0/README.md#easeBackOut) - reverse anticipatory easing.
* [d3.easeBack](https://github.com/d3/d3-ease/blob/v2.0.0/README.md#easeBack) - an alias for easeBackInOut.
* [d3.easeBackInOut](https://github.com/d3/d3-ease/blob/v2.0.0/README.md#easeBackInOut) - symmetric anticipatory easing.
* [*back*.overshoot](https://github.com/d3/d3-ease/blob/v2.0.0/README.md#back_overshoot) - specify the amount of overshoot.
* [d3.easeBounceIn](https://github.com/d3/d3-ease/blob/v2.0.0/README.md#easeBounceIn) - bounce easing, like a rubber ball.
* [d3.easeBounce](https://github.com/d3/d3-ease/blob/v2.0.0/README.md#easeBounce) - an alias for easeBounceOut.
* [d3.easeBounceOut](https://github.com/d3/d3-ease/blob/v2.0.0/README.md#easeBounceOut) - reverse bounce easing.
* [d3.easeBounceInOut](https://github.com/d3/d3-ease/blob/v2.0.0/README.md#easeBounceInOut) - symmetric bounce easing.

## [Fetches (d3-fetch)](https://github.com/d3/d3-fetch/tree/v2.0.0)

Convenience methods on top of the Fetch API.

* [d3.blob](https://github.com/d3/d3-fetch/blob/v2.0.0/README.md#blob) - get a file as a blob.
* [d3.buffer](https://github.com/d3/d3-fetch/blob/v2.0.0/README.md#buffer) - get a file as an array buffer.
* [d3.csv](https://github.com/d3/d3-fetch/blob/v2.0.0/README.md#csv) - get a comma-separated values (CSV) file.
* [d3.dsv](https://github.com/d3/d3-fetch/blob/v2.0.0/README.md#dsv) - get a delimiter-separated values (CSV) file.
* [d3.html](https://github.com/d3/d3-fetch/blob/v2.0.0/README.md#html) - get an HTML file.
* [d3.image](https://github.com/d3/d3-fetch/blob/v2.0.0/README.md#image) - get an image.
* [d3.json](https://github.com/d3/d3-fetch/blob/v2.0.0/README.md#json) - get a JSON file.
* [d3.svg](https://github.com/d3/d3-fetch/blob/v2.0.0/README.md#svg) - get an SVG file.
* [d3.text](https://github.com/d3/d3-fetch/blob/v2.0.0/README.md#text) - get a plain text file.
* [d3.tsv](https://github.com/d3/d3-fetch/blob/v2.0.0/README.md#tsv) - get a tab-separated values (TSV) file.
* [d3.xml](https://github.com/d3/d3-fetch/blob/v2.0.0/README.md#xml) - get an XML file.

## [Forces (d3-force)](https://github.com/d3/d3-force/tree/v2.1.1)

Force-directed graph layout using velocity Verlet integration.

* [d3.forceSimulation](https://github.com/d3/d3-force/blob/v2.1.1/README.md#forceSimulation) - create a new force simulation.
* [*simulation*.restart](https://github.com/d3/d3-force/blob/v2.1.1/README.md#simulation_restart) - reheat and restart the simulation’s timer.
* [*simulation*.stop](https://github.com/d3/d3-force/blob/v2.1.1/README.md#simulation_stop) - stop the simulation’s timer.
* [*simulation*.tick](https://github.com/d3/d3-force/blob/v2.1.1/README.md#simulation_tick) - advance the simulation one step.
* [*simulation*.nodes](https://github.com/d3/d3-force/blob/v2.1.1/README.md#simulation_nodes) - set the simulation’s nodes.
* [*simulation*.alpha](https://github.com/d3/d3-force/blob/v2.1.1/README.md#simulation_alpha) - set the current alpha.
* [*simulation*.alphaMin](https://github.com/d3/d3-force/blob/v2.1.1/README.md#simulation_alphaMin) - set the minimum alpha threshold.
* [*simulation*.alphaDecay](https://github.com/d3/d3-force/blob/v2.1.1/README.md#simulation_alphaDecay) - set the alpha exponential decay rate.
* [*simulation*.alphaTarget](https://github.com/d3/d3-force/blob/v2.1.1/README.md#simulation_alphaTarget) - set the target alpha.
* [*simulation*.velocityDecay](https://github.com/d3/d3-force/blob/v2.1.1/README.md#simulation_velocityDecay) - set the velocity decay rate.
* [*simulation*.force](https://github.com/d3/d3-force/blob/v2.1.1/README.md#simulation_force) - add or remove a force.
* [*simulation*.find](https://github.com/d3/d3-force/blob/v2.1.1/README.md#simulation_find) - find the closest node to the given position.
* [*simulation*.randomSource](https://github.com/d3/d3-force/blob/v2.1.1/README.md#simulation_randomSource) - set the simulation’s random source.
* [*simulation*.on](https://github.com/d3/d3-force/blob/v2.1.1/README.md#simulation_on) - add or remove an event listener.
* [*force*](https://github.com/d3/d3-force/blob/v2.1.1/README.md#_force) - apply the force.
* [*force*.initialize](https://github.com/d3/d3-force/blob/v2.1.1/README.md#force_initialize) - initialize the force with the given nodes.
* [d3.forceCenter](https://github.com/d3/d3-force/blob/v2.1.1/README.md#forceCenter) - create a centering force.
* [*center*.x](https://github.com/d3/d3-force/blob/v2.1.1/README.md#center_x) - set the center *x*-coordinate.
* [*center*.y](https://github.com/d3/d3-force/blob/v2.1.1/README.md#center_y) - set the center *y*-coordinate.
* [*center*.strength](https://github.com/d3/d3-force/blob/v2.1.1/README.md#center_strength) - set the strength of the centering force.
* [d3.forceCollide](https://github.com/d3/d3-force/blob/v2.1.1/README.md#forceCollide) - create a circle collision force.
* [*collide*.radius](https://github.com/d3/d3-force/blob/v2.1.1/README.md#collide_radius) - set the circle radius.
* [*collide*.strength](https://github.com/d3/d3-force/blob/v2.1.1/README.md#collide_strength) - set the collision resolution strength.
* [*collide*.iterations](https://github.com/d3/d3-force/blob/v2.1.1/README.md#collide_iterations) - set the number of iterations.
* [d3.forceLink](https://github.com/d3/d3-force/blob/v2.1.1/README.md#forceLink) - create a link force.
* [*link*.links](https://github.com/d3/d3-force/blob/v2.1.1/README.md#link_links) - set the array of links.
* [*link*.id](https://github.com/d3/d3-force/blob/v2.1.1/README.md#link_id) - link nodes by numeric index or string identifier.
* [*link*.distance](https://github.com/d3/d3-force/blob/v2.1.1/README.md#link_distance) - set the link distance.
* [*link*.strength](https://github.com/d3/d3-force/blob/v2.1.1/README.md#link_strength) - set the link strength.
* [*link*.iterations](https://github.com/d3/d3-force/blob/v2.1.1/README.md#link_iterations) - set the number of iterations.
* [d3.forceManyBody](https://github.com/d3/d3-force/blob/v2.1.1/README.md#forceManyBody) - create a many-body force.
* [*manyBody*.strength](https://github.com/d3/d3-force/blob/v2.1.1/README.md#manyBody_strength) - set the force strength.
* [*manyBody*.theta](https://github.com/d3/d3-force/blob/v2.1.1/README.md#manyBody_theta) - set the Barnes–Hut approximation accuracy.
* [*manyBody*.distanceMin](https://github.com/d3/d3-force/blob/v2.1.1/README.md#manyBody_distanceMin) - limit the force when nodes are close.
* [*manyBody*.distanceMax](https://github.com/d3/d3-force/blob/v2.1.1/README.md#manyBody_distanceMax) - limit the force when nodes are far.
* [d3.forceX](https://github.com/d3/d3-force/blob/v2.1.1/README.md#forceX) - create an *x*-positioning force.
* [*x*.strength](https://github.com/d3/d3-force/blob/v2.1.1/README.md#x_strength) - set the force strength.
* [*x*.x](https://github.com/d3/d3-force/blob/v2.1.1/README.md#x_x) - set the target *x*-coordinate.
* [d3.forceY](https://github.com/d3/d3-force/blob/v2.1.1/README.md#forceY) - create an *y*-positioning force.
* [*y*.strength](https://github.com/d3/d3-force/blob/v2.1.1/README.md#y_strength) - set the force strength.
* [*y*.y](https://github.com/d3/d3-force/blob/v2.1.1/README.md#y_y) - set the target *y*-coordinate.
* [d3.forceRadial](https://github.com/d3/d3-force/blob/v2.1.1/README.md#forceRadial) - create a radial positioning force.
* [*radial*.strength](https://github.com/d3/d3-force/blob/v2.1.1/README.md#radial_strength) - set the force strength.
* [*radial*.radius](https://github.com/d3/d3-force/blob/v2.1.1/README.md#radial_radius) - set the target radius.
* [*radial*.x](https://github.com/d3/d3-force/blob/v2.1.1/README.md#radial_x) - set the target center *x*-coordinate.
* [*radial*.y](https://github.com/d3/d3-force/blob/v2.1.1/README.md#radial_y) - set the target center *y*-coordinate.

## [Number Formats (d3-format)](https://github.com/d3/d3-format/tree/v2.0.0)

Format numbers for human consumption.

* [d3.format](https://github.com/d3/d3-format/blob/v2.0.0/README.md#format) - alias for *locale*.format on the default locale.
* [d3.formatPrefix](https://github.com/d3/d3-format/blob/v2.0.0/README.md#formatPrefix) - alias for *locale*.formatPrefix on the default locale.
* [*locale*.format](https://github.com/d3/d3-format/blob/v2.0.0/README.md#locale_format) - create a number format.
* [*locale*.formatPrefix](https://github.com/d3/d3-format/blob/v2.0.0/README.md#locale_formatPrefix) - create a SI-prefix number format.
* [d3.formatSpecifier](https://github.com/d3/d3-format/blob/v2.0.0/README.md#formatSpecifier) - parse a number format specifier.
* [new d3.FormatSpecifier](https://github.com/d3/d3-format/blob/v2.0.0/README.md#FormatSpecifier) - augments a number format specifier object.
* [d3.precisionFixed](https://github.com/d3/d3-format/blob/v2.0.0/README.md#precisionFixed) - compute decimal precision for fixed-point notation.
* [d3.precisionPrefix](https://github.com/d3/d3-format/blob/v2.0.0/README.md#precisionPrefix) - compute decimal precision for SI-prefix notation.
* [d3.precisionRound](https://github.com/d3/d3-format/blob/v2.0.0/README.md#precisionRound) - compute significant digits for rounded notation.
* [d3.formatLocale](https://github.com/d3/d3-format/blob/v2.0.0/README.md#formatLocale) - define a custom locale.
* [d3.formatDefaultLocale](https://github.com/d3/d3-format/blob/v2.0.0/README.md#formatDefaultLocale) - define the default locale.

## [Geographies (d3-geo)](https://github.com/d3/d3-geo/tree/v2.0.0)

Geographic projections, shapes and math.

### [Paths](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#paths)

* [d3.geoPath](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#geoPath) - create a new geographic path generator.
* [*path*](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#_path) - project and render the specified feature.
* [*path*.area](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#path_area) - compute the projected planar area of a given feature.
* [*path*.bounds](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#path_bounds) - compute the projected planar bounding box of a given feature.
* [*path*.centroid](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#path_centroid) - compute the projected planar centroid of a given feature.
* [*path*.measure](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#path_measure) - compute the projected planar length of a given feature.
* [*path*.projection](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#path_projection) - set the geographic projection.
* [*path*.context](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#path_context) - set the render context.
* [*path*.pointRadius](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#path_pointRadius) - set the radius to display point features.

### [Projections](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#projections)

* [*projection*](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#_projection) - project the specified point from the sphere to the plane.
* [*projection*.invert](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#projection_invert) - unproject the specified point from the plane to the sphere.
* [*projection*.stream](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#projection_stream) - wrap the specified stream to project geometry.
* [*projection*.preclip](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#projection_preclip) - set the projection’s spherical clipping function.
* [*projection*.postclip](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#projection_postclip) - set the projection’s cartesian clipping function.
* [*projection*.clipAngle](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#projection_clipAngle) - set the radius of the clip circle.
* [*projection*.clipExtent](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#projection_clipExtent) - set the viewport clip extent, in pixels.
* [*projection*.scale](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#projection_scale) - set the scale factor.
* [*projection*.translate](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#projection_translate) - set the translation offset.
* [*projection*.center](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#projection_center) - set the center point.
* [*projection*.angle](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#projection_angle) - set the post-projection rotation.
* [*projection*.reflectX](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#projection_reflectX) - reflect the *x*-dimension.
* [*projection*.reflectY](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#projection_reflectY) - reflect the *y*-dimension.
* [*projection*.rotate](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#projection_rotate) - set the three-axis spherical rotation angles.
* [*projection*.precision](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#projection_precision) - set the precision threshold for adaptive sampling.
* [*projection*.fitExtent](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#projection_fitExtent) - set the scale and translate to fit a GeoJSON object.
* [*projection*.fitSize](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#projection_fitSize) - set the scale and translate to fit a GeoJSON object.
* [*projection*.fitWidth](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#projection_fitWidth) - set the scale and translate to fit a GeoJSON object.
* [*projection*.fitHeight](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#projection_fitHeight) - set the scale and translate to fit a GeoJSON object.
* [d3.geoAzimuthalEqualArea](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#geoAzimuthalEqualArea) - the azimuthal equal-area projection.
* [d3.geoAzimuthalEqualAreaRaw](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#geoAzimuthalEqualAreaRaw) - the raw azimuthal equal-area projection.
* [d3.geoAzimuthalEquidistant](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#geoAzimuthalEquidistant) - the azimuthal equidistant projection.
* [d3.geoAzimuthalEquidistantRaw](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#geoAzimuthalEquidistantRaw) - the raw azimuthal equidistant projection.
* [d3.geoGnomonic](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#geoGnomonic) - the gnomonic projection.
* [d3.geoGnomonicRaw](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#geoGnomonicRaw) - the raw gnomonic projection.
* [d3.geoOrthographic](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#geoOrthographic) - the azimuthal orthographic projection.
* [d3.geoOrthographicRaw](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#geoOrthographicRaw) - the raw azimuthal orthographic projection.
* [d3.geoStereographic](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#geoStereographic) - the azimuthal stereographic projection.
* [d3.geoStereographicRaw](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#geoStereographicRaw) - the raw azimuthal stereographic projection.
* [d3.geoEqualEarth](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#geoEqualEarth) - the Equal Earth projection.
* [d3.geoEqualEarthRaw](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#geoEqualEarthRaw) - the raw Equal Earth projection.
* [d3.geoAlbersUsa](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#geoAlbersUsa) - a composite Albers projection for the United States.
* [*conic*.parallels](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#conic_parallels) - set the two standard parallels.
* [d3.geoAlbers](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#geoAlbers) - the Albers equal-area conic projection.
* [d3.geoConicConformal](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#geoConicConformal) - the conic conformal projection.
* [d3.geoConicConformalRaw](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#geoConicConformalRaw) - the raw conic conformal projection.
* [d3.geoConicEqualArea](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#geoConicEqualArea) - the conic equal-area (Albers) projection.
* [d3.geoConicEqualAreaRaw](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#geoConicEqualAreaRaw) - the raw conic equal-area (Albers) projection.
* [d3.geoConicEquidistant](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#geoConicEquidistant) - the conic equidistant projection.
* [d3.geoConicEquidistantRaw](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#geoConicEquidistantRaw) - the raw conic equidistant projection.
* [d3.geoEquirectangular](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#geoEquirectangular) - the equirectangular (plate carreé) projection.
* [d3.geoEquirectangularRaw](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#geoEquirectangularRaw) - the raw equirectangular (plate carreé) projection.
* [d3.geoMercator](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#geoMercator) - the spherical Mercator projection.
* [d3.geoMercatorRaw](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#geoMercatorRaw) - the raw Mercator projection.
* [d3.geoTransverseMercator](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#geoTransverseMercator) - the transverse spherical Mercator projection.
* [d3.geoTransverseMercatorRaw](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#geoTransverseMercatorRaw) - the raw transverse spherical Mercator projection.
* [d3.geoNaturalEarth1](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#geoNaturalEarth1) - the Equal Earth projection, version 1.
* [d3.geoNaturalEarth1Raw](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#geoNaturalEarth1Raw) - the raw Equal Earth projection, version 1

### [Raw projections](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#raw-projections)

* [*project*](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#_project) - project the specified point from the sphere to the plane.
* [*project*.invert](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#project_invert) - unproject the specified point from the plane to the sphere.
* [d3.geoProjection](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#geoProjection) - create a custom projection.
* [d3.geoProjectionMutator](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#geoProjectionMutator) - create a custom configurable projection.

### [Spherical Math](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#spherical-math)

* [d3.geoArea](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#geoArea) - compute the spherical area of a given feature.
* [d3.geoBounds](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#geoBounds) - compute the latitude-longitude bounding box for a given feature.
* [d3.geoCentroid](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#geoCentroid) - compute the spherical centroid of a given feature.
* [d3.geoDistance](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#geoDistance) - compute the great-arc distance between two points.
* [d3.geoLength](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#geoLength) - compute the length of a line string or the perimeter of a polygon.
* [d3.geoInterpolate](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#geoInterpolate) - interpolate between two points along a great arc.
* [d3.geoContains](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#geoContains) - test whether a point is inside a given feature.
* [d3.geoRotation](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#geoRotation) - create a rotation function for the specified angles.
* [*rotation*](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#_rotation) - rotate the given point around the sphere.
* [*rotation*.invert](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#rotation_invert) - unrotate the given point around the sphere.

### [Spherical Shapes](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#spherical-shapes)

* [d3.geoCircle](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#geoCircle) - create a circle generator.
* [*circle*](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#_circle) - generate a piecewise circle as a Polygon.
* [*circle*.center](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#circle_center) - specify the circle center in latitude and longitude.
* [*circle*.radius](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#circle_radius) - specify the angular radius in degrees.
* [*circle*.precision](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#circle_precision) - specify the precision of the piecewise circle.
* [d3.geoGraticule](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#geoGraticule) - create a graticule generator.
* [*graticule*](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#_graticule) - generate a MultiLineString of meridians and parallels.
* [*graticule*.lines](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#graticule_lines) - generate an array of LineStrings of meridians and parallels.
* [*graticule*.outline](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#graticule_outline) - generate a Polygon of the graticule’s extent.
* [*graticule*.extent](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#graticule_extent) - get or set the major & minor extents.
* [*graticule*.extentMajor](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#graticule_extentMajor) - get or set the major extent.
* [*graticule*.extentMinor](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#graticule_extentMinor) - get or set the minor extent.
* [*graticule*.step](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#graticule_step) - get or set the major & minor step intervals.
* [*graticule*.stepMajor](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#graticule_stepMajor) - get or set the major step intervals.
* [*graticule*.stepMinor](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#graticule_stepMinor) - get or set the minor step intervals.
* [*graticule*.precision](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#graticule_precision) - get or set the latitudinal precision.
* [d3.geoGraticule10](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#geoGraticule10) - generate the default 10° global graticule.

### [Streams](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#streams)

* [d3.geoStream](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#geoStream) - convert a GeoJSON object to a geometry stream.
* [*stream*.point](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#stream_point) - indicates a point with the specified coordinates.
* [*stream*.lineStart](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#stream_lineStart) - indicates the start of a line or ring.
* [*stream*.lineEnd](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#stream_lineEnd) - indicates the end of a line or ring.
* [*stream*.polygonStart](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#stream_polygonStart) - indicates the start of a polygon.
* [*stream*.polygonEnd](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#stream_polygonEnd) - indicates the end of a polygon.
* [*stream*.sphere](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#stream_sphere) - indicates the sphere.

### [Transforms](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#transforms)

* [d3.geoTransform](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#geoTransform) - define a custom geometry transform.
* [d3.geoIdentity](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#geoIdentity) - scale, translate or clip planar geometry.

### [Clipping](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#clipping)

* [*preclip*](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#preclip) - pre-clipping in geographic coordinates.
* [*postclip*](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#postclip) - post-clipping in planar coordinates.
* [d3.geoClipAntimeridian](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#geoClipAntimeridian) - cuts spherical geometries that cross the antimeridian.
* [d3.geoClipCircle](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#geoClipCircle) - clips spherical geometries to a small circle.
* [d3.geoClipRectangle](https://github.com/d3/d3-geo/blob/v2.0.0/README.md#geoClipRectangle) - clips planar geometries to a rectangular viewport.

## [Hierarchies (d3-hierarchy)](https://github.com/d3/d3-hierarchy/tree/v2.0.0)

Layout algorithms for visualizing hierarchical data.

* [d3.hierarchy](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#hierarchy) - constructs a root node from hierarchical data.
* [*node*.ancestors](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#node_ancestors) - generate an array of ancestors.
* [*node*.descendants](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#node_descendants) - generate an array of descendants.
* [*node*.leaves](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#node_leaves) - generate an array of leaves.
* [*node*.find](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#node_find) - find a node in the hierarchy.
* [*node*.path](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#node_path) - generate the shortest path to another node.
* [*node*.links](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#node_links) - generate an array of links.
* [*node*.sum](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#node_sum) - evaluate and aggregate quantitative values.
* [*node*.count](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#node_count) - count the number of leaves.
* [*node*.sort](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#node_sort) - sort all descendant siblings.
* [*node*[Symbol.iterator]](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#node_iterator) - iterate on a hierarchy.
* [*node*.each](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#node_each) - breadth-first traversal.
* [*node*.eachAfter](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#node_eachAfter) - post-order traversal.
* [*node*.eachBefore](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#node_eachBefore) - pre-order traversal.
* [*node*.copy](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#node_copy) - copy a hierarchy.
* [d3.stratify](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#stratify) - create a new stratify operator.
* [*stratify*](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#_stratify) - construct a root node from tabular data.
* [*stratify*.id](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#stratify_id) - set the node id accessor.
* [*stratify*.parentId](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#stratify_parentId) - set the parent node id accessor.
* [d3.cluster](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#cluster) - create a new cluster (dendrogram) layout.
* [*cluster*](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#_cluster) - layout the specified hierarchy in a dendrogram.
* [*cluster*.size](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#cluster_size) - set the layout size.
* [*cluster*.nodeSize](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#cluster_nodeSize) - set the node size.
* [*cluster*.separation](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#cluster_separation) - set the separation between leaves.
* [d3.tree](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#tree) - create a new tidy tree layout.
* [*tree*](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#_tree) - layout the specified hierarchy in a tidy tree.
* [*tree*.size](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#tree_size) - set the layout size.
* [*tree*.nodeSize](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#tree_nodeSize) - set the node size.
* [*tree*.separation](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#tree_separation) - set the separation between nodes.
* [d3.treemap](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#treemap) - create a new treemap layout.
* [*treemap*](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#_treemap) - layout the specified hierarchy as a treemap.
* [*treemap*.tile](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#treemap_tile) - set the tiling method.
* [*treemap*.size](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#treemap_size) - set the layout size.
* [*treemap*.round](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#treemap_round) - set whether the output coordinates are rounded.
* [*treemap*.padding](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#treemap_padding) - set the padding.
* [*treemap*.paddingInner](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#treemap_paddingInner) - set the padding between siblings.
* [*treemap*.paddingOuter](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#treemap_paddingOuter) - set the padding between parent and children.
* [*treemap*.paddingTop](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#treemap_paddingTop) - set the padding between the parent’s top edge and children.
* [*treemap*.paddingRight](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#treemap_paddingRight) - set the padding between the parent’s right edge and children.
* [*treemap*.paddingBottom](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#treemap_paddingBottom) - set the padding between the parent’s bottom edge and children.
* [*treemap*.paddingLeft](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#treemap_paddingLeft) - set the padding between the parent’s left edge and children.
* [d3.treemapBinary](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#treemapBinary) - tile using a balanced binary tree.
* [d3.treemapDice](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#treemapDice) - tile into a horizontal row.
* [d3.treemapSlice](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#treemapSlice) - tile into a vertical column.
* [d3.treemapSliceDice](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#treemapSliceDice) - alternate between slicing and dicing.
* [d3.treemapSquarify](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#treemapSquarify) - tile using squarified rows per Bruls *et. al.*
* [d3.treemapResquarify](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#treemapResquarify) - like d3.treemapSquarify, but performs stable updates.
* [*squarify*.ratio](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#squarify_ratio) - set the desired rectangle aspect ratio.
* [d3.partition](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#partition) - create a new partition (icicle or sunburst) layout.
* [*partition*](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#_partition) - layout the specified hierarchy as a partition diagram.
* [*partition*.size](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#partition_size) - set the layout size.
* [*partition*.round](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#partition_round) - set whether the output coordinates are rounded.
* [*partition*.padding](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#partition_padding) - set the padding.
* [d3.pack](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#pack) - create a new circle-packing layout.
* [*pack*](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#_pack) - layout the specified hierarchy using circle-packing.
* [*pack*.radius](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#pack_radius) - set the radius accessor.
* [*pack*.size](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#pack_size) - set the layout size.
* [*pack*.padding](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#pack_padding) - set the padding.
* [d3.packSiblings](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#packSiblings) - pack the specified array of circles.
* [d3.packEnclose](https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#packEnclose) - enclose the specified array of circles.

## [Interpolators (d3-interpolate)](https://github.com/d3/d3-interpolate/tree/v2.0.1)

Interpolate numbers, colors, strings, arrays, objects, whatever!

* [d3.interpolate](https://github.com/d3/d3-interpolate/blob/v2.0.1/README.md#interpolate) - interpolate arbitrary values.
* [d3.interpolateNumber](https://github.com/d3/d3-interpolate/blob/v2.0.1/README.md#interpolateNumber) - interpolate numbers.
* [d3.interpolateRound](https://github.com/d3/d3-interpolate/blob/v2.0.1/README.md#interpolateRound) - interpolate integers.
* [d3.interpolateString](https://github.com/d3/d3-interpolate/blob/v2.0.1/README.md#interpolateString) - interpolate strings with embedded numbers.
* [d3.interpolateDate](https://github.com/d3/d3-interpolate/blob/v2.0.1/README.md#interpolateDate) - interpolate dates.
* [d3.interpolateArray](https://github.com/d3/d3-interpolate/blob/v2.0.1/README.md#interpolateArray) - interpolate arrays of arbitrary values.
* [d3.interpolateNumberArray](https://github.com/d3/d3-interpolate/blob/v2.0.1/README.md#interpolateNumberArray) - interpolate arrays of numbers.
* [d3.interpolateObject](https://github.com/d3/d3-interpolate/blob/v2.0.1/README.md#interpolateObject) - interpolate arbitrary objects.
* [d3.interpolateTransformCss](https://github.com/d3/d3-interpolate/blob/v2.0.1/README.md#interpolateTransformCss) - interpolate 2D CSS transforms.
* [d3.interpolateTransformSvg](https://github.com/d3/d3-interpolate/blob/v2.0.1/README.md#interpolateTransformSvg) - interpolate 2D SVG transforms.
* [d3.interpolateZoom](https://github.com/d3/d3-interpolate/blob/v2.0.1/README.md#interpolateZoom) - zoom and pan between two views.
* [*interpolateZoom*.rho](https://github.com/d3/d3-interpolate/blob/v2.0.1/README.md#interpolate_rho) - set the curvature *rho* of the zoom interpolator.
* [d3.interpolateDiscrete](https://github.com/d3/d3-interpolate/blob/v2.0.1/README.md#interpolateDiscrete) - generate a discrete interpolator from a set of values.
* [d3.quantize](https://github.com/d3/d3-interpolate/blob/v2.0.1/README.md#quantize) - generate uniformly-spaced samples from an interpolator.
* [d3.interpolateRgb](https://github.com/d3/d3-interpolate/blob/v2.0.1/README.md#interpolateRgb) - interpolate RGB colors.
* [d3.interpolateRgbBasis](https://github.com/d3/d3-interpolate/blob/v2.0.1/README.md#interpolateRgbBasis) - generate a B-spline through a set of colors.
* [d3.interpolateRgbBasisClosed](https://github.com/d3/d3-interpolate/blob/v2.0.1/README.md#interpolateRgbBasisClosed) - generate a closed B-spline through a set of colors.
* [d3.interpolateHsl](https://github.com/d3/d3-interpolate/blob/v2.0.1/README.md#interpolateHsl) - interpolate HSL colors.
* [d3.interpolateHslLong](https://github.com/d3/d3-interpolate/blob/v2.0.1/README.md#interpolateHslLong) - interpolate HSL colors, the long way.
* [d3.interpolateLab](https://github.com/d3/d3-interpolate/blob/v2.0.1/README.md#interpolateLab) - interpolate Lab colors.
* [d3.interpolateHcl](https://github.com/d3/d3-interpolate/blob/v2.0.1/README.md#interpolateHcl) - interpolate HCL colors.
* [d3.interpolateHclLong](https://github.com/d3/d3-interpolate/blob/v2.0.1/README.md#interpolateHclLong) - interpolate HCL colors, the long way.
* [d3.interpolateCubehelix](https://github.com/d3/d3-interpolate/blob/v2.0.1/README.md#interpolateCubehelix) - interpolate Cubehelix colors.
* [d3.interpolateCubehelixLong](https://github.com/d3/d3-interpolate/blob/v2.0.1/README.md#interpolateCubehelixLong) - interpolate Cubehelix colors, the long way.
* [*interpolate*.gamma](https://github.com/d3/d3-interpolate/blob/v2.0.1/README.md#interpolate_gamma) - apply gamma correction during interpolation.
* [d3.interpolateHue](https://github.com/d3/d3-interpolate/blob/v2.0.1/README.md#interpolateHue) - interpolate a hue angle.
* [d3.interpolateBasis](https://github.com/d3/d3-interpolate/blob/v2.0.1/README.md#interpolateBasis) - generate a B-spline through a set of values.
* [d3.interpolateBasisClosed](https://github.com/d3/d3-interpolate/blob/v2.0.1/README.md#interpolateBasisClosed) - generate a closed B-spline through a set of values.
* [d3.piecewise](https://github.com/d3/d3-interpolate/blob/v2.0.1/README.md#piecewise) - generate a piecewise linear interpolator from a set of values.

## [Paths (d3-path)](https://github.com/d3/d3-path/tree/v2.0.0)

Serialize Canvas path commands to SVG.

* [d3.path](https://github.com/d3/d3-path/blob/v2.0.0/README.md#path) - create a new path serializer.
* [*path*.moveTo](https://github.com/d3/d3-path/blob/v2.0.0/README.md#path_moveTo) - move to the given point.
* [*path*.closePath](https://github.com/d3/d3-path/blob/v2.0.0/README.md#path_closePath) - close the current subpath.
* [*path*.lineTo](https://github.com/d3/d3-path/blob/v2.0.0/README.md#path_lineTo) - draw a straight line segment.
* [*path*.quadraticCurveTo](https://github.com/d3/d3-path/blob/v2.0.0/README.md#path_quadraticCurveTo) - draw a quadratic Bézier segment.
* [*path*.bezierCurveTo](https://github.com/d3/d3-path/blob/v2.0.0/README.md#path_bezierCurveTo) - draw a cubic Bézier segment.
* [*path*.arcTo](https://github.com/d3/d3-path/blob/v2.0.0/README.md#path_arcTo) - draw a circular arc segment.
* [*path*.arc](https://github.com/d3/d3-path/blob/v2.0.0/README.md#path_arc) - draw a circular arc segment.
* [*path*.rect](https://github.com/d3/d3-path/blob/v2.0.0/README.md#path_rect) - draw a rectangle.
* [*path*.toString](https://github.com/d3/d3-path/blob/v2.0.0/README.md#path_toString) - serialize to an SVG path data string.

## [Polygons (d3-polygon)](https://github.com/d3/d3-polygon/tree/v2.0.0)

Geometric operations for two-dimensional polygons.

* [d3.polygonArea](https://github.com/d3/d3-polygon/blob/v2.0.0/README.md#polygonArea) - compute the area of the given polygon.
* [d3.polygonCentroid](https://github.com/d3/d3-polygon/blob/v2.0.0/README.md#polygonCentroid) - compute the centroid of the given polygon.
* [d3.polygonHull](https://github.com/d3/d3-polygon/blob/v2.0.0/README.md#polygonHull) - compute the convex hull of the given points.
* [d3.polygonContains](https://github.com/d3/d3-polygon/blob/v2.0.0/README.md#polygonContains) - test whether a point is inside a polygon.
* [d3.polygonLength](https://github.com/d3/d3-polygon/blob/v2.0.0/README.md#polygonLength) - compute the length of the given polygon’s perimeter.

## [Quadtrees (d3-quadtree)](https://github.com/d3/d3-quadtree/tree/v2.0.0)

Two-dimensional recursive spatial subdivision.

* [d3.quadtree](https://github.com/d3/d3-quadtree/blob/v2.0.0/README.md#quadtree) - create a new, empty quadtree.
* [*quadtree*.x](https://github.com/d3/d3-quadtree/blob/v2.0.0/README.md#quadtree_x) - set the *x* accessor.
* [*quadtree*.y](https://github.com/d3/d3-quadtree/blob/v2.0.0/README.md#quadtree_y) - set the *y* accessor.
* [*quadtree*.extent](https://github.com/d3/d3-quadtree/blob/v2.0.0/README.md#quadtree_extent) - extend the quadtree to cover an extent.
* [*quadtree*.cover](https://github.com/d3/d3-quadtree/blob/v2.0.0/README.md#quadtree_cover) - extend the quadtree to cover a point.
* [*quadtree*.add](https://github.com/d3/d3-quadtree/blob/v2.0.0/README.md#quadtree_add) - add a datum to a quadtree.
* [*quadtree*.addAll](https://github.com/d3/d3-quadtree/blob/v2.0.0/README.md#quadtree_addAll) - add an array of data to a quadtree.
* [*quadtree*.remove](https://github.com/d3/d3-quadtree/blob/v2.0.0/README.md#quadtree_remove) - remove a datum from a quadtree.
* [*quadtree*.removeAll](https://github.com/d3/d3-quadtree/blob/v2.0.0/README.md#quadtree_removeAll) - remove an array of data from a quadtree.
* [*quadtree*.copy](https://github.com/d3/d3-quadtree/blob/v2.0.0/README.md#quadtree_copy) - create a copy of a quadtree.
* [*quadtree*.root](https://github.com/d3/d3-quadtree/blob/v2.0.0/README.md#quadtree_root) - get the quadtree’s root node.
* [*quadtree*.data](https://github.com/d3/d3-quadtree/blob/v2.0.0/README.md#quadtree_data) - retrieve all data from the quadtree.
* [*quadtree*.size](https://github.com/d3/d3-quadtree/blob/v2.0.0/README.md#quadtree_size) - count the number of data in the quadtree.
* [*quadtree*.find](https://github.com/d3/d3-quadtree/blob/v2.0.0/README.md#quadtree_find) - quickly find the closest datum in a quadtree.
* [*quadtree*.visit](https://github.com/d3/d3-quadtree/blob/v2.0.0/README.md#quadtree_visit) - selectively visit nodes in a quadtree.
* [*quadtree*.visitAfter](https://github.com/d3/d3-quadtree/blob/v2.0.0/README.md#quadtree_visitAfter) - visit all nodes in a quadtree.

## [Random Numbers (d3-random)](https://github.com/d3/d3-random/tree/v2.2.2)

Generate random numbers from various distributions.

* [d3.randomUniform](https://github.com/d3/d3-random/blob/v2.2.2/README.md#randomUniform) - from a uniform distribution.
* [d3.randomInt](https://github.com/d3/d3-random/blob/v2.2.2/README.md#randomInt) - from a uniform integer distribution.
* [d3.randomNormal](https://github.com/d3/d3-random/blob/v2.2.2/README.md#randomNormal) - from a normal distribution.
* [d3.randomLogNormal](https://github.com/d3/d3-random/blob/v2.2.2/README.md#randomLogNormal) - from a log-normal distribution.
* [d3.randomBates](https://github.com/d3/d3-random/blob/v2.2.2/README.md#randomBates) - from a Bates distribution.
* [d3.randomIrwinHall](https://github.com/d3/d3-random/blob/v2.2.2/README.md#randomIrwinHall) - from an Irwin–Hall distribution.
* [d3.randomExponential](https://github.com/d3/d3-random/blob/v2.2.2/README.md#randomExponential) - from an exponential distribution.
* [d3.randomPareto](https://github.com/d3/d3-random/blob/v2.2.2/README.md#randomPareto) - from a Pareto distribution.
* [d3.randomBernoulli](https://github.com/d3/d3-random/blob/v2.2.2/README.md#randomBernoulli) - from a Bernoulli distribution.
* [d3.randomGeometric](https://github.com/d3/d3-random/blob/v2.2.2/README.md#randomGeometric) - from a geometric distribution.
* [d3.randomBinomial](https://github.com/d3/d3-random/blob/v2.2.2/README.md#randomBinomial) - from a binomial distribution.
* [d3.randomGamma](https://github.com/d3/d3-random/blob/v2.2.2/README.md#randomGamma) - from a gamma distribution.
* [d3.randomBeta](https://github.com/d3/d3-random/blob/v2.2.2/README.md#randomBeta) - from a beta distribution.
* [d3.randomWeibull](https://github.com/d3/d3-random/blob/v2.2.2/README.md#randomWeibull) - from a Weibull, Gumbel or Fréchet distribution.
* [d3.randomCauchy](https://github.com/d3/d3-random/blob/v2.2.2/README.md#randomCauchy) - from a Cauchy distribution.
* [d3.randomLogistic](https://github.com/d3/d3-random/blob/v2.2.2/README.md#randomLogistic) - from a logistic distribution.
* [d3.randomPoisson](https://github.com/d3/d3-random/blob/v2.2.2/README.md#randomPoisson) - from a Poisson distribution.
* [*random*.source](https://github.com/d3/d3-random/blob/v2.2.2/README.md#random_source) - set the source of randomness.
* [d3.randomLcg](https://github.com/d3/d3-random/blob/v2.2.2/README.md#randomLcg) - a seeded pseudorandom number generator.

## [Scales (d3-scale)](https://github.com/d3/d3-scale/tree/v3.2.2)

Encodings that map abstract data to visual representation.

### [Continuous Scales](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#continuous-scales)

Map a continuous, quantitative domain to a continuous range.

* [*continuous*](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#_continuous) - compute the range value corresponding to a given domain value.
* [*continuous*.invert](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#continuous_invert) - compute the domain value corresponding to a given range value.
* [*continuous*.domain](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#continuous_domain) - set the input domain.
* [*continuous*.range](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#continuous_range) - set the output range.
* [*continuous*.rangeRound](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#continuous_rangeRound) - set the output range and enable rounding.
* [*continuous*.clamp](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#continuous_clamp) - enable clamping to the domain or range.
* [*continuous*.unknown](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#continuous_unknown) - set the output value for unknown inputs.
* [*continuous*.interpolate](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#continuous_interpolate) - set the output interpolator.
* [*continuous*.ticks](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#continuous_ticks) - compute representative values from the domain.
* [*continuous*.tickFormat](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#continuous_tickFormat) - format ticks for human consumption.
* [*continuous*.nice](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#continuous_nice) - extend the domain to nice round numbers.
* [*continuous*.copy](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#continuous_copy) - create a copy of this scale.
* [d3.tickFormat](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#tickFormat) - format ticks for human consumption.
* [d3.scaleLinear](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#scaleLinear) - create a quantitative linear scale.
* [d3.scalePow](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#scalePow) - create a quantitative power scale.
* [*pow*](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#_pow) - compute the range value corresponding to a given domain value.
* [*pow*.invert](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#pow_invert) - compute the domain value corresponding to a given range value.
* [*pow*.exponent](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#pow_exponent) - set the power exponent.
* [*pow*.domain](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#pow_domain) - set the input domain.
* [*pow*.range](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#pow_range) - set the output range.
* [*pow*.rangeRound](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#pow_rangeRound) - set the output range and enable rounding.
* [*pow*.clamp](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#pow_clamp) - enable clamping to the domain or range.
* [*pow*.interpolate](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#pow_interpolate) - set the output interpolator.
* [*pow*.ticks](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#pow_ticks) - compute representative values from the domain.
* [*pow*.tickFormat](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#pow_tickFormat) - format ticks for human consumption.
* [*pow*.nice](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#pow_nice) - extend the domain to nice round numbers.
* [*pow*.copy](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#pow_copy) - create a copy of this scale.
* [d3.scaleSqrt](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#scaleSqrt) - create a quantitative power scale with exponent 0.5.
* [d3.scaleLog](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#scaleLog) - create a quantitative logarithmic scale.
* [*log*](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#_log) - compute the range value corresponding to a given domain value.
* [*log*.invert](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#log_invert) - compute the domain value corresponding to a given range value.
* [*log*.base](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#log_base) - set the logarithm base.
* [*log*.domain](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#log_domain) - set the input domain.
* [*log*.range](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#log_range) - set the output range.
* [*log*.rangeRound](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#log_rangeRound) - set the output range and enable rounding.
* [*log*.clamp](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#log_clamp) - enable clamping to the domain or range.
* [*log*.interpolate](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#log_interpolate) - set the output interpolator.
* [*log*.ticks](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#log_ticks) - compute representative values from the domain.
* [*log*.tickFormat](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#log_tickFormat) - format ticks for human consumption.
* [*log*.nice](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#log_nice) - extend the domain to nice round numbers.
* [*log*.copy](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#log_copy) - create a copy of this scale.
* [d3.scaleSymlog](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#scaleSymlog) - create a symmetric logarithmic scale.
* [*symlog*.constant](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#symlog_constant) - set the constant of a symlog scale.
* [d3.scaleIdentity](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#scaleIdentity) - creates an identity scale.
* [d3.scaleRadial](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#scaleRadial) - creates a radial scale.
* [d3.scaleTime](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#scaleTime) - create a linear scale for time.
* [*time*](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#_time) - compute the range value corresponding to a given domain value.
* [*time*.invert](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#time_invert) - compute the domain value corresponding to a given range value.
* [*time*.domain](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#time_domain) - set the input domain.
* [*time*.range](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#time_range) - set the output range.
* [*time*.rangeRound](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#time_rangeRound) - set the output range and enable rounding.
* [*time*.clamp](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#time_clamp) - enable clamping to the domain or range.
* [*time*.interpolate](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#time_interpolate) - set the output interpolator.
* [*time*.ticks](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#time_ticks) - compute representative values from the domain.
* [*time*.tickFormat](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#time_tickFormat) - format ticks for human consumption.
* [*time*.nice](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#time_nice) - extend the domain to nice round times.
* [*time*.copy](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#time_copy) - create a copy of this scale.
* [d3.scaleUtc](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#scaleUtc) - create a linear scale for UTC.

### [Sequential Scales](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#sequential-scales)

Map a continuous, quantitative domain to a continuous, fixed interpolator.

* [d3.scaleSequential](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#scaleSequential) - create a sequential scale.
* [*sequential*](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#_sequential) - compute the range value corresponding to an input value.
* [*sequential*.domain](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#sequential_domain) - set the input domain.
* [*sequential*.clamp](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#sequential_clamp) - enable clamping to the domain.
* [*sequential*.interpolator](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#sequential_interpolator) - set the scale’s output interpolator.
* [*sequential*.range](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#sequential_range) - set the output range.
* [*sequential*.rangeRound](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#sequential_rangeRound) - set the output range and enable rounding.
* [*sequential*.copy](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#sequential_copy) -  create a copy of this scale.
* [d3.scaleSequentialLog](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#scaleSequentialLog) - create a logarithmic sequential scale.
* [d3.scaleSequentialPow](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#scaleSequentialPow) - create a power sequential scale.
* [d3.scaleSequentialSqrt](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#scaleSequentialSqrt) - create a power sequential scale with exponent 0.5.
* [d3.scaleSequentialSymlog](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#scaleSequentialSymlog) - create a symmetric logarithmic sequential scale.
* [d3.scaleSequentialQuantile](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#scaleSequentialQuantile) - create a sequential scale using a *p*-quantile transform.
* [*sequentialQuantile*.quantiles](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#sequentialQuantile_quantiles) - return the scale’s quantiles.

### [Diverging Scales](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#diverging-scales)

Map a continuous, quantitative domain to a continuous, fixed interpolator.

* [d3.scaleDiverging](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#scaleDiverging) - create a diverging scale.
* [*diverging*](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#_diverging) - compute the range value corresponding to an input value.
* [*diverging*.domain](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#diverging_domain) - set the input domain.
* [*diverging*.clamp](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#diverging_clamp) - enable clamping to the domain or range.
* [*diverging*.interpolator](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#diverging_interpolator) - set the scale’s output interpolator.
* [*diverging*.range](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#diverging_range) - set the output range.
* [*diverging*.rangeRound](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#diverging_rangeRound) - set the output range and enable rounding.
* [*diverging*.copy](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#diverging_copy) -  create a copy of this scale.
* [*diverging*.unknown](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#diverging_unknown) - set the output value for unknown inputs.
* [d3.scaleDivergingLog](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#scaleDivergingLog) - create a diverging logarithmic scale.
* [d3.scaleDivergingPow](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#scaleDivergingPow) - create a diverging power scale.
* [d3.scaleDivergingSqrt](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#scaleDivergingSqrt) - create a diverging power scale with exponent 0.5.
* [d3.scaleDivergingSymlog](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#scaleDivergingSymlog) - create a diverging symmetric logarithmic scale.

### [Quantize Scales](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#quantize-scales)

Map a continuous, quantitative domain to a discrete range.

* [d3.scaleQuantize](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#scaleQuantize) - create a uniform quantizing linear scale.
* [*quantize*](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#_quantize) - compute the range value corresponding to a given domain value.
* [*quantize*.invertExtent](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#quantize_invertExtent) - compute the domain values corresponding to a given range value.
* [*quantize*.domain](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#quantize_domain) - set the input domain.
* [*quantize*.range](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#quantize_range) - set the output range.
* [*quantize*.ticks](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#quantize_ticks) - compute representative values from the domain.
* [*quantize*.tickFormat](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#quantize_tickFormat) - format ticks for human consumption.
* [*quantize*.nice](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#quantize_nice) - extend the domain to nice round numbers.
* [*quantize*.thresholds](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#quantize_thresholds) - return the array of computed thresholds within the domain.
* [*quantize*.copy](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#quantize_copy) - create a copy of this scale.
* [d3.scaleQuantile](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#scaleQuantile) - create a quantile quantizing linear scale.
* [*quantile*](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#_quantile) - compute the range value corresponding to a given domain value.
* [*quantile*.invertExtent](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#quantile_invertExtent) - compute the domain values corresponding to a given range value.
* [*quantile*.domain](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#quantile_domain) - set the input domain.
* [*quantile*.range](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#quantile_range) - set the output range.
* [*quantile*.quantiles](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#quantile_quantiles) - get the quantile thresholds.
* [*quantile*.copy](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#quantile_copy) - create a copy of this scale.
* [d3.scaleThreshold](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#scaleThreshold) - create an arbitrary quantizing linear scale.
* [*threshold*](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#_threshold) - compute the range value corresponding to a given domain value.
* [*threshold*.invertExtent](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#threshold_invertExtent) - compute the domain values corresponding to a given range value.
* [*threshold*.domain](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#threshold_domain) - set the input domain.
* [*threshold*.range](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#threshold_range) - set the output range.
* [*threshold*.copy](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#threshold_copy) - create a copy of this scale.

### [Ordinal Scales](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#ordinal-scales)

Map a discrete domain to a discrete range.

* [d3.scaleOrdinal](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#scaleOrdinal) - create an ordinal scale.
* [*ordinal*](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#_ordinal) - compute the range value corresponding to a given domain value.
* [*ordinal*.domain](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#ordinal_domain) - set the input domain.
* [*ordinal*.range](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#ordinal_range) - set the output range.
* [*ordinal*.unknown](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#ordinal_unknown) - set the output value for unknown inputs.
* [*ordinal*.copy](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#ordinal_copy) - create a copy of this scale.
* [d3.scaleImplicit](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#scaleImplicit) - a special unknown value for implicit domains.
* [d3.scaleBand](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#scaleBand) - create an ordinal band scale.
* [*band*](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#_band) - compute the band start corresponding to a given domain value.
* [*band*.domain](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#band_domain) - set the input domain.
* [*band*.range](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#band_range) - set the output range.
* [*band*.rangeRound](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#band_rangeRound) - set the output range and enable rounding.
* [*band*.round](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#band_round) - enable rounding.
* [*band*.paddingInner](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#band_paddingInner) - set padding between bands.
* [*band*.paddingOuter](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#band_paddingOuter) - set padding outside the first and last bands.
* [*band*.padding](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#band_padding) - set padding outside and between bands.
* [*band*.align](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#band_align) - set band alignment, if there is extra space.
* [*band*.bandwidth](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#band_bandwidth) - get the width of each band.
* [*band*.step](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#band_step) - get the distance between the starts of adjacent bands.
* [*band*.copy](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#band_copy) - create a copy of this scale.
* [d3.scalePoint](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#scalePoint) - create an ordinal point scale.
* [*point*](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#_point) - compute the point corresponding to a given domain value.
* [*point*.domain](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#point_domain) - set the input domain.
* [*point*.range](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#point_range) - set the output range.
* [*point*.rangeRound](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#point_rangeRound) - set the output range and enable rounding.
* [*point*.round](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#point_round) - enable rounding.
* [*point*.padding](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#point_padding) - set padding outside the first and last point.
* [*point*.align](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#point_align) - set point alignment, if there is extra space.
* [*point*.bandwidth](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#point_bandwidth) - returns zero.
* [*point*.step](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#point_step) - get the distance between the starts of adjacent points.
* [*point*.copy](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#point_copy) - create a copy of this scale.

## [Selections (d3-selection)](https://github.com/d3/d3-selection/tree/v2.0.0)

Transform the DOM by selecting elements and joining to data.

### [Selecting Elements](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#selecting-elements)

* [d3.selection](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#selection) - select the root document element.
* [d3.select](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#select) - select an element from the document.
* [d3.selectAll](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#selectAll) - select multiple elements from the document.
* [*selection*.select](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#selection_select) - select a descendant element for each selected element.
* [*selection*.selectAll](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#selection_selectAll) - select multiple descendants for each selected element.
* [*selection*.filter](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#selection_filter) - filter elements based on data.
* [*selection*.merge](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#selection_merge) - merge this selection with another.
* [*selection*.selectChild](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#selection_selectChild) - select a child element for each selected element.
* [*selection*.selectChildren](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#selection_selectChildren) - select the children elements for each selected element.
* [*selection*.selection](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#selection_selection) - return the selection.
* [d3.matcher](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#matcher) - test whether an element matches a selector.
* [d3.selector](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#selector) - select an element.
* [d3.selectorAll](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#selectorAll) - select elements.
* [d3.window](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#window) - get a node’s owner window.
* [d3.style](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#style) - get a node’s current style value.

### [Modifying Elements](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#modifying-elements)

* [*selection*.attr](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#selection_attr) - get or set an attribute.
* [*selection*.classed](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#selection_classed) - get, add or remove CSS classes.
* [*selection*.style](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#selection_style) - get or set a style property.
* [*selection*.property](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#selection_property) - get or set a (raw) property.
* [*selection*.text](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#selection_text) - get or set the text content.
* [*selection*.html](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#selection_html) - get or set the inner HTML.
* [*selection*.append](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#selection_append) - create, append and select new elements.
* [*selection*.insert](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#selection_insert) - create, insert and select new elements.
* [*selection*.remove](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#selection_remove) - remove elements from the document.
* [*selection*.clone](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#selection_clone) - insert clones of selected elements.
* [*selection*.sort](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#selection_sort) - sort elements in the document based on data.
* [*selection*.order](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#selection_order) - reorders elements in the document to match the selection.
* [*selection*.raise](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#selection_raise) - reorders each element as the last child of its parent.
* [*selection*.lower](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#selection_lower) - reorders each element as the first child of its parent.
* [d3.create](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#create) - create and select a detached element.
* [d3.creator](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#creator) - create an element by name.

### [Joining Data](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#joining-data)

* [*selection*.data](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#selection_data) - bind elements to data.
* [*selection*.join](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#selection_join) - enter, update or exit elements based on data.
* [*selection*.enter](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#selection_enter) - get the enter selection (data missing elements).
* [*selection*.exit](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#selection_exit) - get the exit selection (elements missing data).
* [*selection*.datum](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#selection_datum) - get or set element data (without joining).

### [Handling Events](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#handling-events)

* [*selection*.on](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#selection_on) - add or remove event listeners.
* [*selection*.dispatch](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#selection_dispatch) - dispatch a custom event.
* [d3.pointer](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#pointer) - get the pointer’s position of an event.
* [d3.pointers](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#pointers) - get the pointers’ positions of an event.

### [Control Flow](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#control-flow)

* [*selection*.each](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#selection_each) - call a function for each element.
* [*selection*.call](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#selection_call) - call a function with this selection.
* [*selection*.empty](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#selection_empty) - returns true if this selection is empty.
* [*selection*.nodes](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#selection_nodes) - returns an array of all selected elements.
* [*selection*.node](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#selection_node) - returns the first (non-null) element.
* [*selection*.size](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#selection_size) - returns the count of elements.
* [*selection*[Symbol.iterator]](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#selection_iterator) - iterate over the selection’s nodes.

### [Local Variables](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#local-variables)

* [d3.local](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#local) - declares a new local variable.
* [*local*.set](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#local_set) - set a local variable’s value.
* [*local*.get](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#local_get) - get a local variable’s value.
* [*local*.remove](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#local_remove) - delete a local variable.
* [*local*.toString](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#local_toString) - get the property identifier of a local variable.

### [Namespaces](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#namespaces)

* [d3.namespace](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#namespace) - qualify a prefixed XML name, such as “xlink:href”.
* [d3.namespaces](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#namespaces) - the built-in XML namespaces.

## [Shapes (d3-shape)](https://github.com/d3/d3-shape/tree/v2.0.0)

Graphical primitives for visualization.

### [Arcs](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#arcs)

Circular or annular sectors, as in a pie or donut chart.

* [d3.arc](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#arc) - create a new arc generator.
* [*arc*](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#_arc) - generate an arc for the given datum.
* [*arc*.centroid](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#arc_centroid) - compute an arc’s midpoint.
* [*arc*.innerRadius](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#arc_innerRadius) - set the inner radius.
* [*arc*.outerRadius](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#arc_outerRadius) - set the outer radius.
* [*arc*.cornerRadius](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#arc_cornerRadius) - set the corner radius, for rounded corners.
* [*arc*.startAngle](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#arc_startAngle) - set the start angle.
* [*arc*.endAngle](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#arc_endAngle) - set the end angle.
* [*arc*.padAngle](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#arc_padAngle) - set the angle between adjacent arcs, for padded arcs.
* [*arc*.padRadius](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#arc_padRadius) - set the radius at which to linearize padding.
* [*arc*.context](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#arc_context) - set the rendering context.

### [Pies](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#pies)

Compute the necessary angles to represent a tabular dataset as a pie or donut chart.

* [d3.pie](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#pie) - create a new pie generator.
* [*pie*](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#_pie) - compute the arc angles for the given dataset.
* [*pie*.value](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#pie_value) - set the value accessor.
* [*pie*.sort](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#pie_sort) - set the sort order comparator.
* [*pie*.sortValues](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#pie_sortValues) - set the sort order comparator.
* [*pie*.startAngle](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#pie_startAngle) - set the overall start angle.
* [*pie*.endAngle](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#pie_endAngle) - set the overall end angle.
* [*pie*.padAngle](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#pie_padAngle) - set the pad angle between adjacent arcs.

### [Lines](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#lines)

A spline or polyline, as in a line chart.

* [d3.line](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#line) - create a new line generator.
* [*line*](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#_line) - generate a line for the given dataset.
* [*line*.x](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#line_x) - set the *x* accessor.
* [*line*.y](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#line_y) - set the *y* accessor.
* [*line*.defined](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#line_defined) - set the defined accessor.
* [*line*.curve](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#line_curve) - set the curve interpolator.
* [*line*.context](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#line_context) - set the rendering context.
* [d3.lineRadial](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#lineRadial) - create a new radial line generator.
* [*lineRadial*](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#_lineRadial) - generate a line for the given dataset.
* [*lineRadial*.angle](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#lineRadial_angle) - set the angle accessor.
* [*lineRadial*.radius](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#lineRadial_radius) - set the radius accessor.
* [*lineRadial*.defined](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#lineRadial_defined) - set the defined accessor.
* [*lineRadial*.curve](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#lineRadial_curve) - set the curve interpolator.
* [*lineRadial*.context](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#lineRadial_context) - set the rendering context.

### [Areas](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#areas)

An area, defined by a bounding topline and baseline, as in an area chart.

* [d3.area](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#area) - create a new area generator.
* [*area*](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#_area) - generate an area for the given dataset.
* [*area*.x](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#area_x) - set the *x0* and *x1* accessors.
* [*area*.x0](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#area_x0) - set the baseline *x* accessor.
* [*area*.x1](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#area_x1) - set the topline *x* accessor.
* [*area*.y](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#area_y) - set the *y0* and *y1* accessors.
* [*area*.y0](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#area_y0) - set the baseline *y* accessor.
* [*area*.y1](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#area_y1) - set the topline *y* accessor.
* [*area*.defined](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#area_defined) - set the defined accessor.
* [*area*.curve](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#area_curve) - set the curve interpolator.
* [*area*.context](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#area_context) - set the rendering context.
* [*area*.lineX0](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#area_lineX0) - derive a line for the left edge of an area.
* [*area*.lineY0](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#area_lineY0) - derive a line for the top edge of an area.
* [*area*.lineX1](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#area_lineX1) - derive a line for the right edge of an area.
* [*area*.lineY1](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#area_lineY1) - derive a line for the bottom edge of an area.
* [d3.areaRadial](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#areaRadial) - create a new radial area generator.
* [*areaRadial*](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#_areaRadial) - generate an area for the given dataset.
* [*areaRadial*.angle](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#areaRadial_angle) - set the start and end angle accessors.
* [*areaRadial*.startAngle](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#areaRadial_startAngle) - set the start angle accessor.
* [*areaRadial*.endAngle](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#areaRadial_endAngle) - set the end angle accessor.
* [*areaRadial*.radius](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#areaRadial_radius) - set the inner and outer radius accessors.
* [*areaRadial*.innerRadius](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#areaRadial_innerRadius) - set the inner radius accessor.
* [*areaRadial*.outerRadius](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#areaRadial_outerRadius) - set the outer radius accessor.
* [*areaRadial*.defined](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#areaRadial_defined) - set the defined accessor.
* [*areaRadial*.curve](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#areaRadial_curve) - set the curve interpolator.
* [*areaRadial*.context](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#areaRadial_context) - set the rendering context.
* [*areaRadial*.lineStartAngle](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#areaRadial_lineStartAngle) - derive a line for the start edge of an area.
* [*areaRadial*.lineInnerRadius](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#areaRadial_lineInnerRadius) - derive a line for the inner edge of an area.
* [*areaRadial*.lineEndAngle](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#areaRadial_lineEndAngle) - derive a line for the end edge of an area.
* [*areaRadial*.lineOuterRadius](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#areaRadial_lineOuterRadius) - derive a line for the outer edge of an area.

### [Curves](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#curves)

Interpolate between points to produce a continuous shape.

* [d3.curveBasis](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#curveBasis) - a cubic basis spline, repeating the end points.
* [d3.curveBasisClosed](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#curveBasisClosed) - a closed cubic basis spline.
* [d3.curveBasisOpen](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#curveBasisOpen) - a cubic basis spline.
* [d3.curveBundle](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#curveBundle) - a straightened cubic basis spline.
* [*bundle*.beta](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#curveBundle_beta) - set the bundle tension *beta*.
* [d3.curveCardinal](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#curveCardinal) - a cubic cardinal spline, with one-sided difference at each end.
* [d3.curveCardinalClosed](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#curveCardinalClosed) - a closed cubic cardinal spline.
* [d3.curveCardinalOpen](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#curveCardinalOpen) - a cubic cardinal spline.
* [*cardinal*.tension](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#curveCardinal_tension) - set the cardinal spline tension.
* [d3.curveCatmullRom](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#curveCatmullRom) - a cubic Catmull–Rom spline, with one-sided difference at each end.
* [d3.curveCatmullRomClosed](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#curveCatmullRomClosed) - a closed cubic Catmull–Rom spline.
* [d3.curveCatmullRomOpen](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#curveCatmullRomOpen) - a cubic Catmull–Rom spline.
* [*catmullRom*.alpha](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#curveCatmullRom_alpha) - set the Catmull–Rom parameter *alpha*.
* [d3.curveLinear](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#curveLinear) - a polyline.
* [d3.curveLinearClosed](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#curveLinearClosed) - a closed polyline.
* [d3.curveMonotoneX](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#curveMonotoneX) - a cubic spline that, given monotonicity in *x*, preserves it in *y*.
* [d3.curveMonotoneY](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#curveMonotoneY) - a cubic spline that, given monotonicity in *y*, preserves it in *x*.
* [d3.curveNatural](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#curveNatural) - a natural cubic spline.
* [d3.curveStep](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#curveStep) - a piecewise constant function.
* [d3.curveStepAfter](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#curveStepAfter) - a piecewise constant function.
* [d3.curveStepBefore](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#curveStepBefore) - a piecewise constant function.
* [*curve*.areaStart](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#curve_areaStart) - start a new area segment.
* [*curve*.areaEnd](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#curve_areaEnd) - end the current area segment.
* [*curve*.lineStart](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#curve_lineStart) - start a new line segment.
* [*curve*.lineEnd](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#curve_lineEnd) - end the current line segment.
* [*curve*.point](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#curve_point) - add a point to the current line segment.

### [Links](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#links)

A smooth cubic Bézier curve from a source to a target.

* [d3.linkVertical](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#linkVertical) - create a new vertical link generator.
* [d3.linkHorizontal](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#linkHorizontal) - create a new horizontal link generator.
* [*link*](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#_link) - generate a link.
* [*link*.source](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#link_source) - set the source accessor.
* [*link*.target](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#link_target) - set the target accessor.
* [*link*.x](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#link_x) - set the point *x*-accessor.
* [*link*.y](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#link_y) - set the point *y*-accessor.
* [*link*.context](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#link_context) - set the rendering context.
* [d3.linkRadial](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#linkRadial) - create a new radial link generator.
* [*linkRadial*.angle](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#linkRadial_angle) - set the point *angle* accessor.
* [*linkRadial*.radius](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#linkRadial_radius) - set the point *radius* accessor.

### [Symbols](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#symbols)

A categorical shape encoding, as in a scatterplot.

* [d3.symbol](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#symbol) - create a new symbol generator.
* [*symbol*](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#_symbol) - generate a symbol for the given datum.
* [*symbol*.type](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#symbol_type) - set the symbol type.
* [*symbol*.size](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#symbol_size) - set the size of the symbol in square pixels.
* [*symbol*.context](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#symbol_context) - set the rendering context.
* [d3.symbols](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#symbols) - the array of built-in symbol types.
* [d3.symbolCircle](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#symbolCircle) - a circle.
* [d3.symbolCross](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#symbolCross) - a Greek cross with arms of equal length.
* [d3.symbolDiamond](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#symbolDiamond) - a rhombus.
* [d3.symbolSquare](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#symbolSquare) - a square.
* [d3.symbolStar](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#symbolStar) - a pentagonal star (pentagram).
* [d3.symbolTriangle](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#symbolTriangle) - an up-pointing triangle.
* [d3.symbolWye](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#symbolWye) - a Y shape.
* [d3.pointRadial](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#pointRadial) - relative coordinates of a point given an angle and radius.
* [*symbolType*.draw](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#symbolType_draw) - draw this symbol to the given context.

### [Stacks](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#stacks)

Stack shapes, placing one adjacent to another, as in a stacked bar chart.

* [d3.stack](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#stack) - create a new stack generator.
* [*stack*](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#_stack) - generate a stack for the given dataset.
* [*stack*.keys](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#stack_keys) - set the keys accessor.
* [*stack*.value](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#stack_value) - set the value accessor.
* [*stack*.order](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#stack_order) - set the order accessor.
* [*stack*.offset](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#stack_offset) - set the offset accessor.
* [d3.stackOrderAppearance](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#stackOrderAppearance) - put the earliest series on bottom.
* [d3.stackOrderAscending](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#stackOrderAscending) - put the smallest series on bottom.
* [d3.stackOrderDescending](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#stackOrderDescending) - put the largest series on bottom.
* [d3.stackOrderInsideOut](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#stackOrderInsideOut) - put earlier series in the middle.
* [d3.stackOrderNone](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#stackOrderNone) - use the given series order.
* [d3.stackOrderReverse](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#stackOrderReverse) - use the reverse of the given series order.
* [d3.stackOffsetExpand](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#stackOffsetExpand) - normalize the baseline to zero and topline to one.
* [d3.stackOffsetDiverging](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#stackOffsetDiverging) - positive above zero; negative below zero.
* [d3.stackOffsetNone](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#stackOffsetNone) - apply a zero baseline.
* [d3.stackOffsetSilhouette](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#stackOffsetSilhouette) - center the streamgraph around zero.
* [d3.stackOffsetWiggle](https://github.com/d3/d3-shape/blob/v2.0.0/README.md#stackOffsetWiggle) - minimize streamgraph wiggling.

## [Time Formats (d3-time-format)](https://github.com/d3/d3-time-format/tree/v3.0.0)

Parse and format times, inspired by strptime and strftime.

* [d3.timeFormat](https://github.com/d3/d3-time-format/blob/v3.0.0/README.md#timeFormat) - alias for *locale*.format on the default locale.
* [d3.timeParse](https://github.com/d3/d3-time-format/blob/v3.0.0/README.md#timeParse) - alias for *locale*.parse on the default locale.
* [d3.utcFormat](https://github.com/d3/d3-time-format/blob/v3.0.0/README.md#utcFormat) -  alias for *locale*.utcFormat on the default locale.
* [d3.utcParse](https://github.com/d3/d3-time-format/blob/v3.0.0/README.md#utcParse) -  alias for *locale*.utcParse on the default locale.
* [d3.isoFormat](https://github.com/d3/d3-time-format/blob/v3.0.0/README.md#isoFormat) - an ISO 8601 UTC formatter.
* [d3.isoParse](https://github.com/d3/d3-time-format/blob/v3.0.0/README.md#isoParse) - an ISO 8601 UTC parser.
* [*locale*.format](https://github.com/d3/d3-time-format/blob/v3.0.0/README.md#locale_format) - create a time formatter.
* [*locale*.parse](https://github.com/d3/d3-time-format/blob/v3.0.0/README.md#locale_parse) - create a time parser.
* [*locale*.utcFormat](https://github.com/d3/d3-time-format/blob/v3.0.0/README.md#locale_utcFormat) - create a UTC formatter.
* [*locale*.utcParse](https://github.com/d3/d3-time-format/blob/v3.0.0/README.md#locale_utcParse) - create a UTC parser.
* [d3.timeFormatLocale](https://github.com/d3/d3-time-format/blob/v3.0.0/README.md#timeFormatLocale) - define a custom locale.
* [d3.timeFormatDefaultLocale](https://github.com/d3/d3-time-format/blob/v3.0.0/README.md#timeFormatDefaultLocale) - define the default locale.

## [Time Intervals (d3-time)](https://github.com/d3/d3-time/tree/v2.0.0)

A calculator for humanity’s peculiar conventions of time.

* [d3.timeInterval](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeInterval) - implement a new custom time interval.
* [*interval*](https://github.com/d3/d3-time/blob/v2.0.0/README.md#_interval) - alias for *interval*.floor.
* [*interval*.floor](https://github.com/d3/d3-time/blob/v2.0.0/README.md#interval_floor) - round down to the nearest boundary.
* [*interval*.round](https://github.com/d3/d3-time/blob/v2.0.0/README.md#interval_round) - round to the nearest boundary.
* [*interval*.ceil](https://github.com/d3/d3-time/blob/v2.0.0/README.md#interval_ceil) - round up to the nearest boundary.
* [*interval*.offset](https://github.com/d3/d3-time/blob/v2.0.0/README.md#interval_offset) - offset a date by some number of intervals.
* [*interval*.range](https://github.com/d3/d3-time/blob/v2.0.0/README.md#interval_range) - generate a range of dates at interval boundaries.
* [*interval*.filter](https://github.com/d3/d3-time/blob/v2.0.0/README.md#interval_filter) - create a filtered subset of this interval.
* [*interval*.every](https://github.com/d3/d3-time/blob/v2.0.0/README.md#interval_every) - create a filtered subset of this interval.
* [*interval*.count](https://github.com/d3/d3-time/blob/v2.0.0/README.md#interval_count) - count interval boundaries between two dates.
* [d3.timeMillisecond](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeMillisecond), [d3.utcMillisecond](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeMillisecond) - the millisecond interval.
* [d3.timeMilliseconds](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeMillisecond), [d3.utcMilliseconds](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeMillisecond) - aliases for millisecond.range.
* [d3.timeSecond](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeSecond), [d3.utcSecond](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeSecond) - the second interval.
* [d3.timeSeconds](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeSecond), [d3.utcSeconds](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeSecond) - aliases for second.range.
* [d3.timeMinute](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeMinute), [d3.utcMinute](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeMinute) - the minute interval.
* [d3.timeMinutes](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeMinute), [d3.utcMinutes](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeMinute) - aliases for minute.range.
* [d3.timeHour](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeHour), [d3.utcHour](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeHour) - the hour interval.
* [d3.timeHours](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeHour), [d3.utcHours](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeHour) - aliases for hour.range.
* [d3.timeDay](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeDay), [d3.utcDay](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeDay) - the day interval.
* [d3.timeDays](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeDay), [d3.utcDays](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeDay) - aliases for day.range.
* [d3.timeWeek](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeWeek), [d3.utcWeek](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeWeek) - aliases for sunday.
* [d3.timeWeeks](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeWeek), [d3.utcWeeks](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeWeek) - aliases for week.range.
* [d3.timeSunday](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeSunday), [d3.utcSunday](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeSunday) - the week interval, starting on Sunday.
* [d3.timeSundays](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeSunday), [d3.utcSundays](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeSunday) - aliases for sunday.range.
* [d3.timeMonday](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeMonday), [d3.utcMonday](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeMonday) - the week interval, starting on Monday.
* [d3.timeMondays](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeMonday), [d3.utcMondays](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeMonday) - aliases for monday.range.
* [d3.timeTuesday](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeTuesday), [d3.utcTuesday](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeTuesday) - the week interval, starting on Tuesday.
* [d3.timeTuesdays](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeTuesday), [d3.utcTuesdays](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeTuesday) - aliases for tuesday.range.
* [d3.timeWednesday](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeWednesday), [d3.utcWednesday](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeWednesday) - the week interval, starting on Wednesday.
* [d3.timeWednesdays](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeWednesday), [d3.utcWednesdays](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeWednesday) - aliases for wednesday.range.
* [d3.timeThursday](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeThursday), [d3.utcThursday](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeThursday) - the week interval, starting on Thursday.
* [d3.timeThursdays](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeThursday), [d3.utcThursdays](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeThursday) - aliases for thursday.range.
* [d3.timeFriday](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeFriday), [d3.utcFriday](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeFriday) - the week interval, starting on Friday.
* [d3.timeFridays](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeFriday), [d3.utcFridays](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeFriday) - aliases for friday.range.
* [d3.timeSaturday](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeSaturday), [d3.utcSaturday](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeSaturday) - the week interval, starting on Saturday.
* [d3.timeSaturdays](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeSaturday), [d3.utcSaturdays](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeSaturday) - aliases for saturday.range.
* [d3.timeMonth](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeMonth), [d3.utcMonth](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeMonth) - the month interval.
* [d3.timeMonths](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeMonth), [d3.utcMonths](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeMonth) - aliases for month.range.
* [d3.timeYear](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeYear), [d3.utcYear](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeYear) - the year interval.
* [d3.timeYears](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeYear), [d3.utcYears](https://github.com/d3/d3-time/blob/v2.0.0/README.md#timeYear) - aliases for year.range.

## [Timers (d3-timer)](https://github.com/d3/d3-timer/tree/v2.0.0)

An efficient queue for managing thousands of concurrent animations.

* [d3.now](https://github.com/d3/d3-timer/blob/v2.0.0/README.md#now) - get the current high-resolution time.
* [d3.timer](https://github.com/d3/d3-timer/blob/v2.0.0/README.md#timer) - schedule a new timer.
* [*timer*.restart](https://github.com/d3/d3-timer/blob/v2.0.0/README.md#timer_restart) - reset the timer’s start time and callback.
* [*timer*.stop](https://github.com/d3/d3-timer/blob/v2.0.0/README.md#timer_stop) - stop the timer.
* [d3.timerFlush](https://github.com/d3/d3-timer/blob/v2.0.0/README.md#timerFlush) - immediately execute any eligible timers.
* [d3.timeout](https://github.com/d3/d3-timer/blob/v2.0.0/README.md#timeout) - schedule a timer that stops on its first callback.
* [d3.interval](https://github.com/d3/d3-timer/blob/v2.0.0/README.md#interval) - schedule a timer that is called with a configurable period.

## [Transitions (d3-transition)](https://github.com/d3/d3-transition/tree/v2.0.0)

Animated transitions for [selections](#selections).

* [*selection*.transition](https://github.com/d3/d3-transition/blob/v2.0.0/README.md#selection_transition) - schedule a transition for the selected elements.
* [*selection*.interrupt](https://github.com/d3/d3-transition/blob/v2.0.0/README.md#selection_interrupt) - interrupt and cancel transitions on the selected elements.
* [d3.interrupt](https://github.com/d3/d3-transition/blob/v2.0.0/README.md#interrupt) - interrupt the active transition for a given node.
* [d3.transition](https://github.com/d3/d3-transition/blob/v2.0.0/README.md#transition) - schedule a transition on the root document element.
* [*transition*.select](https://github.com/d3/d3-transition/blob/v2.0.0/README.md#transition_select) - schedule a transition on the selected elements.
* [*transition*.selectAll](https://github.com/d3/d3-transition/blob/v2.0.0/README.md#transition_selectAll) - schedule a transition on the selected elements.
* [*transition*.filter](https://github.com/d3/d3-transition/blob/v2.0.0/README.md#transition_filter) - filter elements based on data.
* [*transition*.merge](https://github.com/d3/d3-transition/blob/v2.0.0/README.md#transition_merge) - merge this transition with another.
* [*transition*.transition](https://github.com/d3/d3-transition/blob/v2.0.0/README.md#transition_transition) - schedule a new transition following this one.
* [*transition*.selection](https://github.com/d3/d3-transition/blob/v2.0.0/README.md#transition_selection) - returns a selection for this transition.
* [d3.active](https://github.com/d3/d3-transition/blob/v2.0.0/README.md#active) - select the active transition for a given node.
* [*transition*.attr](https://github.com/d3/d3-transition/blob/v2.0.0/README.md#transition_attr) - tween the given attribute using the default interpolator.
* [*transition*.attrTween](https://github.com/d3/d3-transition/blob/v2.0.0/README.md#transition_attrTween) - tween the given attribute using a custom interpolator.
* [*transition*.style](https://github.com/d3/d3-transition/blob/v2.0.0/README.md#transition_style) - tween the given style property using the default interpolator.
* [*transition*.styleTween](https://github.com/d3/d3-transition/blob/v2.0.0/README.md#transition_styleTween) - tween the given style property using a custom interpolator.
* [*transition*.text](https://github.com/d3/d3-transition/blob/v2.0.0/README.md#transition_text) - set the text content when the transition starts.
* [*transition*.textTween](https://github.com/d3/d3-transition/blob/v2.0.0/README.md#transition_textTween) - tween the text using a custom interpolator.
* [*transition*.remove](https://github.com/d3/d3-transition/blob/v2.0.0/README.md#transition_remove) - remove the selected elements when the transition ends.
* [*transition*.tween](https://github.com/d3/d3-transition/blob/v2.0.0/README.md#transition_tween) - run custom code during the transition.
* [*transition*.delay](https://github.com/d3/d3-transition/blob/v2.0.0/README.md#transition_delay) - specify per-element delay in milliseconds.
* [*transition*.duration](https://github.com/d3/d3-transition/blob/v2.0.0/README.md#transition_duration) - specify per-element duration in milliseconds.
* [*transition*.ease](https://github.com/d3/d3-transition/blob/v2.0.0/README.md#transition_ease) - specify the easing function.
* [*transition*.easeVarying](https://github.com/d3/d3-transition/blob/v2.0.0/README.md#transition_easeVarying) - specify an easing function factory.
* [*transition*.end](https://github.com/d3/d3-transition/blob/v2.0.0/README.md#transition_end) - a promise that resolves when a transition ends.
* [*transition*.on](https://github.com/d3/d3-transition/blob/v2.0.0/README.md#transition_on) - await the end of a transition.
* [*transition*.each](https://github.com/d3/d3-transition/blob/v2.0.0/README.md#transition_each) - call a function for each element.
* [*transition*.call](https://github.com/d3/d3-transition/blob/v2.0.0/README.md#transition_call) - call a function with this transition.
* [*transition*.empty](https://github.com/d3/d3-transition/blob/v2.0.0/README.md#transition_empty) - returns true if this transition is empty.
* [*transition*.nodes](https://github.com/d3/d3-transition/blob/v2.0.0/README.md#transition_nodes) - returns an array of all selected elements.
* [*transition*.node](https://github.com/d3/d3-transition/blob/v2.0.0/README.md#transition_node) - returns the first (non-null) element.
* [*transition*.size](https://github.com/d3/d3-transition/blob/v2.0.0/README.md#transition_size) - returns the count of elements.

## [Zooming (d3-zoom)](https://github.com/d3/d3-zoom/tree/v2.0.0)

Pan and zoom SVG, HTML or Canvas using mouse or touch input.

* [d3.zoom](https://github.com/d3/d3-zoom/blob/v2.0.0/README.md#zoom) - create a zoom behavior.
* [*zoom*](https://github.com/d3/d3-zoom/blob/v2.0.0/README.md#_zoom) - apply the zoom behavior to the selected elements.
* [*zoom*.transform](https://github.com/d3/d3-zoom/blob/v2.0.0/README.md#zoom_transform) - change the transform for the selected elements.
* [*zoom*.translateBy](https://github.com/d3/d3-zoom/blob/v2.0.0/README.md#zoom_translateBy) - translate the transform for the selected elements.
* [*zoom*.translateTo](https://github.com/d3/d3-zoom/blob/v2.0.0/README.md#zoom_translateTo) - translate the transform for the selected elements.
* [*zoom*.scaleBy](https://github.com/d3/d3-zoom/blob/v2.0.0/README.md#zoom_scaleBy) - scale the transform for the selected elements.
* [*zoom*.scaleTo](https://github.com/d3/d3-zoom/blob/v2.0.0/README.md#zoom_scaleTo) - scale the transform for the selected elements.
* [*zoom*.constrain](https://github.com/d3/d3-zoom/blob/v2.0.0/README.md#zoom_constrain) - override the transform constraint logic.
* [*zoom*.filter](https://github.com/d3/d3-zoom/blob/v2.0.0/README.md#zoom_filter) - control which input events initiate zooming.
* [*zoom*.touchable](https://github.com/d3/d3-zoom/blob/v2.0.0/README.md#zoom_touchable) - set the touch support detector.
* [*zoom*.wheelDelta](https://github.com/d3/d3-zoom/blob/v2.0.0/README.md#zoom_wheelDelta) - override scaling for wheel events.
* [*zoom*.extent](https://github.com/d3/d3-zoom/blob/v2.0.0/README.md#zoom_extent) - set the extent of the viewport.
* [*zoom*.scaleExtent](https://github.com/d3/d3-zoom/blob/v2.0.0/README.md#zoom_scaleExtent) - set the allowed scale range.
* [*zoom*.translateExtent](https://github.com/d3/d3-zoom/blob/v2.0.0/README.md#zoom_translateExtent) - set the extent of the zoomable world.
* [*zoom*.clickDistance](https://github.com/d3/d3-zoom/blob/v2.0.0/README.md#zoom_clickDistance) - set the click distance threshold.
* [*zoom*.tapDistance](https://github.com/d3/d3-zoom/blob/v2.0.0/README.md#zoom_tapDistance) - set the tap distance threshold.
* [*zoom*.duration](https://github.com/d3/d3-zoom/blob/v2.0.0/README.md#zoom_duration) - set the duration of zoom transitions.
* [*zoom*.interpolate](https://github.com/d3/d3-zoom/blob/v2.0.0/README.md#zoom_interpolate) - control the interpolation of zoom transitions.
* [*zoom*.on](https://github.com/d3/d3-zoom/blob/v2.0.0/README.md#zoom_on) - listen for zoom events.
* [d3.zoomTransform](https://github.com/d3/d3-zoom/blob/v2.0.0/README.md#zoomTransform) - get the zoom transform for a given element.
* [*transform*.scale](https://github.com/d3/d3-zoom/blob/v2.0.0/README.md#transform_scale) - scale a transform by the specified amount.
* [*transform*.translate](https://github.com/d3/d3-zoom/blob/v2.0.0/README.md#transform_translate) - translate a transform by the specified amount.
* [*transform*.apply](https://github.com/d3/d3-zoom/blob/v2.0.0/README.md#transform_apply) - apply the transform to the given point.
* [*transform*.applyX](https://github.com/d3/d3-zoom/blob/v2.0.0/README.md#transform_applyX) - apply the transform to the given *x*-coordinate.
* [*transform*.applyY](https://github.com/d3/d3-zoom/blob/v2.0.0/README.md#transform_applyY) - apply the transform to the given *y*-coordinate.
* [*transform*.invert](https://github.com/d3/d3-zoom/blob/v2.0.0/README.md#transform_invert) - unapply the transform to the given point.
* [*transform*.invertX](https://github.com/d3/d3-zoom/blob/v2.0.0/README.md#transform_invertX) - unapply the transform to the given *x*-coordinate.
* [*transform*.invertY](https://github.com/d3/d3-zoom/blob/v2.0.0/README.md#transform_invertY) - unapply the transform to the given *y*-coordinate.
* [*transform*.rescaleX](https://github.com/d3/d3-zoom/blob/v2.0.0/README.md#transform_rescaleX) - apply the transform to an *x*-scale’s domain.
* [*transform*.rescaleY](https://github.com/d3/d3-zoom/blob/v2.0.0/README.md#transform_rescaleY) - apply the transform to a *y*-scale’s domain.
* [*transform*.toString](https://github.com/d3/d3-zoom/blob/v2.0.0/README.md#transform_toString) - format the transform as an SVG transform string.
* [d3.zoomIdentity](https://github.com/d3/d3-zoom/blob/v2.0.0/README.md#zoomIdentity) - the identity transform.
