<script setup>

import * as d3 from "d3";
import {ref, onMounted, onUnmounted} from "vue";

const container = ref();
const width = 688;
const height = 540;
const k = width / 200;
const r = d3.randomUniform(k, k * 4);
const nodes = Array.from({length: 200}, () => ({r: r()}));

let simulation;

onMounted(() => {
  const svg = d3.select(container.value)
      .on("touchmove", (event) => event.preventDefault())
      .on("pointerenter", () => simulation.alphaTarget(0.3).restart())
      .on("pointerleave", () => simulation.alphaTarget(0))
      .on("pointermove", (event) => ([nodes[0].fx, nodes[0].fy] = d3.pointer(event)));

  const circle = svg.selectChildren()
    .data(nodes.slice(1))
    .join("circle")
      .attr("r", (d) => d.r);

  simulation = d3.forceSimulation(nodes)
      .velocityDecay(0.1) // low friction
      .force("x", d3.forceX().strength(0.01))
      .force("y", d3.forceY().strength(0.01))
      .force("collide", d3.forceCollide().radius((d) => d.r + 1).iterations(4))
      .force("charge", d3.forceManyBody().strength((d, i) => i ? 0 : -width * 2 / 3))
      .on("tick", ticked);

  function ticked() {
    circle.attr("cx", (d) => d.x);
    circle.attr("cy", (d) => d.y);
  }
});

onUnmounted(() => {
  simulation?.stop();
});

</script>
<template>
  <div style="margin: 1em 0;">
    <svg :width="width" :height="height" :viewBox="[-width / 2, -height / 2, width, height].join(' ')" fill="currentColor" style="overflow: visible; position: relative; z-index: 2; max-width: 100%; height: auto;" ref="container"></svg>
    <a href="https://observablehq.com/@d3/collision-detection/2" style="font-size: smaller;" target="_blank">Fork ↗︎</a>
  </div>
</template>
