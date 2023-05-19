# d3-array: Interning {#top}

## new d3.InternMap(iterable, key) {#InternMap}

<!-- [Source](https://github.com/mbostock/internmap/blob/main/src/index.js) -->
<!-- [Examples](https://observablehq.com/d/d4c5f6ad343866b9) -->

The [InternMap and InternSet](https://github.com/mbostock/internmap) classes extend the native JavaScript Map and Set classes, respectively, allowing Dates and other non-primitive keys by bypassing the [SameValueZero algorithm](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness) when determining key equality. d3.group, d3.rollup and d3.index use an InternMap rather than a native Map. These two classes are exported for convenience.

## new d3.InternSet(iterable, key) {#InternSet}

TODO
