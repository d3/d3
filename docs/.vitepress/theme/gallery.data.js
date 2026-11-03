import {Runtime} from "@observablehq/runtime";

export default {
  async load() {
    const runtime = new Runtime();
    const response = await fetch("https://api.observablehq.com/@d3/gallery.js?v=4");
    if (!response.ok) throw new Error(`unable to fetch gallery: ${response.status}`);
    const source = await response.text();
    const define = (await import(`data:text/javascript,${encodeURIComponent(source)}`)).default;
    const module = runtime.module(define);
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
    return data;
  }
};
