<script setup>

import DefaultTheme from "vitepress/theme-without-fonts";
import ExamplesGrid from "./ExamplesGrid.vue";
import ObservablePromo from "./ObservablePromo.vue";

const {Layout} = DefaultTheme;

</script>

<template>
  <Layout>
    <template #nav-bar-title-after>
      by
      <svg viewBox="0 0 25 28" width="24" height="24" aria-label="Observable" fill="currentColor" style="margin-left: 4px; margin-right: 4px;">
        <path d="M12.5 22.6667C11.3458 22.6667 10.3458 22.4153 9.5 21.9127C8.65721 21.412 7.98339 20.7027 7.55521 19.8654C7.09997 18.9942 6.76672 18.0729 6.56354 17.1239C6.34796 16.0947 6.24294 15.0483 6.25 14C6.25 13.1699 6.30417 12.3764 6.41354 11.6176C6.52188 10.8598 6.72292 10.0894 7.01563 9.30748C7.30833 8.52555 7.68542 7.84763 8.14479 7.27274C8.62304 6.68378 9.24141 6.20438 9.95208 5.87163C10.6979 5.51244 11.5458 5.33333 12.5 5.33333C13.6542 5.33333 14.6542 5.58467 15.5 6.08733C16.3428 6.588 17.0166 7.29733 17.4448 8.13459C17.8969 8.99644 18.2271 9.9103 18.4365 10.8761C18.6448 11.841 18.75 12.883 18.75 14C18.75 14.8301 18.6958 15.6236 18.5865 16.3824C18.4699 17.1702 18.2639 17.9446 17.9719 18.6925C17.6698 19.4744 17.2948 20.1524 16.8427 20.7273C16.3906 21.3021 15.7927 21.7692 15.0479 22.1284C14.3031 22.4876 13.4542 22.6667 12.5 22.6667ZM14.7063 16.2945C15.304 15.6944 15.6365 14.864 15.625 14C15.625 13.1073 15.326 12.3425 14.7292 11.7055C14.1313 11.0685 13.3885 10.75 12.5 10.75C11.6115 10.75 10.8688 11.0685 10.2708 11.7055C9.68532 12.3123 9.36198 13.1405 9.375 14C9.375 14.8927 9.67396 15.6575 10.2708 16.2945C10.8688 16.9315 11.6115 17.25 12.5 17.25C13.3885 17.25 14.124 16.9315 14.7063 16.2945ZM12.5 27C19.4031 27 25 21.1792 25 14C25 6.82075 19.4031 1 12.5 1C5.59687 1 0 6.82075 0 14C0 21.1792 5.59687 27 12.5 27Z" fill="currentColor"></path>
      </svg>
      Observable
    </template>
    <template #home-features-before>
      <ExamplesGrid />
    </template>
    <template #home-features-after>
      <ObservablePromo />
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

</style>
