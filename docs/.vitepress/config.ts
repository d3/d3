import path from "path";
import {defineConfig} from "vitepress";

// https://vitepress.dev/reference/site-config
// prettier-ignore
export default defineConfig({
  title: "D3 by Observable",
  description: "The JavaScript library for bespoke data visualization",
  cleanUrls: true,
  vite: {
    resolve: {
      alias: {
        d3: path.resolve("./src/index.js")
      }
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/logo.svg",
    outline: "deep",
    nav: [
      {text: "Home", link: "/"},
      {text: "Examples", link: "https://observablehq.com/@d3/gallery"},
      {text: "Community", link: "/community"},
      {text: "Plot", link: "https://observablehq.com/plot"}
    ],
    sidebar: [
      {
        text: "Introduction",
        items: [
          {text: "What is D3?", link: "/what-is-d3"},
          {text: "Why D3?", link: "/why-d3"},
          {text: "Getting started", link: "/getting-started"}
        ]
      },
      {
        text: "Modules",
        items: [
          {
            text: "d3-array",
            link: "/d3-array",
            collapsed: true,
            items: [
              {text: "Adding", link: "/d3-array/adding"},
              {text: "Binning", link: "/d3-array/binning"},
              {text: "Bisecting", link: "/d3-array/bisecting"},
              {text: "Blurring", link: "/d3-array/blurring"},
              {text: "Interning", link: "/d3-array/interning"},
              {text: "Grouping", link: "/d3-array/grouping"},
              {text: "Searching", link: "/d3-array/searching"},
              {text: "Sets", link: "/d3-array/sets"},
              {text: "Sorting", link: "/d3-array/sorting"},
              {text: "Summarizing", link: "/d3-array/summarizing"},
              {text: "Ticks", link: "/d3-array/ticks"},
              {text: "Transforming", link: "/d3-array/transforming"}
            ]
          },
          {text: "d3-axis", link: "/d3-axis"},
          {text: "d3-brush", link: "/d3-brush"},
          {text: "d3-chord", link: "/d3-chord"},
          {text: "d3-color", link: "/d3-color"},
          {text: "d3-contour", link: "/d3-contour"},
          {text: "d3-delaunay", link: "/d3-delaunay"},
          {text: "d3-dispatch", link: "/d3-dispatch"},
          {text: "d3-drag", link: "/d3-drag"},
          {text: "d3-dsv", link: "/d3-dsv"},
          {text: "d3-ease", link: "/d3-ease"},
          {text: "d3-fetch", link: "/d3-fetch"},
          {text: "d3-force", link: "/d3-force"},
          {text: "d3-format", link: "/d3-format"},
          {text: "d3-geo", link: "/d3-geo"},
          {text: "d3-hierarchy", link: "/d3-hierarchy"},
          {text: "d3-interpolate", link: "/d3-interpolate"},
          {text: "d3-path", link: "/d3-path"},
          {text: "d3-polygon", link: "/d3-polygon"},
          {text: "d3-quadtree", link: "/d3-quadtree"},
          {text: "d3-random", link: "/d3-random"},
          {text: "d3-scale-chromatic", link: "/d3-scale-chromatic"},
          {text: "d3-scale", link: "/d3-scale"},
          {text: "d3-selection", link: "/d3-selection"},
          {text: "d3-shape", link: "/d3-shape"},
          {text: "d3-time-format", link: "/d3-time-format"},
          {text: "d3-time", link: "/d3-time"},
          {text: "d3-timer", link: "/d3-timer"},
          {text: "d3-transition", link: "/d3-transition"},
          {text: "d3-zoom", link: "/d3-zoom"}
        ]
      }
    ],
    search: {
      provider: "local"
    },
    socialLinks: [
      {icon: "github", link: "https://github.com/d3"},
      {icon: "twitter", link: "https://twitter.com/observablehq"},
      {icon: "mastodon", link: "https://vis.social/@observablehq"},
      {icon: "slack", link: "https://observable-community.slack.com/ssb/redirect"},
      {icon: "linkedin", link: "https://www.linkedin.com/company/observable"},
      {icon: "youtube", link: "https://www.youtube.com/c/Observablehq"}
    ],
    footer: {
      message: "Library released under <a style='text-decoration:underline;' href='https://github.com/d3/d3/blob/main/LICENSE'>ISC License</a>.",
      copyright: `Copyright 2010–${new Date().getUTCFullYear()} Mike Bostock`
    }
  }
});
