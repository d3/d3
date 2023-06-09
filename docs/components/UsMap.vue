<script setup>

import * as d3 from "d3";
import * as topojson from "topojson-client";
import deferRender from "./deferRender.js";

</script>
<script>

let objectsPromise;

async function render(node, {projection}) {
  const {statemesh, countymesh, nation} = await objectsPromise;
  const path = d3.geoPath(projection);
  const svg = d3.select(node);
  svg.selectAll("[name='countymesh']").attr("d", path(countymesh));
  svg.selectAll("[name='statemesh']").attr("d", path(statemesh));
  svg.selectAll("[name='nation']").attr("d", path(nation));
}

export default {
  props: {
    projection: {type: Function},
    width: {type: Number, default: 688},
    height: {type: Number, default: 400},
  },
  mounted() {
    objectsPromise ??= d3 // TODO counties, states?
      .json(`https://cdn.jsdelivr.net/npm/us-atlas@3.0.1/counties-10m.json`)
      .then((us) => ({
        nation: topojson.feature(us, us.objects.nation),
        statemesh: topojson.mesh(us, us.objects.states, (a, b) => a !== b),
        countymesh: topojson.mesh(us, us.objects.counties, (a, b) => a !== b && (a.id / 1000 | 0) === (b.id / 1000 | 0)),
      }));
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
    <path name="nation" stroke="currentColor" fill="var(--vp-c-bg-alt)" />
    <path name="statemesh" fill="none" stroke="currentColor" stroke-width="0.5" />
    <path name="countymesh" fill="none" stroke="currentColor" stroke-width="0.5" stroke-opacity="0.5" />
  </svg>
</template>
