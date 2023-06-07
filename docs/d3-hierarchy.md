# d3-hierarchy

Many datasets are intrinsically hierarchical: [geographic entities](https://www.census.gov/programs-surveys/geography/guidance/hierarchy.html), such as census blocks, census tracts, counties and states; the command structure of businesses and governments; file systems; software packages. And even non-hierarchical data may be arranged hierarchically as with [*k*-means clustering](https://en.wikipedia.org/wiki/K-means_clustering) or [phylogenetic trees](https://observablehq.com/@d3/tree-of-life). A good hierarchical visualization facilitates rapid multiscale inference: micro-observations of individual elements and macro-observations of large groups.

This module implements several popular techniques for visualizing hierarchical data:

**Node-link diagrams** show topology using discrete marks for nodes and links, such as a circle for each node and a line connecting each parent and child. The [“tidy” tree](./d3-hierarchy/tree.md) is delightfully compact, while the [dendrogram](./d3-hierarchy/cluster.md) places leaves at the same level. (These have both polar and Cartesian forms.) [Indented trees](https://observablehq.com/@d3/indented-tree) are useful for interactive browsing.

**Adjacency diagrams** show topology through the relative placement of nodes. They may also encode a quantitative dimension in the area of each node, for example to show revenue or file size. The [“icicle” diagram](./d3-hierarchy/partition.md) uses rectangles, while the “sunburst” uses annular segments.

**Enclosure diagrams** also use an area encoding, but show topology through containment. A [treemap](./d3-hierarchy/treemap.md) recursively subdivides area into rectangles. [Circle-packing](./d3-hierarchy/pack.md) tightly nests circles; this is not as space-efficient as a treemap, but perhaps more readily shows topology.

See one of:

- [Hierarchies](./d3-hierarchy/hierarchy.md) - represent and manipulate hierarchical data
- [Stratify](./d3-hierarchy/stratify.md) - organize tabular data into a [hierarchy](./d3-hierarchy/hierarchy.md)
- [Tree](./d3-hierarchy/tree.md) - construct “tidy” tree diagrams of hierarchies
- [Cluster](./d3-hierarchy/cluster.md) - construct tree diagrams that place leaf nodes at the same depth
- [Partition](./d3-hierarchy/partition.md) - construct space-filling adjacency diagrams
- [Pack](./d3-hierarchy/pack.md) - construct enclosure diagrams by tightly nesting circles
- [Treemap](./d3-hierarchy/treemap.md) -  recursively subdivide rectangles by quantitative value
