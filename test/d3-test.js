import assert from "node:assert";
import {readFileSync} from "node:fs";
import {resolve, dirname} from "node:path";
import {fileURLToPath} from "node:url";
import * as d3 from "d3";
import {it} from "vitest";

const packagePath = resolve(dirname(fileURLToPath(import.meta.url)), "../package.json");
const packageData = JSON.parse(readFileSync(packagePath));

for (const moduleName in packageData.dependencies) {
  it(`d3 exports everything from ${moduleName}`, async () => {
    const module = await import(moduleName);
    for (const propertyName in module) {
      if (propertyName !== "version") {
        assert(propertyName in d3, `${moduleName} exports ${propertyName}`);
      }
    }
  });
}
