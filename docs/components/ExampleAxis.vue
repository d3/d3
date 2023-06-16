<script setup>

import * as d3 from "d3";
import {defineProps, ref, onMounted, onUpdated} from "vue";

const props = defineProps({
  axis: true,
  width: {type: Number, default: 688},
  height: {type: Number, default: 30},
  x: {type: Number, default: 0},
  y: {type: Number, default: 0},
  duration: {type: Number, default: 250}
});

const g = ref();

onMounted(() => {
  d3.select(g.value).call(props.axis);
});

onUpdated(() => {
  d3.select(g.value).transition().duration(props.duration).call(props.axis);
});

</script>
<template>
  <div style="margin: 1em 0;">
    <svg :width="width" :height="height" :viewBox="[0, 0, width, height].join(' ')" style="max-width: 100%; height: auto;">
      <g :transform="`translate(${x},${y})`" ref="g"></g>
    </svg>
  </div>
</template>
