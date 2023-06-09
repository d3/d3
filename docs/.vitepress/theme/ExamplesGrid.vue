<script setup>

import * as d3 from "d3";
import {ref, shallowRef, onMounted, onUnmounted} from "vue";
import {data} from "./gallery.data.js";

let observer;

const n = 60; // maximum number of examples to show
const slice = d3.shuffler(d3.randomLcg(d3.utcDay()))(data.slice()).slice(0, n);
const sample = shallowRef(slice.slice(0, 55)); // initial guess
const container = ref();
const x = ref(720);
const width = ref(1440);

function onpointermove(event) {
  x.value = event.clientX;
}

onMounted(() => {
  observer = new ResizeObserver(() => {
    const m = getComputedStyle(container.value).gridTemplateColumns.split(" ").length;
    sample.value = slice.slice(0, Math.min(Math.min(6, n / m) * m, n - (n % m)));
    width.value = document.body.clientWidth;
  });
  observer.observe(document.body);
  addEventListener("pointermove", onpointermove);
});

onUnmounted(() => {
  observer.disconnect();
  removeEventListener("pointermove", onpointermove);
});

</script>

<template>
  <div style="margin-left: -100px; margin-right: -100px;">
    <div :class="$style.examples" ref="container" :style="`transform: perspective(75em) rotateX(35deg) rotateZ(-7deg) translateX(${width / 6 - x / 10}px) translateY(-100px) scale(1.4);`">
      <a v-for="d in sample" :href="`https://observablehq.com/${d.path}`" :title="[d.title, d.author].join('\n')" target="_blank">
        <img :src="`https://static.observableusercontent.com/thumbnail/${d.thumbnail}.jpg`" style="object-fit: cover;" width="640" height="400" />
      </a>
    </div>
  </div>
</template>

<style module>

.examples {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  padding: 4px;
  grid-gap: 4px;
  position: relative;
  background: #e3e3e5;
  border: solid 1px currentColor;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  will-change: transform;
  transition: transform 150ms ease-out;
}

.examples a {
  will-change: transform;
  transition: transform 250ms ease;
  border: solid 1px transparent;
  margin: -2px;
}

.examples a:hover {
  border: solid 1px black;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  position: relative;
  transform: perspective(75em) translateZ(100px);
  z-index: 2;
}

</style>
