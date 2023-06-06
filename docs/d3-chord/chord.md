# Chords

The chord layout computes angles to generate a [chord diagram](../d3-chord.md).

## chord() {#chord}

[Source](https://github.com/d3/d3-chord/blob/main/src/chord.js) · Constructs a new chord layout with the default settings.

```js
const chord = d3.chord();
```

## *chord*(*matrix*) {#_chord}

[Source](https://github.com/d3/d3-chord/blob/main/src/chord.js) · Computes the chord layout for the specified square *matrix* of size *n*×*n*, where the *matrix* represents the directed flow amongst a network (a complete digraph) of *n* nodes.

The return value of *chord*(*matrix*) is an array of *chords*, where each chord represents the combined bidirectional flow between two nodes *i* and *j* (where *i* may be equal to *j*) and is an object with the following properties:

* `source` - the source subgroup
* `target` - the target subgroup

Each source and target subgroup is also an object with the following properties:

* `startAngle` - the start angle in radians
* `endAngle` - the end angle in radians
* `value` - the flow value *matrix*[*i*][*j*]
* `index` - the node index *i*

The chords are typically passed to [ribbon](./ribbon.md) to display the network relationships.

The returned array includes only chord objects for which the value *matrix*[*i*][*j*] or *matrix*[*j*][*i*] is non-zero. Furthermore, the returned array only contains unique chords: a given chord *ij* represents the bidirectional flow from *i* to *j* *and* from *j* to *i*, and does not contain a duplicate chord *ji*; *i* and *j* are chosen such that the chord’s source always represents the larger of *matrix*[*i*][*j*] and *matrix*[*j*][*i*].

The *chords* array also defines a secondary array of length *n*, *chords*.groups, where each group represents the combined outflow for node *i*, corresponding to the elements *matrix*[*i*][0 … *n* - 1], and is an object with the following properties:

* `startAngle` - the start angle in radians
* `endAngle` - the end angle in radians
* `value` - the total outgoing flow value for node *i*
* `index` - the node index *i*

The groups are typically passed to [arc](../d3-shape/arc.md) to produce a donut chart around the circumference of the chord layout.

## *chord*.padAngle(*angle*) {#chord_padAngle}

[Source](https://github.com/d3/d3-chord/blob/main/src/chord.js) · If *angle* is specified, sets the pad angle between adjacent groups to the specified number in radians and returns this chord layout. If *angle* is not specified, returns the current pad angle, which defaults to zero.

## *chord*.sortGroups(*compare*) {#chord_sortGroups}

[Source](https://github.com/d3/d3-chord/blob/main/src/chord.js) · If *compare* is specified, sets the group comparator to the specified function or null and returns this chord layout. If *compare* is not specified, returns the current group comparator, which defaults to null. If the group comparator is non-null, it is used to sort the groups by their total outflow. See also [ascending](../d3-array/sort.md#ascending) and [descending](../d3-array/sort.md#descending).

## *chord*.sortSubgroups(*compare*) {#chord_sortSubgroups}

[Source](https://github.com/d3/d3-chord/blob/main/src/chord.js) · If *compare* is specified, sets the subgroup comparator to the specified function or null and returns this chord layout. If *compare* is not specified, returns the current subgroup comparator, which defaults to null. If the subgroup comparator is non-null, it is used to sort the subgroups corresponding to *matrix*[*i*][0 … *n* - 1] for a given group *i* by their total outflow. See also [ascending](../d3-array/sort.md#ascending) and [descending](../d3-array/sort.md#descending).

## *chord*.sortChords(*compare*) {#chord_sortChords}

[Source](https://github.com/d3/d3-chord/blob/main/src/chord.js) · If *compare* is specified, sets the chord comparator to the specified function or null and returns this chord layout. If *compare* is not specified, returns the current chord comparator, which defaults to null. If the chord comparator is non-null, it is used to sort the [chords](#_chord) by their combined flow; this only affects the *z*-order of the chords. See also [ascending](../d3-array/sort.md#ascending) and [descending](../d3-array/sort.md#descending).

## chordDirected() {#chordDirected}

[Examples](https://observablehq.com/@d3/directed-chord-diagram) · [Source](https://github.com/d3/d3-chord/blob/main/src/chord.js) · A chord layout for unidirectional flows. The chord from *i* to *j* is generated from the value in *matrix*[*i*][*j*] only.

## chordTranspose() {#chordTranspose}

[Source](https://github.com/d3/d3-chord/blob/main/src/chord.js) · A transposed chord layout. Useful to highlight outgoing (rather than incoming) flows.
