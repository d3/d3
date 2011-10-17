require("../test/env");
require("../d3");

require("util").puts(JSON.stringify({
  "name": "d3",
  "version": d3.version,
  "description": "A small, free JavaScript library for manipulating documents based on data.",
  "keywords": ["dom", "w3c", "visualization", "svg", "animation", "canvas"],
  "homepage": "http://mbostock.github.com/d3/",
  "author": {"name": "Mike Bostock", "url": "http://bost.ocks.org/mike"},
  "repository": {"type": "git", "url": "http://github.com/mbostock/d3.git"},
  "dependencies": {
    "uglify-js": "1.1.1",
    "jsdom": "0.2.8",
    "vows": "0.5.11"
  }
}, null, 2));
