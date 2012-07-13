require("../../test/env");

var fs = require("fs"),
    util = require("util"),
    Canvas = require("canvas");

var w = 1920,
    h = 1080;

var projection = d3.geo.albersUsa()
    .scale(2000)
    .translate([w / 2, h / 2]);

var path = d3.geo.path()
    .projection(projection);

var canvas = new Canvas(w, h),
    context = canvas.getContext("2d");

context.antialias = "none";
context.lineWidth = 8;
context.lineJoin = "round";

d3.json(__dirname + "/../data/us-counties.json", function(collection) {
  renderAll("stroke");
  renderAll("fill");

  var out = fs.createWriteStream("us-counties.png");
  canvas.createPNGStream().on("data", function(chunk) { out.write(chunk); });

  function renderAll(action) {
    collection.features.forEach(function(feature) {
      var re = /[MLZ]/g,
          d = path(feature),
          i = 0,
          m;

      context[action + "Style"] = "#" + pad((+feature.id).toString(16));
      context.beginPath();
      re.lastIndex = 1;
      while (m = re.exec(d)) render(m.index);
      render();
      context[action]();

      function render(j) {
        switch (d.charAt(i)) {
          case "M": {
            var p = d.substring(i + 1, j).split(",").map(Number);
            context.moveTo(p[0], p[1]);
            break;
          }
          case "L": {
            var p = d.substring(i + 1, j).split(",").map(Number);
            context.lineTo(p[0], p[1]);
            break;
          }
          case "Z": {
            context.closePath();
            break;
          }
        }
        i = j;
      }
    });
  }
});

function pad(s) {
  return s.length < 6 ? new Array(7 - s.length).join("0") + s : s;
}
