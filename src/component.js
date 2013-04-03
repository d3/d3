var d3 = require("../index");

console.log(JSON.stringify({
  "name": "d3",
  "version": d3.version,
  "main": "index-browserify.js",
  "scripts": ["index-browserify.js", "d3.js"]
}, null, 2));
