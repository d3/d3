<script setup>

import * as d3 from "d3";
import {ref, onMounted, onUnmounted} from "vue";

const container = ref();
const width = 688;
const height = 540;

const n = 20;
const nodes = Array.from({length: n * n}, (_, i) => ({index: i}));
const links = [];

for (let y = 0; y < n; ++y) {
  for (let x = 0; x < n; ++x) {
    if (y > 0) links.push({source: (y - 1) * n + x, target: y * n + x});
    if (x > 0) links.push({source: y * n + (x - 1), target: y * n + x});
  }
}

let simulation;

const drag = d3.drag()
    .subject(({x, y}) => simulation.find(x - width / 2, y - height / 2, 40))
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);

function dragstarted(event) {
  if (!event.active) simulation.alphaTarget(0.3).restart();
  event.subject.fx = event.subject.x;
  event.subject.fy = event.subject.y;
}

function dragged(event) {
  event.subject.fx = event.x;
  event.subject.fy = event.y;
}

function dragended(event) {
  if (!event.active) simulation.alphaTarget(0);
  event.subject.fx = null;
  event.subject.fy = null;
}

onMounted(() => {
  const svg = d3.select(container.value)
      .call(drag);

  simulation = d3.forceSimulation(nodes)
      .force("charge", d3.forceManyBody().strength(-40))
      .force("link", d3.forceLink(links).strength(1).distance(10).iterations(10))
      .force("x", d3.forceX())
      .force("y", d3.forceY())
      .on("tick", ticked);

  const link = svg.append("g")
      .attr("stroke", "currentColor")
      .attr("stroke-opacity", 0.3)
    .selectAll()
    .data(links)
    .join("line");

  const node = svg.append("g")
      .attr("fill", "currentColor")
      .attr("stroke", "var(--vp-c-bg-alt)")
    .selectAll()
    .data(nodes)
    .join("circle")
      .attr("r", 2.5);

  function ticked() {
    node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    link.attr("x1", (d) => d.source.x).attr("y1", (d) => d.source.y);
    link.attr("x2", (d) => d.target.x).attr("y2", (d) => d.target.y);
  }
});

onUnmounted(() => {
  simulation?.stop();
});

</script>
<template>
  <div style="margin: 1em 0;">
    <svg :width="width" :height="height" :viewBox="[-width / 2, -height / 2, width, height].join(' ')" fill="currentColor" style="overflow: visible; position: relative; z-index: 2; max-width: 100%; height: auto;" ref="container"></svg>
    <a href="https://observablehq.com/@d3/force-directed-lattice" style="font-size: smaller;" target="_blank">Fork ↗︎</a>
  </div>
</template>
