import {fileURLToPath, URL} from "node:url";
import path from "node:path";
import {defineConfig} from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "D3 by Observable",
  description: "The JavaScript library for bespoke data visualization",
  appearance: "force-auto",
  cleanUrls: true,
  sitemap: {
    hostname: "https://d3js.org"
  },
  head: [
    ["link", {rel: "apple-touch-icon", href: "/logo.png"}],
    ["link", {rel: "icon", type: "image/png", href: "/logo.png"}],
    ["script", {async: "", defer: "", src: "https://static.observablehq.com/assets/components/observable-made-by.js"}],
  ],
  markdown: {
    externalLinks: {
      rel: "external"
    }
  },
  vite: {
    resolve: {
      alias: [
        {find: "d3", replacement: path.resolve("./dist/d3.mjs")},
        {find: /^.*\/VPFooter\.vue$/, replacement: fileURLToPath(new URL("./theme/CustomFooter.vue", import.meta.url))}
      ]
    },
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith("observable-")
      }
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/logo.svg",
    siteTitle: "D3",
    sidebar: [
      {
        text: "Introduction",
        items: [
          {text: "What is D3?", link: "/what-is-d3"},
          {text: "Getting started", link: "/getting-started"},
          {text: "API index", link: "/api"},
          {text: "Examples", link: "https://observablehq.com/@d3/gallery?utm_source=d3js-org&utm_medium=page-nav&utm_campaign=try-observable", rel: "external"}
        ]
      },
      {
        text: "Visualization",
        items: [
          {text: "d3-axis", link: "/d3-axis"},
          {
            text: "d3-chord",
            link: "/d3-chord",
            collapsed: true,
            items: [
              {text: "Chords", link: "/d3-chord/chord"},
              {text: "Ribbons", link: "/d3-chord/ribbon"}
            ]
          },
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
          {
            text: "d3-contour",
            link: "/d3-contour",
            collapsed: true,
            items: [
              {text: "Contour polygons", link: "/d3-contour/contour"},
              {text: "Density estimation", link: "/d3-contour/density"}
            ]
          },
          {
            text: "d3-delaunay",
            link: "/d3-delaunay",
            collapsed: true,
            items: [
              {text: "Delaunay triangulations", link: "/d3-delaunay/delaunay"},
              {text: "Voronoi diagrams", link: "/d3-delaunay/voronoi"}
            ]
          },
          {
            text: "d3-force",
            link: "/d3-force",
            collapsed: true,
            items: [
              {text: "Force simulations", link: "/d3-force/simulation"},
              {text: "Center force", link: "/d3-force/center"},
              {text: "Collide force", link: "/d3-force/collide"},
              {text: "Link force", link: "/d3-force/link"},
              {text: "Many-body force", link: "/d3-force/many-body"},
              {text: "Position forces", link: "/d3-force/position"},
            ]
          },
          {
            text: "d3-geo",
            link: "/d3-geo",
            collapsed: true,
            items: [
              {text: "Paths", link: "/d3-geo/path"},
              {
                text: "Projections",
                link: "/d3-geo/projection",
                collapsed: true,
                items: [
                  {text: "Azimuthal projections", link: "/d3-geo/azimuthal"},
                  {text: "Conic projections", link: "/d3-geo/conic"},
                  {text: "Cylindrical projections", link: "/d3-geo/cylindrical"},
                ]
              },
              {text: "Streams", link: "/d3-geo/stream"},
              {text: "Spherical shapes", link: "/d3-geo/shape"},
              {text: "Spherical math", link: "/d3-geo/math"},
            ]
          },
          {
            text: "d3-hierarchy",
            link: "/d3-hierarchy",
            collapsed: true,
            items: [
              {text: "Hierarchies", link: "/d3-hierarchy/hierarchy"},
              {text: "Stratify", link: "/d3-hierarchy/stratify"},
              {text: "Tree", link: "/d3-hierarchy/tree"},
              {text: "Cluster", link: "/d3-hierarchy/cluster"},
              {text: "Partition", link: "/d3-hierarchy/partition"},
              {text: "Pack", link: "/d3-hierarchy/pack"},
              {text: "Treemap", link: "/d3-hierarchy/treemap"},
            ]
          },
          {text: "d3-path", link: "/d3-path"},
          {text: "d3-polygon", link: "/d3-polygon"},
          {text: "d3-quadtree", link: "/d3-quadtree"},
          {
            text: "d3-scale",
            link: "/d3-scale",
            collapsed: true,
            items: [
              {text: "Linear scales", link: "/d3-scale/linear"},
              {text: "Time scales", link: "/d3-scale/time"},
              {text: "Pow scales", link: "/d3-scale/pow"},
              {text: "Log scales", link: "/d3-scale/log"},
              {text: "Symlog scales", link: "/d3-scale/symlog"},
              {text: "Ordinal scales", link: "/d3-scale/ordinal"},
              {text: "Band scales", link: "/d3-scale/band"},
              {text: "Point scales", link: "/d3-scale/point"},
              {text: "Sequential scales", link: "/d3-scale/sequential"},
              {text: "Diverging scales", link: "/d3-scale/diverging"},
              {text: "Quantile scales", link: "/d3-scale/quantile"},
              {text: "Quantize scales", link: "/d3-scale/quantize"},
              {text: "Threshold scales", link: "/d3-scale/threshold"}
            ]
          },
          {
            text: "d3-scale-chromatic",
            link: "/d3-scale-chromatic",
            collapsed: true,
            items: [
              {text: "Categorical schemes", link: "/d3-scale-chromatic/categorical"},
              {text: "Cyclical schemes", link: "/d3-scale-chromatic/cyclical"},
              {text: "Diverging schemes", link: "/d3-scale-chromatic/diverging"},
              {text: "Sequential schemes", link: "/d3-scale-chromatic/sequential"},
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
          {
            text: "d3-shape",
            link: "/d3-shape",
            collapsed: true,
            items: [
              {text: "Arcs", link: "/d3-shape/arc"},
              {text: "Areas", link: "/d3-shape/area"},
              {text: "Curves", link: "/d3-shape/curve"},
              {text: "Lines", link: "/d3-shape/line"},
              {text: "Links", link: "/d3-shape/link"},
              {text: "Pies", link: "/d3-shape/pie"},
              {text: "Stacks", link: "/d3-shape/stack"},
              {text: "Symbols", link: "/d3-shape/symbol"},
              {text: "Radial areas", link: "/d3-shape/radial-area"},
              {text: "Radial lines", link: "/d3-shape/radial-line"},
              {text: "Radial links", link: "/d3-shape/radial-link"}
            ]
          },
        ]
      },
      {
        text: "Animation",
        items: [
          {text: "d3-ease", link: "/d3-ease"},
          {text: "d3-timer", link: "/d3-timer"},
          {
            text: "d3-transition",
            link: "/d3-transition",
            collapsed: true,
            items: [
              {text: "Selecting elements", link: "/d3-transition/selecting"},
              {text: "Modifying elements", link: "/d3-transition/modifying"},
              {text: "Timing", link: "/d3-transition/timing"},
              {text: "Control flow", link: "/d3-transition/control-flow"}
            ]
          },
        ]
      },
      {
        text: "Interaction",
        items: [
          {text: "d3-brush", link: "/d3-brush"},
          {text: "d3-dispatch", link: "/d3-dispatch"},
          {text: "d3-drag", link: "/d3-drag"},
          {text: "d3-zoom", link: "/d3-zoom"}
        ]
      },
      {
        text: "Data",
        items: [
          {
            text: "d3-array",
            link: "/d3-array",
            collapsed: true,
            items: [
              {text: "Adding numbers", link: "/d3-array/add"},
              {text: "Binning data", link: "/d3-array/bin"},
              {text: "Bisecting data", link: "/d3-array/bisect"},
              {text: "Blurring data", link: "/d3-array/blur"},
              {text: "Grouping data", link: "/d3-array/group"},
              {text: "Interning values", link: "/d3-array/intern"},
              {text: "Set operations", link: "/d3-array/sets"},
              {text: "Sorting data", link: "/d3-array/sort"},
              {text: "Summarizing data", link: "/d3-array/summarize"},
              {text: "Ticks", link: "/d3-array/ticks"},
              {text: "Transforming data", link: "/d3-array/transform"},
            ]
          },
          {text: "d3-dsv", link: "/d3-dsv"},
          {text: "d3-fetch", link: "/d3-fetch"},
          {text: "d3-format", link: "/d3-format"},
          {text: "d3-random", link: "/d3-random"},
          {text: "d3-time", link: "/d3-time"},
          {text: "d3-time-format", link: "/d3-time-format"},
        ]
      }
    ],
    search: {
      provider: "local"
    },
    footer: {
      message: "Library released under <a style='text-decoration:underline;' href='https://github.com/d3/d3/blob/main/LICENSE'>ISC License</a>.",
      copyright: `Copyright 2010–${new Date().getUTCFullYear()} Mike Bostock`
    }
  }
});
