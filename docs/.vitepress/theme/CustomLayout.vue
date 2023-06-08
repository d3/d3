<script setup>

import * as d3 from "d3";
import DefaultTheme from "vitepress/theme-without-fonts";
import {ref, shallowRef, onMounted, onUnmounted} from "vue";
import {data} from "./gallery.data.js";

const {Layout} = DefaultTheme;

let observer;

const n = 60; // maximum number of examples to show
const slice = d3.shuffler(d3.randomLcg(d3.utcDay()))(data.slice()).slice(0, n);
const sample = shallowRef([])
const container = ref();
const x = ref(0);
const width = ref(640);

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
  <Layout>
    <template #home-features-before>
      <div style="margin-left: -100px; margin-right: -100px;">
        <div :class="$style.examples" ref="container" :style="`transform: perspective(75em) rotateX(35deg) rotateZ(-7deg) translateX(${width / 6 - x / 10}px) translateY(-100px) scale(1.4);`">
          <a v-for="d in sample" :href="`https://observablehq.com/${d.path}`" :title="[d.title, d.author].join('\n')" target="_blank">
            <img :src="`https://static.observableusercontent.com/thumbnail/${d.thumbnail}.jpg`" style="object-fit: cover;" width="640" height="400" />
          </a>
        </div>
      </div>
    </template>
  </Layout>
</template>

<style module>

.examples {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  padding: 4px;
  grid-gap: 4px;
  position: relative;
  background: #e3e3e5;
  border-top: solid 1px currentColor;
  border-bottom: solid 1px currentColor;
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
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.4);
  position: relative;
  transform: scale(1.1);
  z-index: 2;
}

.examples:after,
.examples:before {
  content: "";
  width: 100%;
  position: absolute;
  height: 16px;
  z-index: 1;
}

.examples:before {
  bottom: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.2), transparent);
}

.examples:after {
  top: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), transparent);
}

</style>

<style>

.VPHome .VPFeature {
  background-color: rgba(246, 246, 247, 0.5);
  backdrop-filter: blur(10px);
}

.dark .VPHome .VPFeature {
  background-color: rgba(37, 37, 41, 0.5);
}

</style>
