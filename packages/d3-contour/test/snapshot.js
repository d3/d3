import assert from "assert";
import {promises as fs} from "fs";
import * as path from "path";
import beautify from "js-beautify";
import it from "./jsdom.js";
import * as snapshots from "./snapshots/index.js";

for (const [name, snapshot] of Object.entries(snapshots)) {
  it(`snapshot ${name}`, async () => {
    const svg = await snapshot();
    svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns", "http://www.w3.org/2000/svg");
    svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
    const actual = beautify.html(svg.outerHTML, {indent_size: 2});
    const outfile = path.resolve("./test/output", `${path.basename(name, ".js")}.svg`);
    const diffile = path.resolve("./test/output", `${path.basename(name, ".js")}-changed.svg`);
    let expected;

    try {
      expected = await fs.readFile(outfile, "utf8");
    } catch (error) {
      if (error.code === "ENOENT" && process.env.CI !== "true") {
        console.warn(`! generating ${outfile}`);
        await fs.writeFile(outfile, actual, "utf8");
        return;
      } else {
        throw error;
      }
    }

    if (actual === expected) {
      if (process.env.CI !== "true") {
        try {
          await fs.unlink(diffile);
          console.warn(`! deleted ${diffile}`);
        } catch (error) {
          if (error.code !== "ENOENT") {
            throw error;
          }
        }
      }
    } else {
      console.warn(`! generating ${diffile}`);
      await fs.writeFile(diffile, actual, "utf8");
    }

    assert(actual === expected, `${name} must match snapshot`);
  });
}
