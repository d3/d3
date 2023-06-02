# Interning values

The [InternMap](#InternMap) and [InternSet](#InternSet) classes extend the native JavaScript Map and Set classes, respectively, allowing Dates and other non-primitive keys by bypassing the [SameValueZero algorithm](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness) when determining key equality. [d3.group](./group.md#group), [d3.rollup](./group.md#rollup) and [d3.index](./group.md#index) use an InternMap rather than a native Map.

## new InternMap(*iterable*, *key*) {#InternMap}

```js
const valueByDate = new d3.InternMap([
  [new Date("2021-01-01"), 42],
  [new Date("2022-01-01"), 12],
  [new Date("2023-01-01"), 45]
]);
```

[Examples](https://observablehq.com/@mbostock/internmap) · [Source](https://github.com/mbostock/internmap/blob/main/src/index.js) · Constructs a new Map given the specified *iterable* of [*key*, *value*] entries. The keys are interned using the specified *key* function which defaults to [*object*.valueOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf) for non-primitive values. For example, to retrieve a value keyed by a given date:

```js
valueByDate.get(new Date("2022-01-01")) // 12
```

## new InternSet(*iterable*, *key*) {#InternSet}

```js
const dates = new d3.InternSet([
  new Date("2021-01-01"),
  new Date("2022-01-01"),
  new Date("2023-01-01")
]);
```

[Examples](https://observablehq.com/@mbostock/internmap) · [Source](https://github.com/mbostock/internmap/blob/main/src/index.js) · Constructs a new Set given the specified *iterable* of values. The values are interned using the specified *key* function which defaults to [*object*.valueOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf) for non-primitive values. For example, to query for a given date:

```js
dates.has(new Date("2022-01-01")) // true
```
