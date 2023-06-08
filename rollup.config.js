import {readFileSync} from "fs";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import meta from "./package.json" assert {type: "json"};

// Extract copyrights from the LICENSE.
const copyright = readFileSync("./LICENSE", "utf-8")
  .split(/\n/g)
  .filter(line => /^Copyright\s+/.test(line))
  .map(line => line.replace(/^Copyright\s+/, ""))
  .join(", ");

const config = {
  input: "bundle.js",
  output: {
    file: `dist/${meta.name}.js`,
    name: "d3",
    format: "umd",
    indent: false,
    extend: true,
    banner: `// ${meta.homepage} v${meta.version} Copyright ${copyright}`
  },
  plugins: [
    nodeResolve(),
    json()
  ],
  onwarn(message, warn) {
    if (message.code === "CIRCULAR_DEPENDENCY") return;
    warn(message);
  }
};

export default [
  config,
  {
    ...config,
    output: {
      ...config.output,
      file: `dist/${meta.name}.mjs`,
      format: "esm"
    }
  },
  {
    ...config,
    output: {
      ...config.output,
      file: `dist/${meta.name}.min.js`
    },
    plugins: [
      ...config.plugins,
      terser({
        output: {
          preamble: config.output.banner
        },
        mangle: {
          reserved: [
            "InternMap",
            "InternSet"
          ]
        }
      })
    ]
  }
];
