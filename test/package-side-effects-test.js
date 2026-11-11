import assert from "node:assert/strict";
import {Buffer} from "node:buffer";
import {mkdtemp, mkdir, readFile, rm, writeFile} from "node:fs/promises";
import {dirname, join, resolve} from "node:path";
import {fileURLToPath} from "node:url";
import {rollup} from "rollup";
import json from "@rollup/plugin-json";
import {nodeResolve} from "@rollup/plugin-node-resolve";
import {it} from "vitest";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

it("preserves selection transition methods in a tree-shaken consumer bundle", async () => {
  const metadata = await readFile(join(root, "package.json"), "utf8");
  const dependencies = Object.keys(JSON.parse(metadata).dependencies);
  const temporary = await mkdtemp(join(root, "node_modules", ".d3-package-test-"));
  try {
    const dist = join(temporary, "node_modules", "d3", "dist");
    await mkdir(dist, {recursive: true});
    await writeFile(join(dist, "..", "package.json"), metadata);
    const packaged = await rollup({input: join(root, "bundle.js"), external: dependencies, plugins: [json()]});
    try {
      await packaged.write({file: join(dist, "d3.mjs"), format: "es"});
    } finally {
      await packaged.close();
    }
    const entry = join(temporary, "consumer.js");
    await writeFile(entry, 'import {select} from "d3"; export const selection = select({});\n');
    const consumer = await rollup({input: entry, plugins: [nodeResolve()]});
    try {
      const {output} = await consumer.generate({format: "es"});
      const source = output.find((file) => file.type === "chunk").code;
      const {selection} = await import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`);
      assert.equal(typeof selection.transition, "function");
      assert.equal(typeof selection.interrupt, "function");
      selection.transition();
      selection.interrupt();
    } finally {
      await consumer.close();
    }
  } finally {
    await rm(temporary, {recursive: true, force: true});
  }
});
