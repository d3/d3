<script setup>

import * as d3 from "d3";
import {ref, onMounted, onUnmounted} from "vue";

const dataPromise = d3.json("https://static.observableusercontent.com/files/e3680d5f766e85edde560c9c31a6dba2ddfcf2f66e1dced4afa18d8040f1f205e0bde1b8b234d866373f2bfc5806fafc47e244c5c9f48b60aaa1917c1b80fcb7");

const gnode = ref();
const glink = ref();
const width = 688;
const height = 640;
const scale = d3.scaleOrdinal(["var(--vp-c-brand)", "currentColor"]);
const color = (d) => scale(d.group);

let simulation;

onMounted(async () => {
  const {links, nodes} = await dataPromise;

  const link = d3.select(glink.value)
    .selectAll("line")
    .data(links)
    .join("line")
      .attr("stroke-width", (d) => Math.sqrt(d.value));

  const node = d3.select(gnode.value)
    .selectAll("circle")
    .data(nodes)
    .join("circle")
      .attr("r", 5)
      .attr("fill", color)
      .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

  node.append("title")
      .text((d) => d.id);

  simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id((d) => d.id))
      .force("charge", d3.forceManyBody())
      .force("x", d3.forceX())
      .force("y", d3.forceY())
      .on("tick", ticked);

  function ticked() {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
  }

  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event,d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragended(event,d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
});

onUnmounted(() => {
  simulation?.stop();
});

</script>
<template>
  <div style="margin: 1em 0;">
    <svg :width="width" :height="height" :viewBox="[-width / 2, -height / 2, width, height].join(' ')" fill="currentColor" style="overflow: visible; position: relative; z-index: 2; max-width: 100%; height: auto;">
      <g ref="glink" stroke="currentColor" stroke-opacity="0.5"></g>
      <g ref="gnode" stroke="var(--vp-c-bg-alt)" stroke-width="1.5"></g>
    </svg>
    <a href="https://observablehq.com/@d3/disjoint-force-directed-graph/2" style="font-size: smaller;" target="_blank">Fork ↗︎</a>
  </div>
</template>
