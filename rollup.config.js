import {readFileSync} from "node:fs";
import RollupJson from "@rollup/plugin-json";
import RollupNode from "@rollup/plugin-node-resolve";
import RollupTerser from "@rollup/plugin-terser";
import meta from "./package.json" with {type: "json"};

// Extract copyrights from the LICENSE.
const copyright = readFileSync("./LICENSE", "utf-8")
  .split(/\n/g)
  .filter(line => /^copyright\s+/i.test(line))
  .map(line => line.replace(/^copyright\s+/i, ""))
  .join(", ");

const banner = `// ${meta.homepage} v${meta.version} Copyright ${copyright}`;

const terser = RollupTerser({
  output: {
    preamble: banner
  },
  mangle: {
    reserved: [
      "InternMap",
      "InternSet"
    ]
  }
});

function config(options) {
  return {
    ...options,
    input: "bundle.js",
    external: options.output.format !== "umd" ? Object.keys(meta.dependencies || {}).filter(key => /^d3-/.test(key)) : undefined,
    output: {
      ...options.output,
      name: "d3",
      indent: false,
      extend: true,
      banner,
      globals: options.output.format !== "umd" ? Object.assign({}, ...Object.keys(meta.dependencies || {}).filter(key => /^d3-/.test(key)).map(key => ({[key]: "d3"}))) : undefined
    },
    plugins: [
      RollupNode(),
      RollupJson(),
      ...(options.plugins ?? [])
    ],
    onwarn(message, warn) {
      if (message.code === "CIRCULAR_DEPENDENCY") return;
      warn(message);
    }
  };
}

export default [
  config({
    output: {
      file: `dist/${meta.name}.mjs`,
      format: "es"
    }
  }),
  config({
    output: {
      file: `dist/${meta.name}.min.mjs`,
      format: "es"
    },
    plugins: [
      terser
    ]
  }),
  config({
    output: {
      file: `dist/${meta.name}.js`,
      format: "umd"
    }
  }),
  config({
    output: {
      file: `dist/${meta.name}.min.js`,
      format: "umd"
    },
    plugins: [
      terser
    ]
  })
];
