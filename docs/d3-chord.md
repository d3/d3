<script setup>

import ColorSpan from "./components/ColorSpan.vue";

</script>

# d3-chord

Chord diagrams represent flow between a set of nodes in a graph, such as transition probabilities between finite states, or people moving between rooms in a house.

This flow is typically represented by a square *matrix* of size *n*×*n*, where *n* is the number of nodes in the graph. Each value *matrix*[*i*][*j*] represents the flow from the *i*th node to the *j*th node. (Each number *matrix*[*i*][*j*] must be nonnegative, though it can be zero if there is no flow from node *i* to node *j*.)

For example, here is a fake dataset from [Circos](http://circos.ca/guide/tables/) which describes a population of people who dyed their hair. Each row and column represents a hair color (<ColorSpan color="black" />, <ColorSpan color="#ffdd89" text="blond" />, <ColorSpan color="#957244" text="brown" />, <ColorSpan color="#f26223" text="red" />); each value represents a number of people who dyed their hair from one color to another color. For example, 5,871 people had <ColorSpan color="black" /> hair and dyed it <ColorSpan color="#ffdd89" text="blond" />, while 1,951 people had <ColorSpan color="#ffdd89" text="blond" /> hair and dyed it <ColorSpan color="black" />. The matrix diagonal represents people who kept the same color.

```js
const matrix = [
  // to black, blond, brown, red
  [11975,  5871, 8916, 2868], // from black
  [ 1951, 10048, 2060, 6171], // from blond
  [ 8010, 16145, 8090, 8045], // from brown
  [ 1013,   990,  940, 6907]  // from red
];
```

We can visualize these color transitions by [arranging](./d3-chord/chord.md) the population by starting color along the circumference of a circle and drawing [ribbons](./d3-chord/ribbon.md) between each color. The starting and ending width of the ribbon is proportional to the number of people that had the respective starting and ending color. The color of the ribbon, arbitrarily, is the color with the larger of the two values.

[<img alt="Chord Diagram" src="https://raw.githubusercontent.com/d3/d3-chord/master/img/chord.png" width="480" height="480">](https://observablehq.com/@d3/chord-diagram)

See one of:

- [Chords](./d3-chord/chord.md) - a layout for chord diagrams
- [Ribbons](./d3-chord/ribbon.md) - a shape primitive for chord diagrams
