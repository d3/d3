<script setup>

import * as d3 from "d3";

</script>
<script>

const width = 688;
const height = 40;

async function render(node) {
  const now = new Date();
  const then = new Date(2011, 0, 1);
  const yesterday = +now - 86400000;
  const x = d3.scaleTime([then, now], [20, width - 20]);
  const axis = d3.axisBottom(x).ticks(8).tickSizeOuter(0);
  let transition;
  const g = d3.select(node)
    .call(axis)
    .on("click", async function () {
      if (!transition) {
        const [a] = x.domain();
        const d = d3.interpolate([a, now], [+a === +then ? yesterday : then, now]);
        const ease = +a === +then ? d3.easePolyOut.exponent(3) : d3.easePolyIn.exponent(3);
        transition = g
          .transition()
          .duration(15000)
          .ease(ease)
          .tween("axis", () => (t) => (x.domain(d(t)), g.call(axis)));
        await transition.end();
        transition = null;
      }
    });
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
  </div>
</template>
