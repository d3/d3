---
outline: 2
---

# API index

D3 is a collection of modules that are designed to work together; you can use the modules independently, or you can use them together as part of the default build.

## [d3-array](./d3-array.md)

Array manipulation, ordering, searching, summarizing, *etc.*

### [Add](./d3-array/add.md)

Add floating point values with full precision.

* [new Adder](./d3-array/add.md#Adder) - create a full precision adder.
* [*adder*.add](./d3-array/add.md#adder_add) - add a value to an adder.
* [*adder*.valueOf](./d3-array/add.md#adder_valueOf) - get the double-precision representation of an adder’s value.
* [fcumsum](./d3-array/add.md#fcumsum) - compute a full precision cumulative summation of numbers.
* [fsum](./d3-array/add.md#fsum) - compute a full precision summation of an iterable of numbers.

### [Bin](./d3-array/bin.md)

Bin discrete samples into continuous, non-overlapping intervals.

* [bin](./d3-array/bin.md#bin) - create a new bin generator.
* [*bin*](./d3-array/bin.md#_bin) - bins a given array of samples.
* [*bin*.value](./d3-array/bin.md#bin_value) - specify a value accessor for each sample.
* [*bin*.domain](./d3-array/bin.md#bin_domain) - specify the interval of observable values.
* [*bin*.thresholds](./d3-array/bin.md#bin_thresholds) - specify how values are divided into bins.
* [thresholdFreedmanDiaconis](./d3-array/bin.md#thresholdFreedmanDiaconis) - the Freedman–Diaconis binning rule.
* [thresholdScott](./d3-array/bin.md#thresholdScott) - Scott’s normal reference binning rule.
* [thresholdSturges](./d3-array/bin.md#thresholdSturges) - Sturges’ binning formula.

### [Bisect](./d3-array/bisect.md)

Quickly find a value in a sorted array.

* [bisector](./d3-array/bisect.md#bisector) - bisect using an accessor or comparator.
* [*bisector*.right](./d3-array/bisect.md#bisector_right) - bisectRight, with the given comparator.
* [*bisector*.left](./d3-array/bisect.md#bisector_left) - bisectLeft, with the given comparator.
* [*bisector*.center](./d3-array/bisect.md#bisector_center) - binary search for a value in a sorted array.
* [bisect](./d3-array/bisect.md#bisect) - binary search for a value in a sorted array.
* [bisectRight](./d3-array/bisect.md#bisectRight) - binary search for a value in a sorted array.
* [bisectLeft](./d3-array/bisect.md#bisectLeft) - binary search for a value in a sorted array.
* [bisectCenter](./d3-array/bisect.md#bisectCenter) - binary search for a value in a sorted array.

### [Blur](./d3-array/blur.md)

Blur quantitative values in one or two dimensions.

* [d3.blur](./d3-array/blur.md#blur) - blur an array of numbers in place.
* [d3.blur2](./d3-array/blur.md#blur2) - blur a two-dimensional array of numbers in place.
* [d3.blurImage](./d3-array/blur.md#blurImage) - blur an RGBA ImageData in place.

### [Group](./d3-array/group.md)

Group discrete values.

* [d3.group](./d3-array/group.md#group) - group an iterable into a nested Map.
* [d3.groups](./d3-array/group.md#groups) - group an iterable into a nested array.
* [d3.rollup](./d3-array/group.md#rollup) - reduce an iterable into a nested Map.
* [d3.rollups](./d3-array/group.md#rollups) - reduce an iterable into a nested array.
* [d3.index](./d3-array/group.md#index) - index an iterable into a nested Map.
* [d3.indexes](./d3-array/group.md#indexes) - index an iterable into a nested array.
* [d3.flatGroup](./d3-array/group.md#flatGroup) - group an iterable into a flat array.
* [d3.flatRollup](./d3-array/group.md#flatRollup) - reduce an iterable into a flat array.
* [d3.groupSort](./d3-array/group.md#groupSort) - sort keys according to grouped values.

### [Intern](./d3-array/intern.md)

Create maps and sets with non-primitive values such as dates.

* [new InternMap](./d3-array/intern.md#InternMap) - a key-interning Map.
* [new InternSet](./d3-array/intern.md#InternSet) - a value-interning Set.

### [Sets](./d3-array/sets.md)

Logical operations on sets.

* [d3.difference](./d3-array/sets.md#difference) - compute a set difference.
* [d3.disjoint](./d3-array/sets.md#disjoint) - test whether two sets are disjoint.
* [d3.intersection](./d3-array/sets.md#intersection) - compute a set intersection.
* [d3.superset](./d3-array/sets.md#superset) - test whether a set is a superset of another.
* [d3.subset](./d3-array/sets.md#subset) - test whether a set is a subset of another.
* [d3.union](./d3-array/sets.md#union) - compute a set union.

### [Sort](./d3-array/sort.md)

Sort and reorder arrays of values.

* [d3.ascending](./d3-array/sort.md#ascending) - compute the natural order of two values.
* [d3.descending](./d3-array/sort.md#descending) - compute the natural order of two values.
* [d3.permute](./d3-array/sort.md#permute) - reorder an iterable of elements according to an iterable of indexes.
* [d3.quickselect](./d3-array/sort.md#quickselect) - reorder an array of numbers.
* [d3.reverse](./d3-array/sort.md#reverse) - reverse the order of values.
* [d3.shuffle](./d3-array/sort.md#shuffle) - randomize the order of an iterable.
* [d3.shuffler](./d3-array/sort.md#shuffler) - randomize the order of an iterable.
* [d3.sort](./d3-array/sort.md#sort) - sort values.

### [Summarize](./d3-array/summarize.md)

Compute summary statistics.

* [d3.count](./d3-array/summarize.md#count) - count valid number values in an iterable.
* [d3.min](./d3-array/summarize.md#min) - compute the minimum value in an iterable.
* [d3.minIndex](./d3-array/summarize.md#minIndex) - compute the index of the minimum value in an iterable.
* [d3.max](./d3-array/summarize.md#max) - compute the maximum value in an iterable.
* [d3.maxIndex](./d3-array/summarize.md#maxIndex) - compute the index of the maximum value in an iterable.
* [d3.least](./d3-array/summarize.md#least) - returns the least element of an iterable.
* [d3.leastIndex](./d3-array/summarize.md#leastIndex) - returns the index of the least element of an iterable.
* [d3.greatest](./d3-array/summarize.md#greatest) - returns the greatest element of an iterable.
* [d3.greatestIndex](./d3-array/summarize.md#greatestIndex) - returns the index of the greatest element of an iterable.
* [d3.extent](./d3-array/summarize.md#extent) - compute the minimum and maximum value in an iterable.
* [d3.mode](./d3-array/summarize.md#mode) - compute the mode (the most common value) of an iterable of numbers.
* [d3.sum](./d3-array/summarize.md#sum) - compute the sum of an iterable of numbers.
* [d3.mean](./d3-array/summarize.md#mean) - compute the arithmetic mean of an iterable of numbers.
* [d3.median](./d3-array/summarize.md#median) - compute the median of an iterable of numbers (the 0.5-quantile).
* [d3.medianIndex](./d3-array/summarize.md#median) - compute the median index of an iterable of numbers (the 0.5-quantile).
* [d3.cumsum](./d3-array/summarize.md#cumsum) - compute the cumulative sum of an iterable.
* [d3.quantile](./d3-array/summarize.md#quantile) - compute a quantile for an iterable of numbers.
* [d3.quantileIndex](./d3-array/summarize.md#quantileIndex) - compute a quantile index for an iterable of numbers.
* [d3.quantileSorted](./d3-array/summarize.md#quantileSorted) - compute a quantile for a sorted array of numbers.
* [d3.rank](./d3-array/summarize.md#rank) - compute the rank order of an iterable.
* [d3.variance](./d3-array/summarize.md#variance) - compute the variance of an iterable of numbers.
* [d3.deviation](./d3-array/summarize.md#deviation) - compute the standard deviation of an iterable of numbers.
* [d3.every](./d3-array/summarize.md#every) - test if all values satisfy a condition.
* [d3.some](./d3-array/summarize.md#some) - test if any value satisfies a condition.

### [Ticks](./d3-array/ticks.md)

Generate representative values from a continuous interval.

* [d3.ticks](./d3-array/ticks.md#ticks) - generate representative values from a numeric interval.
* [d3.tickIncrement](./d3-array/ticks.md#tickIncrement) - generate representative values from a numeric interval.
* [d3.tickStep](./d3-array/ticks.md#tickStep) - generate representative values from a numeric interval.
* [d3.nice](./d3-array/ticks.md#nice) - extend an interval to align with ticks.
* [d3.range](./d3-array/ticks.md#range) - generate a range of numeric values.

### [Transform](./d3-array/transform.md)

Derive new arrays.

* [d3.cross](./d3-array/transform.md#cross) - compute the Cartesian product of two iterables.
* [d3.merge](./d3-array/transform.md#merge) - merge multiple iterables into one array.
* [d3.pairs](./d3-array/transform.md#pairs) - create an array of adjacent pairs of elements.
* [d3.transpose](./d3-array/transform.md#transpose) - transpose an array of arrays.
* [d3.zip](./d3-array/transform.md#zip) - transpose a variable number of arrays.
* [d3.filter](./d3-array/transform.md#filter) - filter values.
* [d3.map](./d3-array/transform.md#map) - map values.
* [d3.reduce](./d3-array/transform.md#reduce) - reduce values.

## [d3-axis](./d3-axis.md)

Human-readable reference marks for scales.

* [d3.axisTop](./d3-axis.md#axisTop) - create a new top-oriented axis generator.
* [d3.axisRight](./d3-axis.md#axisRight) - create a new right-oriented axis generator.
* [d3.axisBottom](./d3-axis.md#axisBottom) - create a new bottom-oriented axis generator.
* [d3.axisLeft](./d3-axis.md#axisLeft) - create a new left-oriented axis generator.
* [*axis*](./d3-axis.md#_axis) - generate an axis for the given selection.
* [*axis*.scale](./d3-axis.md#axis_scale) - set the scale.
* [*axis*.ticks](./d3-axis.md#axis_ticks) - customize how ticks are generated and formatted.
* [*axis*.tickArguments](./d3-axis.md#axis_tickArguments) - customize how ticks are generated and formatted.
* [*axis*.tickValues](./d3-axis.md#axis_tickValues) - set the tick values explicitly.
* [*axis*.tickFormat](./d3-axis.md#axis_tickFormat) - set the tick format explicitly.
* [*axis*.tickSize](./d3-axis.md#axis_tickSize) - set the size of the ticks.
* [*axis*.tickSizeInner](./d3-axis.md#axis_tickSizeInner) - set the size of inner ticks.
* [*axis*.tickSizeOuter](./d3-axis.md#axis_tickSizeOuter) - set the size of outer (extent) ticks.
* [*axis*.tickPadding](./d3-axis.md#axis_tickPadding) - set the padding between ticks and labels.
* [*axis*.offset](./d3-axis.md#axis_offset) - set the pixel offset for crisp edges.

## [d3-brush](./d3-brush.md)

Select a one- or two-dimensional region using the mouse or touch.

* [d3.brush](./d3-brush.md#brush) - create a new two-dimensional brush.
* [d3.brushX](./d3-brush.md#brushX) - create a brush along the *x*-dimension.
* [d3.brushY](./d3-brush.md#brushY) - create a brush along the *y*-dimension.
* [*brush*](./d3-brush.md#_brush) - apply the brush to a selection.
* [*brush*.move](./d3-brush.md#brush_move) - move the brush selection.
* [*brush*.clear](./d3-brush.md#brush_clear) - clear the brush selection.
* [*brush*.extent](./d3-brush.md#brush_extent) - define the brushable region.
* [*brush*.filter](./d3-brush.md#brush_filter) - control which input events initiate brushing.
* [*brush*.touchable](./d3-brush.md#brush_touchable) - set the touch support detector.
* [*brush*.keyModifiers](./d3-brush.md#brush_keyModifiers) - enable or disable key interaction.
* [*brush*.handleSize](./d3-brush.md#brush_handleSize) - set the size of the brush handles.
* [*brush*.on](./d3-brush.md#brush_on) - listen for brush events.
* [d3.brushSelection](./d3-brush.md#brushSelection) - get the brush selection for a given node.

## [d3-chord](./d3-chord.md)

* [d3.chord](./d3-chord/chord.md#chord) - create a new chord layout.
* [*chord*](./d3-chord/chord.md#_chord) - compute the layout for the given matrix.
* [*chord*.padAngle](./d3-chord/chord.md#chord_padAngle) - set the padding between adjacent groups.
* [*chord*.sortGroups](./d3-chord/chord.md#chord_sortGroups) - define the group order.
* [*chord*.sortSubgroups](./d3-chord/chord.md#chord_sortSubgroups) - define the source and target order within groups.
* [*chord*.sortChords](./d3-chord/chord.md#chord_sortChords) - define the chord order across groups.
* [d3.chordDirected](./d3-chord/chord.md#chordDirected) - create a directed chord generator.
* [d3.chordTranspose](./d3-chord/chord.md#chordTranspose) - create a transposed chord generator.
* [d3.ribbon](./d3-chord/ribbon.md#ribbon) - create a ribbon shape generator.
* [*ribbon*](./d3-chord/ribbon.md#_ribbon) - generate a ribbon shape.
* [*ribbon*.source](./d3-chord/ribbon.md#ribbon_source) - set the source accessor.
* [*ribbon*.target](./d3-chord/ribbon.md#ribbon_target) - set the target accessor.
* [*ribbon*.radius](./d3-chord/ribbon.md#ribbon_radius) - set the ribbon source and target radius.
* [*ribbon*.sourceRadius](./d3-chord/ribbon.md#ribbon_sourceRadius) - set the ribbon source radius.
* [*ribbon*.targetRadius](./d3-chord/ribbon.md#ribbon_targetRadius) - set the ribbon target radius.
* [*ribbon*.startAngle](./d3-chord/ribbon.md#ribbon_startAngle) - set the ribbon source or target start angle.
* [*ribbon*.endAngle](./d3-chord/ribbon.md#ribbon_endAngle) - set the ribbon source or target end angle.
* [*ribbon*.padAngle](./d3-chord/ribbon.md#ribbon_padAngle) - set the pad angle accessor.
* [*ribbon*.context](./d3-chord/ribbon.md#ribbon_context) - set the render context.
* [d3.ribbonArrow](./d3-chord/ribbon.md#ribbonArrow) - create an arrow ribbon generator.
* [*ribbonArrow*.headRadius](./d3-chord/ribbon.md#ribbonArrow_headRadius) - set the arrowhead radius accessor.

## [d3-color](./d3-color.md)

Color manipulation and color space conversion.

* [d3.color](./d3-color.md#color) - parse the given CSS color specifier.
* [*color*.opacity](./d3-color.md#color_opacity) - the color’s opacity.
* [*color*.rgb](./d3-color.md#color_rgb) - compute the RGB equivalent of this color.
* [*color*.copy](./d3-color.md#color_copy) - return a copy of this color.
* [*color*.brighter](./d3-color.md#color_brighter) - create a brighter copy of this color.
* [*color*.darker](./d3-color.md#color_darker) - create a darker copy of this color.
* [*color*.displayable](./d3-color.md#color_displayable) - returns true if the color is displayable on standard hardware.
* [*color*.formatHex](./d3-color.md#color_formatHex) - returns the hexadecimal RRGGBB string representation of this color.
* [*color*.formatHex8](./d3-color.md#color_formatHex8) - returns the hexadecimal RRGGBBAA string representation of this color.
* [*color*.formatHsl](./d3-color.md#color_formatHsl) - returns the RGB string representation of this color.
* [*color*.formatRgb](./d3-color.md#color_formatRgb) - returns the HSL string representation of this color.
* [*color*.toString](./d3-color.md#color_toString) - returns the RGB string representation of this color.
* [d3.rgb](./d3-color.md#rgb) - create a new RGB color.
* [*rgb*.clamp](./d3-color.md#rgb_clamp) - returns copy of this color clamped to the RGB color space.
* [d3.hsl](./d3-color.md#hsl) - create a new HSL color.
* [*hsl*.clamp](./d3-color.md#hsl_clamp) - returns copy of this color clamped to the HSL color space.
* [d3.lab](./d3-color.md#lab) - create a new Lab color.
* [d3.gray](./d3-color.md#gray) - create a new Lab gray.
* [d3.hcl](./d3-color.md#hcl) - create a new HCL color.
* [d3.lch](./d3-color.md#lch) - create a new HCL color.
* [d3.cubehelix](./d3-color.md#cubehelix) - create a new Cubehelix color.

## [d3-contour](./d3-contour.md)

Compute contour polygons using marching squares.

* [d3.contours](./d3-contour/contour.md#contours) - create a new contour generator.
* [*contours*](./d3-contour/contour.md#_contours) - compute the contours for a given grid of values.
* [*contours*.contour](./d3-contour/contour.md#contours_contour) - compute a contour for a given value.
* [*contours*.size](./d3-contour/contour.md#contours_size) - set the size of a contour generator.
* [*contours*.smooth](./d3-contour/contour.md#contours_smooth) - set whether or not the generated contours are smoothed.
* [*contours*.thresholds](./d3-contour/contour.md#contours_thresholds) - set the thresholds of a contour generator.
* [d3.contourDensity](./d3-contour/density.md#contourDensity) - create a new density estimator.
* [*density*](./d3-contour/density.md#_density) - estimate the density of a given array of samples.
* [*density*.x](./d3-contour/density.md#density_x) - set the *x* accessor of the density estimator.
* [*density*.y](./d3-contour/density.md#density_y) - set the *y* accessor of the density estimator.
* [*density*.weight](./d3-contour/density.md#density_weight) - set the *weight* accessor of the density estimator.
* [*density*.size](./d3-contour/density.md#density_size) - set the size of the density estimator.
* [*density*.cellSize](./d3-contour/density.md#density_cellSize) - set the cell size of the density estimator.
* [*density*.thresholds](./d3-contour/density.md#density_thresholds) - set the thresholds of the density estimator.
* [*density*.bandwidth](./d3-contour/density.md#density_bandwidth) - set the bandwidth of the density estimator.
* [*density*.contours](./d3-contour/density.md#density_contours) - compute density contours.

## [d3-delaunay](./d3-delaunay.md)

Compute the Voronoi diagram of a set of two-dimensional points.

* [new Delaunay](./d3-delaunay/delaunay.md#Delaunay) - create a delaunay triangulation for an array of point coordinates.
* [Delaunay.from](./d3-delaunay/delaunay.md#Delaunay_from) - create a delaunay triangulation for an iterable of points.
* [*delaunay*.points](./d3-delaunay/delaunay.md#delaunay_points) - the coordinates of the points.
* [*delaunay*.halfedges](./d3-delaunay/delaunay.md#delaunay_halfedges) - the delaunay halfedges.
* [*delaunay*.hull](./d3-delaunay/delaunay.md#delaunay_hull) - the convex hull as point indices.
* [*delaunay*.triangles](./d3-delaunay/delaunay.md#delaunay_triangles) - the delaunay triangles.
* [*delaunay*.inedges](./d3-delaunay/delaunay.md#delaunay_inedges) - the delaunay inedges
* [*delaunay*.find](./d3-delaunay/delaunay.md#delaunay_find) - find the closest point in the delaunay triangulation.
* [*delaunay*.neighbors](./d3-delaunay/delaunay.md#delaunay_neighbors) - the neighbors of a point in the delaunay triangulation.
* [*delaunay*.render](./d3-delaunay/delaunay.md#delaunay_render) - render the edges of the delaunay triangulation.
* [*delaunay*.renderHull](./d3-delaunay/delaunay.md#delaunay_renderHull) - render the convex hull.
* [*delaunay*.renderTriangle](./d3-delaunay/delaunay.md#delaunay_renderTriangle) - render a triangle.
* [*delaunay*.renderPoints](./d3-delaunay/delaunay.md#delaunay_renderPoints) - render the points.
* [*delaunay*.hullPolygon](./d3-delaunay/delaunay.md#delaunay_hullPolygon) - the closed convex hull as point coordinates.
* [*delaunay*.trianglePolygons](./d3-delaunay/delaunay.md#delaunay_trianglePolygons) - iterate over all the triangles as polygons.
* [*delaunay*.trianglePolygon](./d3-delaunay/delaunay.md#delaunay_trianglePolygon) - return a triangle as a polygon.
* [*delaunay*.update](./d3-delaunay/delaunay.md#delaunay_update) - update a delaunay triangulation in place.
* [*delaunay*.voronoi](./d3-delaunay/voronoi.md#delaunay_voronoi) - compute the voronoi diagram associated with a delaunay triangulation.
* [*voronoi*.delaunay](./d3-delaunay/voronoi.md#voronoi_delaunay) - the voronoi diagram’s source delaunay triangulation.
* [*voronoi*.circumcenters](./d3-delaunay/voronoi.md#voronoi_circumcenters) - the triangles’ circumcenters.
* [*voronoi*.vectors](./d3-delaunay/voronoi.md#voronoi_vectors) - directions for the outer (infinite) cells of the voronoi diagram.
* [*voronoi*.xmin](./d3-delaunay/voronoi.md#voronoi_bounds) - set the *xmin* bound of the extent.
* [*voronoi*.ymin](./d3-delaunay/voronoi.md#voronoi_bounds) - set the *ymin* bound of the extent.
* [*voronoi*.xmax](./d3-delaunay/voronoi.md#voronoi_bounds) - set the *xmax* bound of the extent.
* [*voronoi*.ymax](./d3-delaunay/voronoi.md#voronoi_bounds) - set the *ymax* bound of the extent.
* [*voronoi*.contains](./d3-delaunay/voronoi.md#voronoi_contains) - test whether a point is inside a voronoi cell.
* [*voronoi*.neighbors](./d3-delaunay/voronoi.md#voronoi_neighbors) - the neighbors of a point in the voronoi diagram.
* [*voronoi*.render](./d3-delaunay/voronoi.md#voronoi_render) - render the mesh of voronoi cells.
* [*voronoi*.renderBounds](./d3-delaunay/voronoi.md#voronoi_renderBounds) - render the extent.
* [*voronoi*.renderCell](./d3-delaunay/voronoi.md#voronoi_renderCell) - render a voronoi cell.
* [*voronoi*.cellPolygons](./d3-delaunay/voronoi.md#voronoi_cellPolygons) - iterate over all the cells as polygons.
* [*voronoi*.cellPolygon](./d3-delaunay/voronoi.md#voronoi_cellPolygon) - return a cell as a polygon.
* [*voronoi*.update](./d3-delaunay/voronoi.md#voronoi_update) - update a voronoi diagram in place.

## [d3-dispatch](./d3-dispatch.md)

Separate concerns using named callbacks.

* [d3.dispatch](./d3-dispatch.md#dispatch) - create a custom event dispatcher.
* [*dispatch*.on](./d3-dispatch.md#dispatch_on) - register or unregister an event listener.
* [*dispatch*.copy](./d3-dispatch.md#dispatch_copy) - create a copy of a dispatcher.
* [*dispatch*.call](./d3-dispatch.md#dispatch_call) - dispatch an event to registered listeners.
* [*dispatch*.apply](./d3-dispatch.md#dispatch_apply) - dispatch an event to registered listeners.

## [d3-drag](./d3-drag.md)

Drag and drop SVG, HTML or Canvas using mouse or touch input.

* [d3.drag](./d3-drag.md#drag) - create a drag behavior.
* [*drag*](./d3-drag.md#_drag) - apply the drag behavior to a selection.
* [*drag*.container](./d3-drag.md#drag_container) - set the coordinate system.
* [*drag*.filter](./d3-drag.md#drag_filter) - ignore some initiating input events.
* [*drag*.touchable](./d3-drag.md#drag_touchable) - set the touch support detector.
* [*drag*.subject](./d3-drag.md#drag_subject) - set the thing being dragged.
* [*drag*.clickDistance](./d3-drag.md#drag_clickDistance) - set the click distance threshold.
* [*drag*.on](./d3-drag.md#drag_on) - listen for drag events.
* [d3.dragDisable](./d3-drag.md#dragDisable) - prevent native drag-and-drop and text selection.
* [d3.dragEnable](./d3-drag.md#dragEnable) - enable native drag-and-drop and text selection.
* [*event*.on](./d3-drag.md#event_on) - listen for drag events on the current gesture.

## [d3-dsv](./d3-dsv.md)

Parse and format delimiter-separated values, most commonly CSV and TSV.

* [d3.csvParse](./d3-dsv.md#csvParse) - parse the given CSV string, returning an array of objects.
* [d3.csvParseRows](./d3-dsv.md#csvParseRows) - parse the given CSV string, returning an array of rows.
* [d3.csvFormat](./d3-dsv.md#csvFormat) - format the given array of objects as CSV.
* [d3.csvFormatBody](./d3-dsv.md#csvFormatBody) - format the given array of objects as CSV.
* [d3.csvFormatRows](./d3-dsv.md#csvFormatRows) - format the given array of rows as CSV.
* [d3.csvFormatRow](./d3-dsv.md#csvFormatRow) - format the given row as CSV.
* [d3.csvFormatValue](./d3-dsv.md#csvFormatValue) - format the given value as CSV.
* [d3.tsvParse](./d3-dsv.md#tsvParse) - parse the given TSV string, returning an array of objects.
* [d3.tsvParseRows](./d3-dsv.md#tsvParseRows) - parse the given TSV string, returning an array of rows.
* [d3.tsvFormat](./d3-dsv.md#tsvFormat) - format the given array of objects as TSV.
* [d3.tsvFormatBody](./d3-dsv.md#tsvFormatBody) - format the given array of objects as TSV.
* [d3.tsvFormatRows](./d3-dsv.md#tsvFormatRows) - format the given array of rows as TSV.
* [d3.tsvFormatRow](./d3-dsv.md#tsvFormatRow) - format the given row as TSV.
* [d3.tsvFormatValue](./d3-dsv.md#tsvFormatValue) - format the given value as TSV.
* [d3.dsvFormat](./d3-dsv.md#dsvFormat) - create a new parser and formatter for the given delimiter.
* [*dsv*.parse](./d3-dsv.md#dsv_parse) - parse the given string, returning an array of objects.
* [*dsv*.parseRows](./d3-dsv.md#dsv_parseRows) - parse the given string, returning an array of rows.
* [*dsv*.format](./d3-dsv.md#dsv_format) - format the given array of objects.
* [*dsv*.formatBody](./d3-dsv.md#dsv_formatBody) - format the given array of objects.
* [*dsv*.formatRows](./d3-dsv.md#dsv_formatRows) - format the given array of rows.
* [*dsv*.formatRow](./d3-dsv.md#dsv_formatRow) - format the given row.
* [*dsv*.formatValue](./d3-dsv.md#dsv_formatValue) - format the given value.
* [d3.autoType](./d3-dsv.md#autoType) - automatically infer value types for the given object.

## [d3-ease](./d3-ease.md)

Easing functions for smooth animation.

* [*ease*](./d3-ease.md#_ease) - ease the given normalized time.
* [d3.easeLinear](./d3-ease.md#easeLinear) - linear easing; the identity function.
* [d3.easePolyIn](./d3-ease.md#easePolyIn) - polynomial easing; raises time to the given power.
* [d3.easePolyOut](./d3-ease.md#easePolyOut) - reverse polynomial easing.
* [d3.easePoly](./d3-ease.md#easePoly) - an alias for easePolyInOut.
* [d3.easePolyInOut](./d3-ease.md#easePolyInOut) - symmetric polynomial easing.
* [*poly*.exponent](./d3-ease.md#easePoly_exponent) - specify the polynomial exponent.
* [d3.easeQuadIn](./d3-ease.md#easeQuadIn) - quadratic easing; squares time.
* [d3.easeQuadOut](./d3-ease.md#easeQuadOut) - reverse quadratic easing.
* [d3.easeQuad](./d3-ease.md#easeQuad) - an alias for easeQuadInOut.
* [d3.easeQuadInOut](./d3-ease.md#easeQuadInOut) - symmetric quadratic easing.
* [d3.easeCubicIn](./d3-ease.md#easeCubicIn) - cubic easing; cubes time.
* [d3.easeCubicOut](./d3-ease.md#easeCubicOut) - reverse cubic easing.
* [d3.easeCubic](./d3-ease.md#easeCubic) - an alias for easeCubicInOut.
* [d3.easeCubicInOut](./d3-ease.md#easeCubicInOut) - symmetric cubic easing.
* [d3.easeSinIn](./d3-ease.md#easeSinIn) - sinusoidal easing.
* [d3.easeSinOut](./d3-ease.md#easeSinOut) - reverse sinusoidal easing.
* [d3.easeSin](./d3-ease.md#easeSin) - an alias for easeSinInOut.
* [d3.easeSinInOut](./d3-ease.md#easeSinInOut) - symmetric sinusoidal easing.
* [d3.easeExpIn](./d3-ease.md#easeExpIn) - exponential easing.
* [d3.easeExpOut](./d3-ease.md#easeExpOut) - reverse exponential easing.
* [d3.easeExp](./d3-ease.md#easeExp) - an alias for easeExpInOut.
* [d3.easeExpInOut](./d3-ease.md#easeExpInOut) - symmetric exponential easing.
* [d3.easeCircleIn](./d3-ease.md#easeCircleIn) - circular easing.
* [d3.easeCircleOut](./d3-ease.md#easeCircleOut) - reverse circular easing.
* [d3.easeCircle](./d3-ease.md#easeCircle) - an alias for easeCircleInOut.
* [d3.easeCircleInOut](./d3-ease.md#easeCircleInOut) - symmetric circular easing.
* [d3.easeElasticIn](./d3-ease.md#easeElasticIn) - elastic easing, like a rubber band.
* [d3.easeElastic](./d3-ease.md#easeElastic) - an alias for easeElasticOut.
* [d3.easeElasticOut](./d3-ease.md#easeElasticOut) - reverse elastic easing.
* [d3.easeElasticInOut](./d3-ease.md#easeElasticInOut) - symmetric elastic easing.
* [*elastic*.amplitude](./d3-ease.md#easeElastic_amplitude) - specify the elastic amplitude.
* [*elastic*.period](./d3-ease.md#easeElastic_period) - specify the elastic period.
* [d3.easeBackIn](./d3-ease.md#easeBackIn) - anticipatory easing, like a dancer bending his knees before jumping.
* [d3.easeBackOut](./d3-ease.md#easeBackOut) - reverse anticipatory easing.
* [d3.easeBack](./d3-ease.md#easeBack) - an alias for easeBackInOut.
* [d3.easeBackInOut](./d3-ease.md#easeBackInOut) - symmetric anticipatory easing.
* [*back*.overshoot](./d3-ease.md#easeBack_overshoot) - specify the amount of overshoot.
* [d3.easeBounceIn](./d3-ease.md#easeBounceIn) - bounce easing, like a rubber ball.
* [d3.easeBounce](./d3-ease.md#easeBounce) - an alias for easeBounceOut.
* [d3.easeBounceOut](./d3-ease.md#easeBounceOut) - reverse bounce easing.
* [d3.easeBounceInOut](./d3-ease.md#easeBounceInOut) - symmetric bounce easing.

## [d3-fetch](./d3-fetch.md)

Convenience methods on top of the Fetch API.

* [d3.blob](./d3-fetch.md#blob) - get a file as a blob.
* [d3.buffer](./d3-fetch.md#buffer) - get a file as an array buffer.
* [d3.csv](./d3-fetch.md#csv) - get a comma-separated values (CSV) file.
* [d3.dsv](./d3-fetch.md#dsv) - get a delimiter-separated values (CSV) file.
* [d3.html](./d3-fetch.md#html) - get an HTML file.
* [d3.image](./d3-fetch.md#image) - get an image.
* [d3.json](./d3-fetch.md#json) - get a JSON file.
* [d3.svg](./d3-fetch.md#svg) - get an SVG file.
* [d3.text](./d3-fetch.md#text) - get a plain text file.
* [d3.tsv](./d3-fetch.md#tsv) - get a tab-separated values (TSV) file.
* [d3.xml](./d3-fetch.md#xml) - get an XML file.

## [d3-force](./d3-force.md)

Force-directed graph layout using velocity Verlet integration.

* [d3.forceSimulation](./d3-force/simulation.md#forceSimulation) - create a new force simulation.
* [*simulation*.restart](./d3-force/simulation.md#simulation_restart) - reheat and restart the simulation’s timer.
* [*simulation*.stop](./d3-force/simulation.md#simulation_stop) - stop the simulation’s timer.
* [*simulation*.tick](./d3-force/simulation.md#simulation_tick) - advance the simulation one step.
* [*simulation*.nodes](./d3-force/simulation.md#simulation_nodes) - set the simulation’s nodes.
* [*simulation*.alpha](./d3-force/simulation.md#simulation_alpha) - set the current alpha.
* [*simulation*.alphaMin](./d3-force/simulation.md#simulation_alphaMin) - set the minimum alpha threshold.
* [*simulation*.alphaDecay](./d3-force/simulation.md#simulation_alphaDecay) - set the alpha exponential decay rate.
* [*simulation*.alphaTarget](./d3-force/simulation.md#simulation_alphaTarget) - set the target alpha.
* [*simulation*.velocityDecay](./d3-force/simulation.md#simulation_velocityDecay) - set the velocity decay rate.
* [*simulation*.force](./d3-force/simulation.md#simulation_force) - add or remove a force.
* [*simulation*.find](./d3-force/simulation.md#simulation_find) - find the closest node to the given position.
* [*simulation*.randomSource](./d3-force/simulation.md#simulation_randomSource) - set the simulation’s random source.
* [*simulation*.on](./d3-force/simulation.md#simulation_on) - add or remove an event listener.
* [*force*](./d3-force/simulation.md#_force) - apply the force.
* [*force*.initialize](./d3-force/simulation.md#force_initialize) - initialize the force with the given nodes.
* [d3.forceCenter](./d3-force/center.md#forceCenter) - create a centering force.
* [*center*.x](./d3-force/center.md#center_x) - set the center *x*-coordinate.
* [*center*.y](./d3-force/center.md#center_y) - set the center y coordinate.
* [*center*.strength](./d3-force/center.md#center_strength) - set the strength of the centering force.
* [d3.forceCollide](./d3-force/collide.md#forceCollide) - create a circle collision force.
* [*collide*.radius](./d3-force/collide.md#collide_radius) - set the circle radius.
* [*collide*.strength](./d3-force/collide.md#collide_strength) - set the collision resolution strength.
* [*collide*.iterations](./d3-force/collide.md#collide_iterations) - set the number of iterations.
* [d3.forceLink](./d3-force/link.md#forceLink) - create a link force.
* [*link*.links](./d3-force/link.md#link_links) - set the array of links.
* [*link*.id](./d3-force/link.md#link_id) - link nodes by numeric index or string identifier.
* [*link*.distance](./d3-force/link.md#link_distance) - set the link distance.
* [*link*.strength](./d3-force/link.md#link_strength) - set the link strength.
* [*link*.iterations](./d3-force/link.md#link_iterations) - set the number of iterations.
* [d3.forceManyBody](./d3-force/many-body.md#forceManyBody) - create a many-body force.
* [*manyBody*.strength](./d3-force/many-body.md#manyBody_strength) - set the force strength.
* [*manyBody*.theta](./d3-force/many-body.md#manyBody_theta) - set the Barnes–Hut approximation accuracy.
* [*manyBody*.distanceMin](./d3-force/many-body.md#manyBody_distanceMin) - limit the force when nodes are close.
* [*manyBody*.distanceMax](./d3-force/many-body.md#manyBody_distanceMax) - limit the force when nodes are far.
* [d3.forceX](./d3-force/position.md#forceX) - create an *x*-positioning force.
* [*x*.strength](./d3-force/position.md#x_strength) - set the force strength.
* [*x*.x](./d3-force/position.md#x_x) - set the target *x*-coordinate.
* [d3.forceY](./d3-force/position.md#forceY) - create an *y*-positioning force.
* [*y*.strength](./d3-force/position.md#y_strength) - set the force strength.
* [*y*.y](./d3-force/position.md#y_y) - set the target y coordinate.
* [d3.forceRadial](./d3-force/position.md#forceRadial) - create a radial positioning force.
* [*radial*.strength](./d3-force/position.md#radial_strength) - set the force strength.
* [*radial*.radius](./d3-force/position.md#radial_radius) - set the target radius.
* [*radial*.x](./d3-force/position.md#radial_x) - set the target center *x*-coordinate.
* [*radial*.y](./d3-force/position.md#radial_y) - set the target center y coordinate.

## [d3-format](./d3-format.md)

Format numbers for human consumption.

* [d3.format](./d3-format.md#format) - alias for *locale*.format on the default locale.
* [d3.formatPrefix](./d3-format.md#formatPrefix) - alias for *locale*.formatPrefix on the default locale.
* [*locale*.format](./d3-format.md#locale_format) - create a number format.
* [*locale*.formatPrefix](./d3-format.md#locale_formatPrefix) - create a SI-prefix number format.
* [d3.formatSpecifier](./d3-format.md#formatSpecifier) - parse a number format specifier.
* [new d3.FormatSpecifier](./d3-format.md#FormatSpecifier) - augments a number format specifier object.
* [d3.precisionFixed](./d3-format.md#precisionFixed) - compute decimal precision for fixed-point notation.
* [d3.precisionPrefix](./d3-format.md#precisionPrefix) - compute decimal precision for SI-prefix notation.
* [d3.precisionRound](./d3-format.md#precisionRound) - compute significant digits for rounded notation.
* [d3.formatLocale](./d3-format.md#formatLocale) - define a custom locale.
* [d3.formatDefaultLocale](./d3-format.md#formatDefaultLocale) - define the default locale.

## [d3-geo](./d3-geo.md)

Geographic projections, shapes and math.

### [Paths](./d3-geo/path.md)

* [d3.geoPath](./d3-geo/path.md#geoPath) - create a new geographic path generator.
* [*path*](./d3-geo/path.md#_path) - project and render the specified feature.
* [*path*.area](./d3-geo/path.md#path_area) - compute the projected planar area of a given feature.
* [*path*.bounds](./d3-geo/path.md#path_bounds) - compute the projected planar bounding box of a given feature.
* [*path*.centroid](./d3-geo/path.md#path_centroid) - compute the projected planar centroid of a given feature.
* [*path*.digits](./d3-geo/path.md#path_digits) - set the output precision.
* [*path*.measure](./d3-geo/path.md#path_measure) - compute the projected planar length of a given feature.
* [*path*.projection](./d3-geo/path.md#path_projection) - set the geographic projection.
* [*path*.context](./d3-geo/path.md#path_context) - set the render context.
* [*path*.pointRadius](./d3-geo/path.md#path_pointRadius) - set the radius to display point features.

### [Projections](./d3-geo/projection.md)

* [*projection*](./d3-geo/projection.md#_projection) - project the specified point from the sphere to the plane.
* [*projection*.invert](./d3-geo/projection.md#projection_invert) - unproject the specified point from the plane to the sphere.
* [*projection*.stream](./d3-geo/projection.md#projection_stream) - wrap the specified stream to project geometry.
* [*projection*.preclip](./d3-geo/projection.md#projection_preclip) - set the projection’s spherical clipping function.
* [*projection*.postclip](./d3-geo/projection.md#projection_postclip) - set the projection’s cartesian clipping function.
* [*projection*.clipAngle](./d3-geo/projection.md#projection_clipAngle) - set the radius of the clip circle.
* [*projection*.clipExtent](./d3-geo/projection.md#projection_clipExtent) - set the viewport clip extent, in pixels.
* [*projection*.scale](./d3-geo/projection.md#projection_scale) - set the scale factor.
* [*projection*.translate](./d3-geo/projection.md#projection_translate) - set the translation offset.
* [*projection*.center](./d3-geo/projection.md#projection_center) - set the center point.
* [*projection*.angle](./d3-geo/projection.md#projection_angle) - set the post-projection rotation.
* [*projection*.reflectX](./d3-geo/projection.md#projection_reflectX) - reflect the *x*-dimension.
* [*projection*.reflectY](./d3-geo/projection.md#projection_reflectY) - reflect the *y*-dimension.
* [*projection*.rotate](./d3-geo/projection.md#projection_rotate) - set the three-axis spherical rotation angles.
* [*projection*.precision](./d3-geo/projection.md#projection_precision) - set the precision threshold for adaptive sampling.
* [*projection*.fitExtent](./d3-geo/projection.md#projection_fitExtent) - set the scale and translate to fit a GeoJSON object.
* [*projection*.fitSize](./d3-geo/projection.md#projection_fitSize) - set the scale and translate to fit a GeoJSON object.
* [*projection*.fitWidth](./d3-geo/projection.md#projection_fitWidth) - set the scale and translate to fit a GeoJSON object.
* [*projection*.fitHeight](./d3-geo/projection.md#projection_fitHeight) - set the scale and translate to fit a GeoJSON object.

#### [Raw projections](./d3-geo/projection.md#raw-projections)

* [*project*](./d3-geo/projection.md#_project) - project the specified point from the sphere to the plane.
* [*project*.invert](./d3-geo/projection.md#project_invert) - unproject the specified point from the plane to the sphere.
* [d3.geoProjection](./d3-geo/projection.md#geoProjection) - create a custom projection.
* [d3.geoProjectionMutator](./d3-geo/projection.md#geoProjectionMutator) - create a custom configurable projection.
* [d3.geoTransform](./d3-geo/projection.md#geoTransform) - define a custom geometry transform.
* [d3.geoIdentity](./d3-geo/projection.md#geoIdentity) - scale, translate or clip planar geometry.
* [d3.geoClipAntimeridian](./d3-geo/projection.md#geoClipAntimeridian) - cuts spherical geometries that cross the antimeridian.
* [d3.geoClipCircle](./d3-geo/projection.md#geoClipCircle) - clips spherical geometries to a small circle.
* [d3.geoClipRectangle](./d3-geo/projection.md#geoClipRectangle) - clips planar geometries to a rectangular viewport.

#### [Azimuthal projections](./d3-geo/azimuthal.md)

* [d3.geoAzimuthalEqualArea](./d3-geo/azimuthal.md#geoAzimuthalEqualArea) - the azimuthal equal-area projection.
* [d3.geoAzimuthalEquidistant](./d3-geo/azimuthal.md#geoAzimuthalEquidistant) - the azimuthal equidistant projection.
* [d3.geoGnomonic](./d3-geo/azimuthal.md#geoGnomonic) - the gnomonic projection.
* [d3.geoOrthographic](./d3-geo/azimuthal.md#geoOrthographic) - the azimuthal orthographic projection.
* [d3.geoStereographic](./d3-geo/azimuthal.md#geoStereographic) - the azimuthal stereographic projection.

#### [Conic projections](./d3-geo/conic.md)

* [*conic*.parallels](./d3-geo/conic.md#conic_parallels) - set the two standard parallels.
* [d3.geoConicConformal](./d3-geo/conic.md#geoConicConformal) - the conic conformal projection.
* [d3.geoConicEqualArea](./d3-geo/conic.md#geoConicEqualArea) - the conic equal-area (Albers) projection.
* [d3.geoConicEquidistant](./d3-geo/conic.md#geoConicEquidistant) - the conic equidistant projection.
* [d3.geoAlbers](./d3-geo/conic.md#geoAlbers) - the Albers equal-area conic projection.
* [d3.geoAlbersUsa](./d3-geo/conic.md#geoAlbersUsa) - a composite Albers projection for the United States.

#### [Cylindrical projections](./d3-geo/cylindrical.md)

* [d3.geoEquirectangular](./d3-geo/cylindrical.md#geoEquirectangular) - the equirectangular (plate carreé) projection.
* [d3.geoMercator](./d3-geo/cylindrical.md#geoMercator) - the spherical Mercator projection.
* [d3.geoTransverseMercator](./d3-geo/cylindrical.md#geoTransverseMercator) - the transverse spherical Mercator projection.
* [d3.geoEqualEarth](./d3-geo/cylindrical.md#geoEqualEarth) - the Equal Earth projection.
* [d3.geoNaturalEarth1](./d3-geo/cylindrical.md#geoNaturalEarth1) - the Equal Earth projection, version 1.

### [Streams](./d3-geo/stream.md)

* [d3.geoStream](./d3-geo/stream.md#geoStream) - convert a GeoJSON object to a geometry stream.
* [*stream*.point](./d3-geo/stream.md#stream_point) - indicates a point with the specified coordinates.
* [*stream*.lineStart](./d3-geo/stream.md#stream_lineStart) - indicates the start of a line or ring.
* [*stream*.lineEnd](./d3-geo/stream.md#stream_lineEnd) - indicates the end of a line or ring.
* [*stream*.polygonStart](./d3-geo/stream.md#stream_polygonStart) - indicates the start of a polygon.
* [*stream*.polygonEnd](./d3-geo/stream.md#stream_polygonEnd) - indicates the end of a polygon.
* [*stream*.sphere](./d3-geo/stream.md#stream_sphere) - indicates the sphere.

### [Spherical shapes](./d3-geo/shape.md)

* [d3.geoGraticule](./d3-geo/shape.md#geoGraticule) - create a graticule generator.
* [*graticule*](./d3-geo/shape.md#_graticule) - generate a MultiLineString of meridians and parallels.
* [*graticule*.lines](./d3-geo/shape.md#graticule_lines) - generate an array of LineStrings of meridians and parallels.
* [*graticule*.outline](./d3-geo/shape.md#graticule_outline) - generate a Polygon of the graticule’s extent.
* [*graticule*.extent](./d3-geo/shape.md#graticule_extent) - get or set the major & minor extents.
* [*graticule*.extentMajor](./d3-geo/shape.md#graticule_extentMajor) - get or set the major extent.
* [*graticule*.extentMinor](./d3-geo/shape.md#graticule_extentMinor) - get or set the minor extent.
* [*graticule*.step](./d3-geo/shape.md#graticule_step) - get or set the major & minor step intervals.
* [*graticule*.stepMajor](./d3-geo/shape.md#graticule_stepMajor) - get or set the major step intervals.
* [*graticule*.stepMinor](./d3-geo/shape.md#graticule_stepMinor) - get or set the minor step intervals.
* [*graticule*.precision](./d3-geo/shape.md#graticule_precision) - get or set the latitudinal precision.
* [d3.geoGraticule10](./d3-geo/shape.md#geoGraticule10) - generate the default 10° global graticule.
* [d3.geoCircle](./d3-geo/shape.md#geoCircle) - create a circle generator.
* [*circle*](./d3-geo/shape.md#_circle) - generate a piecewise circle as a Polygon.
* [*circle*.center](./d3-geo/shape.md#circle_center) - specify the circle center in latitude and longitude.
* [*circle*.radius](./d3-geo/shape.md#circle_radius) - specify the angular radius in degrees.
* [*circle*.precision](./d3-geo/shape.md#circle_precision) - specify the precision of the piecewise circle.

### [Spherical math](./d3-geo/math.md)

* [d3.geoArea](./d3-geo/math.md#geoArea) - compute the spherical area of a given feature.
* [d3.geoBounds](./d3-geo/math.md#geoBounds) - compute the latitude-longitude bounding box for a given feature.
* [d3.geoCentroid](./d3-geo/math.md#geoCentroid) - compute the spherical centroid of a given feature.
* [d3.geoDistance](./d3-geo/math.md#geoDistance) - compute the great-arc distance between two points.
* [d3.geoLength](./d3-geo/math.md#geoLength) - compute the length of a line string or the perimeter of a polygon.
* [d3.geoInterpolate](./d3-geo/math.md#geoInterpolate) - interpolate between two points along a great arc.
* [d3.geoContains](./d3-geo/math.md#geoContains) - test whether a point is inside a given feature.
* [d3.geoRotation](./d3-geo/math.md#geoRotation) - create a rotation function for the specified angles.

## [d3-hierarchy](./d3-hierarchy.md)

Layout algorithms for visualizing hierarchical data.

* [d3.hierarchy](./d3-hierarchy/hierarchy.md#hierarchy) - constructs a root node from hierarchical data.
* [*node*.ancestors](./d3-hierarchy/hierarchy.md#node_ancestors) - generate an array of ancestors.
* [*node*.descendants](./d3-hierarchy/hierarchy.md#node_descendants) - generate an array of descendants.
* [*node*.leaves](./d3-hierarchy/hierarchy.md#node_leaves) - generate an array of leaves.
* [*node*.find](./d3-hierarchy/hierarchy.md#node_find) - find a node in the hierarchy.
* [*node*.path](./d3-hierarchy/hierarchy.md#node_path) - generate the shortest path to another node.
* [*node*.links](./d3-hierarchy/hierarchy.md#node_links) - generate an array of links.
* [*node*.sum](./d3-hierarchy/hierarchy.md#node_sum) - evaluate and aggregate quantitative values.
* [*node*.count](./d3-hierarchy/hierarchy.md#node_count) - count the number of leaves.
* [*node*.sort](./d3-hierarchy/hierarchy.md#node_sort) - sort all descendant siblings.
* [*node*[Symbol.iterator]](./d3-hierarchy/hierarchy.md#node_iterator) - iterate on a hierarchy.
* [*node*.each](./d3-hierarchy/hierarchy.md#node_each) - breadth-first traversal.
* [*node*.eachAfter](./d3-hierarchy/hierarchy.md#node_eachAfter) - post-order traversal.
* [*node*.eachBefore](./d3-hierarchy/hierarchy.md#node_eachBefore) - pre-order traversal.
* [*node*.copy](./d3-hierarchy/hierarchy.md#node_copy) - copy a hierarchy.
* [d3.stratify](./d3-hierarchy/stratify.md#stratify) - create a new stratify operator.
* [*stratify*](./d3-hierarchy/stratify.md#_stratify) - construct a root node from tabular data.
* [*stratify*.id](./d3-hierarchy/stratify.md#stratify_id) - set the node id accessor.
* [*stratify*.parentId](./d3-hierarchy/stratify.md#stratify_parentId) - set the parent node id accessor.
* [*stratify*.path](./d3-hierarchy/stratify.md#stratify_path) - set the path accessor.
* [d3.cluster](./d3-hierarchy/cluster.md#cluster) - create a new cluster (dendrogram) layout.
* [*cluster*](./d3-hierarchy/cluster.md#_cluster) - layout the specified hierarchy in a dendrogram.
* [*cluster*.size](./d3-hierarchy/cluster.md#cluster_size) - set the layout size.
* [*cluster*.nodeSize](./d3-hierarchy/cluster.md#cluster_nodeSize) - set the node size.
* [*cluster*.separation](./d3-hierarchy/cluster.md#cluster_separation) - set the separation between leaves.
* [d3.tree](./d3-hierarchy/tree.md#tree) - create a new tidy tree layout.
* [*tree*](./d3-hierarchy/tree.md#_tree) - layout the specified hierarchy in a tidy tree.
* [*tree*.size](./d3-hierarchy/tree.md#tree_size) - set the layout size.
* [*tree*.nodeSize](./d3-hierarchy/tree.md#tree_nodeSize) - set the node size.
* [*tree*.separation](./d3-hierarchy/tree.md#tree_separation) - set the separation between nodes.
* [d3.treemap](./d3-hierarchy/treemap.md#treemap) - create a new treemap layout.
* [*treemap*](./d3-hierarchy/treemap.md#_treemap) - layout the specified hierarchy as a treemap.
* [*treemap*.tile](./d3-hierarchy/treemap.md#treemap_tile) - set the tiling method.
* [*treemap*.size](./d3-hierarchy/treemap.md#treemap_size) - set the layout size.
* [*treemap*.round](./d3-hierarchy/treemap.md#treemap_round) - set whether the output coordinates are rounded.
* [*treemap*.padding](./d3-hierarchy/treemap.md#treemap_padding) - set the padding.
* [*treemap*.paddingInner](./d3-hierarchy/treemap.md#treemap_paddingInner) - set the padding between siblings.
* [*treemap*.paddingOuter](./d3-hierarchy/treemap.md#treemap_paddingOuter) - set the padding between parent and children.
* [*treemap*.paddingTop](./d3-hierarchy/treemap.md#treemap_paddingTop) - set the padding between the parent’s top edge and children.
* [*treemap*.paddingRight](./d3-hierarchy/treemap.md#treemap_paddingRight) - set the padding between the parent’s right edge and children.
* [*treemap*.paddingBottom](./d3-hierarchy/treemap.md#treemap_paddingBottom) - set the padding between the parent’s bottom edge and children.
* [*treemap*.paddingLeft](./d3-hierarchy/treemap.md#treemap_paddingLeft) - set the padding between the parent’s left edge and children.
* [d3.treemapBinary](./d3-hierarchy/treemap.md#treemapBinary) - tile using a balanced binary tree.
* [d3.treemapDice](./d3-hierarchy/treemap.md#treemapDice) - tile into a horizontal row.
* [d3.treemapSlice](./d3-hierarchy/treemap.md#treemapSlice) - tile into a vertical column.
* [d3.treemapSliceDice](./d3-hierarchy/treemap.md#treemapSliceDice) - alternate between slicing and dicing.
* [d3.treemapSquarify](./d3-hierarchy/treemap.md#treemapSquarify) - tile using squarified rows per Bruls *et. al.*
* [d3.treemapResquarify](./d3-hierarchy/treemap.md#treemapResquarify) - like d3.treemapSquarify, but performs stable updates.
* [*squarify*.ratio](./d3-hierarchy/treemap.md#squarify_ratio) - set the desired rectangle aspect ratio.
* [d3.partition](./d3-hierarchy/partition.md#partition) - create a new partition (icicle or sunburst) layout.
* [*partition*](./d3-hierarchy/partition.md#_partition) - layout the specified hierarchy as a partition diagram.
* [*partition*.size](./d3-hierarchy/partition.md#partition_size) - set the layout size.
* [*partition*.round](./d3-hierarchy/partition.md#partition_round) - set whether the output coordinates are rounded.
* [*partition*.padding](./d3-hierarchy/partition.md#partition_padding) - set the padding.
* [d3.pack](./d3-hierarchy/pack.md#pack) - create a new circle-packing layout.
* [*pack*](./d3-hierarchy/pack.md#_pack) - layout the specified hierarchy using circle-packing.
* [*pack*.radius](./d3-hierarchy/pack.md#pack_radius) - set the radius accessor.
* [*pack*.size](./d3-hierarchy/pack.md#pack_size) - set the layout size.
* [*pack*.padding](./d3-hierarchy/pack.md#pack_padding) - set the padding.
* [d3.packSiblings](./d3-hierarchy/pack.md#packSiblings) - pack the specified array of circles.
* [d3.packEnclose](./d3-hierarchy/pack.md#packEnclose) - enclose the specified array of circles.

## [d3-interpolate](./d3-interpolate.md)

Interpolate numbers, colors, strings, arrays, objects, whatever!

### [Value interpolation](./d3-interpolate/value.md)

* [d3.interpolate](./d3-interpolate/value.md#interpolate) - interpolate arbitrary values.
* [d3.interpolateNumber](./d3-interpolate/value.md#interpolateNumber) - interpolate numbers.
* [d3.interpolateRound](./d3-interpolate/value.md#interpolateRound) - interpolate integers.
* [d3.interpolateString](./d3-interpolate/value.md#interpolateString) - interpolate strings with embedded numbers.
* [d3.interpolateDate](./d3-interpolate/value.md#interpolateDate) - interpolate dates.
* [d3.interpolateArray](./d3-interpolate/value.md#interpolateArray) - interpolate arrays of arbitrary values.
* [d3.interpolateNumberArray](./d3-interpolate/value.md#interpolateNumberArray) - interpolate arrays of numbers.
* [d3.interpolateObject](./d3-interpolate/value.md#interpolateObject) - interpolate arbitrary objects.
* [d3.interpolateBasis](./d3-interpolate/value.md#interpolateBasis) - generate a B-spline through a set of values.
* [d3.interpolateBasisClosed](./d3-interpolate/value.md#interpolateBasisClosed) - generate a closed B-spline through a set of values.
* [d3.interpolateDiscrete](./d3-interpolate/value.md#interpolateDiscrete) - generate a discrete interpolator from a set of values.
* [d3.quantize](./d3-interpolate/value.md#quantize) - generate uniformly-spaced samples from an interpolator.
* [d3.piecewise](./d3-interpolate/value.md#piecewise) - generate a piecewise linear interpolator from a set of values.

### [Color interpolation](./d3-interpolate/color.md)

* [d3.interpolateRgb](./d3-interpolate/color.md#interpolateRgb) - interpolate RGB colors.
* [d3.interpolateRgbBasis](./d3-interpolate/color.md#interpolateRgbBasis) - generate a B-spline through a set of colors.
* [d3.interpolateRgbBasisClosed](./d3-interpolate/color.md#interpolateRgbBasisClosed) - generate a closed B-spline through a set of colors.
* [d3.interpolateHsl](./d3-interpolate/color.md#interpolateHsl) - interpolate HSL colors.
* [d3.interpolateHslLong](./d3-interpolate/color.md#interpolateHslLong) - interpolate HSL colors, the long way.
* [d3.interpolateLab](./d3-interpolate/color.md#interpolateLab) - interpolate Lab colors.
* [d3.interpolateHcl](./d3-interpolate/color.md#interpolateHcl) - interpolate HCL colors.
* [d3.interpolateHclLong](./d3-interpolate/color.md#interpolateHclLong) - interpolate HCL colors, the long way.
* [d3.interpolateCubehelix](./d3-interpolate/color.md#interpolateCubehelix) - interpolate Cubehelix colors.
* [d3.interpolateCubehelixLong](./d3-interpolate/color.md#interpolateCubehelixLong) - interpolate Cubehelix colors, the long way.
* [*interpolateColor*.gamma](./d3-interpolate/color.md#interpolateColor_gamma) - apply gamma correction during interpolation.
* [d3.interpolateHue](./d3-interpolate/color.md#interpolateHue) - interpolate a hue angle.

### [Transform interpolation](./d3-interpolate/transform.md)

* [d3.interpolateTransformCss](./d3-interpolate/transform.md#interpolateTransformCss) - interpolate 2D CSS transforms.
* [d3.interpolateTransformSvg](./d3-interpolate/transform.md#interpolateTransformSvg) - interpolate 2D SVG transforms.

### [Zoom interpolation](./d3-interpolate/zoom.md)

* [d3.interpolateZoom](./d3-interpolate/zoom.md#interpolateZoom) - zoom and pan between two views.
* [*interpolateZoom*.rho](./d3-interpolate/zoom.md#interpolateZoom_rho) - set the curvature *rho* of the zoom interpolator.

## [d3-path](./d3-path.md)

Serialize Canvas path commands to SVG.

* [d3.path](./d3-path.md#path) - create a new path serializer.
* [*path*.moveTo](./d3-path.md#path_moveTo) - move to the given point.
* [*path*.closePath](./d3-path.md#path_closePath) - close the current subpath.
* [*path*.lineTo](./d3-path.md#path_lineTo) - draw a straight line segment.
* [*path*.quadraticCurveTo](./d3-path.md#path_quadraticCurveTo) - draw a quadratic Bézier segment.
* [*path*.bezierCurveTo](./d3-path.md#path_bezierCurveTo) - draw a cubic Bézier segment.
* [*path*.arcTo](./d3-path.md#path_arcTo) - draw a circular arc segment.
* [*path*.arc](./d3-path.md#path_arc) - draw a circular arc segment.
* [*path*.rect](./d3-path.md#path_rect) - draw a rectangle.
* [*path*.toString](./d3-path.md#path_toString) - serialize to an SVG path data string.
* [d3.pathRound](./d3-path.md#pathRound) - create a new path serializer with fixed output precision.

## [d3-polygon](./d3-polygon.md)

Geometric operations for two-dimensional polygons.

* [d3.polygonArea](./d3-polygon.md#polygonArea) - compute the area of the given polygon.
* [d3.polygonCentroid](./d3-polygon.md#polygonCentroid) - compute the centroid of the given polygon.
* [d3.polygonHull](./d3-polygon.md#polygonHull) - compute the convex hull of the given points.
* [d3.polygonContains](./d3-polygon.md#polygonContains) - test whether a point is inside a polygon.
* [d3.polygonLength](./d3-polygon.md#polygonLength) - compute the length of the given polygon’s perimeter.

## [d3-quadtree](./d3-quadtree.md)

Two-dimensional recursive spatial subdivision.

* [d3.quadtree](./d3-quadtree.md#quadtree) - create a new, empty quadtree.
* [*quadtree*.x](./d3-quadtree.md#quadtree_x) - set the *x* accessor.
* [*quadtree*.y](./d3-quadtree.md#quadtree_y) - set the *y* accessor.
* [*quadtree*.extent](./d3-quadtree.md#quadtree_extent) - extend the quadtree to cover an extent.
* [*quadtree*.cover](./d3-quadtree.md#quadtree_cover) - extend the quadtree to cover a point.
* [*quadtree*.add](./d3-quadtree.md#quadtree_add) - add a datum to a quadtree.
* [*quadtree*.addAll](./d3-quadtree.md#quadtree_addAll) - add an array of data to a quadtree.
* [*quadtree*.remove](./d3-quadtree.md#quadtree_remove) - remove a datum from a quadtree.
* [*quadtree*.removeAll](./d3-quadtree.md#quadtree_removeAll) - remove an array of data from a quadtree.
* [*quadtree*.copy](./d3-quadtree.md#quadtree_copy) - create a copy of a quadtree.
* [*quadtree*.root](./d3-quadtree.md#quadtree_root) - get the quadtree’s root node.
* [*quadtree*.data](./d3-quadtree.md#quadtree_data) - retrieve all data from the quadtree.
* [*quadtree*.size](./d3-quadtree.md#quadtree_size) - count the number of data in the quadtree.
* [*quadtree*.find](./d3-quadtree.md#quadtree_find) - quickly find the closest datum in a quadtree.
* [*quadtree*.visit](./d3-quadtree.md#quadtree_visit) - selectively visit nodes in a quadtree.
* [*quadtree*.visitAfter](./d3-quadtree.md#quadtree_visitAfter) - visit all nodes in a quadtree.

## [d3-random](./d3-random.md)

Generate random numbers from various distributions.

* [d3.randomUniform](./d3-random.md#randomUniform) - from a uniform distribution.
* [d3.randomInt](./d3-random.md#randomInt) - from a uniform integer distribution.
* [d3.randomNormal](./d3-random.md#randomNormal) - from a normal distribution.
* [d3.randomLogNormal](./d3-random.md#randomLogNormal) - from a log-normal distribution.
* [d3.randomBates](./d3-random.md#randomBates) - from a Bates distribution.
* [d3.randomIrwinHall](./d3-random.md#randomIrwinHall) - from an Irwin–Hall distribution.
* [d3.randomExponential](./d3-random.md#randomExponential) - from an exponential distribution.
* [d3.randomPareto](./d3-random.md#randomPareto) - from a Pareto distribution.
* [d3.randomBernoulli](./d3-random.md#randomBernoulli) - from a Bernoulli distribution.
* [d3.randomGeometric](./d3-random.md#randomGeometric) - from a geometric distribution.
* [d3.randomBinomial](./d3-random.md#randomBinomial) - from a binomial distribution.
* [d3.randomGamma](./d3-random.md#randomGamma) - from a gamma distribution.
* [d3.randomBeta](./d3-random.md#randomBeta) - from a beta distribution.
* [d3.randomWeibull](./d3-random.md#randomWeibull) - from a Weibull, Gumbel or Fréchet distribution.
* [d3.randomCauchy](./d3-random.md#randomCauchy) - from a Cauchy distribution.
* [d3.randomLogistic](./d3-random.md#randomLogistic) - from a logistic distribution.
* [d3.randomPoisson](./d3-random.md#randomPoisson) - from a Poisson distribution.
* [*random*.source](./d3-random.md#random_source) - set the source of randomness.
* [d3.randomLcg](./d3-random.md#randomLcg) - a seeded pseudorandom number generator.

## [d3-scale](./d3-scale.md)

Encodings that map abstract data to visual representation.

### [Linear scales](./d3-scale/linear.md)

Map a continuous, quantitative domain to a continuous range.

* [d3.scaleLinear](./d3-scale/linear.md#scaleLinear) - create a quantitative linear scale.
* [*linear*](./d3-scale/linear.md#_linear) - compute the range value corresponding to a given domain value.
* [*linear*.invert](./d3-scale/linear.md#linear_invert) - compute the domain value corresponding to a given range value.
* [*linear*.domain](./d3-scale/linear.md#linear_domain) - set the input domain.
* [*linear*.range](./d3-scale/linear.md#linear_range) - set the output range.
* [*linear*.rangeRound](./d3-scale/linear.md#linear_rangeRound) - set the output range and enable rounding.
* [*linear*.clamp](./d3-scale/linear.md#linear_clamp) - enable clamping to the domain or range.
* [*linear*.unknown](./d3-scale/linear.md#linear_unknown) - set the output value for unknown inputs.
* [*linear*.interpolate](./d3-scale/linear.md#linear_interpolate) - set the output interpolator.
* [*linear*.ticks](./d3-scale/linear.md#linear_ticks) - compute representative values from the domain.
* [*linear*.tickFormat](./d3-scale/linear.md#linear_tickFormat) - format ticks for human consumption.
* [*linear*.nice](./d3-scale/linear.md#linear_nice) - extend the domain to nice round numbers.
* [*linear*.copy](./d3-scale/linear.md#linear_copy) - create a copy of this scale.
* [d3.tickFormat](./d3-scale/linear.md#tickFormat) - format ticks for human consumption.
* [d3.scaleIdentity](./d3-scale/linear.md#scaleIdentity) - creates an identity scale.
* [d3.scaleRadial](./d3-scale/linear.md#scaleRadial) - creates a radial scale.

### [Pow scales](./d3-scale/pow.md)

* [d3.scalePow](./d3-scale/pow.md#scalePow) - create a quantitative power scale.
* [d3.scaleSqrt](./d3-scale/pow.md#scaleSqrt) - create a quantitative power scale with exponent 0.5.
* [*pow*.exponent](./d3-scale/pow.md#pow_exponent) - set the power exponent.

### [Log scales](./d3-scale/log.md)

* [d3.scaleLog](./d3-scale/log.md#scaleLog) - create a quantitative logarithmic scale.
* [*log*.base](./d3-scale/log.md#log_base) - set the logarithm base.
* [*log*.ticks](./d3-scale/log.md#log_ticks) - compute representative values from the domain.
* [*log*.tickFormat](./d3-scale/log.md#log_tickFormat) - format ticks for human consumption.
* [*log*.nice](./d3-scale/log.md#log_nice) - extend the domain to nice round numbers.

### [Symlog scales](./d3-scale/symlog.md)

* [d3.scaleSymlog](./d3-scale/symlog.md#scaleSymlog) - create a symmetric logarithmic scale.
* [*symlog*.constant](./d3-scale/symlog.md#symlog_constant) - set the constant of a symlog scale.

### [Time scales](./d3-scale/time.md)

* [d3.scaleTime](./d3-scale/time.md#scaleTime) - create a linear scale for time.
* [*time*.ticks](./d3-scale/time.md#time_ticks) - compute representative values from the domain.
* [*time*.tickFormat](./d3-scale/time.md#time_tickFormat) - format ticks for human consumption.
* [*time*.nice](./d3-scale/time.md#time_nice) - extend the domain to nice round times.
* [d3.scaleUtc](./d3-scale/time.md#scaleUtc) - create a linear scale for UTC.

### [Sequential scales](./d3-scale/sequential.md)

Map a continuous, quantitative domain to a continuous, fixed interpolator.

* [d3.scaleSequential](./d3-scale/sequential.md#scaleSequential) - create a sequential scale.
* [*sequential*.interpolator](./d3-scale/sequential.md#sequential_interpolator) - set the scale’s output interpolator.
* [*sequential*.range](./d3-scale/sequential.md#sequential_range) - set the output range.
* [*sequential*.rangeRound](./d3-scale/sequential.md#sequential_rangeRound) - set the output range and enable rounding.
* [d3.scaleSequentialLog](./d3-scale/sequential.md#scaleSequentialLog) - create a logarithmic sequential scale.
* [d3.scaleSequentialPow](./d3-scale/sequential.md#scaleSequentialPow) - create a power sequential scale.
* [d3.scaleSequentialSqrt](./d3-scale/sequential.md#scaleSequentialSqrt) - create a power sequential scale with exponent 0.5.
* [d3.scaleSequentialSymlog](./d3-scale/sequential.md#scaleSequentialSymlog) - create a symmetric logarithmic sequential scale.
* [d3.scaleSequentialQuantile](./d3-scale/sequential.md#scaleSequentialQuantile) - create a sequential scale using a *p*-quantile transform.
* [*sequentialQuantile*.quantiles](./d3-scale/sequential.md#sequentialQuantile_quantiles) - return the scale’s quantiles.

### [Diverging scales](./d3-scale/diverging.md)

Map a continuous, quantitative domain to a continuous, fixed interpolator.

* [d3.scaleDiverging](./d3-scale/diverging.md#scaleDiverging) - create a diverging scale.
* [*diverging*.interpolator](./d3-scale/diverging.md#diverging_interpolator) - set the scale’s output interpolator.
* [*diverging*.range](./d3-scale/diverging.md#diverging_range) - set the output range.
* [*diverging*.rangeRound](./d3-scale/diverging.md#diverging_rangeRound) - set the output range and enable rounding.
* [d3.scaleDivergingLog](./d3-scale/diverging.md#scaleDivergingLog) - create a diverging logarithmic scale.
* [d3.scaleDivergingPow](./d3-scale/diverging.md#scaleDivergingPow) - create a diverging power scale.
* [d3.scaleDivergingSqrt](./d3-scale/diverging.md#scaleDivergingSqrt) - create a diverging power scale with exponent 0.5.
* [d3.scaleDivergingSymlog](./d3-scale/diverging.md#scaleDivergingSymlog) - create a diverging symmetric logarithmic scale.

### [Quantize scales](./d3-scale/quantize.md)

Map a continuous, quantitative domain to a discrete range.

* [d3.scaleQuantize](./d3-scale/quantize.md#scaleQuantize) - create a uniform quantizing linear scale.
* [*quantize*](./d3-scale/quantize.md#_quantize) - compute the range value corresponding to a given domain value.
* [*quantize*.invertExtent](./d3-scale/quantize.md#quantize_invertExtent) - compute the domain values corresponding to a given range value.
* [*quantize*.domain](./d3-scale/quantize.md#quantize_domain) - set the input domain.
* [*quantize*.range](./d3-scale/quantize.md#quantize_range) - set the output range.
* [*quantize*.thresholds](./d3-scale/quantize.md#quantize_thresholds) - return the array of computed thresholds within the domain.
* [*quantize*.copy](./d3-scale/quantize.md#quantize_copy) - create a copy of this scale.

### [Quantile scales](./d3-scale/quantile.md)

* [d3.scaleQuantile](./d3-scale/quantile.md#scaleQuantile) - create a quantile quantizing linear scale.
* [*quantile*](./d3-scale/quantile.md#_quantile) - compute the range value corresponding to a given domain value.
* [*quantile*.invertExtent](./d3-scale/quantile.md#quantile_invertExtent) - compute the domain values corresponding to a given range value.
* [*quantile*.domain](./d3-scale/quantile.md#quantile_domain) - set the input domain.
* [*quantile*.range](./d3-scale/quantile.md#quantile_range) - set the output range.
* [*quantile*.quantiles](./d3-scale/quantile.md#quantile_quantiles) - get the quantile thresholds.
* [*quantile*.copy](./d3-scale/quantile.md#quantile_copy) - create a copy of this scale.

### [Threshold scales](./d3-scale/threshold.md)

* [d3.scaleThreshold](./d3-scale/threshold.md#scaleThreshold) - create an arbitrary quantizing linear scale.
* [*threshold*](./d3-scale/threshold.md#_threshold) - compute the range value corresponding to a given domain value.
* [*threshold*.invertExtent](./d3-scale/threshold.md#threshold_invertExtent) - compute the domain values corresponding to a given range value.
* [*threshold*.domain](./d3-scale/threshold.md#threshold_domain) - set the input domain.
* [*threshold*.range](./d3-scale/threshold.md#threshold_range) - set the output range.
* [*threshold*.copy](./d3-scale/threshold.md#threshold_copy) - create a copy of this scale.

### [Ordinal scales](./d3-scale/ordinal.md)

Map a discrete domain to a discrete range.

* [d3.scaleOrdinal](./d3-scale/ordinal.md#scaleOrdinal) - create an ordinal scale.
* [*ordinal*](./d3-scale/ordinal.md#_ordinal) - compute the range value corresponding to a given domain value.
* [*ordinal*.domain](./d3-scale/ordinal.md#ordinal_domain) - set the input domain.
* [*ordinal*.range](./d3-scale/ordinal.md#ordinal_range) - set the output range.
* [*ordinal*.unknown](./d3-scale/ordinal.md#ordinal_unknown) - set the output value for unknown inputs.
* [*ordinal*.copy](./d3-scale/ordinal.md#ordinal_copy) - create a copy of this scale.
* [d3.scaleImplicit](./d3-scale/ordinal.md#scaleImplicit) - a special unknown value for implicit domains.

### [Band scales](./d3-scale/band.md)

* [d3.scaleBand](./d3-scale/band.md#scaleBand) - create an ordinal band scale.
* [*band*](./d3-scale/band.md#_band) - compute the band start corresponding to a given domain value.
* [*band*.domain](./d3-scale/band.md#band_domain) - set the input domain.
* [*band*.range](./d3-scale/band.md#band_range) - set the output range.
* [*band*.rangeRound](./d3-scale/band.md#band_rangeRound) - set the output range and enable rounding.
* [*band*.round](./d3-scale/band.md#band_round) - enable rounding.
* [*band*.paddingInner](./d3-scale/band.md#band_paddingInner) - set padding between bands.
* [*band*.paddingOuter](./d3-scale/band.md#band_paddingOuter) - set padding outside the first and last bands.
* [*band*.padding](./d3-scale/band.md#band_padding) - set padding outside and between bands.
* [*band*.align](./d3-scale/band.md#band_align) - set band alignment, if there is extra space.
* [*band*.bandwidth](./d3-scale/band.md#band_bandwidth) - get the width of each band.
* [*band*.step](./d3-scale/band.md#band_step) - get the distance between the starts of adjacent bands.
* [*band*.copy](./d3-scale/band.md#band_copy) - create a copy of this scale.

### [Point scales](./d3-scale/point.md)

* [d3.scalePoint](./d3-scale/point.md#scalePoint) - create an ordinal point scale.
* [*point*](./d3-scale/point.md#_point) - compute the point corresponding to a given domain value.
* [*point*.domain](./d3-scale/point.md#point_domain) - set the input domain.
* [*point*.range](./d3-scale/point.md#point_range) - set the output range.
* [*point*.rangeRound](./d3-scale/point.md#point_rangeRound) - set the output range and enable rounding.
* [*point*.round](./d3-scale/point.md#point_round) - enable rounding.
* [*point*.padding](./d3-scale/point.md#point_padding) - set padding outside the first and last point.
* [*point*.align](./d3-scale/point.md#point_align) - set point alignment, if there is extra space.
* [*point*.bandwidth](./d3-scale/point.md#point_bandwidth) - returns zero.
* [*point*.step](./d3-scale/point.md#point_step) - get the distance between the starts of adjacent points.
* [*point*.copy](./d3-scale/point.md#point_copy) - create a copy of this scale.

## [d3-scale-chromatic](./d3-scale-chromatic.md)

Color ramps and palettes for quantitative, ordinal and categorical scales.

### [Categorical](./d3-scale-chromatic/categorical.md)

* [d3.schemeCategory10](./d3-scale-chromatic/categorical.md#schemeCategory10) - an array of ten categorical colors.
* [d3.schemeAccent](./d3-scale-chromatic/categorical.md#schemeAccent) - an array of eight categorical colors.
* [d3.schemeDark2](./d3-scale-chromatic/categorical.md#schemeDark2) - an array of eight categorical colors.
* [d3.schemePaired](./d3-scale-chromatic/categorical.md#schemePaired) - an array of twelve categorical colors.
* [d3.schemePastel1](./d3-scale-chromatic/categorical.md#schemePastel1) - an array of nine categorical colors.
* [d3.schemePastel2](./d3-scale-chromatic/categorical.md#schemePastel2) - an array of eight categorical colors.
* [d3.schemeSet1](./d3-scale-chromatic/categorical.md#schemeSet1) - an array of nine categorical colors.
* [d3.schemeSet2](./d3-scale-chromatic/categorical.md#schemeSet2) - an array of eight categorical colors.
* [d3.schemeSet3](./d3-scale-chromatic/categorical.md#schemeSet3) - an array of twelve categorical colors.
* [d3.schemeTableau10](./d3-scale-chromatic/categorical.md#schemeTableau10) - an array of ten categorical colors.

### [Cyclical](./d3-scale-chromatic/cyclical.md)

* [d3.interpolateRainbow](./d3-scale-chromatic/cyclical.md#interpolateRainbow) - the “less-angry” rainbow
* [d3.interpolateSinebow](./d3-scale-chromatic/cyclical.md#interpolateSinebow) - the “sinebow” smooth rainbow

### [Diverging](./d3-scale-chromatic/diverging.md)

* [d3.interpolateBrBG](./d3-scale-chromatic/diverging.md#interpolateBrBG) - ColorBrewer BrBG interpolator.
* [d3.interpolatePiYG](./d3-scale-chromatic/diverging.md#interpolatePiYG) - ColorBrewer PiYG interpolator.
* [d3.interpolatePRGn](./d3-scale-chromatic/diverging.md#interpolatePRGn) - ColorBrewer PRGn interpolator.
* [d3.interpolatePuOr](./d3-scale-chromatic/diverging.md#interpolatePuOr) - ColorBrewer PuOr interpolator.
* [d3.interpolateRdBu](./d3-scale-chromatic/diverging.md#interpolateRdBu) - ColorBrewer RdBu interpolator.
* [d3.interpolateRdGy](./d3-scale-chromatic/diverging.md#interpolateRdGy) - ColorBrewer RdGy interpolator.
* [d3.interpolateRdYlBu](./d3-scale-chromatic/diverging.md#interpolateRdYlBu) - ColorBrewer RdYlBu interpolator.
* [d3.interpolateRdYlGn](./d3-scale-chromatic/diverging.md#interpolateRdYlGn) - ColorBrewer RdYlGn interpolator.
* [d3.interpolateSpectral](./d3-scale-chromatic/diverging.md#interpolateSpectral) - ColorBrewer spectral interpolator.
* [d3.schemeBrBG](./d3-scale-chromatic/diverging.md#schemeBrBG) - ColorBrewer BrBG scheme.
* [d3.schemePiYG](./d3-scale-chromatic/diverging.md#schemePiYG) - ColorBrewer PiYG scheme.
* [d3.schemePRGn](./d3-scale-chromatic/diverging.md#schemePRGn) - ColorBrewer PRGn scheme.
* [d3.schemePuOr](./d3-scale-chromatic/diverging.md#schemePuOr) - ColorBrewer PuOr scheme.
* [d3.schemeRdBu](./d3-scale-chromatic/diverging.md#schemeRdBu) - ColorBrewer RdBu scheme.
* [d3.schemeRdGy](./d3-scale-chromatic/diverging.md#schemeRdGy) - ColorBrewer RdGy scheme.
* [d3.schemeRdYlBu](./d3-scale-chromatic/diverging.md#schemeRdYlBu) - ColorBrewer RdYlBu scheme.
* [d3.schemeRdYlGn](./d3-scale-chromatic/diverging.md#schemeRdYlGn) - ColorBrewer RdYlGn scheme.
* [d3.schemeSpectral](./d3-scale-chromatic/diverging.md#schemeSpectral) - ColorBrewer spectral scheme.

### [Sequential](./d3-scale-chromatic/sequential.md)

* [d3.interpolateBlues](./d3-scale-chromatic/sequential.md#interpolateBlues) -
* [d3.interpolateGreens](./d3-scale-chromatic/sequential.md#interpolateGreens) -
* [d3.interpolateGreys](./d3-scale-chromatic/sequential.md#interpolateGreys) -
* [d3.interpolateOranges](./d3-scale-chromatic/sequential.md#interpolateOranges) -
* [d3.interpolatePurples](./d3-scale-chromatic/sequential.md#interpolatePurples) -
* [d3.interpolateReds](./d3-scale-chromatic/sequential.md#interpolateReds) -
* [d3.schemeBlues](./d3-scale-chromatic/sequential.md#schemeBlues) -
* [d3.schemeGreens](./d3-scale-chromatic/sequential.md#schemeGreens) -
* [d3.schemeGreys](./d3-scale-chromatic/sequential.md#schemeGreys) -
* [d3.schemeOranges](./d3-scale-chromatic/sequential.md#schemeOranges) -
* [d3.schemePurples](./d3-scale-chromatic/sequential.md#schemePurples) -
* [d3.schemeReds](./d3-scale-chromatic/sequential.md#schemeReds) -
* [d3.interpolateBuGn](./d3-scale-chromatic/sequential.md#interpolateBuGn) - ColorBrewer BuGn interpolator.
* [d3.interpolateBuPu](./d3-scale-chromatic/sequential.md#interpolateBuPu) - ColorBrewer BuPu interpolator.
* [d3.interpolateCividis](./d3-scale-chromatic/sequential.md#interpolateCividis) - cividis interpolator.
* [d3.interpolateCool](./d3-scale-chromatic/sequential.md#interpolateCool) - cool interpolator.
* [d3.interpolateCubehelixDefault](./d3-scale-chromatic/sequential.md#interpolateCubehelixDefault) - cubehelix interpolator.
* [d3.interpolateGnBu](./d3-scale-chromatic/sequential.md#interpolateGnBu) - ColorBrewer GnBu interpolator.
* [d3.interpolateInferno](./d3-scale-chromatic/sequential.md#interpolateInferno) - inferno interpolator.
* [d3.interpolateMagma](./d3-scale-chromatic/sequential.md#interpolateMagma) - magma interpolator.
* [d3.interpolateOrRd](./d3-scale-chromatic/sequential.md#interpolateOrRd) - ColorBrewer OrRd interpolator.
* [d3.interpolatePlasma](./d3-scale-chromatic/sequential.md#interpolatePlasma) - plasma interpolator.
* [d3.interpolatePuBu](./d3-scale-chromatic/sequential.md#interpolatePuBu) - ColorBrewer PuBu interpolator.
* [d3.interpolatePuBuGn](./d3-scale-chromatic/sequential.md#interpolatePuBuGn) - ColorBrewer PuBuGn interpolator.
* [d3.interpolatePuRd](./d3-scale-chromatic/sequential.md#interpolatePuRd) - ColorBrewer PuRd interpolator.
* [d3.interpolateRdPu](./d3-scale-chromatic/sequential.md#interpolateRdPu) - ColorBrewer RdPu interpolator.
* [d3.interpolateTurbo](./d3-scale-chromatic/sequential.md#interpolateTurbo) - turbo interpolator.
* [d3.interpolateViridis](./d3-scale-chromatic/sequential.md#interpolateViridis) - viridis interpolator.
* [d3.interpolateWarm](./d3-scale-chromatic/sequential.md#interpolateWarm) - warm interpolator.
* [d3.interpolateYlGn](./d3-scale-chromatic/sequential.md#interpolateYlGn) - ColorBrewer YlGn interpolator.
* [d3.interpolateYlGnBu](./d3-scale-chromatic/sequential.md#interpolateYlGnBu) - ColorBrewer YlGnBu interpolator.
* [d3.interpolateYlOrBr](./d3-scale-chromatic/sequential.md#interpolateYlOrBr) - ColorBrewer YlOrBr interpolator.
* [d3.interpolateYlOrRd](./d3-scale-chromatic/sequential.md#interpolateYlOrRd) - ColorBrewer YlOrRd interpolator.
* [d3.schemeBuGn](./d3-scale-chromatic/sequential.md#schemeBuGn) - ColorBrewer BuGn scheme.
* [d3.schemeBuPu](./d3-scale-chromatic/sequential.md#schemeBuPu) - ColorBrewer BuPu scheme.
* [d3.schemeGnBu](./d3-scale-chromatic/sequential.md#schemeGnBu) - ColorBrewer GnBu scheme.
* [d3.schemeOrRd](./d3-scale-chromatic/sequential.md#schemeOrRd) - ColorBrewer OrRd scheme.
* [d3.schemePuBu](./d3-scale-chromatic/sequential.md#schemePuBu) - ColorBrewer PuBu scheme.
* [d3.schemePuBuGn](./d3-scale-chromatic/sequential.md#schemePuBuGn) - ColorBrewer PuBuGn scheme.
* [d3.schemePuRd](./d3-scale-chromatic/sequential.md#schemePuRd) - ColorBrewer PuRd scheme.
* [d3.schemeRdPu](./d3-scale-chromatic/sequential.md#schemeRdPu) - ColorBrewer RdPu scheme.
* [d3.schemeYlGn](./d3-scale-chromatic/sequential.md#schemeYlGn) - ColorBrewer YlGn scheme.
* [d3.schemeYlGnBu](./d3-scale-chromatic/sequential.md#schemeYlGnBu) - ColorBrewer YlGnBu scheme.
* [d3.schemeYlOrBr](./d3-scale-chromatic/sequential.md#schemeYlOrBr) - ColorBrewer YlOrBr scheme.
* [d3.schemeYlOrRd](./d3-scale-chromatic/sequential.md#schemeYlOrRd) - ColorBrewer YlOrRd scheme.

## [d3-selection](./d3-selection.md)

Transform the DOM by selecting elements and joining to data.

### [Selecting elements](./d3-selection/selecting.md)

* [d3.selection](./d3-selection/selecting.md#selection) - select the root document element.
* [d3.select](./d3-selection/selecting.md#select) - select an element from the document.
* [d3.selectAll](./d3-selection/selecting.md#selectAll) - select multiple elements from the document.
* [*selection*.select](./d3-selection/selecting.md#selection_select) - select a descendant element for each selected element.
* [*selection*.selectAll](./d3-selection/selecting.md#selection_selectAll) - select multiple descendants for each selected element.
* [*selection*.filter](./d3-selection/selecting.md#selection_filter) - filter elements based on data.
* [*selection*.merge](./d3-selection/joining.md#selection_merge) - merge this selection with another.
* [*selection*.selectChild](./d3-selection/selecting.md#selection_selectChild) - select a child element for each selected element.
* [*selection*.selectChildren](./d3-selection/selecting.md#selection_selectChildren) - select the children elements for each selected element.
* [*selection*.selection](./d3-selection/selecting.md#selection_selection) - return the selection.
* [d3.matcher](./d3-selection/selecting.md#matcher) - test whether an element matches a selector.
* [d3.selector](./d3-selection/selecting.md#selector) - select an element.
* [d3.selectorAll](./d3-selection/selecting.md#selectorAll) - select elements.
* [d3.window](./d3-selection/selecting.md#window) - get a node’s owner window.
* [d3.style](./d3-selection/selecting.md#style) - get a node’s current style value.

### [Modifying elements](./d3-selection/modifying.md)

* [*selection*.attr](./d3-selection/modifying.md#selection_attr) - get or set an attribute.
* [*selection*.classed](./d3-selection/modifying.md#selection_classed) - get, add or remove CSS classes.
* [*selection*.style](./d3-selection/modifying.md#selection_style) - get or set a style property.
* [*selection*.property](./d3-selection/modifying.md#selection_property) - get or set a (raw) property.
* [*selection*.text](./d3-selection/modifying.md#selection_text) - get or set the text content.
* [*selection*.html](./d3-selection/modifying.md#selection_html) - get or set the inner HTML.
* [*selection*.append](./d3-selection/modifying.md#selection_append) - create, append and select new elements.
* [*selection*.insert](./d3-selection/modifying.md#selection_insert) - create, insert and select new elements.
* [*selection*.remove](./d3-selection/modifying.md#selection_remove) - remove elements from the document.
* [*selection*.clone](./d3-selection/modifying.md#selection_clone) - insert clones of selected elements.
* [*selection*.sort](./d3-selection/modifying.md#selection_sort) - sort elements in the document based on data.
* [*selection*.order](./d3-selection/modifying.md#selection_order) - reorders elements in the document to match the selection.
* [*selection*.raise](./d3-selection/modifying.md#selection_raise) - reorders each element as the last child of its parent.
* [*selection*.lower](./d3-selection/modifying.md#selection_lower) - reorders each element as the first child of its parent.
* [d3.create](./d3-selection/modifying.md#create) - create and select a detached element.
* [d3.creator](./d3-selection/modifying.md#creator) - create an element by name.

### [Joining data](./d3-selection/joining.md)

* [*selection*.data](./d3-selection/joining.md#selection_data) - bind elements to data.
* [*selection*.join](./d3-selection/joining.md#selection_join) - enter, update or exit elements based on data.
* [*selection*.enter](./d3-selection/joining.md#selection_enter) - get the enter selection (data missing elements).
* [*selection*.exit](./d3-selection/joining.md#selection_exit) - get the exit selection (elements missing data).
* [*selection*.datum](./d3-selection/joining.md#selection_datum) - get or set element data (without joining).

### [Handling events](./d3-selection/events.md)

* [*selection*.on](./d3-selection/events.md#selection_on) - add or remove event listeners.
* [*selection*.dispatch](./d3-selection/events.md#selection_dispatch) - dispatch a custom event.
* [d3.pointer](./d3-selection/events.md#pointer) - get the pointer’s position of an event.
* [d3.pointers](./d3-selection/events.md#pointers) - get the pointers’ positions of an event.

### [Control flow](./d3-selection/control-flow.md)

* [*selection*.each](./d3-selection/control-flow.md#selection_each) - call a function for each element.
* [*selection*.call](./d3-selection/control-flow.md#selection_call) - call a function with this selection.
* [*selection*.empty](./d3-selection/control-flow.md#selection_empty) - returns true if this selection is empty.
* [*selection*.nodes](./d3-selection/control-flow.md#selection_nodes) - returns an array of all selected elements.
* [*selection*.node](./d3-selection/control-flow.md#selection_node) - returns the first (non-null) element.
* [*selection*.size](./d3-selection/control-flow.md#selection_size) - returns the count of elements.
* [*selection*[Symbol.iterator]](./d3-selection/control-flow.md#selection_iterator) - iterate over the selection’s nodes.

### [Local variables](./d3-selection/locals.md)

* [d3.local](./d3-selection/locals.md#local) - declares a new local variable.
* [*local*.set](./d3-selection/locals.md#local_set) - set a local variable’s value.
* [*local*.get](./d3-selection/locals.md#local_get) - get a local variable’s value.
* [*local*.remove](./d3-selection/locals.md#local_remove) - delete a local variable.
* [*local*.toString](./d3-selection/locals.md#local_toString) - get the property identifier of a local variable.

### [Namespaces](./d3-selection/namespaces.md)

* [d3.namespace](./d3-selection/namespaces.md#namespace) - qualify a prefixed XML name, such as “xlink:href”.
* [d3.namespaces](./d3-selection/namespaces.md#namespaces) - the built-in XML namespaces.

## [d3-shape](./d3-shape.md)

Graphical primitives for visualization.

### [Arcs](./d3-shape/arc.md)

Circular or annular sectors, as in a pie or donut chart.

* [d3.arc](./d3-shape/arc.md#arc) - create a new arc generator.
* [*arc*](./d3-shape/arc.md#_arc) - generate an arc for the given datum.
* [*arc*.centroid](./d3-shape/arc.md#arc_centroid) - compute an arc’s midpoint.
* [*arc*.innerRadius](./d3-shape/arc.md#arc_innerRadius) - set the inner radius.
* [*arc*.outerRadius](./d3-shape/arc.md#arc_outerRadius) - set the outer radius.
* [*arc*.cornerRadius](./d3-shape/arc.md#arc_cornerRadius) - set the corner radius, for rounded corners.
* [*arc*.startAngle](./d3-shape/arc.md#arc_startAngle) - set the start angle.
* [*arc*.endAngle](./d3-shape/arc.md#arc_endAngle) - set the end angle.
* [*arc*.padAngle](./d3-shape/arc.md#arc_padAngle) - set the angle between adjacent arcs, for padded arcs.
* [*arc*.padRadius](./d3-shape/arc.md#arc_padRadius) - set the radius at which to linearize padding.
* [*arc*.context](./d3-shape/arc.md#arc_context) - set the rendering context.
* [*arc*.digits](./d3-shape/arc.md#arc_digits) - set the output precision.

### [Pies](./d3-shape/pie.md)

Compute the necessary angles to represent a tabular dataset as a pie or donut chart.

* [d3.pie](./d3-shape/pie.md#pie) - create a new pie generator.
* [*pie*](./d3-shape/pie.md#_pie) - compute the arc angles for the given dataset.
* [*pie*.value](./d3-shape/pie.md#pie_value) - set the value accessor.
* [*pie*.sort](./d3-shape/pie.md#pie_sort) - set the sort order comparator.
* [*pie*.sortValues](./d3-shape/pie.md#pie_sortValues) - set the sort order comparator.
* [*pie*.startAngle](./d3-shape/pie.md#pie_startAngle) - set the overall start angle.
* [*pie*.endAngle](./d3-shape/pie.md#pie_endAngle) - set the overall end angle.
* [*pie*.padAngle](./d3-shape/pie.md#pie_padAngle) - set the pad angle between adjacent arcs.

### [Lines](./d3-shape/line.md)

A spline or polyline, as in a line chart.

* [d3.line](./d3-shape/line.md#line) - create a new line generator.
* [*line*](./d3-shape/line.md#_line) - generate a line for the given dataset.
* [*line*.x](./d3-shape/line.md#line_x) - set the *x* accessor.
* [*line*.y](./d3-shape/line.md#line_y) - set the *y* accessor.
* [*line*.defined](./d3-shape/line.md#line_defined) - set the defined accessor.
* [*line*.curve](./d3-shape/line.md#line_curve) - set the curve interpolator.
* [*line*.context](./d3-shape/line.md#line_context) - set the rendering context.
* [*line*.digits](./d3-shape/line.md#line_digits) - set the output precision.
* [d3.lineRadial](./d3-shape/radial-line.md#lineRadial) - create a new radial line generator.
* [*lineRadial*](./d3-shape/radial-line.md#_lineRadial) - generate a line for the given dataset.
* [*lineRadial*.angle](./d3-shape/radial-line.md#lineRadial_angle) - set the angle accessor.
* [*lineRadial*.radius](./d3-shape/radial-line.md#lineRadial_radius) - set the radius accessor.
* [*lineRadial*.defined](./d3-shape/radial-line.md#lineRadial_defined) - set the defined accessor.
* [*lineRadial*.curve](./d3-shape/radial-line.md#lineRadial_curve) - set the curve interpolator.
* [*lineRadial*.context](./d3-shape/radial-line.md#lineRadial_context) - set the rendering context.

### [Areas](./d3-shape/area.md)

An area, defined by a bounding topline and baseline, as in an area chart.

* [d3.area](./d3-shape/area.md#area) - create a new area generator.
* [*area*](./d3-shape/area.md#_area) - generate an area for the given dataset.
* [*area*.x](./d3-shape/area.md#area_x) - set the *x0* and *x1* accessors.
* [*area*.x0](./d3-shape/area.md#area_x0) - set the baseline *x* accessor.
* [*area*.x1](./d3-shape/area.md#area_x1) - set the topline *x* accessor.
* [*area*.y](./d3-shape/area.md#area_y) - set the *y0* and *y1* accessors.
* [*area*.y0](./d3-shape/area.md#area_y0) - set the baseline *y* accessor.
* [*area*.y1](./d3-shape/area.md#area_y1) - set the topline *y* accessor.
* [*area*.defined](./d3-shape/area.md#area_defined) - set the defined accessor.
* [*area*.curve](./d3-shape/area.md#area_curve) - set the curve interpolator.
* [*area*.context](./d3-shape/area.md#area_context) - set the rendering context.
* [*area*.digits](./d3-shape/area.md#area_digits) - set the output precision.
* [*area*.lineX0](./d3-shape/area.md#area_lineX0) - derive a line for the left edge of an area.
* [*area*.lineY0](./d3-shape/area.md#area_lineY0) - derive a line for the top edge of an area.
* [*area*.lineX1](./d3-shape/area.md#area_lineX1) - derive a line for the right edge of an area.
* [*area*.lineY1](./d3-shape/area.md#area_lineY1) - derive a line for the bottom edge of an area.
* [d3.areaRadial](./d3-shape/radial-area.md#areaRadial) - create a new radial area generator.
* [*areaRadial*](./d3-shape/radial-area.md#_areaRadial) - generate an area for the given dataset.
* [*areaRadial*.angle](./d3-shape/radial-area.md#areaRadial_angle) - set the start and end angle accessors.
* [*areaRadial*.startAngle](./d3-shape/radial-area.md#areaRadial_startAngle) - set the start angle accessor.
* [*areaRadial*.endAngle](./d3-shape/radial-area.md#areaRadial_endAngle) - set the end angle accessor.
* [*areaRadial*.radius](./d3-shape/radial-area.md#areaRadial_radius) - set the inner and outer radius accessors.
* [*areaRadial*.innerRadius](./d3-shape/radial-area.md#areaRadial_innerRadius) - set the inner radius accessor.
* [*areaRadial*.outerRadius](./d3-shape/radial-area.md#areaRadial_outerRadius) - set the outer radius accessor.
* [*areaRadial*.defined](./d3-shape/radial-area.md#areaRadial_defined) - set the defined accessor.
* [*areaRadial*.curve](./d3-shape/radial-area.md#areaRadial_curve) - set the curve interpolator.
* [*areaRadial*.context](./d3-shape/radial-area.md#areaRadial_context) - set the rendering context.
* [*areaRadial*.lineStartAngle](./d3-shape/radial-area.md#areaRadial_lineStartAngle) - derive a line for the start edge of an area.
* [*areaRadial*.lineInnerRadius](./d3-shape/radial-area.md#areaRadial_lineInnerRadius) - derive a line for the inner edge of an area.
* [*areaRadial*.lineEndAngle](./d3-shape/radial-area.md#areaRadial_lineEndAngle) - derive a line for the end edge of an area.
* [*areaRadial*.lineOuterRadius](./d3-shape/radial-area.md#areaRadial_lineOuterRadius) - derive a line for the outer edge of an area.

### [Curves](./d3-shape/curve.md)

Interpolate between points to produce a continuous shape.

* [d3.curveBasis](./d3-shape/curve.md#curveBasis) - a cubic basis spline, repeating the end points.
* [d3.curveBasisClosed](./d3-shape/curve.md#curveBasisClosed) - a closed cubic basis spline.
* [d3.curveBasisOpen](./d3-shape/curve.md#curveBasisOpen) - a cubic basis spline.
* [d3.curveBundle](./d3-shape/curve.md#curveBundle) - a straightened cubic basis spline.
* [*bundle*.beta](./d3-shape/curve.md#curveBundle_beta) - set the bundle tension *beta*.
* [d3.curveBumpX](./d3-shape/curve.md#curveBumpX) - a cubic Bézier spline with horizontal tangents.
* [d3.curveBumpY](./d3-shape/curve.md#curveBumpY) - a cubic Bézier spline with vertical tangents.
* [d3.curveCardinal](./d3-shape/curve.md#curveCardinal) - a cubic cardinal spline, with one-sided difference at each end.
* [d3.curveCardinalClosed](./d3-shape/curve.md#curveCardinalClosed) - a closed cubic cardinal spline.
* [d3.curveCardinalOpen](./d3-shape/curve.md#curveCardinalOpen) - a cubic cardinal spline.
* [*cardinal*.tension](./d3-shape/curve.md#curveCardinal_tension) - set the cardinal spline tension.
* [d3.curveCatmullRom](./d3-shape/curve.md#curveCatmullRom) - a cubic Catmull–Rom spline, with one-sided difference at each end.
* [d3.curveCatmullRomClosed](./d3-shape/curve.md#curveCatmullRomClosed) - a closed cubic Catmull–Rom spline.
* [d3.curveCatmullRomOpen](./d3-shape/curve.md#curveCatmullRomOpen) - a cubic Catmull–Rom spline.
* [*catmullRom*.alpha](./d3-shape/curve.md#curveCatmullRom_alpha) - set the Catmull–Rom parameter *alpha*.
* [d3.curveLinear](./d3-shape/curve.md#curveLinear) - a polyline.
* [d3.curveLinearClosed](./d3-shape/curve.md#curveLinearClosed) - a closed polyline.
* [d3.curveMonotoneX](./d3-shape/curve.md#curveMonotoneX) - a cubic spline that, given monotonicity in *x*, preserves it in *y*.
* [d3.curveMonotoneY](./d3-shape/curve.md#curveMonotoneY) - a cubic spline that, given monotonicity in *y*, preserves it in *x*.
* [d3.curveNatural](./d3-shape/curve.md#curveNatural) - a natural cubic spline.
* [d3.curveStep](./d3-shape/curve.md#curveStep) - a piecewise constant function.
* [d3.curveStepAfter](./d3-shape/curve.md#curveStepAfter) - a piecewise constant function.
* [d3.curveStepBefore](./d3-shape/curve.md#curveStepBefore) - a piecewise constant function.
* [*curve*.areaStart](./d3-shape/curve.md#curve_areaStart) - start a new area segment.
* [*curve*.areaEnd](./d3-shape/curve.md#curve_areaEnd) - end the current area segment.
* [*curve*.lineStart](./d3-shape/curve.md#curve_lineStart) - start a new line segment.
* [*curve*.lineEnd](./d3-shape/curve.md#curve_lineEnd) - end the current line segment.
* [*curve*.point](./d3-shape/curve.md#curve_point) - add a point to the current line segment.

### [Links](./d3-shape/link.md)

A smooth cubic Bézier curve from a source to a target.

* [d3.link](./d3-shape/link.md#link) - create a new link generator.
* [d3.linkVertical](./d3-shape/link.md#linkVertical) - create a new vertical link generator.
* [d3.linkHorizontal](./d3-shape/link.md#linkHorizontal) - create a new horizontal link generator.
* [*link*](./d3-shape/link.md#_link) - generate a link.
* [*link*.source](./d3-shape/link.md#link_source) - set the source accessor.
* [*link*.target](./d3-shape/link.md#link_target) - set the target accessor.
* [*link*.x](./d3-shape/link.md#link_x) - set the point *x*-accessor.
* [*link*.y](./d3-shape/link.md#link_y) - set the point *y*-accessor.
* [*link*.context](./d3-shape/link.md#link_context) - set the rendering context.
* [*link*.digits](./d3-shape/link.md#link_digits) - set the output precision.
* [d3.linkRadial](./d3-shape/radial-link.md#linkRadial) - create a new radial link generator.
* [*linkRadial*.angle](./d3-shape/radial-link.md#linkRadial_angle) - set the point *angle* accessor.
* [*linkRadial*.radius](./d3-shape/radial-link.md#linkRadial_radius) - set the point *radius* accessor.

### [Symbols](./d3-shape/symbol.md)

A categorical shape encoding, as in a scatterplot.

* [d3.symbol](./d3-shape/symbol.md#symbol) - create a new symbol generator.
* [*symbol*](./d3-shape/symbol.md#_symbol) - generate a symbol for the given datum.
* [*symbol*.type](./d3-shape/symbol.md#symbol_type) - set the symbol type.
* [*symbol*.size](./d3-shape/symbol.md#symbol_size) - set the size of the symbol in square pixels.
* [*symbol*.context](./d3-shape/symbol.md#symbol_context) - set the rendering context.
* [*symbol*.digits](./d3-shape/symbol.md#symbol_digits) - set the output precision.
* [d3.symbolsFill](./d3-shape/symbol.md#symbolsFill) - an array of built-in symbol types for filling.
* [d3.symbolsStroke](./d3-shape/symbol.md#symbolsStroke) - an array of built-in symbol types for stroking.
* [d3.symbolAsterisk](./d3-shape/symbol.md#symbolAsterisk) - an asterisk; for stroke.
* [d3.symbolCircle](./d3-shape/symbol.md#symbolCircle) - a circle; for fill or stroke.
* [d3.symbolCross](./d3-shape/symbol.md#symbolCross) - a Greek cross with arms of equal length; for fill.
* [d3.symbolDiamond](./d3-shape/symbol.md#symbolDiamond) - a rhombus; for fill.
* [d3.symbolDiamond2](./d3-shape/symbol.md#symbolDiamond2) - a rotated square; for stroke.
* [d3.symbolPlus](./d3-shape/symbol.md#symbolPlus) - a plus sign; for stroke.
* [d3.symbolSquare](./d3-shape/symbol.md#symbolSquare) - a square; for fill.
* [d3.symbolSquare2](./d3-shape/symbol.md#symbolSquare2) - a square; for stroke.
* [d3.symbolStar](./d3-shape/symbol.md#symbolStar) - a pentagonal star (pentagram); for fill.
* [d3.symbolTriangle](./d3-shape/symbol.md#symbolTriangle) - an up-pointing triangle; for fill.
* [d3.symbolTriangle2](./d3-shape/symbol.md#symbolTriangle2) - an up-pointing triangle; for stroke.
* [d3.symbolWye](./d3-shape/symbol.md#symbolWye) - a Y shape; for fill.
* [d3.pointRadial](./d3-shape/symbol.md#pointRadial) - relative coordinates of a point given an angle and radius.
* [*symbolType*.draw](./d3-shape/symbol.md#symbolType_draw) - draw this symbol to the given context.

### [Stacks](./d3-shape/stack.md)

Stack shapes, placing one adjacent to another, as in a stacked bar chart.

* [d3.stack](./d3-shape/stack.md#stack) - create a new stack generator.
* [*stack*](./d3-shape/stack.md#_stack) - generate a stack for the given dataset.
* [*stack*.keys](./d3-shape/stack.md#stack_keys) - set the keys accessor.
* [*stack*.value](./d3-shape/stack.md#stack_value) - set the value accessor.
* [*stack*.order](./d3-shape/stack.md#stack_order) - set the order accessor.
* [*stack*.offset](./d3-shape/stack.md#stack_offset) - set the offset accessor.
* [d3.stackOrderAppearance](./d3-shape/stack.md#stackOrderAppearance) - put the earliest series on bottom.
* [d3.stackOrderAscending](./d3-shape/stack.md#stackOrderAscending) - put the smallest series on bottom.
* [d3.stackOrderDescending](./d3-shape/stack.md#stackOrderDescending) - put the largest series on bottom.
* [d3.stackOrderInsideOut](./d3-shape/stack.md#stackOrderInsideOut) - put earlier series in the middle.
* [d3.stackOrderNone](./d3-shape/stack.md#stackOrderNone) - use the given series order.
* [d3.stackOrderReverse](./d3-shape/stack.md#stackOrderReverse) - use the reverse of the given series order.
* [d3.stackOffsetExpand](./d3-shape/stack.md#stackOffsetExpand) - normalize the baseline to zero and topline to one.
* [d3.stackOffsetDiverging](./d3-shape/stack.md#stackOffsetDiverging) - positive above zero; negative below zero.
* [d3.stackOffsetNone](./d3-shape/stack.md#stackOffsetNone) - apply a zero baseline.
* [d3.stackOffsetSilhouette](./d3-shape/stack.md#stackOffsetSilhouette) - center the streamgraph around zero.
* [d3.stackOffsetWiggle](./d3-shape/stack.md#stackOffsetWiggle) - minimize streamgraph wiggling.

## [d3-time](./d3-time.md)

A calculator for humanity’s peculiar conventions of time.

* [d3.timeInterval](./d3-time.md#timeInterval) - implement a new custom time interval.
* [*interval*](./d3-time.md#_interval) - alias for *interval*.floor.
* [*interval*.floor](./d3-time.md#interval_floor) - round down to the nearest boundary.
* [*interval*.round](./d3-time.md#interval_round) - round to the nearest boundary.
* [*interval*.ceil](./d3-time.md#interval_ceil) - round up to the nearest boundary.
* [*interval*.offset](./d3-time.md#interval_offset) - offset a date by some number of intervals.
* [*interval*.range](./d3-time.md#interval_range) - generate a range of dates at interval boundaries.
* [*interval*.filter](./d3-time.md#interval_filter) - create a filtered subset of this interval.
* [*interval*.every](./d3-time.md#interval_every) - create a filtered subset of this interval.
* [*interval*.count](./d3-time.md#interval_count) - count interval boundaries between two dates.
* [d3.timeMillisecond](./d3-time.md#timeMillisecond) - the millisecond interval, local time.
* [d3.timeSecond](./d3-time.md#timeSecond) - the second interval, local time.
* [d3.timeMinute](./d3-time.md#timeMinute) - the minute interval, local time.
* [d3.timeHour](./d3-time.md#timeHour) - the hour interval, local time.
* [d3.timeDay](./d3-time.md#timeDay) - the day interval, local time.
* [d3.timeWeek](./d3-time.md#timeWeek) - the Sunday-based week interval, local time.
* [d3.timeSunday](./d3-time.md#timeSunday) - the Sunday-based week interval, local time.
* [d3.timeMonday](./d3-time.md#timeMonday) - the Monday-based week interval, local time.
* [d3.timeTuesday](./d3-time.md#timeTuesday) - the Tuesday-based week interval, local time.
* [d3.timeWednesday](./d3-time.md#timeWednesday) - the Wednesday-based week interval, local time.
* [d3.timeThursday](./d3-time.md#timeThursday) - the Thursday-based week interval, local time.
* [d3.timeFriday](./d3-time.md#timeFriday) - the Friday-based week interval, local time.
* [d3.timeSaturday](./d3-time.md#timeSaturday) - the Saturday-based week interval, local time.
* [d3.timeMonth](./d3-time.md#timeMonth) - the month interval, local time.
* [d3.timeYear](./d3-time.md#timeYear) - the year interval, local time.
* [d3.utcMillisecond](./d3-time.md#timeMillisecond) - the millisecond interval, UTC time.
* [d3.utcSecond](./d3-time.md#timeSecond) - the second interval, UTC time.
* [d3.utcMinute](./d3-time.md#timeMinute) - the minute interval, UTC time.
* [d3.utcHour](./d3-time.md#timeHour) - the hour interval, UTC time.
* [d3.utcDay](./d3-time.md#timeDay) - the day interval, UTC time.
* [d3.utcWeek](./d3-time.md#timeWeek) - the Sunday-based week interval, UTC time.
* [d3.utcSunday](./d3-time.md#timeSunday) - the Sunday-based week interval, UTC time.
* [d3.utcMonday](./d3-time.md#timeMonday) - the Monday-based week interval, UTC time.
* [d3.utcTuesday](./d3-time.md#timeTuesday) - the Tuesday-based week interval, UTC time.
* [d3.utcWednesday](./d3-time.md#timeWednesday) - the Wednesday-based week interval, UTC time.
* [d3.utcThursday](./d3-time.md#timeThursday) - the Thursday-based week interval, UTC time.
* [d3.utcFriday](./d3-time.md#timeFriday) - the Friday-based week interval, UTC time.
* [d3.utcSaturday](./d3-time.md#timeSaturday) - the Saturday-based week interval, UTC time.
* [d3.utcMonth](./d3-time.md#timeMonth) - the month interval, UTC time.
* [d3.utcYear](./d3-time.md#timeYear) - the year interval, UTC time.
* [d3.unixDay](./d3-time.md#timeDay) - the day interval, UTC time, not month-aligned.
* [d3.timeMilliseconds](./d3-time.md#timeMilliseconds) - alias for d3.timeMillisecond.range.
* [d3.timeSeconds](./d3-time.md#timeSeconds) - alias for d3.timeSecond.range.
* [d3.timeMinutes](./d3-time.md#timeMinutes) - alias for d3.timeMinute.range.
* [d3.timeHours](./d3-time.md#timeHours) - alias for d3.timeHour.range.
* [d3.timeDays](./d3-time.md#timeDay) - alias for d3.timeDay.range.
* [d3.timeWeeks](./d3-time.md#timeWeek) - alias for d3.timeWeek.range.
* [d3.timeSundays](./d3-time.md#timeSunday) - alias for d3.timeSunday.range.
* [d3.timeMondays](./d3-time.md#timeMonday) - alias for d3.timeMonday.range.
* [d3.timeTuesdays](./d3-time.md#timeTuesday) - alias for d3.timeTuesday.range.
* [d3.timeWednesdays](./d3-time.md#timeWednesday) - alias for d3.timeWednesday.range.
* [d3.timeThursdays](./d3-time.md#timeThursday) - alias for d3.timeThursday.range.
* [d3.timeFridays](./d3-time.md#timeFriday) - alias for d3.timeFriday.range.
* [d3.timeSaturdays](./d3-time.md#timeSaturday) - alias for d3.timeSaturday.range.
* [d3.timeMonths](./d3-time.md#timeMonth) - alias for d3.timeMonth.range.
* [d3.timeYears](./d3-time.md#timeYear) - alias for d3.timeYear.range.
* [d3.utcMilliseconds](./d3-time.md#timeMillisecond) - alias for d3.utcMillisecond.range.
* [d3.utcSeconds](./d3-time.md#timeSecond) - alias for d3.utcSecond.range.
* [d3.utcMinutes](./d3-time.md#timeMinute) - alias for d3.utcMinute.range.
* [d3.utcHours](./d3-time.md#timeHour) - alias for d3.utcHour.range.
* [d3.utcDays](./d3-time.md#timeDay) - alias for d3.utcDay.range.
* [d3.utcWeeks](./d3-time.md#timeWeek) - alias for d3.utcWeek.range.
* [d3.utcSundays](./d3-time.md#timeSunday) - alias for d3.utcSunday.range.
* [d3.utcMondays](./d3-time.md#timeMonday) - alias for d3.utcMonday.range.
* [d3.utcTuesdays](./d3-time.md#timeTuesday) - alias for d3.utcTuesday.range.
* [d3.utcWednesdays](./d3-time.md#timeWednesday) - alias for d3.utcWednesday.range.
* [d3.utcThursdays](./d3-time.md#timeThursday) - alias for d3.utcThursday.range.
* [d3.utcFridays](./d3-time.md#timeFriday) - alias for d3.utcFriday.range.
* [d3.utcSaturdays](./d3-time.md#timeSaturday) - alias for d3.utcSaturday.range.
* [d3.utcMonths](./d3-time.md#timeMonth) - alias for d3.utcMonth.range.
* [d3.utcYears](./d3-time.md#timeYear) - alias for d3.utcYear.range.
* [d3.unixDays](./d3-time.md#timeDay) - alias for d3.unixDay.range.
* [d3.timeTicks](./d3-time.md#timeTicks) - generate representative values from a time interval.
* [d3.utcTicks](./d3-time.md#utcTicks) - generate representative values from a time interval.
* [d3.timeTickInterval](./d3-time.md#timeTickInterval) - generate representative values from a time interval.
* [d3.utcTickInterval](./d3-time.md#utcTickInterval) - generate representative values from a time interval.

## [d3-time-format](./d3-time-format.md)

Parse and format times, inspired by strptime and strftime.

* [d3.timeFormat](./d3-time-format.md#timeFormat) - alias for *locale*.format on the default locale.
* [d3.timeParse](./d3-time-format.md#timeParse) - alias for *locale*.parse on the default locale.
* [d3.utcFormat](./d3-time-format.md#utcFormat) -  alias for *locale*.utcFormat on the default locale.
* [d3.utcParse](./d3-time-format.md#utcParse) -  alias for *locale*.utcParse on the default locale.
* [d3.isoFormat](./d3-time-format.md#isoFormat) - an ISO 8601 UTC formatter.
* [d3.isoParse](./d3-time-format.md#isoParse) - an ISO 8601 UTC parser.
* [*locale*.format](./d3-time-format.md#locale_format) - create a time formatter.
* [*locale*.parse](./d3-time-format.md#locale_parse) - create a time parser.
* [*locale*.utcFormat](./d3-time-format.md#locale_utcFormat) - create a UTC formatter.
* [*locale*.utcParse](./d3-time-format.md#locale_utcParse) - create a UTC parser.
* [d3.timeFormatLocale](./d3-time-format.md#timeFormatLocale) - define a custom locale.
* [d3.timeFormatDefaultLocale](./d3-time-format.md#timeFormatDefaultLocale) - define the default locale.

## [d3-timer](./d3-timer.md)

An efficient queue for managing thousands of concurrent animations.

* [d3.now](./d3-timer.md#now) - get the current high-resolution time.
* [d3.timer](./d3-timer.md#timer) - schedule a new timer.
* [*timer*.restart](./d3-timer.md#timer_restart) - reset the timer’s start time and callback.
* [*timer*.stop](./d3-timer.md#timer_stop) - stop the timer.
* [d3.timerFlush](./d3-timer.md#timerFlush) - immediately execute any eligible timers.
* [d3.timeout](./d3-timer.md#timeout) - schedule a timer that stops on its first callback.
* [d3.interval](./d3-timer.md#interval) - schedule a timer that is called with a configurable period.

## [d3-transition](./d3-transition.md)

Animated transitions for [selections](./d3-selection.md).

* [*selection*.transition](./d3-transition/selecting.md#selection_transition) - schedule a transition for the selected elements.
* [*selection*.interrupt](./d3-transition/control-flow.md#selection_interrupt) - interrupt and cancel transitions on the selected elements.
* [d3.interrupt](./d3-transition/control-flow.md#interrupt) - interrupt the active transition for a given node.
* [d3.transition](./d3-transition/selecting.md#transition) - schedule a transition on the root document element.
* [*transition*.select](./d3-transition/selecting.md#transition_select) - schedule a transition on the selected elements.
* [*transition*.selectAll](./d3-transition/selecting.md#transition_selectAll) - schedule a transition on the selected elements.
* [*transition*.selectChild](./d3-transition/selecting.md#transition_selectChild) - select a child element for each selected element.
* [*transition*.selectChildren](./d3-transition/selecting.md#transition_selectChildren) - select the children elements for each selected element.
* [*transition*.selection](./d3-transition/selecting.md#transition_selection) - returns a selection for this transition.
* [*transition*.filter](./d3-transition/selecting.md#transition_filter) - filter elements based on data.
* [*transition*.merge](./d3-transition/selecting.md#transition_merge) - merge this transition with another.
* [*transition*.transition](./d3-transition/selecting.md#transition_transition) - schedule a new transition following this one.
* [d3.active](./d3-transition/selecting.md#active) - select the active transition for a given node.
* [*transition*.attr](./d3-transition/modifying.md#transition_attr) - tween the given attribute using the default interpolator.
* [*transition*.attrTween](./d3-transition/modifying.md#transition_attrTween) - tween the given attribute using a custom interpolator.
* [*transition*.style](./d3-transition/modifying.md#transition_style) - tween the given style property using the default interpolator.
* [*transition*.styleTween](./d3-transition/modifying.md#transition_styleTween) - tween the given style property using a custom interpolator.
* [*transition*.text](./d3-transition/modifying.md#transition_text) - set the text content when the transition starts.
* [*transition*.textTween](./d3-transition/modifying.md#transition_textTween) - tween the text using a custom interpolator.
* [*transition*.remove](./d3-transition/modifying.md#transition_remove) - remove the selected elements when the transition ends.
* [*transition*.tween](./d3-transition/modifying.md#transition_tween) - run custom code during the transition.
* [*transition*.delay](./d3-transition/timing.md#transition_delay) - specify per-element delay in milliseconds.
* [*transition*.duration](./d3-transition/timing.md#transition_duration) - specify per-element duration in milliseconds.
* [*transition*.ease](./d3-transition/timing.md#transition_ease) - specify the easing function.
* [*transition*.easeVarying](./d3-transition/timing.md#transition_easeVarying) - specify an easing function factory.
* [*transition*.end](./d3-transition/control-flow.md#transition_end) - a promise that resolves when a transition ends.
* [*transition*.on](./d3-transition/control-flow.md#transition_on) - await the end of a transition.
* [*transition*.each](./d3-transition/control-flow.md#transition_each) - call a function for each element.
* [*transition*.call](./d3-transition/control-flow.md#transition_call) - call a function with this transition.
* [*transition*.empty](./d3-transition/control-flow.md#transition_empty) - returns true if this transition is empty.
* [*transition*.nodes](./d3-transition/control-flow.md#transition_nodes) - returns an array of all selected elements.
* [*transition*.node](./d3-transition/control-flow.md#transition_node) - returns the first (non-null) element.
* [*transition*.size](./d3-transition/control-flow.md#transition_size) - returns the count of elements.

## [d3-zoom](./d3-zoom.md)

Pan and zoom SVG, HTML or Canvas using mouse or touch input.

* [d3.zoom](./d3-zoom.md#zoom) - create a zoom behavior.
* [*zoom*](./d3-zoom.md#_zoom) - apply the zoom behavior to the selected elements.
* [*zoom*.transform](./d3-zoom.md#zoom_transform) - change the transform for the selected elements.
* [*zoom*.translateBy](./d3-zoom.md#zoom_translateBy) - translate the transform for the selected elements.
* [*zoom*.translateTo](./d3-zoom.md#zoom_translateTo) - translate the transform for the selected elements.
* [*zoom*.scaleBy](./d3-zoom.md#zoom_scaleBy) - scale the transform for the selected elements.
* [*zoom*.scaleTo](./d3-zoom.md#zoom_scaleTo) - scale the transform for the selected elements.
* [*zoom*.constrain](./d3-zoom.md#zoom_constrain) - override the transform constraint logic.
* [*zoom*.filter](./d3-zoom.md#zoom_filter) - control which input events initiate zooming.
* [*zoom*.touchable](./d3-zoom.md#zoom_touchable) - set the touch support detector.
* [*zoom*.wheelDelta](./d3-zoom.md#zoom_wheelDelta) - override scaling for wheel events.
* [*zoom*.extent](./d3-zoom.md#zoom_extent) - set the extent of the viewport.
* [*zoom*.scaleExtent](./d3-zoom.md#zoom_scaleExtent) - set the allowed scale range.
* [*zoom*.translateExtent](./d3-zoom.md#zoom_translateExtent) - set the extent of the zoomable world.
* [*zoom*.clickDistance](./d3-zoom.md#zoom_clickDistance) - set the click distance threshold.
* [*zoom*.tapDistance](./d3-zoom.md#zoom_tapDistance) - set the tap distance threshold.
* [*zoom*.duration](./d3-zoom.md#zoom_duration) - set the duration of zoom transitions.
* [*zoom*.interpolate](./d3-zoom.md#zoom_interpolate) - control the interpolation of zoom transitions.
* [*zoom*.on](./d3-zoom.md#zoom_on) - listen for zoom events.
* [d3.zoomTransform](./d3-zoom.md#zoomTransform) - get the zoom transform for a given element.
* [*transform*.scale](./d3-zoom.md#transform_scale) - scale a transform by the specified amount.
* [*transform*.translate](./d3-zoom.md#transform_translate) - translate a transform by the specified amount.
* [*transform*.apply](./d3-zoom.md#transform_apply) - apply the transform to the given point.
* [*transform*.applyX](./d3-zoom.md#transform_applyX) - apply the transform to the given *x*-coordinate.
* [*transform*.applyY](./d3-zoom.md#transform_applyY) - apply the transform to the given y coordinate.
* [*transform*.invert](./d3-zoom.md#transform_invert) - unapply the transform to the given point.
* [*transform*.invertX](./d3-zoom.md#transform_invertX) - unapply the transform to the given *x*-coordinate.
* [*transform*.invertY](./d3-zoom.md#transform_invertY) - unapply the transform to the given y coordinate.
* [*transform*.rescaleX](./d3-zoom.md#transform_rescaleX) - apply the transform to an x scale’s domain.
* [*transform*.rescaleY](./d3-zoom.md#transform_rescaleY) - apply the transform to a y scale’s domain.
* [*transform*.toString](./d3-zoom.md#transform_toString) - format the transform as an SVG transform string.
* [d3.zoomIdentity](./d3-zoom.md#zoomIdentity) - the identity transform.
