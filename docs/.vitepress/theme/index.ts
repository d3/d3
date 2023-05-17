import DefaultTheme from "vitepress/theme-without-fonts";
import {useData} from "vitepress";
import "./custom.css";

export default {
  extends: DefaultTheme,
  enhanceApp({app, router}) {
    Object.defineProperty(app.config.globalProperties, "$dark", {get: () => useData().isDark.value});
  }
};
