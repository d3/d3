import {Runtime} from "@observablehq/runtime";
import * as d3 from "d3";

export default {
  async load() {
    const runtime = new Runtime();
    const module = runtime.module((await import("https://api.observablehq.com/@d3/gallery.js?v=4")).default);
    const data = [];
    module.define("md", () => String.raw);
    module.redefine("previews", () => (chunk) => data.push(...chunk));
    const values = [];
    for (const output of module._resolve("previews")._outputs) {
      if (output._name) {
        values.push(module.value(output._name));
      }
    }
    await Promise.all(values);
    return d3.shuffler(d3.randomLcg(Math.floor(Date.now() / 864e5)))(data).slice(0, 60);
  }
};
