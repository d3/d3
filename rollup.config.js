import ascii from "rollup-plugin-ascii";
import node from "rollup-plugin-node-resolve";
import {terser} from "rollup-plugin-terser";
import * as meta from "./package.json";

const copyright = `// ${meta.homepage} v${meta.version} Copyright ${(new Date).getFullYear()} ${meta.author.name}`;

function getRollupConfigs (format = "umd") {
  const base = "dist/d3" + (format !== "umd" ? "-" + format : "");
  return [{
    input: "index",
    plugins: [
      node(),
      ascii()
    ],
    output: {
      extend: true,
      banner: copyright,
      file: base + ".js",
      format,
      indent: false,
      name: "d3"
    }
  },
  {
    input: "index",
    plugins: [
      node(),
      ascii(),
      terser({output: {preamble: copyright}})
    ],
    output: {
      extend: true,
      file: base + ".min.js",
      format,
      indent: false,
      name: "d3"
    }
  }];
}

export default [
  ...getRollupConfigs(),
  ...getRollupConfigs("esm")
];
