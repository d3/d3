import assert from "assert";
import {mkdirSync, promises} from "fs";
import {resolve} from "path";
import pixelmatch from "pixelmatch";
import {PNG} from "pngjs";
import * as snapshots from "./snapshots.js";

const {readFile, writeFile} = promises;

mkdirSync("./test/snapshots", {recursive: true});

for (const [name, snapshot] of Object.entries(snapshots)) {
  it(`snapshot ${name}`, async () => {
    const canvas = await snapshot();
    const actual = PNG.sync.read(canvas.toBuffer());
    const outfile = resolve("./test/snapshots", `${name}.png`);
    let expected;

    try {
      expected = PNG.sync.read(await readFile(outfile));
    } catch (error) {
      if (error.code === "ENOENT" && process.env.CI !== "true") {
        console.warn(`! generating ${outfile}`);
        await writeFile(outfile, PNG.sync.write(actual));
        return;
      } else {
        throw error;
      }
    }

    const diff = new PNG({
      width: expected.width,
      height: expected.height
    });

    const n = pixelmatch(
      expected.data,
      actual.data,
      diff.data,
      expected.width,
      expected.height,
      {threshold: 0.1}
    );

    if (n > 0) {
      await writeFile(`${name}.diff.png`, PNG.sync.write(diff));
    }

    assert(n === 0, `${name} must match snapshot (${n} differences; see ${name}.diff.png)`);
  });
}
