// package metadata file for Meteor.js
'use strict';

var packageName = 'd3js:d3';  // http://atmospherejs.com/d3js/d3
var where = 'client';  // where to install: 'client' or 'server'. For both, pass nothing.

var packageJson = JSON.parse(Npm.require("fs").readFileSync('package.json'));

Package.describe({
  name: packageName,
  summary: 'D3 (official): HTML/SVG/CSS visualization components to manipulate documents based on data',
  version: packageJson.version,
  git: 'https://github.com/mbostock/d3.git'
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.0');
  api.export('d3');
  api.addFiles([
    'd3.js',
    'meteor/export.js'
  ], where
  );
});

Package.onTest(function (api) {
  api.use(packageName, where);
  api.use('tinytest', where);

  api.addFiles('meteor/test.js', where);
});
