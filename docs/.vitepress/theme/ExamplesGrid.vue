<script setup>

import * as d3 from "d3";
import {ref, shallowRef, onMounted, onUnmounted} from "vue";
import {data} from "./gallery.data.js";

let observer;
let pointerframe;
let clientX;

const n = 60; // maximum number of examples to show
const slice = d3.shuffler(d3.randomLcg(d3.utcDay()))(data.slice()).slice(0, n);
const sample = shallowRef(slice.slice(0, 55)); // initial guess
const container = ref();
const xn = ref(10); // number of rows
const yn = ref(5); // number of columns
const x = ref(0.5); // normalized horizontal pointer position

// Some browsers trigger pointermove more frequently than desirable, so we
// debounce events for a smooth transitions.
function onpointermove(event) {
  if (!pointerframe) pointerframe = requestAnimationFrame(afterpointermove);
  clientX = event.clientX;
}

function afterpointermove() {
  pointerframe = null;
  x.value = clientX / document.body.clientWidth;
}

onMounted(() => {
  observer = new ResizeObserver(() => {
    const w = parseFloat(getComputedStyle(container.value).getPropertyValue("--grid-width"));
    xn.value = Math.ceil(document.body.clientWidth / w) + 3; // overflow columns
    yn.value = Math.min(Math.round(640 / w + 2), Math.floor(n / xn.value)); // 640 is grid height
    sample.value = slice.slice(0, yn.value * xn.value);
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
  <div :class="$style.examples" ref="container" :style="`transform: translate(${60 - x * 10}vw, 33%);`">
    <div v-for="(d, i) in sample" :style="`--delay: ${((i % xn) / xn + (d3.randomLcg(1 / i)()) - 0.4) * 1}s;`">
      <a :href="`https://observablehq.com/${d.path}`" :title="[d.title, d.author].join('\n')" target="_blank" :style="`--x: ${(i % xn) - xn / 2 + (Math.floor(i / xn) % 2) * 0.5}; --y: ${Math.floor(i / xn) - yn / 2};`">
        <img :src="`https://static.observableusercontent.com/thumbnail/${d.thumbnail}.jpg`" width="640" height="400" />
      </a>
    </div>
  </div>
</template>

<style module>

.examples {
  position: relative;
  height: 640px;
  transition: transform 150ms ease-out;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
  --grid-width: 140px;
}

@media (min-width: 640px) {
  .examples {
    --grid-width: 160px;
  }
}

@media (min-width: 960px) {
  .examples {
    --grid-width: 200px;
  }
}

/* The drop-shadow should not be affected by the hexagon clip-path. */
.examples div {
  position: relative;
  transition: filter 250ms ease-out;
  animation: fade-in 350ms cubic-bezier(0.215, 0.610, 0.355, 1.000) var(--delay) backwards;
}

.examples div:hover {
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4));
  z-index: 3;
}

.examples a {
  position: absolute;
  --transform: perspective(75em) rotateX(30deg) rotateZ(-7deg) translate(calc(var(--x) * 100%), calc(var(--y) * 86.67%)) scale(1.145);
  transform: var(--transform);
  animation: drop-in 350ms cubic-bezier(0.215, 0.610, 0.355, 1.000) var(--delay) backwards;
  transition: transform 250ms ease-out;
  clip-path: polygon(50.0% 100.0%, 93.3% 75.0%, 93.3% 25.0%, 50.0% 0.0%, 6.7% 25.0%, 6.7% 75.0%);
}

.examples a:hover {
  transform: var(--transform) translateZ(10px) scale(1.1);
}

.examples img {
  aspect-ratio: 1;
  object-fit: cover;
  width: var(--grid-width);
}

@keyframes fade-in {
  from {
    filter: blur(20px);
    opacity: 0;
  }
  to {
    filter: none;
    opacity: 1;
  }
}

@keyframes drop-in {
  from {
    transform: var(--transform) translateY(-100px) translateZ(400px);
  }
  to {
    transform: var(--transform);
  }
}

</style>
