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
const x = ref(720);

// Some browsers trigger pointermove more frequently than desirable, so we
// debounce events for a smooth transitions.
function onpointermove(event) {
  if (!pointerframe) pointerframe = requestAnimationFrame(afterpointermove);
  clientX = event.clientX;
}

function afterpointermove() {
  pointerframe = null;
  x.value = clientX;
}

onMounted(() => {
  observer = new ResizeObserver(() => {
    xn.value = Math.ceil(document.body.clientWidth / 200) + 3;
    yn.value = Math.min(5, Math.floor(n / xn.value));
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
  <div :class="$style.examples" ref="container" :style="`transform: translate(${60 - x / 100}vw, 30%);`">
    <a v-for="(d, i) in sample" :href="`https://observablehq.com/${d.path}`" :title="[d.title, d.author].join('\n')" target="_blank" :style="`--x: ${(i % xn) - xn / 2 + (Math.floor(i / xn) % 2) * 0.5}; --y: ${Math.floor(i / xn) - yn / 2}; animation-delay: ${((i % xn) / xn + (d3.randomLcg(1 / i)()) - 0.4) * 1}s;`">
      <img :src="`https://static.observableusercontent.com/thumbnail/${d.thumbnail}.jpg`" width="640" height="400" />
    </a>
  </div>
</template>

<style module>

.examples {
  position: relative;
  height: 640px;
  transition: transform 150ms ease-out;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
}

.examples a {
  position: absolute;
  --transform: perspective(75em) rotateX(30deg) rotateZ(-7deg) translate(calc(var(--x) * 100%), calc(var(--y) * 86.67%)) scale(1.145);
  transform: var(--transform);
  animation: drop-in 350ms cubic-bezier(0.215, 0.610, 0.355, 1.000) backwards;
  transition: transform 250ms ease-out, filter 250ms ease-out;
}

.examples a:hover {
  transform: var(--transform) translateZ(10px) scale(1.1);
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4));
  z-index: 3;
}

.examples img {
  aspect-ratio: 1;
  object-fit: cover;
  clip-path: polygon(50.0% 100.0%, 93.3% 75.0%, 93.3% 25.0%, 50.0% 0.0%, 6.7% 25.0%, 6.7% 75.0%);
  width: 200px;
}

@keyframes drop-in {
  from {
    transform: var(--transform) translateZ(500px);
    filter: blur(20px);
    opacity: 0;
  }
  to {
    transform: var(--transform);
    filter: none;
    opacity: 1;
  }
}

</style>
