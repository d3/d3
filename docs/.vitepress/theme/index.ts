import DefaultTheme from "vitepress/theme-without-fonts";
import * as d3 from "d3";
import {useData} from "vitepress";
import CustomLayout from "./CustomLayout.vue";
import "./custom.css";

export default {
  extends: DefaultTheme,
  Layout: CustomLayout,
  enhanceApp({app, router}) {
    globalThis.d3 = d3; // for console testing!
    Object.defineProperty(app.config.globalProperties, "$dark", {get: () => useData().isDark.value});
  }
};
