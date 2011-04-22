require("./../lib/env-js/envjs/node");
require("./../d3");

d3.json("tests/barley.json", function(barley) {

  var nest = d3.nest()
      .key(function(d) { return d.year; })
      .key(function(d) { return d.variety; })
      .key(function(d) { return d.site; });

  console.log("entries(year/variety/site):");
  console.log(stringify(nest.entries(barley.slice(5, 8))));
  console.log("");

  console.log("map(year/variety/site):");
  console.log(stringify(nest.map(barley.slice(5, 8))));
  console.log("");

  var nest = d3.nest()
      .key(function(d) { return d.year; })
      .rollup(sum);

  console.log("rollup(year):");
  console.log(stringify(nest.map(barley)));
  console.log("");

  var nest = d3.nest()
      .key(function(d) { return d.year; })
      .key(function(d) { return d.variety; })
      .rollup(sum);

  console.log("rollup(year/variety):");
  console.log(stringify(nest.map(barley)));
  console.log("");

  var nest = d3.nest()
      .key(function(d) { return d.variety; })
      .sortKeys(d3.ascending);

  console.log("sortKeys(variety):");
  console.log(stringify(nest.entries(barley.slice(5, 8))));
  console.log("");

  var nest = d3.nest()
      .key(function(d) { return d.year; })
      .sortValues(function(b, a) { return a.yield - b.yield; });

  console.log("sortValues(year):");
  console.log(stringify(nest.map(barley.slice(6, 12))));
  console.log("");

});

function sum(v) {
  return v.reduce(function(p, v) { return p + v.yield; }, 0);
}

function stringify(json) {
  return JSON.stringify(json, null, " ");
}
