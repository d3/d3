# d3-array

The **d3-array** module provides a variety of methods for working with data.

## [Adding](./d3-array/adding.md)

Full-precision floating point addition.

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

* [new InternMap](./d3-array/interning.md#InternMap) - a key-interning Map.
* [new InternSet](./d3-array/interning.md#InternSet) - a value-interning Set.

---

## [Statistics](https://github.com/d3/d3-array/blob/v3.2.3/README.md#statistics)

Methods for computing basic summary statistics.

* [d3.min](https://github.com/d3/d3-array/blob/v3.2.3/README.md#min) - compute the minimum value in an iterable.
* [d3.minIndex](https://github.com/d3/d3-array/blob/v3.2.3/README.md#minIndex) - compute the index of the minimum value in an iterable.
* [d3.max](https://github.com/d3/d3-array/blob/v3.2.3/README.md#max) - compute the maximum value in an iterable.
* [d3.maxIndex](https://github.com/d3/d3-array/blob/v3.2.3/README.md#maxIndex) - compute the index of the maximum value in an iterable.
* [d3.extent](https://github.com/d3/d3-array/blob/v3.2.3/README.md#extent) - compute the minimum and maximum value in an iterable.
* [d3.sum](https://github.com/d3/d3-array/blob/v3.2.3/README.md#sum) - compute the sum of an iterable of numbers.
* [d3.mean](https://github.com/d3/d3-array/blob/v3.2.3/README.md#mean) - compute the arithmetic mean of an iterable of numbers.
* [d3.median](https://github.com/d3/d3-array/blob/v3.2.3/README.md#median) - compute the median of an iterable of numbers (the 0.5-quantile).
* [d3.medianIndex](https://github.com/d3/d3-array/blob/v3.2.3/README.md#median) - compute the median index of an iterable of numbers (the 0.5-quantile).
* [d3.mode](https://github.com/d3/d3-array/blob/v3.2.3/README.md#mode) - compute the mode (the most common value) of an iterable of numbers.
* [d3.cumsum](https://github.com/d3/d3-array/blob/v3.2.3/README.md#cumsum) - compute the cumulative sum of an iterable.
* [d3.rank](https://github.com/d3/d3-array/blob/v3.2.3/README.md#rank) - compute the rank order of an iterable.
* [d3.quantile](https://github.com/d3/d3-array/blob/v3.2.3/README.md#quantile) - compute a quantile for an iterable of numbers.
* [d3.quantileIndex](https://github.com/d3/d3-array/blob/v3.2.3/README.md#quantileIndex) - compute a quantile index for an iterable of numbers.
* [d3.quantileSorted](https://github.com/d3/d3-array/blob/v3.2.3/README.md#quantileSorted) - compute a quantile for a sorted array of numbers.
* [d3.variance](https://github.com/d3/d3-array/blob/v3.2.3/README.md#variance) - compute the variance of an iterable of numbers.
* [d3.deviation](https://github.com/d3/d3-array/blob/v3.2.3/README.md#deviation) - compute the standard deviation of an iterable of numbers.
* [d3.blur](https://github.com/d3/d3-array/blob/v3.2.3/README.md#blur) - blur an array of numbers in place.
* [d3.blur2](https://github.com/d3/d3-array/blob/v3.2.3/README.md#blur2) - blur a two-dimensional array of numbers in place.
* [d3.blurImage](https://github.com/d3/d3-array/blob/v3.2.3/README.md#blurImage) - blur an RGBA ImageData in place.

## [Search](https://github.com/d3/d3-array/blob/v3.2.3/README.md#search)

Methods for searching arrays for a specific element.

* [d3.least](https://github.com/d3/d3-array/blob/v3.2.3/README.md#least) - returns the least element of an iterable.
* [d3.leastIndex](https://github.com/d3/d3-array/blob/v3.2.3/README.md#leastIndex) - returns the index of the least element of an iterable.
* [d3.greatest](https://github.com/d3/d3-array/blob/v3.2.3/README.md#greatest) - returns the greatest element of an iterable.
* [d3.greatestIndex](https://github.com/d3/d3-array/blob/v3.2.3/README.md#greatestIndex) - returns the index of the greatest element of an iterable.
* [d3.quickselect](https://github.com/d3/d3-array/blob/v3.2.3/README.md#quickselect) - reorder an array of numbers.
* [d3.ascending](https://github.com/d3/d3-array/blob/v3.2.3/README.md#ascending) - compute the natural order of two values.
* [d3.descending](https://github.com/d3/d3-array/blob/v3.2.3/README.md#descending) - compute the natural order of two values.

## [Iterables](https://github.com/d3/d3-array/blob/v3.2.3/README.md#iterables)

* [d3.every](https://github.com/d3/d3-array/blob/v3.2.3/README.md#every) - test if all values satisfy a condition.
* [d3.some](https://github.com/d3/d3-array/blob/v3.2.3/README.md#some) - test if any value satisfies a condition.
* [d3.filter](https://github.com/d3/d3-array/blob/v3.2.3/README.md#filter) - filter values.
* [d3.map](https://github.com/d3/d3-array/blob/v3.2.3/README.md#map) - map values.
* [d3.reduce](https://github.com/d3/d3-array/blob/v3.2.3/README.md#reduce) - reduce values.
* [d3.reverse](https://github.com/d3/d3-array/blob/v3.2.3/README.md#reverse) - reverse the order of values.
* [d3.sort](https://github.com/d3/d3-array/blob/v3.2.3/README.md#sort) - sort values.

## [Sets](https://github.com/d3/d3-array/blob/v3.2.3/README.md#sets)

* [d3.difference](https://github.com/d3/d3-array/blob/v3.2.3/README.md#difference) - compute a set difference.
* [d3.disjoint](https://github.com/d3/d3-array/blob/v3.2.3/README.md#disjoint) - test whether two sets are disjoint.
* [d3.intersection](https://github.com/d3/d3-array/blob/v3.2.3/README.md#intersection) - compute a set intersection.
* [d3.superset](https://github.com/d3/d3-array/blob/v3.2.3/README.md#superset) - test whether a set is a superset of another.
* [d3.subset](https://github.com/d3/d3-array/blob/v3.2.3/README.md#subset) - test whether a set is a subset of another.
* [d3.union](https://github.com/d3/d3-array/blob/v3.2.3/README.md#union) - compute a set union.

## Other

* [d3.count](./d3-array/grouping.md#count) - count valid number values in an iterable.
* [d3.cross](./d3-array/grouping.md#cross) - compute the Cartesian product of two iterables.
* [d3.merge](./d3-array/grouping.md#merge) - merge multiple iterables into one array.
* [d3.pairs](./d3-array/grouping.md#pairs) - create an array of adjacent pairs of elements.
* [d3.permute](./d3-array/grouping.md#permute) - reorder an iterable of elements according to an iterable of indexes.
* [d3.shuffle](./d3-array/grouping.md#shuffle) - randomize the order of an iterable.
* [d3.shuffler](./d3-array/grouping.md#shuffler) - randomize the order of an iterable.
* [d3.ticks](./d3-array/grouping.md#ticks) - generate representative values from a numeric interval.
* [d3.tickIncrement](./d3-array/grouping.md#tickIncrement) - generate representative values from a numeric interval.
* [d3.tickStep](./d3-array/grouping.md#tickStep) - generate representative values from a numeric interval.
* [d3.nice](./d3-array/grouping.md#nice) - extend an interval to align with ticks.
* [d3.range](./d3-array/grouping.md#range) - generate a range of numeric values.
* [d3.transpose](./d3-array/grouping.md#transpose) - transpose an array of arrays.
* [d3.zip](./d3-array/grouping.md#zip) - transpose a variable number of arrays.
