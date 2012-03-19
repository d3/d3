require("../index");

require("util").puts(JSON.stringify({
  "name": "d3",
  "version": d3.version,
  "description": "A small, free JavaScript library for manipulating documents based on data.",
  "keywords": ["dom", "w3c", "visualization", "svg", "animation", "canvas"],
  "homepage": "http://mbostock.github.com/d3/",
  "author": {"name": "Mike Bostock", "url": "http://bost.ocks.org/mike"},
  "repository": {"type": "git", "url": "http://github.com/mbostock/d3.git"},
  "main": "index.js",
  "dependencies": {
    "jsdom": "0.2.12"
  },
  "devDependencies": {
    "uglify-js": "1.2.3",
    "vows": "0.6.x"
  },
  "scripts": {"test": "./node_modules/vows/bin/vows"}
}, null, 2));
