<script setup>

import DefaultTheme from "vitepress/theme-without-fonts";
import ExamplesGrid from "./ExamplesGrid.vue";

const {Layout} = DefaultTheme;

</script>

<template>
  <Layout>
    <template #home-features-before>
      <ExamplesGrid />
    </template>
  </Layout>
</template>

<style>

.VPHome {
  overflow-x: hidden; /* iOS */
}

.VPHome .VPFeature {
  background-color: rgba(246, 246, 247, 0.5);
  -webkit-backdrop-filter: blur(10px); /* Safari */
  backdrop-filter: blur(10px);
}

.dark .VPHome .VPFeature {
  background-color: rgba(37, 37, 41, 0.5);
}

</style>
