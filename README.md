# d3

This branch contains the prerelease of D3 4.0. This API is unstable and may change at any point prior to the release!

…

## Installing

If you use NPM, `npm install d3`. Otherwise, download the [latest release](https://github.com/mbostock/d3/releases/latest). The released bundle supports AMD, CommonJS, and vanilla environments. Create a custom build using [Rollup](https://github.com/rollup/rollup) or your preferred bundler. You can also load directly from [d3js.org](https://d3js.org):

```html
<script src="https://d3js.org/d3.v4pre.min.js"></script>
```

## API Reference

* [Arrays](#arrays) ([Statistics](#statistics), [Search](#search), [Transformations](#transformations), [Objects](#objects), [Maps](#maps), [Sets](#sets), [Nests](#nests), [Histograms](#histograms))

### [Arrays](https://github.com/d3/d3-array)

Array manipulation, ordering, searching, summarizing, etc.

#### Statistics

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

#### Search

Methods for searching arrays for a specific element.

* [d3.scan](https://github.com/d3/d3-array#scan) - linear search for an element using a comparator.
* [d3.bisect](https://github.com/d3/d3-array#bisect) - binary search for a value in a sorted array.
* [d3.bisectRight](https://github.com/d3/d3-array#bisectRight) - binary search for a value in a sorted array.
* [d3.bisectLeft](https://github.com/d3/d3-array#bisectLeft) - binary search for a value in a sorted array.
* [d3.bisector](https://github.com/d3/d3-array#bisector) - bisect using an accessor or comparator.
* [d3.ascending](https://github.com/d3/d3-array#ascending) - compute the natural order of two values.
* [d3.descending](https://github.com/d3/d3-array#descending) - compute the natural order of two values.

#### Transformations

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

#### Objects

Methods for converting associative arrays (objects) to arrays.

* [d3.keys](https://github.com/d3/d3-array#keys) - list the keys of an associative array.
* [d3.values](https://github.com/d3/d3-array#values) - list the values of an associated array.
* [d3.entries](https://github.com/d3/d3-array#entries) - list the key-value entries of an associative array.

#### Maps

Like ES6 Map, but with string keys and a few other differences.

* [d3.map](https://github.com/d3/d3-array#map) - constructs a new, empty map.
* [*map*.has](https://github.com/d3/d3-array#map_has) - returns true if the map contains the specified key.
* [*map*.get](https://github.com/d3/d3-array#map_get) - returns the value for the specified key.
* [*map*.set](https://github.com/d3/d3-array#map_set) - sets the value for the specified key.
* [*map*.remove](https://github.com/d3/d3-array#map_remove) - removes the entry for specified key.
* [*map*.clear](https://github.com/d3/d3-array#map_clear) - removes all entries.
* [*map*.keys](https://github.com/d3/d3-array#map_keys) - returns the map’s array of keys.
* [*map*.values](https://github.com/d3/d3-array#map_values) - returns the map’s array of values.
* [*map*.entries](https://github.com/d3/d3-array#map_entries) - returns the map’s array of entries (key-values objects).
* [*map*.each](https://github.com/d3/d3-array#map_each) - calls the specified function for each entry in the map.
* [*map*.empty](https://github.com/d3/d3-array#map_empty) - returns false if the map has at least one entry.
* [*map*.size](https://github.com/d3/d3-array#map_size) - returns the number of entries in the map.

#### Sets

Like ES6 Set, but with string keys and a few other differences.

* [d3.set](https://github.com/d3/d3-array#set) - constructs a new, empty set.
* [*set*.has](https://github.com/d3/d3-array#set_has) - returns true if the set contains the specified value.
* [*set*.add](https://github.com/d3/d3-array#set_add) - adds the specified value.
* [*set*.remove](https://github.com/d3/d3-array#set_remove) - removes the specified value.
* [*set*.clear](https://github.com/d3/d3-array#set_clear) - removes all values.
* [*set*.values](https://github.com/d3/d3-array#set_values) - returns the set’s array of values.
* [*set*.each](https://github.com/d3/d3-array#set_each) - calls the specified function for each value in the set.
* [*set*.empty](https://github.com/d3/d3-array#set_empty) - returns true if the set has at least one value.
* [*set*.size](https://github.com/d3/d3-array#set_size) - returns the number of values in the set.

#### Nests

Group data into arbitrary hierarchies.

* [d3.nest](https://github.com/d3/d3-array#nest) - constructs a new nest generator.
* [*nest*.key](https://github.com/d3/d3-array#nest_key) - add a level to the nest hierarchy.
* [*nest*.sortKeys](https://github.com/d3/d3-array#nest_sortKeys) - sort the current nest level by key.
* [*nest*.sortValues](https://github.com/d3/d3-array#nest_sortValues) - sort the leaf nest level by value.
* [*nest*.rollup](https://github.com/d3/d3-array#nest_rollup) - specify a rollup function for leaf values.
* [*nest*.map](https://github.com/d3/d3-array#nest_map) - generate the nest, returning a map.
* [*nest*.object](https://github.com/d3/d3-array#nest_object) - generate the nest, returning an associative array.
* [*nest*.entries](https://github.com/d3/d3-array#nest_entries) - generate the nest, returning an array of key-values tuples.

#### Histograms

Bin discrete samples into continuous, non-overlapping intervals.

* [d3.histogram](https://github.com/d3/d3-array#histogram) - constructs a new histogram generator.
* [*histogram*](https://github.com/d3/d3-array#_histogram) - compute the histogram for the given array of samples.
* [*histogram*.value](https://github.com/d3/d3-array#histogram_value) - specify a value accessor for each sample.
* [*histogram*.domain](https://github.com/d3/d3-array#histogram_domain) - specify the interval of observable values.
* [*histogram*.thresholds](https://github.com/d3/d3-array#histogram_thresholds) - specify how values are divided into bins.
* [d3.thresholdFreedmanDiaconis](https://github.com/d3/d3-array#thresholdFreedmanDiaconis) - the Freedman–Diaconis binning rule.
* [d3.thresholdScott](https://github.com/d3/d3-array#thresholdScott) - Scott’s normal reference binning rule.
* [d3.thresholdSturges](https://github.com/d3/d3-array#thresholdSturges) - Sturge’s binning formula.
