<script setup>

import * as Plot from "@observablehq/plot";
import PlotRender from "./PlotRender.js";

</script>

<script>

export default {
  props: {
    label: {type: String, optional: true},
    curves: {type: Array, optional: true, default: []},
    points: {type: Array, optional: true, default: [[100, 200], [180, 80], [240, 40], [280, 40], [340, 160], [460, 160], [540, 80], [640, 120], [700, 160], [760, 140], [820, 200]]} // [[100, 200], [340, 200], [460, 160], [460, 120], [420, 80], [580, 40], [820, 40]]
  }
}

</script>

<template>
  <PlotRender :defer='curves.length > 1' :options='{
    aspectRatio: 1,
    axis: null,
    x: {type: "linear", domain: [60, 860]},
    y: {type: "linear", domain: [240, 0]},
    color: curves.length > 1 ? {type: "linear", domain: [0, 1], label, scheme: "purd", range: [0.25, 1], legend: true} : undefined,
    marks: [
      Plot.frame({fill: "currentColor", fillOpacity: 0.08}),
      Plot.gridX({tickSpacing: 20, color: "var(--vp-c-bg)", opacity: 1}),
      Plot.gridY({tickSpacing: 20, color: "var(--vp-c-bg)", opacity: 1}),
      curves.map((curve) => Plot.line(points, {stroke: curves.length > 1 ? curve.tension : undefined, ...curve})),
      Plot.dot(points)
    ]
  }' />
</template>
