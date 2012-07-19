require("./core/core");

require("util").puts(JSON.stringify({
  "name": "d3",
  "version": d3.version,
  "description": "A small, free JavaScript library for manipulating documents based on data.",
  "keywords": ["dom", "w3c", "visualization", "svg", "animation", "canvas"],
  "homepage": "http://mbostock.github.com/d3/",
  "author": {"name": "Mike Bostock", "url": "http://bost.ocks.org/mike"},
  "repository": {"type": "git", "url": "http://github.com/mbostock/d3.git"},
  "main": "index.js",
  "browserify" : "index-browserify.js",
  "dependencies": {
    "jsdom": "0.2.14",
    "sizzle": "1.1.x"
  },
  "devDependencies": {
    "uglify-js": "1.2.3",
    "vows": "0.6.x",
    "canvas": "0.12.1" // for node-canvas example
  },
  "scripts": {"test": "./node_modules/vows/bin/vows"}
}, null, 2));
