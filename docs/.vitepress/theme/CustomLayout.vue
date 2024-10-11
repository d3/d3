<script setup>

import DefaultTheme from "vitepress/theme-without-fonts";
import ExamplesGrid from "./ExamplesGrid.vue";
import ObservablePromo from "./ObservablePromo.vue";
import VersionAndStars from "./VersionAndStars.vue";

const {Layout} = DefaultTheme;

</script>

<template>
  <Layout>
    <template #home-features-before>
      <ExamplesGrid />
    </template>
    <template #home-features-after>
      <ObservablePromo />
    </template>
    <template #nav-bar-content-after>
      <div style="display: flex; gap: 1rem;">
        <VersionAndStars />
        <observable-made-by />
      </div>
    </template>
  </Layout>
</template>

<style>

.VPImage.logo {
  margin-right: 4px;
}

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

.VPNavBarExtra,
.VPNavBarHamburger {
  display: none !important;
}

/* rounded corners for search field */
@media (min-width: 768px) {
  .DocSearch-Button {
    border-radius: 1000px;
    padding-right: 0.75rem;
    height: 2rem;
  }
}
</style>
