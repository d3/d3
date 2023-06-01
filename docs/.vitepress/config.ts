import path from "path";
import {defineConfig} from "vitepress";

// https://vitepress.dev/reference/site-config
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
          {text: "Getting started", link: "/getting-started"},
          {text: "Table of contents", link: "/modules"},
        ]
      },
      {
        text: "Data",
        collapsed: true,
        items: [
          {
            text: "d3-array",
            link: "/d3-array",
            collapsed: true,
            items: [
              {text: "Add", link: "/d3-array/add"},
              {text: "Bin", link: "/d3-array/bin"},
              {text: "Bisect", link: "/d3-array/bisect"},
              {text: "Blur", link: "/d3-array/blur"},
              {text: "Group", link: "/d3-array/group"},
              {text: "Intern", link: "/d3-array/intern"},
              {text: "Sets", link: "/d3-array/sets"},
              {text: "Sort", link: "/d3-array/sort"},
              {text: "Summarize", link: "/d3-array/summarize"},
              {text: "Ticks", link: "/d3-array/ticks"},
              {text: "Transform", link: "/d3-array/transform"},
            ]
          },
          {text: "d3-dsv", link: "/d3-dsv"},
          {text: "d3-fetch", link: "/d3-fetch"},
          {text: "d3-format", link: "/d3-format"},
          {text: "d3-random", link: "/d3-random"},
          {text: "d3-time-format", link: "/d3-time-format"},
          {text: "d3-time", link: "/d3-time"},
        ]
      },
      {
        text: "Visualization",
        collapsed: true,
        items: [
          {text: "d3-axis", link: "/d3-axis"},
          {text: "d3-color", link: "/d3-color"},
          {
            text: "d3-interpolate",
            link: "/d3-interpolate",
            collapsed: true,
            items: [
              {text: "Value interpolation", link: "/d3-interpolate/value"},
              {text: "Color interpolation", link: "/d3-interpolate/color"},
              {text: "Transform interpolation", link: "/d3-interpolate/transform"},
              {text: "Zoom interpolation", link: "/d3-interpolate/zoom"},
            ]
          },
          {text: "d3-scale", link: "/d3-scale"},
          {
            text: "d3-scale-chromatic",
            link: "/d3-scale-chromatic",
            collapsed: true,
            items: [
              {text: "Categorical", link: "/d3-scale-chromatic/categorical"},
              {text: "Cyclical", link: "/d3-scale-chromatic/cyclical"},
              {text: "Diverging", link: "/d3-scale-chromatic/diverging"},
              {text: "Sequential", link: "/d3-scale-chromatic/sequential"},
            ]
          },
          {
            text: "d3-selection",
            link: "/d3-selection",
            collapsed: true,
            items: [
              {text: "Selecting elements", link: "/d3-selection/selecting"},
              {text: "Modifying elements", link: "/d3-selection/modifying"},
              {text: "Joining data", link: "/d3-selection/joining"},
              {text: "Handling events", link: "/d3-selection/events"},
              {text: "Control flow", link: "/d3-selection/control-flow"},
              {text: "Local variables", link: "/d3-selection/locals"},
              {text: "Namespaces", link: "/d3-selection/namespaces"}
            ]
          },
        ]
      },
      {
        text: "Geometry",
        collapsed: true,
        items: [
          {text: "d3-chord", link: "/d3-chord"},
          {text: "d3-contour", link: "/d3-contour"},
          {text: "d3-delaunay", link: "/d3-delaunay"},
          {text: "d3-force", link: "/d3-force"},
          {text: "d3-geo", link: "/d3-geo"},
          {text: "d3-hierarchy", link: "/d3-hierarchy"},
          {text: "d3-path", link: "/d3-path"},
          {text: "d3-polygon", link: "/d3-polygon"},
          {text: "d3-quadtree", link: "/d3-quadtree"},
          {text: "d3-shape", link: "/d3-shape"},
        ]
      },
      {
        text: "Animation",
        collapsed: true,
        items: [
          {text: "d3-ease", link: "/d3-ease"},
          {text: "d3-timer", link: "/d3-timer"},
          {text: "d3-transition", link: "/d3-transition"},
        ]
      },
      {
        text: "Interaction",
        collapsed: true,
        items: [
          {text: "d3-brush", link: "/d3-brush"},
          {text: "d3-dispatch", link: "/d3-dispatch"},
          {text: "d3-drag", link: "/d3-drag"},
          {text: "d3-zoom", link: "/d3-zoom"},
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
