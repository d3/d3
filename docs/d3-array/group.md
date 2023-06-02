# Grouping data

Group discrete values.

## group(*iterable*, ...*keys*) {#group}

[Examples](https://observablehq.com/@d3/d3-group-d3-rollup) · [Source](https://github.com/d3/d3-array/blob/main/src/group.js) · Groups the specified *iterable* of values into an [InternMap](./intern.md#InternMap) from *key* to array of value. For example, to group the [*penguins* sample dataset](https://observablehq.com/@observablehq/sample-datasets#penguins) by *species* field:

```js
const species = d3.group(penguins, (d) => d.species);
```

To get the elements whose *species* field is *Adelie*:

```js
species.get("Adelie") // Array(152)
```

If more than one *key* is specified, a nested InternMap is returned. For example:

```js
const speciesSex = d3.group(penguins, (d) => d.species, (d) => d.sex)
```

To get the penguins whose species is *Adelie* and whose sex is *FEMALE*:

```js
speciesSex.get("Adelie").get("FEMALE") // Array(73)
```

Elements are returned in the order of the first instance of each *key*.

## groups(*iterable*, ...*keys*) {#groups}

```js
const species = d3.groups(penguins, (d) => d.species); // [["Adelie", Array(152)], …]
```

Equivalent to [group](#group), but returns an array of [*key*, *value*] entries instead of a map. If more than one *key* is specified, each *value* will be a nested array of [*key*, *value*] entries. Elements are returned in the order of the first instance of each *key*.

## rollup(*iterable*, *reduce*, ...*keys*) {#rollup}

[Examples](https://observablehq.com/@d3/d3-group-d3-rollup) · [Source](https://github.com/d3/d3-array/blob/main/src/group.js) · Groups and reduces the specified *iterable* of values into an [InternMap](./intern.md#InternMap) from *key* to reduced value. For example, to group and count the [*penguins* sample dataset](https://observablehq.com/@observablehq/sample-datasets#penguins) by *species* field:

```js
const speciesCount = d3.rollup(penguins, (D) => D.length, (d) => d.species);
```

To get the count of penguins whose species is *Adelie*:

```js
speciesCount.get("Adelie") // 152
```

If more than one *key* is specified, a nested InternMap is returned. For example:

```js
const speciesSexCount = d3.rollup(penguins, (D) => D.length, (d) => d.species, (d) => d.sex);
```

To get the count of penguins whose species is *Adelie* and whose sex is *FEMALE*:

```js
speciesSexCount.get("Adelie").get("FEMALE") // 73
```

Elements are returned in the order of the first instance of each *key*.

## rollups(*iterable*, *reduce*, ...*keys*) {#rollups}

```js
const speciesCounts = d3.rollups(penguins, (D) => D.length, (d) => d.species); // [["Adelie", 152], …]
```

Equivalent to [rollup](#rollup), but returns an array of [*key*, *value*] entries instead of a map. If more than one *key* is specified, each *value* will be a nested array of [*key*, *value*] entries. Elements are returned in the order of the first instance of each *key*.

## index(*iterable*, ...*keys*) {#index}

Uses [rollup](#rollup) with a reducer that extracts the first element from each group, and throws an error if the group has more than one element. For example, to index the [*aapl* same dataset](https://observablehq.com/@observablehq/sample-datasets#aapl) by date:

```js
const aaplDate = d3.index(aapl, (d) => d.Date);
```

You can then quickly retrieve a value by date:

```js
aaplDate.get(new Date("2013-12-31")).Close // 80.145714
```

Elements are returned in input order.

## indexes(*iterable*, ...*keys*) {#indexes}

Like [index](#index), but returns an array of [*key*, *value*] entries instead of a map. This probably isn’t useful for anything, but is included for symmetry with [groups](#groups) and [rollups](#rollups).

## flatGroup(*iterable*, ...*keys*) {#flatGroup}

[Examples](https://observablehq.com/@d3/d3-flatgroup) · [Source](https://github.com/d3/d3-array/blob/main/src/group.js) · Equivalent to [group](#group), but returns a flat array of [*key0*, *key1*, …, *values*] instead of nested maps; useful for iterating over all groups.

## flatRollup(*iterable*, *reduce*, ...*keys*) {#flatRollup}

[Examples](https://observablehq.com/@d3/d3-flatgroup) · [Source](https://github.com/d3/d3-array/blob/main/src/group.js) · Equivalent to [rollup](#rollup), but returns a flat array of [*key0*, *key1*, …, *value*] instead of nested maps; useful for iterating over all groups.

## groupSort(*iterable*, *comparator*, *key*) {#groupSort}

[Examples](https://observablehq.com/@d3/d3-groupsort) · [Source](https://github.com/d3/d3-array/blob/main/src/groupSort.js) · Groups the specified *iterable* of elements according to the specified *key* function, sorts the groups according to the specified *comparator*, and then returns an array of keys in sorted order. For example, to order the species of the [*penguins* sample dataset](https://observablehq.com/@observablehq/sample-datasets#penguins) by ascending median body mass:

```js
d3.groupSort(penguins, (D) => d3.median(D, (d) => d.body_mass_g), (d) => d.species) // ["Adelie", "Chinstrap", "Gentoo"]
```

For descending order, negate the group value:

```js
d3.groupSort(penguins, (D) => -d3.median(D, (d) => d.body_mass_g), (d) => d.species) // ["Gentoo", "Adelie", "Chinstrap"]
```

If a *comparator* is passed instead of an *accessor* (*i.e.*, if the second argument is a function that takes exactly two arguments), it will be asked to compare two groups *a* and *b* and should return a negative value if *a* should be before *b*, a positive value if *a* should be after *b*, or zero for a partial ordering.
