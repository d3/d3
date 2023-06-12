import assert from "assert";
import {readdirSync, readFileSync, statSync} from "fs";

it("documentation links point to existing internal anchors", async () => {
  const root = "docs";

  // Crawl all files, read their links and anchors.
  const anchors = new Map();
  const links = [];
  for (const file of getMDFiles(root)) {
    const text = getSource(root + file);
    anchors.set(file, getAnchors(text));
    for (const {pathname, hash} of getLinks(file, text)) links.push({source: file, target: pathname, hash});
  }

  // Check for broken links.
  let errors = [];
  for (let {source, target, hash} of links) {
    if (!target.endsWith(".md")) {
      errors.push(`- ${source} points to ${target} instead of ${target}.md.`);
      target += ".md";
    }

    if (!hash || anchors.get(target).includes(hash.slice(1))) continue;
    errors.push(`- ${source} points to missing ${target}${hash}.`);
  }
  assert(errors.length === 0, new Error(`${errors.length} broken links:\n${errors.join("\n")}`));
});

// Anchors can be derived from headers, or explicitly written as {#names}.
function getAnchors(text) {
  const anchors = [];
  for (const [, header] of text.matchAll(/^#+ ([*\w][*().,\w\d -]+)\n/gm)) {
    anchors.push(
      header
        .replaceAll(/[^\w\d\s]+/g, " ")
        .trim()
        .replaceAll(/ +/g, "-")
        .toLowerCase()
    );
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
    const {pathname, hash} = new URL(link, new URL(file, "https://toplevel.tld/"));
    links.push({pathname, hash});
  }
  return links;
}

// In source files, ignore comments.
function getSource(f) {
  return readFileSync(f, "utf8").replaceAll(/<!-- .*? -->/gs, "");
}

// Recursively find all md files in the directory.
function getMDFiles(root, subpath = "/") {
  const files = [];
  for (const fname of readdirSync(root + subpath)) {
    if (fname.startsWith(".") || fname.endsWith(".js")) continue;
    if (fname.endsWith(".md")) files.push(subpath + fname);
    else if (statSync(root + subpath + fname).isDirectory()) files.push(...getMDFiles(root, subpath + fname + "/"));
  }
  return files;
}
