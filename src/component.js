console.log(JSON.stringify({
  "name": "d3",
  "version": require("../package.json").version,
  "main": "index-browserify.js",
  "scripts": ["index-browserify.js", "d3.js"]
}, null, 2));
