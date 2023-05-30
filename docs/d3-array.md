# d3-array

The **d3-array** module provides a variety of methods for working with data.

## [Add](./d3-array/add.md)

Add floating point values with full precision.

* [new Adder](./d3-array/add.md#Adder) - create a full precision adder.
* [*adder*.add](./d3-array/add.md#adder_add) - add a value to an adder.
* [*adder*.valueOf](./d3-array/add.md#adder_valueOf) - get the double-precision representation of an adder’s value.
* [fcumsum](./d3-array/add.md#fcumsum) - compute a full precision cumulative summation of numbers.
* [fsum](./d3-array/add.md#fsum) - compute a full precision summation of an iterable of numbers.

## [Bin](./d3-array/bin.md)

Bin discrete samples into continuous, non-overlapping intervals.

* [bin](./d3-array/bin.md#bin) - create a new bin generator.
* [*bin*](./d3-array/bin.md#_bin) - bins a given array of samples.
* [*bin*.value](./d3-array/bin.md#bin_value) - specify a value accessor for each sample.
* [*bin*.domain](./d3-array/bin.md#bin_domain) - specify the interval of observable values.
* [*bin*.thresholds](./d3-array/bin.md#bin_thresholds) - specify how values are divided into bins.
* [thresholdFreedmanDiaconis](./d3-array/bin.md#thresholdFreedmanDiaconis) - the Freedman–Diaconis binning rule.
* [thresholdScott](./d3-array/bin.md#thresholdScott) - Scott’s normal reference binning rule.
* [thresholdSturges](./d3-array/bin.md#thresholdSturges) - Sturges’ binning formula.

## [Bisect](./d3-array/bisect.md)

Quickly find a value in a sorted array.

* [bisector](./d3-array/bisect.md#bisector) - bisect using an accessor or comparator.
* [*bisector*.right](./d3-array/bisect.md#bisector_right) - bisectRight, with the given comparator.
* [*bisector*.left](./d3-array/bisect.md#bisector_left) - bisectLeft, with the given comparator.
* [*bisector*.center](./d3-array/bisect.md#bisector_center) - binary search for a value in a sorted array.
* [bisect](./d3-array/bisect.md#bisect) - binary search for a value in a sorted array.
* [bisectRight](./d3-array/bisect.md#bisectRight) - binary search for a value in a sorted array.
* [bisectLeft](./d3-array/bisect.md#bisectLeft) - binary search for a value in a sorted array.
* [bisectCenter](./d3-array/bisect.md#bisectCenter) - binary search for a value in a sorted array.

## [Blur](./d3-array.md/blur.md)

Blur quantitative values in one or two dimensions.

* [d3.blur](./d3-array/blur.md#blur) - blur an array of numbers in place.
* [d3.blur2](./d3-array/blur.md#blur2) - blur a two-dimensional array of numbers in place.
* [d3.blurImage](./d3-array/blur.md#blurImage) - blur an RGBA ImageData in place.

## [Group](./d3-array/group.md)

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

## [Intern](./d3-array/intern.md)

Create maps and sets with non-primitive values such as dates.

* [new InternMap](./d3-array/intern.md#InternMap) - a key-interning Map.
* [new InternSet](./d3-array/intern.md#InternSet) - a value-interning Set.

## [Sets](./d3-array/sets.md)

Logical operations on sets.

* [d3.difference](./d3-array/sets.md#difference) - compute a set difference.
* [d3.disjoint](./d3-array/sets.md#disjoint) - test whether two sets are disjoint.
* [d3.intersection](./d3-array/sets.md#intersection) - compute a set intersection.
* [d3.superset](./d3-array/sets.md#superset) - test whether a set is a superset of another.
* [d3.subset](./d3-array/sets.md#subset) - test whether a set is a subset of another.
* [d3.union](./d3-array/sets.md#union) - compute a set union.

## [Sort](./d3-array/sort.md)

Sort and reorder arrays of values.

* [d3.ascending](./d3-array/sort.md#ascending) - compute the natural order of two values.
* [d3.descending](./d3-array/sort.md#descending) - compute the natural order of two values.
* [d3.permute](./d3-array/sort.md#permute) - reorder an iterable of elements according to an iterable of indexes.
* [d3.quickselect](./d3-array/sort.md#quickselect) - reorder an array of numbers.
* [d3.reverse](./d3-array/sort.md#reverse) - reverse the order of values.
* [d3.shuffle](./d3-array/sort.md#shuffle) - randomize the order of an iterable.
* [d3.shuffler](./d3-array/sort.md#shuffler) - randomize the order of an iterable.
* [d3.sort](./d3-array/sort.md#sort) - sort values.

## [Summarize](./d3-array/summarize.md)

Compute summary statistics.

* [d3.count](./d3-array/group.md#count) - count valid number values in an iterable.
* [d3.min](./d3-array/group.md#min) - compute the minimum value in an iterable.
* [d3.minIndex](./d3-array/search.md#minIndex) - compute the index of the minimum value in an iterable.
* [d3.max](./d3-array/group.md#max) - compute the maximum value in an iterable.
* [d3.maxIndex](./d3-array/search.md#maxIndex) - compute the index of the maximum value in an iterable.
* [d3.least](./d3-array/search.md#least) - returns the least element of an iterable.
* [d3.leastIndex](./d3-array/search.md#leastIndex) - returns the index of the least element of an iterable.
* [d3.greatest](./d3-array/search.md#greatest) - returns the greatest element of an iterable.
* [d3.greatestIndex](./d3-array/search.md#greatestIndex) - returns the index of the greatest element of an iterable.
* [d3.extent](./d3-array/group.md#extent) - compute the minimum and maximum value in an iterable.
* [d3.mode](./d3-array/group.md#mode) - compute the mode (the most common value) of an iterable of numbers.
* [d3.sum](./d3-array/group.md#sum) - compute the sum of an iterable of numbers.
* [d3.mean](./d3-array/group.md#mean) - compute the arithmetic mean of an iterable of numbers.
* [d3.median](./d3-array/group.md#median) - compute the median of an iterable of numbers (the 0.5-quantile).
* [d3.medianIndex](./d3-array/group.md#median) - compute the median index of an iterable of numbers (the 0.5-quantile).
* [d3.cumsum](./d3-array/group.md#cumsum) - compute the cumulative sum of an iterable.
* [d3.quantile](./d3-array/group.md#quantile) - compute a quantile for an iterable of numbers.
* [d3.quantileIndex](./d3-array/group.md#quantileIndex) - compute a quantile index for an iterable of numbers.
* [d3.quantileSorted](./d3-array/group.md#quantileSorted) - compute a quantile for a sorted array of numbers.
* [d3.rank](./d3-array/group.md#rank) - compute the rank order of an iterable.
* [d3.variance](./d3-array/group.md#variance) - compute the variance of an iterable of numbers.
* [d3.deviation](./d3-array/group.md#deviation) - compute the standard deviation of an iterable of numbers.
* [d3.every](./d3-array/group.md#every) - test if all values satisfy a condition.
* [d3.some](./d3-array/group.md#some) - test if any value satisfies a condition.

## [Ticks](./d3-array/ticks.md)

Generate representative values from a continuous interval.

* [d3.ticks](./d3-array/ticks.md#ticks) - generate representative values from a numeric interval.
* [d3.tickIncrement](./d3-array/ticks.md#tickIncrement) - generate representative values from a numeric interval.
* [d3.tickStep](./d3-array/ticks.md#tickStep) - generate representative values from a numeric interval.
* [d3.nice](./d3-array/ticks.md#nice) - extend an interval to align with ticks.
* [d3.range](./d3-array/ticks.md#range) - generate a range of numeric values.

## [Transform](./d3-array/transform.md)

Derive new arrays.

* [d3.cross](./d3-array/transform.md#cross) - compute the Cartesian product of two iterables.
* [d3.merge](./d3-array/transform.md#merge) - merge multiple iterables into one array.
* [d3.pairs](./d3-array/transform.md#pairs) - create an array of adjacent pairs of elements.
* [d3.transpose](./d3-array/transform.md#transpose) - transpose an array of arrays.
* [d3.zip](./d3-array/transform.md#zip) - transpose a variable number of arrays.
* [d3.filter](./d3-array/transform.md#filter) - filter values.
* [d3.map](./d3-array/transform.md#map) - map values.
* [d3.reduce](./d3-array/transform.md#reduce) - reduce values.
