import ascii from "rollup-plugin-ascii";
import node from "rollup-plugin-node-resolve";

export default {
  plugins: [node(), ascii()]
};
