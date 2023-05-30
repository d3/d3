# d3-array

The **d3-array** module provides a variety of methods for working with data.

## [Adding](./d3-array/adding.md)

Add floating point values with full precision.

* [new Adder](./d3-array/adding.md#Adder) - create a full precision adder.
* [*adder*.add](./d3-array/adding.md#adder_add) - add a value to an adder.
* [*adder*.valueOf](./d3-array/adding.md#adder_valueOf) - get the double-precision representation of an adder’s value.
* [fcumsum](./d3-array/adding.md#fcumsum) - compute a full precision cumulative summation of numbers.
* [fsum](./d3-array/adding.md#fsum) - compute a full precision summation of an iterable of numbers.

## [Binning](./d3-array/binning.md)

Bin discrete samples into continuous, non-overlapping intervals.

* [bin](./d3-array/binning.md#bin) - create a new bin generator.
* [*bin*](./d3-array/binning.md#_bin) - bins a given array of samples.
* [*bin*.value](./d3-array/binning.md#bin_value) - specify a value accessor for each sample.
* [*bin*.domain](./d3-array/binning.md#bin_domain) - specify the interval of observable values.
* [*bin*.thresholds](./d3-array/binning.md#bin_thresholds) - specify how values are divided into bins.
* [thresholdFreedmanDiaconis](./d3-array/binning.md#thresholdFreedmanDiaconis) - the Freedman–Diaconis binning rule.
* [thresholdScott](./d3-array/binning.md#thresholdScott) - Scott’s normal reference binning rule.
* [thresholdSturges](./d3-array/binning.md#thresholdSturges) - Sturges’ binning formula.

## [Bisecting](./d3-array/bisecting.md)

Quickly find a value in a sorted array.

* [bisector](./d3-array/bisecting.md#bisector) - bisect using an accessor or comparator.
* [*bisector*.right](./d3-array/bisecting.md#bisector_right) - bisectRight, with the given comparator.
* [*bisector*.left](./d3-array/bisecting.md#bisector_left) - bisectLeft, with the given comparator.
* [*bisector*.center](./d3-array/bisecting.md#bisector_center) - binary search for a value in a sorted array.
* [bisect](./d3-array/bisecting.md#bisect) - binary search for a value in a sorted array.
* [bisectRight](./d3-array/bisecting.md#bisectRight) - binary search for a value in a sorted array.
* [bisectLeft](./d3-array/bisecting.md#bisectLeft) - binary search for a value in a sorted array.
* [bisectCenter](./d3-array/bisecting.md#bisectCenter) - binary search for a value in a sorted array.

## [Blurring](./d3-array.md/blurring.md)

Blur quantitative values in one or two dimensions.

* [d3.blur](./d3-array/blurring.md#blur) - blur an array of numbers in place.
* [d3.blur2](./d3-array/blurring.md#blur2) - blur a two-dimensional array of numbers in place.
* [d3.blurImage](./d3-array/blurring.md#blurImage) - blur an RGBA ImageData in place.

## [Grouping](./d3-array/grouping.md)

Group discrete values.

* [d3.group](./d3-array/grouping.md#group) - group an iterable into a nested Map.
* [d3.groups](./d3-array/grouping.md#groups) - group an iterable into a nested array.
* [d3.rollup](./d3-array/grouping.md#rollup) - reduce an iterable into a nested Map.
* [d3.rollups](./d3-array/grouping.md#rollups) - reduce an iterable into a nested array.
* [d3.index](./d3-array/grouping.md#index) - index an iterable into a nested Map.
* [d3.indexes](./d3-array/grouping.md#indexes) - index an iterable into a nested array.
* [d3.flatGroup](./d3-array/grouping.md#flatGroup) - group an iterable into a flat array.
* [d3.flatRollup](./d3-array/grouping.md#flatRollup) - reduce an iterable into a flat array.
* [d3.groupSort](./d3-array/grouping.md#groupSort) - sort keys according to grouped values.

## [Interning](./d3-array/interning.md)

Create maps and sets with non-primitive values such as dates.

* [new InternMap](./d3-array/interning.md#InternMap) - a key-interning Map.
* [new InternSet](./d3-array/interning.md#InternSet) - a value-interning Set.

## [Searching](./d3-array/searching.md)

Search (unsorted) arrays for a specific element.

* [d3.minIndex](./d3-array/searching.md#minIndex) - compute the index of the minimum value in an iterable.
* [d3.maxIndex](./d3-array/searching.md#maxIndex) - compute the index of the maximum value in an iterable.
* [d3.least](./d3-array/searching.md#least) - returns the least element of an iterable.
* [d3.leastIndex](./d3-array/searching.md#leastIndex) - returns the index of the least element of an iterable.
* [d3.greatest](./d3-array/searching.md#greatest) - returns the greatest element of an iterable.
* [d3.greatestIndex](./d3-array/searching.md#greatestIndex) - returns the index of the greatest element of an iterable.

## [Sets](./d3-array/sets.md)

Logical operations on sets.

* [d3.difference](./d3-array/sets.md#difference) - compute a set difference.
* [d3.disjoint](./d3-array/sets.md#disjoint) - test whether two sets are disjoint.
* [d3.intersection](./d3-array/sets.md#intersection) - compute a set intersection.
* [d3.superset](./d3-array/sets.md#superset) - test whether a set is a superset of another.
* [d3.subset](./d3-array/sets.md#subset) - test whether a set is a subset of another.
* [d3.union](./d3-array/sets.md#union) - compute a set union.

## [Sorting](./d3-array/sorting.md)

Sort and reorder arrays of values.

* [d3.quickselect](./d3-array/sorting.md#quickselect) - reorder an array of numbers.
* [d3.ascending](./d3-array/sorting.md#ascending) - compute the natural order of two values.
* [d3.descending](./d3-array/sorting.md#descending) - compute the natural order of two values.
* [d3.reverse](./d3-array/sorting.md#reverse) - reverse the order of values.
* [d3.sort](./d3-array/sorting.md#sort) - sort values.
* [d3.permute](./d3-array/sorting.md#permute) - reorder an iterable of elements according to an iterable of indexes.
* [d3.shuffle](./d3-array/sorting.md#shuffle) - randomize the order of an iterable.
* [d3.shuffler](./d3-array/sorting.md#shuffler) - randomize the order of an iterable.

## [Summarizing](./d3-array/summarizing.md)

Compute summary statistics.

* [d3.count](./d3-array/grouping.md#count) - count valid number values in an iterable.
* [d3.min](./d3-array/grouping.md#min) - compute the minimum value in an iterable.
* [d3.max](./d3-array/grouping.md#max) - compute the maximum value in an iterable.
* [d3.extent](./d3-array/grouping.md#extent) - compute the minimum and maximum value in an iterable.
* [d3.mode](./d3-array/grouping.md#mode) - compute the mode (the most common value) of an iterable of numbers.
* [d3.sum](./d3-array/grouping.md#sum) - compute the sum of an iterable of numbers.
* [d3.mean](./d3-array/grouping.md#mean) - compute the arithmetic mean of an iterable of numbers.
* [d3.median](./d3-array/grouping.md#median) - compute the median of an iterable of numbers (the 0.5-quantile).
* [d3.medianIndex](./d3-array/grouping.md#median) - compute the median index of an iterable of numbers (the 0.5-quantile).
* [d3.cumsum](./d3-array/grouping.md#cumsum) - compute the cumulative sum of an iterable.
* [d3.quantile](./d3-array/grouping.md#quantile) - compute a quantile for an iterable of numbers.
* [d3.quantileIndex](./d3-array/grouping.md#quantileIndex) - compute a quantile index for an iterable of numbers.
* [d3.quantileSorted](./d3-array/grouping.md#quantileSorted) - compute a quantile for a sorted array of numbers.
* [d3.rank](./d3-array/grouping.md#rank) - compute the rank order of an iterable.
* [d3.variance](./d3-array/grouping.md#variance) - compute the variance of an iterable of numbers.
* [d3.deviation](./d3-array/grouping.md#deviation) - compute the standard deviation of an iterable of numbers.
* [d3.every](./d3-array/grouping.md#every) - test if all values satisfy a condition.
* [d3.some](./d3-array/grouping.md#some) - test if any value satisfies a condition.

## [Ticks](./d3-array/ticks.md)

Generate representative values from a continuous interval.

* [d3.ticks](./d3-array/ticks.md#ticks) - generate representative values from a numeric interval.
* [d3.tickIncrement](./d3-array/ticks.md#tickIncrement) - generate representative values from a numeric interval.
* [d3.tickStep](./d3-array/ticks.md#tickStep) - generate representative values from a numeric interval.
* [d3.nice](./d3-array/ticks.md#nice) - extend an interval to align with ticks.
* [d3.range](./d3-array/ticks.md#range) - generate a range of numeric values.

## [Transforming](./d3-array/transforming.md)

Derive new arrays.

* [d3.cross](./d3-array/transforming.md#cross) - compute the Cartesian product of two iterables.
* [d3.merge](./d3-array/transforming.md#merge) - merge multiple iterables into one array.
* [d3.pairs](./d3-array/transforming.md#pairs) - create an array of adjacent pairs of elements.
* [d3.transpose](./d3-array/transforming.md#transpose) - transpose an array of arrays.
* [d3.zip](./d3-array/transforming.md#zip) - transpose a variable number of arrays.
* [d3.filter](./d3-array/transforming.md#filter) - filter values.
* [d3.map](./d3-array/transforming.md#map) - map values.
* [d3.reduce](./d3-array/transforming.md#reduce) - reduce values.
