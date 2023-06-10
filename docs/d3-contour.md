<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {ref, shallowRef, onMounted} from "vue";
import PlotRender from "./components/PlotRender.js";

const volcano = shallowRef({values: [], width: 0, height: 0});

onMounted(() => {
  d3.json("./data/volcano.json").then((data) => (volcano.value = data));
});

</script>

# d3-contour

<PlotRender defer :options='{
  axis: null,
  aspectRatio: 1,
  marks: [
    Plot.contour(volcano.values, {
      width: volcano.width,
      height: volcano.height,
      fill: Plot.identity,
      interval: 5
    }),
    Plot.contour(volcano.values, {
      width: volcano.width,
      height: volcano.height,
      value: Plot.identity,
      stroke: "black",
      interval: 5
    })
  ]
}' />

This module computes contour polygons by applying [marching squares](https://en.wikipedia.org/wiki/Marching_squares) to a rectangular grid of numeric values. For example, the contours above show the topography of [Maungawhau](https://en.wikipedia.org/wiki/Maungawhau_/_Mount_Eden).

See one of:

- [Contours](./d3-contour/contour.md)
- [Density estimation](./d3-contour/density.md)
