import json from "rollup-plugin-json";
import node from "rollup-plugin-node-resolve";

export default {
  plugins: [node({jsnext: true}), json()],
  moduleName: "d3",
  format: "umd"
};
