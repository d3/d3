<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {shallowRef} from "vue";
import PlotRender from "./components/PlotRender.js";

const random = d3.randomNormal.source(d3.randomLcg(42))();
const points = Array.from({length: 1000}, () => [random(), random()]);

</script>

# d3-delaunay

<PlotRender defer :options='{
  axis: null,
  width: 688,
  height: 688,
  x: {domain: [-4, 3.5]},
  y: {domain: [-3, 3.5]},
  marks: [
    Plot.delaunayMesh(points, {stroke: "currentColor", strokeOpacity: 0.3}),
    Plot.voronoiMesh(points, {stroke: "var(--vp-c-brand)", strokeOpacity: 1}),
    Plot.dot(points, {r: 2, fill: "currentColor"}),
  ]
}' />

This is a fast library for computing the [Voronoi diagram](https://en.wikipedia.org/wiki/Voronoi_diagram) of a set of two-dimensional points. It is based on [Delaunator](https://github.com/mapbox/delaunator), a fast library for computing the [Delaunay triangulation](https://en.wikipedia.org/wiki/Delaunay_triangulation) using [sweep algorithms](https://github.com/mapbox/delaunator/blob/main/README.md#papers). The Voronoi diagram is constructed by connecting the circumcenters of adjacent triangles in the Delaunay triangulation.

See one of:

- [Delaunay triangulations](./d3-delaunay/delaunay.md)
- [Voronoi diagrams](./d3-delaunay/voronoi.md)

For an interactive explanation of how this library works, see [The Delaunay’s Dual](https://observablehq.com/@mbostock/the-delaunays-dual).
