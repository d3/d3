import node from "rollup-plugin-node-resolve";

export default {
  plugins: [node({jsnext: true})],
  moduleName: "d3",
  format: "umd"
};
