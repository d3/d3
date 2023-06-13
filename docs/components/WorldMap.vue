<script setup>

import * as d3 from "d3";
import * as topojson from "topojson-client";
import deferRender from "./deferRender.js";

</script>
<script>

const outline = {type: "Sphere"};
const graticule = d3.geoGraticule10();

let landPromises = {};

async function render(node, {projection, rotate, resolution, width, feature}) {
  feature = await feature;
  rotate = rotate && resolution === "110m" && projection.rotate();
  const path = d3.geoPath(projection);
  const svg = d3.select(node);
  let frame;
  let x0 = 0;
  let x1 = 0;
  function update() {
    svg.selectAll("[name='outline']").attr("d", path(outline));
    svg.selectAll("[name='graticule']").attr("d", path(graticule));
    svg.selectAll("[name='feature']").attr("d", path(feature));
  }
  svg
    .on("pointerenter", rotate && ((event) => {
      const dx = x1 - x0;
      ([x1] = d3.pointer(event));
      x0 = x1 - dx; // don’t jump on pointerenter
    }))
    .on("pointermove", rotate && ((event) => {
      if (!frame) frame = requestAnimationFrame(rerender);
      ([x1] = d3.pointer(event));
    }));
  function rerender() {
    frame = null;
    projection.rotate([rotate[0] + (x1 - x0) / width * 20, rotate[1], rotate[2]]);
    update();
  }
  update();
}

export default {
  props: {
    projection: {type: Function},
    land: {type: Boolean, default: true},
    rotate: {type: Boolean, default: false},
    resolution: {type: String, default: "110m"},
    width: {type: Number, default: 688},
    height: {type: Number, default: 400},
  },
  mounted() {
    if (this.land) this.feature = landPromises[this.resolution] ??= d3
      .json(`https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/land-${this.resolution}.json`)
      .then((world) => topojson.feature(world, world.objects.land));
    this.disconnect = deferRender(this.$el, async () => render(this.$el, this));
  },
  updated() {
    render(this.$el, this);
  },
  unmounted() {
    if (this.disconnect) this.disconnect();
  }
}

</script>
<template>
  <svg :width="width" :height="height" :viewBox="[0, 0, width, height].join(' ')" style="max-width: 100%; height: auto;">
    <path name="outline" fill="var(--vp-c-bg-alt)" />
    <path name="graticule" stroke="currentColor" stroke-opacity="0.2" fill="none" />
    <path name="feature" fill="currentColor" />
    <path name="outline" stroke="currentColor" fill="none" />
  </svg>
</template>
