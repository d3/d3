import ascii from "rollup-plugin-ascii";
import node from "rollup-plugin-node-resolve";

export default {
  input: "index",
  plugins: [node(), ascii()],
  output: {
    extend: true,
    file: "dist/d3.js",
    format: "umd",
    name: "d3"
  }
};
