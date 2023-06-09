<script setup>

import * as d3 from "d3";
import {ref, onMounted, onUnmounted} from "vue";

const container = ref();

let simulation;

onMounted(() => {
  const width = 688;
  const height = 540;
  const k = width / 200;
  const r = d3.randomUniform(k, k * 4);
  const nodes = Array.from({length: 200}, () => ({r: r()}));

  const svg = d3.select(container.value).append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("fill", "currentColor")
      .attr("style", "overflow: visible; position: relative; z-index: 2;")
      .on("touchmove", event => event.preventDefault())
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
  <div style="margin: 1em 0;" ref="container"></div>
</template>
