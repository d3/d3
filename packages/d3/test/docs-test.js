import assert from "assert";
import {readdir, readFile, stat} from "fs/promises";

it("documentation links point to existing internal anchors", async () => {
  const root = "docs";

  // Crawl all files, read their links and anchors.
  const anchors = new Map();
  const links = [];
  for await (const file of readMarkdownFiles(root)) {
    const text = await readMarkdownSource(root + file);
    anchors.set(file, getAnchors(text));
    for (const {pathname, hash} of getLinks(file, text)) {
      links.push({source: file, target: pathname, hash});
    }
  }

  // Check for broken links.
  let errors = [];
  for (let {source, target, hash} of links) {
    if (!target.endsWith(".md")) {
      errors.push(`- ${source} points to ${target} instead of ${target}.md.`);
      target += ".md";
    }
    if (anchors.get(target)?.includes(hash.slice(1))) continue;
    errors.push(`- ${source} points to missing ${target}${hash}.`);
  }
  assert(errors.length === 0, new Error(`${errors.length} broken links:\n${errors.join("\n")}`));
});

// Anchors can be derived from headers, or explicitly written as {#names}.
function getAnchors(text) {
  const anchors = [""]; // empty string for non-fragment links
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
    if (/^\w+:/.test(link)) continue; // absolute link with protocol
    const {pathname, hash} = new URL(link, new URL(file, "https://example.com/"));
    links.push({pathname, hash});
  }
  return links;
}

// In source files, ignore comments.
async function readMarkdownSource(f) {
  return (await readFile(f, "utf8")).replaceAll(/<!-- .*? -->/gs, "");
}

// Recursively find all md files in the directory.
async function* readMarkdownFiles(root, subpath = "/") {
  for (const fname of await readdir(root + subpath)) {
    if (fname.startsWith(".")) continue; // ignore .vitepress etc.
    if ((await stat(root + subpath + fname)).isDirectory()) yield* readMarkdownFiles(root, subpath + fname + "/");
    else if (fname.endsWith(".md")) yield subpath + fname;
  }
}
