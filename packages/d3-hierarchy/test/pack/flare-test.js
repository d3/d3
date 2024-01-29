import assert from "assert";
import {csvParse} from "d3-dsv";
import {readFileSync} from "fs";
import {stratify, pack, Node} from "../../src/index.js";

it("pack(flare) produces the expected result", test(
  "test/data/flare.csv",
  "test/data/flare-pack.json"
));

function test(inputFile, expectedFile) {
  return () => {
    const inputText = readFileSync(inputFile, "utf8");
    const expectedText = readFileSync(expectedFile, "utf8");

    const stratifier = stratify()
        .parentId(d => {
          const i = d.id.lastIndexOf(".");
          return i >= 0 ? d.id.slice(0, i) : null;
        });

    const packer = pack()
        .size([960, 960]);

    const data = csvParse(inputText);
    const expected = JSON.parse(expectedText);

    const actual = packer(stratifier(data)
            .sum((d) => d.value)
            .sort((a, b) => b.value - a.value || a.data.id.localeCompare(b.data.id)));

    (function visit(node) {
      node.name = node.data.id.slice(node.data.id.lastIndexOf(".") + 1);
      node.x = round(node.x);
      node.y = round(node.y);
      node.r = round(node.r);
      delete node.id;
      delete node.parent;
      delete node.data;
      delete node.depth;
      delete node.height;
      if (node.children) node.children.forEach(visit);
    })(actual);

    (function visit(node) {
      Object.setPrototypeOf(node, Node.prototype);
      node.x = round(node.x);
      node.y = round(node.y);
      node.r = round(node.r);
      if (node.children) node.children.forEach(visit);
    })(expected);

    assert.deepStrictEqual(actual, expected);
  }
}

function round(x) {
  return Math.round(x * 100) / 100;
}
