{
  "name": "d3-scale",
  "version": "4.0.2",
  "description": "Encodings that map abstract data to visual representation.",
  "homepage": "https://d3js.org/d3-scale/",
  "repository": {
    "type": "git",
    "url": "https://github.com/d3/d3-scale.git"
  },
  "keywords": [
    "d3",
    "d3-module",
    "scale",
    "visualization"
  ],
  "license": "ISC",
  "author": {
    "name": "Mike Bostock",
    "url": "https://bost.ocks.org/mike"
  },
  "type": "module",
  "files": [
    "dist/**/*.js",
    "src/**/*.js"
  ],
  "module": "src/index.js",
  "main": "src/index.js",
  "jsdelivr": "dist/d3-scale.min.js",
  "unpkg": "dist/d3-scale.min.js",
  "exports": {
    "umd": "./dist/d3-scale.min.js",
    "default": "./src/index.js"
  },
  "sideEffects": false,
  "dependencies": {
    "d3-array": "2.10.0 - 3",
    "d3-format": "1 - 3",
    "d3-interpolate": "1.2.0 - 3",
    "d3-time": "2.1.1 - 3",
    "d3-time-format": "2 - 4"
  },
  "devDependencies": {
    "d3-color": "1 - 3",
    "eslint": "7",
    "mocha": "9",
    "rollup": "2",
    "rollup-plugin-terser": "7"
  },
  "scripts": {
    "test": "TZ=America/Los_Angeles mocha 'test/**/*-test.js' && eslint src test",
    "prepublishOnly": "rm -rf dist && yarn test && rollup -c",
    "postpublish": "git push && git push --tags && cd ../d3.github.com && git pull && cp ../${npm_package_name}/dist/${npm_package_name}.js ${npm_package_name}.v${npm_package_version%%.*}.js && cp ../${npm_package_name}/dist/${npm_package_name}.min.js ${npm_package_name}.v${npm_package_version%%.*}.min.js && git add ${npm_package_name}.v${npm_package_version%%.*}.js ${npm_package_name}.v${npm_package_version%%.*}.min.js && git commit -m \"${npm_package_name} ${npm_package_version}\" && git push && cd -"
  },
  "engines": {
    "node": ">=12"
  }
}
