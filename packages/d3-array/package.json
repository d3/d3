{
  "name": "d3-array",
  "version": "3.2.4",
  "description": "Array manipulation, ordering, searching, summarizing, etc.",
  "homepage": "https://d3js.org/d3-array/",
  "repository": {
    "type": "git",
    "url": "https://github.com/d3/d3-array.git"
  },
  "keywords": [
    "d3",
    "d3-module",
    "histogram",
    "bisect",
    "shuffle",
    "statistics",
    "search",
    "sort",
    "array"
  ],
  "license": "ISC",
  "author": {
    "name": "Mike Bostock",
    "url": "http://bost.ocks.org/mike"
  },
  "type": "module",
  "files": [
    "dist/**/*.js",
    "src/**/*.js"
  ],
  "module": "src/index.js",
  "main": "src/index.js",
  "jsdelivr": "dist/d3-array.min.js",
  "unpkg": "dist/d3-array.min.js",
  "exports": {
    "umd": "./dist/d3-array.min.js",
    "default": "./src/index.js"
  },
  "sideEffects": false,
  "dependencies": {
    "internmap": "1 - 2"
  },
  "devDependencies": {
    "@rollup/plugin-node-resolve": "15",
    "d3-dsv": "3",
    "d3-random": "2 - 3",
    "eslint": "8",
    "jsdom": "21",
    "mocha": "10",
    "rollup": "3",
    "rollup-plugin-terser": "7"
  },
  "scripts": {
    "test": "mocha 'test/**/*-test.js' && eslint src test",
    "prepublishOnly": "rm -rf dist && rollup -c",
    "postpublish": "git push && git push --tags && cd ../d3.github.com && git pull && cp ../${npm_package_name}/dist/${npm_package_name}.js ${npm_package_name}.v${npm_package_version%%.*}.js && cp ../${npm_package_name}/dist/${npm_package_name}.min.js ${npm_package_name}.v${npm_package_version%%.*}.min.js && git add ${npm_package_name}.v${npm_package_version%%.*}.js ${npm_package_name}.v${npm_package_version%%.*}.min.js && git commit -m \"${npm_package_name} ${npm_package_version}\" && git push && cd -"
  },
  "engines": {
    "node": ">=12"
  }
}
