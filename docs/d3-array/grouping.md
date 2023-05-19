# d3-array: Grouping {#top}

## group(iterable, ...keys) {#group}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/group.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-group-d3-rollup) -->

Groups the specified *iterable* of values into an [InternMap](#InternMap) from *key* to array of value. For example, given some data:

```js
data = [
  {name: "jim",   amount: "34.0",   date: "11/12/2015"},
  {name: "carl",  amount: "120.11", date: "11/12/2015"},
  {name: "stacy", amount: "12.01",  date: "01/04/2016"},
  {name: "stacy", amount: "34.05",  date: "01/04/2016"}
]
```

To group the data by name:

```js
d3.group(data, d => d.name)
```

This produces:

```js
Map(3) {
  "jim" => Array(1)
  "carl" => Array(1)
  "stacy" => Array(2)
}
```

If more than one *key* is specified, a nested InternMap is returned. For example:

```js
d3.group(data, d => d.name, d => d.date)
```

This produces:

```js
Map(3) {
  "jim" => Map(1) {
    "11/12/2015" => Array(1)
  }
  "carl" => Map(1) {
    "11/12/2015" => Array(1)
  }
  "stacy" => Map(1) {
    "01/04/2016" => Array(2)
  }
}
```

To convert a Map to an Array, use [Array.from](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from). For example:

```js
Array.from(d3.group(data, d => d.name))
```

This produces:

```js
[
  ["jim", Array(1)],
  ["carl", Array(1)],
  ["stacy", Array(2)]
]
```

You can also simultaneously convert the [*key*, *value*] to some other representation by passing a map function to Array.from:

```js
Array.from(d3.group(data, d => d.name), ([key, value]) => ({key, value}))
```

This produces:

```js
[
  {key: "jim", value: Array(1)},
  {key: "carl", value: Array(1)},
  {key: "stacy", value: Array(2)}
]
```

[*selection*.data](https://github.com/d3/d3-selection/blob/main/README.md#selection_data) accepts iterables directly, meaning that you can use a Map (or Set or other iterable) to perform a data join without first needing to convert to an array.

## groups(iterable, ...keys) {#groups}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/group.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-group-d3-rollup) -->

Equivalent to [group](#group), but returns nested arrays instead of nested maps.

## flatGroup(iterable, ...keys) {#flatGroup}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/group.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-flatgroup) -->

Equivalent to [group](#group), but returns a flat array of [*key0*, *key1*, …, *values*] instead of nested maps.

## index(iterable, ...keys) {#index}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/group.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-group) -->

Equivalent to [group](#group) but returns a unique value per compound key instead of an array, throwing if the key is not unique.

For example, given the data defined above,

```js
d3.index(data, d => d.amount)
```

returns

```js
Map(4) {
  "34.0" => Object {name: "jim", amount: "34.0", date: "11/12/2015"}
  "120.11" => Object {name: "carl", amount: "120.11", date: "11/12/2015"}
  "12.01" => Object {name: "stacy", amount: "12.01", date: "01/04/2016"}
  "34.05" => Object {name: "stacy", amount: "34.05", date: "01/04/2016"}
}
```

On the other hand,

```js
d3.index(data, d => d.name)
```

throws an error because two objects share the same name.

## indexes(iterable, ...keys) {#indexes}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/group.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-group) -->

Equivalent to [index](#index), but returns nested arrays instead of nested maps.

## rollup(iterable, reduce, ...keys) {#rollup}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/group.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-group-d3-rollup) -->

[Groups](#group) and reduces the specified *iterable* of values into an InternMap from *key* to value. For example, given some data:

```js
data = [
  {name: "jim",   amount: "34.0",   date: "11/12/2015"},
  {name: "carl",  amount: "120.11", date: "11/12/2015"},
  {name: "stacy", amount: "12.01",  date: "01/04/2016"},
  {name: "stacy", amount: "34.05",  date: "01/04/2016"}
]
```

To count the number of elements by name:

```js
d3.rollup(data, v => v.length, d => d.name)
```

This produces:

```js
Map(3) {
  "jim" => 1
  "carl" => 1
  "stacy" => 2
}
```

If more than one *key* is specified, a nested Map is returned. For example:

```js
d3.rollup(data, v => v.length, d => d.name, d => d.date)
```

This produces:

```js
Map(3) {
  "jim" => Map(1) {
    "11/12/2015" => 1
  }
  "carl" => Map(1) {
    "11/12/2015" => 1
  }
  "stacy" => Map(1) {
    "01/04/2016" => 2
  }
}
```

To convert a Map to an Array, use [Array.from](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from). See [d3.group](#group) for examples.

## rollups(iterable, reduce, ...keys) {#rollups}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/group.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-group-d3-rollup) -->

Equivalent to [rollup](#rollup), but returns nested arrays instead of nested maps.

## flatRollup(iterable, reduce, ...keys) {#flatRollup}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/group.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-flatgroup) -->

Equivalent to [rollup](#rollup), but returns a flat array of [*key0*, *key1*, …, *value*] instead of nested maps.

## groupSort(iterable, comparator, key) {#groupSort}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/groupSort.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-groupsort) -->

Groups the specified *iterable* of elements according to the specified *key* function, sorts the groups according to the specified *comparator*, and then returns an array of keys in sorted order. For example, if you had a table of barley yields for different varieties, sites, and years, to sort the barley varieties by ascending median yield:

```js
d3.groupSort(barley, g => d3.median(g, d => d.yield), d => d.variety)
```

For descending order, negate the group value:

```js
d3.groupSort(barley, g => -d3.median(g, d => d.yield), d => d.variety)
```

If a *comparator* is passed instead of an *accessor* (i.e., if the second argument is a function that takes exactly two arguments), it will be asked to compare two groups *a* and *b* and should return a negative value if *a* should be before *b*, a positive value if *a* should be after *b*, or zero for a partial ordering.
