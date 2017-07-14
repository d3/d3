import ascii from "rollup-plugin-ascii";
import node from "rollup-plugin-node-resolve";

export default {
  entry: "index",
  extend: true,
  format: "umd",
  moduleName: "d3",
  plugins: [node(), ascii()]
};
