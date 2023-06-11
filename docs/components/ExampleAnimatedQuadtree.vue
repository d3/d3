<script setup>

import * as d3 from "d3";
import quadtree_visitQuad from "./quadtreeVisitQuad.js";

</script>
<script>

const width = 688;
const height = width;

async function render(node, {points}) {
  const svg = d3.select(node);
  const g = svg.append("g").attr("stroke", "currentColor").attr("fill", "none");
  const tree = d3.quadtree([], (i) => points[i][0], (i) => points[i][1]);
  tree.cover(d3.min(points, ([x]) => x), d3.min(points, ([, y]) => y));
  tree.cover(d3.max(points, ([x]) => x), d3.max(points, ([, y]) => y));
  const x = d3.scaleLinear([tree._x0, tree._x1], [0.5, width - 0.5]);
  const y = d3.scaleLinear([tree._y0, tree._y1], [height - 0.5, 0.5]);
  const nodes = new Set();
  for (let i = 0; i < points.length; ++i) {
    tree.add(i);
    let t = svg.transition();
    svg.append("circle")
        .attr("fill", "currentColor")
        .attr("stroke", "var(--vp-c-bg-alt)")
        .attr("cx", x(points[i][0]))
        .attr("cy", y(points[i][1]))
        .attr("r", 0)
      .transition(t)
        .attr("r", 2.5);
    quadtree_visitQuad.call(tree, (node, x0, y0, x1, y1, quad) => {
      const key = [x0, y0, x1, y1].join();
      if (nodes.has(key)) return;
      nodes.add(key);
      switch (quad) {
        case 0: { // top-left
          g.append("line").attr("x1", x(x1)).attr("y1", y(y1)).attr("x2", x(x1)).attr("y2", y(y1)).transition(t).attr("y1", y(y0));
          g.append("line").attr("x1", x(x1)).attr("y1", y(y1)).attr("x2", x(x1)).attr("y2", y(y1)).transition(t).attr("x1", x(x0));
          break;
        }
        case 1: { // top-right
          g.append("line").attr("x1", x(x0)).attr("y1", y(y1)).attr("x2", x(x0)).attr("y2", y(y1)).transition(t).attr("y1", y(y0));
          g.append("line").attr("x1", x(x0)).attr("y1", y(y1)).attr("x2", x(x0)).attr("y2", y(y1)).transition(t).attr("x2", x(x1));
          break;
        }
        case 2: { // bottom-left
          g.append("line").attr("x1", x(x1)).attr("y1", y(y0)).attr("x2", x(x1)).attr("y2", y(y0)).transition(t).attr("y2", y(y1));
          g.append("line").attr("x1", x(x1)).attr("y1", y(y0)).attr("x2", x(x1)).attr("y2", y(y0)).transition(t).attr("x1", x(x0));
          break;
        }
        case 3: { // bottom-right
          g.append("line").attr("x1", x(x0)).attr("y1", y(y0)).attr("x2", x(x0)).attr("y2", y(y0)).transition(t).attr("y2", y(y1));
          g.append("line").attr("x1", x(x0)).attr("y1", y(y0)).attr("x2", x(x0)).attr("y2", y(y0)).transition(t).attr("x2", x(x1));
          break;
        }
        case undefined: { // root
          g.append("rect").attr("x", x(x0)).attr("y", y(y1)).attr("width", x(x1) - x(x0)).attr("height", y(y0) - y(y1));
          break;
        }
      }
    });
    await new Promise((resolve) => setTimeout(resolve, 100));
    if (!node.isConnected) return;
  }
}

export default {
  props: {
    points: {type: Array, default: []},
  },
  mounted() {
    render(this.$el.querySelector("svg"), this);
  }
}

</script>
<template>
  <div style="margin: 1em 0;">
    <svg :width="width" :height="height" :viewBox="[0, 0, width, height].join(' ')" style="max-width: 100%; height: auto;"></svg>
    <a href="https://observablehq.com/@d3/animated-quadtree?intent=fork" style="font-size: smaller;" target="_blank">Fork ↗︎</a>
  </div>
</template>
