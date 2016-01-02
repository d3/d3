import json from "rollup-plugin-json";
import npm from "rollup-plugin-npm";

export default {
  plugins: [npm({jsnext: true}), json()],
  moduleId: "d3",
  moduleName: "d3",
  format: "umd"
};
