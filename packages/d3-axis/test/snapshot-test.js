import assert from "assert";
import {mkdirSync, promises} from "fs";
import {resolve, basename} from "path";
import beautify from "js-beautify";
import it from "./jsdom.js";
import * as snapshots from "./snapshots.js";

const {readFile, writeFile} = promises;

mkdirSync("./test/snapshots", {recursive: true});

for (const [name, snapshot] of Object.entries(snapshots)) {
  it(`snapshot ${name}`, async () => {
    const node = await snapshot();
    const actual = `<!DOCTYPE html>\n${beautify.html(node.outerHTML, {indent_size: 2})}`;
    const outfile = resolve("./test/snapshots", `${basename(name, ".js")}.html`); // TODO or .svg
    let expected;

    try {
      expected = await readFile(outfile, "utf8");
    } catch (error) {
      if (error.code === "ENOENT" && process.env.CI !== "true") {
        console.warn(`! generating ${outfile}`);
        await writeFile(outfile, actual, "utf8");
        return;
      } else {
        throw error;
      }
    }

    assert(actual === expected, `${name} must match snapshot
<<< ACTUAL
${actual}
===
${expected}
>>> EXPECTED
`);
  });
}
