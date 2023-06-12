import assert from "assert";
import {readFileSync} from "fs";

it("documentation links point to existing internal anchors", async () => {
  const root = "docs/";
  const files = new Set(["/api.md"]);

  // Crawl all files, read their links and anchors.
  const anchors = new Map();
  const links = [];
  let file;
  while ((file = files.values().next().value) !== undefined) {
    files.delete(file);
    const text = getSource(root + file);
    anchors.set(file, getAnchors(text));
    for (const { pathname, hash } of getLinks(file, text)) {
      if (!anchors.has(pathname)) files.add(pathname);
      links.push({source: file, target: pathname, hash});
    }
  }

  // Check for broken links.
  let errors = [];
  for (const {source, target, hash} of links) {
    if (!hash || anchors.get(target).includes(hash.slice(1))) continue;
    errors.push(`- ${source} points to missing ${target}${hash}.`);
  }
  assert(
    errors.length === 0,
    new Error(`${errors.length} broken links:\n${errors.join("\n")}`)
  );
});

// Anchors can be derived from headers, or explicitly written as {#names}.
function getAnchors(text) {
  const anchors = [];
  for (const [, header] of text.matchAll(/^#+ (\w[\w\d- ]+)\n/gm)) {
    anchors.push(header.replaceAll(/\s/g, "-").toLowerCase());
  }
  for (const [, anchor] of text.matchAll(/ \{#([\w\d-]+)\}/g)) {
    anchors.push(anchor);
  }
  return anchors;
}

// Internal links.
function getLinks(file, text) {
  const links = [];
  for (const match of text.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
    const [, link] = match;
    if (link.startsWith("http")) continue;
    const { pathname, hash } = new URL(
      link,
      new URL(file, "https://d3js.org/")
    );
    links.push({pathname, hash});
  }
  return links;
}

// In source files, ignore comments.
function getSource(f) {
  return readFileSync(f, "utf8").replaceAll(/<!-- .*? -->/gs, "");
}
