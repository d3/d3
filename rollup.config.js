import ascii from "rollup-plugin-ascii";
import node from "rollup-plugin-node-resolve";

export default {
  input: "index",
  extend: true,
  plugins: [node(), ascii()],
  output: {
    file: "build/d3.js",
    format: "umd",
    name: "d3"
  }
};
