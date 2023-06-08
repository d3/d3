# Set operations

Logical set operations for any iterable.

## difference(*iterable*, ...*others*) {#difference}

[Source](https://github.com/d3/d3-array/blob/main/src/difference.js) · Returns a new [InternSet](./intern.md#InternSet) containing every value in *iterable* that is not in any of the *others* iterables.

```js
d3.difference([0, 1, 2, 0], [1]) // Set {0, 2}
```

## union(...*iterables*) {#union}

[Source](https://github.com/d3/d3-array/blob/main/src/union.js) · Returns a new [InternSet](./intern.md#InternSet) containing every (distinct) value that appears in any of the given *iterables*. The order of values in the returned set is based on their first occurrence in the given *iterables*.

```js
d3.union([0, 2, 1, 0], [1, 3]) // Set {0, 2, 1, 3}
```

## intersection(...*iterables*) {#intersection}

[Source](https://github.com/d3/d3-array/blob/main/src/intersection.js) · Returns a new [InternSet](./intern.md#InternSet) containing every (distinct) value that appears in all of the given *iterables*. The order of values in the returned set is based on their first occurrence in the given *iterables*.

```js
d3.intersection([0, 2, 1, 0], [1, 3]) // Set {1}
```

## superset(*a*, *b*) {#superset}

[Source](https://github.com/d3/d3-array/blob/main/src/superset.js) · Returns true if *a* is a superset of *b*: if every value in the given iterable *b* is also in the given iterable *a*.

```js
d3.superset([0, 2, 1, 3, 0], [1, 3]) // true
```

## subset(*a*, *b*) {#subset}

[Source](https://github.com/d3/d3-array/blob/main/src/subset.js) · Returns true if *a* is a subset of *b*: if every value in the given iterable *a* is also in the given iterable *b*.

```js
d3.subset([1, 3], [0, 2, 1, 3, 0]) // true
```

## disjoint(*a*, *b*) {#disjoint}

[Source](https://github.com/d3/d3-array/blob/main/src/disjoint.js) · Returns true if *a* and *b* are disjoint: if *a* and *b* contain no shared value.

```js
d3.disjoint([1, 3], [2, 4]) // true
```
