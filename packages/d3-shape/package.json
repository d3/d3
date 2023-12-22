{
  "name": "d3-shape",
  "version": "3.2.0",
  "description": "Graphical primitives for visualization, such as lines and areas.",
  "homepage": "https://d3js.org/d3-shape/",
  "repository": {
    "type": "git",
    "url": "https://github.com/d3/d3-shape.git"
  },
  "keywords": [
    "d3",
    "d3-module",
    "graphics",
    "visualization",
    "canvas",
    "svg"
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
  "jsdelivr": "dist/d3-shape.min.js",
  "unpkg": "dist/d3-shape.min.js",
  "exports": {
    "umd": "./dist/d3-shape.min.js",
    "default": "./src/index.js"
  },
  "sideEffects": false,
  "dependencies": {
    "d3-path": "^3.1.0"
  },
  "devDependencies": {
    "d3-polygon": "1 - 3",
    "eslint": "8",
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
