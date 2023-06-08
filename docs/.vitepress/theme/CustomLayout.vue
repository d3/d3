<script setup>

import * as d3 from "d3";
import DefaultTheme from "vitepress/theme-without-fonts";
import {ref, onMounted, onUnmounted} from "vue";
import {data} from "./gallery.data.js";

const {Layout} = DefaultTheme;

let observer;
const container = ref();
const offset = ref(0);

onMounted(() => {
  observer = new ResizeObserver(() => {
    const n = getComputedStyle(container.value).gridTemplateColumns.split(" ").length;
    offset.value = data.length % n;
  });
  observer.observe(document.body);
});

onUnmounted(() => {
  observer.disconnect();
});

</script>

<template>
  <Layout>
    <template #home-features-before>
      <div :class="$style.examples" ref="container">
        <a v-for="d in data.slice(0, data.length - offset)" :href="`https://observablehq.com/${d.path}`" :title="[d.title, d.author].join('\n')" target="_blank">
          <img :src="`https://static.observableusercontent.com/thumbnail/${d.thumbnail}.jpg`" style="object-fit: cover;" />
        </a>
      </div>
    </template>
  </Layout>
</template>

<style module>

.examples {
  margin-top: -2em;
  margin-bottom: 2em;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  padding: 4px;
  grid-gap: 4px;
  position: relative;
  background: #e3e3e5;
  border-top: solid 1px currentColor;
  border-bottom: solid 1px currentColor;
}

.examples a {
  will-change: transform;
  transition: transform 250ms ease;
  border: solid transparent;
  margin: -2px;
}

.examples a:hover {
  border: solid;
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
