{
  "name": "d3-time-format",
  "version": "4.1.0",
  "description": "A JavaScript time formatter and parser inspired by strftime and strptime.",
  "homepage": "https://d3js.org/d3-time-format/",
  "repository": {
    "type": "git",
    "url": "https://github.com/d3/d3-time-format.git"
  },
  "keywords": [
    "d3",
    "d3-module",
    "time",
    "format",
    "strftime",
    "strptime"
  ],
  "license": "ISC",
  "author": {
    "name": "Mike Bostock",
    "url": "http://bost.ocks.org/mike"
  },
  "type": "module",
  "files": [
    "dist/**/*.js",
    "src/**/*.js",
    "locale/*.json"
  ],
  "module": "src/index.js",
  "main": "src/index.js",
  "jsdelivr": "dist/d3-time-format.min.js",
  "unpkg": "dist/d3-time-format.min.js",
  "exports": {
    ".": {
      "umd": "./dist/d3-time-format.min.js",
      "default": "./src/index.js"
    },
    "./locale/*": "./locale/*.json"
  },
  "sideEffects": [
    "./src/defaultLocale.js"
  ],
  "dependencies": {
    "d3-time": "1 - 3"
  },
  "devDependencies": {
    "eslint": "8",
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
