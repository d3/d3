import assert from "assert";
import {readFileSync} from "fs";
import {resolve, dirname} from "path";
import {fileURLToPath} from "url";
import * as d3 from "../src/index.js";

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
