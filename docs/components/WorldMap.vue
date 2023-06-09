<script setup>

import * as d3 from "d3";
import * as topojson from "topojson-client";
import deferRender from "./deferRender.js";

</script>
<script>

const outline = {type: "Sphere"};
const graticule = d3.geoGraticule10();

let landPromise;
let disconnect;

async function render(node, {projection}) {
  const land = await landPromise;
  const path = d3.geoPath(projection);
  const svg = d3.select(node);
  svg.selectAll("[name='outline']").attr("d", path(outline));
  svg.selectAll("[name='graticule']").attr("d", path(graticule));
  svg.selectAll("[name='feature']").attr("d", path(land));
}

export default {
  props: {
    projection: {type: Function},
    width: {type: Number, default: 688},
    height: {type: Number, default: 400},
  },
  mounted() {
    landPromise ??= d3
      .json("https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/land-110m.json")
      .then((world) => topojson.feature(world, world.objects.land));
    disconnect = deferRender(this.$el, () => render(this.$el, this));
  },
  updated() {
    render(this.$el, this);
  },
  unmounted() {
    if (disconnect) disconnect();
  }
}

</script>
<template>
  <svg :width="width" :height="height">
    <path name="outline" fill="var(--vp-c-bg-alt)" />
    <path name="graticule" stroke="currentColor" stroke-opacity="0.2" fill="none" />
    <path name="feature" fill="currentColor" />
    <path name="outline" stroke="currentColor" fill="none" />
  </svg>
</template>
