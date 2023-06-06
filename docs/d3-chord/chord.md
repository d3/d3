# Chords

Chord diagrams represent flow between a set of nodes in a graph, such as transition probabilities between finite states, or people moving between rooms in a house.

This flow is typically represented by a square *matrix* of size *n*×*n*, where *n* is the number of nodes in the graph. Each value *matrix*[*i*][*j*] represents the flow from the *i*th node to the *j*th node. (Each number *matrix*[*i*][*j*] must be nonnegative, though it can be zero if there is no flow from node *i* to node *j*.)

For example, here is a fake dataset from [Circos](http://circos.ca/guide/tables/) which describes a population of people who dyed their hair. Each row and column represents a hair color (<span style="border-bottom: solid 2px black;">*black*</span>, <span style="border-bottom: solid 2px #ffdd89;">*blond*</span>, <span style="border-bottom: solid 2px #957244;">*brown*</span>, <span style="border-bottom: solid 2px #f26223;">*red*</span>); each value represents a number of people who dyed their hair from one color to another color. For example, 5,871 people had <span style="border-bottom: solid 2px black;">*black*</span> hair and dyed it <span style="border-bottom: solid 2px #ffdd89;">*blond*</span>, while 1,951 people had <span style="border-bottom: solid 2px #ffdd89;">*blond*</span> hair and dyed it <span style="border-bottom: solid 2px black;">*black*</span>. The matrix diagonal represents people who kept the same color.

```js
const matrix = [
  // to black, blond, brown, red
  [11975,  5871, 8916, 2868], // from black
  [ 1951, 10048, 2060, 6171], // from blond
  [ 8010, 16145, 8090, 8045], // from brown
  [ 1013,   990,  940, 6907]  // from red
];
```

We can visualize these transitions by arranging the population by starting color along the circumference of a circle and drawing [ribbons](./ribbon.md) between each color. The starting and ending width of the ribbon is proportional to the number of people that had the respective starting and ending color. The color of the ribbon, arbitrarily, is the color with the larger of the two values.

[<img alt="Chord Diagram" src="https://raw.githubusercontent.com/d3/d3-chord/master/img/chord.png" width="480" height="480">](https://observablehq.com/@d3/chord-diagram)

The angles of the above chord diagram are computed by the [chord layout](#chord).

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
