<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import PlotRender from "./PlotRender.js";

const ticks = d3.ticks(0, 1, 500);

</script>

<script>

export default {
  props: {
    label: {type: String, optional: true},
    eases: {type: Array, optional: true, default: []}
  }
}

</script>

<template>
  <PlotRender :defer='eases.length > 1' :options='{
    aspectRatio: 4,
    axis: null,
    x: {type: "linear", domain: [0, 1]},
    y: {type: "linear", domain: [0, 1]},
    color: eases.length > 1 ? {type: "linear", label, scheme: "purd", range: [0.25, 1], legend: true} : undefined, // TODO domain
    marks: [
      Plot.frame({fill: "currentColor", fillOpacity: 0.08}),
      Plot.gridX({tickSpacing: 20, color: "var(--vp-c-bg)", opacity: 1}),
      Plot.gridY({tickSpacing: 20, color: "var(--vp-c-bg)", opacity: 1}),
      eases.map((ease) => Plot.lineX(ticks, ease))
    ]
  }' />
</template>
