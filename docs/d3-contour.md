<script setup>

import * as Plot from "@observablehq/plot";
import {data as volcano} from "./data/volcano.data.js";
import PlotRender from "./components/PlotRender.js";

</script>

# d3-contour

<div style="margin: 1em 0;">
  <PlotRender :options='{
    axis: null,
    aspectRatio: 1,
    style: "margin: 0;",
    marks: [
      Plot.contour(volcano.values, {
        width: volcano.width,
        height: volcano.height,
        fill: Plot.identity,
        stroke: "black",
        interval: 5
      })
    ]
  }' />
  <a href="https://observablehq.com/@d3/volcano-contours/2?intent=fork" style="font-size: smaller;" target="_blank">Fork ↗︎</a>
</div>

This module computes contour polygons by applying [marching squares](https://en.wikipedia.org/wiki/Marching_squares) to a rectangular grid of numeric values. For example, the contours above show the topography of [Maungawhau](https://en.wikipedia.org/wiki/Maungawhau_/_Mount_Eden).

See one of:

- [Contours](./d3-contour/contour.md)
- [Density estimation](./d3-contour/density.md)
