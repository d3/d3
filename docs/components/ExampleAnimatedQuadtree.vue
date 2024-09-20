<script setup>

import * as d3 from "d3";
import quadtree_visitParent from "./quadtreeVisitParent.js";

</script>
<script>

const width = 688;
const height = width;

async function render(node, {points}) {
  const tree = d3.quadtree([], (i) => points[i][0], (i) => points[i][1]);
  tree.cover(d3.min(points, ([x]) => x), d3.min(points, ([, y]) => y));
  tree.cover(d3.max(points, ([x]) => x), d3.max(points, ([, y]) => y));
  const x = d3.scaleLinear([tree._x0, tree._x1], [0.5, width - 0.5]);
  const y = d3.scaleLinear([tree._y0, tree._y1], [height - 0.5, 0.5]);
  const svg = d3.select(node);
  const g = svg.append("g").attr("stroke", "currentColor").attr("fill", "none");
  g.append("rect").attr("x", x(tree._x0)).attr("y", y(tree._y1)).attr("width", x(tree._x1) - x(tree._x0)).attr("height", y(tree._y0) - y(tree._y1));
  const nodes = new Set();
  for (let i = 0; i < points.length; ++i) {
    tree.add(i);
    let t = svg.transition();
    svg.append("circle").attr("fill", "currentColor").attr("stroke", "var(--vp-c-bg-alt)").attr("cx", x(points[i][0])).attr("cy", y(points[i][1])).attr("r", 0).transition(t).attr("r", 2.5);
    quadtree_visitParent.call(tree, (x0, y0, x1, y1) => {
      const key = [x0, y0, x1, y1].join();
      if (nodes.has(key)) return;
      nodes.add(key);
      t = t.transition();
      const xm = (x0 + x1) / 2;
      const ym = (y0 + y1) / 2;
      g.append("line").attr("x1", x(xm)).attr("y1", y(ym)).attr("x2", x(xm)).attr("y2", y(ym)).transition(t).attr("x1", x(x0));
      g.append("line").attr("x1", x(xm)).attr("y1", y(ym)).attr("x2", x(xm)).attr("y2", y(ym)).transition(t).attr("x2", x(x1));
      g.append("line").attr("x1", x(xm)).attr("y1", y(ym)).attr("x2", x(xm)).attr("y2", y(ym)).transition(t).attr("y1", y(y0));
      g.append("line").attr("x1", x(xm)).attr("y1", y(ym)).attr("x2", x(xm)).attr("y2", y(ym)).transition(t).attr("y2", y(y1));
    });
    await t.end();
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
    <a href="https://observablehq.com/@d3/animated-quadtree" style="font-size: smaller;" target="_blank">Fork ↗︎</a>
  </div>
</template>
